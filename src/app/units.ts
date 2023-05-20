import { FoodEntry, Product } from "./api/types";

export enum UnitType {
  Gram = "g",
  Milligram = "mg",
  Kilogram = "kg",
  Pound = "lbs",
  Ounce = "oz",
}

export type Unit = {
  type: UnitType;
  name: string;
  amountInGrams: number;
};

export const Gram: Unit = {
  type: UnitType.Gram,
  name: "gram",
  amountInGrams: 1,
};

export const Milligram: Unit = {
  type: UnitType.Milligram,
  name: "milligram",
  amountInGrams: 0.001,
};

export const Kilogram: Unit = {
  type: UnitType.Kilogram,
  name: "kilogram",
  amountInGrams: 1000,
};

export const Pound: Unit = {
  type: UnitType.Pound,
  name: "pound",
  amountInGrams: 453.5924,
};

export const Ounce: Unit = {
  type: UnitType.Ounce,
  name: "ounce",
  amountInGrams: 28.34952,
};

export const Units: Record<UnitType, Unit> = {
  [UnitType.Gram]: Gram,
  [UnitType.Milligram]: Milligram,
  [UnitType.Kilogram]: Kilogram,
  [UnitType.Pound]: Pound,
  [UnitType.Ounce]: Ounce,
};

export const quantityUnits: Unit[] = [Gram, Ounce, Pound];

export function convertUnit(value: number, fromUnit: UnitType, toUnit: UnitType): number {
  const sourceUnit = Units[fromUnit];
  const targetUnit = Units[toUnit];
  const newValue = (value * sourceUnit.amountInGrams) / targetUnit.amountInGrams;
  return parseFloat(newValue.toFixed(2));
}

export function getFoodEntryQuantity(foodEntry: FoodEntry): number {
  return convertUnit(foodEntry.quantity, UnitType.Gram, foodEntry.quantityUnit);
}
