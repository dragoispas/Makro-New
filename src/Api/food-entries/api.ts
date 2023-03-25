import axios from "axios";
import { FoodEntry } from "./types";

export async function findOne(id: number | string): Promise<FoodEntry> {
  const response = await axios.get(`/api/v1/food-entry/${id}`);

  if (!response || !response.data) {
    throw new Error("Unexpected response");
  }

  return response.data;
}

export async function createFoodEntry(data: Partial<FoodEntry>) {
  const response = await axios.post("/api/v1/food-entry", data);

  if (!response || !response.data) {
    throw new Error("Unexpected response");
  }

  return response.data;
}

export async function update(id: number | string, data: Partial<FoodEntry>) {
  const response = await axios.put(`/api/v1/food-entry/${id}`, data);

  if (!response || !response.data) {
    throw new Error("Unexpected response");
  }

  return response.data;
}

export async function remove(id: number | string) {
  const response = await axios.delete(`/api/v1/food-entry/${id}`);

  if (!response || !response.data) {
    throw new Error("Unexpected response");
  }

  return response.data;
}
