import { create } from "zustand";
import { persist } from "zustand/middleware";
import { deepClone } from "../utils";

interface Availability {
  startTime: string;
  endTime: string;
}

interface DaySetting {
  isAvailable: boolean;
  availabilities: Availability[];
}

type Day = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export const DAYS: Day[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

interface Settings {
  allowVideoTourCall: boolean;
  numberOfBookingSession: number;
  visitDuration: string;
  mon: DaySetting;
  tue: DaySetting;
  wed: DaySetting;
  thu: DaySetting;
  fri: DaySetting;
  sat: DaySetting;
  sun: DaySetting;
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
      mon: DEFAULT_DAY_SETTING,
      tue: DEFAULT_DAY_SETTING,
      wed: DEFAULT_DAY_SETTING,
      thu: DEFAULT_DAY_SETTING,
      fri: DEFAULT_DAY_SETTING,
      sat: DEFAULT_DAY_SETTING,
      sun: DEFAULT_DAY_SETTING,
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
