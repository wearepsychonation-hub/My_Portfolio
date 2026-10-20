export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-10-01";

/** Without a project ID the site renders seed content and /studio shows a setup notice. */
export const isSanityConfigured = projectId.length > 0;

/** createClient and defineConfig throw on an empty ID; nothing calls the API until configured. */
export const projectIdOrPlaceholder = projectId || "not-configured";
