import * as turf from "@turf/turf";
import type { Aircraft } from "../../../../../services/types";

interface FlightProgress {
  percentage: number;
  coveredDistance: string;
  remainingDistance: string;
  elapsedTime: string;
  remainingTime: string;
}

const formatMinutesToHours = (minutes: number): string => {
  if (isNaN(minutes) || minutes < 0) return "—";
  const hrs = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  if (hrs === 0) return `${mins}m`;
  return `${hrs}h ${mins}m`;
};

export const calculateFlightProgress = (
  aircraft: Aircraft,
  destCoordinates?: [number, number],
): FlightProgress => {
  const { path, speed_kts, lon, lat } = aircraft;

  const formattedPath =
    path && path.length > 1
      ? path.map(([pLat, pLon]) => [pLon, pLat])
      : [[lon, lat]];

  let coveredDistanceKm = 0;
  if (formattedPath.length > 1) {
    const line = turf.lineString(formattedPath);
    coveredDistanceKm = turf.length(line, { units: "kilometers" });
  }

  let remainingDistanceKm = 0;
  if (destCoordinates) {
    const currentPoint = turf.point([lon, lat]);
    const destPoint = turf.point(destCoordinates);
    remainingDistanceKm = turf.distance(currentPoint, destPoint, {
      units: "kilometers",
    });
  }

  const totalDistanceKm = coveredDistanceKm + remainingDistanceKm;

  const percentage =
    totalDistanceKm > 0
      ? Math.min(100, Math.round((coveredDistanceKm / totalDistanceKm) * 100))
      : 0;

  const speedKmh = speed_kts ? speed_kts * 1.852 : 0;

  let remainingTimeStr = "—";
  let elapsedTimeStr = "—";

  if (speedKmh > 0) {
    if (remainingDistanceKm > 0) {
      const remainingMinutes = (remainingDistanceKm / speedKmh) * 60;
      remainingTimeStr = formatMinutesToHours(remainingMinutes);
    }

    if (coveredDistanceKm > 0) {
      const elapsedMinutes = (coveredDistanceKm / speedKmh) * 60;
      elapsedTimeStr = formatMinutesToHours(elapsedMinutes);
    }
  }

  return {
    percentage,
    coveredDistance:
      coveredDistanceKm > 0 ? `${Math.round(coveredDistanceKm)} km` : "—",
    remainingDistance:
      remainingDistanceKm > 0 ? `${Math.round(remainingDistanceKm)} km` : "—",
    elapsedTime: elapsedTimeStr,
    remainingTime: remainingTimeStr,
  };
};
