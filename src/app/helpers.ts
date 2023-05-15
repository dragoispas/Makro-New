export type ConvertTypes<T, TFrom, TTo> = {
  [K in keyof T]: Exclude<T[K], undefined> extends TFrom
    ? TTo
    : Exclude<T[K], undefined> extends object
    ? ConvertTypes<T[K], TFrom, TTo>
    : T[K];
};

export function numbersToStrings<T extends object>(obj: T): ConvertTypes<T, number, string> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      typeof value === "number" ? String(value) : value,
    ])
  ) as ConvertTypes<T, number, string>;
}

export function stringsToNumbers<T extends object>(obj: T): ConvertTypes<T, string, number> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      typeof value === "string" ? Number(value) : value,
    ])
  ) as ConvertTypes<T, string, number>;
}
