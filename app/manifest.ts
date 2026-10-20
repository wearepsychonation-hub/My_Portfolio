import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { brand, seo } = await getSiteContent();
  return {
    name: seo.title,
    short_name: brand.name,
    description: seo.description,
    start_url: "/",
    display: "browser",
    // Hex values are the paper and charcoal tokens.
    background_color: "#ffffff",
    theme_color: "#1c1c1c",
    icons: [
      { src: "/icon.png", sizes: "128x128", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
