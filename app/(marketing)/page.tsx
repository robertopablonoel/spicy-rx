import { Hero } from "@/components/marketing/Hero";
import { MoleculeRow } from "@/components/marketing/MoleculeRow";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { PullQuote } from "@/components/marketing/PullQuote";
import { FAQ } from "@/components/marketing/FAQ";

/*
 * Compliance pass 2026-06-05 (LegitScript pre-approval): Comparison
 * (onset/duration/cost-vs-retail chart) and Testimonials (patient
 * reviews) removed — both flagged by the clinician review. AudienceChip
 * removed with /passion (its "women" toggle routed there). Recover all
 * from git history for post-approval consideration.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <MoleculeRow />
      <HowItWorks />
      <PullQuote />
      <FAQ />
    </>
  );
}
