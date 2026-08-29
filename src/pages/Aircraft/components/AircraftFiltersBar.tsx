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
import React, { useCallback } from "react";
import type { AircraftFilters } from "../utils/aircraftFilters";

interface AircraftFiltersBarProps {
  filters: AircraftFilters;
  setFilters: (filters: AircraftFilters) => void;
  airlines: string[];
}

const AircraftFiltersBar = ({
  filters,
  setFilters,
  airlines,
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
      </Stack>
    </Box>
  );
};

export default AircraftFiltersBar;
