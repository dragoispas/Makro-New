import type { Middleware } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

export const rtkQueryErrorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action) && action.payload?.status !== 401) {
    console.warn(action);
    let message: string;

    if (typeof action.payload?.data === "string") {
      message = action.payload?.data;
    } else {
      message = action.payload?.data?.message ?? "An error has occurred.";
    }

    if (Array.isArray(message)) {
      message = message[0];
    }

    enqueueSnackbar(message, {
      variant: "error",
    });
  }

  return next(action);
};
