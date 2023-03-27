import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/authSlice";
import generalReducer from "../modules/general/generalSlice";
import diaryReducer from "../modules/diary/diarySlice";
import currentReducer from "../modules/search/currentSlice";
import searchReducer from "../modules/search/searchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    general: generalReducer,
    diary: diaryReducer,
    current: currentReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
