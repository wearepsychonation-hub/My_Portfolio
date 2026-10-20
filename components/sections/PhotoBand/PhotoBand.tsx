import { Reveal } from "@/components/atoms/Reveal";
import { Button } from "@/components/molecules/Button";
import { PhotoSection } from "@/components/organisms/PhotoSection";
import type { HomeContent } from "@/types/content";

export function PhotoBand({
  headline,
  emphasis,
  ctaLabel,
  ctaHref,
  imageAlt,
}: HomeContent["band"]) {
  return (
    <PhotoSection
      imageAlt={imageAlt}
      placeholder="b"
      className="flex min-h-55 items-center sm:min-h-65"
    >
      <Reveal className="shell flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="max-w-90 text-h2-mobile text-on-dark sm:text-display-l">{headline}</h2>
          <p className="mt-2 text-emphasis text-on-dark italic">{emphasis}</p>
        </div>
        <Button href={ctaHref} variant="light">
          {ctaLabel}
        </Button>
      </Reveal>
    </PhotoSection>
  );
}
