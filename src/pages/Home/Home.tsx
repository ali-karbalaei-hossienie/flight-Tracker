import { Box } from "@mui/material";
import MapBox from "../../components/map/Map";
import MapEntitiesLayer from "./components/MapEntitiesLayer/MapEntitiesLayer";
import { RoutProvider } from "./context/RoutContext";

const Home = () => {
  return (
    <Box>
      <RoutProvider>
        <MapBox>
          <MapEntitiesLayer />
        </MapBox>
      </RoutProvider>
    </Box>
  );
};

export default Home;
