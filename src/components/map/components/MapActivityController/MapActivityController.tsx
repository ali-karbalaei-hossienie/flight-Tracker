import { useEffect } from "react";
import { useMap } from "react-map-gl/mapbox";
import { useLocation } from "react-router-dom";

export default function MapActivityController() {
  const { current: mapRef } = useMap();
  const { pathname } = useLocation();
  const active = pathname === "/";

  useEffect(() => {
    const map = mapRef?.getMap();
    if (!map || (map as { _removed?: boolean })._removed) return;

    if (active) {
      map.resize();
    } else {
      map.stop();
    }
  }, [active, mapRef]);

  return null;
}
