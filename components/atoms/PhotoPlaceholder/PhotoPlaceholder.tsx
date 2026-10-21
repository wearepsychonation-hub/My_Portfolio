import { cn } from "@/lib/cn";

/** Three gray placeholder grounds, so neighbouring photo slots don't look identical. */
export const PLACEHOLDER_VARIANTS = { a: "", b: "ph-b", c: "ph-c" } as const;
export type PlaceholderVariant = keyof typeof PLACEHOLDER_VARIANTS;

const order = Object.keys(PLACEHOLDER_VARIANTS) as PlaceholderVariant[];
export const placeholderAt = (index: number) => order[index % order.length]!;

type PhotoPlaceholderProps = {
  caption: string;
  variant?: PlaceholderVariant;
  className?: string;
};

export function PhotoPlaceholder({ caption, variant = "a", className }: PhotoPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={caption}
      className={cn("relative overflow-hidden ph", PLACEHOLDER_VARIANTS[variant], className)}
    >
      <PhotoCaption />
    </div>
  );
}

/** "Coming soon" tag shown on placeholders; remove alongside them. */
export function PhotoCaption({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-3 flex items-center justify-center text-label font-bold tracking-label text-on-dark-muted uppercase sm:text-[13px]",
        className,
      )}
    >
      Coming soon
    </span>
  );
}
