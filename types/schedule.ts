import type { SiteImage } from "./content";

/** Mirrors design-system/components/index.d.ts. */

/** How a gym is told apart in the schedule. Never by color. */
export type GymTone = "solid" | "outline" | "tint";
export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface Gym {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  /** One per gym, max three gyms. */
  tone: GymTone;
  directionsUrl: string;
  bookUrl: string;
  image?: SiteImage | null;
}

export interface Slot {
  day: DayKey;
  /** "06:00" (24h) */
  start: string;
  end: string;
  /** Gym.id */
  gym: string;
  type: "1-1" | "Group";
  full?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
}

export interface Brand {
  name: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  bookUrl: string;
}

export interface ScheduleData {
  brand: Brand;
  gyms: Gym[];
  slots: Slot[];
  testimonials: Testimonial[];
  /** Pin "today" (otherwise the viewer's clock). */
  today?: DayKey;
}
