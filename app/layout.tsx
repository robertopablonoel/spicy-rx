import type { Metadata } from "next";
import {
  Space_Grotesk,
  Manrope,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { BRAND_NAME } from "@/lib/constants";
import { Providers } from "./providers";

/**
 * Type stack — matches the SpicyRx Design System.
 *
 *   Display     Space Grotesk     cosmic, modern, mechanical
 *   Body        Manrope           clean grotesk, legible at any size
 *   Editorial   Instrument Serif  pharma-editorial italic flourish
 *   Mono        JetBrains Mono    lab readouts, ingredients, dosing
 *
 * Each next/font Google call writes a CSS variable on <html>; globals.css
 * exposes the same variable to Tailwind via @theme inline.
 */
const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const editorial = Instrument_Serif({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND_NAME} — Faster onset. Peak strength. 36-hour window.`,
    template: `%s · ${BRAND_NAME}`,
  },
  description:
    "Hot Sauce is a 4-in-1 sublingual that stacks the active ingredients in Viagra, Cialis, and Levitra — plus apomorphine to ignite desire. Hits in 15 minutes. Goes the whole weekend. Clinician-prescribed, shipped discreetly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${editorial.variable} ${mono.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
