# Launch checklist

Everything still needed to take the site live. Work top to bottom: section 1 is for the meeting with the trainer, the rest is setup. Detailed setup steps live in [README.md](README.md#connecting-sanity-github-and-vercel).

## 1. Collect from the trainer (meeting)

### Identity and contact

- [ ] Name as it should appear in the wordmark, footer and "Hi, I'm …" (replaces `[NAME]`)
- [ ] City (replaces `[CITY]`)
- [ ] Phone number, as it should be read on the site
- [ ] WhatsApp number, **with country code** (needed for the `wa.me` link)
- [ ] Email address (replaces `hello@[domain].com`)
- [ ] Instagram handle (replaces `@[handle]`)
- [ ] Where should every **Book** button go: a booking tool (Calendly, Mindbody, etc.) or just the Contact section?

### Gyms (up to three)

For each gym:

- [ ] Name (`[GYM A]`, `[GYM B]`, `[GYM C]`)
- [ ] Neighborhood
- [ ] Street address
- [ ] Google Maps link for **Get directions**
- [ ] Booking link for **Book here** (same as above, or a gym-specific one)
- [ ] Display order (which gym comes first in the tabs)

Each gym gets one tone in the schedule: solid black, outline or light gray. Nothing to ask, just assign them.

### Weekly schedule

For every recurring session:

- [ ] Day
- [ ] Start and end time
- [ ] Gym
- [ ] 1-1 or Group
- [ ] Currently fully booked? (yes/no)

### About and bio

- [ ] Years coaching (replaces `[X]`)
- [ ] Review the bio paragraphs: are the story and tone right? Anything to cut or add?
- [ ] Qualifications and certifications (replaces `[Qualifications and certifications.]`)
- [ ] Happy with the headlines? "Back to basics.", "Strong is built, not bought.", "Small groups. Full attention.", "Let's talk."
- [ ] Any fixed labels they'd reword? These live in code, not the Studio, so changes come to you:
  - **Book**, **Get directions**, **Book here**
  - **Today**, **Fully booked**, "Not training today.", "Rest day"
  - Footer: "Personal training in {city}"

### Testimonials

- [ ] Three or more **real** client quotes (the current ones are placeholders and must not launch)
- [ ] Each client's name as they want it shown, plus how they train (e.g. "1-1 client", "Small group")
- [ ] Written permission from each client to publish their words and name

### Photos

Real training photography, black and white or easy to desaturate. The site renders every photo in grayscale. No stock and no before/after photos.

- [ ] Hero: action shot on the gym floor, landscape, at least 2400px wide
- [ ] Photo band: a small group mid-session, landscape
- [ ] Testimonials background: dark, low-key portrait. Darker photos keep the small text readable.
- [ ] About background: coach portrait, also on the darker side
- [ ] Gallery: four photos that crop to squares (e.g. coaching a squat, kettlebell detail, group warm-up, chalk and bar)
- [ ] One exterior photo per gym
- [ ] Share image for social and messaging previews, 1200×630 (optional; the hero is used if missing)
- [ ] Consent from anyone identifiable in the photos

### Accounts, billing and access

- [ ] Do they already own a domain? Which one, and with which registrar? Can they give us access?
- [ ] Agree who owns and pays for what. Recommended: everything in the trainer's name, with you added as developer.
  - **Domain:** the trainer's registrar account
  - **Vercel Pro:** about $20/month, on the trainer's card. The free Hobby plan doesn't allow commercial sites, and a page that advertises paid sessions counts.
  - **Sanity:** a project in the trainer's organization (free tier should cover it)
  - **GitHub repo:** yours for now, transferable later
- [ ] Who will edit content in the Studio? Get the email address of everyone who needs a login.
- [ ] Is the kettlebell favicon OK?
- [ ] Do they want analytics (e.g. Vercel Analytics or Plausible)? Do they need a privacy policy page?

## 2. Set up accounts

- [ ] Domain: confirm access or buy it in the trainer's account
- [ ] Sanity: create the project with a `production` dataset (in the trainer's organization), and invite yourself and the editors
- [ ] GitHub: create the repo, then `git remote add origin …` and `git push -u origin main`
- [ ] Vercel: create a Pro team on the trainer's card, with you as the member, and import the GitHub repo

## 3. Hook everything up

- [ ] Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SANITY_PROJECT_ID`
- [ ] Sanity CORS origins (API → CORS), each with **Allow credentials** on:
  - [ ] `http://localhost:3000`
  - [ ] The Vercel production URL
  - [ ] The custom domain
- [ ] Import the seed: `pnpm exec sanity login`, `pnpm seed:ndjson`, `pnpm exec sanity dataset import scripts/seed.ndjson production`
- [ ] Open `/studio` locally, log in, and confirm the content loads
- [ ] Vercel environment variables:
  - [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_SANITY_DATASET` = `production`
  - [ ] `NEXT_PUBLIC_SANITY_API_VERSION` = `2026-10-01`
  - [ ] `SANITY_REVALIDATE_SECRET`: a long random string
  - [ ] `NEXT_PUBLIC_SITE_URL`: the final domain, e.g. `https://example.com`
  - [ ] `SANITY_API_READ_TOKEN`: only if the dataset is private
- [ ] Deploy and check the production site loads Sanity content (not the seed)
- [ ] Sanity webhook (API → Webhooks), with the settings in the README:
  - URL: `https://<domain>/api/revalidate`
  - Filter: `_type in ["siteSettings", "homePage", "gym", "session", "testimonial"]`
  - Projection: `{_type}`
  - Secret: the same value as `SANITY_REVALIDATE_SECRET`
- [ ] Test the webhook: publish a small change in the Studio and reload the live site
- [ ] Domain: add it in Vercel, then point DNS at Vercel at the registrar
- [ ] Confirm HTTPS works on the bare domain and on `www`, and that one redirects to the other

## 4. Enter content in the Studio

- [ ] **Site settings:** name, city, booking link, phone, WhatsApp, email, Instagram, nav links ("Show in footer" per link), SEO title and description, share image
- [ ] **Home page:** check every tab (Hero, Schedule, Statement, Photo band, Contact, Testimonials, About, Gallery) and upload each photo with alt text
  - Keep `{name}` and `{city}` in the copy (hero eyebrow, ticker, About headline, bio, SEO title). The site fills them from Site settings, so a name or city change only needs editing there.
  - The bio also says "three gyms": update it if the number of gyms changes.
- [ ] **Schedule → Gyms:** the three gyms, with tone, order, links and exterior photos
- [ ] **Schedule → sessions:** every session, entered under its day
- [ ] **Testimonials:** the real quotes, then pick and order them on Home page → Testimonials
- [ ] Clear every warning shown in the Studio (headline periods, lengths, missing alt text)
- [ ] Publish everything

## 5. Check before launch

- [ ] No placeholders left on the live page: search it for `[` and look for `[NAME]`, `[CITY]`, `[GYM`, `[CLIENT`, `[X]`
- [ ] On a real phone:
  - [ ] Menu opens and closes
  - [ ] Schedule filter works
  - [ ] Today's day is open in the schedule
  - [ ] Carousel works
- [ ] Every link works:
  - [ ] Call opens the dialer
  - [ ] WhatsApp opens a chat
  - [ ] Email opens a new message
  - [ ] Instagram opens the profile
  - [ ] Each gym's directions and booking links
  - [ ] All Book buttons
- [ ] Schedule matches what the trainer actually runs, including fully booked sessions
- [ ] Photos look right in grayscale, and the testimonial and About text stays readable over them
- [ ] Share preview looks right (paste the URL into WhatsApp or iMessage)
- [ ] The [Rich Results Test](https://search.google.com/test/rich-results) passes for the business structured data
- [ ] Lighthouse on mobile: check performance, accessibility and SEO scores
- [ ] Favicon looks right in light and dark browser themes (it's hard to see on dark tab bars at 16px; add a white tile if needed)
- [ ] `/design-system` is fine to leave live (it's noindex), or remove it

## 6. After launch

- [ ] Add the site to Google Search Console and submit `/sitemap.xml`
- [ ] Set up or update the trainer's Google Business Profile with the website link
- [ ] Add the site link to the Instagram bio
- [ ] Walk the trainer through editing the schedule in the Studio (the most frequent change)
- [ ] Hand over ownership if it's still in your name: transfer the repo and make the trainer owner on Vercel and Sanity
