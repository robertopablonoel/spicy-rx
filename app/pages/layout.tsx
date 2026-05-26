import type { ReactNode } from "react";
import { PolicyLayout } from "@/components/PolicyLayout";

export default function PagesLayout({ children }: { children: ReactNode }) {
  return <PolicyLayout>{children}</PolicyLayout>;
}
