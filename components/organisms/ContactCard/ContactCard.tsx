import { Icon } from "@/components/atoms/Icon";
import { Button } from "@/components/molecules/Button";
import type { ContactCard as ContactCardData } from "@/types/content";

export function ContactCard({ icon, title, text, ctaLabel, href }: ContactCardData) {
  return (
    <article className="flex flex-col items-start gap-2 border border-hairline bg-paper p-4 transition-colors duration-200 hover:border-ink sm:min-h-35">
      <Icon name={icon} size={28} className="mb-1 text-ink" />
      {/* 20px rather than h3's 24px: four cards share a row, as in the reference. */}
      <h3 className="text-[20px] leading-[1.05] tracking-snug">{title}</h3>
      <p className="text-body-s">{text}</p>
      <Button href={href} variant="dark" size="sm" className="mt-1 sm:mt-auto">
        {ctaLabel}
      </Button>
    </article>
  );
}
