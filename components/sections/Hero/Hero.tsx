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
      className="flex min-h-80 items-end pt-12 pb-8 sm:min-h-95 sm:pt-16 sm:pb-12"
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
