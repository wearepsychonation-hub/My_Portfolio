import type { ScheduleData } from "@/types/schedule";

/** Every bracketed placeholder lives here. Replace before launch. */
export const seed: ScheduleData = {
  brand: {
    name: "[NAME]",
    city: "[CITY]",
    phone: "[000 000 0000]",
    whatsapp: "[000 000 0000]",
    email: "hello@[domain].com",
    instagram: "@[handle]",
    bookUrl: "#contact",
  },
  gyms: [
    {
      id: "a",
      name: "[GYM A]",
      neighborhood: "[Neighborhood A]",
      address: "[Street address], [CITY]",
      tone: "solid",
      directionsUrl: "#",
      bookUrl: "#",
    },
    {
      id: "b",
      name: "[GYM B]",
      neighborhood: "[Neighborhood B]",
      address: "[Street address], [CITY]",
      tone: "outline",
      directionsUrl: "#",
      bookUrl: "#",
    },
    {
      id: "c",
      name: "[GYM C]",
      neighborhood: "[Neighborhood C]",
      address: "[Street address], [CITY]",
      tone: "tint",
      directionsUrl: "#",
      bookUrl: "#",
    },
  ],
  slots: [
    { day: "mon", start: "06:00", end: "07:00", gym: "a", type: "1-1" },
    { day: "mon", start: "12:15", end: "13:00", gym: "b", type: "Group" },
    { day: "mon", start: "18:00", end: "19:00", gym: "a", type: "Group" },
    { day: "tue", start: "07:00", end: "08:00", gym: "c", type: "1-1", full: true },
    { day: "tue", start: "17:30", end: "18:30", gym: "b", type: "1-1" },
    { day: "wed", start: "06:00", end: "07:00", gym: "a", type: "1-1" },
    { day: "wed", start: "18:00", end: "19:00", gym: "c", type: "Group" },
    { day: "thu", start: "07:00", end: "08:00", gym: "b", type: "1-1" },
    { day: "thu", start: "12:15", end: "13:00", gym: "a", type: "Group", full: true },
    { day: "fri", start: "06:00", end: "07:00", gym: "c", type: "1-1" },
    { day: "sat", start: "09:00", end: "10:00", gym: "b", type: "Group" },
    { day: "sat", start: "10:30", end: "11:30", gym: "a", type: "Group" },
  ],
  // Placeholders: must be real, attributed client quotes before launch.
  testimonials: [
    {
      quote:
        "[Client testimonial.] No noise, no fads. Just a plan that fit my week, and someone who noticed every rep.",
      name: "[CLIENT NAME]",
      detail: "1-1 client",
    },
    {
      quote:
        "[Client testimonial.] I came for the deadlift. I stayed because the group became the best hour of my week.",
      name: "[CLIENT NAME]",
      detail: "Small group",
    },
    {
      quote: "[Client testimonial.] Patient, precise, and honest about what actually works.",
      name: "[CLIENT NAME]",
      detail: "1-1 client",
    },
  ],
};
