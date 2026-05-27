"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Input } from "@/components/ui/input";
import { RadioOption } from "@/components/ui/radio-option";
import { cn } from "@/lib/utils";
import { submitConsult } from "../actions";

type Answers = {
  dob: string;
  nitrates: string | null;
  history: string | null;
};

const NITRATE_OPTIONS = [
  "No, neither",
  "Yes — nitrates",
  "Yes — alpha-blockers",
  "I'm not sure",
] as const;

const HISTORY_OPTIONS = [
  "No history",
  "Mild / managed",
  "Significant — I'll discuss with the clinician",
] as const;

/**
 * 3-step intake form. Single-question screens with a progress bar across
 * the top. On the final step, "Submit for review" calls the server action.
 *
 * The dob field is a plain text input following the kit's pattern (no
 * native date picker) — clinicians prefer to see the raw MM/DD/YYYY
 * format on review.
 */
export function ConsultForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    dob: "",
    nitrates: null,
    history: null,
  });
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState<{ message: string } | null>(null);

  const steps = [
    {
      title: "Are you over 18?",
      sub: "Hot Sauce is prescribed in 48 states for patients 18+.",
      canContinue: answers.dob.length >= 8,
    },
    {
      title: "Are you taking nitrates or alpha-blockers?",
      sub: "Combining PDE5 inhibitors with nitrates can cause dangerous drops in blood pressure. We screen carefully.",
      canContinue: !!answers.nitrates,
    },
    {
      title: "Any history of heart disease or stroke?",
      sub: "Your clinician needs to know. We won't prescribe if it isn't safe — full stop.",
      canContinue: !!answers.history,
    },
  ];
  const current = steps[step];
  const isLast = step === steps.length - 1;

  const onContinue = () => {
    if (!current.canContinue) return;
    if (!isLast) {
      setStep(step + 1);
      return;
    }
    startTransition(async () => {
      const result = await submitConsult({
        dob: answers.dob,
        nitrates: answers.nitrates ?? "",
        history: answers.history ?? "",
      });
      setSubmitted({ message: result.message });
    });
  };

  if (submitted) {
    return (
      <div className="max-w-[640px]">
        <Eyebrow className="mb-5">Submitted</Eyebrow>
        <h1
          className="font-[family-name:var(--font-display)] font-bold text-fg"
          style={{
            fontSize: "clamp(34px, 5.5vw, 68px)",
            letterSpacing: "-0.035em",
            lineHeight: 1,
          }}
        >
          Thanks. We&apos;ve got it.
        </h1>
        <p className="mt-5 text-[17px] leading-[1.55] text-mist">
          {submitted.message} You&apos;ll get an email at the address you used
          to sign up.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Progress bar */}
      <div className="m-consult-head mb-14 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <Eyebrow showDot>
          Consultation · Step {step + 1} of {steps.length}
        </Eyebrow>
        <div className="flex gap-1.5" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={steps.length}>
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-[3px] w-10 transition-colors duration-[240ms]",
                i <= step ? "bg-hot" : "bg-ash",
              )}
            />
          ))}
        </div>
      </div>

      <h1
        className="m-consult-h1 mb-4 font-[family-name:var(--font-display)] font-bold text-fg"
        style={{
          fontSize: "clamp(34px, 5.5vw, 68px)",
          letterSpacing: "-0.035em",
          lineHeight: 1,
        }}
      >
        {current.title}
      </h1>
      <p className="mb-10 max-w-[580px] text-[17px] leading-[1.55] text-mist">
        {current.sub}
      </p>

      {/* Step body */}
      {step === 0 && (
        <div className="flex max-w-[360px] flex-col gap-3">
          <Input
            value={answers.dob}
            onChange={(e) => setAnswers({ ...answers, dob: e.target.value })}
            placeholder="MM / DD / YYYY"
            aria-label="Date of birth"
            autoFocus
          />
        </div>
      )}

      {step === 1 && (
        <div className="flex max-w-[480px] flex-col gap-2.5">
          {NITRATE_OPTIONS.map((opt) => (
            <RadioOption
              key={opt}
              label={opt}
              selected={answers.nitrates === opt}
              onSelect={() => setAnswers({ ...answers, nitrates: opt })}
            />
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="flex max-w-[480px] flex-col gap-2.5">
          {HISTORY_OPTIONS.map((opt) => (
            <RadioOption
              key={opt}
              label={opt}
              selected={answers.history === opt}
              onSelect={() => setAnswers({ ...answers, history: opt })}
            />
          ))}
        </div>
      )}

      {/* Nav */}
      <div className="mt-14 flex flex-wrap items-center gap-3">
        <Button
          size="lg"
          onClick={onContinue}
          disabled={!current.canContinue || isPending}
        >
          {isPending
            ? "Submitting…"
            : isLast
              ? "Submit for review →"
              : "Continue →"}
        </Button>
        {step > 0 && (
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setStep(step - 1)}
            disabled={isPending}
          >
            ← Back
          </Button>
        )}
      </div>
    </>
  );
}
