import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FlightInfo } from "../../pages/Home/components/FlightPopper/hooks/types";

interface BookmarkState {
  bookmarks: FlightInfo[];
}

const initialState: BookmarkState = {
  bookmarks: [],
};

const bookmarksSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<FlightInfo>) => {
      state.bookmarks = [...state.bookmarks, action.payload];
    },
  },
});

export const { addBookmark } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
