import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CTAButton } from "@/components/CTAButton";
import { PRODUCT_NAME } from "@/lib/constants";

/**
 * Hot Sauce product card — homepage feature.
 * Routes to /products/quattro for the detail page.
 */
export function ProductCard() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">{PRODUCT_NAME}</CardTitle>
        <CardDescription>
          Sublingual ED treatment. Under-the-tongue tablet. Prescribed online.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-6">
        <ul className="space-y-2 text-sm text-foreground/80">
          <li>• Sublingual onset (faster than swallowed tablets)</li>
          <li>• Licensed clinician review for every order</li>
          <li>• Discreet shipping</li>
        </ul>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CTAButton location="product_card" />
          <Link
            href="/products/hot-sauce"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            Learn more
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
