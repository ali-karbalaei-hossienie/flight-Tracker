import React, { useEffect, useMemo } from "react";
import {
  Popper,
  Paper,
  Typography,
  Box,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TimelineIcon from "@mui/icons-material/Timeline";
import type { Aircraft } from "../../../../services/types";
import { useMap } from "react-map-gl/mapbox";

interface AircraftPopperProps {
  data: {
    aircraft: Aircraft;
    x: number;
    y: number;
  } | null;
  onClose: () => void;
  onDrawTrack?: (aircraft: Aircraft) => void;
}

export const AircraftPopper: React.FC<AircraftPopperProps> = ({
  data,
  onClose,
  onDrawTrack,
}) => {
  const open = Boolean(data);

  const { current: map } = useMap();

  useEffect(() => {
    const handleMapClick = () => {
      onClose();
    };

    map?.on("click", handleMapClick);

    return () => {
      map?.off("click", handleMapClick);
    };
  }, [map, onClose]);

  const virtualAnchor = useMemo(() => {
    if (!data) return null;
    return {
      getBoundingClientRect: () =>
        ({
          top: data.y,
          bottom: data.y,
          left: data.x,
          right: data.x,
          width: 0,
          height: 0,
          x: data.x,
          y: data.y,
        }) as DOMRect,
    };
  }, [data?.x, data?.y]);

  if (!open || !data) return null;

  const { aircraft } = data;

  return (
    <Popper
      open={open}
      anchorEl={virtualAnchor}
      placement="top"
      disablePortal={false}
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 12],
          },
        },
      ]}
      sx={{ zIndex: 1300 }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 2,
          minWidth: 260,
          backgroundColor: "rgba(15, 23, 42, 0.92)",
          backdropFilter: "blur(8px)",
          color: "#fff",
          borderRadius: 2,
          border: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {aircraft.callsign || "Unknown Flight"}
          </Typography>
          <IconButton size="small" onClick={onClose} sx={{ color: "grey.400" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", my: 1 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, my: 1 }}>
          <Typography variant="body2" color="grey.400">
            heading_deg:
            <span style={{ color: "#fff" }}>
              {aircraft.heading_deg || "N/A"}
            </span>
          </Typography>
          <Typography variant="body2" color="grey.400">
            Altitude:
            <span style={{ color: "#fff" }}>
              {aircraft.altitude_ft ? `${aircraft.altitude_ft} ft` : "N/A"}
            </span>
          </Typography>
          <Typography variant="body2" color="grey.400">
            Speed:
            <span style={{ color: "#fff" }}>
              {aircraft.speed_kts ? `${aircraft.speed_kts} kts` : "N/A"}
            </span>
          </Typography>
        </Box>

        {onDrawTrack && (
          <Button
            fullWidth
            variant="contained"
            size="small"
            startIcon={<TimelineIcon />}
            onClick={() => onDrawTrack(aircraft)}
            sx={{
              mt: 1.5,
              textTransform: "none",
              backgroundColor: "#2563eb",
              "&:hover": { backgroundColor: "#1d4ed8" },
            }}
          >
            Draw Track
          </Button>
        )}
      </Paper>
    </Popper>
  );
};
