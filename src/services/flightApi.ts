import apiClient from "./axiosInstance";
import type {
  AircraftDetail,
  AircraftListResponse,
  AircraftQueryParams,
  AircraftTrackResponse,
  AirLabsFlight,
  FleetStats,
} from "./types";

export async function fetchAircraftList(
  params?: AircraftQueryParams,
): Promise<AircraftListResponse> {
  const response = await apiClient<AircraftListResponse>("/aircraft", {
    params: params as Record<string, string | number | boolean | undefined>,
  });

  return response.data;
}

/**
 * Fetch summary telemetry and metrics for the active fleet
 */
export async function fetchFleetStats(): Promise<FleetStats> {
  const response = await apiClient<FleetStats>("/stats");
  return response.data;
}

export async function fetchAircraftDetail(
  aircraftId: string,
): Promise<AircraftDetail> {
  const response = await apiClient<AircraftDetail>(
    `/aircraft/${encodeURIComponent(aircraftId)}`,
  );
  return response.data;
}

export async function fetchAircraftTrack(
  aircraftId: string,
  time?: number,
): Promise<AircraftTrackResponse> {
  const response = await apiClient<AircraftTrackResponse>(
    `/aircraft/${encodeURIComponent(aircraftId)}/track`,
    {
      params: time !== undefined ? { time } : undefined,
    },
  );
  return response.data;
}

export async function fetchFlightsByAircraft(
  icao24: string,
): Promise<AirLabsFlight[]> {
  const response = await apiClient<AirLabsFlight[]>(
    `/flights/aircraft/${encodeURIComponent(icao24)}`,
  );
  return response.data;
}
