import { Eyebrow } from "@/components/ui/eyebrow";
import { SCIENCE_STATS } from "@/lib/content-eros";
import { StatBlock } from "./_components/StatBlock";

/**
 * Eros (men's line) dedicated science page — the /eros mirror of the Passion /
 * Hot Sauce science pages. Same layout rhythm (eyebrow → oversized headline →
 * intro → 2x2 stat grid → sourcing split), themed lapis blue + cyan by the
 * [data-theme="eros"] wrapper in the layout. The navbar's "The science" link
 * points here.
 *
 * COMPLIANCE: descriptive only — what the three actives ARE, disclosed to the
 * milligram, and how each dose is made. No efficacy/outcome claims; the
 * apomorphine line is framed as dose disclosure ("the top of the clinically
 * studied range"), never superiority. Ships behind the same compliance pass
 * gating the rest of the Eros reskin.
 */
export const metadata = {
  title: "The science",
  description:
    "What's inside Eros: a 3-in-1 sublingual elixir combining sildenafil (70mg) and tadalafil (20mg) for the vascular response with apomorphine (4mg) for the brain's dopamine pathway — 94mg of actives, disclosed to the milligram, compounded from USP-grade ingredients and prescribed per order.",
};

const SOURCING_ITEMS = [
  "USP-grade sildenafil, tadalafil and apomorphine from FDA-registered suppliers.",
  "Compounded in a licensed pharmacy under state board of pharmacy oversight.",
  "Prepared as a single 2mL sublingual liquid — 94mg of actives, disclosed to the milligram.",
  "Prescribed only after a US-licensed clinician reviews your intake; shipped discreetly.",
];

export default function ErosSciencePage() {
  return (
    <section className="mx-auto max-w-[var(--container-max)] px-5 pt-[110px] pb-[72px] md:px-10 md:pt-[140px] md:pb-20">
      <Eyebrow className="mb-5">The science</Eyebrow>
      <h1
        className="font-[family-name:var(--font-display)] font-semibold text-fg"
        style={{
          fontSize: "clamp(44px, 7vw, 96px)",
          letterSpacing: "0.004em",
          lineHeight: 0.95,
        }}
      >
        94mg of actives.
        <br />
        <span className="font-[family-name:var(--font-editorial)] italic font-normal text-ember">
          Nothing hidden.
        </span>
      </h1>
      <p className="mt-7 max-w-[720px] text-base leading-[1.5] text-mist md:text-[19px]">
        Eros combines sildenafil (70mg) and tadalafil (20mg) — 90mg of PDE5
        support for the body&apos;s vascular response — with apomorphine (4mg),
        which engages the brain&apos;s dopamine pathways tied to arousal. Here is
        exactly what&apos;s inside it, disclosed to the milligram, and how each
        dose is made.
      </p>

      {/* 2x2 stat grid */}
      <div className="mt-16 grid grid-cols-1 gap-px border border-ash bg-ash sm:grid-cols-2 md:mt-20">
        {SCIENCE_STATS.map((s) => (
          <StatBlock key={s.label} {...s} />
        ))}
      </div>

      {/* Sourcing split */}
      <div className="mt-20 grid grid-cols-1 items-start gap-8 md:mt-[96px] md:grid-cols-2 md:gap-16">
        <div>
          <Eyebrow className="mb-4">How it&apos;s made</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-semibold text-fg"
            style={{
              fontSize: 40,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Compounded. Three actives. Prescribed for you.
          </h2>
        </div>
        <ul className="m-0 list-none p-0 text-base leading-[1.6] text-mist">
          {SOURCING_ITEMS.map((item) => (
            <li
              key={item}
              className="border-b border-ash py-[18px] last:border-b-0 first:pt-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
