import Link from "next/link";

export function Wordmark({ name }: { name: string }) {
  return (
    <Link href="#top" className="wordmark text-on-dark no-underline">
      {name}
    </Link>
  );
}
