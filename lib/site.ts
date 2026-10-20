const FALLBACK = "http://localhost:3000";

/** NEXT_PUBLIC_SITE_URL first, then the production URL Vercel or Netlify provide. */
function resolveSiteUrl() {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || (vercel ? `https://${vercel}` : "");

  if (raw) {
    try {
      return new URL(/^https?:\/\//.test(raw) ? raw : `https://${raw}`);
    } catch {
      console.warn(`Ignoring invalid site URL "${raw}".`);
    }
  }
  if (process.env.NODE_ENV === "production") {
    console.warn(
      `Set NEXT_PUBLIC_SITE_URL: canonical URLs and the sitemap fall back to ${FALLBACK}.`,
    );
  }
  return new URL(FALLBACK);
}

/** Canonical origin for metadata, sitemap and robots. */
export const siteUrl = resolveSiteUrl();
