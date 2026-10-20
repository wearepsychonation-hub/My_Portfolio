# [NAME] Training

Website for a personal trainer who coaches 1-1 and in small groups across several gyms. One page: hero, weekly schedule by gym, approach, contact, testimonials and about.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Sanity Studio 5 (embedded at `/studio`) · pnpm

The site runs fully without Sanity. Until a project is connected, every page renders from the typed seed in `content/seed.ts`.

## Local setup

```bash
nvm use            # Node 22
pnpm install
pnpm dev           # http://localhost:3000
```

| Route            | What                                                         |
| ---------------- | ------------------------------------------------------------ |
| `/`              | The homepage                                                 |
| `/design-system` | Living style guide: tokens, type, buttons, cards, schedule states |
| `/studio`        | Sanity Studio (a setup notice until env vars exist)          |

| Script             | Does                                                            |
| ------------------ | --------------------------------------------------------------- |
| `pnpm dev`         | Dev server                                                      |
| `pnpm build`       | Production build                                                |
| `pnpm lint`        | ESLint                                                          |
| `pnpm typecheck`   | TypeScript, no emit                                             |
| `pnpm format`      | Prettier (with Tailwind class sorting)                          |
| `pnpm typegen`     | Extract the Sanity schema and regenerate `sanity.types.ts`      |
| `pnpm seed:ndjson` | Rebuild `scripts/seed.ndjson` from `content/seed.ts`            |

Run `pnpm typegen` after any schema or GROQ query change, and commit `schema.json` and `sanity.types.ts`.

## How it fits together

- **Design system:** `design-system/` is the source of truth. Read `design-system/README.md` and `CLAUDE.md` before changing UI. Tokens in `design-system/tokens.json` are mapped into Tailwind's `@theme` in `app/globals.css`; Tailwind's default colors, radii and type sizes are cleared so only system values exist.
- **Components:** `components/{atoms,molecules,organisms,sections}`. Server components by default; client components only for the nav toggle, schedule filter, testimonial carousel, scroll reveal and Sanity images.
- **Data:** `lib/content.ts` → `getSiteContent()` is the only way pages get content. With `NEXT_PUBLIC_SANITY_PROJECT_ID` set it runs one GROQ query (`sanity/lib/queries.ts`); otherwise, or until Site settings and Home page are published, it returns the seed.
- **Caching:** content is cached for 60 seconds and refreshed immediately by the `/api/revalidate` webhook.
- **Placeholders:** every bracketed value (`[NAME]`, `[CITY]`, `[GYM A]`…) lives in `content/seed.ts`. Once Sanity is connected, edit them in the Studio instead.

## Connecting Sanity, GitHub and Vercel

Nothing below has been done yet. Each step needs your accounts.

### 1. Create the Sanity project

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) with a `production` dataset.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SANITY_PROJECT_ID`. Leave the dataset as `production`.
3. In the project's **API → CORS origins**, add `http://localhost:3000` with **Allow credentials** on. The embedded Studio needs credentials.
4. Restart `pnpm dev`, open `/studio` and log in.

### 2. Import the seed content

```bash
pnpm exec sanity login
pnpm seed:ndjson
pnpm exec sanity dataset import scripts/seed.ndjson production
```

This creates Site settings, Home page, three gyms, twelve sessions and three placeholder testimonials. Photos aren't included: upload them in the Studio. Every photo needs alt text.

### 3. Push to GitHub

```bash
git remote add origin git@github.com:<you>/<repo>.git
git push -u origin main
```

### 4. Deploy on Vercel

1. Import the GitHub repo in Vercel. Framework preset: Next.js.
2. Add these environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `NEXT_PUBLIC_SANITY_API_VERSION` = `2026-10-01`
   - `SANITY_REVALIDATE_SECRET`: a long random string, used again in step 5
   - `NEXT_PUBLIC_SITE_URL`: the final domain, e.g. `https://example.com`. Vercel's (or Netlify's) production URL is used if it's unset.
   - `SANITY_API_READ_TOKEN`: only if the dataset is private
3. Deploy, then add the production URL (and any custom domain) to Sanity **CORS origins** with credentials on.

### 5. Add the publish webhook

In [sanity.io/manage](https://www.sanity.io/manage) → **API → Webhooks → Create webhook**:

| Setting    | Value                                                                      |
| ---------- | -------------------------------------------------------------------------- |
| URL        | `https://<your-domain>/api/revalidate`                                     |
| Dataset    | `production`                                                               |
| Trigger on | Create, Update, Delete                                                     |
| Filter     | `_type in ["siteSettings", "homePage", "gym", "session", "testimonial"]`   |
| Projection | `{_type}`                                                                  |
| Method     | `POST`                                                                     |
| Secret     | The same value as `SANITY_REVALIDATE_SECRET`                               |

Publish any change in the Studio and reload the site: it should show immediately.

## Before launch

- [ ] Replace every bracketed placeholder (name, city, contact details, gyms, addresses, links)
- [ ] Testimonials are real, attributed client quotes, published with permission
- [ ] Real training photography uploaded for the hero, band, testimonials, about, gallery and each gym, all with alt text. Photos render in grayscale.
- [ ] Prefer darker photos behind the testimonials and About text. The overlay keeps headlines readable, but small light-gray text can lose contrast over very bright areas.
- [ ] Share image and SEO title/description set in Site settings
- [ ] `NEXT_PUBLIC_SITE_URL` set to the final domain
