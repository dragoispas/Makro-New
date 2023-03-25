import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../Api/products/types";

export interface SearchModalState {
  content: string | null;
  product: Product | null;
  active: boolean;
  input: string | undefined;
  searchTab: number;

  calories: number | undefined;
  fat: number | undefined;
  satFat?: number;
  carbs: number | undefined;
  fiber: number | undefined;
  sugar: number | undefined;
  protein: number | undefined;
  sodium: number | undefined;
  potassium: number | undefined;
}

const initialState: SearchModalState = {
  content: null,
  product: null,
  active: false,
  input: undefined,
  searchTab: 0,

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

export const generalSlice = createSlice({
  name: "searchModal",
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string | null>) => {
      state.content = action.payload;
    },
    setProduct: (state, action: PayloadAction<Product | null>) => {
      state.product = action.payload;
    },
    setInput: (state, action: PayloadAction<string | undefined>) => {
      state.input = action.payload;
    },
    setSearchTab: (state, action: PayloadAction<number>) => {
      state.searchTab = action.payload;
    },
    openSearchModal: (state) => {
      if (!state.active) {
        state.content = "searchResults";
        state.active = true;
      }
    },
    closeSearchModal: (state) => {
      state.content = "searchResults";
      state.product = null;
      state.active = false;
      state.searchTab = 0;

      state.calories = undefined;
      state.fat = undefined;
      state.satFat = undefined;
      state.carbs = undefined;
      state.fiber = undefined;
      state.sugar = undefined;
      state.protein = undefined;
      state.sodium = undefined;
      state.potassium = undefined;
    },
    setNutritionValue: (state, action: PayloadAction<{ name: string; value: number | string }>) => {
      const { name, value } = action.payload;

      return {
        ...state,
        [name]: value,
      };
    },
    setFat: (state, action: PayloadAction<number | undefined>) => {
      state.fat = action.payload;
    },
    setCalories: (state, action: PayloadAction<number | undefined>) => {
      state.calories = action.payload;
    },
    setSatFat: (state, action: PayloadAction<number | undefined>) => {
      state.satFat = action.payload;
    },
    setCarbs: (state, action: PayloadAction<number | undefined>) => {
      state.carbs = action.payload;
    },
    setFiber: (state, action: PayloadAction<number | undefined>) => {
      state.fiber = action.payload;
    },
    setSugar: (state, action: PayloadAction<number | undefined>) => {
      state.sugar = action.payload;
    },
    setProtein: (state, action: PayloadAction<number | undefined>) => {
      state.protein = action.payload;
    },
    setSodium: (state, action: PayloadAction<number | undefined>) => {
      state.sodium = action.payload;
    },
    setPotassium: (state, action: PayloadAction<number | undefined>) => {
      state.potassium = action.payload;
    },
  },
});

export const {
  setContent,
  setProduct,
  setInput,
  setSearchTab,
  openSearchModal,
  closeSearchModal,
  setCalories,
  setFat,
  setSatFat,
  setCarbs,
  setFiber,
  setSugar,
  setProtein,
  setSodium,
  setPotassium,
  setNutritionValue,
} = generalSlice.actions;

export default generalSlice.reducer;
