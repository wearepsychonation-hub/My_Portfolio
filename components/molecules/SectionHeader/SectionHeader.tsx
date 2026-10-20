import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  emphasis?: string;
  className?: string;
};

export function SectionHeader({ eyebrow, title, emphasis, className }: SectionHeaderProps) {
  return (
    <div className={cn("max-w-80", className)}>
      <span className="mb-2 block label text-ink">{eyebrow}</span>
      <h2 className="text-h2-mobile sm:text-h2">{title}</h2>
      {emphasis && <p className="mt-2 text-emphasis text-ink italic">{emphasis}</p>}
    </div>
  );
}
