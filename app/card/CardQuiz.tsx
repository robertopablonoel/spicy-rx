"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { trackEvent } from "@/lib/analytics";
import { getStoredAttribution, withAttribution } from "@/lib/attribution";
import { LINE_COPY, type Beat } from "@/lib/content-card";
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
 * Three taps, then a handoff. The handoff destination is the EXPERIMENT
 * (insert-exit-2026-09): the `lander` arm hands off to /eros, the `direct` arm
 * goes straight to the Rimo intake with the coupon pre-applied. Everything
 * upstream of the CTA is byte-identical across arms, which both keeps the test
 * clean and doubles as its own sanity check — if the arms' quiz-completion
 * rates diverge, the split is broken, not the copy.
 *
 * Judged on LEADS PER SCAN. Intake-starts would be rigged toward `direct` by
 * construction, since going straight to the form IS an intake start.
 *
 * Mobile-first by necessity: this traffic is a phone camera pointed at a card.
 * Tap-only answers, no keyboard anywhere, no email gate — we already have their
 * email, we shipped them the box.
 */

type Line = "eros" | "passion" | "both";

/** Fast-to-slow. A linear bar measurably does nothing; a slow-starting one is
 *  worse than showing none at all. */
const PROGRESS = [0, 55, 80, 100];

/**
 * Read the arm assigned server-side on the /qr redirect: the URL param first
 * (freshest), then the persisted attribution snapshot (survives a privacy
 * browser stripping the query string). Falls back to `lander` so a direct
 * visit with no assignment still renders a coherent page.
 */
function readExitArm(): ExitArm {
  const fromUrl = new URLSearchParams(window.location.search).get(EXIT_PARAM);
  if (isExitArm(fromUrl)) return fromUrl;
  const stored = getStoredAttribution()[EXIT_PARAM];
  return isExitArm(stored) ? stored : "lander";
}

/** The assignment never changes mid-visit, so there is nothing to subscribe to. */
const noopSubscribe = () => () => {};

/**
 * Client-only values read through useSyncExternalStore rather than
 * setState-in-an-effect. Two reasons this matters beyond satisfying the
 * linter: it avoids a cascading second render, and — more importantly — the
 * href is correct on the FIRST paint rather than after hydration. The shipped
 * IntakeLink resolves attribution on mount, which is a known live bug: a tap
 * landing before hydration loses its UTMs. Snapshots are strings, so React's
 * Object.is comparison is stable and this cannot loop.
 */
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

