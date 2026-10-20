import { cn } from "@/lib/cn";
import { TONE_FILL } from "@/lib/schedule";
import type { GymTone } from "@/types/schedule";

const tones: Record<GymTone | "full", string> = {
  ...TONE_FILL,
  full: "border-ink bg-paper swatch-hatch",
};

export function Swatch({ tone }: { tone: GymTone | "full" }) {
  return <span aria-hidden="true" className={cn("size-2 flex-none border", tones[tone])} />;
}
