/** [NAME] Training — window.Trainer (vanilla JS, no React). */

/** How a gym is told apart in the schedule. Never by color. */
export type GymTone = "solid" | "outline" | "tint";
export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface Gym {
  id: string;            // referenced by Slot.gym
  name: string;          // shown on tabs, slots, cards — UPPERCASE in tabs
  neighborhood: string;
  address: string;
  tone: GymTone;         // one per gym, max three gyms
  directionsUrl: string;
  bookUrl: string;
}

export interface Slot {
  day: DayKey;
  start: string;         // "06:00" (24h)
  end: string;           // "07:00"
  gym: string;           // Gym.id
  type: "1-1" | "Group";
  full?: boolean;        // Fully booked state
}

export interface Testimonial { quote: string; name: string; detail: string; }

export interface ScheduleData {
  brand: { name: string; city: string; phone: string; whatsapp: string; email: string; instagram: string; bookUrl: string };
  gyms: Gym[];
  slots: Slot[];
  testimonials: Testimonial[];
  /** Pin "today" (otherwise the viewer's clock). */
  today?: DayKey;
}

export type Part = "nav" | "hero" | "ticker" | "schedule" | "statement" | "band" | "contact" | "testimonial" | "about" | "footer";

export interface Trainer {
  sample: ScheduleData;
  /** Render one part, several, or "home" (all, in order) into el and wire up behaviour. */
  mount(el: HTMLElement, parts: "home" | Part | Part[], data?: ScheduleData | null): HTMLElement;
  icon(name: "pin" | "phone" | "chat" | "mail" | "camera" | "menu" | "close" | "chevL" | "chevR" | "chevD" | "arrow", size?: number, stroke?: number): string;
}
