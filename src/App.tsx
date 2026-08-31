import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { MapProvider } from "react-map-gl/mapbox";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { store } from "./app/store";
import AppShell from "./layout/AppShell";
import { getDesignTokens } from "./theme/theme";
import {
  AirplanemodeActive,
  HomeOutlined,
  Layers,
  Route as RouteIcon,
  Settings,
} from "@mui/icons-material";
import {
  SidebarProvider,
  type SidebarItem,
} from "./components/utils/SidebarProvider";
import AircraftListPage from "./pages/Aircraft/AircraftListPage";
import AircraftDetailPage from "./pages/AircraftDetailPage/AircraftDetailPage";

const sidebarConfig: SidebarItem[] = [
  {
    id: "home",
    textButton: "Home",
    position: "top",
    navigate: "/",
    icon: <HomeOutlined />,
  },
  {
    id: "airplane",
    textButton: "Airplane",
    position: "top",
    navigate: "/airplane",
    icon: <AirplanemodeActive />,
  },
];

function App() {
  const myTheme = createTheme(getDesignTokens("dark"));
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={myTheme}>
          <Toaster position="top-center" />
          <CssBaseline />
          <MapProvider>
            <SidebarProvider config={sidebarConfig}>
              <Routes>
                <Route element={<AppShell />}>
                  <Route index element={null} />
                  <Route path="airplane" element={<AircraftListPage />} />
                  <Route path="airplane/:id" element={<AircraftDetailPage />} />
                </Route>
              </Routes>
            </SidebarProvider>
          </MapProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
