import CircleIcon from "@mui/icons-material/Circle";
import GestureIcon from "@mui/icons-material/Gesture";
import PolylineIcon from "@mui/icons-material/Polyline";
import RoomIcon from "@mui/icons-material/Room";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/mapbox";

import { useStyles } from "./styles/ToolsStyles";
import PolygonIcon from "../../assets/PolygonIcon";
import { getGeoman } from "../../utils/drawStore";
import MapControl from "../MapControl/MapControl";
import ExpandableBox from "../ExpandableBox/ExpandableBox";
import { useTranslation } from "react-i18next";

type ModeType = "marker" | "circle" | "polygon" | "line" | null;

const DRAW_MODES = [
  { value: "marker", title: "marker", icon: <RoomIcon fontSize="small" /> },
  { value: "circle", title: "circle", icon: <CircleIcon fontSize="small" /> },
  {
    value: "polygon",
    title: "polygon",
    icon: <PolygonIcon fontSize="small" />,
  },
  { value: "line", title: "line", icon: <PolylineIcon fontSize="small" /> },
] as const;

const Draw = () => {
  const [activeMode, setActiveMode] = useState<ModeType>(null);
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { map } = useMap();

  useEffect(() => {
    const geoman = getGeoman(map);

    if (!geoman) return;

    if (activeMode === null) {
      geoman.disableDraw();
      return;
    }

    geoman.enableDraw(activeMode);
  }, [activeMode, map]);

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    mode: ModeType,
  ) => {
    setActiveMode(mode);
  };

  return (
    <div>
      <MapControl position="top-right">
        <ExpandableBox
          accordionText={t("draw")}
          accordionIcon={
            <GestureIcon
              sx={{
                fontSize: 20,
                color: "text.secondary",
              }}
            />
          }
        >
          <ToggleButtonGroup
            color="primary"
            value={activeMode}
            exclusive
            onChange={handleChange}
            className={classes["toggle-button-group"]}
            size="small"
          >
            {DRAW_MODES.map((mode) => (
              <Tooltip
                key={mode.value}
                title={t(mode.title)}
                placement="left"
                disableInteractive
              >
                <ToggleButton
                  className={classes["draw-button"]}
                  value={mode.value}
                >
                  {mode.icon}
                </ToggleButton>
              </Tooltip>
            ))}
          </ToggleButtonGroup>
        </ExpandableBox>
      </MapControl>
    </div>
  );
};

export default Draw;
