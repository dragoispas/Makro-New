import { FoodEntry, testFoodEntry1 } from '../food-entries/types';

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

  isArtificial: boolean;
};

export const emptyDayEntry: DayEntry = {
  id: Math.random() * 1000,
  date: '12 SEPTEMBER 2022',
  caloriesTarget: 2000,
  // weight: {unit:"KG", amount:79},
  foodEntries: { '123': testFoodEntry1 },

  totalCalories: 1300,
  totalCarbs: 55,
  totalFat: 33,
  totalProtein: 175,

  isArtificial: false
};

// export type dayEntry = {
//   id: number,
//   date: Date,
//   loggedItems: loggedItem[],
//   calorieTarget: number,
//   totalCalories: number,
//   totalCarbs: number,
//   totalFat: number,
//   totalProtein: number
// }
