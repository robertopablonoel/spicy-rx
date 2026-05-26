import type { Metadata } from "next";
import { StepCard } from "@/components/StepCard";
import { CTAButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "How it works — SpicyRx",
  description:
    "Three steps from consultation to delivery. No clinic visits, no insurance hassle.",
};

const steps = [
  {
    step: 1,
    title: "Online consultation",
    description:
      "Answer a short medical questionnaire. A licensed clinician reviews your responses — usually within one business day.",
  },
  {
    step: 2,
    title: "Prescription review",
    description:
      "If Quattro is appropriate for you, your clinician issues a prescription through our partner pharmacy. You only pay if you're prescribed.",
  },
  {
    step: 3,
    title: "Discreet delivery",
    description:
      "Your medication ships in plain packaging. Ongoing care and refills are managed through your patient portal.",
  },
];

export default function HowItWorksPage() {
  return (
    <article className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        How it works
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Three steps from consultation to delivery.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        No clinic visits. No insurance forms. Care happens online.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
        {steps.map((s) => (
          <StepCard
            key={s.step}
            step={s.step}
            title={s.title}
            description={s.description}
          />
        ))}
      </div>

      <div className="mt-16">
        <CTAButton location="how_it_works_bottom" />
      </div>
    </article>
  );
}
