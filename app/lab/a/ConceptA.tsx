"use client";

import { useState } from "react";
import { Credentials, DeadCTA, Disclaimer, Phone, Stepper } from "../_kit";

/**
 * CONCEPT A — the quiz-router. Cole's thesis, developed.
 *
 * Design rules here are evidence-led, not stylistic:
 *
 * 1. EVERY QUESTION IS A MARKETING-MOTIVE QUESTION, never a symptom or
 *    diagnosis question. This page inherits the global Google Ads gtag from
 *    app/layout.tsx, so anything health-shaped collected here would be a page
 *    with an ad tag observing health answers — the second count in FTC v.
 *    Hims & Hers (N.D. Cal., filed 2026-07-29). Motive tags keep this a
 *    product-finder; the teleform does medical intake behind its own consent.
 *
 * 2. Q1 ROUTES ON THE PURCHASE, NOT ON IDENTITY. "Who are we finding this
 *    for?" rather than "are you a man or a woman." ~46% of men's-product leads
 *    are women, and women are the household health initiator in most telehealth
 *    data — a large share are plausibly buying FOR a partner. Identity framing
 *    would bounce them; purchase framing routes them correctly. Also dodges
 *    NN/g's finding that identity-based splitters degrade usability because
 *    users belong to several categories at once.
 *
 * 3. PROGRESS IS FRONT-LOADED (fast-to-slow), never linear. Conrad et al. 2010
 *    (randomized, n=3,179) and Villar et al. 2013 (meta-analysis of 32
 *    experiments): constant-speed indicators do not reduce drop-off, and
 *    slow-to-fast is WORSE than showing none at all (21.8% vs 12.7%). Only
 *    fast-to-slow measurably helped.
 *
 * 4. AUTO-ADVANCE WITH BACK AVAILABLE. Hays et al. 2010 (randomized, n=807):
 *    auto-advance cut completion time ~50% with no data-quality cost, and the
 *    authors still recommend keeping Back. On touch, Back is also the only
 *    recovery from a mis-tap.
 *
 * 5. TAP-ONLY, NO KEYBOARD, NO EMAIL GATE. Traffic is ~98% mobile; the touch
 *    keyboard eats ~50% of a portrait screen. And we already have these
 *    people's emails — we shipped them a box.
 */

type Line = "eros" | "passion" | "both";

/** Fast-to-slow: big jump on the first answer, decelerating after. */
const PROGRESS = [0, 55, 80, 100];

const Q2 = {
  prompt:
    "When you take something for a night like this — how much do you want to feel it?",
  options: [
    ["low", "A little goes a long way"],
    ["mid", "Noticeable — no guessing"],
    ["max", "As strong as they make it"],
  ],
} as const;

const Q3 = {
  prompt: "And when the moment hits — how do you want it to work?",
  options: [
    ["fast", "Fast — minutes, not an hour"],
    ["long", "Steady — a longer window"],
    ["both", "Both, honestly"],
  ],
} as const;

/** Mg-load framing only. No efficacy promise, no duration promise attached to
 *  a named molecule (the 06-card pull order bars that on ad-adjacent surfaces). */
const STRENGTH_LINE: Record<string, string> = {
  low: "You said a little goes a long way — a clinician dials the dose to you. Nothing here is one-size-fits-all.",
  mid: "You said noticeable, no guessing — Eros carries 94mg of actives across three ingredients.",
  max: "You said as strong as they make it — 94mg of actives, with the brain-side active at the top of the clinically studied range.",
};

const SPEED_LINE: Record<string, string> = {
  fast: "You said fast — sildenafil is the fast half of the formula.",
  long: "You said a longer window — tadalafil is the long half.",
  both: "You said both — that's the design: sildenafil, tadalafil, and apomorphine for the wanting.",
};

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-7 h-1 w-full overflow-hidden rounded-full bg-[var(--border)]">
      <div
        className="h-full rounded-full transition-[width] duration-500 ease-out"
        style={{
          width: `${PROGRESS[Math.min(step, PROGRESS.length - 1)]}%`,
          background: "var(--ember)",
        }}
      />
    </div>
  );
}

function Option({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] px-5 py-4 text-left text-[15px] leading-snug text-[var(--fg)] transition-colors hover:border-[var(--ember)] active:scale-[0.99]"
    >
      {label}
    </button>
  );
}

function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-8 text-sm text-[var(--fg-dim)] underline underline-offset-4"
    >
      ← back
    </button>
  );
}

