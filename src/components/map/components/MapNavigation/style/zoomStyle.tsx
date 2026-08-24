import { Box } from "@mui/material";
import type { CSSObject } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

export const NavigationContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  fontSize: theme.typography.body1.fontSize,

  justifyContent: "center",
  flexDirection: "column",
  "& svg": {
    fontSize: theme.typography.subtitle2,
  },

  "& .zoomBox": {
    backgroundColor: theme.palette.background.default,
    margin: `${theme.spacing(1)} 0`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as CSSObject,
}));
