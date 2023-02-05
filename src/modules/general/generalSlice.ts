import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { PaletteMode } from "@mui/material";

export interface GeneralState {
  isLoading: boolean;
  themeMode: PaletteMode;
  notification: Notification | null;
}

const initialState: GeneralState = {
  isLoading: true,
  themeMode: "light",
  notification: null,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setThemeMode: (state, action: PayloadAction<PaletteMode>) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setLoading, setThemeMode } = generalSlice.actions;

export default generalSlice.reducer;
