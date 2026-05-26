import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { BRAND_NAME } from "@/lib/constants";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND_NAME} — Sublingual ED treatment, prescribed online`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "Hot Sauce is a sublingual ED medication prescribed online by licensed clinicians. No clinic visits. No insurance hassle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} h-full antialiased`}
    >
      <head>
        {/*
          Superior-title (serif heading face) is shared with the Spicy Cubes
          Shopify theme. Loaded via Adobe Typekit so the brand DNA matches
          across both surfaces.
        */}
        <link rel="stylesheet" href="https://use.typekit.net/eis0tey.css" />
      </head>
      <body className="min-h-full flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
