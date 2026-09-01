import {
  AirplanemodeActive,
  ArrowForward,
  Route,
  Speed,
  Terrain,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { Box, Chip, Stack, Typography, useTheme } from "@mui/material";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import type { Aircraft } from "../../../services/types";
import AircraftThumb from "./AircraftThumb";

interface AircraftCardProps {
  aircraft: Aircraft;
}

function AircraftCard({ aircraft }: AircraftCardProps) {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClick = useCallback(() => {
    navigate(`/airplane/${aircraft.id}`);
  }, [navigate, aircraft.id]);

  const { primary, background, text, divider } = theme.palette;

  return (
    <Box
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        borderRadius: 2.5,
        overflow: "hidden",

        bgcolor: background.paper,
        border: `1px solid ${divider}`,

        transition:
          "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",

        "&:hover": {
          transform: "translateY(-6px)",

          boxShadow: `0 16px 40px ${alpha(theme.palette.common.black, 0.45)}`,

          borderColor: primary.main,

          "& .card-arrow": {
            opacity: 1,
            transform: "translateX(0)",
          },

          "& .card-image": {
            transform: "scale(1.06)",
          },
        },
      }}
    >
      {/* Image */}
      <Box
        sx={{
          position: "relative",
          height: 140,
          overflow: "hidden",
        }}
      >
        <AircraftThumb
          className="card-image"
          sx={{
            transition: "transform 0.4s ease",
          }}
        />

        {/* Image overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              to top,
              ${alpha(background.default, 0.95)} 0%,
              ${alpha(background.default, 0.2)} 60%
            )`,
          }}
        />

        {/* Aircraft type */}
        <Chip
          label={aircraft.aircraftType}
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            height: 22,
            fontSize: "0.65rem",
            fontWeight: 600,

            bgcolor: primary.main,
            color: primary.contrastText,

            "& .MuiChip-label": {
              px: 1,
            },
          }}
        />

        {/* Arrow */}
        <Box
          className="card-arrow"
          sx={{
            position: "absolute",
            top: 10,
            right: 10,

            opacity: 0,
            transform: "translateX(-8px)",

            transition: "opacity 0.25s ease, transform 0.25s ease",

            bgcolor: primary.main,
            borderRadius: "50%",

            width: 28,
            height: 28,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ArrowForward
            sx={{
              fontSize: 16,
              color: primary.contrastText,
            }}
          />
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ p: 1.75 }}>
        {/* Callsign + ID */}
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            mb: 0.5,
          }}
          spacing={0.75}
        >
          <AirplanemodeActive
            sx={{
              fontSize: 16,
              color: primary.main,
            }}
          />

          <Typography
            variant="subtitle2"
            sx={{
              color: text.primary,
              fontWeight: 700,
            }}
          >
            {aircraft.callsign}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: text.secondary,
            }}
          >
            {aircraft.id}
          </Typography>
        </Stack>

        {/* Airline */}
        <Typography
          variant="caption"
          sx={{
            color: text.secondary,
            display: "block",
            mb: 1,
          }}
        >
          {aircraft.airline}
        </Typography>

        {/* Route */}
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            alignItems: "center",
            mb: 1.25,
          }}
        >
          <Route
            sx={{
              fontSize: 14,
              color: text.secondary,
            }}
          />

          <Typography
            variant="caption"
            sx={{
              color: alpha(text.primary, 0.8),
              fontWeight: 500,
            }}
          >
            {aircraft.origin_city} → {aircraft.destination_city}
          </Typography>
        </Stack>

        {/* Stats */}
        <Stack direction="row" spacing={0.75}>
          <Chip
            icon={
              <Terrain
                sx={{
                  fontSize: "14px !important",
                  color: `${alpha(text.primary, 0.7)} !important`,
                }}
              />
            }
            label={`${aircraft.altitude_ft.toLocaleString()} ft`}
            size="small"
            sx={{
              height: 24,
              fontSize: "0.7rem",

              bgcolor: alpha(text.primary, 0.08),
              color: alpha(text.primary, 0.88),

              "& .MuiChip-label": {
                px: 1,
              },
            }}
          />

          <Chip
            icon={
              <Speed
                sx={{
                  fontSize: "14px !important",
                  color: `${alpha(text.primary, 0.7)} !important`,
                }}
              />
            }
            label={`${aircraft.speed_kts} kts`}
            size="small"
            sx={{
              height: 24,
              fontSize: "0.7rem",

              bgcolor: alpha(text.primary, 0.08),
              color: alpha(text.primary, 0.88),

              "& .MuiChip-label": {
                px: 1,
              },
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default memo(AircraftCard);
