"use client";

import { useState } from "react";
import { Credentials, DeadCTA, Disclaimer, Phone, Stepper } from "../_kit";
import {
  AFTER_ROUTE,
  AFTER_SPEED,
  AFTER_STRENGTH,
  COMBINATION,
  LEDGER,
  type Beat,
} from "./education";

/**
 * CONCEPT A — the quiz-router, carrying its education.
 *
 * The test this page exists to lose or win: LANDER vs STRAIGHT-TO-TELEFORM,
 * judged on leads per scan. Both arms share the same denominator (QR scans).
 * Direct-to-Teleform trivially wins Teleform-STARTS, so starts prove nothing;
 * the only honest question is whether educating first produces more leads per
 * scan than not making them click twice. That means this page has exactly one
 * job: teach enough, fast enough, to earn the extra click it costs.
 *
 * HOW THE EDUCATION IS CARRIED: each answer unlocks a teaching beat that
 * renders at the top of the NEXT screen. Education accumulates without adding
 * a single screen of drop-off, and every beat is chosen by something the
 * visitor actually clicked — so the register matches. See ./education.ts.
 *
 * Other design rules, each tied to evidence rather than taste:
 *  - Questions are MARKETING-MOTIVE, never symptom/diagnosis. This page
 *    inherits the global Google Ads gtag (app/layout.tsx), and health answers
 *    under an ad tag are the second count in FTC v. Hims & Hers (N.D. Cal.,
 *    filed 2026-07-29).
 *  - Q1 routes on the PURCHASE, not identity ("who are we finding this for" /
 *    "for a man"), because a large share of the ~46% of men's-product leads are
 *    plausibly women buying for a partner. Identity framing bounces them.
 *  - Progress is FRONT-LOADED, never linear (Conrad 2010 n=3,179; Villar 2013
 *    meta-analysis of 32 experiments: slow-to-fast is worse than no bar).
 *  - Auto-advance WITH back (Hays 2010, n=807).
 *  - Tap-only, no keyboard, no email gate.
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

/** A teaching beat, earned by the answer they just gave. */
function Teach({ beat }: { beat: Beat }) {
  return (
    <div
      className="mt-5 rounded-xl border-l-2 bg-[var(--bg-elev)] px-5 py-4"
      style={{ borderLeftColor: "var(--ember)" }}
    >
      <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--ember)]">
        {beat.eyebrow}
      </p>
      <p className="mt-2.5 text-[14px] leading-[1.6] text-[var(--fg-muted)]">
        {beat.body}
      </p>
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
            {line && <Teach beat={AFTER_ROUTE[line]} />}
            <h1
              className="mt-7 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
              style={{ fontSize: "clamp(24px,6vw,32px)", lineHeight: 1.15 }}
            >
              {Q2.prompt}
            </h1>
            <div className="mt-7 space-y-3">
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
            {strength && <Teach beat={AFTER_STRENGTH[strength]} />}
            <h1
              className="mt-7 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
              style={{ fontSize: "clamp(24px,6vw,32px)", lineHeight: 1.15 }}
            >
              {Q3.prompt}
            </h1>
            <div className="mt-7 space-y-3">
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
                  Hard is the easy part.{" "}
                  <span className="text-[var(--ember)]">
                    The wanting is the rest.
                  </span>
                </h1>
                {speed && <Teach beat={AFTER_SPEED[speed]} />}
              </>
            )}

            {/* The $1 trial rides coupon `eros1`, which is Eros-only. The
                women's line has no coupon provisioned, so this path must not
                promise a price it cannot honour — that is the exact
                price-shock leak that lost a completed-form buyer before
                coupon auto-apply landed in the post-purchase quiz. */}
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
                  The card in your box unlocked this. A full month for $1 —
                  not on the site, not in an email, not for sale anywhere else.
                  Cancel whenever you want.
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

            {/* The deep block — what's actually in it. Apomorphine first. */}
            {!isPassion && (
              <div className="mt-14 border-t border-[var(--border)] pt-10">
                <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--fg-dim)]">
                  94mg of actives · nothing hidden
                </p>
                <div className="mt-6 space-y-5">
                  {LEDGER.map((ing) => (
                    <div
                      key={ing.name}
                      className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] p-5"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-semibold text-[var(--fg)]">
                          {ing.name}
                        </span>
                        <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--ember)]">
                          {ing.dose}
                        </span>
                      </div>
                      <p className="mt-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--fg-dim)]">
                        {ing.slot}
                      </p>
                      <p className="mt-3 text-[14px] leading-[1.6] text-[var(--fg-muted)]">
                        {ing.body}
                      </p>
                    </div>
                  ))}
                </div>

                {/* The tap-and-drain convergence — the reason these molecules
                    belong in one dose. Mechanism only: no trial of the three
                    together has ever been run. */}
                <div className="mt-8">
                  <Teach beat={COMBINATION} />
                </div>
              </div>
            )}

            <div className="mt-12">
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
