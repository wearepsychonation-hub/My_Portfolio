import type { IconName } from "@/components/atoms/Icon";
import type { ScheduleData } from "./schedule";

export interface NavLink {
  href: string;
  label: string;
}

export interface ContactCard {
  icon: IconName;
  title: string;
  text: string;
  ctaLabel: string;
  href: string;
}

export interface HomeContent {
  hero: { eyebrow: string; headline: string; emphasis: string; ctaLabel: string; imageAlt: string };
  ticker: string;
  schedule: { eyebrow: string; headline: string; emphasis: string };
  statement: {
    headline: string;
    lead: string;
    paragraphs: string[];
    emphasis: string;
    ctaLabel: string;
  };
  band: { headline: string; emphasis: string; ctaLabel: string; ctaHref: string; imageAlt: string };
  contact: { eyebrow: string; headline: string; emphasis: string; cards: ContactCard[] };
  testimonials: { eyebrow: string; imageAlt: string };
  about: {
    eyebrow: string;
    headline: string;
    emphasis: string;
    paragraphs: string[];
    imageAlt: string;
  };
  gallery: { alt: string }[];
}

export interface SiteContent extends ScheduleData {
  nav: NavLink[];
  home: HomeContent;
}
