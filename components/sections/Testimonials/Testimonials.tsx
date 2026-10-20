"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { Reveal } from "@/components/atoms/Reveal";
import { PhotoSection } from "@/components/organisms/PhotoSection";
import { cn } from "@/lib/cn";
import type { Testimonial } from "@/types/schedule";

type TestimonialsProps = { eyebrow: string; imageAlt: string; items: Testimonial[] };

const FADE_MS = 300;
const pad = (n: number) => String(n).padStart(2, "0");

export function Testimonials({ eyebrow, imageAlt, items }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const current = items[index];
  if (!current) return null;

  const go = (step: number) => {
    const next = (index + step + items.length) % items.length;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setIndex(next);
    clearTimeout(timer.current);
    setFading(true);
    timer.current = setTimeout(() => {
      setIndex(next);
      setFading(false);
    }, FADE_MS);
  };

  // Mobile: arrows sit side by side under the counter, 88px either side of center.
  const arrow =
    "absolute grid size-7 place-items-center text-on-dark opacity-80 transition-opacity duration-200 hover:opacity-100 bottom-0 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2";

  return (
    <PhotoSection
      imageAlt={imageAlt}
      placeholder="c"
      strong
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      className="flex min-h-70 items-center text-center sm:min-h-75"
    >
      <div className="shell">
        <Reveal className="relative grid justify-items-center gap-4 pb-9 sm:px-12 sm:pb-0">
          <span className="label text-on-dark">{eyebrow}</span>
          <div aria-live="polite" className="grid justify-items-center gap-4">
            <blockquote
              className={cn(
                "max-w-107.5 text-quote-mobile font-light text-on-dark italic transition-opacity duration-300 sm:text-quote",
                fading && "opacity-0",
              )}
            >
              “{current.quote}”
            </blockquote>
            <cite
              className={cn(
                "label text-on-dark-muted not-italic transition-opacity duration-300",
                fading && "opacity-0",
              )}
            >
              {current.name} — {current.detail}
            </cite>
          </div>
          <span className="label-s text-on-dark-muted">
            {pad(index + 1)} / {pad(items.length)}
          </span>
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className={cn(arrow, "left-[calc(50%-88px)] sm:left-0")}
          >
            <Icon name="chevL" size={32} stroke={1} />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className={cn(arrow, "right-[calc(50%-88px)] sm:right-0")}
          >
            <Icon name="chevR" size={32} stroke={1} />
          </button>
        </Reveal>
      </div>
    </PhotoSection>
  );
}
