import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Full-bleed plasma gradient band — used ONCE per page. The --grad-capsaicin
 * var resolves to the plasma (pink → ultraviolet) gradient inside
 * [data-theme="passion"], so this stays in sync with the theme automatically.
 */
export function PullQuote() {
  return (
    <section
      className="relative overflow-hidden px-5 py-[72px] md:px-10 md:py-[120px]"
      style={{ background: "var(--grad-capsaicin)" }}
    >
      <div className="mx-auto max-w-[1080px]">
        <Eyebrow className="mb-6" style={{ color: "rgba(10,9,7,0.7)" }}>
          Desire, on your terms.
        </Eyebrow>
        <blockquote
          className="font-[family-name:var(--font-display)] font-bold text-void"
          style={{
            fontSize: "clamp(34px, 6vw, 84px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.98,
          }}
        >
          It was never
          <br />
          <span className="font-[family-name:var(--font-editorial)] italic font-normal">
            in your head.
          </span>
          <br />
          It&apos;s biology — and it&apos;s treatable.
        </blockquote>
      </div>
    </section>
  );
}
