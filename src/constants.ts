import { Availability, DaySetting } from "./types";

export type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
export const DAYS: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const DEFAULT_AVAILABILITY: Availability = { startTime: "", endTime: "" };
export const DEFAULT_DAY_SETTING: DaySetting = {
  availabilities: [DEFAULT_AVAILABILITY],
  isAvailable: false,
};
