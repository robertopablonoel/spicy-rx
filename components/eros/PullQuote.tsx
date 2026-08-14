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
        <blockquote
          className="mx-auto max-w-[24ch] font-[family-name:var(--font-editorial)] italic font-normal text-chalk"
          style={{
            fontSize: "clamp(40px, 5.6vw, 78px)",
            lineHeight: 1.04,
          }}
        >
          Your youthful fire, in a single drop.
        </blockquote>
        <p
          className="mx-auto mt-7 max-w-[56ch] text-[15px] leading-[1.65] md:text-base"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          By &ldquo;fire&rdquo; we mean the drive and the wanting you had in your
          younger years — the pull, the appetite, the edge. Eros is made to
          reignite it: it works on the body and the brain at once, so it&apos;s
          not just about getting hard, but wanting to — in a single sublingual
          dose.
        </p>
      </div>
    </section>
  );
}
