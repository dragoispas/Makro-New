import { emptyProduct, Product } from "../products/types";

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

export const testFoodEntry1 = {
  id: "test1",
  dayEntryId: "333",
  productId: "212",
  name: "Banana",
  quantity: 122,
  calories: 44,
  fat: 1,
  carbs: 10,
  protein: 2,
  servingSize: "g",
  product: emptyProduct
}

