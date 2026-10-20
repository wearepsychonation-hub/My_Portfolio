import type { Metadata, Viewport } from "next";
import { Archivo, Open_Sans } from "next/font/google";
import { siteUrl } from "@/lib/site";
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

export const metadata: Metadata = { metadataBase: siteUrl };

// Charcoal, matching the sticky nav, so mobile browser chrome blends into it.
export const viewport: Viewport = { themeColor: "#1c1c1c" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${openSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
