import { PhotoPlaceholder } from "@/components/atoms/PhotoPlaceholder";
import { Button } from "@/components/molecules/Button";
import { Swatch } from "@/components/molecules/Swatch";
import { TextLink } from "@/components/molecules/TextLink";
import type { Gym } from "@/types/schedule";

type LocationCardProps = { gym: Gym; placeholder?: "a" | "b" | "c" };

export function LocationCard({ gym, placeholder = "a" }: LocationCardProps) {
  return (
    <article className="flex flex-col border border-hairline bg-paper transition-colors duration-200 hover:border-ink">
      <PhotoPlaceholder
        caption={`${gym.name} exterior`}
        variant={placeholder}
        className="aspect-[16/10]"
      />
      <div className="flex flex-1 flex-col gap-1 p-3">
        <span className="inline-flex items-center gap-1 label-s text-muted">
          <Swatch tone={gym.tone} />
          {gym.neighborhood}
        </span>
        <h3 className="text-h3 tracking-snug">{gym.name}</h3>
        <p className="text-body-s text-muted">{gym.address}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <TextLink href={gym.directionsUrl}>Get directions</TextLink>
          <Button href={gym.bookUrl} variant="dark" size="sm">
            Book here
          </Button>
        </div>
      </div>
    </article>
  );
}
