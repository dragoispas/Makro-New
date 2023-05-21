import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../api/types";
import { ConvertTypes, numbersToStrings } from "../../helpers";
import { UnitType } from "../../units";
import { MacroNutrients, MacroNutrientType } from "../../macroNutrients";

export interface SearchModalSlice {
  tab: number;
  selectedProduct: Product | null;
  searchTerm: string;
  isDiaryFormActive: boolean;
  diaryForm: DiaryForm;
}

export type DiaryForm = {
  name: string;
  quantity: string;
  quantityUnit: UnitType;
  macroNutrients: ConvertTypes<MacroNutrients, number, string>;
  referenceAmount: string;
};

const initialState: SearchModalSlice = {
  tab: 0,
  selectedProduct: null,
  searchTerm: "",
  isDiaryFormActive: false,
  diaryForm: {
    name: "",
    quantity: "",
    quantityUnit: UnitType.Gram,
    macroNutrients: {
      calories: "",
      carbs: "",
      fat: "",
      protein: "",
      fiber: "",
      saturatedFat: "",
      sugar: "",
      sodium: "",
      potassium: "",
    },
    referenceAmount: "100",
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<number>) => {
      state.tab = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
      state.diaryForm = {
        ...state.diaryForm,
        name: state.selectedProduct.name,
        macroNutrients: numbersToStrings(state.selectedProduct.macroNutrients),
      };
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.diaryForm = initialState.diaryForm;
    },
    setDiaryFormActive: (state, action: PayloadAction<boolean>) => {
      state.isDiaryFormActive = action.payload;
    },
    setDiaryFormName: (state, action: PayloadAction<string>) => {
      state.diaryForm.name = action.payload;
    },
    setDiaryFormQuantity: (state, action: PayloadAction<string>) => {
      state.diaryForm.quantity = action.payload;
    },
    setDiaryFormReferenceAmount: (state, action: PayloadAction<string>) => {
      state.diaryForm.referenceAmount = action.payload;
    },
    setDiaryFormMacro: (
      state,
      action: PayloadAction<{ macroNutrient: MacroNutrientType; value: string }>
    ) => {
      const { macroNutrient, value } = action.payload;
      state.diaryForm.macroNutrients[macroNutrient] = value;
    },
  },
});

export const {
  setTab,
  setSelectedProduct,
  setSearchTerm,
  clearSelectedProduct,
  setDiaryFormName,
  setDiaryFormMacro,
  setDiaryFormActive,
  setDiaryFormReferenceAmount,
  setDiaryFormQuantity,
} = searchSlice.actions;

export default searchSlice.reducer;
