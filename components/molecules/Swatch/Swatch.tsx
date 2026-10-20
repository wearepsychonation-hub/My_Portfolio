import { cn } from "@/lib/cn";
import type { GymTone } from "@/types/schedule";

const tones: Record<GymTone | "full", string> = {
  solid: "bg-ink border-ink",
  outline: "bg-paper border-ink",
  tint: "bg-mist border-mist",
  full: "bg-paper border-ink swatch-hatch",
};

export function Swatch({ tone }: { tone: GymTone | "full" }) {
  return <span aria-hidden="true" className={cn("size-2 flex-none border", tones[tone])} />;
}
