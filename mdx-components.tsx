import type { MDXComponents } from "mdx/types";

/**
 * Root MDX components. Required by Next.js App Router to render `.mdx` pages.
 *
 * Applies consistent typography for compliance / policy pages without
 * forcing every MDX file to import a wrapper. We rely on Tailwind utilities
 * applied at the page wrapper level (see PolicyLayout) for spacing; here we
 * only normalize semantic elements.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1
        className="mt-0 mb-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="mt-12 mb-4 text-2xl font-semibold tracking-tight text-foreground"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="mt-8 mb-3 text-xl font-semibold text-foreground"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="my-4 leading-7 text-foreground/90" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="my-4 ml-6 list-disc space-y-2 text-foreground/90" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-4 ml-6 list-decimal space-y-2 text-foreground/90" {...props}>
        {children}
      </ol>
    ),
    a: ({ children, ...props }) => (
      <a
        className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
        {...props}
      >
        {children}
      </a>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-foreground" {...props}>
        {children}
      </strong>
    ),
    hr: () => <hr className="my-8 border-border" />,
    ...components,
  };
}
