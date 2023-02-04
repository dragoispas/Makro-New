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
  servingSizes: string[];
  isNew?: boolean;
};

export const emptyProduct: Product = {
  id: 0,
  name: 'Banana',
  servingSizes: ['g'],

  calories: 0.89,
  carbs: 0.23,
  fat: 0.003,
  protein: 0.011,

  fiber: 0.026,
  satFat: 0,
  sugar: 0,
  sodium: 0,
  potassium: 0,

  isNew: true,
};

export type ProductMap = {
  [id: number | string]: Product;
};
