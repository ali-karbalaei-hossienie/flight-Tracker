import { keepPreviousData } from "@tanstack/react-query";
import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import DeckGLOverlay from "../../../../components/map/components/DeckGLOverlay/DeckGLOverlay";
import { useAircraftListQuery } from "../../../../hooks/useAircraftQueries";
import type { Aircraft } from "../../../../services/types";
import { useAircraftSimulation } from "../AircraftLayer/hooks/useAircraftSimulation";
import { useViewPort } from "../AircraftLayer/hooks/useViewPort";
import { createAircraftIconLayer } from "../AircraftLayer/layers/createAircraftLayer";
import { FlightPopper } from "../FlightPopper/FlightPopper";
import { createAircraftRouteLayer } from "../createAircraftRouteLayer/createAircraftRouteLayer";
import { useRout } from "../hooks/useRout";
import { useLocation, useSearchParams } from "react-router-dom";
import { useMap } from "react-map-gl/mapbox";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";

const MapEntitiesLayer = () => {
  const { viewPort } = useViewPort();
  const { isRouteActive } = useRout();
  const { pathname } = useLocation();
  const { current: map } = useMap();
  const isHome = pathname === "/";
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(
    null,
  );

  const airplaneSize = useSelector(
    (state: RootState) => state.setting.airplaneSize,
  );

  const { data } = useAircraftListQuery(viewPort, {
    enabled: isHome ? true : false,
    placeholderData: keepPreviousData,
    refetchInterval: 10_000,
  });

  const aircraft = useMemo(() => data?.aircraft ?? [], [data?.aircraft]);

  const animatedAircraft = useAircraftSimulation(aircraft);

  const visibleAircrafts = useMemo(() => {
    if (isRouteActive && selectedAircraft) {
      return animatedAircraft.filter((ac) => ac.id === selectedAircraft.id);
    }
    return animatedAircraft;
  }, [isRouteActive, selectedAircraft, animatedAircraft]);

  const handleClose = useCallback(() => {
    setSelectedAircraft(null);
  }, []);

  const handleAircraftClick = useCallback((ac: Aircraft) => {
    setSelectedAircraft((current) => {
      if (current?.id === ac.id) {
        return null;
      }
      return ac;
    });
  }, []);

  useEffect(() => {
    const aircraftId = searchParams.get("select");

    if (!aircraftId) {
      return;
    }

    if (aircraft.length === 0) {
      return;
    }

    const findAircraft = aircraft.find(
      (ac) => String(ac.id) === String(aircraftId),
    );

    if (!findAircraft) {
      return;
    }

    startTransition(() => {
      setSelectedAircraft(findAircraft);
    });

    map?.flyTo({
      center: [findAircraft.lon, findAircraft.lat],
      zoom: 7,
      duration: 1200,
      essential: true,
    });

    setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams, aircraft, map]);

  const layers = useMemo(() => {
    const layerList = [];

    if (selectedAircraft) {
      const routeLayer = createAircraftRouteLayer(selectedAircraft);

      if (routeLayer) {
        layerList.push(...routeLayer);
      }
    }

    if (visibleAircrafts.length > 0) {
      const iconLayers = createAircraftIconLayer(visibleAircrafts, {
        iconSize: airplaneSize,
        pickable: true,
        showAltitude: false,
        onAircraftClick: handleAircraftClick,
        selectedAircraftId: selectedAircraft?.id ?? null,
      });

      if (Array.isArray(iconLayers)) {
        layerList.push(...iconLayers);
      } else if (iconLayers) {
        layerList.push(iconLayers);
      }
    }

    return layerList;
  }, [selectedAircraft, visibleAircrafts, handleAircraftClick, airplaneSize]);

  const FlightPopperComponent = useMemo(() => {
    return (
      <FlightPopper selectedAircraft={selectedAircraft} onClose={handleClose} />
    );
  }, [selectedAircraft, handleClose]);

  return (
    <>
      <DeckGLOverlay layers={layers} />
      {FlightPopperComponent}
    </>
  );
};

export default MapEntitiesLayer;
