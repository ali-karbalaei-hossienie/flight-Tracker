import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface SettingType {
  mode: "dark" | "light";
  airplaneSize: number;
}
const initialState: SettingType = {
  mode: "dark",
  airplaneSize: 30,
};

const settingSlice = createSlice({
  name: "setting",
  initialState: initialState,
  reducers: {
    toggleColorMode: (state, action) => {
      state.mode = action.payload;
    },
    setAirplaneSize(state, action: PayloadAction<number>) {
      state.airplaneSize = action.payload;
    },
  },
});

export const { toggleColorMode, setAirplaneSize } = settingSlice.actions;
export default settingSlice.reducer;
