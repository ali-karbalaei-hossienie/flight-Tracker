import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { MapProvider } from "react-map-gl/mapbox";
import { getDesignTokens } from "./theme/theme";
import { Provider } from "react-redux";
import { store } from "./app/store";
import MapBox from "./components/map/Map";

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
    <Provider store={store}>
      <ThemeProvider theme={myTheme}>
        <CssBaseline />

        <MapProvider>
          <Box sx={{ flex: 1, width: "100%", height: "100vh" }}>
            <MapBox />
          </Box>
        </MapProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
