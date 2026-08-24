import { Box, Divider, Switch, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { LAYERS } from "../../constants/layers";
import { useMapLayerStyles } from "../../styles/useMapLayerStyles";
import BaseLayer from "../BaseLayer/BaseLayer";
import { SplitMode } from "../SplitMode/SplitMode";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../../../../../app/store";
import { setIsSplitMode } from "../../../../../../features/multiMapLayers/multiMapLayersSlice";

const MapLayers = () => {
  const { classes } = useMapLayerStyles();
  const dispatch = useDispatch();
  const { isSplitMode } = useSelector(
    (state: RootState) => state.multiMapLayer,
  );

  const { t } = useTranslation();

  return (
    <div>
      <Typography variant="subtitle1">
        {isSplitMode ? t("multiMapLayers") : t("mapLayers")}
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Box className={classes["split-mode-toggle"]}>
        <Typography component="div">
          {isSplitMode ? t("singleMode") : t("splitMode")}
        </Typography>
        <Switch
          checked={isSplitMode}
          onChange={() => dispatch(setIsSplitMode(!isSplitMode))}
        />
      </Box>
      <AnimatePresence mode="wait">
        {!isSplitMode ? (
          <motion.div
            key="base-layers"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
          >
            <Box className={classes["base-layers-buttons-container"]}>
              {LAYERS.map((map) => (
                <BaseLayer key={map.id} map={map} />
              ))}
            </Box>
          </motion.div>
        ) : (
          <motion.div
            key="split-mode"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <SplitMode />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapLayers;
