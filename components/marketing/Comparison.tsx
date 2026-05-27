import { Eyebrow } from "@/components/ui/eyebrow";
import { COMPARISON_ROWS } from "@/lib/content";

/**
 * Old pills vs. Hot Sauce — pharma-grade table.
 *
 *   Desktop: 2fr / 1fr / 1fr — label / old way / Hot Sauce.
 *   Mobile:  1.4fr / 1fr     — the "old way" column is hidden via .m-cmp-old.
 *
 * The Hot Sauce column has a warm tint (`rgba(255,59,31,0.06)`), a
 * hot border, and a ✓ glyph in front of each value.
 */
export function Comparison() {
  return (
    <section className="mx-auto max-w-[var(--container-max)] px-5 py-[72px] md:px-10 md:py-[120px]">
      <Eyebrow className="mb-4">The Spicy Alien advantage</Eyebrow>
      <h2
        className="font-[family-name:var(--font-display)] font-bold text-fg"
        style={{
          fontSize: "clamp(34px, 5.5vw, 72px)",
          letterSpacing: "-0.035em",
          lineHeight: 1,
        }}
      >
        Old pills vs.{" "}
        <span className="font-[family-name:var(--font-editorial)] italic font-normal text-ember">
          Hot Sauce.
        </span>
      </h2>
      <p className="mt-3 mb-12 max-w-[580px] text-base leading-[1.5] text-mist md:mb-14 md:text-[17px]">
        See how the 4-in-1 sublingual stacks up against the single-molecule
        pill you&apos;ve been waiting an hour for.
      </p>

      <div className="grid grid-cols-[1.4fr_1fr] border border-ash md:grid-cols-[2fr_1fr_1fr]">
        {/* Header row */}
        <div className="bg-cosmos px-3.5 py-4 md:px-5 md:py-[18px]" />
        <div className="hidden border-b border-l border-ash bg-cosmos px-3.5 py-4 md:block md:px-5 md:py-[18px]">
          <p className="font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.14em] text-fog">
            The old way
          </p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-[18px] font-semibold text-mist">
            Single pill
          </p>
        </div>
        <div
          className="-mr-px px-3.5 py-4 md:px-5 md:py-[18px]"
          style={{
            background: "rgba(255,59,31,0.06)",
            border: "1px solid var(--border-hot)",
          }}
        >
          <p className="font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.14em] text-hot">
            ● Hot Sauce 4-in-1
          </p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-[18px] font-semibold text-fg">
            Sublingual stack
          </p>
        </div>

        {/* Body rows */}
        {COMPARISON_ROWS.map((r) => (
          <Row key={r.label} {...r} />
        ))}
      </div>
    </section>
  );
}

function Row({
  label,
  oldWay,
  hotSauce,
}: {
  label: string;
  oldWay: string;
  hotSauce: string;
}) {
  return (
    <>
      <div className="border-t border-ash bg-cosmos px-3.5 py-4 text-[13px] text-fg md:px-5 md:py-5 md:text-[15px]">
        {label}
      </div>
      <div className="hidden border-t border-l border-ash bg-cosmos px-3.5 py-4 text-[13px] text-fog md:block md:px-5 md:py-5 md:text-[15px]">
        {oldWay}
      </div>
      <div
        className="-mr-px px-3.5 py-4 text-[14px] font-semibold text-fg md:px-5 md:py-5 md:text-[15px]"
        style={{
          background: "rgba(255,59,31,0.06)",
          borderTop: "1px solid var(--border-hot)",
          borderLeft: "1px solid var(--border-hot)",
          borderRight: "1px solid var(--border-hot)",
        }}
      >
        <span
          aria-hidden
          className="mr-2 font-[family-name:var(--font-mono)] text-hot"
        >
          ✓
        </span>
        {hotSauce}
      </div>
    </>
  );
}
