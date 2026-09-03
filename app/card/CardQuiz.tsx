"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { trackEvent } from "@/lib/analytics";
import { getStoredAttribution, withAttribution } from "@/lib/attribution";
import { LINE_COPY, OPENING, type Beat } from "@/lib/content-card";
import {
  EXIT_EXPERIMENT_ID,
  EXIT_PARAM,
  type ExitArm,
  type ExitLine,
  PASSION_OFFER_READY,
  exitTarget,
  isExitArm,
} from "@/lib/insert-exit-split";

/**
 * The insert-card lander — where a scanned QR lands.
 *
 * PROBLEM FIRST, THEN SPLIT PATHS. Q1 is the problem and nothing else — no
 * product, no molecule — because the earlier version opened by asking which
 * product you wanted, which only parses for someone already shopping. Routing
 * happens at Q2, and from there the two lines own everything: their own Q3,
 * their own Q4, their own beats, ledger and fair balance.
 *
 * The split is not a preference, it is a correctness requirement. The
 * dismissal statistics are from a study of 530 WOMEN; showing them to a man
 * would be the wrong audience, and the fair balance differs by molecule
 * entirely (nitrates for the PDE5 stack, nausea for the peptide).
 *
 * THE EXPERIMENT (insert-exit-2026-09) is what happens AFTER the reveal:
 * arm `lander` hands off to the product page, arm `direct` goes straight to
 * the Rimo intake with the coupon pre-applied. Everything upstream of the CTA
 * is identical across arms, which keeps the test clean and doubles as its own
 * sanity check — if quiz-completion diverges by arm, the split is broken, not
 * the copy. Judged on LEADS PER SCAN; intake-starts would be rigged toward
 * `direct` by construction.
 *
 * Mobile-first by necessity: this is a phone camera pointed at a card.
 * Tap-only, no keyboard anywhere, no email gate — we already have their email,
 * we shipped them the box.
 */

type Line = "eros" | "passion" | "both";

/** Front-loaded, never linear: a constant-speed bar measurably does nothing
 *  and a slow-starting one is worse than showing none at all. */
const PROGRESS = [0, 40, 62, 80, 100];
const LAST_STEP = 4; // index of the reveal

function readExitArm(): ExitArm {
  const fromUrl = new URLSearchParams(window.location.search).get(EXIT_PARAM);
  if (isExitArm(fromUrl)) return fromUrl;
  const stored = getStoredAttribution()[EXIT_PARAM];
  return isExitArm(stored) ? stored : "lander";
}

const noopSubscribe = () => () => {};

function useExitArm(): ExitArm {
  return useSyncExternalStore(
    noopSubscribe,
    readExitArm,
    () => "lander" as ExitArm,
  );
}

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

function Prompt({ text, small }: { text: string; small?: boolean }) {
  return (
    <h2
      className="mt-7 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
      style={{
        fontSize: small ? "clamp(21px,5.2vw,27px)" : "clamp(24px,6vw,32px)",
        lineHeight: 1.15,
      }}
    >
      {text}
    </h2>
  );
}

function Back({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-8 text-sm text-[var(--fg-dim)] underline underline-offset-4"
    >
      ← back
    </button>
  );
}

