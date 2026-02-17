"use client";

import { motion } from "motion/react";
import { spring, springGentle, STAGGER, T_HERO } from "@/lib/motion";
import { ContactFormFields } from "@/components/sections/ContactFormFields";

const T = T_HERO;

export function ContactForm() {
  return (
    <main className="min-h-[80vh] flex items-center">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-20 lg:py-32 w-full">
        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-20 xl:gap-28 lg:items-start">
          {/* ── Left: Headline + description ── */}
          <div className="max-w-[520px] mb-14 lg:mb-0">
            <motion.span
              className="text-[13px] uppercase tracking-widest text-drift block mb-6 lg:mb-8"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: T }}
            >
              Contact Us
            </motion.span>

            <h1 className="font-serif text-[clamp(2.4rem,10vw,4.2rem)] leading-none tracking-[-0.02em] text-ink mb-2">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springGentle, delay: T + STAGGER * 2 }}
              >
                Let&rsquo;s Build
              </motion.span>
              <motion.span
                className="block italic"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springGentle, delay: T + STAGGER * 5 }}
              >
                Together
              </motion.span>
            </h1>

            <motion.div
              className="w-16 h-px bg-bronze my-8 lg:my-10 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ ...spring, delay: T + 0.35 }}
            />

            <motion.p
              className="text-[15px] lg:text-base leading-[1.8] text-stone max-w-[440px]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: T + 0.4 }}
            >
              Whether it&rsquo;s a home, a cafe, or a commercial space &mdash;
              share your details and we&rsquo;ll reach out to discuss your
              vision.
            </motion.p>
          </div>

          {/* ── Right: Form ── */}
          <motion.div
            className="max-w-[480px] lg:max-w-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springGentle, delay: T + 0.3 }}
          >
            <ContactFormFields theme="light" />
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
            <motion.line
              x1="100" y1="0" x2="100" y2="280"
              stroke="currentColor"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: T + 0.4, ease: "easeInOut" }}
            />
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
