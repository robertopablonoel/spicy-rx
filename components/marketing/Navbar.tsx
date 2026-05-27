"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BRAND_NAME } from "@/lib/constants";

const LINKS = [
  { href: "/", label: "Hot Sauce" },
  { href: "/science", label: "Science" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
];

/**
 * Fixed marketing nav.
 *
 * Transparent over the hero on first paint; after 24px of scroll it gains
 * a ~78% void backdrop, 14px blur, and a 1px ash hairline. Crossfade is
 * 240ms via the design system's --ease-out.
 *
 * Mobile: per responsive.css the link list and "Sign in" hide; only the
 * logo and the primary CTA remain.
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
        background: scrolled ? "rgba(10,9,7,0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--ash)"
          : "1px solid transparent",
        transitionTimingFunction: "var(--ease-out)",
      }}
    >
      <div className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-5 py-3.5 md:px-10 md:py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo-mark.svg"
            alt=""
            width={26}
            height={31}
            priority
          />
          <span className="font-[family-name:var(--font-display)] text-[17px] font-bold tracking-[-0.02em] text-fg">
            {BRAND_NAME.toUpperCase()}
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

        {/*
          Right-side nav slot intentionally empty. The previous Sign-in
          and Start-consultation CTAs are removed pending the Rimo-hosted
          replacement.
        */}
        <div aria-hidden className="w-[1px]" />
      </div>
    </nav>
  );
}
