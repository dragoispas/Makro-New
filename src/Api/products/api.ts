import axios from 'axios';
import { Product } from './types';

export async function findAll(searchTerm: string): Promise<Product[]> {
  const response = await axios.get(`/api/product/search/${searchTerm}`);

  if (!response || !response.data) {
    throw new Error('Unexpected response');
  }

  return response.data;
}

export async function create(rawData: Partial<Product>): Promise<Product> {
  const { id, ...data } = rawData;
  const response = await axios.post('/api/product', data);

  if (!response || !response.data) {
    throw new Error('Unexpected response');
  }

  return response.data;
}

export async function update(id: number | string, data: Partial<Product>) {
  const response = await axios.put(`/api/product/${id}`, data);

  if (!response || !response.data) {
    throw new Error('Unexpected response');
  }

  return response.data;
}

export async function remove(id: number) {
  const response = await axios.delete(`/api/product/${id}`);

  if (!response || !response.data) {
    throw new Error('Unexpected response');
  }

  return response.data;
}
