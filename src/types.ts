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
