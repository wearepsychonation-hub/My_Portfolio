"use client";

import Image, { type ImageLoader } from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/types/content";

type SanityImageProps = {
  image: SiteImage;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** Fills its positioned parent. Sanity's CDN does the resizing; the hotspot sets the focal point. */
export function SanityImage({ image, sizes, priority, className }: SanityImageProps) {
  const loader: ImageLoader = ({ width, quality }) =>
    urlFor(image)
      .width(width)
      .quality(quality ?? 75)
      .url();
  const { hotspot, asset } = image;

  return (
    <Image
      loader={loader}
      src={asset._id}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      placeholder={asset.lqip ? "blur" : "empty"}
      blurDataURL={asset.lqip ?? undefined}
      // The system is monochrome; photos render desaturated whatever the upload.
      className={cn("object-cover grayscale", className)}
      style={hotspot ? { objectPosition: `${hotspot.x * 100}% ${hotspot.y * 100}%` } : undefined}
    />
  );
}
