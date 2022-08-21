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

export async function findAll(startDate: Moment, endDate: Moment): Promise<DayEntry[]> {
  const response = await axios.get(`/api/day-entry`);

  if (!response || !response.data) {
    throw new Error('Unexpected response');
  }

  const dayEntries: DayEntry[] = response.data;
  const result: DayEntry[] = [];

  const daysDelta = endDate.diff(startDate, 'days');

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < daysDelta; index++) {
    const currentDate = startDate.add(1, 'days').format('YYYY-MM-DD');

    const dbDayEntry = dayEntries.find((_dayEntry) => {
      return _dayEntry.date === currentDate;
    });

    if (dbDayEntry) {
      result.push(dbDayEntry);
    } else {
      result.push({
        isArtificial: true,
        totalCalories: 0,
        totalCarbs: 0,
        totalFat: 0,
        totalProtein: 0,
        id: currentDate,
        date: currentDate,
        caloriesTarget: 2000,
        foodEntries: {},
        weight: undefined
      });
    }
  }

  return result;
}
