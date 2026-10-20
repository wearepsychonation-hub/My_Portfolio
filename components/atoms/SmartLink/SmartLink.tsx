import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

export type SmartLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** next/link for internal routes; a plain anchor for hashes, tel:, mailto: and external URLs. */
export function SmartLink({ href, ...props }: SmartLinkProps) {
  const isRoute = href.startsWith("/") && !href.startsWith("//");
  if (isRoute) return <Link href={href} {...props} />;
  return <a href={href} {...props} />;
}
