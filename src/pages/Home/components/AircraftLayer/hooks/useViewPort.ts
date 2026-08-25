import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import type { BboxParams } from "../../../../../services/types";

export const useViewPort = () => {
  const { current: map } = useMap();
  const [viewPort, setViewPort] = useState();

  useEffect(() => {
    if (!map) return;
    const handleMoveEnd = (e) => {
      const map = e.target;
      const bounds = map.getBounds();
      const zoom = Math.round(map.getZoom() * 10) / 10;
      const lamin = Math.max(-85, bounds.getSouth());
      const lamax = Math.min(85, bounds.getNorth());
      const lomin = bounds.getWest();
      const lomax = bounds.getEast();
      const bbox: BboxParams = {
        lamin,
        lamax,
        lomin,
        lomax,
        zoom,
      };
      const nextViewport = { ...bbox, zoom };

      setViewPort(nextViewport);
    };
    map.on("moveend", handleMoveEnd);
  }, [map]);

  return { viewPort };
};
