import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

/**
 * Renders one of the markdown documents under /compliance/ as a Spicy Alien
 * legal page. Server component — reads from disk at build/request time and
 * maps each markdown element to a styled DOM node using design-system tokens.
 *
 * The first blockquote in every file is the "Draft — pending legal review"
 * banner; it gets the heat-accent callout treatment.
 */
export interface LegalPageProps {
  /** File name inside /compliance/, including .md extension. */
  file: string;
}

const COMPLIANCE_DIR = path.join(process.cwd(), "compliance");

async function readPolicy(file: string): Promise<string> {
  try {
    return await fs.readFile(path.join(COMPLIANCE_DIR, file), "utf-8");
  } catch {
    notFound();
  }
}

/**
 * Map every markdown tag to a token-styled component. Anything missing here
 * falls back to react-markdown's default DOM element with no styling.
 */
const components: Components = {
  h1: ({ children }) => (
    <h1
      className="mt-0 mb-8 font-[family-name:var(--font-display)] font-bold text-fg"
      style={{
        fontSize: "clamp(40px, 6vw, 72px)",
        letterSpacing: "-0.035em",
        lineHeight: 1,
      }}
    >
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2
      className="mt-14 mb-5 font-[family-name:var(--font-display)] font-semibold text-fg"
      style={{
        fontSize: "clamp(24px, 3vw, 32px)",
        letterSpacing: "-0.025em",
        lineHeight: 1.1,
      }}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      className="mt-9 mb-3 font-[family-name:var(--font-display)] font-semibold text-fg"
      style={{
        fontSize: 22,
        letterSpacing: "-0.02em",
        lineHeight: 1.15,
      }}
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-4 text-[16px] leading-[1.65] text-mist md:text-[17px]">
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-ember underline decoration-ember/40 underline-offset-4 transition-colors hover:decoration-ember"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-fg">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-fg">{children}</em>,
  ul: ({ children }) => (
    <ul className="my-5 ml-5 list-disc space-y-2 text-mist marker:text-ember">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-5 ml-5 list-decimal space-y-2 text-mist marker:text-ember">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-[16px] leading-[1.6] md:text-[17px]">{children}</li>
  ),
  /**
   * "Draft — pending legal review" callout. The compliance markdown files
   * use a blockquote as the very first body element to flag draft status,
   * so styling it as a heat-accent callout is the right default.
   */
  blockquote: ({ children }) => (
    <div
      className="my-8 border-l-2 border-hot bg-hot/[0.06] px-5 py-4 text-[14px] leading-[1.55] text-fg md:text-[15px]"
      role="note"
    >
      {children}
    </div>
  ),
  hr: () => <hr className="my-10 border-ash" />,
  code: ({ children }) => (
    <code className="rounded-sm bg-cosmos px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[0.9em] text-ember">
      {children}
    </code>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse border border-ash">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-ash bg-cosmos px-3.5 py-2 text-left font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-ember">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-ash px-3.5 py-2 text-[14px] text-mist">
      {children}
    </td>
  ),
};

export async function LegalPage({ file }: LegalPageProps) {
  const source = await readPolicy(file);
  return (
    <article className="mx-auto max-w-[760px] px-5 pt-[110px] pb-[72px] md:px-10 md:pt-[140px] md:pb-20">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {source}
      </Markdown>
    </article>
  );
}
