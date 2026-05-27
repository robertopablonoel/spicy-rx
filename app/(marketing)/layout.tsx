import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

/**
 * Marketing route group layout. Provides Navbar + Footer for every page
 * in this group (/, /science, /consult). Routes outside this group
 * (e.g. compliance pages, when they come back) get a different shell.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
