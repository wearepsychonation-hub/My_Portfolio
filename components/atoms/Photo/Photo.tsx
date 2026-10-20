import { PhotoPlaceholder } from "@/components/atoms/PhotoPlaceholder";
import { SanityImage } from "@/components/atoms/SanityImage";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/types/content";

type PhotoProps = {
  image?: SiteImage | null;
  /** Alt text fallback and placeholder caption. */
  imageAlt: string;
  sizes: string;
  placeholder?: "a" | "b" | "c";
  /** Sizing for the frame, e.g. an aspect ratio. */
  className?: string;
};

export function Photo({ image, imageAlt, sizes, placeholder, className }: PhotoProps) {
  if (!image)
    return <PhotoPlaceholder caption={imageAlt} variant={placeholder} className={className} />;
  return (
    <div className={cn("relative overflow-hidden bg-charcoal", className)}>
      <SanityImage image={{ ...image, alt: image.alt || imageAlt }} sizes={sizes} />
    </div>
  );
}
