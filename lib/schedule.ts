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

/** "06:00" → 6:00 AM. Data stays 24h ("HH:mm") so it sorts and validates as plain text. */
function to12h(hhmm: string) {
  const [h = 0, m = 0] = hhmm.split(":").map(Number);
  return { time: `${h % 12 || 12}:${String(m).padStart(2, "0")}`, period: h < 12 ? "AM" : "PM" };
}

/**
 * A 12-hour range with AM/PM said once when both ends share it:
 * "06:00"–"07:00" → { range: "6:00–7:00", period: "AM" }; "11:30"–"12:30" → "11:30 AM–12:30", "PM".
 */
export function formatTimeRange(start: string, end: string) {
  const s = to12h(start);
  const e = to12h(end);
  const range = s.period === e.period ? `${s.time}–${e.time}` : `${s.time} ${s.period}–${e.time}`;
  return { range, period: e.period, label: `${range} ${e.period}` };
}

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
