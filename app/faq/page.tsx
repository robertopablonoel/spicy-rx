import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CTAButton } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "FAQ — SpicyRx",
  description:
    "Frequently asked questions about Quattro and the SpicyRx process.",
};

/* MEDICAL CLAIM: review — these answers are placeholders. Final copy
   requires Rimo medical-counsel review before launch. */
const faqs = [
  {
    q: "What is Quattro?",
    a: "Quattro is a sublingual ED medication — a tablet placed under the tongue rather than swallowed. Final indications and dosing are determined by the prescribing clinician.",
  },
  {
    q: "Do I need to visit a clinic?",
    a: "No. The consultation happens online. A licensed clinician reviews your medical questionnaire and, if appropriate, issues a prescription.",
  },
  {
    q: "How long until it ships?",
    a: "Most prescriptions ship within a few business days of clinician approval. Exact timing depends on your state and the partner pharmacy.",
  },
  {
    q: "Is my information private?",
    a: "Yes. We follow HIPAA standards for protected health information. See our Privacy Policy for full details on what we collect and how it's used.",
  },
  {
    q: "What if Quattro isn't right for me?",
    a: "If the clinician determines Quattro isn't appropriate, you won't be charged for the medication. Consultation fees, if any, are disclosed before you submit.",
  },
  {
    q: "Where do you operate?",
    a: "Availability varies by state. See our Compliance page for the current list. We're actively working to expand.",
  },
];

export default function FaqPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        FAQ
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Frequently asked questions
      </h1>

      <Accordion className="mt-12 w-full">
        {faqs.map((item, i) => (
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

      <div className="mt-16">
        <CTAButton location="faq_bottom" />
      </div>
    </article>
  );
}
