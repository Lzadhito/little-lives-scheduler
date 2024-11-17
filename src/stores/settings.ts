import { create } from "zustand";
import { persist } from "zustand/middleware";
import { deepClone } from "../utils";
import { Day, Availability, DaySetting } from "../types";
import { DEFAULT_DAY_SETTING } from "../constants";

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

const settingsStore = create(
  persist<Settings>(
    (set, get) => ({
      allowVideoTourCall: false,
      numberOfBookingSession: 1,
      visitDuration: "15",
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
