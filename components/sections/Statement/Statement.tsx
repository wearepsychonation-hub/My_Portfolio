import { Reveal } from "@/components/atoms/Reveal";
import { Button } from "@/components/molecules/Button";
import type { HomeContent } from "@/types/content";

type StatementProps = HomeContent["statement"] & { bookUrl: string };

export function Statement({
  headline,
  lead,
  paragraphs,
  emphasis,
  ctaLabel,
  bookUrl,
}: StatementProps) {
  return (
    <section id="approach" className="bg-off-white py-8 sm:py-16">
      <div className="shell grid items-end gap-6 md:grid-cols-[7fr_5fr] lg:gap-12">
        <Reveal>
          <h2 className="text-display-m sm:text-display-l lg:text-display-xl">{headline}</h2>
        </Reveal>
        <Reveal className="grid justify-items-start gap-3">
          <p className="text-lead">{lead}</p>
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="text-emphasis text-ink italic">{emphasis}</p>
          <Button href={bookUrl} variant="dark">
            {ctaLabel}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
