"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import { Icon } from "@/components/atoms/Icon";
import { Reveal } from "@/components/atoms/Reveal";
import { SignalDot } from "@/components/atoms/SignalDot";
import { Swatch } from "@/components/molecules/Swatch";
import { LocationCard } from "@/components/organisms/LocationCard";
import { OffDay, Slot } from "@/components/organisms/Slot";
import { cn } from "@/lib/cn";
import { currentDayKey, DAYS, offDayText, slotsForDay, type GymFilter } from "@/lib/schedule";
import type { DayKey, Gym, Slot as SlotData } from "@/types/schedule";

type ScheduleBoardProps = {
  header: ReactNode;
  gyms: Gym[];
  slots: SlotData[];
  /** Pins "today"; otherwise the viewer's clock decides, after hydration. */
  today?: DayKey;
};

const placeholders = ["a", "b", "c"] as const;
const noop = () => () => {};

export function ScheduleBoard({ header, gyms, slots, today: pinned }: ScheduleBoardProps) {
  const [filter, setFilter] = useState<GymFilter>("all");
  const clientToday = useSyncExternalStore(noop, currentDayKey, () => null);
  const today = pinned ?? clientToday;

  const gymById = new Map(gyms.map((g) => [g.id, g]));
  const filteredGym = filter === "all" ? undefined : gymById.get(filter);
  const tabs = [{ id: "all", name: "All" }, ...gyms];

  const renderDay = (day: DayKey, layout: "column" | "row") => {
    const list = slotsForDay(slots, day, filter);
    if (!list.length) return <OffDay text={offDayText(slots, day, filteredGym)} layout={layout} />;
    return list.map((s) => {
      const gym = gymById.get(s.gym);
      return gym ? (
        <Slot key={`${s.day}-${s.start}-${s.gym}`} slot={s} gym={gym} layout={layout} />
      ) : null;
    });
  };

  const todayLabel = (
    <span className="inline-flex items-center gap-0.75 label-s text-ink">
      <SignalDot />
      Today
    </span>
  );

  return (
    <>
      <Reveal className="mb-4 flex flex-wrap items-end justify-between gap-4 sm:mb-6">
        {header}
        <div
          role="group"
          aria-label="Filter by location"
          // Tabs bleed to the screen edge on mobile so they can scroll sideways. The vertical padding
          // keeps the 2px + 3px focus ring inside the scroller, which would otherwise clip it.
          className="-mx-3 -my-0.75 flex w-[calc(100%+48px)] [scrollbar-width:none] overflow-x-auto px-3 py-0.75 sm:mx-0 sm:w-auto sm:overflow-visible sm:px-0"
        >
          {tabs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={filter === t.id}
              onClick={() => setFilter(t.id)}
              className={cn(
                "flex-none border border-ink bg-paper px-2.5 py-1.25 label text-ink transition-colors duration-200 hover:bg-mist",
                "aria-pressed:bg-ink aria-pressed:text-paper",
                i > 0 && "-ml-px",
              )}
            >
              {t.name}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="hidden grid-cols-7 gap-1 sm:grid">
          {DAYS.map((d) => (
            <div key={d.key} className="flex min-w-0 flex-col gap-1">
              <div className="mb-0.5 flex items-center justify-between gap-0.5 border-b-2 border-ink py-1.5 text-ink">
                <span className="label">{d.short}</span>
                {d.key === today && todayLabel}
              </div>
              {renderDay(d.key, "column")}
            </div>
          ))}
        </div>

        <div className="border-b border-ink sm:hidden">
          {DAYS.map((d) => {
            const count = slotsForDay(slots, d.key, filter).length;
            return (
              <details key={d.key} open={d.key === today} className="group border-t border-ink">
                {/* 18px row padding matches the reference: a 52px tap target. */}
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-2.25 text-ink [&::-webkit-details-marker]:hidden">
                  <span className="label">{d.long}</span>
                  <span className="inline-flex items-center gap-2 text-muted">
                    {d.key === today && todayLabel}
                    <span className="label-s">
                      {count ? `${count} ${count === 1 ? "session" : "sessions"}` : "Rest day"}
                    </span>
                    <Icon
                      name="chevD"
                      size={16}
                      className="transition-transform duration-200 group-open:rotate-180"
                    />
                  </span>
                </summary>
                <div className="grid gap-1 pb-3">{renderDay(d.key, "row")}</div>
              </details>
            );
          })}
        </div>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2 label-s text-muted">
          {gyms.map((g) => (
            <span key={g.id} className="inline-flex items-center gap-1">
              <Swatch tone={g.tone} />
              {g.name}
            </span>
          ))}
          <span className="inline-flex items-center gap-1">
            <Swatch tone="full" />
            Fully booked
          </span>
        </div>

        <div className="mt-8 grid gap-3 sm:mt-12 md:grid-cols-3">
          {gyms
            .filter((g) => filter === "all" || g.id === filter)
            .map((g) => (
              <LocationCard
                key={g.id}
                gym={g}
                placeholder={placeholders[gyms.indexOf(g) % placeholders.length]}
              />
            ))}
        </div>
      </Reveal>
    </>
  );
}
