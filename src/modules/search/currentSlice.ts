import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../Api/products/types";

export interface CurrentState {
  id: number;
  name: string;
  isNew?: boolean;

  calories: number | undefined;
  fat: number | undefined;
  satFat: number | undefined;
  carbs: number | undefined;
  fiber: number | undefined;
  sugar: number | undefined;
  protein: number | undefined;
  sodium: number | undefined;
  potassium: number | undefined;
}

const initialState: CurrentState = {
  id: 0,
  name: "",
  isNew: true,

  calories: undefined,
  fat: undefined,
  satFat: undefined,
  carbs: undefined,
  fiber: undefined,
  sugar: undefined,
  protein: undefined,
  sodium: undefined,
  potassium: undefined,
};

export const currentSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<{ name: string; value: number | string }>) => {
      const { name, value } = action.payload;

      return {
        ...state,
        [name]: value,
      };
    },
    setValues: (state, action: PayloadAction<{ product: Product }>) => {
      state.name = action.payload.product.name;
      state.isNew = action.payload.product.isNew;

      state.calories = action.payload.product.calories;
      state.fat = action.payload.product.fat;
      state.satFat = action.payload.product.satFat;
      state.carbs = action.payload.product.carbs;
      state.fiber = action.payload.product.fiber;
      state.sugar = action.payload.product.sugar;
      state.protein = action.payload.product.protein;
      state.sodium = action.payload.product.sodium;
      state.potassium = action.payload.product.potassium;
    },
  },
});

export const { setValue, setValues } = currentSlice.actions;

export default currentSlice.reducer;
