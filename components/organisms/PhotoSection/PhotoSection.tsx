import type { HTMLAttributes } from "react";
import { PLACEHOLDER_VARIANTS, type PlaceholderVariant } from "@/components/atoms/PhotoPlaceholder";
import { SanityImage } from "@/components/atoms/SanityImage";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/types/content";

type PhotoSectionProps = HTMLAttributes<HTMLElement> & {
  image?: SiteImage | null;
  /** Alt text fallback; also the placeholder caption until a photo is set. */
  imageAlt: string;
  placeholder?: PlaceholderVariant;
  /** overlay-strong, for long text on the photo. */
  strong?: boolean;
  /** For the hero, the page's LCP image. */
  preload?: boolean;
};

/** Full-bleed photo ground under an overlay, with on-dark text and focus rings. */
export function PhotoSection({
  image,
  imageAlt,
  placeholder = "a",
  strong,
  preload,
  className,
  children,
  ...props
}: PhotoSectionProps) {
  return (
    <section
      className={cn(
        "photo-overlay surface-dark",
        image ? "bg-charcoal" : ["ph", PLACEHOLDER_VARIANTS[placeholder]],
        strong && "photo-overlay-strong",
        className,
      )}
      {...props}
    >
      {image && (
        <SanityImage
          image={{ ...image, alt: image.alt || imageAlt }}
          sizes="100vw"
          preload={preload}
          className="-z-2"
        />
      )}
      {children}
    </section>
  );
}
