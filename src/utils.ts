import { Availability, DaySetting, Day } from "./types";

export const deepClone = (obj: Object) => JSON.parse(JSON.stringify(obj));

// Note: Im using ChatGPT for only (and only) this perticular function, I'm sorry that I had to do it
// I'm being nervous for the tight deadline, you are welcome to judge my action. I'm really sorry
// I also dont have the time to refactor this to use my own
import { addMinutes, format } from "date-fns";

export const generateTime = (interval: number): string[] => {
  const startHour = 7;
  const endHour = 19;
  const times: string[] = [];

  let currentTime = new Date();
  currentTime.setHours(startHour, 0, 0, 0); // Set time to 07:00

  const endTime = new Date();
  endTime.setHours(endHour, 0, 0, 0); // Set time to 19:00

  // Generate times from 7am to 7pm
  while (currentTime <= endTime) {
    times.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, interval); // Add interval to current time
  }

  // Check if one more interval after 19:00 is valid
  if (currentTime.getHours() < 24) {
    times.push(format(currentTime, "HH:mm")); // Add the time after 19:00
  }

  return times;
};

export type DayAndTime = { day: Day } & Availability;
export const generateDayAndTime = (days: Record<Day, DaySetting>): DayAndTime[] => {
  const result: DayAndTime[] = [];
  Object.keys(days).forEach((day: string) => {
    const currDay = days[day as Day];
    if (!currDay.isAvailable) return;
    currDay.availabilities.forEach((avail: Availability) => {
      result.push({ day: day as Day, ...avail });
    });
  });

  return result;
};
