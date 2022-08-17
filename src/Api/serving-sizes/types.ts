// This will hold all CUSTOM serving sizes
// Keys will be the same as the displayed name:  piece (24 g)  slice (2.4 oz)
// the value will hold a quantity in GRAMS

export type ServingSizeMap = {
  [key:string]: number,
}
// export type ServingSize = {
//   id: number;
//   name: string;
//   grams: number;
//   productId?: number;
// };
