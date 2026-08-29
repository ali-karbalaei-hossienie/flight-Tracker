import apiClient from "./axiosInstance";
import type {
  AircraftListResponse,
  AircraftQueryParams,
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
