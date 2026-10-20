import { Reveal } from "@/components/atoms/Reveal";
import { PhotoSection } from "@/components/organisms/PhotoSection";
import type { HomeContent } from "@/types/content";

export function About({ eyebrow, headline, emphasis, paragraphs, imageAlt }: HomeContent["about"]) {
  return (
    <PhotoSection id="about" imageAlt={imageAlt} placeholder="b" strong className="py-8 sm:py-16">
      <div className="shell grid gap-6 md:grid-cols-[5fr_7fr] lg:gap-12">
        <Reveal>
          <span className="mb-2 block label text-on-dark">{eyebrow}</span>
          <h2 className="text-display-m text-on-dark sm:text-display-l">{headline}</h2>
        </Reveal>
        <Reveal className="grid gap-3 text-lead">
          <p className="text-emphasis text-on-dark italic">{emphasis}</p>
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
      </div>
    </PhotoSection>
  );
}
