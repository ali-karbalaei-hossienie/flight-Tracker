import { Geoman } from "@geoman-io/mapbox-geoman-free";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import type { StyleSpecification } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, type FC, type ReactNode } from "react";
import { Map, useMap } from "react-map-gl/mapbox";
import CoordinateDisplay from "./components/CoordinateDisplay/CoordinateDisplay";
import Draw from "./components/Draw/Draw";
import Edit from "./components/Edit/Edit";
import FullscreenControl from "./components/FullScreen/FullScreenControl";
import MapNavigation from "./components/MapNavigation/MapNavigation";
import MultiMapLayers from "./components/MultiMapLayers/MultiMapLayers";
import { registerGeoman, unregisterGeoman } from "./utils/drawStore";

interface MapBoxpProps {
  children?: ReactNode;
}

const blankStyle: StyleSpecification = {
  version: 8,

  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  sources: {},
  layers: [],
};
const MapBox: FC<MapBoxpProps> = ({ children }) => {
  const { map } = useMap();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const geomanRef = useRef<Geoman | null>(null);

  useEffect(() => {
    if (!map) return;

    if (!geomanRef.current) {
      const geoman = new Geoman(map.getMap());
      geomanRef.current = geoman;
      registerGeoman(map, geoman);
    }

    return () => {
      if (!map || !geomanRef.current) return;
      unregisterGeoman(map);
      geomanRef.current.destroy();
      geomanRef.current = null;
    };
  }, [map]);

  return (
    <Box sx={{ width: "100%", height: "100dvh" }}>
      <Map
        mapboxAccessToken="OSQvmkeEjIl23WjHmrjA"
        initialViewState={{
          longitude: 51.389,
          latitude: 35.6892,
          zoom: 4,
        }}
        id="map"
        style={{ width: "100%", height: "100%" }}
        mapStyle={blankStyle}
      >
        <MapNavigation />
        <FullscreenControl />
        {!isMobile && <CoordinateDisplay />}
        <Draw />
        <Edit />
        <MultiMapLayers />
        {children}
      </Map>
    </Box>
  );
};

export default MapBox;
