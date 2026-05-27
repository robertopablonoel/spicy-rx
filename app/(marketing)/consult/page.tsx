import { ConsultForm } from "./_components/ConsultForm";

export const metadata = {
  title: "Consultation",
  description:
    "Private 3-minute intake. A US-licensed clinician reviews your case within 24 hours.",
};

export default function ConsultPage() {
  return (
    <section className="mx-auto max-w-[920px] px-5 pt-[110px] pb-[72px] md:px-10 md:pt-[140px] md:pb-20">
      <ConsultForm />
    </section>
  );
}
