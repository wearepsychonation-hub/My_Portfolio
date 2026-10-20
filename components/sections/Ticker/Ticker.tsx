import { Icon } from "@/components/atoms/Icon";

export function Ticker({ text }: { text: string }) {
  return (
    <div className="bg-ink surface-dark text-on-dark">
      <div className="shell flex h-5.5 items-center justify-center gap-1.5">
        <Icon name="pin" size={14} />
        <span className="label">{text}</span>
      </div>
    </div>
  );
}
