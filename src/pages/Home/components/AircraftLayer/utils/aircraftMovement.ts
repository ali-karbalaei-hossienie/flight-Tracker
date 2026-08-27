import {
  along,
  bearing,
  destination,
  distance,
  lineString,
  nearestPointOnLine,
  point,
} from "@turf/turf";

import type { Aircraft } from "../../../../../services/types";

export interface AircraftSimState {
  lat: number;
  lon: number;
  heading_deg: number;

  /**
   * route[index] -> route[index + 1]
   */
  segmentIndex: number;

  /**
   * 0 = start segment
   * 1 = end segment
   */
  progress: number;

  /**
   * وقتی route تمام شده
   * هواپیما با heading خودش ادامه می‌دهد.
   */
  offRoute: boolean;
}

const SNAP_THRESHOLD_NM = 0.05;

/**
 * پیدا کردن initial position هواپیما روی route
 */
export function initAircraftSim(aircraft: Aircraft): AircraftSimState {
  const route = aircraft.path;

  if (route.length < 2) {
    return {
      lat: aircraft.lat,
      lon: aircraft.lon,
      heading_deg: aircraft.heading_deg,
      segmentIndex: 0,
      progress: 0,
      offRoute: true,
    };
  }

  /**
   * [lat, lon]
   *       ↓
   * [lon, lat]
   */
  const routeLine = lineString(
    route.map(([lat, lon]) => [lon, lat] as [number, number]),
  );

  const aircraftPoint = point([aircraft.lon, aircraft.lat]);

  /**
   * نزدیک‌ترین نقطه روی route
   */
  const snapped = nearestPointOnLine(routeLine, aircraftPoint, {
    units: "nauticalmiles",
  });

  const [snappedLon, snappedLat] = snapped.geometry.coordinates;

  const lastPoint = route[route.length - 1];

  /**
   * آیا روی آخرین point هستیم؟
   */
  const distanceToEnd = distance(
    [snappedLon, snappedLat],
    [lastPoint[1], lastPoint[0]],
    {
      units: "nauticalmiles",
    },
  );

  const isAtRouteEnd = distanceToEnd <= SNAP_THRESHOLD_NM;

  /**
   * Turf ممکن است برای endpoint
   * index = route.length - 1 بدهد.
   *
   * آخرین segment واقعی:
   *
   * route[length - 2]
   * →
   * route[length - 1]
   */
  const segmentIndex = isAtRouteEnd
    ? route.length - 2
    : Math.min(snapped.properties.index ?? 0, route.length - 2);

  const start = route[segmentIndex];

  const end = route[segmentIndex + 1];

  const segmentLength = distance([start[1], start[0]], [end[1], end[0]], {
    units: "nauticalmiles",
  });

  let progress = 0;

  if (isAtRouteEnd) {
    progress = 1;
  } else if (segmentLength > 0) {
    const distanceFromStart = distance(
      [start[1], start[0]],
      [snappedLon, snappedLat],
      {
        units: "nauticalmiles",
      },
    );

    progress = distanceFromStart / segmentLength;
  }

  const heading = bearing([start[1], start[0]], [end[1], end[0]]);

  return {
    lat: snappedLat,
    lon: snappedLon,

    heading_deg: (heading + 360) % 360,

    segmentIndex,

    progress: Math.max(0, Math.min(1, progress)),

    offRoute: false,
  };
}

/**
 * حرکت هواپیما بر اساس:
 *
 * speedKts
 * +
 * deltaSeconds
 * +
 * route
 */
export function advanceAircraftSim(
  state: AircraftSimState,
  route: [number, number][],
  speedKts: number,
  deltaSeconds: number,
): AircraftSimState {
  if (speedKts <= 0 || deltaSeconds <= 0) {
    return state;
  }

  /**
   * Knot:
   *
   * nautical miles / hour
   *
   * تبدیل به nautical miles / second
   */
  let distanceToTravel = (speedKts / 3600) * deltaSeconds;

  let { lat, lon, heading_deg, segmentIndex, progress, offRoute } = state;

  /**
   * اگر route نداریم،
   * مستقیم با heading حرکت می‌کنیم.
   */
  if (route.length < 2) {
    const nextPoint = destination([lon, lat], distanceToTravel, heading_deg, {
      units: "nauticalmiles",
    });

    const [nextLon, nextLat] = nextPoint.geometry.coordinates;

    return {
      ...state,
      lat: nextLat,
      lon: nextLon,
      offRoute: true,
    };
  }

  /**
   * ------------------------------------------------
   * قبلاً از route خارج شده‌ایم
   * ------------------------------------------------
   */
  if (offRoute) {
    const nextPoint = destination([lon, lat], distanceToTravel, heading_deg, {
      units: "nauticalmiles",
    });

    const [nextLon, nextLat] = nextPoint.geometry.coordinates;

    return {
      ...state,
      lat: nextLat,
      lon: nextLon,
      progress: 1,
      offRoute: true,
    };
  }

  /**
   * ------------------------------------------------
   * حرکت روی route
   * ------------------------------------------------
   */
  while (distanceToTravel > 0 && segmentIndex < route.length - 1) {
    const start = route[segmentIndex];

    const end = route[segmentIndex + 1];

    const segmentLength = distance([start[1], start[0]], [end[1], end[0]], {
      units: "nauticalmiles",
    });

    /**
     * segment خراب
     */
    if (segmentLength <= 0) {
      segmentIndex++;
      progress = 0;
      continue;
    }

    /**
     * فاصله‌ی باقی مانده در segment
     */
    const remainingDistance = segmentLength * (1 - progress);

    /**
     * ----------------------------------------------
     * رسیدیم به انتهای segment
     * ----------------------------------------------
     */
    if (distanceToTravel >= remainingDistance) {
      distanceToTravel -= remainingDistance;

      lat = end[0];
      lon = end[1];

      segmentIndex++;

      progress = 0;

      /**
       * route تمام شد
       */
      if (segmentIndex >= route.length - 1) {
        const previous = route[route.length - 2];

        const finalPoint = route[route.length - 1];

        heading_deg =
          (bearing([previous[1], previous[0]], [finalPoint[1], finalPoint[0]]) +
            360) %
          360;

        offRoute = true;

        break;
      }

      continue;
    }

    /**
     * ----------------------------------------------
     * هنوز در همین segment هستیم
     * ----------------------------------------------
     */

    const distanceFromStart = progress * segmentLength;

    const newDistance = distanceFromStart + distanceToTravel;

    const segmentLine = lineString([
      [start[1], start[0]],
      [end[1], end[0]],
    ]);

    const nextPoint = along(segmentLine, newDistance, {
      units: "nauticalmiles",
    });

    const [nextLon, nextLat] = nextPoint.geometry.coordinates;

    lon = nextLon;
    lat = nextLat;

    progress = newDistance / segmentLength;

    heading_deg = (bearing([start[1], start[0]], [end[1], end[0]]) + 360) % 360;

    distanceToTravel = 0;
  }

  /**
   * ------------------------------------------------
   * اگر از route خارج شدیم ولی distance باقی مانده
   * ------------------------------------------------
   */
  if (offRoute && distanceToTravel > 0) {
    const nextPoint = destination([lon, lat], distanceToTravel, heading_deg, {
      units: "nauticalmiles",
    });

    const [nextLon, nextLat] = nextPoint.geometry.coordinates;

    lon = nextLon;
    lat = nextLat;
  }

  return {
    lat,
    lon,
    heading_deg,

    segmentIndex: Math.min(segmentIndex, route.length - 2),

    progress: Math.min(1, Math.max(0, progress)),

    offRoute,
  };
}
