import { Product } from '../products/types';

export type FoodEntry = {
  id: number | string;
  dayEntryId: number | string;
  productId: number | string;
  name: string;

  quantity: number;

  calories: number;
  fat: number;
  carbs: number;
  protein: number;

  servingSize: string;

  image?: string;

  product: Product;
};
