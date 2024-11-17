import { create } from "zustand";
import { persist } from "zustand/middleware";
import { deepClone } from "../utils";

export interface Availability {
  startTime: string;
  endTime: string;
}

export interface DaySetting {
  isAvailable: boolean;
  availabilities: Availability[];
}

export enum DayNumber {
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6,
}

export type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
export const DAYS: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface Settings {
  allowVideoTourCall: boolean;
  numberOfBookingSession: number;
  visitDuration: string;
  Monday: DaySetting;
  Tuesday: DaySetting;
  Wednesday: DaySetting;
  Thursday: DaySetting;
  Friday: DaySetting;
  Saturday: DaySetting;
  Sunday: DaySetting;
  setSettings: (key: keyof Settings, value: any) => void;
  setDay: (day: Day, key: keyof DaySetting, value: any) => void;
  setAvailability: (day: Day, key: keyof Availability, index: number, value: string) => void;
}

export const DEFAULT_AVAILABILITY: Availability = { startTime: "", endTime: "" };

export const DEFAULT_DAY_SETTING: DaySetting = {
  availabilities: [DEFAULT_AVAILABILITY],
  isAvailable: false,
};

const settingsStore = create(
  persist<Settings>(
    (set, get) => ({
      allowVideoTourCall: false,
      numberOfBookingSession: 0,
      visitDuration: "",
      Monday: DEFAULT_DAY_SETTING,
      Tuesday: DEFAULT_DAY_SETTING,
      Wednesday: DEFAULT_DAY_SETTING,
      Thursday: DEFAULT_DAY_SETTING,
      Friday: DEFAULT_DAY_SETTING,
      Saturday: DEFAULT_DAY_SETTING,
      Sunday: DEFAULT_DAY_SETTING,
      setSettings: (key: keyof Settings, value: any) => set({ [key]: value }),
      setDay: (day: Day, key: keyof DaySetting, value: any) => {
        const dayValue = get()[day];
        const newDayValue = { ...dayValue, [key]: value };
        set({ [day]: newDayValue });
      },
      setAvailability: (day: Day, key: keyof Availability, index: number, value: string) => {
        const newAvailabilities = deepClone(get()[day].availabilities);
        newAvailabilities[index][key] = value;

        get().setDay(day, "availabilities", newAvailabilities);
      },
    }),
    { name: "settings" }
  )
);

export default settingsStore;
