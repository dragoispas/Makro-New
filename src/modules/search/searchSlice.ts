import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../Api/products/types";

export interface SearchModalSlice {
  tab: number;
  product: Product | null;
  input: string | null;
}

const initialState: SearchModalSlice = {
  tab: 1,
  product: null,
  input: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<number>) => {
      state.tab = action.payload;
    },
    setProduct: (state, action: PayloadAction<Product | null>) => {
      state.product = action.payload;
    },
    setInput: (state, action: PayloadAction<string | null>) => {
      state.input = action.payload;
    },
  },
});

export const { setTab, setProduct, setInput } = searchSlice.actions;

export default searchSlice.reducer;
