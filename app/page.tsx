import Link from "next/link";
import { Hero } from "@/components/Hero";
import { StepCard } from "@/components/StepCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const previewSteps = [
  {
    step: 1,
    title: "Online consultation",
    description:
      "Short medical questionnaire reviewed by a licensed clinician — usually within one business day.",
  },
  {
    step: 2,
    title: "Prescription review",
    description:
      "If Hot Sauce is appropriate, your clinician issues a prescription. You only pay if you're prescribed.",
  },
  {
    step: 3,
    title: "Discreet delivery",
    description:
      "Your medication ships in plain packaging. Refills are managed through your patient portal.",
  },
];

/* MEDICAL CLAIM: review — placeholder copy. Final answers require Rimo
   medical-counsel review before launch. */
const previewFaqs = [
  {
    q: "Do I need to visit a clinic?",
    a: "No. The consultation happens online. A licensed clinician reviews your questionnaire and, if appropriate, issues a prescription.",
  },
  {
    q: "How long until it ships?",
    a: "Most prescriptions ship within a few business days of clinician approval. Exact timing depends on your state and the partner pharmacy.",
  },
  {
    q: "Is my information private?",
    a: "Yes. We follow HIPAA standards for protected health information. See our Privacy Policy for the full breakdown.",
  },
  {
    q: "What if Hot Sauce isn't right for me?",
    a: "If the clinician determines Hot Sauce isn't appropriate, you won't be charged for the medication. Consultation fees, if any, are disclosed before you submit.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

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
            {previewSteps.map((s) => (
              <StepCard
                key={s.step}
                step={s.step}
                title={s.title}
                description={s.description}
              />
            ))}
          </div>
          <div className="mt-12">
            <Link
              href="/how-it-works"
              className="text-sm font-medium text-primary underline underline-offset-4 hover:text-accent"
            >
              Read the full process →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
          <div className="mb-8 flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              FAQ
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Common questions
            </h2>
          </div>
          <Accordion className="w-full">
            {previewFaqs.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-foreground/80">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8">
            <Link
              href="/faq"
              className="text-sm font-medium text-primary underline underline-offset-4 hover:text-accent"
            >
              See all FAQs →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
