import { Hero } from "@/components/passion/Hero";
import { IngredientRow } from "@/components/passion/IngredientRow";
import { Comparison } from "@/components/passion/Comparison";
import { HowItWorks } from "@/components/passion/HowItWorks";
import { PullQuote } from "@/components/passion/PullQuote";
import { Testimonials } from "@/components/passion/Testimonials";
import { FAQ } from "@/components/passion/FAQ";
import { AudienceChip } from "@/components/AudienceChip";

/**
 * Passion landing page — same section rhythm as the Hot Sauce home page
 * (Hero → ingredients → comparison → how-it-works → pull-quote →
 * testimonials → FAQ), themed plasma pink and voiced for women.
 */
export default function PassionHomePage() {
  return (
    <>
      <Hero />
      <IngredientRow />
      <Comparison />
      <HowItWorks />
      <PullQuote />
      <Testimonials />
      <FAQ />
      <AudienceChip current="women" />
    </>
  );
}
