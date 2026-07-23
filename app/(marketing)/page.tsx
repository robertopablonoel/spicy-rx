import { Hero } from "@/components/marketing/Hero";
import { MoleculeRow } from "@/components/marketing/MoleculeRow";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { PullQuote } from "@/components/marketing/PullQuote";
import { FAQ } from "@/components/marketing/FAQ";
import { AudienceChip } from "@/components/AudienceChip";

/*
 * Compliance pass 2026-06-05 (LegitScript pre-approval): Comparison
 * (onset/duration/cost-vs-retail chart) and Testimonials (patient reviews)
 * were removed — both flagged by the clinician review.
 *
 * 2026-07-23 (Cole): only the AudienceChip modal is (re)added on the men's site
 * — so a visitor can switch men <-> women from either line. Testimonials stay
 * OUT on the men's page (the fabricated quotes are not going live); the men's
 * home keeps just its nav + the audience modal.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <MoleculeRow />
      <HowItWorks />
      <PullQuote />
      <FAQ />
      <AudienceChip current="men" />
    </>
  );
}
