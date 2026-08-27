import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Paper,
  Divider,
  Grid,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FlightIcon from "@mui/icons-material/Flight";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import IosShareIcon from "@mui/icons-material/IosShare";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export interface FlightInfo {
  callsign: string;
  flightNumber: string;
  aircraftModel: string;
  airline: string;
  photoUrl: string;
  photographer: string;
  origin: {
    iata: string;
    city: string;
    timezone: string;
    scheduledTime: string;
    actualTime: string;
  };
  destination: {
    iata: string;
    city: string;
    timezone: string;
    scheduledTime: string;
    estimatedTime: string;
  };
  progress: {
    percentage: number; // 0 تا 100
    coveredDistance: string; // "727 km"
    elapsedTime: string; // "00:54 ago"
    remainingDistance: string; // "1,723 km"
    remainingTime: string; // "in 02:07"
  };
}

interface FlightRadarCardProps {
  data: FlightInfo;
  onClose?: () => void;
  onFollow?: () => void;
  onRouteToggle?: () => void;
}

export const FlightRadarCard: React.FC<FlightRadarCardProps> = ({
  data,
  onClose,
  onFollow,
  onRouteToggle,
  loading,
}) => {
  return (
    <Paper
      elevation={8}
      sx={{
        width: 360,
        maxWidth: "100vw",
        bgcolor: "#22252a",
        color: "#fff",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
        fontFamily: "Roboto, sans-serif",
        userSelect: "none",
      }}
    >
      {/* ─── Header: Callsign & Controls ─── */}
      <Box
        sx={{
          p: 1.5,
          pb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          bgcolor: "#1a1c1e",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "#ffc800",
                letterSpacing: 0.8,
                lineHeight: 1.1,
              }}
            >
              {data.callsign}
            </Typography>

            <Chip
              label={data.flightNumber}
              size="small"
              sx={{
                height: 20,
                fontSize: "0.72rem",
                fontWeight: 700,
                bgcolor: "#34383f",
                color: "#e0e0e0",
                borderRadius: 0.75,
              }}
            />
            <Chip
              label={data.aircraftModel}
              size="small"
              sx={{
                height: 20,
                fontSize: "0.72rem",
                fontWeight: 700,
                bgcolor: "#194d6e",
                color: "#89d7ff",
                borderRadius: 0.75,
              }}
            />
          </Box>
          <Typography
            variant="body2"
            sx={{ color: "#b0b3b8", fontSize: "0.85rem" }}
          >
            {data.airline}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton size="small" sx={{ color: "#e0c068" }}>
            <StarBorderIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{ color: "#aaa", "&:hover": { color: "#fff" } }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* ─── Plane Image Section ─── */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 180,
          bgcolor: "#000",
        }}
      >
        <Box
          component="img"
          src={data.photoUrl}
          alt={data.aircraftModel}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Image Credits & Indicators */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
            px: 1.5,
            py: 0.8,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#f0f0f0", fontSize: "0.75rem" }}
          >
            © {data.photographer}
          </Typography>

          {/* Dots slider indicators */}
          <Box sx={{ display: "flex", gap: 0.6, alignItems: "center" }}>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "#ffc800",
              }}
            />
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.4)",
              }}
            />
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.4)",
              }}
            />
          </Box>

          <IconButton
            size="small"
            sx={{ p: 0.2, color: "rgba(255,255,255,0.7)" }}
          >
            <OpenInNewIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>

      {/* ─── Route & Schedule Box (Light Theme Container) ─── */}
      <Box sx={{ bgcolor: "#eceff2", color: "#1a1c1e", p: 2 }}>
        {/* Origin / Plane Icon / Destination */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Origin */}
          <Box sx={{ textAlign: "left", flex: 1 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, color: "#1a1c1e", lineHeight: 1 }}
            >
              {data.origin.iata}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                mt: 0.5,
                fontSize: "0.8rem",
                color: "#333",
              }}
            >
              {data.origin.city}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#777", fontSize: "0.7rem" }}
            >
              {data.origin.timezone}
            </Typography>
          </Box>

          {/* Plane Animated / Centered Icon */}
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              bgcolor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: 1.5,
            }}
          >
            <FlightIcon
              sx={{
                color: "#f2b705",
                transform: "rotate(90deg)",
                fontSize: 26,
              }}
            />
          </Box>

          {/* Destination */}
          <Box sx={{ textAlign: "right", flex: 1 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, color: "#1a1c1e", lineHeight: 1 }}
            >
              {data.destination.iata}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                mt: 0.5,
                fontSize: "0.8rem",
                color: "#333",
              }}
            >
              {data.destination.city}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#777", fontSize: "0.7rem" }}
            >
              {data.destination.timezone}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1.5, borderColor: "#d3d7dc" }} />

        {/* Timetable Matrix */}
        <Grid container spacing={1} sx={{ mb: 2 }}>
          {/* Origin Times */}
          <Grid size={6} sx={{ borderRight: "1px solid #d3d7dc", pr: 1.5 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#686f78", fontWeight: 600 }}
              >
                SCHEDULED
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {data.origin.scheduledTime}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="caption"
                sx={{ color: "#686f78", fontWeight: 600 }}
              >
                ACTUAL
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {data.origin.actualTime}
              </Typography>
            </Box>
          </Grid>

          {/* Destination Times */}
          <Grid size={6} sx={{ pl: 1.5 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#686f78", fontWeight: 600 }}
              >
                SCHEDULED
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {data.destination.scheduledTime}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#686f78", fontWeight: 600 }}
              >
                ESTIMATED
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <FiberManualRecordIcon
                  sx={{ fontSize: 10, color: "#2e7d32" }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: "#1b5e20" }}
                >
                  {data.destination.estimatedTime}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* ─── Flight Progress Bar with Airplane Needle ─── */}
        <Box sx={{ mt: 2, position: "relative" }}>
          {/* Progress track */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 6,
              bgcolor: "#d1d5db",
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                width: `${data.progress.percentage}%`,
                height: "100%",
                bgcolor: "#f5a623",
                borderRadius: 3,
              }}
            />
            {/* Plane marker on the bar */}
            <Box
              sx={{
                position: "absolute",
                left: `calc(${data.progress.percentage}% - 10px)`,
                top: -8,
                color: "#555",
                transform: "rotate(90deg)",
              }}
            >
              <FlightIcon sx={{ fontSize: 20 }} />
            </Box>
          </Box>

          {/* Distance and Time info */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography
              variant="caption"
              sx={{ color: "#555", fontWeight: 600, fontSize: "0.72rem" }}
            >
              {data.progress.coveredDistance}, {data.progress.elapsedTime}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#555", fontWeight: 600, fontSize: "0.72rem" }}
            >
              {data.progress.remainingDistance}, {data.progress.remainingTime}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ─── Bottom Actions Bar ─── */}
      <Box
        sx={{
          bgcolor: "#191c20",
          py: 1,
          px: 0.5,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          borderTop: "1px solid #2a2e35",
        }}
      >
        <ActionButton icon={<ViewInArIcon />} label="3D view" />
        <ActionButton
          icon={<AltRouteIcon />}
          label="Route"
          onClick={onRouteToggle}
        />
        <ActionButton
          icon={<CenterFocusStrongIcon />}
          label="Follow"
          onClick={onFollow}
        />
        <ActionButton icon={<IosShareIcon />} label="Share" />
        <ActionButton icon={<MoreHorizIcon />} label="More" />
      </Box>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 10,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            backgroundColor: "rgba(0, 0, 0, 0.35)",
            backdropFilter: "blur(2px)",
          }}
        >
          <CircularProgress
            size={28}
            thickness={4}
            sx={{
              color: "#ffc800",
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

// کامپوننت کمکی دکمه‌های فوتر
const ActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}> = ({ icon, label, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      opacity: 0.85,
      transition: "opacity 0.2s",
      "&:hover": { opacity: 1, color: "#ffc800" },
      minWidth: 52,
    }}
  >
    {React.cloneElement(
      icon as React.ReactElement<{ sx?: Record<string, unknown> }>,
      {
        sx: { fontSize: 20, mb: 0.3 },
      },
    )}
    <Typography variant="caption" sx={{ fontSize: "0.68rem", fontWeight: 500 }}>
      {label}
    </Typography>
  </Box>
);
