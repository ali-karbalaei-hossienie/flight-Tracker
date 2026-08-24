import { Box, ButtonBase, Typography } from "@mui/material";
import { type FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useMapLayerStyles } from "../../styles/useMapLayerStyles";
import type { LayerType } from "../../../../../../features/multiMapLayers/types";
import type { RootState } from "../../../../../../app/store";
import { setSelectedBaseLayers } from "../../../../../../features/multiMapLayers/multiMapLayersSlice";

interface BaseLayerProps {
  map: LayerType;
}

const BaseLayer: FC<BaseLayerProps> = ({ map }) => {
  const { classes, cx } = useMapLayerStyles();

  const dispatch = useDispatch();
  const selectedBaseLayers = useSelector(
    (state: RootState) => state.multiMapLayer.selectedBaseLayers,
  );
  const handleSelectBaseLayer = (item: LayerType) => {
    if (selectedBaseLayers[0].id === item.id) return;

    dispatch(setSelectedBaseLayers(item));
  };

  return (
    <>
      <ButtonBase
        key={map.id}
        onClick={() => handleSelectBaseLayer(map)}
        className={cx(
          classes["base-layers-button"],
          selectedBaseLayers[0].id === map.id &&
            classes["base-layers-button--selected"],
        )}
      >
        <Box
          component="img"
          src={map.image}
          alt={map.name}
          sx={{
            width: 1,
            height: 1,
            objectFit: "cover",
          }}
        />

        <Typography
          variant="caption"
          noWrap
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            py: 0.25,
            textAlign: "center",
            color: "#ffffff",

            background:
              "linear-gradient(to top, rgba(0,0,0,.75), rgba(0,0,0,0))",
            fontWeight: 600,
            pointerEvents: "none",
          }}
        >
          {map.name}
        </Typography>
      </ButtonBase>
    </>
  );
};

export default BaseLayer;
