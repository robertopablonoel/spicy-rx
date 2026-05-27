import { Eyebrow } from "@/components/ui/eyebrow";
import { SCIENCE_STATS } from "@/lib/content";
import { StatBlock } from "./_components/StatBlock";

export const metadata = {
  title: "Science",
  description:
    "Sublingual absorption skips hepatic first-pass. Hot Sauce hits plasma in 10–15 minutes at roughly half the systemic dose of the oral equivalent.",
};

const SOURCING_ITEMS = [
  "USP-grade API from FDA-registered manufacturers.",
  "Compounded in a 503A pharmacy under state board oversight.",
  "Every batch assayed by an independent ISO-17025 lab. COAs on request.",
  "Lot number on every bottle ties back to assay results in your account.",
];

export default function SciencePage() {
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
        Sublingual changes
        <br />
        <span className="font-[family-name:var(--font-editorial)] italic font-normal text-ember">
          everything.
        </span>
      </h1>
      <p className="mt-7 max-w-[720px] text-base leading-[1.5] text-mist md:text-[19px]">
        Oral PDE5 inhibitors pass through the liver before they reach
        circulation. We avoid that. Hot Sauce is absorbed through capillaries
        under the tongue, hitting plasma in 10–15 minutes at roughly half the
        systemic dose of the oral equivalent.
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
          <Eyebrow className="mb-4">Sourcing</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-semibold text-fg"
            style={{
              fontSize: 40,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            503A-compounded. Third-party assayed. Lot-traced.
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
