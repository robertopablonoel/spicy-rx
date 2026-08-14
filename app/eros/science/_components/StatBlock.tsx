/**
 * Big-number stat used in the 2x2 grid on /eros/science.
 *
 * A theme-agnostic clone of the Passion / Hot Sauce StatBlock: identical
 * structure, driven entirely by CSS custom properties (--ember, --cosmos,
 * --fog…), so it renders lapis/cyan automatically inside the
 * [data-theme="eros"] wrapper. Kept as its own copy to keep the /eros subtree
 * self-contained rather than reaching into another route's private
 * _components.
 */
export interface StatBlockProps {
  big: string;
  unit: string;
  label: string;
  body: string;
}

export function StatBlock({ big, unit, label, body }: StatBlockProps) {
  return (
    <div className="min-h-[220px] bg-cosmos px-7 py-9 md:px-8 md:py-9">
      <div className="flex items-baseline gap-2">
        <span
          className="font-[family-name:var(--font-display)] font-bold text-ember"
          style={{
            fontSize: "clamp(64px, 8vw, 96px)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          {big}
        </span>
        <span className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.12em] text-ember">
          {unit}
        </span>
      </div>
      <div className="mt-3.5 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-fog">
        {label}
      </div>
      <p className="mt-3.5 text-[14px] leading-[1.55] text-mist">{body}</p>
    </div>
  );
}
