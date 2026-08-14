import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { Stat } from "@/components/ui/stat";
import { Divider } from "@/components/ui/divider";
import { DropperBottle } from "@/components/eros/DropperBottle";
import { IntakeLink } from "@/components/eros/IntakeLink";
import { HERO_STATS } from "@/lib/content-eros";

/**
 * Eros home hero — same asymmetric 1.2fr/1fr layout as the other lines, but the
 * right column is the lapis DropperBottle island and the copy is the classical,
 * elevated Eros voice from mockups/eros-main.html. Headline in the classical
 * serif (Cormorant, via [data-theme="eros"] rebinding --font-display) with an
 * Instrument Serif italic accent on "first".
 */
export function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 72% 0%, #12245E 0%, #070B18 66%)",
        minHeight: "min(92vh, 820px)",
      }}
    >
      {/* Subtle lab-paper grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44'><path d='M0 0H44M0 44H44M0 0V44M44 0V44' stroke='rgba(120,150,220,0.05)' /></svg>")`,
        }}
      />

      <div className="relative mx-auto grid min-h-[min(92vh,820px)] max-w-[var(--container-max)] grid-cols-1 items-center gap-6 px-5 pt-[92px] pb-10 md:gap-9 md:px-10 md:pt-[132px] md:pb-20 lg:grid-cols-[1.2fr_1fr] lg:gap-[60px]">
        {/* LEFT: copy */}
        <div className="relative min-w-0">
          <Eyebrow className="mb-5">
            Body + Brain · 3-in-1 elixir
          </Eyebrow>

          <h1
            className="font-[family-name:var(--font-display)] font-semibold text-fg"
            style={{
              fontSize: "clamp(46px, 5.4vw, 84px)",
              letterSpacing: "0.004em",
              lineHeight: 1,
            }}
          >
            Reignite your{" "}
            <span className="font-[family-name:var(--font-editorial)] italic font-normal">
              fire.
            </span>
          </h1>

          <p className="mt-7 max-w-[42ch] text-base leading-[1.5] text-mist md:text-[19px]">
            Every ED pill you&apos;ve tried worked on the body. Eros also wakes
            the brain — the{" "}
            <em className="not-italic font-semibold text-fg">desire</em> a
            plumbing-only pill was never built to touch.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <IntakeLink size="lg" data-cta-location="hero_primary">
              See if Eros is right for you
              <span aria-hidden>→</span>
            </IntakeLink>
            <ButtonLink
              href="/eros#science"
              variant="ghost"
              size="lg"
              data-cta-location="hero_secondary"
            >
              What&apos;s inside
            </ButtonLink>
          </div>

          {/* Stat row */}
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4 md:gap-7">
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

        {/* RIGHT: lapis dropper bottle (client island) */}
        <div className="relative flex min-w-0 items-center justify-center">
          <DropperBottle />
        </div>
      </div>
    </section>
  );
}
