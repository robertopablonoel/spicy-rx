import { Hero } from "@/components/passion/Hero";
import { IngredientRow } from "@/components/passion/IngredientRow";
import { HowItWorks } from "@/components/passion/HowItWorks";
import { PullQuote } from "@/components/passion/PullQuote";
import { FAQ } from "@/components/passion/FAQ";
import { AudienceChip } from "@/components/AudienceChip";

/**
 * Passion landing page (PT-141 injectable): Hero → what's-inside → how-it-works
 * → pull-quote → FAQ, themed plasma pink and voiced for women. No pricing on the
 * marketing page — prices appear only inside the Rimo intake funnel (Cole's call).
 *
 * 2026-07-23 (Cole): the "daily pill" comparison table AND the testimonials /
 * reviews section were both removed entirely. Outcome-adjacent body copy is
 * intentionally left as-is for now. Rimo PT-141 channel (pt-89gox1) is
 * provisioned + activated.
 */
export default function PassionHomePage() {
  return (
    <>
      <Hero />
      <IngredientRow />
      <HowItWorks />
      <PullQuote />
      <FAQ />
      <AudienceChip current="women" />
    </>
  );
}
