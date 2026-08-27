import { useEffect, useMemo, useState } from "react";
import { Box, Popper, Slide } from "@mui/material";

import { FlightRadarCard } from "../FlightCard/FlightRadarCard";

import type { Aircraft } from "../../../../services/types";

import { calculateFlightProgress } from "../AircraftLayer/utils/flightCalculations";

interface FlightTrackerMapOverlayProps {
  selectedAircraft: Aircraft | null;
  onClose: () => void;
}

export const FlightPopper = ({
  selectedAircraft,
  onClose,
}: FlightTrackerMapOverlayProps) => {
  const [loadedAircraft, setLoadedAircraft] = useState<Aircraft | null>(null);

  const open = Boolean(selectedAircraft);

  /* ============================================================
     Delay loading state
  ============================================================ */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoadedAircraft(selectedAircraft);
    }, 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [selectedAircraft]);

  /* ============================================================
     Flight Progress
  ============================================================ */

  const progress = useMemo(() => {
    if (!selectedAircraft) {
      return null;
    }

    return calculateFlightProgress(selectedAircraft);
  }, [selectedAircraft]);

  /* ============================================================
     Loading
  ============================================================ */

  const loading =
    selectedAircraft !== null && loadedAircraft !== selectedAircraft;

  /* ============================================================
     Flight Info
  ============================================================ */

  const flightInfo = useMemo(() => {
    if (!selectedAircraft) {
      return null;
    }

    return {
      callsign: selectedAircraft.callsign,

      flightNumber: selectedAircraft.flight_icao,

      aircraftModel: selectedAircraft.aircraft_icao,

      airline: selectedAircraft.airline,

      /* ========================================================
         Aircraft Photos
      ======================================================== */

      photos: [
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",

        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&q=80",

        "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=800&q=80",

        "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=800&q=80",
      ],

      photographer: "Daniel Klein",

      /* ========================================================
         Origin
      ======================================================== */

      origin: {
        iata: selectedAircraft.dep_iata,

        city: selectedAircraft.origin_city,

        timezone: "IRST (UTC +03:30)",

        scheduledTime: "11:05 AM",

        actualTime: "11:46 AM",
      },

      /* ========================================================
         Destination
      ======================================================== */

      destination: {
        iata: selectedAircraft.arr_iata,

        city: selectedAircraft.destination_city,

        timezone: "IRST (UTC +03:30)",

        scheduledTime: "11:10 AM",

        estimatedTime: "00:05 AM",
      },

      /* ========================================================
         Progress
      ======================================================== */

      progress: progress ?? {
        percentage: 0,
        coveredDistance: "—",
        elapsedTime: "—",
        remainingDistance: "—",
        remainingTime: "—",
      },
    };
  }, [selectedAircraft, progress]);

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
