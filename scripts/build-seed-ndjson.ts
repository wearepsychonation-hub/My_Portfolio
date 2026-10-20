/**
 * Writes scripts/seed.ndjson from content/seed.ts for `sanity dataset import`.
 * Run with `pnpm seed:ndjson`. Photos aren't included; upload them in the Studio.
 */
import { writeFileSync } from "node:fs";
import { seed } from "../content/seed.ts";

// Import needs stable IDs so sessions and the home page can reference gyms and testimonials.
const gymId = (id: string) => `gym-${id}`;
const testimonialId = (i: number) => `testimonial-${i + 1}`;
const ref = (id: string, key?: string) => ({
  _type: "reference",
  _ref: id,
  ...(key && { _key: key }),
});

const { brand, nav, seo, home, gyms, slots, testimonials } = seed;
const strip = <T extends { image?: unknown; imageAlt?: unknown }>({
  image,
  imageAlt,
  ...rest
}: T) => rest;

const docs = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    ...brand,
    nav: nav.map(({ key, ...l }) => ({ _type: "navLink", _key: key, ...l })),
    seo: { _type: "seo", title: seo.title, description: seo.description },
  },
  {
    _id: "homePage",
    _type: "homePage",
    hero: strip(home.hero),
    ticker: home.ticker,
    schedule: home.schedule,
    statement: home.statement,
    band: strip(home.band),
    contact: {
      ...home.contact,
      cards: home.contact.cards.map(({ key, ...c }) => ({ _type: "contactCard", _key: key, ...c })),
    },
    testimonials: {
      eyebrow: home.testimonials.eyebrow,
      items: testimonials.map((_, i) => ref(testimonialId(i), `t${i}`)),
    },
    about: strip(home.about),
  },
  ...gyms.map(({ id, image, ...gym }, i) => ({
    _id: gymId(id),
    _type: "gym",
    ...gym,
    order: i + 1,
  })),
  ...slots.map(({ gym, full, ...slot }, i) => ({
    _id: `session-${i + 1}`,
    _type: "session",
    ...slot,
    gym: ref(gymId(gym)),
    fullyBooked: full ?? false,
  })),
  ...testimonials.map((t, i) => ({ _id: testimonialId(i), _type: "testimonial", ...t })),
];

const out = new URL("./seed.ndjson", import.meta.url);
writeFileSync(out, docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
console.log(`Wrote ${docs.length} documents to scripts/seed.ndjson`);
