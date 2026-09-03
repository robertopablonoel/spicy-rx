import Link from "next/link";

/**
 * Shared furniture for the concept pages.
 *
 * These are intentionally lightweight local primitives rather than the shipped
 * components/ui/* set: concepts need to diverge fast and must never inherit a
 * real IntakeLink (which would fire live attribution). Anything that proves out
 * here gets rebuilt on the real primitives before it leaves /lab.
 */

/** A CTA that LOOKS like the real one but goes nowhere. Concepts must not
 *  hand off to Rimo — a live handoff would pollute the running experiments. */
export function DeadCTA({
  children,
  tone = "primary",
}: {
  children: React.ReactNode;
  tone?: "primary" | "ghost";
}) {
  const base =
    "inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-center font-semibold transition-transform active:scale-[0.98]";
  return (
    <span
      role="button"
      aria-disabled
      className={
        tone === "primary"
          ? `${base} bg-[var(--hot)] text-[var(--bone)]`
          : `${base} border border-[var(--border)] text-[var(--fg)]`
      }
      style={
        tone === "primary" ? { boxShadow: "var(--sh-heat)" } : undefined
      }
    >
      {children}
    </span>
  );
}

/** The compliance-safe process stepper, lifted in shape from the post-purchase
 *  quiz. "Clinician review" — never "approval": payment triggers the review. */
export function Stepper() {
  const steps = [
    ["1", "Online visit", "~5 min, private"],
    ["2", "Clinician review", "US-licensed"],
    ["3", "Discreet delivery", "to your door"],
  ];
  return (
    <div className="grid grid-cols-3 gap-3">
      {steps.map(([n, title, meta]) => (
        <div key={n}>
          <div className="font-[family-name:var(--font-mono)] text-xs text-[var(--ember)]">
            {n}
          </div>
          <div className="mt-2 text-sm font-semibold text-[var(--fg)]">
            {title}
          </div>
          <div className="mt-1 text-xs text-[var(--fg-dim)]">{meta}</div>
        </div>
      ))}
    </div>
  );
}

export function Credentials() {
  return (
    <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--fg-dim)]">
      US-licensed clinicians · Licensed pharmacy · LegitScript-certified
    </p>
  );
}

/** Rx fair-balance. "if prescribed" qualifies every offer mention. */
export function Disclaimer() {
  return (
    <p className="text-[11px] leading-[1.5] text-[var(--fg-faint)]">
      Rx only. A US-licensed clinician reviews your health answers and, if
      appropriate, issues a prescription. Not for use with nitrates. Side
      effects may include headache, flushing, and dyspepsia.
    </p>
  );
}

/**
 * The symmetric, non-blocking line switch — the wiki's own answer to the ~46%
 * of men's-product leads who are women. It depends on no inference, so it
 * always works, and it never gates the page.
 */
export function LineSwitch({ current }: { current: "eros" | "passion" }) {
  const other = current === "eros" ? "passion" : "eros";
  const label =
    current === "eros" ? "Looking for the women's line →" : "Looking for the men's line →";
  return (
    <p className="text-center text-sm">
      <span className="text-[var(--fg-dim)] underline underline-offset-4">
        {label}
      </span>
      <span className="sr-only">({other})</span>
    </p>
  );
}

/** Concept chrome: a fixed bar identifying which concept you're looking at. */
export function ConceptBar({ id, name }: { id: string; name: string }) {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)]/95 px-4 py-2 backdrop-blur">
      <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--fg-dim)]">
        Concept {id} · {name}
      </span>
      <Link
        href="/lab"
        className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--ember)]"
      >
        ← all
      </Link>
    </div>
  );
}

/** Phone-width canvas. This audience is ~98% mobile camera scans, so every
 *  concept is designed at phone width and merely centered on desktop. */
export function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[480px] px-5 pb-24 pt-8">
      {children}
    </div>
  );
}
