import { Box, Slider, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { setAirplaneSize } from "../../../features/setting/settingSlice";

const AirPlaneSetting = () => {
  const airplaneSize = useSelector(
    (state: RootState) => state.setting.airplaneSize,
  );
  const dispatch = useDispatch();
  return (
    <Box>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
        AirPlane Settings
      </Typography>
      <Box>
        <Typography variant="caption" color="text.secondary">
          Icon size: {airplaneSize}px
        </Typography>
        <Slider
          value={airplaneSize}
          onChange={(_, value) => dispatch(setAirplaneSize(value as number))}
          min={16}
          max={64}
          step={2}
          valueLabelDisplay="auto"
          size="small"
        />
      </Box>
    </Box>
  );
};

export default AirPlaneSetting;
