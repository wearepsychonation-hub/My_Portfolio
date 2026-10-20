import { cn } from "@/lib/cn";

const variants = { a: "", b: "ph-b", c: "ph-c" };

type PhotoPlaceholderProps = {
  caption: string;
  variant?: keyof typeof variants;
  className?: string;
};

export function PhotoPlaceholder({ caption, variant = "a", className }: PhotoPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={caption}
      className={cn("relative overflow-hidden ph", variants[variant], className)}
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
