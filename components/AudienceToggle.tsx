import Link from "next/link";

/**
 * Persistent audience switch in the header — always visible on BOTH mobile and
 * desktop, so a visitor can cross between the men's (Hot Sauce) and women's
 * (Passion) lines at any moment. This is now the PRIMARY cross-line control; it
 * replaces the desktop-only "For men/For women" nav link (the one-shot
 * AudienceChip stays as a first-visit nudge only).
 *
 * Two responsive presentations of the same choice:
 *   - Desktop (md+): a segmented "Women | Men" control; the current side is
 *     filled (you-are-here), the other is a clear tap target.
 *   - Mobile (<md): a single compact cross-link to the OTHER line ("For women →"),
 *     because the mobile bar (logo + CTA) has little room for a full segment.
 *
 * Theme-aware: --hot resolves to capsaicin on Hot Sauce and plasma-pink inside
 * the /passion [data-theme] subtree, so it matches whichever side it renders on.
 * Plain <Link>s → client-side nav, no reload.
 */
export function AudienceToggle({ current }: { current: "men" | "women" }) {
  const women = { href: "/passion", label: "Women" };
  const men = { href: "/", label: "Men" };
  const other = current === "men" ? women : men;

  const seg =
    "rounded-pill px-3 py-1 font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
  const active = `${seg} bg-hot text-void`;
  const idle = `${seg} text-mist hover:text-fg`;

  return (
    <>
      {/* Desktop: always-visible segmented toggle */}
      <div
        role="group"
        aria-label="Choose product line"
        className="hidden items-center rounded-pill border border-ash bg-[rgba(10,9,7,0.4)] p-[3px] md:inline-flex"
      >
        <Link
          href={women.href}
          aria-current={current === "women" ? "page" : undefined}
          className={current === "women" ? active : idle}
        >
          {women.label}
        </Link>
        <Link
          href={men.href}
          aria-current={current === "men" ? "page" : undefined}
          className={current === "men" ? active : idle}
        >
          {men.label}
        </Link>
      </div>

      {/* Mobile: compact cross-link to the other line. Uppercase mono, so the
          label reads e.g. "WOMEN →" — short enough to leave room for the CTA. */}
      <Link
        href={other.href}
        aria-label={`Switch to the ${other.label.toLowerCase()}'s line`}
        className="inline-flex items-center gap-1 whitespace-nowrap rounded-pill border border-smoke px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.08em] text-fg transition-colors hover:border-mist md:hidden"
      >
        {other.label}
        <span aria-hidden>→</span>
      </Link>
    </>
  );
}
