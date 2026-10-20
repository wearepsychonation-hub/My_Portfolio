import { Reveal } from "@/components/atoms/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { HomeContent } from "@/types/content";

/** Shell only; tabs, week grid, day list and location cards land in Phase 3. */
export function Schedule({ eyebrow, headline, emphasis }: HomeContent["schedule"]) {
  return (
    <section id="schedule" className="bg-paper py-8 sm:py-16">
      <div className="shell">
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={headline} emphasis={emphasis} />
        </Reveal>
      </div>
    </section>
  );
}
