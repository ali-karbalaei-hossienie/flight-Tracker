import { Box } from "@mui/material";
import { LAYERS } from "../../constants/layers";
import LeftLayer from "./components/LeftLayer";
import { useLeftLayerStyles } from "./styles/useLeftLayerStyles";

const LeftLayers = () => {
  const { classes } = useLeftLayerStyles();
  return (
    <Box className={classes["left-layers-buttons-container"]}>
      {LAYERS.map((map) => (
        <LeftLayer key={map.id} map={map} />
      ))}
    </Box>
  );
};

export default LeftLayers;
