import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { Stat } from "@/components/ui/stat";
import { Divider } from "@/components/ui/divider";
import { PillBottle } from "@/components/passion/PillBottle";
import { IntakeLink } from "@/components/passion/IntakeLink";
import { HERO_STATS } from "@/lib/content-passion";

/**
 * Passion home hero — same asymmetric 1.2fr/1fr layout as Hot Sauce, but the
 * right column is the PillBottle (tablets) and the copy is Addyi-voiced.
 */
export function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 70% 0%, #1F1A14 0%, #0A0907 70%)",
        minHeight: "92vh",
      }}
    >
      {/* Subtle lab-paper grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><path d='M0 0H40M0 40H40M0 0V40M40 0V40' stroke='rgba(255,255,255,0.04)' /></svg>")`,
        }}
      />

      <div className="relative mx-auto grid min-h-[92vh] max-w-[var(--container-max)] grid-cols-1 items-center gap-9 px-5 pt-[110px] pb-14 md:px-10 md:pt-[140px] md:pb-20 lg:grid-cols-[1.2fr_1fr] lg:gap-[60px]">
        {/* LEFT: copy */}
        <div className="relative">
          <Eyebrow className="mb-5">
            For women · Clinician-prescribed · On-demand
          </Eyebrow>

          <h1
            className="font-[family-name:var(--font-display)] font-bold text-fg"
            style={{
              fontSize: "clamp(44px, 7.5vw, 104px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
            }}
          >
            Desire,
            <br />
            on your{" "}
            <span className="font-[family-name:var(--font-editorial)] italic font-normal text-ember">
              own terms.
            </span>
          </h1>

          <p className="mt-7 max-w-[520px] text-base leading-[1.5] text-mist md:text-[19px]">
            Passion is a clinician-prescribed treatment for low sexual desire —{" "}
            <em className="not-italic font-semibold text-fg">
              taken only when you want it
            </em>
            , not every single day. Three actives that work on desire,
            arousal, and the baseline underneath. Because wanting isn&apos;t a
            flaw — it&apos;s biology.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <IntakeLink size="lg" data-cta-location="hero_primary">
              See if Passion is right for you
              <span aria-hidden>→</span>
            </IntakeLink>
            <ButtonLink
              href="/passion#how-it-works"
              variant="ghost"
              size="lg"
              data-cta-location="hero_secondary"
            >
              How it works
            </ButtonLink>
          </div>

          {/* Stat row */}
          <div className="mt-11 flex flex-wrap items-center gap-x-5 gap-y-4 md:gap-7">
            {HERO_STATS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-5 md:gap-7">
                <Stat label={s.label} value={s.value} />
                {i < HERO_STATS.length - 1 && (
                  <Divider className="hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: pill bottle (client island) */}
        <div className="relative flex items-center justify-center">
          <PillBottle />
        </div>
      </div>
    </section>
  );
}
