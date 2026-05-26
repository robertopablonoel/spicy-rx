import type { ReactNode } from "react";

/**
 * Shared wrapper for compliance / policy pages.
 *
 * Centers the content, caps width for readability, applies vertical spacing.
 * The MDX components (see mdx-components.tsx) handle typography inside the
 * children container; this component handles only the page-level container.
 */
export function PolicyLayout({ children }: { children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24 lg:px-8">
      {children}
    </article>
  );
}
