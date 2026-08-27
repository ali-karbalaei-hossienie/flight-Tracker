import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

import type { Aircraft } from "../../../../../services/types";

import {
  advanceAircraftSim,
  initAircraftSim,
  type AircraftSimState,
} from "../utils/aircraftMovement";

type Listener = () => void;

interface StoredAircraft {
  aircraft: Aircraft;
  sim: AircraftSimState;
  lastSeen: number;
}

const RENDER_INTERVAL_MS = 50;

const STALE_TIMEOUT_SECONDS = 120;

const RESYNC_THRESHOLD_DEG = 0.03;

export function useAircraftSimulation(incomingAircraft: Aircraft[]) {
  /**
   * همه aircraftها
   */
  const aircraftMapRef = useRef(new Map<string, StoredAircraft>());

  /**
   * چیزی که React می‌بیند
   */
  const snapshotRef = useRef<Aircraft[]>([]);

  /**
   * subscriberها
   */
  const listenersRef = useRef<Set<Listener>>(new Set());

  /**
   * ------------------------------------------------
   * Subscribe
   * ------------------------------------------------
   */

  const subscribe = useCallback((listener: Listener) => {
    listenersRef.current.add(listener);

    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  /**
   * ------------------------------------------------
   * Snapshot
   * ------------------------------------------------
   */

  const getSnapshot = useCallback(() => snapshotRef.current, []);

  /**
   * ------------------------------------------------
   * Notify
   * ------------------------------------------------
   */

  const notify = useCallback(() => {
    listenersRef.current.forEach((listener) => listener());
  }, []);

  /**
   * ==================================================
   * API UPDATE
   * ==================================================
   */

  useEffect(() => {
    const now = Date.now() / 1000;

    const aircraftMap = aircraftMapRef.current;

    const incomingIds = new Set<string>();

    for (const aircraft of incomingAircraft) {
      if (!aircraft?.id) {
        continue;
      }

      incomingIds.add(aircraft.id);

      const existing = aircraftMap.get(aircraft.id);

      /**
       * --------------------------------------------
       * NEW AIRCRAFT
       * --------------------------------------------
       */

      if (!existing) {
        const sim = initAircraftSim(aircraft);

        aircraftMap.set(aircraft.id, {
          aircraft,
          sim,
          lastSeen: now,
        });

        continue;
      }

      /**
       * --------------------------------------------
       * EXISTING AIRCRAFT
       * --------------------------------------------
       */

      const sim = existing.sim;

      const latDiff = Math.abs(sim.lat - aircraft.lat);

      const lonDiff = Math.abs(sim.lon - aircraft.lon);

      /**
       * اگر aircraft روی زمین است،
       * مستقیم sync می‌کنیم.
       */

      if (aircraft.on_ground) {
        existing.aircraft = aircraft;

        existing.sim = initAircraftSim(aircraft);

        existing.lastSeen = now;

        continue;
      }

      /**
       * اگر simulation خیلی از
       * telemetry واقعی فاصله گرفته،
       * دوباره sync می‌کنیم.
       */

      if (latDiff > RESYNC_THRESHOLD_DEG || lonDiff > RESYNC_THRESHOLD_DEG) {
        existing.sim = initAircraftSim(aircraft);
      }

      /**
       * اطلاعات جدید backend
       *
       * ولی simulation فعلی
       * را حفظ می‌کنیم.
       */

      existing.aircraft = aircraft;

      existing.lastSeen = now;
    }

    /**
     * --------------------------------------------
     * حذف aircraftهای stale
     * --------------------------------------------
     */

    for (const [id, stored] of aircraftMap) {
      if (now - stored.lastSeen > STALE_TIMEOUT_SECONDS) {
        aircraftMap.delete(id);
      }
    }

    /**
     * --------------------------------------------
     * snapshot
     * --------------------------------------------
     */

    snapshotRef.current = Array.from(aircraftMap.values()).map(
      ({ aircraft, sim }) => ({
        ...aircraft,

        lat: sim.lat,

        lon: sim.lon,

        heading_deg: sim.heading_deg,
      }),
    );

    notify();
  }, [incomingAircraft, notify]);

  /**
   * ==================================================
   * REQUEST ANIMATION FRAME
   * ==================================================
   */

  useEffect(() => {
    let frameId = 0;

    let lastTime = performance.now();

    let renderAccumulator = 0;

    const tick = (now: number) => {
      /**
       * چند ثانیه از frame قبلی گذشته؟
       */

      const deltaSeconds = Math.min((now - lastTime) / 1000, 0.05);

      lastTime = now;

      renderAccumulator += deltaSeconds * 1000;

      const aircraftMap = aircraftMapRef.current;

      /**
       * --------------------------------------------
       * Simulation
       * --------------------------------------------
       */

      for (const stored of aircraftMap.values()) {
        const { aircraft, sim } = stored;

        /**
         * روی زمین
         */
        if (aircraft.on_ground || aircraft.speed_kts <= 0) {
          continue;
        }

        stored.sim = advanceAircraftSim(
          sim,
          aircraft.path,
          aircraft.speed_kts,
          deltaSeconds,
        );
      }

      /**
       * --------------------------------------------
       * React notification
       * --------------------------------------------
       */

      if (renderAccumulator >= RENDER_INTERVAL_MS) {
        renderAccumulator = 0;

        snapshotRef.current = Array.from(aircraftMap.values()).map(
          ({ aircraft, sim }) => ({
            ...aircraft,

            lat: sim.lat,

            lon: sim.lon,

            heading_deg: sim.heading_deg,
          }),
        );

        notify();
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [notify]);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
