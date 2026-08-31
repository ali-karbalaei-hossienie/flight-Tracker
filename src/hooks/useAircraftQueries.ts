import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
// import {
//   fetchAircraftDetail,
//   fetchAircraftList,
//   fetchAircraftTrack,
//   fetchAirports,
//   fetchAntennas,
//   fetchFleetStats,
//   fetchFlightsByAircraft,
// } from "../services/flightApi";
import {
  fetchAircraftDetail,
  fetchAircraftList,
  fetchAircraftTrack,
  fetchFleetStats,
  fetchFlightsByAircraft,
} from "../services/flightApi";
import type {
  AircraftDetail,
  // AircraftDetail,
  AircraftListResponse,
  AircraftQueryParams,
  AircraftTrackResponse,
  AirLabsFlight,
  FleetStats,
} from "../services/types";

export const queryKeys = {
  aircraft: {
    all: ["aircraft"] as const,
    lists: () => [...queryKeys.aircraft.all, "list"] as const,
    list: (params?: AircraftQueryParams) =>
      [...queryKeys.aircraft.lists(), params] as const,
    details: () => [...queryKeys.aircraft.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.aircraft.details(), id] as const,
    tracks: () => [...queryKeys.aircraft.all, "track"] as const,
    track: (id: string, time?: number) =>
      [...queryKeys.aircraft.tracks(), id, time] as const,
    history: (id: string) =>
      [...queryKeys.aircraft.all, "history", id] as const,
  },
  fleet: {
    all: ["fleet"] as const,
    stats: () => [...queryKeys.fleet.all, "stats"] as const,
  },
  // airports: {
  //   all: ["airports"] as const,
  // },
  // antennas: {
  //   all: ["antennas"] as const,
  // },
};

/**
 * Hook to query live aircraft fleet matching bounding box (bbox), zoom level, and filters.
 */
export function useAircraftListQuery(
  params?: AircraftQueryParams,
  options?: Partial<UseQueryOptions<AircraftListResponse, Error>>,
) {
  return useQuery<AircraftListResponse, Error>({
    queryKey: queryKeys.aircraft.list(params),
    queryFn: () => fetchAircraftList(params),
    staleTime: 0,
    ...options,
  });
}

/**
 * Hook to query fleet statistics and metrics.
 */
export function useFleetStatsQuery(
  options?: Partial<UseQueryOptions<FleetStats, Error>>,
) {
  return useQuery<FleetStats, Error>({
    queryKey: queryKeys.fleet.stats(),
    queryFn: () => fetchFleetStats(),
    staleTime: 10000,
    refetchInterval: 15000,
    ...options,
  });
}

export function useAircraftDetailQuery(
  aircraftId?: string | null,
  options?: Partial<UseQueryOptions<AircraftDetail, Error>>,
) {
  return useQuery<AircraftDetail, Error>({
    queryKey: queryKeys.aircraft.detail(aircraftId || ""),
    queryFn: () => fetchAircraftDetail(aircraftId!),
    enabled: Boolean(aircraftId),
    staleTime: 5000,
    ...options,
  });
}

export function useAircraftTrackQuery(
  aircraftId?: string | null,
  time?: number,
  options?: Partial<UseQueryOptions<AircraftTrackResponse, Error>>,
) {
  return useQuery<AircraftTrackResponse, Error>({
    queryKey: queryKeys.aircraft.track(aircraftId || "", time),
    queryFn: () => fetchAircraftTrack(aircraftId!, time),
    enabled: Boolean(aircraftId),
    staleTime: 10000,
    ...options,
  });
}

export function useFlightsByAircraftQuery(
  icao24?: string | null,
  options?: Partial<UseQueryOptions<AirLabsFlight[], Error>>,
) {
  return useQuery<AirLabsFlight[], Error>({
    queryKey: queryKeys.aircraft.history(icao24 || ""),
    queryFn: () => fetchFlightsByAircraft(icao24!),
    enabled: Boolean(icao24),
    staleTime: 30000,
    ...options,
  });
}
