"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BRAND_NAME } from "@/lib/constants";
import { IntakeLink } from "@/components/eros/IntakeLink";

const LINKS = [
  { href: "/eros/science", label: "The science" },
  { href: "/eros#how-it-works", label: "How it works" },
  { href: "/eros#faq", label: "FAQ" },
];

/**
 * Eros marketing nav — same scroll-aware shell as the other lines, but the
 * wordmark carries an "EROS" line tag, links point at the /eros sections, and
 * the CTA enters the Eros intake channel. No cross-line link (out of scope).
 * Uses the blue Eros drop mark (/brand/logo-mark-eros.svg).
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 transition-all duration-[240ms]"
      style={{
        background: scrolled ? "rgba(7,11,24,0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--ash)"
          : "1px solid transparent",
        transitionTimingFunction: "var(--ease-out)",
      }}
    >
      <div className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-5 py-3.5 md:px-10 md:py-5">
        <Link href="/eros" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo-mark-eros.svg"
            alt=""
            width={26}
            height={31}
            priority
          />
          <span className="flex items-baseline gap-1.5">
            <span className="font-[family-name:var(--font-display)] text-[17px] font-bold tracking-[-0.02em] text-fg">
              {BRAND_NAME.toUpperCase()}
            </span>
            <span className="hidden font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.18em] text-ember sm:inline">
              Eros
            </span>
          </span>
        </Link>

        <div className="hidden gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-mist transition-colors hover:text-ember"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <IntakeLink
          size="sm"
          data-cta-location="nav_primary"
          className="whitespace-nowrap"
        >
          Get started
          <span aria-hidden>→</span>
        </IntakeLink>
      </div>
    </nav>
  );
}
