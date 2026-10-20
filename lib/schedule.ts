import type { DayKey, Gym, GymTone, Slot } from "@/types/schedule";

export const DAYS: { key: DayKey; short: string; long: string }[] = [
  { key: "mon", short: "Mon", long: "Monday" },
  { key: "tue", short: "Tue", long: "Tuesday" },
  { key: "wed", short: "Wed", long: "Wednesday" },
  { key: "thu", short: "Thu", long: "Thursday" },
  { key: "fri", short: "Fri", long: "Friday" },
  { key: "sat", short: "Sat", long: "Saturday" },
  { key: "sun", short: "Sun", long: "Sunday" },
];

export type GymFilter = "all" | Gym["id"];

/** Fill and border per gym tone, shared by schedule slots and legend swatches. */
export const TONE_FILL: Record<GymTone, string> = {
  solid: "border-ink bg-ink",
  outline: "border-ink bg-paper",
  tint: "border-mist bg-mist",
};

/** The viewer's weekday. Client only: the server can't know the viewer's timezone. */
export function currentDayKey(): DayKey {
  // getDay() is 0 for Sunday; DAYS starts on Monday.
  return DAYS[(new Date().getDay() + 6) % 7]!.key;
}

export function slotsForDay(slots: Slot[], day: DayKey, filter: GymFilter) {
  return slots
    .filter((s) => s.day === day && (filter === "all" || s.gym === filter))
    .sort((a, b) => a.start.localeCompare(b.start));
}

/** "Not at [GYM] today." only when that day has sessions elsewhere. */
export function offDayText(slots: Slot[], day: DayKey, gym: Gym | undefined) {
  const trainingElsewhere = slots.some((s) => s.day === day);
  return gym && trainingElsewhere ? `Not at ${gym.name} today.` : "Not training today.";
}
