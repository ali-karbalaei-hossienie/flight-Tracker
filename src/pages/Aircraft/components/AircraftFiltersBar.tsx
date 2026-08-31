import { FilterList, Search } from "@mui/icons-material";
import {
  Box,
  Collapse,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type {
  AircraftFilters,
  SortDirection,
  SortField,
} from "../utils/aircraftFilters";

interface AircraftFiltersBarProps {
  filters: AircraftFilters;
  setFilters: (filters: AircraftFilters) => void;
  airlines: string[];
  aircraftTypes: string[];
  setSortField: Dispatch<SetStateAction<SortField>>;
  sortField: SortField;
  setSortDirection: Dispatch<SetStateAction<SortDirection>>;
  sortDirection: SortDirection;
}

const filterIconButtonSx = (active: boolean) => ({
  width: 42,
  height: 42,
  flexShrink: 0,
  alignSelf: "center",
  borderRadius: 2,
  border: "1px solid",
  borderColor: active ? "primary.main" : "rgba(255,255,255,0.12)",
  bgcolor: active ? "primary.main" : "rgba(255,255,255,0.06)",
  color: active ? "#fff" : "text.secondary",
  transition: "all 0.2s ease",
  "&:hover": {
    bgcolor: active ? "primary.dark" : "rgba(255,255,255,0.1)",
    borderColor: active ? "primary.dark" : "rgba(255,255,255,0.2)",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 22,
  },
});

const AircraftFiltersBar = ({
  filters,
  setFilters,
  airlines,
  aircraftTypes,
  setSortField,
  sortField,
  setSortDirection,
  sortDirection,
}: AircraftFiltersBarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [showAdvanced, setShowAdvanced] = useState(false);

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
        <FormControl
          size="small"
          fullWidth={isMobile}
          sx={{ minWidth: isMobile ? undefined : 110 }}
        >
          <InputLabel>Order</InputLabel>
          <Select
            label="Order"
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value as SortDirection)}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
        <Tooltip
          title={showAdvanced ? "Hide altitude filter" : "Show altitude filter"}
        >
          <IconButton
            onClick={() => setShowAdvanced((v) => !v)}
            aria-label="Toggle altitude filter"
            sx={filterIconButtonSx(showAdvanced)}
          >
            <FilterList />
          </IconButton>
        </Tooltip>
      </Stack>
      <Collapse in={showAdvanced}>
        <Box
          sx={{ mt: 2, pt: 2, borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Altitude range (ft)
            </Typography>
            <Slider
              value={[filters.minAltitude, filters.maxAltitude]}
              onChange={(_, value) => {
                const [min, max] = value as number[];
                handleChange({ minAltitude: min, maxAltitude: max });
              }}
              min={0}
              max={45000}
              step={1000}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => `${v.toLocaleString()} ft`}
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default AircraftFiltersBar;
