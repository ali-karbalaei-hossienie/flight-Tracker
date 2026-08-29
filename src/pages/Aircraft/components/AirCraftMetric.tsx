import { FlightLand, FlightTakeoff, Speed, Terrain } from "@mui/icons-material";
import { Box, Grid, Stack, Typography } from "@mui/material";
import type { Aircraft, FleetStats } from "../../../services/types";

interface AirCraftMetricProps {
  stats?: FleetStats;
  allAircraft: Aircraft[];
}

const AirCraftMetric = ({ stats, allAircraft }: AirCraftMetricProps) => {
  return (
    <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: 3, mt: 1 }}>
      <Grid size={{ xs: 12, sm: 4, md: 2.4 }}>
        <Box
          sx={{
            p: { xs: 1.5, sm: 2 },
            borderRadius: 2,
            bgcolor: "background.surface",
            border: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <FlightTakeoff sx={{ color: "primary.main", fontSize: 18 }} />
            <Typography variant="caption" color="text.secondary">
              Total Fleet
            </Typography>
          </Stack>
          <Typography
            sx={{
              mt: 0.5,
              color: "text.primary",
              fontWeight: 700,
              fontSize: { xs: "1.25rem", sm: "1.4rem", md: "1.5rem" },
            }}
          >
            {stats?.total_aircraft ?? 0}
          </Typography>
        </Box>
      </Grid>

      {/* 2. Airborne */}
      <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
        <Box
          sx={{
            p: { xs: 1.5, sm: 2 },
            borderRadius: 2,
            bgcolor: "background.surface",
            border: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
            <FlightTakeoff sx={{ color: "success.light", fontSize: 18 }} />
            <Typography variant="caption" color="text.secondary" noWrap>
              Airborne
            </Typography>
          </Stack>
          <Typography
            sx={{
              mt: 0.5,
              color: "success.light",
              fontWeight: 700,
              fontSize: { xs: "1.25rem", sm: "1.4rem", md: "1.5rem" },
            }}
          >
            {stats?.airborne ??
              allAircraft.filter((a) => a.altitude_ft > 500).length}
          </Typography>
        </Box>
      </Grid>

      {/* 3. On Ground */}
      <Grid size={{ xs: 6, sm: 4, md: 2.4 }}>
        <Box
          sx={{
            p: { xs: 1.5, sm: 2 },
            borderRadius: 2,
            bgcolor: "background.surface",
            border: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
            <FlightLand sx={{ color: "primary.light", fontSize: 18 }} />
            <Typography variant="caption" color="text.secondary" noWrap>
              On Ground
            </Typography>
          </Stack>
          <Typography
            sx={{
              mt: 0.5,
              color: "text.primary",
              fontWeight: 700,
              fontSize: { xs: "1.25rem", sm: "1.4rem", md: "1.5rem" },
            }}
          >
            {stats?.on_ground ??
              allAircraft.filter((a) => a.altitude_ft <= 500).length}
          </Typography>
        </Box>
      </Grid>

      {/* 4. Avg Altitude */}
      <Grid size={{ xs: 6, sm: 6, md: 2.4 }}>
        <Box
          sx={{
            p: { xs: 1.5, sm: 2 },
            borderRadius: 2,
            bgcolor: "background.surface",
            border: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
            <Terrain sx={{ color: "primary.light", fontSize: 18 }} />
            <Typography variant="caption" color="text.secondary" noWrap>
              Avg Altitude
            </Typography>
          </Stack>
          <Typography
            sx={{
              mt: 0.5,
              color: "text.primary",
              fontWeight: 700,
              fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.4rem" },
              whiteSpace: "nowrap",
            }}
          >
            {stats?.avg_altitude_ft
              ? stats.avg_altitude_ft.toLocaleString()
              : "0"}
            <Typography
              component="span"
              sx={{ fontSize: "0.75rem", ml: 0.5, color: "text.secondary" }}
            >
              ft
            </Typography>
          </Typography>
        </Box>
      </Grid>

      {/* 5. Avg Speed */}
      <Grid size={{ xs: 6, sm: 6, md: 2.4 }}>
        <Box
          sx={{
            p: { xs: 1.5, sm: 2 },
            borderRadius: 2,
            bgcolor: "background.surface",
            border: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
            <Speed sx={{ color: "primary.light", fontSize: 18 }} />
            <Typography variant="caption" color="text.secondary" noWrap>
              Avg Speed
            </Typography>
          </Stack>
          <Typography
            sx={{
              mt: 0.5,
              color: "text.primary",
              fontWeight: 700,
              fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.4rem" },
              whiteSpace: "nowrap",
            }}
          >
            {stats?.avg_speed_kts ?? 0}
            <Typography
              component="span"
              sx={{ fontSize: "0.75rem", ml: 0.5, color: "text.secondary" }}
            >
              kts
            </Typography>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AirCraftMetric;
