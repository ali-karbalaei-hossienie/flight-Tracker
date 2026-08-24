import { Box, ButtonBase, Typography } from "@mui/material";
import { type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRightLayerStyles } from "../styles/useRightLayerStyles";
import type { LayerType } from "../../../../../../../features/multiMapLayers/types";
import type { RootState } from "../../../../../../../app/store";
import { setSelectedRightLayers } from "../../../../../../../features/multiMapLayers/multiMapLayersSlice";

interface BaseLayerProps {
  map: LayerType;
}

const RightLayer: FC<BaseLayerProps> = ({ map }) => {
  const { classes, cx } = useRightLayerStyles();

  const dispatch = useDispatch();
  const selectedRightLayers = useSelector(
    (state: RootState) => state.multiMapLayer.selectedRightLayers,
  );
  const handleSelectRightLayer = (item: LayerType) => {
    if (selectedRightLayers[0].id === item.id) return;

    dispatch(setSelectedRightLayers(item));
  };

  return (
    <>
      <ButtonBase
        key={map.id}
        onClick={() => handleSelectRightLayer(map)}
        className={cx(
          classes["right-layers-button"],
          selectedRightLayers[0].id === map.id &&
            classes["right-layers-button--selected"],
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

export default RightLayer;
