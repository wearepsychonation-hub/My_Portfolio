import { defineQuery } from "next-sanity";

// Typegen resolves interpolated constants, so the image projection is written once.
const IMAGE_FIELDS = /* groq */ `"asset": asset->{ _id, "lqip": metadata.lqip }, alt, hotspot, crop`;
const IMAGE = `{ ${IMAGE_FIELDS} }`;

export const SITE_CONTENT_QUERY = defineQuery(`{
  "settings": *[_type == "siteSettings" && _id == "siteSettings"][0]{
    name, city, phone, whatsapp, email, instagram, bookUrl,
    nav[]{ _key, label, href, inFooter },
    seo{ title, description, ogImage${IMAGE} }
  },
  "home": *[_type == "homePage" && _id == "homePage"][0]{
    hero{ eyebrow, headline, emphasis, ctaLabel, image${IMAGE} },
    ticker,
    schedule{ eyebrow, headline, emphasis },
    statement{ headline, lead, paragraphs, emphasis, ctaLabel },
    band{ headline, emphasis, ctaLabel, ctaHref, image${IMAGE} },
    contact{ eyebrow, headline, emphasis, cards[]{ _key, channel, title, text, ctaLabel } },
    testimonials{ eyebrow, image${IMAGE}, "items": items[]->{ _id, quote, name, detail } },
    about{ eyebrow, headline, emphasis, bio, image${IMAGE} },
    gallery[]{ _key, ${IMAGE_FIELDS} }
  },
  "gyms": *[_type == "gym"] | order(order asc, name asc){
    _id, name, neighborhood, address, tone, directionsUrl, bookUrl, image${IMAGE}
  },
  "slots": *[_type == "session" && defined(gym)] | order(start asc){
    _id, day, start, end, "gym": gym._ref, type, fullyBooked
  }
}`);
