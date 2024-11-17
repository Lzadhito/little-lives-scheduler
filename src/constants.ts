import { Availability, Day, DaySetting } from "./types";

export const DAYS: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const DEFAULT_AVAILABILITY: Availability = { startTime: "", endTime: "" };
export const DEFAULT_DAY_SETTING: DaySetting = {
  availabilities: [DEFAULT_AVAILABILITY],
  isAvailable: false,
};
