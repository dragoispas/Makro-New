export type NutritionData = {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;

  fiber: number;
  satFat: number;
  sugar: number;
  sodium: number;
  potassium: number;
};

export type Product = NutritionData & {
  id: number;
  name: string;
  isNew?: boolean;
};

export const bananaProduct: Product = {
  id: 0,
  name: "Banana",

  calories: 20,
  carbs: 5,
  fat: 0,
  protein: 0.01,

  fiber: 0,
  satFat: 0,
  sugar: 0,
  sodium: 0,
  potassium: 0,

  isNew: false,
};

export const emptyProduct: Product = {
  id: 0,
  name: "",

  calories: 20,
  carbs: 5,
  fat: 0,
  protein: 0.01,

  fiber: 0,
  satFat: 0,
  sugar: 0,
  sodium: 0,
  potassium: 0,

  isNew: true,
};

export type ProductMap = {
  [id: number | string]: Product;
};
