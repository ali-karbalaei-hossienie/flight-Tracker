import { makeStyles } from "tss-react/mui";

export const useMapLayerStyles = makeStyles()((theme) => ({
  "split-mode-toggle": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mt: 1,
  },
  "base-layers-buttons-container": {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  "base-layers-button": {
    position: "relative",
    width: 70,
    height: 70,
    marginTop: theme.spacing(1),
    borderRadius: 2,
    overflow: "hidden",
    transform: "scale(1)",
    border: `3px solid transparent`,
    transition: theme.transitions.create(["border-color", "transform"], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  "base-layers-button--selected": {
    borderColor: theme.palette.primary.main,
    transform: "scale(1.05)",
  },
}));
