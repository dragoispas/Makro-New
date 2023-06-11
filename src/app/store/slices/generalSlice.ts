import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { PaletteMode } from "@mui/material";

export interface GeneralState {
  themeMode: PaletteMode;
  measuringSystem: string;
}

const initialState: GeneralState = {
  themeMode: "light",
  measuringSystem: "metric",
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<PaletteMode>) => {
      state.themeMode = action.payload;
    },
    setMeasuringSystem: (state, action: PayloadAction<string>) => {
      state.measuringSystem = action.payload;
    },
  },
});

export const { setThemeMode, setMeasuringSystem } = generalSlice.actions;

export default generalSlice.reducer;
