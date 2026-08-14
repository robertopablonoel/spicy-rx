import type { Metadata } from "next";
import { Navbar } from "@/components/eros/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { BRAND_NAME, EROS_PRODUCT_NAME, EROS_TAGLINE } from "@/lib/constants";

/**
 * Eros (men's premium line) layout.
 *
 * A real `/eros` path segment with its OWN shell — it deliberately does not
 * inherit the (marketing) route group's Hot-Sauce nav/footer. The single
 * `data-theme="eros"` wrapper is what pivots this whole subtree from capsaicin
 * heat to lapis blue + cyan AND rebinds --font-display to Cormorant Garamond
 * (see the override block in globals.css). The Footer is shared brand-level
 * chrome, reused as-is; it inherits the theme because it renders inside the
 * wrapper. Logo is temporary (/brand/logo-mark.svg) until the real Eros mark.
 *
 * Nests under the root app/layout.tsx, so fonts + Providers (PostHog +
 * attribution capture) apply with no extra wiring; analytics segments
 * naturally by the /eros/* pathname.
 */
export const metadata: Metadata = {
  title: {
    default: `${BRAND_NAME} ${EROS_PRODUCT_NAME} — ${EROS_TAGLINE}`,
    template: `%s · ${BRAND_NAME} ${EROS_PRODUCT_NAME}`,
  },
  description:
    "Eros is a clinician-prescribed, 3-in-1 sublingual elixir — sildenafil, tadalafil and apomorphine — that pairs vascular support for the body with the brain's dopamine pathway. Prescribed online after a US-licensed clinician review; discreet delivery.",
};

export default function ErosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-theme="eros">
      <Navbar />
      <main>{children}</main>
      <Footer logoSrc="/brand/logo-mark.svg" />
    </div>
  );
}
