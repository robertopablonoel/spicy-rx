import type { Metadata } from "next";
import { Navbar } from "@/components/passion/Navbar";
import { Footer } from "@/components/marketing/Footer";
import {
  BRAND_NAME,
  PASSION_PRODUCT_NAME,
  PASSION_TAGLINE,
} from "@/lib/constants";

/**
 * Passion (female line) layout.
 *
 * A real `/passion` path segment with its OWN shell — it deliberately does
 * not inherit the (marketing) route group's Hot-Sauce nav/footer. The single
 * `data-theme="passion"` wrapper is what pivots this whole subtree from
 * capsaicin heat to plasma pink (see the override block in globals.css). The
 * Footer is shared brand-level chrome, reused as-is; it inherits the theme
 * because it renders inside the wrapper.
 *
 * Nests under the root app/layout.tsx, so fonts + Providers (PostHog +
 * attribution capture) apply with no extra wiring; analytics segments
 * naturally by the /passion/* pathname.
 */
export const metadata: Metadata = {
  title: {
    default: `${BRAND_NAME} ${PASSION_PRODUCT_NAME} — ${PASSION_TAGLINE}`,
    template: `%s · ${BRAND_NAME} ${PASSION_PRODUCT_NAME}`,
  },
  description:
    "Passion is a clinician-prescribed, on-demand treatment for low sexual desire in women — PT-141 (bremelanotide), a targeted peptide delivered by a small prefilled injection, used only when you want it. Private online visit, discreet delivery.",
};

export default function PassionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-theme="passion">
      <Navbar />
      <main>{children}</main>
      <Footer logoSrc="/brand/logo-mark-passion.svg" />
    </div>
  );
}
