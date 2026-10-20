import type { HTMLAttributes } from "react";
import { PhotoCaption } from "@/components/atoms/PhotoPlaceholder";
import { cn } from "@/lib/cn";

type PhotoSectionProps = HTMLAttributes<HTMLElement> & {
  /** Describes the photo; shown as the placeholder caption until real images exist. */
  imageAlt: string;
  placeholder?: "a" | "b" | "c";
  /** overlay-strong, for long text on the photo. */
  strong?: boolean;
};

const placeholders = { a: "", b: "ph-b", c: "ph-c" };

/** Full-bleed photo ground under an overlay, with on-dark text and focus rings. */
export function PhotoSection({
  imageAlt,
  placeholder = "a",
  strong,
  className,
  children,
  ...props
}: PhotoSectionProps) {
  return (
    <section
      className={cn(
        "photo-overlay ph surface-dark",
        placeholders[placeholder],
        strong && "photo-overlay-strong",
        className,
      )}
      {...props}
    >
      {children}
      <PhotoCaption caption={imageAlt} className="right-3 bottom-2" />
    </section>
  );
}
