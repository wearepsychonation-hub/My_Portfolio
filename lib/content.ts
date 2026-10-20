import { seed } from "@/content/seed";
import type { SiteContent } from "@/types/content";

/** Single entry point for page data. Sanity takes over here in Phase 4. */
export async function getSiteContent(): Promise<SiteContent> {
  return seed;
}
