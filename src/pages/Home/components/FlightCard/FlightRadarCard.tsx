import { Box, CircularProgress, Paper, alpha } from "@mui/material";
import React from "react";

import type { FlightInfo } from "../FlightPopper/hooks/types";
import CardFooter from "./components/CardFooter/CardFooter";
import CardHeader from "./components/CardHeader/CardHeader";
import ImageSlider from "./components/ImageSlider/ImageSlider";
import Schedule from "./components/Schedule/Schedule";

interface FlightRadarCardProps {
  data: FlightInfo;
  onClose: () => void;
  loading?: boolean;
}

export const FlightRadarCard: React.FC<FlightRadarCardProps> = ({
  data,
  onClose,

  loading = false,
}) => {
  return (
    <Paper
      elevation={8}
      sx={{
        width: 360,
        maxWidth: "100vw",
        position: "relative",
        bgcolor: "background.paper",
        color: "text.primary",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: (t) => `0 8px 32px ${alpha(t.palette.common.black, 0.45)}`,
        userSelect: "none",
      }}
    >
      {/* =========================================================
          Header
      ========================================================= */}
      <CardHeader onClose={onClose} data={data} />

      {/* =========================================================
          Aircraft Image Slider
      ========================================================= */}
      <ImageSlider data={data} />

      {/* =========================================================
          Route & Schedule
      ========================================================= */}
      <Schedule data={data} />

      {/* =========================================================
          Bottom Actions
      ========================================================= */}
      <CardFooter data={data} />

      {/* =========================================================
          Loading Overlay
      ========================================================= */}
      {loading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 10,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            backgroundColor: (t) => alpha(t.palette.background.paper, 0.7),

            backdropFilter: "blur(2px)",
          }}
        >
          <CircularProgress
            size={28}
            thickness={4}
            sx={{
              color: "primary.main",
            }}
          />
        </Box>
      )}
    </Paper>
  );
};
