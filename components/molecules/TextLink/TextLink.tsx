import { SmartLink, type SmartLinkProps } from "@/components/atoms/SmartLink";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";

export function TextLink({ className, children, ...props }: SmartLinkProps) {
  return (
    <SmartLink
      className={cn(
        "group inline-flex items-center gap-0.75 border-b border-current pb-0.25 label text-ink no-underline",
        className,
      )}
      {...props}
    >
      {children}
      <Icon
        name="arrow"
        size={12}
        stroke={2}
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </SmartLink>
  );
}
