import axios from 'axios';
// // import { ServingSize } from './types';

// export async function findAll(productId?: number): Promise<ServingSize[]> {
//   const queryString = productId ? `?productId=${productId}` : '';
//   const response = await axios.get(`/api/serving-size/${queryString}`);

//   if (!response || !response.data) {
//     throw new Error('Unexpected response');
//   }

//   return response.data;
// }

// export async function create(data: Partial<ServingSize>) {
//   const response = await axios.post(`/api/serving-size`, data);

//   if (!response || !response.data) {
//     throw new Error('Unexpected response');
//   }

//   return response.data;
// }

// export async function remove(id: number) {
//   const response = await axios.delete(`/api/serving-size/${id}`);

//   if (!response || !response.data) {
//     throw new Error('Unexpected response');
//   }

//   return response.data;
// }
