import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { CONTENT_TAG } from "@/lib/content";

/** Sanity webhook: any published change refreshes the one query the site makes. */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return new Response("SANITY_REVALIDATE_SECRET is not set", { status: 500 });

  try {
    // `true` waits for the Content Lake so the refetch doesn't read stale CDN data.
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret, true);
    if (!isValidSignature) return new Response("Invalid signature", { status: 401 });

    // expire: 0 makes the next visit fetch fresh, so an editor who publishes and reloads sees it.
    revalidateTag(CONTENT_TAG, { expire: 0 });
    return NextResponse.json({ revalidated: CONTENT_TAG, type: body?._type ?? null });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
}
