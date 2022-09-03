import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../modules/auth/authSlice';
import generalReducer from '../modules/auth/generalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    general: generalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
