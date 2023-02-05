import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./domain";
import type { AppDispatch } from "../../app/store";
import { setLoading } from "../general/generalSlice";

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export const logout = () => async (dispatch: AppDispatch) => {
  await axios.post("/api/auth/logout");
  dispatch(setUser(null));
};

export const retrieveCurrentUser = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get("/api/auth/profile");
    dispatch(setUser(response.data));
  } finally {
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
