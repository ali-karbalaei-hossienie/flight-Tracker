import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Tooltip } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import DragIcon from "../../assets/DragIcon";
import EditIcon from "../../assets/EditIcon";
import RotateIcon from "../../assets/RotateIcon";
import { useStyles } from "../Draw/styles/ToolsStyles";
import ExpandableBox from "../ExpandableBox/ExpandableBox";
import DeleteIcon from "../../assets/DeleteIcon";
import MapControl from "../MapControl/MapControl";
import { getGeoman } from "../../utils/drawStore";
import { useTranslation } from "react-i18next";

type EditMode = "edit" | "change" | "delete" | "drag" | "rotate" | null;

const EDIT_MODES = [
  { value: "drag", title: "drag", icon: <DragIcon fontSize="small" /> },
  { value: "edit", title: "edit", icon: <EditIcon fontSize="small" /> },
  { value: "rotate", title: "rotate", icon: <RotateIcon fontSize="small" /> },
  { value: "delete", title: "delete", icon: <DeleteIcon fontSize="small" /> },
] as const;

const Edit = () => {
  const [activeMode, setActiveMode] = useState<EditMode>(null);
  const { t } = useTranslation();

  const { classes } = useStyles();
  const { map } = useMap();

  useEffect(() => {
    const mapBox = map?.getMap();

    if (!map || !mapBox || !mapBox.isStyleLoaded()) {
      return;
    }

    const geoman = getGeoman(map);

    if (!geoman) return;

    const syncMode = async () => {
      try {
        await Promise.all([
          geoman.disableGlobalDragMode(),
          geoman.disableGlobalEditMode(),
          geoman.disableGlobalRemovalMode(),
          geoman.disableGlobalRotateMode(),
        ]);

        switch (activeMode) {
          case "drag":
            await geoman.enableGlobalDragMode();
            break;

          case "edit":
            await geoman.enableGlobalEditMode();
            break;

          case "rotate":
            await geoman.enableGlobalRotateMode();
            break;

          case "delete":
            await geoman.enableGlobalRemovalMode();
            break;
        }
      } catch (error) {
        console.warn("Geoman edit mode update failed:", error);
      }
    };

    void syncMode();
  }, [activeMode, map]);

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    mode: EditMode,
  ) => {
    setActiveMode(mode);
  };

  return (
    <div>
      <MapControl position="top-right">
        <ExpandableBox
          accordionIcon={
            <ModeEditIcon
              sx={{
                fontSize: 20,
                color: "text.secondary",
              }}
            />
          }
          accordionText={t("edit")}
        >
          <ToggleButtonGroup
            color="primary"
            value={activeMode}
            exclusive
            onChange={handleChange}
            className={classes["toggle-button-group"]}
          >
            {EDIT_MODES.map((mode) => (
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

export default Edit;
