import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/types/content";

type SanityImageProps = {
  image: SiteImage;
  sizes: string;
  /** For the LCP image only. */
  preload?: boolean;
  className?: string;
};

/** Fills its positioned parent. The loader file sizes it on Sanity's CDN; the hotspot sets the focal point. */
export function SanityImage({ image, sizes, preload, className }: SanityImageProps) {
  const { hotspot, asset } = image;

  return (
    <Image
      src={urlFor(image).url()}
      alt={image.alt}
      fill
      sizes={sizes}
      preload={preload}
      placeholder={asset.lqip ? "blur" : "empty"}
      blurDataURL={asset.lqip ?? undefined}
      // The system is monochrome; photos render desaturated whatever the upload.
      className={cn("object-cover grayscale", className)}
      style={hotspot ? { objectPosition: `${hotspot.x * 100}% ${hotspot.y * 100}%` } : undefined}
    />
  );
}
