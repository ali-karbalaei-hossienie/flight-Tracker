import type { Aircraft } from "../../../../../../services/types";

export interface FlightInfo {
  callsign: string;
  flightNumber: string | undefined;
  aircraftModel: string | undefined;
  airline: string;
  photos: string[];
  photographer: string;
  origin: {
    iata: string | undefined;
    city: string;
    timezone: string;
    scheduledTime: string;
    actualTime: string;
  };
  destination: {
    iata: string | undefined;
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

export interface IFlightPopper {
  selectedAircraft: Aircraft | null;
}

export interface useFlightPopperReturn {
  open: boolean;
  flightInfo: FlightInfo | null;
  loading: boolean;
}
