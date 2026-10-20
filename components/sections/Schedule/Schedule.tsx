import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { HomeContent } from "@/types/content";
import type { ScheduleData } from "@/types/schedule";
import { ScheduleBoard } from "./ScheduleBoard";

type ScheduleProps = HomeContent["schedule"] & Pick<ScheduleData, "gyms" | "slots" | "today">;

export function Schedule({ eyebrow, headline, emphasis, gyms, slots, today }: ScheduleProps) {
  return (
    <section id="schedule" className="bg-paper py-8 sm:py-16">
      <div className="shell">
        <ScheduleBoard
          header={<SectionHeader eyebrow={eyebrow} title={headline} emphasis={emphasis} />}
          gyms={gyms}
          slots={slots}
          today={today}
        />
      </div>
    </section>
  );
}
