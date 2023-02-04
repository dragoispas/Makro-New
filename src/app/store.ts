import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../modules/auth/authSlice';
import generalReducer from '../modules/general/generalSlice';
// eslint-disable-next-line import/no-cycle
import diaryReducer from '../modules/diary/diarySlice';
import searchModalReducer from '../modules/search/searchModalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    general: generalReducer,
    diary: diaryReducer,
    searchModal: searchModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
