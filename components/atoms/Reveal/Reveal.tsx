"use client";

import type { HTMLAttributes } from "react";
import { useReveal } from "@/hooks/useReveal";

export function Reveal(props: HTMLAttributes<HTMLDivElement>) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref} data-reveal="" {...props} />;
}
