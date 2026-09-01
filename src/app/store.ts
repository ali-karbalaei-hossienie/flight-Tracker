import { configureStore } from "@reduxjs/toolkit";
import multiMapLayersReducer from "../features/multiMapLayers/multiMapLayersSlice";
import bookmarksReducer from "../features/bookmark/bookmarkSlice";
import settingReducer from "../features/setting/settingSlice";

export const store = configureStore({
  reducer: {
    multiMapLayer: multiMapLayersReducer,
    bookmarks: bookmarksReducer,
    setting: settingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
