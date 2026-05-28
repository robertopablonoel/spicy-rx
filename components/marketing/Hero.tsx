import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { Stat } from "@/components/ui/stat";
import { Divider } from "@/components/ui/divider";
import { DropperBottle } from "@/components/marketing/DropperBottle";
import { HERO_STATS } from "@/lib/content";
import { RIMO_INTAKE_URL } from "@/lib/constants";

/**
 * Asymmetric home hero — 1.2fr / 1fr on desktop, stacks to a single column
 * on mobile. The DropperBottle (client island) sits in the right column on
 * desktop and below the copy on mobile.
 *
 * Headline follows the canonical triplet → editorial pattern.
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
            USA-made · Clinician-prescribed · 4-in-1
          </Eyebrow>

          <h1
            className="font-[family-name:var(--font-display)] font-bold text-fg"
            style={{
              fontSize: "clamp(44px, 7.5vw, 104px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
            }}
          >
            Faster onset.
            <br />
            Peak strength.
            <br />
            36-hour window.
            <br />
            <span className="font-[family-name:var(--font-editorial)] italic font-normal text-ember">
              Plus desire.
            </span>
          </h1>

          <p className="mt-7 max-w-[520px] text-base leading-[1.5] text-mist md:text-[19px]">
            Hot Sauce is a 4-in-1 sublingual that stacks the active
            ingredients in Viagra, Cialis, and Levitra —{" "}
            <em className="not-italic font-semibold text-fg">
              plus apomorphine
            </em>{" "}
            to ignite desire. Hits in 15 minutes. Goes the whole weekend.
            Clinician-prescribed, shipped discreetly.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink
              href={RIMO_INTAKE_URL}
              size="lg"
              data-cta-location="hero_primary"
            >
              See if you qualify
              <span aria-hidden>→</span>
            </ButtonLink>
            <ButtonLink
              href="/#how-it-works"
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

        {/* RIGHT: dropper bottle (client island) */}
        <div className="relative flex items-center justify-center">
          <DropperBottle />
        </div>
      </div>
    </section>
  );
}
