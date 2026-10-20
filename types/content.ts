import type { PortableTextBlock } from "sanity";
import type { ScheduleData } from "./schedule";

/** A Sanity image as queried; components fall back to a placeholder when it's absent. */
export interface SiteImage {
  asset: { _id: string; lqip?: string | null };
  alt: string;
  hotspot?: { x: number; y: number } | null;
  crop?: { top: number; bottom: number; left: number; right: number } | null;
}

export interface NavLink {
  href: string;
  label: string;
}

export type ContactChannel = "phone" | "whatsapp" | "email" | "instagram";

export interface ContactCard {
  key: string;
  channel: ContactChannel;
  title: string;
  /** The number, address or handle from the brand is appended. */
  text: string;
  ctaLabel: string;
}

/** `imageAlt` describes the intended photo: the alt text fallback and the placeholder caption. */
interface Photographic {
  imageAlt: string;
  image?: SiteImage | null;
}

export interface HomeContent {
  hero: Photographic & { eyebrow: string; headline: string; emphasis: string; ctaLabel: string };
  ticker: string;
  schedule: { eyebrow: string; headline: string; emphasis: string };
  statement: {
    headline: string;
    lead: string;
    paragraphs: string[];
    emphasis: string;
    ctaLabel: string;
  };
  band: Photographic & { headline: string; emphasis: string; ctaLabel: string; ctaHref: string };
  contact: { eyebrow: string; headline: string; emphasis: string; cards: ContactCard[] };
  testimonials: Photographic & { eyebrow: string };
  about: Photographic & {
    eyebrow: string;
    headline: string;
    emphasis: string;
    bio: PortableTextBlock[];
  };
  gallery: Photographic[];
}

export interface Seo {
  title: string;
  description: string;
  ogImage?: SiteImage | null;
}

export interface SiteContent extends ScheduleData {
  nav: NavLink[];
  seo: Seo;
  home: HomeContent;
}
