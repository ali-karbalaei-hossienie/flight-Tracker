import { Search } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useCallback, type Dispatch, type SetStateAction } from "react";
import type { AircraftFilters, SortField } from "../utils/aircraftFilters";

interface AircraftFiltersBarProps {
  filters: AircraftFilters;
  setFilters: (filters: AircraftFilters) => void;
  airlines: string[];
  aircraftTypes: string[];
  setSortField: Dispatch<SetStateAction<SortField>>;
  sortField: SortField;
}

const AircraftFiltersBar = ({
  filters,
  setFilters,
  airlines,
  aircraftTypes,
  setSortField,
  sortField,
}: AircraftFiltersBarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = useCallback(
    (patch: Partial<AircraftFilters>) => {
      setFilters({ ...filters, ...patch });
    },
    [filters, setFilters],
  );

  return (
    <Box
      sx={{
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2,
        bgcolor: "background.surface",
        border: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        sx={{ alignItems: "center", flexWrap: "wrap" }}
      >
        <TextField
          size="small"
          placeholder="Search callsign, airline, route..."
          value={filters.search}
          onChange={(e) => handleChange({ search: e.target.value })}
          sx={{ flex: 1, minWidth: 200 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ fontSize: 20, color: "text.secondary" }} />
                </InputAdornment>
              ),
            },
          }}
        />
        <FormControl
          size="small"
          fullWidth={isMobile}
          sx={{ minWidth: isMobile ? undefined : 150 }}
        >
          <InputLabel>Airline</InputLabel>
          <Select
            label="Airline"
            value={filters.airline}
            onChange={(e) => handleChange({ airline: e.target.value })}
          >
            <MenuItem value="all">All Airlines</MenuItem>
            {airlines.map((a) => (
              <MenuItem key={a} value={a}>
                {a}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          size="small"
          fullWidth={isMobile}
          sx={{ minWidth: isMobile ? undefined : 130 }}
        >
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            value={filters.aircraftType}
            onChange={(e) => handleChange({ aircraftType: e.target.value })}
          >
            <MenuItem value="all">All Types</MenuItem>
            {aircraftTypes.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          size="small"
          fullWidth={isMobile}
          sx={{ minWidth: isMobile ? undefined : 140 }}
        >
          <InputLabel>Sort by</InputLabel>
          <Select
            label="Sort by"
            value={sortField}
            onChange={(e) => setSortField(e.target.value as SortField)}
          >
            <MenuItem value="callsign">Callsign</MenuItem>
            <MenuItem value="airline">Airline</MenuItem>
            <MenuItem value="altitude">Altitude</MenuItem>
            <MenuItem value="speed">Speed</MenuItem>
            <MenuItem value="lastUpdate">Last Update</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default AircraftFiltersBar;
