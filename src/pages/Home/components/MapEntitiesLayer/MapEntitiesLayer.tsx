import { useMemo } from "react";
import DeckGLOverlay from "../../../../components/map/components/DeckGLOverlay/DeckGLOverlay";
import { useAircraftListQuery } from "../../../../hooks/useAircraftQueries";
import { createAircraftIconLayer } from "../AircraftLayer/layers/createAircraftLayer";
import { useViewPort } from "../AircraftLayer/hooks/useViewPort";
import { keepPreviousData } from "@tanstack/react-query";

const MapEntitiesLayer = () => {
  const { viewPort } = useViewPort();
  const { data } = useAircraftListQuery(viewPort, {
    placeholderData: keepPreviousData,
  });
  const layers = useMemo(() => {
    let iconLayer;
    if (data?.aircraft.length) {
      iconLayer = createAircraftIconLayer(data?.aircraft, {
        iconSize: 30,
        pickable: true,
        showAltitude: false,
      });
    }
    return iconLayer;
  }, [data]);

  return <DeckGLOverlay layers={layers ?? []} />;
};

export default MapEntitiesLayer;
