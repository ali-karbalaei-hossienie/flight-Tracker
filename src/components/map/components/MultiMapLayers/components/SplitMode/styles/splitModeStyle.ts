import { makeStyles } from "tss-react/mui";

export const splitModeStyle = makeStyles()(() => ({
  tabList: {
    "& .MuiTab-root": {
      flex: 1,
      maxWidth: "none",
      minWidth: 0,
      minHeight: 48,
      textTransform: "none",
      fontWeight: 600,
    },

    "& .MuiTabs-indicator": {
      height: 3,
      borderRadius: "3px 3px 0 0",
    },
    "& .MuiTabs-list": {
      display: "flex",
      justifyContent: "space-between",
    },
  },
}));
