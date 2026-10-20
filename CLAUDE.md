# Project: [NAME] — personal trainer website

## Design system (source of truth)

- Read `design-system/README.md` before writing any UI. It holds voice, color, type, spacing, imagery, motion and component rules.
- Tokens: `design-system/tokens.json` is the source of truth, mapped into Tailwind v4 `@theme` in `app/globals.css`. Use the theme classes (`bg-ink`, `text-muted`, `p-3`…); never hard-code hex values or off-grid spacing.
- Reference implementation: `design-system/components/bundle.css` + `bundle.js` (vanilla JS, `window.Trainer`). Open `reference/homepage.html` in a browser to see the target page at any width.
- Data shape for the schedule: `design-system/components/index.d.ts` (`ScheduleData`, `Gym`, `Slot`).

## Non-negotiables

- Monochrome. No accent color except `--signal` as a 6px dot beside TODAY / OPEN NOW.
- Square corners everywhere (`--radius-none`). 1px borders. No shadows, no gradients outside photography.
- Display: Archivo 800, leading 0.9, sentence case ending in a period. H1 96/72/52px, H2 48/36px.
- Body: Open Sans 14–16px. Labels/buttons: 10–11px bold UPPERCASE, 0.12em tracking.
- Buttons: padding 10×30, light variant on dark/photo, graphite variant on light; hover inverts.
- Schedule gyms are told apart by tone (solid / outline / light-gray), never by color. States: Fully booked (hatched, struck-through time) and "Not training today."
- Motion: fade + 16px slide-up on scroll, 700ms; respect prefers-reduced-motion. Nothing bouncy.
- Breakpoints: 1100, 900, 760px. Design widths 1440 and 390.
- Page order: Nav → Hero → Ticker → Where to find me → Statement → Photo band → Contact → Testimonials → About + gallery → Footer.

## Content

- Bracketed values ([NAME], [CITY], [GYM A]…) are placeholders. Keep them in one config/data file.
- Photos are placeholders; testimonials must be real client quotes before launch. Never use platform logos as icons.
