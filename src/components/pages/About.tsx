"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { spring, springGentle, STAGGER } from "@/lib/motion";
import { useContent } from "@/lib/content-ctx";

const PROFILE_IMAGE = "/images/profile.jpeg";

/* ────────────────────────────────────────────────────
 * About page
 *
 * Sections:
 *   1. Hero — founder headline + portrait
 *   2. Story — the journey
 *   3. Philosophy — 3 core values
 *
 * Palette: ink, stone, drift, bronze, sand, ivory, cream
 * ──────────────────────────────────────────────────── */

const T = 0;

/* ────────────────────────────────────────────────────
 * AboutPage — main export
 * ──────────────────────────────────────────────────── */

export function AboutPage() {
  const { aboutPage, meta } = useContent();
  const {
    heroLabel,
    heroHeadlinePartOne,
    heroHeadlinePartTwo,
    heroDescription,
    sectionTwoLabel,
    sectionTwoHeadline,
    sectionTwoDescription,
    sectionThreeLabel,
    approachSectionItems,
  } = aboutPage;
  const { ownerName, ownerRole, headquartersLocation, yearOfEstablishment } =
    meta;

  const imgRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [-2, 1]);

  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });
  const isValuesInView = useInView(valuesRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <main>
      <section
        className="pt-20 lg:pt-28 pb-16 lg:pb-24"
        aria-label="About the founder"
      >
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <motion.span
            className="text-[13px] uppercase tracking-widest text-drift block mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: T }}
          >
            {heroLabel}
          </motion.span>

          <div className="lg:grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] lg:gap-16 xl:gap-24 lg:items-start">
            <div>
              <h1 className="font-serif text-[clamp(2rem,8vw,3.6rem)] lg:text-[clamp(2.4rem,5vw,4.2rem)] leading-none tracking-[-0.02em] text-ink mb-8 lg:mb-10">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    ...springGentle,
                    delay: T + 0.08,
                  }}
                >
                  {heroHeadlinePartOne}
                </motion.span>
                {heroHeadlinePartTwo && (
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      ...springGentle,
                      delay: T + 0.08 + STAGGER * 3,
                    }}
                  >
                    {heroHeadlinePartTwo}
                  </motion.span>
                )}
              </h1>

              <motion.div
                className="mb-6 lg:mb-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: T + 0.4 }}
              >
                <span className="block font-serif text-xl lg:text-2xl text-ink tracking-tight">
                  {ownerName}
                </span>
                <span className="block text-[13px] uppercase tracking-widest text-bronze mt-1">
                  {ownerRole}
                </span>
              </motion.div>

              <motion.div
                className="w-12 h-px bg-bronze mb-6 lg:mb-8 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ ...spring, delay: T + 0.45 }}
              />

              <motion.p
                className="text-[15px] lg:text-base leading-[1.8] text-stone max-w-[500px]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: T + 0.5 }}
              >
                {heroDescription}
              </motion.p>
            </div>

            <div
              ref={imgRef}
              className="mt-10 lg:mt-0 max-w-[320px] sm:max-w-[360px] lg:max-w-none"
            >
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 50, rotate: -4, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                transition={{ ...springGentle, delay: T + 0.3 }}
              >
                <motion.div
                  className="relative z-10 bg-ivory p-2 lg:p-3 shadow-[0_8px_40px_-8px_rgba(26,26,26,0.2)]"
                  style={{ y: imgY, rotate: imgRotate }}
                >
                  <div className="relative aspect-2/3 w-full">
                    <Image
                      src={PROFILE_IMAGE}
                      alt={`${ownerName} — ${ownerRole}`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 70vw, 360px"
                      priority
                    />
                  </div>

                  <motion.div
                    className="flex items-center justify-between pt-2 lg:pt-3 px-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ...spring, delay: T + 0.7 }}
                  >
                    <span className="text-[11px] uppercase tracking-widest text-drift">
                      {headquartersLocation}
                    </span>
                    <span className="text-[11px] uppercase tracking-widest text-drift">
                      {`Est. ${yearOfEstablishment}`}
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section ref={storyRef} className="py-16 lg:py-28" aria-label="Our story">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <motion.div
            className="h-px bg-sand origin-left mb-16 lg:mb-20"
            initial={{ scaleX: 0 }}
            animate={isStoryInView ? { scaleX: 1 } : {}}
            transition={spring}
          />

          <motion.span
            className="text-[13px] uppercase tracking-widest text-drift block mb-10 lg:mb-14"
            initial={{ opacity: 0, y: 8 }}
            animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: 0.05 }}
          >
            {sectionTwoLabel}
          </motion.span>

          <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-20">
            <motion.blockquote
              className="font-serif text-[clamp(1.6rem,5vw,2.6rem)] leading-[1.15] tracking-[-0.01em] text-ink mb-10 lg:mb-0 max-w-[520px]"
              initial={{ opacity: 0, y: 24 }}
              animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...springGentle, delay: 0.1 }}
            >
              &ldquo;{sectionTwoHeadline}&rdquo;
            </motion.blockquote>

            <div className="space-y-6">
              {sectionTwoDescription.map((item, i) => (
                <motion.p
                  key={item.id ?? item.journeyItem}
                  className="text-[15px] lg:text-base leading-[1.8] text-stone"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ ...spring, delay: 0.15 + i * 0.1 }}
                >
                  {item.journeyItem}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={valuesRef}
        className="py-16 lg:py-28"
        aria-label="Our values"
      >
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <motion.div
            className="h-px bg-sand origin-left mb-16 lg:mb-20"
            initial={{ scaleX: 0 }}
            animate={isValuesInView ? { scaleX: 1 } : {}}
            transition={spring}
          />

          <motion.span
            className="text-[13px] uppercase tracking-widest text-drift block mb-10 lg:mb-14"
            initial={{ opacity: 0, y: 8 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: 0.05 }}
          >
            {sectionThreeLabel}
          </motion.span>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {approachSectionItems.map((value, i) => (
              <motion.div
                key={value.id ?? value.approachItemTitle}
                className="relative py-8 lg:py-10 lg:px-8 first:lg:pl-0 last:lg:pr-0"
                initial={{ opacity: 0, y: 28 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...spring, delay: 0.1 + i * STAGGER * 3 }}
              >
                {i > 0 && (
                  <motion.div
                    className="hidden lg:block absolute left-0 top-10 bottom-10 w-px bg-sand origin-top"
                    initial={{ scaleY: 0 }}
                    animate={isValuesInView ? { scaleY: 1 } : {}}
                    transition={{ ...spring, delay: 0.15 + i * STAGGER * 3 }}
                  />
                )}

                {i > 0 && (
                  <motion.div
                    className="lg:hidden absolute top-0 left-0 right-0 h-px bg-sand origin-left"
                    initial={{ scaleX: 0 }}
                    animate={isValuesInView ? { scaleX: 1 } : {}}
                    transition={{ ...spring, delay: 0.1 + i * STAGGER * 3 }}
                  />
                )}

                <span className="block font-serif text-sm text-drift mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="font-serif text-xl lg:text-2xl text-ink tracking-tight mb-3 lg:mb-4">
                  {value.approachItemTitle}
                </h3>

                <motion.div
                  className="w-8 h-px bg-bronze mb-4 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={isValuesInView ? { scaleX: 1 } : {}}
                  transition={{ ...spring, delay: 0.2 + i * STAGGER * 3 }}
                />

                <p className="text-[15px] leading-[1.75] text-stone max-w-[360px]">
                  {value.approachItemDescription}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
