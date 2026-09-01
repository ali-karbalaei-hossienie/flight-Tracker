import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FlightInfo } from "../../pages/Home/components/FlightPopper/hooks/types";

const initialState: FlightInfo[] = [];

const bookmarksSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<FlightInfo>) => {
      return [...state, action.payload];
    },
    removeBookmark: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
