import {
  AirplanemodeActive,
  BookmarkBorder,
  HomeOutlined,
} from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { MapProvider } from "react-map-gl/mapbox";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { type RootState } from "./app/store";
import Bookmark from "./components/Bookmark/Bookmark";
import {
  SidebarProvider,
  type SidebarItem,
} from "./components/utils/SidebarProvider";
import AppShell from "./layout/AppShell";
import AircraftListPage from "./pages/Aircraft/AircraftListPage";
import AircraftDetailPage from "./pages/AircraftDetailPage/AircraftDetailPage";
import Setting from "./pages/Setting/Setting";
import { getDesignTokens } from "./theme/theme";

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
  {
    id: "bookmark",
    textButton: "Bookmark",
    position: "top",
    icon: <BookmarkBorder />,
    component: <Bookmark />,
  },
  {
    id: "setting",
    textButton: "Setting",
    position: "bottom",
    icon: <SettingsIcon />,
    component: <Setting />,
  },
];

function App() {
  const mode = useSelector((state: RootState) => state.setting.mode);

  const myTheme = createTheme(getDesignTokens(mode));
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
