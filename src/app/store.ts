import { configureStore } from "@reduxjs/toolkit";
import multiMapLayersReducer from "../features/multiMapLayers/multiMapLayersSlice";

export const store = configureStore({
  reducer: {
    multiMapLayer: multiMapLayersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
