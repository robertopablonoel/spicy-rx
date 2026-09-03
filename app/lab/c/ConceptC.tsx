"use client";

import { useState } from "react";
import {
  Credentials,
  DeadCTA,
  Disclaimer,
  LineSwitch,
  Phone,
  Stepper,
} from "../_kit";

/**
 * CONCEPT C — one tap, then the whole page is written for you.
 *
 * The bet this makes, and why:
 *
 * The post-purchase quiz's launch weekend produced the sharpest signal anyone
 * has on this audience — the `performance` cohort clicked 0/15 when sold in
 * desire poetry, while desire/connection converted 20-25% on the same offer and
 * the same product. The diagnosis in that commit was "we sold a COMMITMENT to
 * people who'd accept a TRIAL." So the measured value of asking questions here
 * is NOT problem-awareness and NOT product routing. It is REGISTER DETECTION.
 *
 * If register is what moves the number, then you need exactly enough questions
 * to detect register and not one more. That is one question. Everything after
 * it — headline, offer framing, which proof leads — is rewritten to match,
 * which is the personalization the three-question version spends two extra
 * screens of drop-off to buy.
 *
 * The women's line stays a non-blocking switch rather than a gate, so routing
 * costs zero screens.
 */

type Register = "reliability" | "desire" | "connection" | "curious";

const SKINS: Record<
  Register,
  {
    headline: React.ReactNode;
    body: string;
    offerLine: string;
    leadProof: string;
  }
> = {
  reliability: {
    headline: (
      <>
        Strong,{" "}
        <span className="text-[var(--ember)]">on your schedule.</span>
      </>
    ),
    body: "You want it to work when it matters. Eros carries 94mg of actives across three ingredients, dosed to you by a US-licensed clinician.",
    offerLine:
      "Try a full month for $1. Cancel anytime — no commitment beyond the trial month.",
    leadProof: "94mg of actives. Three of them.",
  },
  desire: {
    headline: (
      <>
        The wanting,{" "}
        <span className="text-[var(--ember)]">switched on.</span>
      </>
    ),
    body: "Every pill you've heard of works on the plumbing. Eros adds apomorphine — the brain-side active, where wanting actually begins.",
    offerLine:
      "Try a full month for $1. Cancel anytime — no commitment beyond the trial month.",
    leadProof: "The active nearly everyone leaves out.",
  },
  connection: {
    headline: (
      <>
        The old fire —{" "}
        <span className="text-[var(--ember)]">for both of you.</span>
      </>
    ),
    body: "Not a performance problem. A wanting one. Eros is built for the body and the brain, because the second half is the one that got quiet.",
    offerLine:
      "Try a full month for $1. Cancel anytime — no commitment beyond the trial month.",
    leadProof: "Body and brain, in one drop.",
  },
  curious: {
    headline: (
      <>
        The fun,{" "}
        <span className="text-[var(--ember)]">with a bigger engine.</span>
      </>
    ),
    body: "Same night, more under the hood — a clinician-prescribed 3-in-1 sublingual instead of whatever's in the drawer.",
    offerLine:
      "Try a month for $1. Keep it only if the fun agrees. Cancel anytime.",
    leadProof: "Prescription-grade, not guesswork.",
  },
};

const QUESTION = "Be honest — what would make tonight better?";

const OPTIONS: [Register, string][] = [
  ["reliability", "Knowing it'll work when it counts"],
  ["desire", "Actually wanting it, the way I used to"],
  ["connection", "Us — getting that spark back"],
  ["curious", "Nothing's wrong. Just keeping it fun"],
];

export function ConceptC() {
  const [register, setRegister] = useState<Register | null>(null);

  if (!register) {
    return (
      <div data-theme="eros">
        <Phone>
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--serum)]">
            Card holders only · one question
          </p>

          <h1
            className="mt-5 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
            style={{ fontSize: "clamp(30px,7.6vw,42px)", lineHeight: 1.08 }}
          >
            {QUESTION}
          </h1>

          <p className="mt-5 text-[15px] leading-relaxed text-[var(--fg-muted)]">
            One tap. Then we&apos;ll show you the right thing — and your $1
            month.
          </p>

          <div className="mt-9 space-y-3">
            {OPTIONS.map(([id, label]) => (
              <button
                key={id}
                onClick={() => setRegister(id)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] px-5 py-4 text-left text-[15px] leading-snug text-[var(--fg)] transition-colors hover:border-[var(--ember)] active:scale-[0.99]"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-9">
            <LineSwitch current="eros" />
          </div>

          <div className="mt-10 space-y-3 border-t border-[var(--border)] pt-6">
            <Credentials />
          </div>
        </Phone>
      </div>
    );
  }

  const skin = SKINS[register];

  return (
    <div data-theme="eros">
      <Phone>
        <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--serum)]">
          Card holders only · chosen for you
        </p>

        <h1
          className="mt-5 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
          style={{ fontSize: "clamp(36px,9vw,50px)", lineHeight: 1.03 }}
        >
          {skin.headline}
        </h1>

        <p className="mt-6 text-[16px] leading-[1.6] text-[var(--fg-muted)]">
          {skin.body}
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
            {skin.offerLine}
          </p>
        </div>

        <div className="mt-7">
          <DeadCTA>Start my clinician review →</DeadCTA>
        </div>
        <p className="mt-3 text-center text-xs text-[var(--fg-dim)]">
          ~5 minutes, private. No clinic visit.
        </p>

        <div className="mt-14 border-t border-[var(--border)] pt-10">
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--fg-dim)]">
            {skin.leadProof}
          </p>
          <div className="mt-6 space-y-4">
            {[
              ["70mg", "Sildenafil"],
              ["20mg", "Tadalafil"],
              ["4mg", "Apomorphine"],
            ].map(([dose, name]) => (
              <div
                key={name}
                className="flex items-baseline justify-between border-b border-[var(--border)] pb-3"
              >
                <span className="font-semibold text-[var(--fg)]">{name}</span>
                <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--ember)]">
                  {dose}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Stepper />
        </div>

        <button
          onClick={() => setRegister(null)}
          className="mt-10 w-full text-center text-xs text-[var(--fg-dim)] underline underline-offset-4"
        >
          ← that&apos;s not me, show me something else
        </button>

        <div className="mt-8 space-y-3 border-t border-[var(--border)] pt-6">
          <Credentials />
          <Disclaimer />
        </div>
      </Phone>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--bg)]/95 px-5 py-3 backdrop-blur">
        <div className="mx-auto max-w-[480px]">
          <DeadCTA>Start my clinician review · $1 →</DeadCTA>
        </div>
      </div>
    </div>
  );
}
