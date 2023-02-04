import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { findOne, getDayEntryByDate } from '../../Api/day-entries/api';
import { DayEntry } from '../../Api/day-entries/types';
// eslint-disable-next-line import/no-cycle
import { AppDispatch } from '../../app/store';

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

export const retrieveDayByDate = (date: Date) => async (dispatch: AppDispatch) => {
  try {
    const response = await getDayEntryByDate(date);
    dispatch(setDayEntry(response));
  } catch (error) {
    console.log(error);
  }
};

export default diarySlice.reducer;
