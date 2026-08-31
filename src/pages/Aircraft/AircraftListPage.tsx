import { AirplanemodeActive } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  useAircraftListQuery,
  useFleetStatsQuery,
} from "../../hooks/useAircraftQueries";
import AircraftCard from "./components/AirCraftCard";
import AirCraftMetric from "./components/AirCraftMetric";
import AirCraftOverView from "./components/AirCraftOverView";
import AircraftFiltersBar from "./components/AircraftFiltersBar";
import {
  DEFAULT_FILTERS,
  filterAircraft,
  getUniqueAirlines,
  getUniqueTypes,
  sortAircraft,
  type AircraftFilters,
  type SortDirection,
  type SortField,
} from "./utils/aircraftFilters";

const AircraftListPage = () => {
  const [filters, setFilters] = useState<AircraftFilters>(DEFAULT_FILTERS);
  const [sortField, setSortField] = useState<SortField>("callsign");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    data: aircraftResponse,
    isLoading: aircraftLoading,
    isFetching: aircraftFetching,
    refetch: refetchAircraft,
  } = useAircraftListQuery(undefined, { refetchInterval: 15000 });

  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const columns = isLg ? 4 : isMd ? 3 : isSm ? 2 : 1;

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
  const aircraftTypes = useMemo(
    () => getUniqueTypes(allAircraft),
    [allAircraft],
  );

  const displayedAircraft = useMemo(() => {
    const filtered = filterAircraft(allAircraft, filters);
    return sortAircraft(filtered, sortField, sortDirection);
  }, [allAircraft, filters, sortField, sortDirection]);

  const rowCount = Math.ceil(displayedAircraft.length / columns);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 300,
    overscan: 2,
  });

  return (
    <Box
      ref={scrollRef}
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
          aircraftTypes={aircraftTypes}
          setSortField={setSortField}
          sortField={sortField}
          setSortDirection={setSortDirection}
          sortDirection={sortDirection}
        />
        <Box
          sx={{
            position: "relative",
            width: "100%",
            minHeight: 300,
            mt: 2,
          }}
        >
          {aircraftLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 300,
              }}
            >
              <CircularProgress size={48} />
            </Box>
          ) : displayedAircraft.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                borderRadius: 2,
                border: "1px dashed rgba(255,255,255,0.12)",
              }}
            >
              <AirplanemodeActive
                sx={{
                  fontSize: 48,
                  color: "text.secondary",
                  mb: 2,
                  opacity: 0.4,
                }}
              />
              <Typography variant="h6" color="text.secondary">
                No live aircraft match your filters
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Try adjusting search or filter criteria
              </Typography>
            </Box>
          ) : (
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const startIndex = virtualRow.index * columns;
                const rowAircraft = displayedAircraft.slice(
                  startIndex,
                  startIndex + columns,
                );

                return (
                  <div
                    key={virtualRow.index}
                    data-index={virtualRow.index}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                      paddingBottom: 20,
                    }}
                  >
                    <Grid container spacing={2.5}>
                      {rowAircraft.map((aircraft) => (
                        <Grid
                          key={aircraft.id}
                          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                        >
                          <AircraftCard aircraft={aircraft} />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                );
              })}
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AircraftListPage;
