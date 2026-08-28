import FlightIcon from "@mui/icons-material/Flight";
import { alpha, Box, Divider, Grid, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import type { FlightInfo } from "../../../FlightPopper/hooks/types";
interface ScheduleType {
  data: FlightInfo;
}
const Schedule = ({ data }: ScheduleType) => {
  return (
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
  );
};

export default Schedule;
