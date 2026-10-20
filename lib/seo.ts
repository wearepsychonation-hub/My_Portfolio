import { resolveContact } from "@/lib/contact";
import { siteUrl } from "@/lib/site";
import { urlFor } from "@/sanity/lib/image";
import type { SiteContent } from "@/types/content";

/** The share image, falling back to the hero photo, cropped to 1200×630. */
export function shareImage({ seo, home }: SiteContent) {
  const image = seo.ogImage ?? home.hero.image;
  if (!image) return null;
  const url = urlFor(image).width(1200).height(630).fit("crop").url();
  return { url, width: 1200, height: 630, alt: image.alt };
}

/** schema.org description of the business for search engines: who, where, how to reach them. */
export function businessJsonLd(content: SiteContent) {
  const { brand, seo, gyms } = content;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: brand.name,
    description: seo.description,
    url: siteUrl.href,
    telephone: brand.phone,
    email: brand.email,
    image: shareImage(content)?.url,
    areaServed: { "@type": "City", name: brand.city },
    sameAs: [resolveContact("instagram", brand).href],
    employee: { "@type": "Person", name: brand.name, jobTitle: "Personal trainer" },
    location: gyms.map((gym) => ({
      "@type": "ExerciseGym",
      name: gym.name,
      address: gym.address,
      hasMap: gym.directionsUrl.startsWith("http") ? gym.directionsUrl : undefined,
    })),
  };
}

/** Serialised for a <script type="application/ld+json">, with `<` escaped as Next's docs advise. */
export const toJsonLdScript = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");
