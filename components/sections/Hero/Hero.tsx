import { Button } from "@/components/molecules/Button";
import { PhotoSection } from "@/components/organisms/PhotoSection";
import type { HomeContent } from "@/types/content";

type HeroProps = HomeContent["hero"] & { bookUrl: string };

export function Hero({
  eyebrow,
  headline,
  emphasis,
  ctaLabel,
  image,
  imageAlt,
  bookUrl,
}: HeroProps) {
  return (
    <PhotoSection
      id="top"
      image={image}
      imageAlt={imageAlt}
      preload
      // Capped at the viewport below the 64px nav so the headline and CTA stay above the fold
      // on short laptops and landscape phones.
      className="flex min-h-[min(640px,100svh_-_64px)] items-end pt-12 pb-8 sm:min-h-[min(760px,100svh_-_64px)] sm:pt-16 sm:pb-12"
    >
      {/* No reveal: the headline is the LCP element and must paint immediately. */}
      <div className="shell">
        <span className="mb-2 block label text-on-dark">{eyebrow}</span>
        <h1 className="max-w-112.5 text-display-m text-on-dark sm:text-display-l lg:text-display-xl">
          {headline}
        </h1>
        {/* The hero line runs one step above `emphasis` on desktop, as in the reference. */}
        <p className="mt-3 text-emphasis text-on-dark italic sm:text-[20px]">{emphasis}</p>
        <Button href={bookUrl} variant="light" className="mt-4">
          {ctaLabel}
        </Button>
      </div>
    </PhotoSection>
  );
}
