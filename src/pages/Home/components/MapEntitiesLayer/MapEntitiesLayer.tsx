import { keepPreviousData } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

import DeckGLOverlay from "../../../../components/map/components/DeckGLOverlay/DeckGLOverlay";
import { useAircraftListQuery } from "../../../../hooks/useAircraftQueries";
import type { Aircraft } from "../../../../services/types";
import { useAircraftSimulation } from "../AircraftLayer/hooks/useAircraftSimulation";
import { useViewPort } from "../AircraftLayer/hooks/useViewPort";
import { createAircraftIconLayer } from "../AircraftLayer/layers/createAircraftLayer";
import { FlightPopper } from "../FlightPopper/FlightPopper";
import { createAircraftRouteLayer } from "../createAircraftRouteLayer/createAircraftRouteLayer";

const MapEntitiesLayer = () => {
  const { viewPort } = useViewPort();

  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(
    null,
  );

  const { data } = useAircraftListQuery(viewPort, {
    placeholderData: keepPreviousData,
    refetchInterval: 10_000,
  });

  const aircraft = useMemo(() => data?.aircraft ?? [], [data?.aircraft]);

  const animatedAircraft = useAircraftSimulation(aircraft);

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

  const layers = useMemo(() => {
    const layerList = [];

    if (selectedAircraft) {
      const liveAircraft = animatedAircraft.find(
        (aircraft) => aircraft.id === selectedAircraft.id,
      );

      const routeLayer = createAircraftRouteLayer(
        selectedAircraft,
        liveAircraft,
      );

      if (routeLayer) {
        layerList.push(...routeLayer);
      }
    }

    if (animatedAircraft.length > 0) {
      const iconLayers = createAircraftIconLayer(animatedAircraft, {
        iconSize: 30,
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
  }, [selectedAircraft, animatedAircraft, handleAircraftClick]);

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
