"use client";

import { motion } from "motion/react";
import { RevealText } from "@/components/effects/text-effects";
import { useContent } from "@/lib/content-ctx";
import { spring, STAGGER, T_HERO } from "@/lib/motion";

const T = T_HERO;

/* ────────────────────────────────────────────────────
 *  Hero section
 *
 *  Mobile:  location → headline → description (stacked)
 *  Desktop: headline left | location + description right
 * ──────────────────────────────────────────────────── */
export function Hero() {
  const { homepage, meta } = useContent();

  return (
    <section className="pt-20 lg:pt-28" aria-label="Hero">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        {/* ── Text area ── */}
        <div className="pb-8 lg:pb-10">
          {/* Location — mobile only (above headline) */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: T }}
            className="lg:hidden text-[13px] uppercase tracking-[0.12em] text-drift mb-5"
          >
            {meta.headquartersLocation}
          </motion.div>

          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-14">
            {/* Left — Headline */}
            <div className="lg:pt-4">
              <h1 className="font-serif text-[clamp(2.2rem,10vw,3.2rem)] lg:text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] tracking-[-0.015em] font-normal text-ink">
                <span className="block">
                  <RevealText text={homepage.heroHeadlinePartOne} delay={T} />
                </span>
                <span className="block">
                  <RevealText
                    text={homepage.heroHeadlinePartTwo}
                    delay={T + STAGGER * 3}
                  />
                </span>
              </h1>
            </div>

            {/* Right — Info column */}
            <div className="flex flex-col justify-between lg:py-4 mt-6 lg:mt-0">
              {/* Location — desktop only */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: T + 0.35 }}
                className="hidden lg:block text-[13px] uppercase tracking-[0.12em] text-drift text-right"
              >
                {meta.headquartersLocation}
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: T + 0.45 }}
                className="text-[15px] leading-[1.75] text-stone"
              >
                {homepage.heroDescription}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
