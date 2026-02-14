"use client";

import { motion } from "motion/react";
import { RevealText } from "@/components/effects/text-effects";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { useContent } from "@/lib/content-ctx";
import { spring, STAGGER, T_HERO } from "@/lib/motion";

/*
 * All hero delays offset from T_HERO so the page choreography
 * flows:  navbar items → border → headline → separator → gallery
 */
const T = T_HERO;

/* ────────────────────────────────────────────────────
 *  Hero section
 * ──────────────────────────────────────────────────── */
export function Hero() {
  const { hero } = useContent();

  return (
    <section className="pt-28" aria-label="Hero">
      <div className="mx-auto max-w-[1400px] px-10">
        {/* ── Text area: headline left + info right ── */}
        <div className="grid grid-cols-[1fr_320px] gap-14 pb-10">
          {/* Left — Headline */}
          <div className="pt-4">
            <h1 className="font-serif text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] tracking-[-0.015em] font-normal">
              <span className="block">
                <RevealText text={hero.headline.line1} delay={T} />
              </span>
              <span className="block">
                <RevealText
                  text={hero.headline.line2}
                  delay={T + STAGGER * 3}
                />{" "}
                <RevealText
                  text={hero.headline.line2Italic}
                  delay={T + STAGGER * 5}
                  className="italic"
                />
              </span>
            </h1>
          </div>

          {/* Right — Info column */}
          <div className="flex flex-col justify-between py-4">
            {/* Location — top right */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: T + 0.35 }}
              className="text-xs uppercase tracking-[0.12em] text-deep-black/40 text-right"
            >
              {hero.location}
            </motion.div>

            {/* Description — bottom right */}
            <div className="flex flex-col gap-5">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: T + 0.45 }}
                className="text-sm leading-[1.7] text-deep-black/55"
              >
                {hero.description}
              </motion.p>
            </div>
          </div>
        </div>

        {/* ── Project gallery — three expandable panels ── */}
        <ProjectGallery />
      </div>
    </section>
  );
}
