import { Hero } from "@/components/eros/Hero";
import { IngredientRow } from "@/components/eros/IngredientRow";
import { HowItWorks } from "@/components/eros/HowItWorks";
import { PullQuote } from "@/components/eros/PullQuote";
import { FAQ } from "@/components/eros/FAQ";

/**
 * Eros landing page (3-in-1 sublingual elixir): Hero → body+brain split →
 * how-it-works → pull-quote → FAQ, themed lapis blue + cyan and voiced in the
 * classical, elevated Eros register from mockups/eros-main.html. No pricing on
 * the marketing page — prices appear only inside the Rimo intake funnel.
 *
 * AudienceChip is intentionally NOT rendered (it hard-codes men/women and is
 * out of scope for this line).
 */
export default function ErosHomePage() {
  return (
    <>
      <Hero />
      <IngredientRow />
      <HowItWorks />
      <PullQuote />
      <FAQ />
    </>
  );
}
