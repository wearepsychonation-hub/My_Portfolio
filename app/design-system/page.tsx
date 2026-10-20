import type { Metadata } from "next";
import tokens from "@/design-system/tokens.json";
import { Icon, iconNames } from "@/components/atoms/Icon";
import { PhotoPlaceholder } from "@/components/atoms/PhotoPlaceholder";
import { SignalDot } from "@/components/atoms/SignalDot";
import { Button } from "@/components/molecules/Button";
import { TextLink } from "@/components/molecules/TextLink";
import { Swatch } from "@/components/molecules/Swatch";
import { ContactCard } from "@/components/organisms/ContactCard";
import { LocationCard } from "@/components/organisms/LocationCard";
import { OffDay, Slot } from "@/components/organisms/Slot";
import { seed } from "@/content/seed";
import { cn } from "@/lib/cn";
import type { Slot as SlotData } from "@/types/schedule";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

// Token name → the classes that render it. text tokens map to `base` (see globals.css).
const typeClasses: Record<string, string> = {
  "display-xl": "display-heading text-display-xl",
  "display-m": "display-heading text-display-m",
  h2: "display-heading text-h2",
  "h2-mobile": "display-heading text-h2-mobile",
  h3: "display-heading text-h3 tracking-snug",
  wordmark: "wordmark",
  lead: "text-lead",
  text: "text-base",
  "text-s": "text-body-s",
  emphasis: "text-emphasis italic text-ink",
  quote: "text-quote font-light italic",
  label: "label",
  "label-s": "label-s",
};

type TypeStyle = { name: string; fontSize: string; lineHeight: number; fontWeight: number; sample: string; usage: string };

const darkSwatches = new Set(["ink", "charcoal", "graphite", "body", "muted", "signal"]);

const { gyms } = seed;
const sample: SlotData = { day: "mon", start: "06:00", end: "07:00", gym: "a", type: "1-1" };

