export type NutritionData = {
  calories: number,
  carbs: number,
  fat: number,
  protein: number,

  fiber: number,
  saturatedFat: number,
  sugar: number,
  sodium: number,
  potassium: number,
}

export type Product = NutritionData & {
  id: number | string;
  name: string;
  servingSizes: string[];
  isNew?: boolean;
};

export const emptyProduct: Product = {
  id: '',
  name: "Banana",
  servingSizes: ["g"],

  calories: 20,
  carbs: 5,
  fat: 0,
  protein: 0.01,

  fiber: 0,
  saturatedFat: 0,
  sugar: 0,
  sodium: 0,
  potassium: 0,
  
  isNew: true
}

export type ProductMap = {
  [id:number|string]: Product
}
