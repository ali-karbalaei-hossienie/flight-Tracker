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
    deleteBookmark: (state, action) => {
      state.filter((item) => item !== action.payload.id);
    },
  },
});

export const { addBookmark, deleteBookmark } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
