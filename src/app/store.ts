import { configureStore } from "@reduxjs/toolkit";
import multiMapLayersReducer from "../features/multiMapLayers/multiMapLayersSlice";
import bookmarksReducer from "../features/bookmark/bookmarkSlice";

export const store = configureStore({
  reducer: {
    multiMapLayer: multiMapLayersReducer,
    bookmarks: bookmarksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
