"use client";

import { useState } from "react";
import {
  Credentials,
  DeadCTA,
  Disclaimer,
  Phone,
  Stepper,
} from "../_kit";

/**
 * CONCEPT A — the quiz-router (Cole's working thesis, built straight).
 *
 * Three questions. Q1 is a ROUTING gate (which line), Q2/Q3 are marketing
 * questions in the post-purchase quiz's proven mould — every option is a
 * premise the reveal then satisfies, and no option is a deficiency.
 *
 * This is the highest-friction concept on purpose: it is the honest version of
 * "quiz lander," so it can be judged against the lighter bets rather than
 * strawmanned. Its known risk is the wiki's own finding that a hard chooser
 * adds friction and breaks landing-as-product.
 */

type Line = "eros" | "passion";

const Q2 = {
  prompt: "When you take something for a night like this — how much do you want to feel it?",
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

/** Cited-answer lines. Mg-load framing only — never an efficacy or duration
 *  promise attached to a named molecule. */
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

function Progress({ step }: { step: number }) {
  return (
    <div className="mb-6 flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1 flex-1 rounded-full transition-colors"
          style={{
            background:
              i < step
                ? "var(--serum)"
                : i === step
                  ? "var(--ember)"
                  : "var(--border)",
          }}
        />
      ))}
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

export function ConceptA() {
  const [step, setStep] = useState(0);
  const [line, setLine] = useState<Line | null>(null);
  const [strength, setStrength] = useState<string | null>(null);
  const [speed, setSpeed] = useState<string | null>(null);

  const total = 3;

  return (
    <div data-theme={line === "passion" ? "passion" : "eros"}>
      <Phone>
        {step < total && (
          <>
            <Progress step={step} />
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--fg-dim)]">
              Question {step + 1} of {total}
            </p>
          </>
        )}

        {/* Q1 — the routing gate */}
        {step === 0 && (
          <>
            <h1
              className="mt-4 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
              style={{ fontSize: "clamp(28px,7vw,38px)", lineHeight: 1.1 }}
            >
              First — who are we finding this for?
            </h1>
            <div className="mt-8 space-y-3">
              <Option
                label="Me — I'm looking for the men's line"
                onClick={() => {
                  setLine("eros");
                  setStep(1);
                }}
              />
              <Option
                label="Me — I'm looking for the women's line"
                onClick={() => {
                  setLine("passion");
                  setStep(1);
                }}
              />
              <Option
                label="Us — we're looking together"
                onClick={() => {
                  setLine("eros");
                  setStep(1);
                }}
              />
            </div>
            <p className="mt-8 text-xs leading-relaxed text-[var(--fg-dim)]">
              Two different prescriptions, two different clinicians. This just
              points you at the right one.
            </p>
          </>
        )}

        {/* Q2 */}
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
          </>
        )}

        {/* Q3 */}
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
          </>
        )}

        {/* Reveal */}
        {step === 3 && (
          <>
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--serum)]">
              Card holders only · chosen for you
            </p>

            <h1
              className="mt-4 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
              style={{ fontSize: "clamp(34px,8.5vw,46px)", lineHeight: 1.05 }}
            >
              {line === "passion" ? (
                <>
                  The wanting,{" "}
                  <span className="text-[var(--ember)]">switched on.</span>
                </>
              ) : (
                <>
                  Firm, and ready.{" "}
                  <span className="text-[var(--ember)]">And wanting it.</span>
                </>
              )}
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
                The card in your box unlocked this: a full month for $1. Cancel
                anytime. Not on the site, not in an email.
              </p>
            </div>

            <div className="mt-7">
              <DeadCTA>Start my clinician review →</DeadCTA>
            </div>
            <p className="mt-3 text-center text-xs text-[var(--fg-dim)]">
              Cancel anytime. No commitment beyond your $1 month.
            </p>

            <div className="mt-10">
              <Stepper />
            </div>
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
