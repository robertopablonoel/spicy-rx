import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { INGREDIENTS } from "@/lib/content-passion";

/**
 * 3-up grid for Passion — same lab-schematic hairline grid as Hot Sauce's
 * MoleculeRow. PT-141 is a SINGLE active, so the three cards are FACETS of the
 * one molecule (pathway / timing / design), not three ingredients. Molecule art
 * renders only on the card that carries a `mol` path; the others are text-only.
 *
 * Responsive: 3 cols → 1 col at <=768px (the 3-up grid doesn't halve cleanly).
 */
export function IngredientRow() {
  return (
    <section
      id="science"
      className="mx-auto max-w-[var(--container-max)] px-5 py-[72px] md:px-10 md:py-[120px]"
    >
      <div className="mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow className="mb-4">What&apos;s inside</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-bold text-fg"
            style={{
              fontSize: "clamp(34px, 5.5vw, 72px)",
              letterSpacing: "-0.035em",
              lineHeight: 1,
            }}
          >
            One molecule.
            <br />
            <span className="font-[family-name:var(--font-editorial)] italic font-normal text-ember">
              One pathway.
            </span>
          </h2>
        </div>
        <p className="max-w-[360px] text-sm leading-[1.6] text-mist">
          Most treatments chase the physical response. Passion goes upstream —
          PT-141 works on the brain&apos;s desire pathway itself, on-demand and
          non-hormonal, in a single dose you use only when you want it.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px border border-ash bg-ash md:grid-cols-3">
        {INGREDIENTS.map((ing) => (
          <article key={ing.key} className="bg-cosmos px-5 py-6 md:px-6 md:py-8">
            <p className="font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-ember">
              {ing.slot}
            </p>
            <div className="mt-3 h-16 md:mt-4 md:h-20">
              {ing.mol ? (
                <Image
                  src={ing.mol}
                  alt=""
                  width={200}
                  height={120}
                  className="h-full w-auto"
                />
              ) : (
                <span
                  aria-hidden
                  className="flex h-full items-center font-[family-name:var(--font-display)] text-[52px] font-bold leading-none text-ember/25 md:text-[64px]"
                >
                  {ing.slot === "The timing" ? "45″" : "1×"}
                </span>
              )}
            </div>
            <h3
              className="mt-4 font-[family-name:var(--font-display)] font-semibold text-fg md:mt-5"
              style={{
                fontSize: 24,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
              }}
            >
              {ing.role}
            </h3>
            <p className="mt-2 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.12em] text-fog">
              {ing.name}
            </p>
            <p className="mt-4 text-[13px] leading-[1.5] text-mist">
              {ing.mechanism}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
