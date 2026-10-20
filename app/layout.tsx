import type { Metadata } from "next";
import { Archivo, Open_Sans } from "next/font/google";
import { seed } from "@/content/seed";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${seed.brand.name} · Personal training in ${seed.brand.city}`,
  description: "One-to-one and small group personal training. Back to basics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${openSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Flags JS before first paint so reveal styles never flash or hide content without JS. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
