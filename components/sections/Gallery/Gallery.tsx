import { Photo } from "@/components/atoms/Photo";
import type { PlaceholderVariant } from "@/components/atoms/PhotoPlaceholder";
import { Reveal } from "@/components/atoms/Reveal";
import type { HomeContent } from "@/types/content";

// Same order as the reference gallery.
const variants: PlaceholderVariant[] = ["a", "b", "c", "b"];

export function Gallery({ items }: { items: HomeContent["gallery"] }) {
  return (
    <div className="bg-charcoal p-1">
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.key}>
            <Photo
              image={item.image}
              imageAlt={item.imageAlt}
              sizes="(min-width: 761px) 25vw, 50vw"
              placeholder={variants[i % variants.length]}
              className="aspect-square"
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
