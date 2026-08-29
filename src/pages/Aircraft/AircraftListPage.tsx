import { Box } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import {
  useAircraftListQuery,
  useFleetStatsQuery,
} from "../../hooks/useAircraftQueries";
import AirCraftMetric from "./components/AirCraftMetric";
import AirCraftOverView from "./components/AirCraftOverView";
import AircraftFiltersBar from "./components/AircraftFiltersBar";
import {
  DEFAULT_FILTERS,
  getUniqueAirlines,
  type AircraftFilters,
} from "./utils/aircraftFilters";

const AircraftListPage = () => {
  const [filters, setFilters] = useState<AircraftFilters>(DEFAULT_FILTERS);

  const {
    data: aircraftResponse,
    isLoading: aircraftLoading,
    isFetching: aircraftFetching,
    refetch: refetchAircraft,
  } = useAircraftListQuery(undefined, { refetchInterval: 15000 });

  const allAircraft = useMemo(() => {
    return aircraftResponse?.aircraft || [];
  }, [aircraftResponse]);
  const lastSync = aircraftResponse?.time
    ? new Date(aircraftResponse.time * 1000)
    : null;

  const { data: stats, refetch: refetchStats } = useFleetStatsQuery();
  const loading = aircraftLoading || aircraftFetching;
  const handleRefresh = useCallback(() => {
    refetchAircraft();
    refetchStats();
  }, [refetchAircraft, refetchStats]);

  const airlines = useMemo(() => getUniqueAirlines(allAircraft), [allAircraft]);

  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        bgcolor: "background.default",
        backgroundImage:
          "radial-gradient(ellipse at 20% 0%, rgba(25,118,210,0.08) 0%, transparent 50%)",
      }}
    >
      <Box sx={{ mx: "auto", px: { xs: 2, md: 4 }, py: 4, maxWidth: 1200 }}>
        <AirCraftOverView
          lastSync={lastSync}
          loading={loading}
          handleRefresh={handleRefresh}
        />
        <AirCraftMetric stats={stats} allAircraft={allAircraft} />
        <AircraftFiltersBar
          airlines={airlines}
          filters={filters}
          setFilters={setFilters}
        />
      </Box>
    </Box>
  );
};

export default AircraftListPage;
