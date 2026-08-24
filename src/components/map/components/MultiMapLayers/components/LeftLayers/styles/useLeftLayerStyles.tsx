import { makeStyles } from "tss-react/mui";

export const useLeftLayerStyles = makeStyles()((theme) => ({
  "left-layers-buttons-container": {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  "left-layers-button": {
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
  "left-layers-button--selected": {
    borderColor: theme.palette.primary.main,
    transform: "scale(1.05)",
  },
}));
