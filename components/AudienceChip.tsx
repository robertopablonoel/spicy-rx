"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const KEY = "spicyrx_audience"; // "men" | "women" | "dismissed"
const SCROLL_KEY = "spicyrx_aud_scroll";

/**
 * Self-select audience chip (TEST surface).
 *
 * A non-blocking prompt that lets a visitor pick which product line is theirs.
 * Switching is a SEAMLESS client-side navigation (no full reload) that carries
 * the scroll position across, so you land at the equivalent spot on the other
 * line (the two landings share section order + heights). The choice is saved
 * to localStorage so it won't nag on return.
 *
 * MANUAL fallback only — automatic attribution routing (campaign UTM → cookie
 * → Spicy Cubes CRM hand-off) is deferred to a later commit.
 *
 * Theme-aware: `--hot` resolves to capsaicin on Hot Sauce and plasma-pink
 * inside the /passion [data-theme] subtree, so it matches whichever side it's
 * rendered on.
 */
export function AudienceChip({ current }: { current: "men" | "women" }) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  // Restore scroll position after a cross-line switch (runs every mount,
  // even when the chip UI itself is hidden).
  useEffect(() => {
    let y: string | null = null;
    try {
      y = sessionStorage.getItem(SCROLL_KEY);
    } catch {}
    if (y != null) {
      try {
        sessionStorage.removeItem(SCROLL_KEY);
      } catch {}
      const top = parseInt(y, 10) || 0;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => window.scrollTo({ top, behavior: "auto" })),
      );
    }
  }, []);

  // Decide whether to surface the chip (only if no prior choice).
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {}
    if (saved) return;
    const t = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  const choose = (aud: "men" | "women") => {
    try {
      localStorage.setItem(KEY, aud);
    } catch {}
    setShow(false);
    if (aud !== current) {
      try {
        sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
      } catch {}
      // Seamless SPA nav; scroll:false so we can restore position ourselves.
      router.push(aud === "women" ? "/passion" : "/", { scroll: false });
    }
  };

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, "dismissed");
    } catch {}
    setShow(false);
  };

  const base =
    "rounded-pill px-4 py-1.5 font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.1em] transition-all [transition-timing-function:var(--ease-out)] active:scale-[0.97]";
  // Cross-line target gets the high-contrast filled treatment to draw the eye.
  const solid = `${base} bg-hot text-void border border-hot hover:brightness-[1.06]`;
  const ghost = `${base} bg-transparent text-fg border border-smoke hover:border-mist`;

  return (
    <div
      role="dialog"
      aria-label="Choose product line"
      className="sa-chip fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4"
    >
      <div
        className="flex items-center gap-3 rounded-[6px] px-5 py-3.5 backdrop-blur-md"
        style={{
          background: "rgba(16,13,11,0.97)",
          boxShadow:
            "0 0 0 1px var(--border-hot), 0 10px 30px rgba(0,0,0,0.55), var(--sh-heat)",
        }}
      >
        <span className="hidden font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-mist sm:inline">
          Who&apos;s this for?
        </span>
        <button
          type="button"
          onClick={() => choose("women")}
          aria-current={current === "women"}
          className={current === "women" ? ghost : solid}
        >
          {current === "women" ? "Women" : "Women →"}
        </button>
        <button
          type="button"
          onClick={() => choose("men")}
          aria-current={current === "men"}
          className={current === "men" ? ghost : solid}
        >
          {current === "men" ? "Men" : "Men →"}
        </button>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="ml-0.5 px-1 text-[16px] leading-none text-fog transition-colors hover:text-fg"
        >
          ×
        </button>
      </div>
    </div>
  );
}
