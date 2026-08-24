import { makeStyles } from "tss-react/mui";

export const useRightLayerStyles = makeStyles()((theme) => ({
  "right-layers-buttons-container": {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  "right-layers-button": {
    position: "relative",

    width: 70,
    height: 70,
    mt: 1,
    borderRadius: 2,
    overflow: "hidden",
    transform: "scale(1)",
    border: `3px solid transparent`,
    transition: theme.transitions.create(["border-color", "transform"], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  "right-layers-button--selected": {
    borderColor: theme.palette.primary.main,
    transform: "scale(1.05)",
  },
}));
