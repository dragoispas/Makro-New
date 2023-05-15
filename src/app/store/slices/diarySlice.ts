import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export interface DiaryState {
  selectedDate: string;
}

const initialState: DiaryState = {
  selectedDate: moment().format("YYYY-MM-DD"),
};

export const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setSelectedDate } = diarySlice.actions;

export default diarySlice.reducer;
