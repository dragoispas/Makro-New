import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../Api/products/types';

export type NutritionData = {
  calories: number;
  fat: number;
  satFat: number;
  carbs: number;
  fiber: number;
  sugar: number;
  protein: number;
  sodium: number;
  potassium: number;
}

const emptyNutritionData = {
  calories: 0,
  fat: 0,
  satFat: 0,
  carbs: 0,
  fiber: 0,
  sugar: 0,
  protein: 0,
  sodium: 0,
  potassium: 0,
};

export interface SearchModalState {
  content: string | null;
  product: Product | null;
  active: boolean;
  input: string | undefined;
  searchTab: number;

  amount: number;
  unit: string;

  productCopy: NutritionData;

}

const initialState: SearchModalState = {
  content: null,
  product: null,
  active: false,
  input: undefined,
  searchTab: 0,

  amount: 1000,
  unit: 'g',

  productCopy: emptyNutritionData,
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

      state.amount = 100;
      state.unit = 'g';

      state.productCopy = emptyNutritionData;
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

      state.amount = 100;
      state.unit = 'g';

      state.productCopy = emptyNutritionData;
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setUnit: (state, action: PayloadAction<string>) => {
      state.unit = action.payload;
    },
    setProductCopy: (state, action: PayloadAction<NutritionData>) => {
      state.productCopy = action.payload;
    },
  },
});

export const {
  // eslint-disable-next-line max-len
  setContent, setProduct, setActive, setInput, setSearchTab, resetSearchModal, openSearchModal, closeSearchModal, setAmount, setUnit, setProductCopy,
} = generalSlice.actions;

export default generalSlice.reducer;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
