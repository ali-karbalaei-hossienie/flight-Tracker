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
  alpha,
  useTheme,
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

import SimpleImageSlider from "react-simple-image-slider";

export interface FlightInfo {
  callsign: string;
  flightNumber: string;
  aircraftModel: string;
  airline: string;

  photos: string[];
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
    percentage: number;
    coveredDistance: string;
    elapsedTime: string;
    remainingDistance: string;
    remainingTime: string;
  };
}

interface FlightRadarCardProps {
  data: FlightInfo;
  onClose?: () => void;
  onFollow?: () => void;
  onRouteToggle?: () => void;
  loading?: boolean;
}

export const FlightRadarCard: React.FC<FlightRadarCardProps> = ({
  data,
  onClose,
  onFollow,
  onRouteToggle,
  loading = false,
}) => {
  const theme = useTheme();

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
      <Box
        sx={{
          p: 1.5,
          pb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          bgcolor: (t) =>
            t.palette.mode === "dark"
              ? alpha(t.palette.common.black, 0.3)
              : alpha(t.palette.action.hover, 0.08),
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 0.5,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "primary.main",
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
                bgcolor: "action.selected",
                color: "text.primary",
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
                bgcolor: (t) => alpha(t.palette.primary.main, 0.15),
                color: "primary.main",
                borderRadius: 0.75,
              }}
            />
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: "0.85rem",
            }}
          >
            {data.airline}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <IconButton
            size="small"
            sx={{
              color: "primary.main",
            }}
          >
            <StarBorderIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              color: "text.secondary",
              "&:hover": {
                color: "text.primary",
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* =========================================================
          Aircraft Image Slider
      ========================================================= */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 180,
          bgcolor: "common.black",
          overflow: "hidden",

          // react-simple-image-slider کلاس‌های داخلی دارد.
          // اینجا ظاهر تصویر را کنترل می‌کنیم.
          "& .rsis-container": {
            width: "100% !important",
            height: "180px !important",
          },

          "& .rsis-image": {
            backgroundSize: "cover !important",
            backgroundPosition: "center !important",
          },
        }}
      >
        <SimpleImageSlider
          width={360}
          height={180}
          images={data.photos.map((url) => ({
            url,
          }))}
          showBullets
          showNavs
          navStyle={2}
          navSize={28}
          navMargin={12}
          slideDuration={0.4}
          autoPlay={true}
          loop
          useGPURender
          bgColor={theme.palette.common.black}
        />

        {/* =====================================================
            Image Overlay
        ===================================================== */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            pointerEvents: "none",

            background: (t) =>
              `linear-gradient(
                to top,
                ${alpha(t.palette.common.black, 0.8)} 0%,
                transparent 100%
              )`,

            px: 1.5,
            py: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "common.white",
              fontSize: "0.75rem",
            }}
          >
            © {data.photographer}
          </Typography>
        </Box>

        {/* Open Image */}
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            right: 8,
            bottom: 8,
            zIndex: 5,
            color: "common.white",
            backgroundColor: alpha(theme.palette.common.black, 0.45),

            "&:hover": {
              backgroundColor: alpha(theme.palette.common.black, 0.7),
            },
          }}
        >
          <OpenInNewIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      {/* =========================================================
          Route & Schedule
      ========================================================= */}
      <Box
        sx={{
          bgcolor: (t) =>
            t.palette.mode === "dark"
              ? alpha(t.palette.background.default, 0.6)
              : t.palette.background.default,

          color: "text.primary",
          p: 2,
        }}
      >
        {/* Origin / Plane / Destination */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Origin */}
          <Box
            sx={{
              textAlign: "left",
              flex: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "text.primary",
                lineHeight: 1,
              }}
            >
              {data.origin.iata}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                mt: 0.5,
                fontSize: "0.8rem",
                color: "text.secondary",
              }}
            >
              {data.origin.city}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                opacity: 0.8,
                fontSize: "0.7rem",
              }}
            >
              {data.origin.timezone}
            </Typography>
          </Box>

          {/* Plane */}
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              bgcolor: "background.paper",
              boxShadow: (t) =>
                `0 2px 8px ${alpha(t.palette.common.black, 0.15)}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: 1.5,
              flexShrink: 0,
            }}
          >
            <FlightIcon
              sx={{
                color: "primary.main",
                transform: "rotate(90deg)",
                fontSize: 26,
              }}
            />
          </Box>

          {/* Destination */}
          <Box
            sx={{
              textAlign: "right",
              flex: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "text.primary",
                lineHeight: 1,
              }}
            >
              {data.destination.iata}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                mt: 0.5,
                fontSize: "0.8rem",
                color: "text.secondary",
              }}
            >
              {data.destination.city}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                opacity: 0.8,
                fontSize: "0.7rem",
              }}
            >
              {data.destination.timezone}
            </Typography>
          </Box>
        </Box>

        <Divider
          sx={{
            my: 1.5,
            borderColor: "divider",
          }}
        />

        {/* =====================================================
            Timetable
        ===================================================== */}
        <Grid
          container
          spacing={1}
          sx={{
            mb: 2,
          }}
        >
          {/* Origin Times */}
          <Grid
            size={6}
            sx={{
              borderRight: 1,
              borderColor: "divider",
              pr: 1.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                }}
              >
                SCHEDULED
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                }}
              >
                {data.origin.scheduledTime}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                }}
              >
                ACTUAL
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                }}
              >
                {data.origin.actualTime}
              </Typography>
            </Box>
          </Grid>

          {/* Destination Times */}
          <Grid
            size={6}
            sx={{
              pl: 1.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                }}
              >
                SCHEDULED
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                }}
              >
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
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                }}
              >
                ESTIMATED
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <FiberManualRecordIcon
                  sx={{
                    fontSize: 10,
                    color: "success.main",
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: "success.main",
                  }}
                >
                  {data.destination.estimatedTime}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* =====================================================
            Flight Progress
        ===================================================== */}
        <Box
          sx={{
            mt: 2,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 6,
              bgcolor: (t) =>
                t.palette.mode === "dark"
                  ? alpha(t.palette.common.white, 0.12)
                  : alpha(t.palette.common.black, 0.12),
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                width: `${data.progress.percentage}%`,
                height: "100%",
                bgcolor: "primary.main",
                borderRadius: 3,
                transition: "width 300ms ease",
              }}
            />

            {/* Plane marker */}
            <Box
              sx={{
                position: "absolute",
                left: `calc(${data.progress.percentage}% - 10px)`,
                top: -8,
                color: "text.secondary",
                transform: "rotate(90deg)",
                transition: "left 300ms ease",
              }}
            >
              <FlightIcon
                sx={{
                  fontSize: 20,
                }}
              />
            </Box>
          </Box>

          {/* Distance / Time */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                fontSize: "0.72rem",
              }}
            >
              {data.progress.coveredDistance}, {data.progress.elapsedTime}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                fontSize: "0.72rem",
              }}
            >
              {data.progress.remainingDistance}, {data.progress.remainingTime}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* =========================================================
          Bottom Actions
      ========================================================= */}
      <Box
        sx={{
          bgcolor: (t) =>
            t.palette.mode === "dark"
              ? alpha(t.palette.common.black, 0.4)
              : alpha(t.palette.action.hover, 0.05),

          py: 1,
          px: 0.5,

          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",

          borderTop: 1,
          borderColor: "divider",
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

/* ===============================================================
   Action Button
================================================================ */

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

      color: "text.secondary",
      opacity: 0.85,

      transition: (t) =>
        t.transitions.create(["opacity", "color"], {
          duration: t.transitions.duration.shorter,
        }),

      "&:hover": {
        opacity: 1,
        color: "primary.main",
      },

      minWidth: 52,
    }}
  >
    {React.cloneElement(
      icon as React.ReactElement<{
        sx?: Record<string, unknown>;
      }>,
      {
        sx: {
          fontSize: 20,
          mb: 0.3,
        },
      },
    )}

    <Typography
      variant="caption"
      sx={{
        fontSize: "0.68rem",
        fontWeight: 500,
      }}
    >
      {label}
    </Typography>
  </Box>
);
