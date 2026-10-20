"use client";

import type { ImageLoaderProps } from "next/image";

/** Every next/image src here is a Sanity CDN URL (crop already applied); the CDN does the resizing. */
export default function sanityImageLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  return url.href;
}
