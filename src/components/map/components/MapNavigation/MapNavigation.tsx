import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NavigationOutlinedIcon from "@mui/icons-material/NavigationOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Box, IconButton, Paper, Tooltip } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, type FC } from "react";
import { useMap } from "react-map-gl/mapbox";
import MapControl from "../MapControl/MapControl";
import { useTranslation } from "react-i18next";

const MapNavigation: FC = () => {
  const { map } = useMap();
  const zoomTextRef = useRef<HTMLDivElement>(null);
  const compassRef = useRef<HTMLSpanElement>(null);
  const { t } = useTranslation();
  const flyToHome = useCallback(() => {
    map?.flyTo({ center: [53.688, 32.4279], zoom: 5, duration: 2000 });
  }, [map]);

  const handleZoomIn = useCallback(() => {
    map?.zoomIn({ duration: 500 });
  }, [map]);

  const handleZoomOut = useCallback(() => {
    map?.zoomOut({ duration: 500 });
  }, [map]);

  const handleCompass = useCallback(() => {
    map?.resetNorth({ duration: 500 });
  }, [map]);

  useEffect(() => {
    if (!map) return;

    const updateZoom = () => {
      if (zoomTextRef.current) {
        zoomTextRef.current.innerText = String(Math.round(map.getZoom()));
      }
    };

    const updateCompass = () => {
      if (compassRef.current) {
        compassRef.current.style.transform = `rotate(${-map.getBearing()}deg)`;
      }
    };

    updateZoom();
    updateCompass();

    map.on("zoom", updateZoom);
    map.on("rotate", updateCompass);

    return () => {
      map.off("zoom", updateZoom);
      map.off("rotate", updateCompass);
    };
  }, [map]);

  const controls = useMemo(() => {
    const controls = [
      {
        id: "home",
        type: "button",
        icon: <HomeOutlinedIcon fontSize="small" />,
        onClick: flyToHome,
        title: "home",
      },
      {
        id: "zoom-in",
        type: "button",
        icon: <AddOutlinedIcon fontSize="small" />,
        onClick: handleZoomIn,
        title: "zoomIn",
      },
      {
        id: "zoom-text",
        type: "custom",
        title: "zoom-text",

        // Custom render for the zoom text which is not an IconButton
        render: () => (
          <Box key="zoom-text" ref={zoomTextRef}>
            {map ? Math.round(map.getZoom()) : 5}
          </Box>
        ),
      },
      {
        id: "zoom-out",
        type: "button",
        icon: <RemoveOutlinedIcon fontSize="small" />,
        onClick: handleZoomOut,
        title: "zoomOut",
      },
      {
        id: "compass",
        type: "button",
        icon: (
          <Box
            component="span"
            ref={compassRef}
            sx={{
              display: "flex",
              transition: "transform 100ms linear",
              transformOrigin: "center",
            }}
          >
            <NavigationOutlinedIcon fontSize="small" />
          </Box>
        ),
        onClick: handleCompass,
        // Extra styles specific to compass button
        sx: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        title: "resetNorth",
      },
    ];
    return controls;
  }, []);

  return (
    <MapControl position="top-left">
      <Paper
        elevation={4}
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "12px",
          overflow: "hidden",
          backdropFilter: "blur(10px)",
          backgroundColor: "background.paper",
          border: `1px solid ${theme.palette.background.paper}`,
          gap: 0.5,
          p: 0.5,
          width: "fit-content",
        })}
      >
        {controls.map((control) => {
          // Render custom elements (like the zoom text Box)
          if (control.type === "custom" && control.render) {
            return control.render();
          }

          // Render normal IconButtons
          return (
            <Tooltip title={t(control.title as never)} placement="right">
              <IconButton
                key={control.id}
                onClick={control.onClick}
                sx={(theme) => ({
                  boxShadow: theme.shadows[1],
                  transition: "all 0.4s ease-in-out",
                  ...control.sx,
                  "&:hover": {
                    backgroundColor: `${theme.palette.primary.main} !important`,
                  },
                })}
              >
                {control.icon}
              </IconButton>
            </Tooltip>
          );
        })}
      </Paper>
    </MapControl>
  );
};

export default MapNavigation;
