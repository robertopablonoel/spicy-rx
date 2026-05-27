import { Hero } from "@/components/marketing/Hero";
import { MoleculeRow } from "@/components/marketing/MoleculeRow";
import { Comparison } from "@/components/marketing/Comparison";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { PullQuote } from "@/components/marketing/PullQuote";
import { Testimonials } from "@/components/marketing/Testimonials";
import { FAQ } from "@/components/marketing/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MoleculeRow />
      <Comparison />
      <HowItWorks />
      <PullQuote />
      <Testimonials />
      <FAQ />
    </>
  );
}
