import { Divider, IconButton } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { splitModeStyle } from "./styles/splitModeStyle";
import LeftLayers from "../LeftLayers/LeftLayers";
import RightLayers from "../RightLayers/RightLayers";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setSwapLayers } from "../../../../../../features/multiMapLayers/multiMapLayersSlice";

export const SplitMode = () => {
  const [value, setValue] = React.useState("left");
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const { classes } = splitModeStyle();

  const swapLayer = () => {
    dispatch(setSwapLayers());
  };

  const { t } = useTranslation();
  return (
    <div>
      <Divider>
        <IconButton onClick={swapLayer}>
          <SwapHorizIcon />
        </IconButton>
      </Divider>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            className={classes.tabList}
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label={t("left")} value="left" />
            <Tab label={t("right")} value="right" />
          </TabList>
        </Box>
        <TabPanel value="left">
          <LeftLayers />
        </TabPanel>
        <TabPanel value="right">
          <RightLayers />
        </TabPanel>
      </TabContext>
    </div>
  );
};
