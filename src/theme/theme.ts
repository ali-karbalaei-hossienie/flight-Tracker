// theme.ts
import type { PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "dark"
      ? {
          primary: { main: "#e5a913", contrastText: "#ffffff" },
          secondary: { main: "#ffe3a1" },
          background: { default: "#1a1a1a", paper: "#2d2d2d" },
          error: { main: "#9d0300" },
          success: { main: "#00b300" },
          text: { primary: "#ececec", secondary: "#fff3e1" },
        }
      : {
          primary: { main: "#e5a913", contrastText: "#ffffff" },
          secondary: { main: "#ffe3a1" },
          background: { default: "#f5f5f5", paper: "#ffffff" },
          error: { main: "#d32f2f" },
          success: { main: "#2e7d32" },
          text: { primary: "#121212", secondary: "#4a4a4a" },
        }),
  },
  typography: {
    fontFamily: "Vazirmatn, Arial, sans-serif",
    button: {
      textTransform: "none" as const,
    },
  },
});
