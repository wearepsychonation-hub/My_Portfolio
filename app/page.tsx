import { Button } from "@/components/molecules/Button";

export default function HomePage() {
  return (
    <main className="shell grid min-h-svh content-center justify-items-start gap-4">
      <h1 className="text-display-m sm:text-display-l lg:text-display-xl">Back to basics.</h1>
      <p className="text-emphasis text-ink italic">Homepage sections arrive in Phase 2.</p>
      <Button href="/design-system">View the design system</Button>
    </main>
  );
}
