import { addDays, addHours, format, getDay, parse, set, startOfHour, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";
import { FC, useState } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import SettingsForm from "./components/SettingsForm";
import { Card, CardBody, Divider } from "@nextui-org/react";
import { useStore } from "zustand";
import settingsStore, { DayNumber } from "./stores/settings";
import { DayAndTime, generateDayAndTime } from "./utils";

const locales = {
  "en-US": enUS,
};
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
const now = new Date();
const start = endOfHour(now);
const end = addHours(start, 2);
// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function App() {
  return (
    <div className="space-y-16 px-8">
      <SettingsForm />
      <Divider />
      <CalendarView />
    </div>
  );
}

function CalendarView() {
  const { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = useStore(settingsStore);

  const events = generateDayAndTime({ Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday }).map(
    (dayAndTime: DayAndTime) => {
      const dayNumber = DayNumber[dayAndTime.day];
      const dateTarget = addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), dayNumber);
      const start = set(dateTarget, {
        hours: Number(dayAndTime.startTime.split(":")[0]),
        minutes: Number(dayAndTime.startTime.split(":")[1]),
      });

      const end = set(dateTarget, {
        hours: Number(dayAndTime.endTime.split(":")[0]),
        minutes: Number(dayAndTime.endTime.split(":")[1]),
      });
      return {
        title: "Available",
        start,
        end,
      };
    }
  );
  return (
    <Card>
      <CardBody>
        <Calendar defaultView="week" events={events} localizer={localizer} style={{ height: "fit-content" }} />
      </CardBody>
    </Card>
  );
}
