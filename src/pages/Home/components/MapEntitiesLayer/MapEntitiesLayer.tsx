import { useMemo } from "react";

import { keepPreviousData } from "@tanstack/react-query";

import DeckGLOverlay from "../../../../components/map/components/DeckGLOverlay/DeckGLOverlay";

import { useAircraftListQuery } from "../../../../hooks/useAircraftQueries";

import { useViewPort } from "../AircraftLayer/hooks/useViewPort";

import { useAircraftSimulation } from "../AircraftLayer/hooks/useAircraftSimulation";

import { createAircraftIconLayer } from "../AircraftLayer/layers/createAircraftLayer";

const MapEntitiesLayer = () => {
  const { viewPort } = useViewPort();

  const { data } = useAircraftListQuery(viewPort, {
    placeholderData: keepPreviousData,

    refetchInterval: 10_000,
  });

  /**
   * مهم:
   * در هر render آرایه جدید نساز.
   */

  const aircraft = useMemo(() => data?.aircraft ?? [], [data?.aircraft]);

  /**
   * ---------------------------------------------
   * API
   * ↓
   * Simulation
   * ↓
   * Animated aircraft
   * ---------------------------------------------
   */

  const animatedAircraft = useAircraftSimulation(aircraft);

  /**
   * ---------------------------------------------
   * DeckGL Layer
   * ---------------------------------------------
   */

  const layers = useMemo(() => {
    if (animatedAircraft.length === 0) {
      return [];
    }

    return createAircraftIconLayer(animatedAircraft, {
      iconSize: 30,
      pickable: true,
      showAltitude: false,
    });
  }, [animatedAircraft]);

  return <DeckGLOverlay layers={layers} />;
};

export default MapEntitiesLayer;
