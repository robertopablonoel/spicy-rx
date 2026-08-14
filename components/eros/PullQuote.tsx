import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Full-bleed gradient band — used ONCE per page. The --grad-capsaicin var
 * resolves to the lapis → cyan gradient inside [data-theme="eros"], so this
 * stays in sync with the theme automatically.
 */
export function PullQuote() {
  return (
    <section
      className="relative overflow-hidden px-5 py-[72px] md:px-10 md:py-[120px]"
      style={{ background: "var(--grad-capsaicin)" }}
    >
      <div className="mx-auto max-w-[1080px] text-center">
        <Eyebrow className="mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
          The oldest idea in medicine, made modern
        </Eyebrow>
        <blockquote
          className="mx-auto max-w-[22ch] font-[family-name:var(--font-editorial)] italic font-normal text-chalk"
          style={{
            fontSize: "clamp(40px, 5.6vw, 78px)",
            lineHeight: 1.04,
          }}
        >
          The old fire, in a single drop.
        </blockquote>
        <p
          className="mx-auto mt-7 max-w-[52ch] text-[15px] leading-[1.65] md:text-base"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          The &ldquo;fire&rdquo; is the plain, old thing every man knows: the
          drive and the wanting — the pull you had in your prime, not just the
          mechanics. Eros is built to reignite it, working on the body and the
          brain at once, in a single sublingual dose.
        </p>
      </div>
    </section>
  );
}
