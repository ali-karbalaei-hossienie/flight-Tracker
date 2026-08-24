import { Box, ButtonBase, Typography } from "@mui/material";
import { type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLeftLayerStyles } from "../styles/useLeftLayerStyles";
import type { LayerType } from "../../../../../../../features/multiMapLayers/types";
import type { RootState } from "../../../../../../../app/store";
import { setSelectedLeftLayers } from "../../../../../../../features/multiMapLayers/multiMapLayersSlice";

interface BaseLayerProps {
  map: LayerType;
}

const LeftLayer: FC<BaseLayerProps> = ({ map }) => {
  const { classes, cx } = useLeftLayerStyles();
  const dispatch = useDispatch();
  const selectedLeftLayers = useSelector(
    (state: RootState) => state.multiMapLayer.selectedLeftLayers,
  );
  const handleSelectLeftLayer = (item: LayerType) => {
    if (selectedLeftLayers[0].id === item.id) return;
    dispatch(setSelectedLeftLayers(item));
  };

  return (
    <>
      <ButtonBase
        key={map.id}
        onClick={() => handleSelectLeftLayer(map)}
        className={cx(
          classes["left-layers-button"],
          selectedLeftLayers[0].id === map.id &&
            classes["left-layers-button--selected"],
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

export default LeftLayer;
