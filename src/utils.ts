import { Availability, DaySetting, Day } from "./types";

export const deepClone = (obj: Object) => JSON.parse(JSON.stringify(obj));

// Note: Im using ChatGPT for only (and only) this perticular function, I'm sorry that I had to do it
// I'm being nervous for the tight deadline, you are welcome to judge my action. I'm really sorry
// I also dont have the time to refactor this to use my own
export const generateTime = (interval: number): string[] => {
  const startHour = 7;
  const endHour = 19;
  const times: string[] = [];

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minutes = 0; minutes < 60; minutes += interval) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");
      times.push(`${formattedHour}:${formattedMinutes}`);
    }
  }

  times.push(`19:00`);

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
