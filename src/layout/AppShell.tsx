import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Home from "../pages/Home/Home";

/**
 * Keeps the map mounted but paused when on other routes.
 * Destroying Mapbox + DeckGL on every navigation blocks the main thread for seconds.
 */
export default function AppShell() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
      <Box
        sx={
          {
            // position: "absolute",
            // inset: 0,
            // visibility: isHome ? "visible" : "hidden",
            // pointerEvents: isHome ? "auto" : "none",
          }
        }
      >
        <Home />
      </Box>

      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: "100%",
          zIndex: isHome ? 0 : 1,
          bgcolor: isHome ? "transparent" : "background.default",
          overflow: isHome ? "hidden" : "auto",
          pointerEvents: isHome ? "none" : "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
