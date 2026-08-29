import type { Aircraft } from "../../../services/types";
export type SortField =
  | "callsign"
  | "airline"
  | "altitude"
  | "speed"
  | "lastUpdate";
export interface AircraftFilters {
  search: string;
  airline: string;
  aircraftType: string;
  minAltitude: number;
  maxAltitude: number;
}

export const DEFAULT_FILTERS: AircraftFilters = {
  search: "",
  airline: "all",
  aircraftType: "all",
  minAltitude: 0,
  maxAltitude: 45000,
};
export type SortDirection = "asc" | "desc";

export function getUniqueAirlines(aircraft: Aircraft[]): string[] {
  return [...new Set(aircraft.map((a) => a.airline))].sort();
}

export function getUniqueTypes(aircraft: Aircraft[]): string[] {
  return [...new Set(aircraft.map((a) => a.aircraftType))].sort();
}
