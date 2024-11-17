export const deepClone = (obj: Object) => JSON.parse(JSON.stringify(obj));

export const generateTime = (interval: number): string[] => {
  const startHour = 7; // 7 AM
  const endHour = 19; // 7 PM
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
