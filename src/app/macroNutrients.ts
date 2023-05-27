export type MacroNutrients = {
  calories: number;
  fat: number;
  carbs: number;
  protein: number;

  fiber?: number;
  saturatedFat?: number;
  sugar?: number;
  sodium?: number;
  potassium?: number;
};

export type MacroNutrientType = keyof MacroNutrients;

export const macroNutrientTypes: MacroNutrientType[] = [
  "calories",
  "fat",
  "carbs",
  "protein",
  "fiber",
  "saturatedFat",
  "sugar",
  "sodium",
  "potassium",
];

export const primaryMacroNutrientTypes: MacroNutrientType[] = ["fat", "carbs", "protein"];

/**
 * Adjusts a set of MacroNutrients from a custom reference amount to the default 100g reference.
 *
 * E.g.: The user set 5g of protein but changed the reference amount to be "per 150g". To normalize the final product,
 * we need to infer what the amount of protein would be given the default "per 100g" reference. To do this, this
 * function applies simple cross-multiplication arithmetic on the entire set of macro nutrients, using the given
 * reference amount that the user provided.
 *
 * @param macroNutrients The set of macro nutrients to apply the reference amount adjustment to.
 * @param sourceReferenceAmount The reference amount to convert from.
 */
export function adjustMacrosFromReferenceAmount(
  macroNutrients: MacroNutrients,
  sourceReferenceAmount: number
): MacroNutrients {
  const targetReferenceAmount = 100; // always convert the macro to being "per 100 g".
  return Object.entries(macroNutrients).reduce(
    (adjustedMacroNutrients, [macroKey, macroValue]) => ({
      ...adjustedMacroNutrients,
      [macroKey]: (macroValue * targetReferenceAmount) / sourceReferenceAmount,
    }),
    macroNutrients
  );
}

export function adjustMacrosToQuantity(
  macroNutrients: MacroNutrients,
  quantity: number
): MacroNutrients {
  macroNutrients.calories = (macroNutrients.calories * quantity) / 100;
  macroNutrients.protein = (macroNutrients.protein * quantity) / 100;
  macroNutrients.fat = (macroNutrients.fat * quantity) / 100;
  macroNutrients.carbs = (macroNutrients.carbs * quantity) / 100;
  if (macroNutrients.sugar) macroNutrients.sugar = (macroNutrients.sugar * quantity) / 100;
  if (macroNutrients.saturatedFat)
    macroNutrients.saturatedFat = (macroNutrients.saturatedFat * quantity) / 100;
  if (macroNutrients.potassium)
    macroNutrients.potassium = (macroNutrients.potassium * quantity) / 100;
  if (macroNutrients.sodium) macroNutrients.sodium = (macroNutrients.sodium * quantity) / 100;

  return macroNutrients;
}
