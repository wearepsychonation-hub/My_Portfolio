import Link from "next/link";
import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  "label inline-flex items-center justify-center gap-1 border px-3.75 py-1.25 whitespace-nowrap no-underline transition-colors duration-200 aria-disabled:pointer-events-none aria-disabled:border-mist aria-disabled:bg-mist aria-disabled:text-muted",
  {
    variants: {
      variant: {
        light: "border-paper bg-paper text-ink hover:bg-ink hover:text-paper",
        dark: "border-graphite bg-graphite text-paper hover:bg-paper hover:text-graphite",
      },
      size: {
        md: "",
        sm: "text-label-s px-2.5 py-1",
      },
    },
    defaultVariants: { variant: "dark", size: "md" },
  },
);

type ButtonProps = ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
