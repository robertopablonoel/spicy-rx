import { Hero } from "@/components/marketing/Hero";
import { MoleculeRow } from "@/components/marketing/MoleculeRow";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { PullQuote } from "@/components/marketing/PullQuote";
import { Testimonials } from "@/components/marketing/Testimonials";
import { FAQ } from "@/components/marketing/FAQ";
import { AudienceChip } from "@/components/AudienceChip";

/*
 * Compliance pass 2026-06-05 (LegitScript pre-approval): Comparison
 * (onset/duration/cost-vs-retail chart) and Testimonials (patient reviews)
 * were removed — both flagged by the clinician review — and AudienceChip went
 * with /passion.
 *
 * Reinstated per Cole (2026-07-22): Testimonials (so the men's home mirrors the
 * Passion page — each line shows its own four reviews) and the AudienceChip
 * modal (now on BOTH sites, so a visitor can switch men <-> women from either).
 * Comparison stays out (not requested). COMPLIANCE: the reviews are still
 * illustrative and must clear a compliance pass before go-live.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <MoleculeRow />
      <HowItWorks />
      <PullQuote />
      <Testimonials />
      <FAQ />
      <AudienceChip current="men" />
    </>
  );
}
