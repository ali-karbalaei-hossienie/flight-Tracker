import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ExtraLayer, MultiMapLayer, LayerType } from "./types";
import { LAYERS } from "../../components/map/components/MultiMapLayers/constants/layers";

const initialState: MultiMapLayer = {
  selectedBaseLayers: [LAYERS[0]],
  selectedRightLayers: [LAYERS[0]],
  selectedLeftLayers: [LAYERS[0]],
  isSplitMode: false,
  extraLeftLayers: [],
  extraRightLayers: [],
};

const multiMapLayersSlice = createSlice({
  name: "multiMapLayers",
  initialState,
  reducers: {
    setSelectedBaseLayers: (state, action: PayloadAction<LayerType>) => {
      state.selectedBaseLayers = [action.payload];
    },
    setSelectedLeftLayers: (state, action: PayloadAction<LayerType>) => {
      state.selectedLeftLayers = [action.payload];
    },
    setSelectedRightLayers: (state, action: PayloadAction<LayerType>) => {
      state.selectedRightLayers = [action.payload];
    },
    setIsSplitMode: (state, action: PayloadAction<boolean>) => {
      state.isSplitMode = action.payload;
    },
    setSwapLayers: (state) => {
      const temp = state.selectedLeftLayers;
      state.selectedLeftLayers = state.selectedRightLayers;
      state.selectedRightLayers = temp;
    },
    addExtraLeftLayers: (state, action: PayloadAction<ExtraLayer>) => {
      state.extraLeftLayers.push(action.payload);
    },
    removeExtraLeftLayer: (state, action: PayloadAction<number | string>) => {
      state.extraLeftLayers = state.extraLeftLayers.filter(
        (layer) => layer.sourceId !== action.payload,
      );
    },
    addExtraRightLayers: (state, action: PayloadAction<ExtraLayer>) => {
      state.extraRightLayers.push(action.payload);
    },
    removeExtraRightLayer: (state, action: PayloadAction<number | string>) => {
      state.extraRightLayers = state.extraRightLayers.filter(
        (layer) => layer.sourceId !== action.payload,
      );
    },
    removeAllExtraLayers: (state) => {
      state.extraLeftLayers = [];
      state.extraRightLayers = [];
    },
  },
});

export const {
  setSelectedBaseLayers,
  setSelectedLeftLayers,
  setSelectedRightLayers,
  setIsSplitMode,
  setSwapLayers,
  addExtraLeftLayers,
  addExtraRightLayers,
  removeExtraLeftLayer,
  removeExtraRightLayer,
  removeAllExtraLayers,
} = multiMapLayersSlice.actions;

export default multiMapLayersSlice.reducer;
