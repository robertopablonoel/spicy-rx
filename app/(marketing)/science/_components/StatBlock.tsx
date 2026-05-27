/**
 * Big-number stat used in the 2x2 grid on /science.
 *
 * Display-weight number with mono unit, mono label, and a short body
 * underneath. The number scale is clamped for mobile because it's the
 * loudest element on the page.
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
