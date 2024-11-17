import { Button, Card, CardBody, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { useStore } from "zustand";
import settingsStore from "../stores/settings";
import { FiPlusCircle, FiXCircle } from "react-icons/fi";
import { generateTime } from "../utils";
import { DAYS, DEFAULT_AVAILABILITY } from "../constants";

export default function SettingsForm() {
  return (
    <div className="flex justify-center gap-16 mt-4">
      <SettingsCard />
      <AvailabilityCard />
    </div>
  );
}

const DURATIONS = [15, 30, 35, 60, 90];
function SettingsCard() {
  const settings = useStore(settingsStore);

  return (
    <Card className="w-fit h-fit">
      <CardBody className="space-y-4">
        <Select
          variant="bordered"
          className="block"
          onChange={(event) => settings.setSettings("visitDuration", event.target.value)}
          label="Visit Duration"
          selectedKeys={new Set([settings.visitDuration])}
        >
          {DURATIONS.map((duration) => (
            <SelectItem key={duration} textValue={`${duration} min`}>
              {duration} min
            </SelectItem>
          ))}
        </Select>
        <Input
          variant="bordered"
          className="block"
          onInput={(event) => settings.setSettings("numberOfBookingSession", Number(event.currentTarget.value || 0))}
          type="number"
          min={0}
          label="No. of Booking/Session"
          value={String(settings.numberOfBookingSession)}
        />
        <Checkbox
          className="block"
          onValueChange={(value) => settings.setSettings("allowVideoTourCall", value)}
          isSelected={settings.allowVideoTourCall}
        >
          Allow video tour call
        </Checkbox>
      </CardBody>
    </Card>
  );
}

function AvailabilityCard() {
  const settings = useStore(settingsStore);

  const times = generateTime(Number(settings.visitDuration));

  return (
    <Card className="w-fit">
      <CardBody>
        <h4 className="font-bold text-xl">Availability</h4>
        <div>Set your week recurring schedule</div>
        <div className="space-y-4 mt-4">
          {DAYS.map((day) => (
            <div className="flex items-start" key={day}>
              <Checkbox
                className="mt-1 font-bold min-w-24"
                isSelected={settings[day].isAvailable}
                onValueChange={(value) => settings.setDay(day, "isAvailable", value)}
              >
                {day.substring(0, 3)}
              </Checkbox>
              {settings[day].isAvailable ? (
                <>
                  <div className="space-y-2">
                    {settings[day].availabilities?.map((availability, index) => (
                      <div className="flex items-center gap-2" key={index}>
                        <Select
                          variant="bordered"
                          className="w-32"
                          // TODO: refactor extract to a function
                          onChange={(event) => {
                            const startIndex = times.findIndex((time) => time === event.target.value);
                            settings.setAvailability(day, "startTime", index, event.target.value);
                            settings.setAvailability(day, "endTime", index, times[startIndex + 1]);
                          }}
                          selectedKeys={new Set([availability.startTime])}
                        >
                          {times.slice(0, times.length - 1).map((time) => (
                            <SelectItem key={time}>{time}</SelectItem>
                          ))}
                        </Select>
                        <Select isDisabled className="w-32" selectedKeys={new Set([availability.endTime])}>
                          {times.map((time) => (
                            <SelectItem key={time}>{time}</SelectItem>
                          ))}
                        </Select>
                        <Button
                          variant="light"
                          isIconOnly
                          isDisabled={index === 0}
                          onClick={() => {
                            settings.setDay(
                              day,
                              "availabilities",
                              settings[day].availabilities.filter((_, idx) => idx !== index)
                            );
                          }}
                        >
                          <FiXCircle />
                        </Button>
                        <Button
                          variant="light"
                          isIconOnly
                          isDisabled={index >= settings.numberOfBookingSession - 1}
                          // TODO: refactor extract to a function
                          onClick={() =>
                            settings.setDay(day, "availabilities", [
                              ...settings[day].availabilities,
                              DEFAULT_AVAILABILITY,
                            ])
                          }
                        >
                          <FiPlusCircle />
                        </Button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-gray-500 pt-3">Unavailable</div>
              )}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
