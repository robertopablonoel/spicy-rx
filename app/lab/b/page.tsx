import {
  ConceptBar,
  Credentials,
  DeadCTA,
  Disclaimer,
  LineSwitch,
  Phone,
  Stepper,
} from "../_kit";

/**
 * CONCEPT B — the invitation (no quiz at all).
 *
 * The counter-bet. Treats the physical card as what it literally is: a private
 * invitation the buyer is already holding. Offer inside the first screen, one
 * tap to the clinician review, education BELOW the fold for the ~50% who
 * research before clicking (Clarity: clickers scroll ~2.2x and dwell ~3.6x
 * longer than bouncers — so the page must reward scrolling without requiring it).
 *
 * Zero routing logic. The women's line is a non-blocking symmetric switch, per
 * the wiki's rule that you never architect around inferring gender.
 *
 * Deliberately violates none of the compliance flags: no supplement->pharma
 * sibling framing ("the gummies got you started" is exactly the line that got
 * flagged as the canonical misbranding offender), review not approval,
 * mg-load framing only.
 */
export default function ConceptBPage() {
  return (
    <>
      <ConceptBar id="B" name="The invitation" />
      <div data-theme="eros">
        <Phone>
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--serum)]">
            Card holders only
          </p>

          <h1
            className="mt-5 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
            style={{ fontSize: "clamp(38px,9.5vw,52px)", lineHeight: 1.02 }}
          >
            You weren&apos;t sent here{" "}
            <span className="font-[family-name:var(--font-editorial)] italic font-normal text-[var(--ember)]">
              by an ad.
            </span>
          </h1>

          <p className="mt-6 text-[16px] leading-[1.6] text-[var(--fg-muted)]">
            The card in your box is the only place this exists. Eros is a
            clinician-prescribed 3-in-1 sublingual — and your first month is $1.
          </p>

          <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] p-6 text-center">
            <div
              className="font-[family-name:var(--font-display)] font-bold text-[var(--ember)]"
              style={{ fontSize: 72, lineHeight: 1 }}
            >
              $1
            </div>
            <div className="mt-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--serum)]">
              Your trial month
            </div>
            <p className="mt-5 text-sm leading-relaxed text-[var(--fg-muted)]">
              Cancel anytime. No commitment beyond your $1 month.
            </p>
          </div>

          <div className="mt-7">
            <DeadCTA>Start my clinician review →</DeadCTA>
          </div>
          <p className="mt-3 text-center text-xs text-[var(--fg-dim)]">
            ~5 minutes, private. No clinic visit.
          </p>

          <div className="mt-6">
            <LineSwitch current="eros" />
          </div>

          {/* ---- Below the fold: the reward for scrolling ---- */}

          <div className="mt-16 border-t border-[var(--border)] pt-10">
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--fg-dim)]">
              What&apos;s inside
            </p>
            <h2
              className="mt-4 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
              style={{ fontSize: "clamp(26px,6.5vw,34px)", lineHeight: 1.15 }}
            >
              94mg of actives. Three of them.
            </h2>

            <div className="mt-7 space-y-4">
              {[
                ["70mg", "Sildenafil", "The fast half."],
                ["20mg", "Tadalafil", "The long half."],
                [
                  "4mg",
                  "Apomorphine",
                  "The brain-side active — the one nearly every pill you've heard of leaves out.",
                ],
              ].map(([dose, name, note]) => (
                <div
                  key={name}
                  className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] p-5"
                >
                  <div className="font-[family-name:var(--font-mono)] text-sm font-semibold text-[var(--ember)]">
                    {dose}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-[var(--fg)]">{name}</div>
                    <div className="mt-1 text-sm leading-relaxed text-[var(--fg-muted)]">
                      {note}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <Stepper />
          </div>

          <div className="mt-10">
            <DeadCTA tone="ghost">Start my clinician review →</DeadCTA>
          </div>

          <div className="mt-10 space-y-3 border-t border-[var(--border)] pt-6">
            <Credentials />
            <Disclaimer />
          </div>
        </Phone>

        {/* Mobile sticky CTA — the punch-list's #2 item; the current landers
            have zero body CTAs and the hero CTA sits below the mobile fold. */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--bg)]/95 px-5 py-3 backdrop-blur">
          <div className="mx-auto max-w-[480px]">
            <DeadCTA>Start my clinician review · $1 →</DeadCTA>
          </div>
        </div>
      </div>
    </>
  );
}
