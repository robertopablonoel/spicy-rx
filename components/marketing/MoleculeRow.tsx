import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { INGREDIENTS } from "@/lib/content";

/**
 * 4-up molecule grid. Cells share a 1px ash hairline grid (gap of 1 on an
 * ash background) so the divisions look like a lab schematic rather than
 * floating cards.
 *
 * Responsive: 4 cols → 2 cols at <=1024px → 1 col at <=768px.
 */
export function MoleculeRow() {
  return (
    <section
      id="science"
      className="mx-auto max-w-[var(--container-max)] px-5 py-[72px] md:px-10 md:py-[120px]"
    >
      <div className="mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow className="mb-4">The 4-in-1 breakthrough</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-bold text-fg"
            style={{
              fontSize: "clamp(34px, 5.5vw, 72px)",
              letterSpacing: "-0.035em",
              lineHeight: 1,
            }}
          >
            One solution.
            <br />
            <span className="font-[family-name:var(--font-editorial)] italic font-normal text-ember">
              Four powerful ingredients.
            </span>
          </h2>
        </div>
        <p className="max-w-[360px] text-sm leading-[1.6] text-mist">
          The active ingredients in Viagra, Cialis, and Levitra — engineered
          to onset fast, hit peak strength, and last the whole weekend.
          Plus apomorphine for the half no one else covers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px border border-ash bg-ash sm:grid-cols-2 lg:grid-cols-4">
        {INGREDIENTS.map((ing) => (
          <article key={ing.key} className="bg-cosmos px-6 py-8">
            <p className="font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-ember">
              {ing.slot}
            </p>
            <div className="mt-4 h-20 text-ember">
              <Image
                src={`/brand/molecule-${ing.key}.svg`}
                alt=""
                width={200}
                height={120}
                className="h-full w-auto"
              />
            </div>
            <h3
              className="mt-5 font-[family-name:var(--font-display)] font-semibold text-fg"
              style={{
                fontSize: 26,
                letterSpacing: "-0.025em",
                lineHeight: 1,
              }}
            >
              {ing.role}
            </h3>
            <p className="mt-2 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.12em] text-fog">
              {ing.name}
            </p>
            <p className="mt-[18px] text-[13px] leading-[1.5] text-mist">
              {ing.mechanism}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
