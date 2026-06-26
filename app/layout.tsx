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
import { GoogleAds } from "@/components/analytics/GoogleAds";

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
    default: `${BRAND_NAME} — Clinician-prescribed. Compounded in the USA.`,
    template: `%s · ${BRAND_NAME}`,
  },
  description:
    "Hot Sauce is a clinician-prescribed 4-in-1 sublingual, compounded in the USA and shipped discreetly. A US-licensed clinician reviews every intake — no clinic visit required.",
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
        <GoogleAds />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
