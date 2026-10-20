import type { Metadata } from "next";
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
import { buttonVariants } from "@/components/molecules/Button";
import { cn } from "@/lib/cn";
import { getSiteContent } from "@/lib/content";
import { businessJsonLd, shareImage, toJsonLdScript } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const { title, description } = content.seo;
  const share = shareImage(content);
  const images = share ? [share] : undefined;

  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: { type: "website", url: "/", title, description, images },
    twitter: { card: share ? "summary_large_image" : "summary", title, description },
  };
}

export default async function HomePage() {
  const content = await getSiteContent();
  const { brand, nav, home, gyms, slots, today, testimonials } = content;
  const footerLinks = nav.filter((l) => l.href !== "#approach");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdScript(businessJsonLd(content)) }}
      />
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
        <ContactRow {...home.contact} brand={brand} />
        <Testimonials {...home.testimonials} items={testimonials} />
        <About {...home.about} />
        <Gallery items={home.gallery} />
      </main>
      <Footer name={brand.name} city={brand.city} links={footerLinks} />
    </>
  );
}
