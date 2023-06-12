import { UnitType } from "../units";
import { MacroNutrients } from "../macroNutrients";

export type User = {
  id: number;
  name: string;
  email: string;
  active: boolean;
  confirmed: boolean;
};

export type DayEntry = {
  id: number;
  date: string;
  caloriesTarget: number;
  weight: number | null;
  weightUnit: UnitType | null;
  foodEntries: FoodEntry[];
};

export type FoodEntry = {
  id: number;
  dayEntryId: number;
  productId?: number | null;
  name: string;
  quantity: number;
  quantityUnit: UnitType;
  macroNutrients: MacroNutrients;
  product: Product;
};

export type Product = {
  id: number;
  name: string;
  macroNutrients: MacroNutrients;
  type: ProductType;
};

export enum ProductType {
  CUSTOM = "custom",
  COMMON = "common",
  BRANDED = "branded",
}

export type ProductWithUsage = Product & {
  usageCount: number;
  lastUsedAt: Date;
};

export enum FoodMenuAction {
  Copy = "copy",
  Delete = "delete",
}

export type FoodEntryDailyStats = {
  date: string;
  totalIngestedCalories: number;
};
