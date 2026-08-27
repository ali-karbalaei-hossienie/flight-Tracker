import { keepPreviousData } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

import DeckGLOverlay from "../../../../components/map/components/DeckGLOverlay/DeckGLOverlay";
import { useAircraftListQuery } from "../../../../hooks/useAircraftQueries";
import type { Aircraft } from "../../../../services/types";
import { useAircraftSimulation } from "../AircraftLayer/hooks/useAircraftSimulation";
import { useViewPort } from "../AircraftLayer/hooks/useViewPort";
import { createAircraftIconLayer } from "../AircraftLayer/layers/createAircraftLayer";
import { FlightTrackerMapOverlay } from "../FlightTrackerMapOverlay/FlightTrackerMapOverlay";

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
        handleClose();
        return null;
      }
      return ac;
    });
  }, []);

  const layers = useMemo(() => {
    if (animatedAircraft.length === 0) {
      return [];
    }

    return createAircraftIconLayer(animatedAircraft, {
      iconSize: 30,
      pickable: true,
      showAltitude: false,
      onAircraftClick: handleAircraftClick,
    });
  }, [animatedAircraft, handleAircraftClick]);

  const a = useMemo(() => {
    return (
      <FlightTrackerMapOverlay
        selectedAircraft={selectedAircraft}
        onClose={handleClose}
      />
    );
  }, [selectedAircraft]);

  return (
    <>
      <DeckGLOverlay layers={layers} />

      {a}
    </>
  );
};

export default MapEntitiesLayer;
