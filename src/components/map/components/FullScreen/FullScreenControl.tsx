import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { Box, IconButton, Paper, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/mapbox"; // Import useMap
import MapControl from "../MapControl/MapControl";
import { useTranslation } from "react-i18next";

const FullscreenControl = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { t } = useTranslation();
  // Get the current map instance
  const { current: map } = useMap();

  // Function to toggle fullscreen mode for the map container only
  const toggleFullscreen = () => {
    if (!map) return; // Safety check

    // Get the specific HTML element that contains the map
    const mapContainer = map.getContainer();

    if (!document.fullscreenElement) {
      // Enter fullscreen on the map container
      mapContainer.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Listen for 'Esc' key or browser fullscreen changes to keep state in sync
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <MapControl position="bottom-right">
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
          transition: "all 0.4s ease-in-out",
          width: "fit-content",
          p: 0.5,
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        })}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Tooltip
            title={isFullscreen ? t("exitFullScreen") : t("enterFullScreen")}
            placement="left"
            arrow
          >
            <IconButton
              disableRipple
              sx={{
                "&:hover": {
                  backgroundColor: "initial !important",
                },
              }}
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <FullscreenExitIcon fontSize="small" />
              ) : (
                <FullscreenIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
    </MapControl>
  );
};

export default FullscreenControl;
