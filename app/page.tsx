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
import { getSiteContent } from "@/lib/content";

export default async function HomePage() {
  const { brand, nav, home, testimonials } = await getSiteContent();
  const footerLinks = nav.filter((l) => l.href !== "#approach");

  return (
    <>
      <Nav name={brand.name} links={nav} bookUrl={brand.bookUrl} />
      <main>
        <Hero {...home.hero} bookUrl={brand.bookUrl} />
        <Ticker text={home.ticker} />
        <Schedule {...home.schedule} />
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
