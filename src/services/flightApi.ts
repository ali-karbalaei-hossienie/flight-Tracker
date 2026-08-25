import apiClient from "./axiosInstance";
import type { AircraftListResponse, AircraftQueryParams } from "./types";

export async function fetchAircraftList(
  params?: AircraftQueryParams,
): Promise<AircraftListResponse> {
  const response = await apiClient<AircraftListResponse>("/aircraft", {
    params: params as Record<string, string | number | boolean | undefined>,
  });

  return response.data;
}
