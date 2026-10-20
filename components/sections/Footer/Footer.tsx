import { SmartLink } from "@/components/atoms/SmartLink";
import { Wordmark } from "@/components/atoms/Wordmark";
import type { NavLink } from "@/types/content";

type FooterProps = { name: string; city: string; links: NavLink[] };

export function Footer({ name, city, links }: FooterProps) {
  return (
    <footer className="bg-charcoal py-8 surface-dark">
      <div className="shell flex flex-col items-start justify-between gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Wordmark name={name} />
        <nav aria-label="Footer" className="flex gap-3 label">
          {links.map((l) => (
            <SmartLink
              key={l.href}
              href={l.href}
              className="text-on-dark-muted transition-colors duration-200 hover:text-on-dark"
            >
              {l.label}
            </SmartLink>
          ))}
        </nav>
        <p className="text-body-s">
          © {new Date().getFullYear()} {name} · Personal training in {city}
        </p>
      </div>
    </footer>
  );
}
