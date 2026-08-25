export interface BaseAircraft {
  id: string;
  callsign: string;
  airline: string;
  aircraftType: string;
  lat: number;
  lon: number;
  altitude_ft: number;
  heading_deg: number;
  speed_kts: number;
  origin_city: string;
  destination_city: string;
  path: [number, number][];
  lastUpdate: string;
}

export interface AircraftQueryParams {
  lamin?: number;
  lomin?: number;
  lamax?: number;
  lomax?: number;
  zoom?: number;
  search?: string;
  airline?: string;
  min_altitude?: number;
  max_altitude?: number;
  on_ground?: boolean;
  force_refresh?: boolean;
}

export interface Aircraft extends BaseAircraft {
  icao24?: string;
  country?: string;
  squawk?: string;
  on_ground?: boolean;
  vertical_rate_fpm?: number;
  geo_altitude_ft?: number;
  category?: number;

  // AirLabs / Route properties
  reg_number?: string;
  flight_icao?: string;
  flight_iata?: string;
  dep_iata?: string;
  dep_icao?: string;
  arr_iata?: string;
  arr_icao?: string;
  airline_icao?: string;
  airline_iata?: string;
  aircraft_icao?: string;
  status?: string;
}

export interface AircraftListResponse {
  total: number;
  count: number;
  time: number;
  aircraft: Aircraft[];
  cached: boolean;
}
