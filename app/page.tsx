import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
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
      "Short medical questionnaire reviewed by a licensed clinician.",
  },
  {
    step: 2,
    title: "Prescription review",
    description:
      "If appropriate, your clinician issues a prescription. You only pay if you're prescribed.",
  },
  {
    step: 3,
    title: "Discreet delivery",
    description: "Your medication ships in plain packaging.",
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
    a: "Most prescriptions ship within a few business days of clinician approval.",
  },
  {
    q: "Is my information private?",
    a: "Yes. We follow HIPAA standards for protected health information. See our Privacy Policy for details.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="mb-12 flex flex-col gap-4">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              The product
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              One medication. Designed for clarity.
            </h2>
          </div>
          <div className="max-w-md">
            <ProductCard />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="mb-12 flex flex-col gap-4">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              How it works
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Three steps from consultation to delivery.
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
              className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
            >
              Read the full process →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
          <div className="mb-8 flex flex-col gap-4">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
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
              className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
            >
              See all FAQs →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
