import { Eyebrow } from "@/components/ui/eyebrow";
import { HOW_IT_WORKS_STEPS } from "@/lib/content-passion";

/**
 * Three flat crater cards — identical layout to Hot Sauce's HowItWorks, with
 * the warmer, woman-to-woman step copy from content-passion.
 */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-[var(--container-max)] px-5 py-[72px] md:px-10 md:py-[120px]"
    >
      <Eyebrow className="mb-4">How it works</Eyebrow>
      <h2
        className="max-w-[760px] font-[family-name:var(--font-display)] font-bold text-fg"
        style={{
          fontSize: "clamp(34px, 5.5vw, 72px)",
          letterSpacing: "-0.035em",
          lineHeight: 1,
        }}
      >
        Three steps.{" "}
        <span className="font-[family-name:var(--font-editorial)] italic font-normal text-ember">
          No appointment, no shame.
        </span>
      </h2>

      <div className="mt-14 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
        {HOW_IT_WORKS_STEPS.map((s) => (
          <article
            key={s.n}
            className="relative border border-ash bg-crater p-7"
          >
            <p className="font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-ember">
              STEP {s.n}
            </p>
            <h3
              className="mt-3.5 mb-3 font-[family-name:var(--font-display)] font-semibold text-fg"
              style={{
                fontSize: 28,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
              }}
            >
              {s.title}
            </h3>
            <p className="text-[14px] leading-[1.55] text-mist">{s.body}</p>
            <p className="absolute bottom-5 right-6 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-fog">
              {s.meta}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