export function ConceptA() {
  const [step, setStep] = useState(0);
  const [line, setLine] = useState<Line | null>(null);
  const [strength, setStrength] = useState<string | null>(null);
  const [speed, setSpeed] = useState<string | null>(null);

  const isPassion = line === "passion";

  return (
    <div data-theme={isPassion ? "passion" : "eros"}>
      <Phone>
        {step < 3 && (
          <>
            <ProgressBar step={step} />
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--fg-dim)]">
              Question {step + 1} of 3 · about 20 seconds
            </p>
          </>
        )}

        {/* Q1 — routes on the PURCHASE, not on identity. */}
        {step === 0 && (
          <>
            <h1
              className="mt-4 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
              style={{ fontSize: "clamp(28px,7vw,38px)", lineHeight: 1.1 }}
            >
              Who are we finding this for?
            </h1>
            <div className="mt-8 space-y-3">
              <Option
                label="For a man"
                onClick={() => {
                  setLine("eros");
                  setStep(1);
                }}
              />
              <Option
                label="For a woman"
                onClick={() => {
                  setLine("passion");
                  setStep(1);
                }}
              />
              <Option
                label="For both of us"
                onClick={() => {
                  setLine("both");
                  setStep(1);
                }}
              />
            </div>
            <p className="mt-8 text-xs leading-relaxed text-[var(--fg-dim)]">
              Two different prescriptions, reviewed by two different clinicians.
              This just points you at the right one — plenty of people here are
              shopping for someone else.
            </p>
          </>
        )}

        {step === 1 && (
          <>
            <h1
              className="mt-4 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
              style={{ fontSize: "clamp(26px,6.4vw,34px)", lineHeight: 1.15 }}
            >
              {Q2.prompt}
            </h1>
            <div className="mt-8 space-y-3">
              {Q2.options.map(([id, label]) => (
                <Option
                  key={id}
                  label={label}
                  onClick={() => {
                    setStrength(id);
                    setStep(2);
                  }}
                />
              ))}
            </div>
            <BackLink onClick={() => setStep(0)} />
          </>
        )}

        {step === 2 && (
          <>
            <h1
              className="mt-4 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
              style={{ fontSize: "clamp(26px,6.4vw,34px)", lineHeight: 1.15 }}
            >
              {Q3.prompt}
            </h1>
            <div className="mt-8 space-y-3">
              {Q3.options.map(([id, label]) => (
                <Option
                  key={id}
                  label={label}
                  onClick={() => {
                    setSpeed(id);
                    setStep(3);
                  }}
                />
              ))}
            </div>
            <BackLink onClick={() => setStep(1)} />
          </>
        )}

        {/* Reveal */}
        {step === 3 && (
          <>
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--serum)]">
              Card holders only · chosen for you
            </p>

            {isPassion ? (
              <>
                <h1
                  className="mt-4 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
                  style={{
                    fontSize: "clamp(34px,8.5vw,46px)",
                    lineHeight: 1.05,
                  }}
                >
                  The wanting,{" "}
                  <span className="text-[var(--ember)]">switched on.</span>
                </h1>
                <p className="mt-6 text-[16px] leading-[1.6] text-[var(--fg-muted)]">
                  Passion is PT-141 (bremelanotide) — prescribed after a
                  clinician review, and taken on demand rather than as a daily
                  pill.
                </p>
              </>
            ) : (
              <>
                <h1
                  className="mt-4 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
                  style={{
                    fontSize: "clamp(34px,8.5vw,46px)",
                    lineHeight: 1.05,
                  }}
                >
                  Firm, and ready.{" "}
                  <span className="text-[var(--ember)]">And wanting it.</span>
                </h1>
                {strength && (
                  <p className="mt-6 text-[15px] font-semibold leading-relaxed text-[var(--ember)]">
                    {STRENGTH_LINE[strength]}
                  </p>
                )}
                {speed && (
                  <p className="mt-3 text-[15px] font-semibold leading-relaxed text-[var(--fg)]">
                    {SPEED_LINE[speed]}
                  </p>
                )}
              </>
            )}

            {/* The $1 trial is wired to coupon `eros1`, which is Eros-only.
                The women's line has no coupon provisioned, so this path must
                not promise a price it cannot honour — that is exactly the
                price-shock leak that lost a completed-form buyer before
                coupon auto-apply was added to the post-purchase quiz. */}
            {isPassion ? (
              <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] p-6">
                <p className="text-sm leading-relaxed text-[var(--fg-muted)]">
                  Pricing is shown inside your visit, once a clinician has
                  reviewed your answers.
                </p>
              </div>
            ) : (
              <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] p-6 text-center">
                <div
                  className="font-[family-name:var(--font-display)] font-bold text-[var(--ember)]"
                  style={{ fontSize: 64, lineHeight: 1 }}
                >
                  $1
                </div>
                <div className="mt-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--serum)]">
                  Your trial month
                </div>
                <p className="mt-5 text-sm leading-relaxed text-[var(--fg-muted)]">
                  The card in your box unlocked this: a full month for $1.
                  Cancel anytime. Not on the site, not in an email.
                </p>
              </div>
            )}

            <div className="mt-7">
              <DeadCTA>Start my clinician review →</DeadCTA>
            </div>
            {!isPassion && (
              <p className="mt-3 text-center text-xs text-[var(--fg-dim)]">
                Cancel anytime. No commitment beyond your $1 month.
              </p>
            )}

            {line === "both" && (
              <p className="mt-6 text-center text-sm">
                <span className="text-[var(--fg-dim)] underline underline-offset-4">
                  Start the women&apos;s visit instead →
                </span>
              </p>
            )}

            <div className="mt-10">
              <Stepper />
            </div>
            <button
              onClick={() => setStep(0)}
              className="mt-8 w-full text-center text-xs text-[var(--fg-dim)] underline underline-offset-4"
            >
              ← start over
            </button>
            <div className="mt-8 space-y-3 border-t border-[var(--border)] pt-6">
              <Credentials />
              <Disclaimer />
            </div>
          </>
        )}
      </Phone>
    </div>
  );
}