export default function DesignSystemPage() {
  const typeStyles: TypeStyle[] = tokens.type.groups.flatMap((g): TypeStyle[] => g.styles);

  return (
    <main className="pb-16">
      <header className="surface-dark bg-charcoal py-8">
        <div className="shell">
          <span className="label mb-2 block text-on-dark">Design system</span>
          <h1 className="display-heading text-display-m text-on-dark sm:text-h2">{tokens.name}.</h1>
          <p className="mt-2 max-w-80 text-on-dark-muted">
            Rendered from design-system/tokens.json and the real components. Change a token there,
            then mirror it in app/globals.css.
          </p>
        </div>
      </header>

      <Section title="Color.">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tokens.color.tokens.map((c) => (
            <article key={c.name} className="border border-hairline">
              <div
                className={cn("h-12 border-b border-hairline", darkSwatches.has(c.name) && "border-transparent")}
                style={{ background: c.value }}
              />
              <div className="grid gap-1 p-3">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="display-heading text-h3 tracking-snug">{c.name}</h3>
                  <code className="text-body-s text-muted">{c.value}</code>
                </div>
                <code className="label-s text-ink">
                  bg-{c.name} · text-{c.name} · border-{c.name}
                </code>
                <p className="text-body-s text-muted">{c.usage}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Type." tone="off">
        <div className="grid gap-6">
          {typeStyles.map((t) => (
            <div key={t.name} className="grid gap-1 border-t border-hairline pt-3 md:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] md:gap-6">
              <div className="grid content-start gap-0.5">
                <span className="label text-ink">{t.name}</span>
                <span className="text-body-s text-muted">
                  {t.fontSize} / {t.lineHeight} · {t.fontWeight}
                </span>
                <code className="label-s text-muted">{typeClasses[t.name]}</code>
              </div>
              <div>
                <p className={cn("break-words text-ink", typeClasses[t.name])}>{t.sample}</p>
                <p className="mt-1 text-body-s text-muted">{t.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Space.">
        <p className="mb-6 max-w-80 text-muted">{tokens.spacing.note} One Tailwind step is 8px.</p>
        <div className="grid gap-2">
          {tokens.spacing.tokens.map((s) => {
            const step = parseInt(s.value) / 8;
            return (
              <div key={s.name} className="grid grid-cols-[96px_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[160px_96px_minmax(0,1fr)]">
                <span className="label text-ink">{s.name}</span>
                <code className="hidden text-body-s text-muted sm:block">
                  {s.value} · p-{step}
                </code>
                <div className="flex items-center gap-2">
                  <span className="h-2 flex-none bg-ink" style={{ width: s.value }} />
                  <span className="hidden text-body-s text-muted md:block">{s.usage}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Buttons." tone="off">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="grid content-start justify-items-start gap-3 border border-hairline bg-paper p-4">
            <span className="label text-muted">Dark (graphite) on light</span>
            <div className="flex flex-wrap items-center gap-2">
              <Button href="#" variant="dark">Book a free consult</Button>
              <Button href="#" variant="dark" className="bg-paper text-graphite">Hover</Button>
              <Button href="#" variant="dark" size="sm">Book here</Button>
              <Button href="#" variant="dark" aria-disabled="true" tabIndex={-1}>Disabled</Button>
            </div>
            <TextLink href="#">Get directions</TextLink>
          </div>
          <div className="surface-dark grid content-start gap-3 bg-charcoal p-4">
            <span className="label text-on-dark-muted">Light on dark and photo</span>
            <div className="flex flex-wrap items-center gap-2">
              <Button href="#" variant="light">Start today</Button>
              <Button href="#" variant="light" className="bg-ink text-paper">Hover</Button>
              <Button href="#" variant="light" size="sm">Book</Button>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Cards.">
        <p className="mb-6 max-w-80 text-muted">
          Hairline border on paper; the border turns ink on hover.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {seed.home.contact.cards.map(({ key, ...c }) => (
            <ContactCard key={key} {...c} brand={seed.brand} />
          ))}
        </div>
      </Section>

      <Section title="Schedule." tone="off">
        <p className="mb-6 max-w-80 text-muted">
          Gyms are told apart by tone, never by color. Bookable slots are links; Fully booked is
          hatched with the time struck through.
        </p>
        <h3 className="label mb-2 text-ink">Week grid</h3>
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-5">
          {gyms.map((g) => (
            <Slot key={g.id} gym={g} slot={{ ...sample, gym: g.id }} />
          ))}
          <Slot gym={gyms[0]!} slot={{ ...sample, full: true }} />
          <OffDay text="Not training today." />
        </div>
        <h3 className="label mt-6 mb-2 text-ink">Mobile day list</h3>
        <div className="grid max-w-80 gap-1">
          {gyms.map((g) => (
            <Slot key={g.id} gym={g} slot={{ ...sample, gym: g.id }} layout="row" />
          ))}
          <Slot gym={gyms[2]!} slot={{ ...sample, full: true }} layout="row" />
          <OffDay text={`Not at ${gyms[1]!.name} today.`} layout="row" />
        </div>
        <div className="label-s mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-muted">
          {gyms.map((g) => (
            <span key={g.id} className="inline-flex items-center gap-1">
              <Swatch tone={g.tone} />
              {g.name} · {g.tone}
            </span>
          ))}
          <span className="inline-flex items-center gap-1">
            <Swatch tone="full" />
            Fully booked
          </span>
          <span className="inline-flex items-center gap-0.75 text-ink">
            <SignalDot />
            Today
          </span>
        </div>
        <h3 className="label mt-6 mb-2 text-ink">Location card</h3>
        <div className="max-w-50">
          <LocationCard gym={gyms[0]!} />
        </div>
      </Section>

      <Section title="Icons and signal.">
        <div className="flex flex-wrap gap-3">
          {iconNames.map((name) => (
            <figure key={name} className="grid w-12 justify-items-center gap-1 border border-hairline py-2 text-ink">
              <Icon name={name} />
              <figcaption className="label-s text-muted">{name}</figcaption>
            </figure>
          ))}
        </div>
        <p className="label-s mt-6 inline-flex items-center gap-0.75 text-ink">
          <SignalDot />
          Today
        </p>
      </Section>

      <Section title="Photography." tone="off">
        <p className="mb-6 max-w-80 text-muted">
          Placeholders until real black and white training photos exist. Photos sit under overlay
          (45%), or overlay-strong (55%) behind long text.
        </p>
        <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
          <PhotoPlaceholder caption="Variant a" className="aspect-square" />
          <PhotoPlaceholder caption="Variant b" variant="b" className="aspect-square" />
          <PhotoPlaceholder caption="Variant c" variant="c" className="aspect-square" />
          <div className="surface-dark photo-overlay ph ph-b flex aspect-square items-end p-2">
            <span className="label text-on-dark">With overlay</span>
          </div>
        </div>
      </Section>
    </main>
  );
}

function Section({ title, tone = "paper", children }: { title: string; tone?: "paper" | "off"; children: React.ReactNode }) {
  return (
    <section className={cn("py-8 md:py-12", tone === "off" ? "bg-off-white" : "bg-paper")}>
      <div className="shell">
        <h2 className="mb-6 text-h2-mobile sm:text-h2">{title}</h2>
        {children}
      </div>
    </section>
  );
}
