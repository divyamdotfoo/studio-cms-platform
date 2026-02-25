"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { spring, springGentle, STAGGER } from "@/lib/motion";

const ABOUT_CONTENT = {
  intro: {
    label: "The founder",
    headline: [
      "A simple dream —",
      "to build homes that",
      "people truly call their own",
    ],
    name: "Ar. Ujjwal Kapoor",
    role: "Founder & Principal Architect",
    brief:
      "Armed with an architecture degree since 2018 and a lifelong passion for building homes, Ujjwal started Vision Architect with one clear idea — your home, designed your way.",
    profileImage: "/images/profile.jpeg",
    captionLeft: "Haridwar, India",
    captionRight: "Est. 2018",
  },
  story: {
    label: "The journey",
    pullQuote: "Design isn't just about appearance — it has to be lived in.",
    paragraphs: [
      "While others were settling into routine careers, Ujjwal took on his first project — a small house, but an enormous dream. No team, no office. Just a laptop, AutoCAD, and the drive to work past 2 AM every night.",
      "Today, with over 50 projects and 100 happy families behind us, Vision Architect has become a trusted name in Haridwar. What started here has now grown to Rishikesh and the surrounding cities.",
      "But one thing has never changed — the same dedication, the same attention to detail, as on day one. Because for Ujjwal, every home is a responsibility, not just a project.",
    ],
  },
  values: {
    label: "Our approach",
    items: [
      {
        num: "01",
        title: "Listen first, design later",
        description:
          "We understand your needs before we pick up a pen. Every home is different because every family is different.",
      },
      {
        num: "02",
        title: "Respect for your budget",
        description:
          "It's easy to dream big on paper. Delivering within budget is the hard part — and that's exactly what we do.",
      },
      {
        num: "03",
        title: "Delivered on time",
        description:
          "When we commit to a deadline, we mean it. Few things are more frustrating than delays — and we understand that.",
      },
    ],
  },
} as const;

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
 * Section 1: Founder Hero
 * ──────────────────────────────────────────────────── */

