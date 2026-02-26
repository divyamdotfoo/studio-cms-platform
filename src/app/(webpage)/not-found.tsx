"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { spring, springGentle, STAGGER, T_HERO } from "@/lib/motion";

/* ────────────────────────────────────────────────────
 * 404 — Not Found
 *
 * Big typographic "404" with staggered character
 * entrance, floating parallax letters, and an
 * animated architectural grid behind them.
 *
 * Palette: ink, stone, drift, bronze, sand, cream
 * ──────────────────────────────────────────────────── */

const T = T_HERO;

/* Characters of "404" animated individually */
const CHARS = ["4", "0", "4"];

export default function NotFound() {
  return (
    <main className="min-h-[85vh] flex items-center justify-center relative overflow-hidden">
      {/* ── Background grid — architectural blueprint ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <svg
          width="600"
          height="600"
          viewBox="0 0 600 600"
          fill="none"
          className="text-sand/50 w-[90vw] h-[90vw] max-w-[600px] max-h-[600px]"
        >
          {/* Outer frame */}
          <motion.rect
            x="50"
            y="50"
            width="500"
            height="500"
            stroke="currentColor"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, delay: T + 0.2, ease: "easeInOut" }}
          />
          {/* Inner frame */}
          <motion.rect
            x="120"
            y="120"
            width="360"
            height="360"
            stroke="currentColor"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: T + 0.5, ease: "easeInOut" }}
          />
          {/* Cross lines */}
          <motion.line
            x1="50"
            y1="300"
            x2="550"
            y2="300"
            stroke="currentColor"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: T + 0.8, ease: "easeInOut" }}
          />
          <motion.line
            x1="300"
            y1="50"
            x2="300"
            y2="550"
            stroke="currentColor"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: T + 0.9, ease: "easeInOut" }}
          />
          {/* Diagonal */}
          <motion.line
            x1="50"
            y1="50"
            x2="550"
            y2="550"
            stroke="currentColor"
            strokeWidth="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: T + 1.0, ease: "easeInOut" }}
          />
          {/* Corner markers */}
          {[
            "M 50 80 L 50 50 L 80 50",
            "M 520 50 L 550 50 L 550 80",
            "M 550 520 L 550 550 L 520 550",
            "M 80 550 L 50 550 L 50 520",
          ].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 0.8,
                delay: T + 1.2 + i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
          {/* Center circle */}
          <motion.circle
            cx="300"
            cy="300"
            r="30"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: T + 1.0, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 text-center px-5">
        {/* Label */}
        <motion.span
          className="text-[13px] uppercase tracking-widest text-drift block mb-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: T }}
        >
          Page not found
        </motion.span>

        {/* Big "404" — each character animates separately */}
        <div className="flex items-center justify-center gap-2 lg:gap-4 mb-6 lg:mb-8">
          {CHARS.map((char, i) => (
            <motion.span
              key={i}
              className="font-serif text-[clamp(5rem,20vw,12rem)] leading-none tracking-tight text-ink"
              initial={{
                opacity: 0,
                y: 60,
                rotate: i === 1 ? 0 : i === 0 ? -6 : 6,
              }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: 0,
              }}
              transition={{
                ...springGentle,
                delay: T + 0.1 + i * STAGGER * 3,
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Bronze accent */}
        <motion.div
          className="w-12 h-px bg-bronze mx-auto mb-6 lg:mb-8 origin-center"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ ...spring, delay: T + 0.35 }}
        />

        {/* Message */}
        <motion.p
          className="text-[15px] lg:text-base leading-[1.8] text-stone max-w-[400px] mx-auto mb-8 lg:mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: T + 0.4 }}
        >
          It looks like you&apos;ve reached a page that doesn&apos;t exist — or
          it may have been removed.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: T + 0.5 }}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest text-ink"
          >
            <ArrowUpRight className="w-4 h-4 text-drift transition-colors group-hover:text-ink rotate-180" />
            <motion.span
              className="inline-block w-8 h-px bg-ink origin-right"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ ...spring, delay: T + 0.55 }}
            />
            Take me Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
