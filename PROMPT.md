Paste this as your first message to Claude (Claude Code, or a chat with this folder attached):

---

Build the production website for a personal trainer using the design system in this folder.

1. Read CLAUDE.md, then design-system/README.md, tokens.json and components/index.d.ts. Open reference/homepage.html as the visual target.
2. Stack: [e.g. Next.js + TypeScript + CSS Modules / Astro / plain HTML]. Import design-system/tokens.css globally; do not invent new tokens.
3. Rebuild each section from the reference as a real component: Nav, Hero, Ticker, Schedule ("Where to find me"), Statement, PhotoBand, ContactRow, Testimonial, About, Gallery, Footer.
4. Schedule: drive it from a typed data file matching ScheduleData (3 gyms, ~12 slots). Location filter tabs, 7-column week on desktop, day-by-day accordion on mobile with today open, Fully booked and Not-training-today states.
5. Put all placeholder content ([NAME], [CITY], gyms, contact details) in one content/config file.
6. Match the reference at 1440px and 390px. Check keyboard focus, contrast and prefers-reduced-motion.

Start by proposing the file structure, then build section by section.
