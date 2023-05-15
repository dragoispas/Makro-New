import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { PaletteMode } from "@mui/material";

export interface GeneralState {
  themeMode: PaletteMode;
}

const initialState: GeneralState = {
  themeMode: "light",
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<PaletteMode>) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setThemeMode } = generalSlice.actions;

export default generalSlice.reducer;
