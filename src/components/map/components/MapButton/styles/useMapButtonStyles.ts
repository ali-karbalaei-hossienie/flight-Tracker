import { makeStyles } from "tss-react/mui";

export const useMapButtonStyles = makeStyles()(() => ({
  "mapLayers-button": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
    zIndex: 1200,
    overflow: "hidden",
    "&:hover": {
      backgroundColor: `initial !important`,
    },
  },
}));
