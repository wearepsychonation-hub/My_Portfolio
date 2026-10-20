import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /design-system stays crawlable so crawlers can read its noindex.
    rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/api/"] },
    sitemap: new URL("/sitemap.xml", siteUrl).href,
  };
}
