import { FoodEntry } from '../food-entries/types';

export type Weight = {
  unit: string;
  amount: number;
};

export type FoodEntryMap = {
  [id: number | string]: FoodEntry;
};

export type DayEntry = {
  id: number | string;
  date: string;
  caloriesTarget: number;
  weight?: Weight;
  foodEntries: FoodEntryMap;

  totalCalories: number;
  totalCarbs: number;
  totalFat: number;
  totalProtein: number;
};
