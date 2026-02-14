"use client";

import { motion } from "motion/react";
import { springGentle, STAGGER } from "@/lib/motion";

/* ────────────────────────────────────────────────────
 * RevealText
 *
 * Word-by-word clip-mask reveal.  Each word slides up
 * from behind an overflow-hidden wrapper using a shared
 * spring so every headline on the site feels identical.
 * ──────────────────────────────────────────────────── */

interface RevealTextProps {
  /** The text string to reveal word-by-word. */
  text: string;
  /** Extra Tailwind classes (e.g. "italic"). */
  className?: string;
  /** Base delay before the first word appears (seconds). */
  delay?: number;
  /** Delay between consecutive words (defaults to STAGGER). */
  wordGap?: number;
}

export function RevealText({
  text,
  className,
  delay = 0,
  wordGap = STAGGER,
}: RevealTextProps) {
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.28em] last:mr-0 pb-[0.12em]"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              ...springGentle,
              delay: delay + i * wordGap,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
