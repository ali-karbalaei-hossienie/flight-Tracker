import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  "toggle-button-group": {
    display: "flex ",
    flexDirection: "column",
    gap: 8,
    border: 0,
    "& svg": {
      fill: theme.palette.text.primary,
    },
  },
  "draw-button": {
    border: 0,
    margin: 0,
    boxShadow: theme.shadows[1],
    borderRadius: "50% !important",
    transition: "all 0.4s ease-in-out",
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
    "&.Mui-selected": {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
  },
}));
