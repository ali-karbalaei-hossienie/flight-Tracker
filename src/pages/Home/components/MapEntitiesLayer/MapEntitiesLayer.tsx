import { useMemo, useState, useCallback } from "react";
import { keepPreviousData } from "@tanstack/react-query";

import DeckGLOverlay from "../../../../components/map/components/DeckGLOverlay/DeckGLOverlay";
import { useAircraftListQuery } from "../../../../hooks/useAircraftQueries";
import { useViewPort } from "../AircraftLayer/hooks/useViewPort";
import { useAircraftSimulation } from "../AircraftLayer/hooks/useAircraftSimulation";
import { createAircraftIconLayer } from "../AircraftLayer/layers/createAircraftLayer";
import { AircraftPopper } from "../AircraftPopup/AircraftPopper";
import type { Aircraft } from "../../../../services/types";

interface SelectedAircraftState {
  aircraft: Aircraft;
  x: number;
  y: number;
}

const MapEntitiesLayer = () => {
  const { viewPort } = useViewPort();
  const [selectedAircraft, setSelectedAircraft] =
    useState<SelectedAircraftState | null>(null);

  const { data } = useAircraftListQuery(viewPort, {
    placeholderData: keepPreviousData,
    refetchInterval: 10_000,
  });

  const aircraft = useMemo(() => data?.aircraft ?? [], [data?.aircraft]);
  const animatedAircraft = useAircraftSimulation(aircraft);

  const handleAircraftClick = useCallback(
    (ac: Aircraft, x: number, y: number) => {
      setSelectedAircraft({ aircraft: ac, x, y });
    },
    [],
  );

  const handleClose = useCallback(() => {
    setSelectedAircraft(null);
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

  return (
    <>
      <DeckGLOverlay layers={layers} />
      <AircraftPopper
        data={selectedAircraft}
        onClose={handleClose}
        onDrawTrack={(ac) => console.log("Draw track for:", ac)}
      />
    </>
  );
};

export default MapEntitiesLayer;
