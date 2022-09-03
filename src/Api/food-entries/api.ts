import axios from 'axios';
import { FoodEntry } from './types';

export async function findOne(id: number | string): Promise<FoodEntry> {
  const response = await axios.get(`/api/food-entry/${id}`);

  if (!response || !response.data) {
    throw new Error('Unexpected response');
  }

  return response.data;
}

export async function create(data: Partial<FoodEntry>) {
  const response = await axios.post('/api/food-entry', data);

  if (!response || !response.data) {
    throw new Error('Unexpected response');
  }

  return response.data;
}

export async function update(id: number | string, data: Partial<FoodEntry>) {
  const response = await axios.put(`/api/food-entry/${id}`, data);

  if (!response || !response.data) {
    throw new Error('Unexpected response');
  }

  return response.data;
}

export async function remove(id: number | string) {
  const response = await axios.delete(`/api/food-entry/${id}`);

  if (!response || !response.data) {
    throw new Error('Unexpected response');
  }

  return response.data;
}
