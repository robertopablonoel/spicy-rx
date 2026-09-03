import Link from "next/link";

/**
 * Concept gallery index. Each entry is a distinct, fully-rendered take on the
 * insert-card lander so they can be compared side by side. `status` is honest
 * about what is actually clickable yet — a card marked "planned" has no page
 * behind it, and says so, rather than linking into a 404.
 */
type Concept = {
  slug: string;
  name: string;
  premise: string;
  status: "live" | "planned";
};

const CONCEPTS: Concept[] = [
  {
    slug: "a",
    name: "Concept A",
    premise:
      "Quiz-router — a short, problem-aware question set that sorts the visitor to Eros or Passion, then sells with education.",
    status: "planned",
  },
  {
    slug: "b",
    name: "Concept B",
    premise:
      "Direct continuity — treats the card as a personal invitation and leads with the offer, minimal friction to intake.",
    status: "planned",
  },
  {
    slug: "c",
    name: "Concept C",
    premise:
      "Education-first — leads with the apomorphine 'missing half' mechanism, sells by teaching the science.",
    status: "planned",
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
              href={`/lab/${c.slug}`}
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