export function CardQuiz() {
  const [step, setStep] = useState(0);
  const [a1, setA1] = useState<string | null>(null);
  const [line, setLine] = useState<Line | null>(null);
  const [a3, setA3] = useState<string | null>(null);
  const [a4, setA4] = useState<string | null>(null);

  const arm = useExitArm();
  const isPassion = line === "passion";

  // ONE product object drives the whole reveal. Gating individual blocks is
  // what previously let the women's path inherit Eros's beats and PDE5 fair
  // balance about nitrates.
  const copy = LINE_COPY[line ?? "eros"];

  // Depends on arm AND line: `direct` must reach the right intake with the
  // right coupon, `lander` the right product page. Only read at the reveal,
  // which is unreachable during SSR, so computing it in render is client-only
  // by construction and correct on the frame it first appears.
  const exitLine: ExitLine = line === "passion" ? "passion" : "eros";
  const href =
    step === LAST_STEP ? withAttribution(exitTarget(arm, exitLine)) : "";

  useEffect(() => {
    trackEvent("card_quiz_viewed", { experiment_id: EXIT_EXPERIMENT_ID, arm });
  }, [arm]);

  function answer(question: string, value: string, next: number) {
    trackEvent("card_quiz_step", {
      experiment_id: EXIT_EXPERIMENT_ID,
      arm,
      question,
      answer: value,
    });
    setStep(next);
    if (next === LAST_STEP) {
      trackEvent("card_quiz_completed", {
        experiment_id: EXIT_EXPERIMENT_ID,
        arm,
        line,
      });
    }
  }

  function handoff(position: string) {
    trackEvent("card_quiz_handoff_click", {
      experiment_id: EXIT_EXPERIMENT_ID,
      arm,
      line,
      destination: href,
      position,
    });
  }

  return (
    <div data-theme={isPassion ? "passion" : "eros"}>
      <div className="mx-auto min-h-screen w-full max-w-[480px] px-5 pb-24 pt-10">
        {step < LAST_STEP && (
          <>
            <ProgressBar step={step} />
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--fg-dim)]">
              Question {step + 1} of 4 · under a minute
            </p>
          </>
        )}

        {/* Q1 — problem recognition. No product named anywhere on this screen. */}
        {step === 0 && (
          <>
            <h1
              className="mt-5 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
              style={{ fontSize: "clamp(30px,7.6vw,42px)", lineHeight: 1.05 }}
            >
              {OPENING.hook.lead}{" "}
              <span className="font-[family-name:var(--font-editorial)] italic font-normal text-[var(--ember)]">
                {OPENING.hook.accent}
              </span>
            </h1>
            <Prompt text={OPENING.q1.prompt} />
            <div className="mt-7 space-y-3">
              {OPENING.q1.options.map(([id, label]) => (
                <Option
                  key={id}
                  label={label}
                  onClick={() => {
                    setA1(id);
                    answer("q1_when", id, 1);
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Q2 — routing. Everything after this belongs to the chosen line. */}
        {step === 1 && (
          <>
            {a1 && <Teach beat={OPENING.afterQ1[a1]} />}
            <Prompt text={OPENING.q2.prompt} />
            <div className="mt-7 space-y-3">
              {OPENING.q2.options.map(([id, label]) => (
                <Option
                  key={id}
                  label={label}
                  onClick={() => {
                    setLine(id as Line);
                    answer("q2_who", id, 2);
                  }}
                />
              ))}
            </div>
            <p className="mt-7 text-xs leading-relaxed text-[var(--fg-dim)]">
              {OPENING.routeNote}
            </p>
            <Back onClick={() => setStep(0)} />
          </>
        )}

        {/* Q3 — LINE-SPECIFIC. How the problem shows up, in that line's terms. */}
        {step === 2 && (
          <>
            {line && <Teach beat={copy.afterRoute} />}
            <Prompt text={copy.q3.prompt} />
            <div className="mt-7 space-y-3">
              {copy.q3.options.map(([id, label]) => (
                <Option
                  key={id}
                  label={label}
                  onClick={() => {
                    setA3(id);
                    answer("q3_shows_up", id, 3);
                  }}
                />
              ))}
            </div>
            <Back onClick={() => setStep(1)} />
          </>
        )}

        {/* Q4 — LINE-SPECIFIC. */}
        {step === 3 && (
          <>
            {a3 && copy.afterQ3[a3] && <Teach beat={copy.afterQ3[a3]} />}
            <Prompt text={copy.q4.prompt} small />
            <div className="mt-7 space-y-3">
              {copy.q4.options.map(([id, label]) => (
                <Option
                  key={id}
                  label={label}
                  onClick={() => {
                    setA4(id);
                    answer("q4_detail", id, LAST_STEP);
                  }}
                />
              ))}
            </div>
            <Back onClick={() => setStep(2)} />
          </>
        )}

        {/* Reveal — the first screen that sells a product. */}
        {step === LAST_STEP && (
          <>
            {a4 && copy.afterQ4[a4] && <Teach beat={copy.afterQ4[a4]} />}

            <h1
              className="mt-8 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
              style={{ fontSize: "clamp(34px,8.5vw,46px)", lineHeight: 1.05 }}
            >
              {copy.headline.lead}{" "}
              <span className="text-[var(--ember)]">{copy.headline.accent}</span>
            </h1>

            <p className="mt-6 text-[16px] leading-[1.6] text-[var(--fg-muted)]">
              {copy.pitch}
            </p>

            {/* The $1 rides coupon eros1, which is Eros-only. The women's path
                must not promise a price it cannot honour — price-shock at
                checkout is what lost a completed-form buyer on the
                post-purchase quiz before coupon auto-apply landed. */}
            {isPassion && !PASSION_OFFER_READY ? (
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
                  Your first month
                </div>
                <p className="mt-5 text-sm leading-relaxed text-[var(--fg-muted)]">
                  The card in your box unlocked this. A full month for $1 — not
                  on the site, not in an email, not for sale anywhere else.
                  Cancel whenever you want.
                </p>
              </div>
            )}

            <a
              href={href}
              onClick={() => handoff("reveal")}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--hot)] px-7 py-4 text-center font-semibold text-[var(--bone)] transition-transform active:scale-[0.98]"
              style={{ boxShadow: "var(--sh-heat)" }}
            >
              Start my visit <span aria-hidden>→</span>
            </a>
            <p className="mt-3 text-center text-xs text-[var(--fg-dim)]">
              About 5 minutes, private. No clinic, no waiting room.
            </p>

            {line === "both" && (
              <p className="mt-6 text-center text-sm">
                <span className="text-[var(--fg-dim)] underline underline-offset-4">
                  She can start hers here →
                </span>
              </p>
            )}

            <div className="mt-14 border-t border-[var(--border)] pt-10">
              <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--fg-dim)]">
                {copy.ledgerEyebrow}
              </p>
              <div className="mt-6 space-y-5">
                {copy.ledger.map((ing) => (
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
              {copy.closer && (
                <div className="mt-8">
                  <Teach beat={copy.closer} />
                </div>
              )}
            </div>

            <div className="mt-12 space-y-3 border-t border-[var(--border)] pt-6">
              <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--fg-dim)]">
                US-licensed clinicians · Licensed pharmacy · LegitScript-certified
              </p>
              <p className="text-[11px] leading-[1.5] text-[var(--fg-faint)]">
                {copy.disclaimer}
              </p>
            </div>
          </>
        )}
      </div>

      {step === LAST_STEP && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--bg)]/95 px-5 py-3 backdrop-blur">
          <div className="mx-auto max-w-[480px]">
            <a
              href={href}
              onClick={() => handoff("sticky")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--hot)] px-7 py-4 text-center font-semibold text-[var(--bone)] active:scale-[0.98]"
              style={{ boxShadow: "var(--sh-heat)" }}
            >
              Start my visit <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
