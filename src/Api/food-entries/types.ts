import { Product } from '../products/types';

export type FoodEntry = {
  id: number;
  dayEntryId: number;
  productId?: number | null;
  name: string;

  quantity: number;

  calories: number;
  fat: number;
  carbs: number;
  protein: number;

  fiber: number;
  satFat: number;
  sugar: number;
  sodium: number;
  potassium: number;

  servingSize: string;

  image?: string;

  product: Product;
};
