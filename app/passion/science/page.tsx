import { Eyebrow } from "@/components/ui/eyebrow";
import { SCIENCE_STATS } from "@/lib/content-passion";
import { StatBlock } from "./_components/StatBlock";

/**
 * Passion (female line) dedicated science page — the /passion mirror of the Hot
 * Sauce /science page (app/(marketing)/science/page.tsx). Same layout rhythm
 * (eyebrow → oversized headline → intro → 2x2 stat grid → sourcing split),
 * themed plasma pink by the [data-theme="passion"] wrapper in the layout, and
 * voiced for women. The navbar's "What's inside" link points here (it used to
 * scroll to the inline #science section on the home page).
 *
 * COMPLIANCE: descriptive only — what PT-141 IS and how the vial is made, never
 * an efficacy/outcome claim. Ships behind the same compliance pass gating the
 * rest of the Passion reskin.
 */
export const metadata = {
  title: "The science",
  description:
    "What's inside Passion: PT-141 (bremelanotide), a single targeted peptide that works on the brain's desire pathway — compounded in a 503A pharmacy from USP-grade ingredients and dispensed as a ready-to-use vial kit.",
};

const SOURCING_ITEMS = [
  "USP-grade bremelanotide (PT-141) from FDA-registered suppliers.",
  "Compounded in a 503A pharmacy under state board of pharmacy oversight.",
  "Prepared as a sterile, single-active vial — no fillers, no added hormones.",
  "Dispensed with sterile insulin syringes, alcohol swabs, and a first-dose guide.",
];

export default function PassionSciencePage() {
  return (
    <section className="mx-auto max-w-[var(--container-max)] px-5 pt-[110px] pb-[72px] md:px-10 md:pt-[140px] md:pb-20">
      <Eyebrow className="mb-5">The science</Eyebrow>
      <h1
        className="font-[family-name:var(--font-display)] font-bold text-fg"
        style={{
          fontSize: "clamp(44px, 7vw, 96px)",
          letterSpacing: "-0.04em",
          lineHeight: 0.95,
        }}
      >
        Rooted in
        <br />
        <span className="font-[family-name:var(--font-editorial)] italic font-normal text-ember">
          biology.
        </span>
      </h1>
      <p className="mt-7 max-w-[720px] text-base leading-[1.5] text-mist md:text-[19px]">
        Passion delivers PT-141 (bremelanotide) — a targeted peptide that works
        on the brain&apos;s desire pathway, not blood flow — as a small,
        on-demand subcutaneous injection you draw from a vial and give yourself.
        Here is exactly what&apos;s inside it, how it works, and how every vial
        is made.
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
            503A-compounded. Single-active. Prescribed for you.
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
