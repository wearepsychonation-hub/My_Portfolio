import { cache } from "react";
import { seed } from "@/content/seed";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { SITE_CONTENT_QUERY } from "@/sanity/lib/queries";
import type { SITE_CONTENT_QUERY_RESULT } from "@/sanity.types";
import type { SiteContent, SiteImage } from "@/types/content";

/** Revalidated on a timer and on demand via /api/revalidate (tag "sanity"). */
export const CONTENT_REVALIDATE_SECONDS = 60;
export const CONTENT_TAG = "sanity";

/**
 * Single entry point for page data. Without Sanity env vars, or before the two singletons are
 * published in a new dataset, the site renders the typed seed instead.
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (!isSanityConfigured) return seed;

  const data = await client.fetch<SITE_CONTENT_QUERY_RESULT>(
    SITE_CONTENT_QUERY,
    {},
    { next: { revalidate: CONTENT_REVALIDATE_SECONDS, tags: [CONTENT_TAG] } },
  );
  if (!data.settings?.nav || !data.home?.hero) return seed;
  return toSiteContent(data.settings, data.home, data);
});

type Result = NonNullable<SITE_CONTENT_QUERY_RESULT>;
type Settings = Extract<NonNullable<Result["settings"]>, { nav: unknown[] }>;
type Home = Extract<NonNullable<Result["home"]>, { hero: object }>;
type QueryImage = { asset: { _id: string; lqip: string | null } | null; alt: string | null } & Pick<
  SiteImage,
  "hotspot" | "crop"
>;

/** An image field with no uploaded asset is treated as no image, so the placeholder shows. */
function toImage(image: QueryImage | null | undefined): SiteImage | null {
  if (!image?.asset) return null;
  return { asset: image.asset, alt: image.alt ?? "", hotspot: image.hotspot, crop: image.crop };
}

function toSiteContent(settings: Settings, home: Home, { gyms, slots }: Result): SiteContent {
  const fallback = seed.home;
  return {
    brand: {
      name: settings.name,
      city: settings.city,
      phone: settings.phone,
      whatsapp: settings.whatsapp,
      email: settings.email,
      instagram: settings.instagram,
      bookUrl: settings.bookUrl,
    },
    nav: settings.nav.map(({ _key, label, href, inFooter }) => ({
      key: _key,
      label,
      href,
      inFooter: inFooter ?? true,
    })),
    seo: {
      title: settings.seo?.title ?? `${settings.name} · Personal training in ${settings.city}`,
      description: settings.seo?.description ?? seed.seo.description,
      ogImage: toImage(settings.seo?.ogImage),
    },
    home: {
      hero: { ...home.hero, image: toImage(home.hero.image), imageAlt: fallback.hero.imageAlt },
      ticker: home.ticker,
      schedule: home.schedule,
      statement: { ...home.statement, paragraphs: home.statement.paragraphs ?? [] },
      band: { ...home.band, image: toImage(home.band.image), imageAlt: fallback.band.imageAlt },
      contact: {
        ...home.contact,
        cards: home.contact.cards.map(({ _key, ...c }) => ({ key: _key, ...c })),
      },
      testimonials: {
        eyebrow: home.testimonials.eyebrow,
        image: toImage(home.testimonials.image),
        imageAlt: fallback.testimonials.imageAlt,
      },
      about: {
        ...home.about,
        image: toImage(home.about.image),
        imageAlt: fallback.about.imageAlt,
      },
      gallery: (home.gallery ?? []).map(({ _key, ...image }, i) => ({
        key: _key,
        image: toImage(image),
        imageAlt: fallback.gallery[i]?.imageAlt ?? "Training",
      })),
    },
    testimonials: home.testimonials.items.map(({ quote, name, detail }) => ({
      quote,
      name,
      detail,
    })),
    gyms: gyms.map(({ _id, image, ...gym }) => ({ ...gym, id: _id, image: toImage(image) })),
    slots: slots.map(({ fullyBooked, ...slot }) => ({ ...slot, full: fullyBooked ?? false })),
  };
}
