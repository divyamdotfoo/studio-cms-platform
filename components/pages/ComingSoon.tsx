"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { spring, springGentle, STAGGER, T_HERO } from "@/lib/motion";

/* ────────────────────────────────────────────────────
 * ComingSoon — placeholder page for routes under
 * construction.  Animated typography + subtle
 * architectural line drawing.
 *
 * Palette: ink, stone, drift, bronze, sand, cream
 * ──────────────────────────────────────────────────── */

const T = T_HERO;

interface Props {
  /** Page title shown as small label (e.g. "Projects") */
  title: string;
}

export function ComingSoon({ title }: Props) {
  return (
    <main className="min-h-[80vh] flex items-center">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-20 lg:py-32 w-full">
        <div className="max-w-[720px]">
          {/* Label */}
          <motion.span
            className="text-[13px] uppercase tracking-widest text-drift block mb-6 lg:mb-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: T }}
          >
            {title}
          </motion.span>

          {/* Headline */}
          <h1 className="font-serif text-[clamp(2.4rem,10vw,5rem)] leading-none tracking-[-0.02em] text-ink mb-2">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springGentle, delay: T + STAGGER * 2 }}
            >
              Coming
            </motion.span>
            <motion.span
              className="block italic"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springGentle, delay: T + STAGGER * 5 }}
            >
              Soon
            </motion.span>
          </h1>

          {/* Bronze accent line — draws in */}
          <motion.div
            className="w-16 h-px bg-bronze my-8 lg:my-10 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ ...spring, delay: T + 0.35 }}
          />

          {/* Description */}
          <motion.p
            className="text-[15px] lg:text-base leading-[1.8] text-stone max-w-[480px] mb-8 lg:mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: T + 0.4 }}
          >
            Iss page pe kuch khaas aa raha hai. Hum abhi isko bana rahe hain —
            jaldi aayega. Tab tak, baaki site zaroor dekhein.
          </motion.p>

          {/* CTA — back to home */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: T + 0.5 }}
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest text-ink"
            >
              <motion.span
                className="inline-block w-8 h-px bg-ink origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ ...spring, delay: T + 0.55 }}
              />
              Home pe chalein
              <svg
                className="w-4 h-4 text-drift transition-colors group-hover:text-ink"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* ── Decorative architectural lines ── */}
        <motion.div
          className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...spring, delay: T + 0.3 }}
          aria-hidden
        >
          <svg
            width="200"
            height="280"
            viewBox="0 0 200 280"
            fill="none"
            className="text-sand"
          >
            {/* Vertical line */}
            <motion.line
              x1="100" y1="0" x2="100" y2="280"
              stroke="currentColor"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: T + 0.4, ease: "easeInOut" }}
            />
            {/* Horizontal cross lines */}
            {[40, 100, 160, 220].map((cy, i) => (
              <motion.line
                key={cy}
                x1="60" y1={cy} x2="140" y2={cy}
                stroke="currentColor"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1,
                  delay: T + 0.6 + i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
            {/* Corner angles — blueprint feel */}
            <motion.path
              d="M 70 30 L 70 50 L 90 50"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: T + 0.8, ease: "easeInOut" }}
            />
            <motion.path
              d="M 130 230 L 130 250 L 110 250"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: T + 0.9, ease: "easeInOut" }}
            />
            {/* Small circle — reference point */}
            <motion.circle
              cx="100" cy="140"
              r="4"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: T + 1.1, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </div>
    </main>
  );
}
