"use client";

import { SmartLink } from "@/components/atoms/SmartLink";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { Wordmark } from "@/components/atoms/Wordmark";
import { Button } from "@/components/molecules/Button";
import type { NavLink } from "@/types/content";

type NavProps = { name: string; links: NavLink[]; bookUrl: string };

export function Nav({ name, links, bookUrl }: NavProps) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-charcoal surface-dark text-on-dark">
      <div className="shell flex h-8 items-center justify-between">
        <Wordmark name={name} />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-4">
            {links.map((l) => (
              <li key={l.key}>
                <SmartLink
                  href={l.href}
                  className="label text-on-dark-muted transition-colors duration-200 hover:text-on-dark"
                >
                  {l.label}
                </SmartLink>
              </li>
            ))}
            <li>
              <Button href={bookUrl} variant="light" size="sm">
                Book
              </Button>
            </li>
          </ul>
        </nav>
        <button
          ref={toggle}
          type="button"
          // 10px padding around the 24px icon: a 44px touch target.
          className="-mr-1.25 p-1.25 text-on-dark md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-graphite md:hidden"
      >
        <ul className="shell pt-2 pb-3">
          {links.map((l) => (
            <li key={l.key}>
              <SmartLink
                href={l.href}
                onClick={close}
                className="block border-b border-graphite py-1.5 label text-on-dark"
              >
                {l.label}
              </SmartLink>
            </li>
          ))}
          <li className="pt-3">
            <Button href={bookUrl} variant="light" size="sm" onClick={close}>
              Book
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
