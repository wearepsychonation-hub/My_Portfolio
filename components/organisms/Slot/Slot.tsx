import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";
import type { Gym, Slot as SlotData } from "@/types/schedule";

const tones = {
  solid: "border-ink bg-ink text-paper",
  outline: "border-ink bg-paper text-ink",
  tint: "border-mist bg-mist text-ink",
};

type SlotProps = {
  slot: SlotData;
  gym: Gym;
  /** "column" in the desktop week grid, "row" in the mobile day list. */
  layout?: "column" | "row";
};

export function Slot({ slot, gym, layout = "column" }: SlotProps) {
  const row = layout === "row";
  const time = `${slot.start}–${slot.end}`;
  const type = slot.full ? `${slot.type} · Fully booked` : slot.type;

  const className = cn(
    "group relative border no-underline transition-colors duration-200",
    tones[gym.tone],
    row
      ? "grid grid-cols-[112px_minmax(0,1fr)] gap-x-2 gap-y-0.5 p-2"
      : "flex min-h-14 flex-col gap-0.5 p-1.5",
    slot.full ? "slot-hatch cursor-not-allowed" : gym.tone === "outline" && "hover:bg-off-white",
  );

  const content = (
    <>
      <span
        className={cn(
          // 16px display numerals: the slot's own scale, between body and h3.
          "font-display text-[16px] leading-[1.1] font-extrabold tracking-snug tabular-nums",
          row && "row-span-2 self-center",
          slot.full && "line-through decoration-2",
        )}
      >
        {time}
      </span>
      {/* 13px (12px at <=1100px) keeps gym names to one line in a 7-column week. */}
      <span className="text-[12px] leading-[1.3] font-semibold lg:text-[13px]">{gym.name}</span>
      <span className={cn("label-s", !row && "mt-auto")}>{type}</span>
    </>
  );

  if (slot.full) return <div className={className}>{content}</div>;

  return (
    <a
      href={gym.bookUrl}
      className={className}
      aria-label={`Book ${slot.type} at ${gym.name}, ${time}`}
    >
      {content}
      <Icon
        name="arrow"
        size={14}
        className={cn(
          "absolute transition-opacity duration-200",
          row
            ? "top-1/2 right-2 -translate-y-1/2"
            : "right-1.25 bottom-1.25 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
        )}
      />
    </a>
  );
}

export function OffDay({ text, layout = "column" }: { text: string; layout?: "column" | "row" }) {
  return (
    <div
      className={cn(
        "flex items-center border border-dashed border-muted p-2 text-body-s leading-[1.4] text-muted italic",
        layout === "row" ? "justify-start" : "min-h-14 justify-center text-center",
      )}
    >
      {text}
    </div>
  );
}
