import { SmartLink } from "@/components/atoms/SmartLink";

export function Wordmark({ name }: { name: string }) {
  return (
    <SmartLink href="#top" className="-my-1 py-1 wordmark text-on-dark no-underline">
      {name}
    </SmartLink>
  );
}
