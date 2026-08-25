import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { MapProvider } from "react-map-gl/mapbox";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { store } from "./app/store";
import AppShell from "./layout/AppShell";
import { getDesignTokens } from "./theme/theme";

// const sidebarConfig: ConfigType[] = [
//   {
//     id: "discover",
//     position: "top",
//     textButton: "discover",
//     icon: <PublicIcon />,
//     component: Discover,
//   },
//   {
//     id: "weather",
//     position: "top",
//     textButton: "weather",
//     icon: <ThunderstormIcon />,
//     component: Weather,
//   },
//   {
//     id: "timeLapse",
//     position: "top",
//     textButton: "timeLapse",
//     icon: <TimelapseIcon />,
//     component: Timelapse,
//   },
//   {
//     id: "setting",
//     position: "bottom",
//     textButton: "setting",
//     icon: <SettingsIcon />,
//     component: Setting,
//   },
// ];

function App() {
  const myTheme = createTheme(getDesignTokens("dark"));
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={myTheme}>
          <Toaster
            position="top-center"
            
          />
          <CssBaseline />
          <MapProvider>
            <Routes>
              <Route element={<AppShell />}>
                <Route index element={null} />
                {/* <Route path="airplane" element={<AircraftListPage />} />
                <Route path="airplane/:id" element={<AircraftDetailPage />} /> */}
              </Route>
            </Routes>
          </MapProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
