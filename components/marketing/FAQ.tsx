"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FAQS } from "@/lib/content";

/**
 * Single-open accordion. Hairline ash dividers between rows.
 * + glyph rotates 45deg → × via Framer Motion when the row is open.
 * Body animates in via height + opacity for a clean reveal.
 */
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="mx-auto max-w-[1080px] px-5 py-[72px] md:px-10 md:py-[120px]"
    >
      <Eyebrow className="mb-4">Frequently asked</Eyebrow>
      <h2
        className="mb-12 font-[family-name:var(--font-display)] font-bold text-fg md:mb-14"
        style={{
          fontSize: "clamp(34px, 5.5vw, 68px)",
          letterSpacing: "-0.035em",
          lineHeight: 1,
        }}
      >
        Your questions,{" "}
        <span className="font-[family-name:var(--font-editorial)] italic font-normal text-ember">
          answered.
        </span>
      </h2>

      <div className="border-t border-ash">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="border-b border-ash">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span
                  className="font-[family-name:var(--font-display)] font-medium text-fg"
                  style={{
                    fontSize: 22,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {f.q}
                </span>
                <motion.span
                  aria-hidden
                  animate={{ rotate: isOpen ? 45 : 0, color: isOpen ? "var(--ember)" : "var(--fog)" }}
                  transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
                  className="inline-block shrink-0 font-[family-name:var(--font-mono)] text-[18px]"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-7 max-w-[760px] text-[16px] leading-[1.55] text-mist">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
