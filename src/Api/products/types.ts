export type NutritionData = {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;

  fiber: number;
  saturatedFat: number;
  sugar: number;
  sodium: number;
};

export type Product = NutritionData & {
  id: number | string;
  name: string;
  servingSizes: string[];
  isNew?: boolean;
};

export const emptyProduct: Product = {
  id: '',
  name: 'Empty Product',
  servingSizes: ['g'],

  calories: 0,
  carbs: 0,
  fat: 0,
  protein: 0,

  fiber: 0,
  saturatedFat: 0,
  sugar: 0,
  sodium: 0,

  isNew: true
};

export type ProductMap = {
  [id: number | string]: Product;
};
