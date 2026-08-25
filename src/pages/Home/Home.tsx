import { Box } from "@mui/material";
import MapBox from "../../components/map/Map";
import MapEntitiesLayer from "./components/MapEntitiesLayer/MapEntitiesLayer";

const Home = () => {
  return (
    <Box>
      <MapBox>
        <MapEntitiesLayer />
      </MapBox>
    </Box>
  );
};

export default Home;
