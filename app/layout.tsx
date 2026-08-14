import type { Metadata } from "next";
import {
  Space_Grotesk,
  Manrope,
  Instrument_Serif,
  JetBrains_Mono,
  Cormorant_Garamond,
} from "next/font/google";
import Script from "next/script";
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
// Classical display serif — used only across the /eros subtree, where
// [data-theme="eros"] rebinds --font-display to --font-classical.
const classical = Cormorant_Garamond({
  variable: "--font-classical",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
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
      className={`${display.variable} ${body.variable} ${editorial.variable} ${mono.variable} ${classical.variable}`}
    >
      <body>
        {/* Google tag (gtag.js) — Google Ads AW-18275822466 (SpicyRx serving
            account, 6885243915). Base tag so PMAX gets site signals + the
            Conversion Linker persists gclid with cross-domain linking across
            spicyrx.com <-> my.spicyrx.com. Ad personalization OFF (ED/health
            compliance). Spec: gads-mcc-access (fleet #396/#397). */}
        <Script
          id="gtag-src"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18275822466"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18275822466', {
  allow_ad_personalization_signals: false,
  linker: { domains: ['spicyrx.com','my.spicyrx.com'], accept_incoming: true }
});`}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
