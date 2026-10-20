import { PhotoPlaceholder } from "@/components/atoms/PhotoPlaceholder";
import { Reveal } from "@/components/atoms/Reveal";
import type { HomeContent } from "@/types/content";

const variants = ["a", "b", "c", "b"] as const;

export function Gallery({ items }: { items: HomeContent["gallery"] }) {
  return (
    <div className="bg-charcoal p-1">
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.alt}>
            <PhotoPlaceholder
              caption={item.alt}
              variant={variants[i % variants.length]}
              className="aspect-square"
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
