import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./slices/generalSlice";
import diaryReducer from "./slices/diarySlice";
import searchReducer from "./slices/searchSlice";
import { api } from "../api/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { rtkQueryErrorMiddleware } from "./rtkQueryErrorMiddleware";

export const store = configureStore({
  reducer: {
    general: generalReducer,
    diary: diaryReducer,
    search: searchReducer,

    // Automatically generated reducers via RTK Query.
    [api.reducerPath]: api.reducer,
  },
  // Automatic middleware for API caching via RTK Query.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(rtkQueryErrorMiddleware),
});

// Automatic browser lifecycle listeners for API querying via RTK Query.
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
