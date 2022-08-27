import axios from 'axios';
import { Moment } from 'moment';
import { FoodEntry } from '../food-entries/types';
import { DayEntry, FoodEntryMap } from './types';

export async function findOne(id: number): Promise<DayEntry> {
  const response = await axios.get(`/api/day-entry/${id}`);

  if (!response || !response.data) {
    throw new Error('Unexpected response');
  }

  const foodEntriesMap: FoodEntryMap = {};

  response.data.foodEntries.forEach((foodEntry: FoodEntry) => {
    foodEntriesMap[foodEntry.id] = foodEntry;
  });

  return { ...response.data, foodEntries: foodEntriesMap };
}

export async function getDayEntryByDate(date: string): Promise<DayEntry> {
  const response = await axios.get(`/api/day-entry/date/${date}`);

  if (!response || !response.data) {
    throw new Error('Unexpected response');
  }

  return response.data;
}

export async function create(data: Partial<DayEntry>): Promise<DayEntry> {
  const response = await axios.post(`/api/day-entry`, data);

  if (!response || !response.data) {
    throw new Error('Unexpected response');
  }

  return response.data;
}