function FounderHero() {
  const intro = ABOUT_CONTENT.intro;
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [-2, 1]);

  return (
    <section
      className="pt-20 lg:pt-28 pb-16 lg:pb-24"
      aria-label="About the founder"
    >
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        {/* ── Top label ── */}
        <motion.span
          className="text-[13px] uppercase tracking-widest text-drift block mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: T }}
        >
          {intro.label}
        </motion.span>

        <div className="lg:grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] lg:gap-16 xl:gap-24 lg:items-start">
          {/* ── Left: Headline + intro ── */}
          <div>
            {/* Headline */}
            <h1 className="font-serif text-[clamp(2rem,8vw,3.6rem)] lg:text-[clamp(2.4rem,5vw,4.2rem)] leading-none tracking-[-0.02em] text-ink mb-8 lg:mb-10">
              {intro.headline.map((line, i) => (
                <motion.span
                  key={i}
                  className="block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    ...springGentle,
                    delay: T + 0.08 + i * STAGGER * 3,
                  }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            {/* Founder name + role */}
            <motion.div
              className="mb-6 lg:mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: T + 0.4 }}
            >
              <span className="block font-serif text-xl lg:text-2xl text-ink tracking-tight">
                {intro.name}
              </span>
              <span className="block text-[13px] uppercase tracking-widest text-bronze mt-1">
                {intro.role}
              </span>
            </motion.div>

            {/* Bronze accent line */}
            <motion.div
              className="w-12 h-px bg-bronze mb-6 lg:mb-8 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ ...spring, delay: T + 0.45 }}
            />

            {/* Brief */}
            <motion.p
              className="text-[15px] lg:text-base leading-[1.8] text-stone max-w-[500px]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: T + 0.5 }}
            >
              {intro.brief}
            </motion.p>
          </div>

          {/* ── Right: Profile image ── */}
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
                    src={intro.profileImage}
                    alt={`${intro.name} — ${intro.role}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 70vw, 360px"
                    priority
                  />
                </div>

                {/* Caption bar below image */}
                <motion.div
                  className="flex items-center justify-between pt-2 lg:pt-3 px-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ...spring, delay: T + 0.7 }}
                >
                  <span className="text-[11px] uppercase tracking-widest text-drift">
                    {intro.captionLeft}
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-drift">
                    {intro.captionRight}
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────
 * Section 2: Story
 * ──────────────────────────────────────────────────── */

function StorySection() {
  const story = ABOUT_CONTENT.story;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 lg:py-28" aria-label="Our story">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        {/* Divider */}
        <motion.div
          className="h-px bg-sand origin-left mb-16 lg:mb-20"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={spring}
        />

        {/* Label */}
        <motion.span
          className="text-[13px] uppercase tracking-widest text-drift block mb-10 lg:mb-14"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...spring, delay: 0.05 }}
        >
          {story.label}
        </motion.span>

        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* Left — pull quote */}
          <motion.blockquote
            className="font-serif text-[clamp(1.6rem,5vw,2.6rem)] leading-[1.15] tracking-[-0.01em] text-ink mb-10 lg:mb-0 max-w-[520px]"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...springGentle, delay: 0.1 }}
          >
            &ldquo;{story.pullQuote}&rdquo;
          </motion.blockquote>

          {/* Right — narrative paragraphs */}
          <div className="space-y-6">
            {story.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                className="text-[15px] lg:text-base leading-[1.8] text-stone"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...spring, delay: 0.15 + i * 0.1 }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────
 * Section 3: Philosophy / Values
 * ──────────────────────────────────────────────────── */

function ValuesSection() {
  const values = ABOUT_CONTENT.values;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 lg:py-28" aria-label="Our values">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        {/* Divider */}
        <motion.div
          className="h-px bg-sand origin-left mb-16 lg:mb-20"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={spring}
        />

        {/* Label */}
        <motion.span
          className="text-[13px] uppercase tracking-widest text-drift block mb-10 lg:mb-14"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...spring, delay: 0.05 }}
        >
          {values.label}
        </motion.span>

        {/* Values grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {values.items.map((value, i) => (
            <motion.div
              key={value.num}
              className="relative py-8 lg:py-10 lg:px-8 first:lg:pl-0 last:lg:pr-0"
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...spring, delay: 0.1 + i * STAGGER * 3 }}
            >
              {/* Vertical divider between columns (desktop) */}
              {i > 0 && (
                <motion.div
                  className="hidden lg:block absolute left-0 top-10 bottom-10 w-px bg-sand origin-top"
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ ...spring, delay: 0.15 + i * STAGGER * 3 }}
                />
              )}

              {/* Horizontal divider between rows (mobile) */}
              {i > 0 && (
                <motion.div
                  className="lg:hidden absolute top-0 left-0 right-0 h-px bg-sand origin-left"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ ...spring, delay: 0.1 + i * STAGGER * 3 }}
                />
              )}

              {/* Number */}
              <span className="block font-serif text-sm text-drift mb-4">
                {value.num}
              </span>

              {/* Title */}
              <h3 className="font-serif text-xl lg:text-2xl text-ink tracking-tight mb-3 lg:mb-4">
                {value.title}
              </h3>

              {/* Bronze accent */}
              <motion.div
                className="w-8 h-px bg-bronze mb-4 origin-left"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ ...spring, delay: 0.2 + i * STAGGER * 3 }}
              />

              {/* Description */}
              <p className="text-[15px] leading-[1.75] text-stone max-w-[360px]">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────
 * AboutPage — main export
 * ──────────────────────────────────────────────────── */

export function AboutPage() {
  return (
    <main>
      <FounderHero />
      <StorySection />
      <ValuesSection />
    </main>
  );
}
