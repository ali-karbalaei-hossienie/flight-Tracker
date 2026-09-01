import {
  AirplanemodeActive,
  ArrowBack,
  Explore,
  Flight,
  FlightTakeoff,
  History,
  LocationOn,
  Radio,
  Refresh,
  Route,
  Schedule,
  Sensors,
  Speed,
  Terrain,
  VerticalAlignTop,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Fade,
  Grow,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useCallback, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useAircraftDetailQuery,
  useAircraftTrackQuery,
  useFlightsByAircraftQuery,
} from "../../hooks/useAircraftQueries";
import type { AircraftDetail } from "../../services/types";
import AircraftThumb from "../Aircraft/components/AircraftThumb";

interface InfoBlockProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  delay: number;
}

function InfoBlock({ icon, label, value, delay }: InfoBlockProps) {
  return (
    <Grow in timeout={500 + delay}>
      <Box
        sx={(theme) => ({
          p: 2,
          borderRadius: 2,

          bgcolor: theme.palette.background.surface,
          border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,

          transition: "border-color 0.2s ease",

          "&:hover": {
            borderColor: alpha(theme.palette.primary.main, 0.4),
          },
        })}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            mb: 0.75,
          }}
        >
          {icon}

          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
        </Stack>

        <Typography
          variant="h6"
          sx={{
            color: "text.primary",
            fontWeight: 700,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Grow>
  );
}

