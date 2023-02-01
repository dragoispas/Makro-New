import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getDayEntryByDate } from '../../Api/day-entries/api';
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

// export const retrieveDayByDate = (date: Date) => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(setErrorMessage(null));

//     const response = await getDayEntryByDate(date);

//     if (response === null) {
//       dispatch(setErrorMessage('An error has occurred while contacting the API.'));
//     }

//     // eslint-disable-next-line no-use-before-define
//     dispatch(setDayEntry(response));
//   } catch (error) {
//     console.log(error);
//   }
// };

export const { setDayEntry } = diarySlice.actions;

export default diarySlice.reducer;
