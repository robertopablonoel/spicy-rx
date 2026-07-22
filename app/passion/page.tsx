import { Hero } from "@/components/passion/Hero";
import { IngredientRow } from "@/components/passion/IngredientRow";
import { Comparison } from "@/components/passion/Comparison";
import { HowItWorks } from "@/components/passion/HowItWorks";
import { Pricing } from "@/components/passion/Pricing";
import { PullQuote } from "@/components/passion/PullQuote";
import { Testimonials } from "@/components/passion/Testimonials";
import { FAQ } from "@/components/passion/FAQ";
import { AudienceChip } from "@/components/AudienceChip";

/**
 * Passion landing page (PT-141 injectable) — same section rhythm as the Hot
 * Sauce home page (Hero → how-it-works → comparison → pricing → pull-quote →
 * testimonials → FAQ), themed plasma pink and voiced for women.
 *
 * NOTE (pre-go-live): the page was previously taken offline for the LegitScript
 * pass. The reskin restores the structure but reintroduces the same claim
 * classes the clinician flagged (outcome-adjacent copy, a "daily pill"
 * comparison, illustrative testimonials + a review count). Those must clear a
 * compliance pass — and the PT-141 Rimo sales channel must be provisioned +
 * activated — before this ships. Intentionally unpushed; Cole gates go-live.
 */
export default function PassionHomePage() {
  return (
    <>
      <Hero />
      <IngredientRow />
      <Comparison />
      <HowItWorks />
      <Pricing />
      <PullQuote />
      <Testimonials />
      <FAQ />
      <AudienceChip current="women" />
    </>
  );
}
