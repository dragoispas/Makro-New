import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

export const rtkQueryErrorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action) && action.payload?.status !== 401) {
    console.warn(action);
    let message: string;

    if (typeof action.payload?.data === "string") {
      message = action.payload?.data;
    } else {
      message = action.payload?.data?.message ?? "An error has occurred.";
    }

    enqueueSnackbar(message, {
      variant: "error",
    });
  }

  return next(action);
};
