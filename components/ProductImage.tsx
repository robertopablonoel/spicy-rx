/**
 * Placeholder product visual for Hot Sauce until agency photography arrives.
 *
 * Composes a prescription-pad / pharma-label aesthetic in brand colors —
 * deliberately typographic rather than figurative. Avoids the trap of
 * mocking a fake bottle that looks worse than no image at all.
 *
 * Drop-in replaceable with <Image src="..." /> when real shots ship.
 */
export function ProductImage() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-card">
      {/* Inset burgundy hairline frame */}
      <div className="absolute inset-4 rounded-2xl border border-primary/30" />

      {/* Rx mark — top left */}
      <div className="absolute left-8 top-8 flex items-baseline gap-2">
        <span className="font-serif text-3xl italic text-primary">℞</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
          Sublingual
        </span>
      </div>

      {/* Lot / Code — top right (visual rhythm) */}
      <div className="absolute right-8 top-8 text-right">
        <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          NDC pending
        </p>
        <p className="mt-1 font-mono text-[9px] tracking-wider text-muted-foreground">
          HS · 5 · 10 · 20
        </p>
      </div>

      {/* Center stack — the wordmark */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-primary">
          SpicyRx
        </p>
        <h2
          className="text-6xl font-semibold italic leading-none tracking-tight text-foreground sm:text-7xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Hot Sauce
        </h2>
        <div className="mt-2 h-px w-16 bg-primary/40" />
        <p className="max-w-[80%] text-xs leading-relaxed text-muted-foreground">
          A sublingual prescription medication for the treatment of
          erectile dysfunction.
        </p>
      </div>

      {/* Footer band — bottom */}
      <div className="absolute inset-x-8 bottom-8 flex items-center justify-between">
        <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Rx only
        </p>
        <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Take as directed
        </p>
      </div>
    </div>
  );
}
