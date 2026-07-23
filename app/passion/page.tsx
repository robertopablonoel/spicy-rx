import { Hero } from "@/components/passion/Hero";
import { IngredientRow } from "@/components/passion/IngredientRow";
import { HowItWorks } from "@/components/passion/HowItWorks";
import { PullQuote } from "@/components/passion/PullQuote";
import { Testimonials } from "@/components/passion/Testimonials";
import { FAQ } from "@/components/passion/FAQ";
import { AudienceChip } from "@/components/AudienceChip";

/**
 * Passion landing page (PT-141 injectable): Hero → what's-inside → how-it-works
 * → pull-quote → testimonials → FAQ, themed plasma pink and voiced for women.
 * No pricing on the marketing page — prices appear only inside the Rimo intake
 * funnel (Cole's call).
 *
 * 2026-07-23 (Cole): the "daily pill" comparison table was removed entirely.
 * The Passion testimonials remain for launch (Cole's call — kept simple to
 * start); outcome-adjacent body copy is intentionally left as-is for now. Rimo
 * PT-141 channel (pt-89gox1) is provisioned + activated.
 */
export default function PassionHomePage() {
  return (
    <>
      <Hero />
      <IngredientRow />
      <HowItWorks />
      <PullQuote />
      <Testimonials />
      <FAQ />
      <AudienceChip current="women" />
    </>
  );
}
