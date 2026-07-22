import { Eyebrow } from "@/components/ui/eyebrow";
import { IntakeLink } from "@/components/passion/IntakeLink";
import { PRICING_TIERS } from "@/lib/content-passion";

/**
 * Passion pricing — three subscription tiers (Rimo dose plan "PT-141 Standard").
 * New section for the injectable line; there was no pricing block on the old
 * tablet design spike. Each tier is a multi-dose vial (28-day supply). Styling
 * reuses the Passion theme tokens: the featured
 * tier gets the plasma-pink tinted border/wash already used by the Comparison
 * highlight column (var(--border-hot) resolves to pink inside [data-theme]).
 *
 * Every CTA enters the SAME intake channel (IntakeLink → PASSION_INTAKE_URL);
 * plan selection happens inside Rimo. `data-cta-location` tags each tier so the
 * click is distinguishable in analytics (and sets up the Stage-2 funnel tagging).
 */
export function Pricing() {
  return (
    <section
      id="pricing"
      className="mx-auto max-w-[var(--container-max)] px-5 py-[72px] md:px-10 md:py-[120px]"
    >
      <div className="mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow className="mb-4">Simple pricing</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-bold text-fg"
            style={{
              fontSize: "clamp(34px, 5.5vw, 72px)",
              letterSpacing: "-0.035em",
              lineHeight: 1,
            }}
          >
            One price.{" "}
            <span className="font-[family-name:var(--font-editorial)] italic font-normal text-ember">
              No surprises.
            </span>
          </h2>
        </div>
        <p className="max-w-[360px] text-sm leading-[1.6] text-mist">
          Your prescription, the medication, and discreet delivery — all in. No
          membership fee, no clinic visit, and you can pause or cancel whenever
          you like.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {PRICING_TIERS.map((t) => (
          <article
            key={t.id}
            className="relative flex flex-col border bg-crater p-7 md:p-8"
            style={
              t.featured
                ? {
                    background: "rgba(255,46,138,0.06)",
                    borderColor: "var(--border-hot)",
                  }
                : { borderColor: "var(--ash)" }
            }
          >
            {t.featured && (
              <span className="absolute -top-3 left-7 rounded-pill bg-hot px-3 py-1 font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.12em] text-void">
                Most popular
              </span>
            )}

            <div className="flex items-baseline justify-between">
              <h3
                className="font-[family-name:var(--font-display)] font-semibold text-fg"
                style={{ fontSize: 24, letterSpacing: "-0.025em" }}
              >
                {t.name}
              </h3>
              {t.save && (
                <span className="font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.1em] text-ember">
                  {t.save}
                </span>
              )}
            </div>

            <p className="mt-1 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-fog">
              {t.supply}
            </p>

            <div className="mt-6 flex items-end gap-2">
              <span
                className="font-[family-name:var(--font-display)] font-bold text-fg"
                style={{ fontSize: 46, letterSpacing: "-0.03em", lineHeight: 1 }}
              >
                {t.price}
              </span>
              <span className="mb-1.5 font-[family-name:var(--font-mono)] text-[12px] tracking-[0.08em] text-fog">
                {t.perMonth}
              </span>
            </div>

            <p className="mt-4 min-h-[44px] text-[13px] leading-[1.5] text-mist">
              {t.note}
            </p>

            <div className="mt-7">
              <IntakeLink
                size="lg"
                variant={t.featured ? "primary" : "ghost"}
                className="w-full justify-center"
                data-cta-location={`pricing_${t.id}`}
              >
                {t.cta}
                <span aria-hidden>→</span>
              </IntakeLink>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 max-w-[720px] text-[12px] leading-[1.55] text-fog">
        Prescription products require an online consultation with a US-licensed
        clinician who will determine if a prescription is appropriate. Subscriptions
        renew automatically; cancel anytime before your next fill.
      </p>
    </section>
  );
}
