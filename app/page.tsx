import { About } from "@/components/sections/About";
import { ContactRow } from "@/components/sections/ContactRow";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { PhotoBand } from "@/components/sections/PhotoBand";
import { Schedule } from "@/components/sections/Schedule";
import { Statement } from "@/components/sections/Statement";
import { Testimonials } from "@/components/sections/Testimonials";
import { Ticker } from "@/components/sections/Ticker";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/molecules/Button";
import { cn } from "@/lib/cn";
import { getSiteContent } from "@/lib/content";
import { urlFor } from "@/sanity/lib/image";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, home } = await getSiteContent();
  const share = seo.ogImage ?? home.hero.image;
  const images = share
    ? [
        {
          url: urlFor(share).width(1200).height(630).fit("crop").url(),
          width: 1200,
          height: 630,
          alt: share.alt,
        },
      ]
    : undefined;

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: "/",
      title: seo.title,
      description: seo.description,
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function HomePage() {
  const { brand, nav, home, gyms, slots, today, testimonials } = await getSiteContent();
  const footerLinks = nav.filter((l) => l.href !== "#approach");

  return (
    <>
      <a
        href="#main"
        className={cn(
          buttonVariants({ variant: "light" }),
          "sr-only [--focus-ring:var(--color-paper)] focus:not-sr-only focus:fixed focus:top-1.5 focus:left-1.5 focus:z-60 focus:px-3.75 focus:py-1.25",
        )}
      >
        Skip to content
      </a>
      <Nav name={brand.name} links={nav} bookUrl={brand.bookUrl} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero {...home.hero} bookUrl={brand.bookUrl} />
        <Ticker text={home.ticker} />
        <Schedule {...home.schedule} gyms={gyms} slots={slots} today={today} />
        <Statement {...home.statement} bookUrl={brand.bookUrl} />
        <PhotoBand {...home.band} />
        <ContactRow {...home.contact} />
        <Testimonials {...home.testimonials} items={testimonials} />
        <About {...home.about} />
        <Gallery items={home.gallery} />
      </main>
      <Footer name={brand.name} city={brand.city} links={footerLinks} />
    </>
  );
}
