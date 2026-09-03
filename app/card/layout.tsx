import type { Metadata } from "next";

/**
 * /card — the insert-card QR destination.
 *
 * Deliberately bare: no Navbar, no Footer, no cross-links. A scanned insert is
 * a single-purpose funnel, and every piece of chrome is another way out of it.
 *
 * `noindex` on purpose. This page exists for people holding a physical card —
 * it is not a search destination, its offer is framed as card-holders-only, and
 * keeping Rx marketing markup out of the crawlable surface avoids the Google
 * Ads "prescription drug" disapproval that took the halo placement down before.
 */
export const metadata: Metadata = {
  title: "Your card",
  robots: { index: false, follow: false },
};

export default function CardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[var(--bg)]">{children}</div>;
}
