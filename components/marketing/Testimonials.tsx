import { Eyebrow } from "@/components/ui/eyebrow";
import { TESTIMONIALS } from "@/lib/content";

/**
 * Static 4-card grid. Stars in serum yellow, display title, body quote,
 * capsaicin-gradient avatar circles with initials, mono city.
 *
 * Rating block in the header shows "4.6/5 · 2,481 verified reviews" in
 * mono — not a 50,000+ hero trumpet (that pattern is deprecated).
 */
export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="mx-auto max-w-[var(--container-max)] px-5 py-[72px] md:px-10 md:py-[120px]"
    >
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow className="mb-4">Verified patient reviews</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-bold text-fg"
            style={{
              fontSize: "clamp(34px, 5.5vw, 72px)",
              letterSpacing: "-0.035em",
              lineHeight: 1,
            }}
          >
            What patients say.
          </h2>
        </div>
        <div>
          <p
            className="font-[family-name:var(--font-display)] font-bold text-fg"
            style={{
              fontSize: 38,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            4.6
            <span className="ml-1 font-[family-name:var(--font-mono)] text-[14px] font-medium tracking-[0.1em] text-fog">
              /5
            </span>
          </p>
          <p className="mt-1.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-fog">
            2,481 verified reviews
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {TESTIMONIALS.map((r) => (
          <article
            key={r.name}
            className="border border-ash bg-crater p-[22px]"
          >
            <p
              aria-label="5 stars"
              className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.18em] text-serum"
            >
              ★ ★ ★ ★ ★
            </p>
            <h3
              className="mt-4 font-[family-name:var(--font-display)] font-semibold text-fg"
              style={{
                fontSize: 18,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {r.title}
            </h3>
            <p className="my-3.5 text-[14px] leading-[1.55] text-mist">
              {r.body}
            </p>
            <div className="mt-[22px] flex items-center gap-2.5 border-t border-ash pt-3.5">
              <span
                aria-hidden
                className="grid size-8 place-items-center rounded-full font-[family-name:var(--font-display)] text-[11px] font-bold text-void"
                style={{ background: "var(--grad-capsaicin)" }}
              >
                {r.name
                  .split(" ")
                  .map((s) => s[0])
                  .join("")}
              </span>
              <div>
                <p className="text-[13px] font-semibold text-fg">{r.name}</p>
                <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-fog">
                  {r.city}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
