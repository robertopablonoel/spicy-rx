import type { Metadata } from "next";

/**
 * /lab — internal concept gallery for the insert-card QR lander.
 *
 * NOT a customer surface. This subtree exists so Cole can click through
 * rendered lander concepts on a Vercel preview and judge them by looking,
 * rather than by reading a description. It ships on a feature branch only and
 * is `noindex, nofollow` so a stray crawl can never surface it.
 *
 * Deliberately carries NO analytics wiring and NO intake CTAs that could fire
 * real attribution — concept pages here must not pollute live experiment data.
 */
export const metadata: Metadata = {
  title: "Concept Lab",
  robots: { index: false, follow: false },
};

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[var(--bg)]">{children}</div>;
}
