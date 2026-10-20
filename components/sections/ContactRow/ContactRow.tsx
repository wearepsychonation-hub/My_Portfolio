import { Reveal } from "@/components/atoms/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { ContactCard } from "@/components/organisms/ContactCard";
import type { HomeContent } from "@/types/content";
import type { Brand } from "@/types/schedule";

type ContactRowProps = HomeContent["contact"] & { brand: Brand };

export function ContactRow({ eyebrow, headline, emphasis, cards, brand }: ContactRowProps) {
  return (
    <section id="contact" className="bg-off-white py-8 sm:py-16">
      <div className="shell">
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={headline} emphasis={emphasis} className="mb-6" />
        </Reveal>
        <Reveal className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ key, ...c }) => (
            <ContactCard key={key} {...c} brand={brand} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
