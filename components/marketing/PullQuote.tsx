import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Full-bleed capsaicin gradient band — used ONCE per page, max.
 *
 * The brand-statement anchor between HowItWorks and the FAQ. Compliance
 * pass 2026-06-05: no potency/outcome language ("hospital-grade power",
 * "the power of four meds") pre-LegitScript.
 */
export function PullQuote() {
  return (
    <section
      className="relative overflow-hidden px-5 py-[72px] md:px-10 md:py-[120px]"
      style={{ background: "var(--grad-capsaicin)" }}
    >
      <div className="mx-auto max-w-[1080px]">
        <Eyebrow
          className="mb-6"
          style={{ color: "rgba(10,9,7,0.7)" }}
        >
          Clinician-prescribed. Direct to your door.
        </Eyebrow>
        <blockquote
          className="font-[family-name:var(--font-display)] font-bold text-void"
          style={{
            fontSize: "clamp(34px, 6vw, 84px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.98,
          }}
        >
          Four actives.
          <br />
          <span className="font-[family-name:var(--font-editorial)] italic font-normal">
            One sublingual drop.
          </span>
          <br />
          No clinic. No pharmacy line.
        </blockquote>
      </div>
    </section>
  );
}
