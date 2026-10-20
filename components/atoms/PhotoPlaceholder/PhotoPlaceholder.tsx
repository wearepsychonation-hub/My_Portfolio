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
      <PhotoCaption caption={caption} className="left-2" />
    </div>
  );
}

/** "Photo · …" tag shown on placeholders; remove alongside them. */
export function PhotoCaption({ caption, className }: { caption: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute bottom-1.5 z-3 label-s text-on-dark-muted",
        className,
      )}
    >
      Photo · {caption}
    </span>
  );
}
