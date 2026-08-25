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
import { fetchAircraftList } from "../services/flightApi";
import type {
  // AircraftDetail,
  AircraftListResponse,
  AircraftQueryParams,
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
  // fleet: {
  //   all: ["fleet"] as const,
  //   stats: (bbox?: BboxParams) =>
  //     [...queryKeys.fleet.all, "stats", bbox] as const,
  // },
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
    refetchInterval: 10000,
    ...options,
  });
}
