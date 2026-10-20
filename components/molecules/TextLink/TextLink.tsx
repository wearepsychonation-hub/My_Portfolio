import Link from "next/link";
import type { ComponentProps } from "react";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";

export function TextLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
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
        className="group-hover:translate-x-0.375 transition-transform duration-200"
      />
    </Link>
  );
}
