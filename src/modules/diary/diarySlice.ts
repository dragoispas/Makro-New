import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { DayEntry } from '../../Api/day-entries/types';

export interface DiarState {
  dayEntry: DayEntry | null;
}

const initialState: DiarState = {
  dayEntry: null,
};

export const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    setDayEntry: (state, action: PayloadAction<DayEntry | null>) => {
      state.dayEntry = action.payload;
    },
  },
});

export const { setDayEntry } = diarySlice.actions;

export default diarySlice.reducer;
