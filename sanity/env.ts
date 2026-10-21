/** Treats blank or whitespace-only values (easy to save by accident in a hosting dashboard) as unset. */
const clean = (value: string | undefined) => value?.trim() || undefined;

const API_VERSION = /^\d{4}-\d{2}-\d{2}$/;
const rawApiVersion = clean(process.env.NEXT_PUBLIC_SANITY_API_VERSION);

// Sanity project IDs are always lowercase; a mistyped capital letter points at a project that doesn't exist.
export const projectId = clean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)?.toLowerCase() ?? "";
export const dataset = clean(process.env.NEXT_PUBLIC_SANITY_DATASET) ?? "production";
// A malformed version makes createClient throw at build time, so fall back rather than fail the deploy.
if (rawApiVersion && !API_VERSION.test(rawApiVersion))
  console.warn(
    `Ignoring invalid NEXT_PUBLIC_SANITY_API_VERSION "${rawApiVersion}"; expected YYYY-MM-DD.`,
  );
export const apiVersion =
  rawApiVersion && API_VERSION.test(rawApiVersion) ? rawApiVersion : "2026-10-01";

/** Without a project ID the site renders seed content and /studio shows a setup notice. */
export const isSanityConfigured = projectId.length > 0;

/** createClient and defineConfig throw on an empty ID; nothing calls the API until configured. */
export const projectIdOrPlaceholder = projectId || "not-configured";
