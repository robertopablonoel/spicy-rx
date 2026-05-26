import type { Metadata } from "next";
import { headers } from "next/headers";
import { ProductImage } from "@/components/ProductImage";
import { PackSelector } from "@/components/PackSelector";
import { CTAButton } from "@/components/CTAButton";
import { StepCard } from "@/components/StepCard";
import { Separator } from "@/components/ui/separator";
import { PRODUCT_NAME, STATE_HEADER } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${PRODUCT_NAME} — SpicyRx`,
  description:
    "Hot Sauce — sublingual ED medication prescribed online by licensed clinicians.",
};

const consultationSteps = [
  {
    step: 1,
    title: "Online consultation",
    description:
      "Complete a brief medical questionnaire. A licensed clinician reviews your answers — usually within one business day.",
  },
  {
    step: 2,
    title: "Prescription review",
    description:
      "If Hot Sauce is appropriate, your clinician issues a prescription through our partner pharmacy. You only pay if you're prescribed.",
  },
  {
    step: 3,
    title: "Discreet delivery",
    description:
      "Your medication ships in plain packaging. Refills and ongoing care are managed through your patient portal.",
  },
];

/* MEDICAL CLAIM: review — placeholder language only. Final copy
   requires Rimo medical-counsel review before launch. */
const eligibilityNotes = [
  "Hot Sauce is a prescription medication and is not appropriate for everyone.",
  "The consultation process screens for contraindications, including nitrate use and certain cardiovascular conditions.",
  "Final eligibility is determined by your reviewing clinician.",
  "If Hot Sauce isn't right for you, your clinician may recommend alternatives or decline to prescribe.",
];

export default async function HotSaucePage() {
  const h = await headers();
  const userState = h.get(STATE_HEADER);

  return (
    <>
      {/* ABOVE THE FOLD — PDP buy area */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:px-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <a href="/" className="hover:text-foreground">
              SpicyRx
            </a>{" "}
            · Hot Sauce
          </p>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Product image */}
            <div>
              <ProductImage />
            </div>

            {/* Title + buy area */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                  Prescription required
                </span>
                <h1 className="mt-4 text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
                  Hot Sauce
                </h1>
                <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                  Sublingual ED medication. Placed under the tongue, designed
                  for a different onset profile than swallowed tablets.{" "}
                  <em>
                    Prescribed online, delivered discreetly.
                  </em>
                </p>
              </div>

              <Separator />

              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                  Choose your supply
                </p>
                <PackSelector userState={userState} />
              </div>

              {/* Trust micro-row */}
              <ul className="grid grid-cols-1 gap-2 pt-2 text-xs text-muted-foreground sm:grid-cols-2">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  Licensed clinician review for every order
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  Discreet packaging, no branding on box
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  HIPAA-compliant intake
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  No insurance forms
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="mb-12 flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              How it works
            </p>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              From consultation to delivery, online.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {consultationSteps.map((s) => (
              <StepCard
                key={s.step}
                step={s.step}
                title={s.title}
                description={s.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Eligibility
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Is Hot Sauce right for you?
          </h2>
          {/* MEDICAL CLAIM: review */}
          <ul className="mt-8 space-y-4">
            {eligibilityNotes.map((note, i) => (
              <li
                key={i}
                className="flex items-start gap-3 leading-relaxed text-foreground/90"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">
            See the{" "}
            <a
              href="/pages/telehealth-consent"
              className="font-medium text-primary underline underline-offset-4 hover:text-accent"
            >
              telehealth consent
            </a>{" "}
            and{" "}
            <a
              href="/faq"
              className="font-medium text-primary underline underline-offset-4 hover:text-accent"
            >
              full FAQ
            </a>{" "}
            for more details.
          </p>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Ready to start?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Begin with an online consultation. A licensed clinician reviews
            your case — typically within one business day.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton location="hot_sauce_pdp_bottom" label="Start consultation" />
          </div>
        </div>
      </section>
    </>
  );
}
