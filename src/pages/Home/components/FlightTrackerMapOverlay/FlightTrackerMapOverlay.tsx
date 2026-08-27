import { useMemo } from "react";
import { Box, Popper, Slide } from "@mui/material";
import { useEffect, useState } from "react";
import { FlightRadarCard } from "../FlightCard/FlightRadarCard";
import type { Aircraft } from "../../../../services/types";
import { calculateFlightProgress } from "../AircraftLayer/utils/flightCalculations";

interface FlightTrackerMapOverlayProps {
  selectedAircraft: Aircraft | null;
  onClose: () => void;
}

export const FlightTrackerMapOverlay = ({
  selectedAircraft,
  onClose,
}: FlightTrackerMapOverlayProps) => {
  const [loadedAircraft, setLoadedAircraft] = useState<Aircraft | null>(null);

  const open = Boolean(selectedAircraft);

  useEffect(() => {
    if (!selectedAircraft) return;

    const timer = window.setTimeout(() => {
      setLoadedAircraft(selectedAircraft);
    }, 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [selectedAircraft]);

  const progress = useMemo(() => {
    if (!selectedAircraft) return null;
    return calculateFlightProgress(selectedAircraft);
  }, [selectedAircraft]);

  const loading =
    selectedAircraft !== null && loadedAircraft !== selectedAircraft;

  if (!selectedAircraft) {
    return null;
  }

  const flightInfo = {
    callsign: selectedAircraft.callsign,
    flightNumber: selectedAircraft.flight_icao,
    aircraftModel: selectedAircraft.aircraft_icao,
    airline: selectedAircraft.airline,
    photoUrl:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80",
    photographer: "Daniel Klein",

    origin: {
      iata: selectedAircraft.dep_iata,
      city: selectedAircraft.origin_city,
      timezone: "IRST (UTC +03:30)",
      scheduledTime: "11:05 AM",
      actualTime: "11:46 AM",
    },

    destination: {
      iata: selectedAircraft.arr_iata,
      city: selectedAircraft.destination_city,
      timezone: "IRST (UTC +03:30)",
      scheduledTime: "11:10 AM",
      estimatedTime: "00:05 AM",
    },

    progress: progress ?? {
      percentage: 0,
      coveredDistance: "—",
      elapsedTime: "—",
      remainingDistance: "—",
      remainingTime: "—",
    },
  };

  return (
    <Box>
      <Popper
        open={open}
        transition
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
          transform: "translateY(10%) !important",
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
