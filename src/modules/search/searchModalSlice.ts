import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../Api/products/types';

export interface SearchModalState {
  content: string | null;
  product: Product | null;
  active: boolean;
  input: string | undefined;
  searchTab: number;

  amount: string | undefined;
  unit: string;

  calories: string | undefined;
  fat: string | undefined;
  satFat: string | undefined;
  carbs: string | undefined;
  fiber: string | undefined;
  sugar: string | undefined;
  protein: string | undefined;
  sodium: string | undefined;
  potassium: string | undefined;
}

const initialState: SearchModalState = {
  content: null,
  product: null,
  active: false,
  input: undefined,
  searchTab: 0,

  amount: undefined,
  unit: 'g',

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
  name: 'searchModal',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string | null>) => {
      state.content = action.payload;
    },
    setProduct: (state, action: PayloadAction<Product | null>) => {
      state.product = action.payload;
    },
    setActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    setInput: (state, action: PayloadAction<string | undefined>) => {
      state.input = action.payload;
    },
    setSearchTab: (state, action: PayloadAction<number>) => {
      state.searchTab = action.payload;
    },
    resetSearchModal: (state) => {
      state.content = 'searchResults';
      state.product = null;
      state.input = '';
      state.searchTab = 0;

      state.amount = undefined;
      state.unit = 'g';

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
    openSearchModal: (state) => {
      if (!state.active) {
        state.content = 'searchResults';
        state.active = true;
      }
    },
    closeSearchModal: (state) => {
      state.content = 'searchResults';
      state.product = null;
      state.active = false;
      state.searchTab = 0;

      state.amount = undefined;
      state.unit = 'g';

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
    setAmount: (state, action: PayloadAction<string | undefined>) => {
      state.amount = action.payload;
    },
    setUnit: (state, action: PayloadAction<string>) => {
      state.unit = action.payload;
    },
    setFat: (state, action: PayloadAction<string | undefined>) => {
      state.fat = action.payload;
    },
    setCalories: (state, action: PayloadAction<string | undefined>) => {
      state.calories = action.payload;
    },
    setSatFat: (state, action: PayloadAction<string | undefined>) => {
      state.satFat = action.payload;
    },
    setCarbs: (state, action: PayloadAction<string | undefined>) => {
      state.carbs = action.payload;
    },
    setFiber: (state, action: PayloadAction<string | undefined>) => {
      state.fiber = action.payload;
    },
    setSugar: (state, action: PayloadAction<string | undefined>) => {
      state.sugar = action.payload;
    },
    setProtein: (state, action: PayloadAction<string | undefined>) => {
      state.protein = action.payload;
    },
    setSodium: (state, action: PayloadAction<string | undefined>) => {
      state.sodium = action.payload;
    },
    setPotassium: (state, action: PayloadAction<string | undefined>) => {
      state.potassium = action.payload;
    },
  },
});

export const {
  // eslint-disable-next-line max-len
  setContent, setProduct, setActive, setInput, setSearchTab, resetSearchModal, openSearchModal, closeSearchModal, setAmount, setUnit, setCalories, setFat, setSatFat, setCarbs, setFiber, setSugar, setProtein, setSodium, setPotassium,
} = generalSlice.actions;

export default generalSlice.reducer;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
