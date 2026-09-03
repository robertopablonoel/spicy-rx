import Link from "next/link";

/**
 * Concept gallery index. Each entry is a distinct, fully-rendered take on the
 * insert-card lander so they can be compared side by side. `status` is honest
 * about what is actually clickable yet — a card marked "planned" has no page
 * behind it, and says so, rather than linking into a 404.
 */
type Concept = {
  /** Full href — concept A now points out of /lab to the shipped page. */
  slug: string;
  href: string;
  name: string;
  premise: string;
  status: "live" | "planned";
};

const CONCEPTS: Concept[] = [
  {
    slug: "card",
    href: "/card",
    name: "A · Quiz-router — SHIPPED",
    premise:
      "Picked and built. Now lives at /card as the real insert-card lander, with the exit-split experiment wired in. This entry links there; the concept copy is gone so the two can't drift.",
    status: "live",
  },
  {
    slug: "b",
    href: "/lab/b",
    name: "B · The invitation",
    premise:
      "No quiz. The card is a private invitation: offer in the first screen, one tap to the clinician review, education below the fold for those who research first.",
    status: "live",
  },
  {
    slug: "c",
    href: "/lab/c",
    name: "C · Register-detect",
    premise:
      "One question — not to route, but to detect which register to sell in. The whole page then rewrites to match. Built on the 0/15 finding from the post-purchase quiz.",
    status: "live",
  },
];

export default function LabIndexPage() {
  return (
    <main className="mx-auto max-w-[var(--container-max)] px-5 py-20 md:px-10">
      <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[var(--tr-eyebrow)] text-[var(--fg-dim)]">
        Internal · not a customer surface
      </p>

      <h1
        className="mt-5 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
        style={{ fontSize: "clamp(38px, 4.4vw, 64px)", lineHeight: 1.05 }}
      >
        Insert-card lander{" "}
        <span className="font-[family-name:var(--font-editorial)] italic font-normal">
          concept lab
        </span>
      </h1>

      <p className="mt-6 max-w-[62ch] text-[var(--fg-muted)] leading-[1.6]">
        Destination candidates for the physical QR insert cards shipping in
        Spicy Cubes orders. The audience is warm: they already bought, and
        they are holding the card. Each concept below is a different bet about
        what that person needs to see first.
      </p>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {CONCEPTS.map((c) => {
          const inner = (
            <>
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[var(--tr-eyebrow)] text-[var(--fg-dim)]">
                  {c.name}
                </span>
                <span
                  className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)]"
                  style={{
                    color:
                      c.status === "live" ? "var(--vitals)" : "var(--fg-faint)",
                  }}
                >
                  {c.status}
                </span>
              </div>
              <p className="mt-5 text-[var(--fg)] leading-[1.5]">{c.premise}</p>
            </>
          );

          const className =
            "block rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] p-6 transition-colors";

          return c.status === "live" ? (
            <Link
              key={c.slug}
              href={c.href}
              className={`${className} hover:border-[var(--fg-dim)]`}
            >
              {inner}
            </Link>
          ) : (
            <div key={c.slug} className={`${className} opacity-60`}>
              {inner}
            </div>
          );
        })}
      </div>
    </main>
  );
}
