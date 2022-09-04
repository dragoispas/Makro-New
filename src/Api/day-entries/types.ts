import { FoodEntry } from '../food-entries/types';

export type DayEntry = {
  id: number;
  date: string;
  caloriesTarget: number;
  weight: number | null;
  weightUnit: string | null;
  foodEntries: FoodEntry[];
};
