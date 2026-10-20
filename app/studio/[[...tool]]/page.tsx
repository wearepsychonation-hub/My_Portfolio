import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) return <StudioNotConfigured />;
  return <NextStudio config={config} />;
}

function StudioNotConfigured() {
  return (
    <main className="shell grid min-h-svh content-center justify-items-start gap-3 py-8">
      <span className="label text-ink">Studio</span>
      <h1 className="text-h2-mobile sm:text-h2">Sanity not configured yet.</h1>
      <p className="max-w-80">
        Add <code className="text-body-s">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
        <code className="text-body-s">NEXT_PUBLIC_SANITY_DATASET</code> to{" "}
        <code className="text-body-s">.env.local</code> (see{" "}
        <code className="text-body-s">.env.example</code>), then restart the dev server. Until then
        the site runs on the seed content in <code className="text-body-s">content/seed.ts</code>.
      </p>
    </main>
  );
}