export function CardQuiz() {
  const [step, setStep] = useState(0);
  const [line, setLine] = useState<Line | null>(null);
  const [strength, setStrength] = useState<string | null>(null);
  const [speed, setSpeed] = useState<string | null>(null);

  const arm = useExitArm();
  const isPassion = line === "passion";

  // Everything the reveal renders comes from ONE product object. Before this
  // was split, the women's path inherited Eros's beats and fair balance — she
  // got told about 94mg of sildenafil/tadalafil/apomorphine and warned about
  // nitrates. Selecting the whole copy set at once makes that impossible.
  const copy = LINE_COPY[line ?? "eros"];

  // The handoff depends on BOTH the arm and the line: the `direct` arm has to
  // reach the right intake form with the right coupon, and `lander` the right
  // product page. Only ever read at step 3, which is unreachable during SSR
  // (step starts at 0), so computing it in render is client-only by
  // construction and correct on the frame it first appears.
  const exitLine: ExitLine = line === "passion" ? "passion" : "eros";
  const href = step === 3 ? withAttribution(exitTarget(arm, exitLine)) : "";

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
    if (next === 3) {
      trackEvent("card_quiz_completed", {
        experiment_id: EXIT_EXPERIMENT_ID,
        arm,
      });
    }
  }

  return (
    <div data-theme={isPassion ? "passion" : "eros"}>
      <div className="mx-auto min-h-screen w-full max-w-[480px] px-5 pb-24 pt-10">
        {step < 3 && (
          <>
            <ProgressBar step={step} />
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--fg-dim)]">
              Question {step + 1} of 3 · about 20 seconds
            </p>
          </>
        )}

        {step === 0 && (
          <>
            <h1
              className="mt-5 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
              style={{ fontSize: "clamp(32px,8vw,44px)", lineHeight: 1.04 }}
            >
              The card in your box opens something{" "}
              <span className="font-[family-name:var(--font-editorial)] italic font-normal text-[var(--ember)]">
                the website doesn&apos;t.
              </span>
            </h1>

            <p className="mt-5 text-[16px] leading-[1.55] text-[var(--fg-muted)]">
              Three taps. At the end, your first month for $1.
            </p>

            <h2
              className="mt-10 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
              style={{ fontSize: "clamp(22px,5.4vw,28px)", lineHeight: 1.15 }}
            >
              Who are we finding this for?
            </h2>
            <div className="mt-8 space-y-3">
              <Option
                label="For a man"
                onClick={() => {
                  setLine("eros");
                  answer("who", "man", 1);
                }}
              />
              <Option
                label="For a woman"
                onClick={() => {
                  setLine("passion");
                  answer("who", "woman", 1);
                }}
              />
              <Option
                label="For both of us"
                onClick={() => {
                  setLine("both");
                  answer("who", "both", 1);
                }}
              />
            </div>
            <p className="mt-7 text-xs leading-relaxed text-[var(--fg-dim)]">
              Two prescriptions, built for two different bodies. Point us the
              right way — plenty of people here are shopping for someone else.
            </p>
          </>
        )}

        {step === 1 && (
          <>
            {line && <Teach beat={copy.afterRoute} />}
            <h1
              className="mt-7 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
              style={{ fontSize: "clamp(24px,6vw,32px)", lineHeight: 1.15 }}
            >
              {copy.q2.prompt}
            </h1>
            <div className="mt-7 space-y-3">
              {copy.q2.options.map(([id, label]) => (
                <Option
                  key={id}
                  label={label}
                  onClick={() => {
                    setStrength(id);
                    answer("q2", id, 2);
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => setStep(0)}
              className="mt-8 text-sm text-[var(--fg-dim)] underline underline-offset-4"
            >
              ← back
            </button>
          </>
        )}

        {step === 2 && (
          <>
            {strength && <Teach beat={copy.afterQ2[strength]} />}
            <h1
              className="mt-7 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
              style={{ fontSize: "clamp(24px,6vw,32px)", lineHeight: 1.15 }}
            >
              {copy.q3.prompt}
            </h1>
            <div className="mt-7 space-y-3">
              {copy.q3.options.map(([id, label]) => (
                <Option
                  key={id}
                  label={label}
                  onClick={() => {
                    setSpeed(id);
                    answer("q3", id, 3);
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="mt-8 text-sm text-[var(--fg-dim)] underline underline-offset-4"
            >
              ← back
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[var(--tr-eyebrow)] text-[var(--serum)]">
              Card holders only · chosen for you
            </p>

            <h1
              className="mt-4 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
              style={{ fontSize: "clamp(34px,8.5vw,46px)", lineHeight: 1.05 }}
            >
              {copy.headline.lead}{" "}
              <span className="text-[var(--ember)]">
                {copy.headline.accent}
              </span>
            </h1>
            {speed && copy.afterQ3[speed] && (
              <Teach beat={copy.afterQ3[speed]} />
            )}

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
              onClick={() =>
                trackEvent("card_quiz_handoff_click", {
                  experiment_id: EXIT_EXPERIMENT_ID,
                  arm,
                  line,
                  destination: href,
                })
              }
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--hot)] px-7 py-4 text-center font-semibold text-[var(--bone)] transition-transform active:scale-[0.98]"
              style={{ boxShadow: "var(--sh-heat)" }}
            >
              Start my visit <span aria-hidden>→</span>
            </a>
            <p className="mt-3 text-center text-xs text-[var(--fg-dim)]">
              About 5 minutes, private. No clinic, no waiting room.
            </p>

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

      {step === 3 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--bg)]/95 px-5 py-3 backdrop-blur">
          <div className="mx-auto max-w-[480px]">
            <a
              href={href}
              onClick={() =>
                trackEvent("card_quiz_handoff_click", {
                  experiment_id: EXIT_EXPERIMENT_ID,
                  arm,
                  line,
                  destination: href,
                  position: "sticky",
                })
              }
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
