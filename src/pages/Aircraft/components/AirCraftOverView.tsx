import { AirplanemodeActive, Refresh } from "@mui/icons-material";
import {
  alpha,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

interface AirCraftOverViewProps {
  lastSync: Date | null;
  loading: boolean;
  handleRefresh: () => void;
}

const AirCraftOverView = ({
  lastSync,
  loading,
  handleRefresh,
}: AirCraftOverViewProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: { xs: 1.5, sm: 2 },
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2.5,
        bgcolor: "background.surface",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack
        direction="row"
        spacing={{ xs: 1.25, sm: 2 }}
        sx={{ alignItems: "center", minWidth: 0, flex: 1 }}
      >
        <Box
          sx={{
            width: { xs: 40, sm: 46 },
            height: { xs: 40, sm: 46 },
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.12),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <AirplanemodeActive
            sx={{
              color: "primary.main",
              fontSize: { xs: 22, sm: 26 },
            }}
          />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
              flexWrap: "wrap",
              rowGap: 0.5,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "text.primary",
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
                lineHeight: 1.2,
              }}
            >
              Fleet Overview
            </Typography>

            <Chip
              label="AirLabs Cache"
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.12),
                color: "primary.main",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                fontWeight: 600,
                fontSize: "0.68rem",
                height: 20,
              }}
            />
          </Stack>

          <Typography
            variant="caption"
            sx={{
              display: "block",
              color: "text.secondary",
              mt: 0.25,
              whiteSpace: { xs: "normal", sm: "nowrap" },
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {lastSync
              ? `Last updated: ${lastSync.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`
              : "Live ADS-B real-time flight telemetry"}
          </Typography>
        </Box>
      </Stack>

      <Tooltip title="Refresh live telemetry from backend" arrow>
        <span>
          <IconButton
            onClick={handleRefresh}
            disabled={loading}
            size="medium"
            sx={{
              bgcolor: alpha(theme.palette.text.primary, 0.05),
              border: `1px solid ${alpha(theme.palette.text.primary, 0.12)}`,
              color: "text.primary",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.15),
                borderColor: "primary.main",
                color: "primary.main",
              },
              "&.Mui-disabled": {
                bgcolor: alpha(theme.palette.text.primary, 0.02),
              },
            }}
          >
            {loading ? (
              <CircularProgress size={18} sx={{ color: "primary.main" }} />
            ) : (
              <Refresh sx={{ fontSize: 20 }} />
            )}
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
};

export default AirCraftOverView;
