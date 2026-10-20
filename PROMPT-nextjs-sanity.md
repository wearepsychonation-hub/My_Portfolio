Build a personal-trainer website as a Next.js + Sanity + React app, deployable to Vercel later. Work locally only for now: there is no GitHub repo, Vercel project or Sanity project yet.

## Read first

1. CLAUDE.md (design rules, non-negotiable)
2. design-system/README.md, tokens.json, tokens.css, components/index.d.ts
3. reference/homepage.html (the visual target; open it at 1440px and 390px). Treat components/bundle.js and bundle.css as the reference implementation to port, not code to ship.

## Stack

- Next.js (latest stable, App Router), TypeScript strict, React Server Components by default, client components only where needed (nav toggle, schedule filter, carousel, scroll reveal).
- Styling: Tailwind CSS v4 (CSS-first config, no tailwind.config.js). In `app/globals.css`, `@import "tailwindcss";` then map every token from design-system/tokens.json into `@theme`, replacing Tailwind's defaults so off-system values aren't available:
  - colors: `--color-*: initial;` then `--color-ink`, `--color-charcoal`, `--color-graphite`, `--color-body`, `--color-muted`, `--color-paper`, `--color-off-white`, `--color-mist`, `--color-hairline`, `--color-on-dark`, `--color-on-dark-muted`, `--color-signal`, plus `--color-overlay` and `--color-overlay-strong` (→ `bg-ink`, `text-muted`, `border-hairline`, `bg-overlay`…).
  - spacing: `--spacing: 8px` so the 8px base drives `p-1`, `gap-3`, `py-16` (= 8, 24, 128px). Allow `0.5` for 4px.
  - radius: `--radius-*: initial;` — everything is square; only `rounded-full` for the signal dot.
  - fonts: `--font-display` and `--font-body` from next/font variables.
  - type: `--text-display-xl: 96px` (with `--text-display-xl--line-height: 0.9`), `display-m` 52px, `h2` 48px, `h2-mobile` 36px, `h3` 24px, `lead` 18px, `body` 16px, `body-s` 14px, `quote` 32px, `label` 11px, `label-s` 10px, each with its line height from tokens.json; `--tracking-label: 0.12em`, `--tracking-tight: -0.02em`.
  - breakpoints: replace the defaults so they match the system: `--breakpoint-*: initial;` then `--breakpoint-sm: 761px`, `--breakpoint-md: 901px`, `--breakpoint-lg: 1101px`, `--breakpoint-xl: 1440px`. Write mobile-first.
  - Add a few `@utility` classes for patterns that repeat: `label` (11px bold uppercase tracking-label), `label-s`, `display-heading` (font-display 800, leading 0.9, tracking-tight), `photo-overlay`, `slot-hatch` (the Fully booked diagonal stripes).
- Button variants with a small `cva` (class-variance-authority) + `tailwind-merge` helper (`cn`). No UI kit (no shadcn defaults, no rounded corners, no shadows). Arbitrary values (`[13px]`, `[#123]`) only with a comment explaining why; never new colors.
- Keep design-system/tokens.json as the source of truth: if a token changes, update `@theme` to match.
- Fonts: next/font/google for Archivo (700, 800) and Open Sans (300, 400, 600, 700, italics), wired to --font-display and --font-body.
- CMS: Sanity v3 with next-sanity, Studio embedded at /studio, GROQ queries, @sanity/image-url, next/image.
- Package manager: pnpm. ESLint + Prettier.

## Local-first rule (important)

- The app must run with `pnpm dev` and build with `pnpm build` with NO Sanity credentials.
- Data layer `lib/content.ts`: if NEXT_PUBLIC_SANITY_PROJECT_ID is set, fetch from Sanity; otherwise return typed seed data from `content/seed.ts` (same shape). Components never know the difference.
- /studio shows a short "Sanity not configured yet" notice until env vars exist.
- Do not run `sanity init`, `sanity login`, `vercel`, or anything that creates remote resources or needs an account. Do not push to git. Do `git init` and commit locally at the end of each phase.
- Add `.env.example` with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET=production, NEXT_PUBLIC_SANITY_API_VERSION, SANITY_API_READ_TOKEN, SANITY_REVALIDATE_SECRET.

## Sanity schemas (in `sanity/schemas`)

- siteSettings (singleton): trainer name, city, phone, WhatsApp, email, Instagram handle, booking URL, nav links, SEO defaults.
- homePage (singleton): hero (eyebrow, headline, italic line, CTA label, image), ticker text, statement (headline, paragraphs, italic line, CTA), photoBand (headline, italic line, CTA, image), testimonials (references), about (headline, italic opener, portable-text bio, image), gallery (4 images), contact section copy.
- gym: name, neighborhood, address, tone (solid | outline | tint, unique, max 3), directions URL, booking URL, image, order.
- session: day (mon–sun), start, end (HH:mm), gym (reference), type (1-1 | Group), fullyBooked (boolean). Validate end after start.
- testimonial: quote, client name, detail (e.g. "1-1 client").
- Desk structure with the two singletons pinned at the top. Types in `types/` match components/index.d.ts (ScheduleData, Gym, Slot).
- Write `content/seed.ts` from the sample data in bundle.js, plus `scripts/seed.ndjson` so I can run `sanity dataset import` later.

## Pages and components

- `/`: Nav, Hero, Ticker, Schedule ("Where to find me"), Statement, PhotoBand, ContactRow, Testimonials, About + Gallery, Footer, in that order, matching the reference at 1440px and 390px.
- Schedule: location filter tabs (ALL + each gym, active = solid black, aria-pressed); 7-column week on desktop with legend; day-by-day accordion on mobile (≤760px) with today open and a TODAY label; Fully booked and "Not training today." states; location cards below (filtered too). Compute "today" on the client to avoid hydration mismatch.
- `/design-system`: a living style guide that renders color tokens (with their Tailwind class names), type scale, spacing, buttons (both variants + hover), cards, schedule blocks and all states, from the real components and tokens.json.
- Shared: Button (light | dark, sm), TextLink, Icon (line icons from bundle.js; no platform logos), SectionHeader, a useReveal hook (IntersectionObserver fade + 16px slide-up, off under prefers-reduced-motion), and image placeholders until real photos exist.

## Vercel-ready (configure, don't deploy)

- ISR: revalidate homepage data (e.g. 60s) plus `/api/revalidate` route that checks SANITY_REVALIDATE_SECRET for a Sanity webhook.
- Metadata API for SEO and Open Graph, sitemap.ts, robots.ts.
- README.md with: local setup, then step-by-step for later — create Sanity project and add env vars, import seed.ndjson, push to GitHub, import to Vercel, add env vars, add the Sanity webhook and CORS origin.

## Quality bar

- `pnpm lint`, `pnpm typecheck` and `pnpm build` pass with no Sanity env vars.
- Keyboard focus visible (2px ring, paper on dark), text contrast per README, semantic landmarks, alt text fields required in Sanity.
- No layout shift from fonts or images.

## How to work

Propose the folder structure and a phased plan first and wait for my OK. Then build in phases, stopping for review after each:

1. Scaffold, Tailwind @theme from tokens, fonts, layout, Button/Icon, /design-system page
2. Homepage sections with seed data
3. Schedule component
4. Sanity schemas, Studio, data layer, seed files
5. Revalidation, SEO, README, final checks
