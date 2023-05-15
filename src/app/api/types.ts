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
  weightUnit: string | null;
  foodEntries: FoodEntry[];
};

export type FoodEntry = {
  id: number;
  dayEntryId: number;
  productId?: number | null;
  name: string;
  quantity: number;
  servingSize: string;

  macroNutrients: MacroNutrients;

  image?: string;

  product: Product;
};

export type Product = {
  id: number;
  name: string;
  macroNutrients: MacroNutrients;
  isNew?: boolean;
};

export type ProductWithUsage = Product & {
  usageCount: number;
  lastUsedAt: Date;
};

export type MacroNutrients = {
  calories: number;
  fat: number;
  carbs: number;
  protein: number;

  fiber?: number;
  saturatedFat?: number;
  sugar?: number;
  sodium?: number;
  potassium?: number;
};

export type MacroNutrientType = keyof MacroNutrients;

export const macroNutrientTypes: MacroNutrientType[] = [
  "calories",
  "fat",
  "carbs",
  "protein",
  "fiber",
  "saturatedFat",
  "sugar",
  "sodium",
  "potassium",
];

export const primaryMacroNutrientTypes: MacroNutrientType[] = ["fat", "carbs", "protein"];
