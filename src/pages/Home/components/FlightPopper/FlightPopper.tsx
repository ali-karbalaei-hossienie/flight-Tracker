import { Box, Popper, Slide } from "@mui/material";

import { FlightRadarCard } from "../FlightCard/FlightRadarCard";

import type { Aircraft } from "../../../../services/types";

import { useFlightPopper } from "./hooks/useFlightPopper";

interface FlightTrackerMapOverlayProps {
  selectedAircraft: Aircraft | null;
  onClose: () => void;
}

export const FlightPopper = ({
  selectedAircraft,
  onClose,
}: FlightTrackerMapOverlayProps) => {
  const { flightInfo, loading, open } = useFlightPopper({ selectedAircraft });

  /* ============================================================
     Nothing selected
  ============================================================ */
  if (!selectedAircraft || !flightInfo) {
    return null;
  }

  return (
    <Box>
      <Popper
        open={open}
        transition
        placement="right"
        modifiers={[
          {
            name: "offset",

            options: {
              offset: [0, 12],
            },
          },

          {
            name: "preventOverflow",

            options: {
              boundary: "viewport",
              padding: 16,
            },
          },
        ]}
        sx={{
          zIndex: 1300,

          position: "fixed !important",

          right: 16,

          left: "auto !important",

          top: "50%",

          transform: "translateY(20%) !important",
        }}
      >
        {({ TransitionProps }) => (
          <Slide {...TransitionProps} direction="left" timeout={300}>
            <Box>
              <FlightRadarCard
                loading={loading}
                data={flightInfo}
                onClose={onClose}
                onFollow={() => console.log("Follow clicked")}
                onRouteToggle={() => console.log("Route toggled")}
              />
            </Box>
          </Slide>
        )}
      </Popper>
    </Box>
  );
};
