import type { SiteContent } from "@/types/content";
import type { Brand } from "@/types/schedule";

/** Every bracketed placeholder lives here. Replace before launch. */
const brand: Brand = {
  name: "[NAME]",
  city: "[CITY]",
  phone: "[000 000 0000]",
  whatsapp: "[000 000 0000]",
  email: "hello@[domain].com",
  instagram: "@[handle]",
  bookUrl: "#contact",
};

const digits = (s: string) => s.replace(/[^\d+]/g, "");

export const seed: SiteContent = {
  brand,
  nav: [
    { href: "#schedule", label: "Schedule" },
    { href: "#approach", label: "Approach" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ],
  home: {
    hero: {
      eyebrow: `Personal training · ${brand.city}`,
      headline: "Back to basics.",
      emphasis: "Your body. Your goals. Your lifestyle.",
      ctaLabel: "Start today",
      imageAlt: "Action shot, gym floor",
    },
    ticker: `Personal training across ${brand.city}`,
    schedule: {
      eyebrow: "Schedule",
      headline: "Where to find me.",
      emphasis: "Book a session at the location closest to you.",
    },
    statement: {
      headline: "Strong is built, not bought.",
      lead: "No gimmicks. No twelve-week miracles. Just the fundamentals — squat, hinge, push, pull, carry — coached properly and progressed patiently.",
      paragraphs: [
        "I train people one-to-one and in groups of up to six, so every rep gets seen and every plan fits the life you actually have.",
      ],
      emphasis: "Show up. Do the work. Go home stronger.",
      ctaLabel: "Book a free consult",
    },
    band: {
      headline: "Small groups. Full attention.",
      emphasis: "Six people, one coach, no one hiding at the back.",
      ctaLabel: "See group sessions",
      ctaHref: "#schedule",
      imageAlt: "Small group session",
    },
    contact: {
      eyebrow: "Contact",
      headline: "Let’s talk.",
      emphasis: "Tell me where you are. I’ll tell you where to start.",
      cards: [
        {
          icon: "phone",
          title: "Text or call.",
          text: `Quickest way to reach me. ${brand.phone}`,
          ctaLabel: "Call now",
          href: `tel:${digits(brand.phone)}`,
        },
        {
          icon: "chat",
          title: "WhatsApp.",
          text: "Message any time, I reply between sessions.",
          ctaLabel: "Message",
          href: `https://wa.me/${digits(brand.whatsapp)}`,
        },
        {
          icon: "mail",
          title: "Email.",
          text: "For longer questions or corporate groups.",
          ctaLabel: "Write",
          href: `mailto:${brand.email}`,
        },
        {
          icon: "camera",
          title: "Instagram.",
          text: `Training clips and form tips. ${brand.instagram}`,
          ctaLabel: "Follow",
          href: `https://instagram.com/${brand.instagram.replace(/^@/, "")}`,
        },
      ],
    },
    testimonials: { eyebrow: "Clients", imageAlt: "Dark, low-key portrait" },
    about: {
      eyebrow: "About",
      headline: `Hi, I’m ${brand.name}.`,
      emphasis: "I don’t sell transformations. I teach people to train.",
      paragraphs: [
        `I’ve coached in ${brand.city} for [X] years, across commercial floors, strength gyms and the odd car park at 6am. Before that I was the person at the back of the class, unsure what I was doing and too stubborn to ask.`,
        "That’s the person I build sessions for. We start with how you move today, not how someone on the internet moves. We pick a few things that matter, we do them well, and we add weight when you’ve earned it. Nothing clever. Nothing you can’t keep doing in ten years.",
        "Most of my clients are busy: parents, shift workers, people who’ve tried everything once. They don’t need more motivation. They need a plan, a time and a place. That’s why I train at three gyms across the city — so the closest one is never far.",
        "[Qualifications and certifications.]",
      ],
      imageAlt: "Coach portrait",
    },
    gallery: [
      { alt: "Coaching a squat" },
      { alt: "Kettlebell detail" },
      { alt: "Group warm-up" },
      { alt: "Chalk and bar" },
    ],
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
