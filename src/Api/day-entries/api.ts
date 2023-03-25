import axios from "axios";
import moment from "moment";
import { DayEntry } from "./types";

export async function findOne(id: number): Promise<DayEntry> {
  const response = await axios.get(`/api/v1/day-entry/${id}`);

  if (!response || !response.data) {
    throw new Error("Unexpected response");
  }

  return response.data;
}

export async function getDayEntryByDate(date: Date): Promise<DayEntry> {
  const formattedDate = moment(date).format("YYYY-MM-DD");
  const response = await axios.get(`/api/v1/day-entry/date/${formattedDate}`);

  if (!response || !response.data) {
    throw new Error("Unexpected response");
  }

  return response.data;
}

export async function create(data: Partial<DayEntry>): Promise<DayEntry> {
  const response = await axios.post("/api/v1/day-entry", data);

  if (!response || !response.data) {
    throw new Error("Unexpected response");
  }

  return response.data;
}

export async function updateDateEntry(id: number, data: Partial<DayEntry>): Promise<DayEntry> {
  const response = await axios.put(`/api/v1/day-entry/${id}`, data);

  if (!response || !response.data) {
    throw new Error("Unexpected response");
  }

  return response.data;
}
