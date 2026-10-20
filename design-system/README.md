Back to basics. A minimal, monochrome, editorial system for a personal trainer who coaches 1-1 and in small groups across several gyms in [CITY]. Black, white and gray carry everything; heavy type and real photography do the talking.

## Voice

- Confident, personal, no hype. First person ("I train…"), speaking to "you".
- Short, punchy lines in sentence case that end with a period: "Back to basics." "Where to find me." "Let's talk."
- One italic emphasis line per section, set in `emphasis`: *Your body. Your goals. Your lifestyle.* · *Show up. Do the work. Go home stronger.*
- Labels, buttons, tabs and eyebrows are UPPERCASE `label`: START TODAY, BOOK HERE, GET DIRECTIONS.
- Never: exclamation marks, emoji, "transform", "ultimate", countdowns, before/after promises, invented stats.
- Testimonials are real client words only. The sample quotes are placeholders.

## Color

- `ink` for headlines and primary text; `body` for paragraphs; `muted` for addresses and captions.
- Alternate section backgrounds `paper` and `off-white`; dark bands, nav and footer use `charcoal`; the ticker is `ink`.
- On `charcoal` and photos, headlines are `on-dark`, paragraphs `on-dark-muted`.
- Photos always sit under `overlay` (45%) — or `overlay-strong` (55%) behind long text (testimonials, About).
- No accent color. `signal` is allowed for one thing only: the 6px dot beside TODAY / OPEN NOW.

## Type

- Display: Archivo 800 (fallback Helvetica Neue / Arial Bold), leading 0.9, tracking -0.02em. H1 `display-xl` 96px desktop, 72px ≤1100px, `display-m` 52px mobile. H2 `h2` 48px, `h2-mobile` 36px. Cards `h3` 24px.
- Body: Open Sans (fallback Ubuntu) — `text` 16/1.65, `text-s` 14/1.6, `lead` 18 for the manifesto. Italic emphasis in `emphasis`; quotes in `quote` (light italic).
- Labels: `label` 11px and `label-s` 10px, bold, UPPERCASE, 0.12em tracking.

## Space, shape, layout

- 8px base: `space-1` … `space-16`. Sections pad `space-16` (128px) desktop, `space-8` mobile; page gutter `space-8` desktop, `space-3` (24px) mobile; content max 1184px.
- Everything is square: `radius-none`. Borders are 1px — `ink` for controls and outlined slots, `hairline` for card edges. No shadows, no gradients except in photography.
- Breakpoints: 1100px (type steps down, 2-up contact), 900px (hamburger, columns stack), 760px (mobile schedule list, 1-up cards). Design widths: 1440px and 390px.

## Components

- Buttons: `pt-btn--light` on dark/photo, `pt-btn--dark` (`graphite`) on light. 10×30 padding; hover inverts. One primary button per section.
- Focus: a solid 2px `ink` ring, 3px offset; `paper` on dark and photo grounds.
- Schedule: gyms are told apart by tone — solid `ink`, outlined, `mist` fill — never by color; Fully booked is hatched and struck through; an empty day says "Not training today." See the Schedule component for the data shape.
- Page order: Nav → Hero → Ticker → Where to find me → Statement → Photo band → Contact row → Testimonials → About + gallery → Footer.

## Imagery

- Real training photography only, in black and white or desaturated: coaching in action, hands on bars, small groups mid-session. Never stock smiles, never before/after.
- Hero and bands are full-bleed; the gallery is 4-up squares with 8px gaps.
- In these previews, gray `pt-ph` blocks with a PHOTO caption stand in for photos. Replace each with the client's own images.

## Iconography

- Thin line icons on a 24px grid, 1.5px stroke, square caps, `currentColor` (from `Trainer.icon(name)`): pin, phone, chat, mail, camera, menu, close, chevrons, arrow. Chevrons in the carousel use a 1px stroke at 32px.
- Generic glyphs only; no platform logos. No emoji.

## Motion

- Sections fade and slide up 16px as they enter (700ms, ease-out). Hovers are 200ms color swaps. Nothing bounces, scales or loops; `prefers-reduced-motion` turns it all off.

## Using it

- Load `components/bundle.css` and `components/bundle.js`, then `Trainer.mount(el, 'home', data)` for the full page or a part name (`'schedule'`, `'hero'`…) for one section.
- To update the schedule, edit `gyms` and `slots` in the data (see `components/index.d.ts`), not markup.
- No logo mark exists: the wordmark is the name set in Archivo 800, UPPERCASE, 0.16em tracking.
