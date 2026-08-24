import { Box } from "@mui/material";
import { LAYERS } from "../../constants/layers";
import RightLayer from "./components/RightLayer";
import { useRightLayerStyles } from "./styles/useRightLayerStyles";

const RightLayers = () => {
  const { classes } = useRightLayerStyles();

  return (
    <Box className={classes["right-layers-buttons-container"]}>
      {LAYERS.map((map) => (
        <RightLayer key={map.id} map={map} />
      ))}
    </Box>
  );
};

export default RightLayers;
