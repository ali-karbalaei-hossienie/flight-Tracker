import { useMemo } from "react";
import DeckGLOverlay from "../../../../components/map/components/DeckGLOverlay/DeckGLOverlay";
import { useAircraftListQuery } from "../../../../hooks/useAircraftQueries";
import { createAircraftIconLayer } from "../AircraftLayer/layers/createAircraftLayer";

const MapEntitiesLayer = () => {
  const { data } = useAircraftListQuery();
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