export default function AircraftDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: detailData,
    isLoading: detailLoading,
    isFetching: detailFetching,
    refetch: refetchDetail,
  } = useAircraftDetailQuery(id);

  const { data: trackData, refetch: refetchTrack } = useAircraftTrackQuery(id);

  const { data: flightHistoryData, refetch: refetchHistory } =
    useFlightsByAircraftQuery(id);

  const aircraft: AircraftDetail | null = detailData ?? null;
  const isLive = Boolean(detailData);
  const flightHistory = flightHistoryData || [];
  const loading = detailLoading || detailFetching;

  const loadAircraftDetails = useCallback(() => {
    refetchDetail();
    refetchTrack();
    refetchHistory();
  }, [refetchDetail, refetchTrack, refetchHistory]);

  if (loading && !aircraft) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          bgcolor: "background.default",
        }}
      >
        <CircularProgress color="primary" />

        <Typography variant="body2" color="text.secondary">
          Fetching live aircraft telemetry...
        </Typography>
      </Box>
    );
  }

  if (!aircraft) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Live aircraft '{id}' not found in active airspace reports
        </Typography>

        <Button variant="outlined" onClick={() => navigate("/airplane")}>
          Back to Fleet
        </Button>
      </Box>
    );
  }

  const lastUpdate = aircraft.lastUpdate
    ? new Date(aircraft.lastUpdate).toLocaleString()
    : "Live";

  const headingLabel = `${aircraft.heading_deg}°`;

  const verticalRate = aircraft.vertical_rate_fpm
    ? `${aircraft.vertical_rate_fpm > 0 ? "+" : ""}${aircraft.vertical_rate_fpm} fpm`
    : "Level Flight";

  const waypoints = trackData?.waypoints?.length
    ? trackData.waypoints
    : (aircraft.path || []).map((p) => ({
        lat: p[0],
        lon: p[1],
        altitude_ft: aircraft.altitude_ft,
      }));

  return (
    <Box
      sx={{
        height: "100%",
        overflow: "auto",
        bgcolor: "background.default",
      }}
    >
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          height: {
            xs: 220,
            md: 300,
          },
          overflow: "hidden",
        }}
      >
        <AircraftThumb
          iconSize={340}
          sx={{
            animation: "heroZoom 8s ease-out forwards",

            "@keyframes heroZoom": {
              from: {
                transform: "scale(1.1)",
              },
              to: {
                transform: "scale(1)",
              },
            },
          }}
        />

        {/* Hero overlay */}
        <Box
          sx={(theme) => ({
            position: "absolute",
            inset: 0,

            background: `linear-gradient(
              to top,
              ${theme.palette.background.default} 0%,
              ${alpha(theme.palette.background.default, 0.6)} 50%,
              ${alpha(theme.palette.background.default, 0.3)} 100%
            )`,
          })}
        />

        {/* Back */}
        <IconButton
          onClick={() => navigate("/airplane")}
          sx={(theme) => ({
            position: "absolute",
            top: 16,
            left: 16,

            bgcolor: alpha(theme.palette.background.default, 0.7),
            color: theme.palette.text.primary,

            "&:hover": {
              bgcolor: alpha(theme.palette.background.default, 0.9),
            },
          })}
        >
          <ArrowBack />
        </IconButton>

        {/* Refresh */}
        <Tooltip title="Refresh telemetry">
          <IconButton
            onClick={loadAircraftDetails}
            disabled={loading}
            sx={(theme) => ({
              position: "absolute",
              top: 16,
              right: 16,

              bgcolor: alpha(theme.palette.background.default, 0.7),
              color: theme.palette.text.primary,

              "&:hover": {
                bgcolor: alpha(theme.palette.background.default, 0.9),
              },
            })}
          >
            {loading ? (
              <CircularProgress size={18} color="primary" />
            ) : (
              <Refresh fontSize="small" />
            )}
          </IconButton>
        </Tooltip>

        {/* Hero information */}
        <Fade in timeout={600}>
          <Box
            sx={{
              position: "absolute",
              bottom: 24,
              left: 24,
              right: 24,
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                mb: 0.5,
                flexWrap: "wrap",
              }}
            >
              <AirplanemodeActive
                sx={{
                  color: "primary.main",
                }}
              />

              <Typography
                variant="h4"
                component="h4"
                sx={{
                  fontWeight: 800,
                  color: "text.primary",
                }}
              >
                {aircraft.callsign}
              </Typography>

              <Chip
                label={aircraft.aircraftType}
                size="small"
                sx={{
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  fontWeight: 600,
                }}
              />

              <Chip
                label={isLive ? "Live ADS-B" : "Airspace Record"}
                size="small"
                sx={(theme) => ({
                  bgcolor: isLive
                    ? alpha(theme.palette.success.main, 0.2)
                    : alpha(theme.palette.text.primary, 0.1),

                  color: isLive
                    ? theme.palette.success.main
                    : theme.palette.text.primary,

                  fontWeight: 600,
                  fontSize: "0.65rem",
                  height: 22,
                })}
              />
            </Stack>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
              }}
            >
              {aircraft.airline} · {aircraft.id.toUpperCase()}{" "}
              {aircraft.country ? `· ${aircraft.country}` : ""}
            </Typography>
          </Box>
        </Fade>
      </Box>

      {/* Content */}
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          px: {
            xs: 2,
            md: 4,
          },
          py: 4,
        }}
      >
        {/* Route */}
        <Fade in timeout={700}>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
            sx={{
              alignItems: {
                xs: "flex-start",
                sm: "center",
              },
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Box
              sx={(theme) => ({
                p: 2,
                borderRadius: 2,
                bgcolor: theme.palette.background.surface,
                border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                flex: 1,
              })}
            >
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "center",
                  mb: 0.5,
                }}
              >
                <Flight
                  sx={{
                    color: "primary.main",
                    fontSize: 20,
                  }}
                />

                <Typography variant="overline" color="text.secondary">
                  Route
                </Typography>
              </Stack>

              <Typography
                variant="h6"
                sx={{
                  color: "text.primary",
                  fontWeight: 700,
                }}
              >
                {aircraft.origin_city} → {aircraft.destination_city}
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<Explore />}
              onClick={() => navigate(`/?select=${aircraft.id}`)}
              sx={{
                py: 1.25,
                px: 3,
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              View on Map
            </Button>
          </Stack>
        </Fade>

        {/* Telemetry */}
        <Typography
          variant="subtitle2"
          sx={{
            mb: 1.5,
            color: "text.primary",
            fontWeight: 700,
          }}
        >
          Live Flight Telemetry
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              sm: "repeat(3, 1fr)",
              md: "repeat(6, 1fr)",
            },
            gap: 1.5,
            mb: 3,
          }}
        >
          <InfoBlock
            icon={
              <Terrain
                sx={{
                  fontSize: 18,
                  color: "primary.main",
                }}
              />
            }
            label="Altitude"
            value={`${aircraft.altitude_ft.toLocaleString()} ft`}
            delay={0}
          />

          <InfoBlock
            icon={
              <Speed
                sx={{
                  fontSize: 18,
                  color: "primary.main",
                }}
              />
            }
            label="Speed"
            value={`${aircraft.speed_kts} kts`}
            delay={60}
          />

          <InfoBlock
            icon={
              <Route
                sx={{
                  fontSize: 18,
                  color: "primary.main",
                }}
              />
            }
            label="Heading"
            value={headingLabel}
            delay={120}
          />

          <InfoBlock
            icon={
              <VerticalAlignTop
                sx={{
                  fontSize: 18,
                  color: "primary.main",
                }}
              />
            }
            label="Vert. Rate"
            value={verticalRate}
            delay={180}
          />

          <InfoBlock
            icon={
              <Radio
                sx={{
                  fontSize: 18,
                  color: "primary.main",
                }}
              />
            }
            label="Squawk"
            value={aircraft.squawk || "1200"}
            delay={240}
          />

          <InfoBlock
            icon={
              <Schedule
                sx={{
                  fontSize: 18,
                  color: "primary.main",
                }}
              />
            }
            label="Last Update"
            value={lastUpdate}
            delay={300}
          />
        </Box>

        {/* Current Position & Waypoints */}
        <Fade in timeout={900}>
          <Box
            sx={(theme) => ({
              p: 2.5,
              borderRadius: 2,
              bgcolor: theme.palette.background.surface,
              border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
              mb: 3,
            })}
          >
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                mb: 1.5,
              }}
              spacing={1}
            >
              <LocationOn
                sx={{
                  color: "primary.main",
                }}
              />

              <Typography
                variant="subtitle2"
                sx={{
                  color: "text.primary",
                  fontWeight: 700,
                }}
              >
                Current Coordinates & Sensors
              </Typography>
            </Stack>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              Latitude: {aircraft.lat.toFixed(4)}° · Longitude:{" "}
              {aircraft.lon.toFixed(4)}°
              {aircraft.position_source
                ? ` · Source: ${aircraft.position_source}`
                : ""}
            </Typography>

            <Divider sx={{ my: 1.5 }} />

            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{
                color: "text.primary",
                fontWeight: 700,
              }}
            >
              Trajectory Waypoints ({waypoints.length})
            </Typography>

            <Stack
              spacing={0.75}
              sx={{
                mt: 1,
                maxHeight: 220,
                overflow: "auto",
              }}
            >
              {waypoints.map((point, i) => (
                <Grow in key={i} timeout={300 + i * 30}>
                  <Box
                    sx={(theme) => ({
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",

                      py: 0.75,
                      px: 1.5,

                      borderRadius: 1.5,

                      bgcolor: alpha(theme.palette.text.primary, 0.06),
                    })}
                  >
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{
                        alignItems: "center",
                      }}
                    >
                      <Chip
                        label={i + 1}
                        size="small"
                        sx={{
                          width: 28,
                          height: 24,
                          fontSize: "0.7rem",
                          bgcolor: "primary.main",
                          color: "primary.contrastText",
                        }}
                      />

                      <Typography variant="body2" color="text.primary">
                        {point.lat.toFixed(3)}°, {point.lon.toFixed(3)}°
                      </Typography>
                    </Stack>

                    <Typography variant="caption" color="text.secondary">
                      {point.altitude_ft
                        ? `${point.altitude_ft.toLocaleString()} ft`
                        : `${aircraft.altitude_ft.toLocaleString()} ft`}
                    </Typography>
                  </Box>
                </Grow>
              ))}
            </Stack>
          </Box>
        </Fade>

        {/* Technical Details */}
        <Fade in timeout={1000}>
          <Box
            sx={(theme) => ({
              p: 2.5,
              borderRadius: 2,
              bgcolor: theme.palette.background.surface,
              border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
              mb: 3,
            })}
          >
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                mb: 1,
              }}
              spacing={1}
            >
              <Sensors
                sx={{
                  color: "primary.main",
                  fontSize: 20,
                }}
              />

              <Typography
                variant="subtitle2"
                sx={{
                  color: "text.primary",
                  fontWeight: 700,
                }}
              >
                Transponder & Technical Specifications
              </Typography>
            </Stack>

            <Stack spacing={1} sx={{ mt: 1.5 }}>
              {[
                ["Transponder Hex (ICAO24)", aircraft.id.toUpperCase()],
                ["Callsign", aircraft.callsign],
                ["Airline / Operator", aircraft.airline],
                ["Aircraft Type", aircraft.aircraftType],
                ["Origin Country", aircraft.country || "Iran"],
                ["Squawk Mode A/C", aircraft.squawk || "1200"],
                [
                  "Position Source",
                  aircraft.position_source || "ADS-B Transponder",
                ],
                [
                  "Flight Status",
                  aircraft.on_ground ? "On Ground" : "En Route (Airborne)",
                ],
              ].map(([label, value], i, rows) => (
                <Box
                  key={label}
                  sx={(theme) => ({
                    display: "flex",
                    justifyContent: "space-between",

                    py: 0.75,

                    borderBottom:
                      i < rows.length - 1
                        ? `1px solid ${alpha(theme.palette.text.primary, 0.06)}`
                        : "none",
                  })}
                >
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.primary",
                      fontWeight: 600,
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Fade>

        {/* Flight History */}
        {flightHistory.length > 0 && (
          <Fade in timeout={1100}>
            <Box
              sx={(theme) => ({
                p: 2.5,
                borderRadius: 2,
                bgcolor: theme.palette.background.surface,
                border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
              })}
            >
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "center",
                  mb: 1.5,
                }}
              >
                <History
                  sx={{
                    color: "primary.main",
                    fontSize: 20,
                  }}
                />

                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "text.primary",
                    fontWeight: 700,
                  }}
                >
                  Recent Flight Operations (AirLabs)
                </Typography>
              </Stack>

              <Stack spacing={1}>
                {flightHistory.slice(0, 5).map((f, i) => (
                  <Box
                    key={i}
                    sx={(theme) => ({
                      p: 1.5,
                      borderRadius: 1.5,

                      bgcolor: alpha(theme.palette.text.primary, 0.04),

                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    })}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        alignItems: "center",
                      }}
                    >
                      <FlightTakeoff
                        sx={{
                          fontSize: 16,
                          color: "primary.main",
                        }}
                      />

                      <Typography variant="body2" color="text.primary">
                        {f.dep_iata || f.dep_icao || "Origin"} →{" "}
                        {f.arr_iata || f.arr_icao || "Destination"}
                      </Typography>
                    </Stack>

                    <Typography variant="caption" color="text.secondary">
                      {f.updated
                        ? new Date(f.updated * 1000).toLocaleDateString()
                        : "Active"}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Fade>
        )}
      </Box>
    </Box>
  );
}
