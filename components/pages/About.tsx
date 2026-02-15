"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { spring, springGentle, STAGGER } from "@/lib/motion";
import profileImg from "@/assets/profile.jpeg";

/* ────────────────────────────────────────────────────
 * About page
 *
 * Sections:
 *   1. Hero — founder headline + portrait
 *   2. Story — the journey in hinglish
 *   3. Philosophy — 3 core values
 *
 * Palette: ink, stone, drift, bronze, sand, ivory, cream
 * ──────────────────────────────────────────────────── */

/* ── Copy — hardcoded (page-specific, not CMS) ───── */

const T = 0;

const INTRO = {
  label: "The founder",
  headline: ["Ek sapna tha —", "achhe ghar banana jo", "log apna keh sakein"],
  name: "Ar. Ujjwal Kapoor",
  role: "Founder & Principal Architect",
  brief:
    "Architecture ka degree 2018 mein mila, par ghar banana ka passion bachpan se tha. Aaj Vision Architect ke peeche ek simple idea hai — aapka ghar, aapke hisaab se.",
};

const STORY = {
  label: "The journey",
  pullQuote: "Design sirf dikhne ke liye nahi hota — usme rehna padta hai.",
  paragraphs: [
    "Jab doosre log settle hone ki soch rahe the, Ujjwal ne apna pehla project liya — ek chhota sa ghar, ek bahut bada sapna. Na koi team thi, na koi office. Sirf ek laptop, AutoCAD, aur raat ke 2 baje tak kaam karne ka junoon.",
    "Aaj 50+ projects aur 100+ khush families baad, Vision Architect Haridwar ka ek trusted naam ban chuka hai. Haridwar se shuru hua safar ab Rishikesh aur aas-paas ke shahron tak pahunch gaya hai.",
    "Par ek cheez nahi badli — har project mein wahi dedication, wahi attention to detail, jaisa pehle din tha. Kyunki Ujjwal ke liye, har ghar ek responsibility hai, sirf ek project nahi.",
  ],
};

const VALUES = [
  {
    num: "01",
    title: "Pehle sunna, phir banana",
    description:
      "Hum pehle aapki zaroorat samajhte hain, phir pen uthate hain. Har ghar alag hota hai kyunki har family alag hoti hai.",
  },
  {
    num: "02",
    title: "Budget ka respect",
    description:
      "Bade sapne dikhana aasan hai, budget mein rakh ke deliver karna mushkil. Hum woh mushkil kaam karte hain.",
  },
  {
    num: "03",
    title: "Deadline pe deliver",
    description:
      "Jab bola hai tab milega. Delays se zyada kuch frustrating nahi hota — hum yeh samajhte hain.",
  },
];

/* ────────────────────────────────────────────────────
 * Section 1: Founder Hero
 * ──────────────────────────────────────────────────── */

function FounderHero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });

  /* Image parallax — drifts up slower than the page */
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
          {INTRO.label}
        </motion.span>

        <div className="lg:grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] lg:gap-16 xl:gap-24 lg:items-start">
          {/* ── Left: Headline + intro ── */}
          <div>
            {/* Headline */}
            <h1 className="font-serif text-[clamp(2rem,8vw,3.6rem)] lg:text-[clamp(2.4rem,5vw,4.2rem)] leading-none tracking-[-0.02em] text-ink mb-8 lg:mb-10">
              {INTRO.headline.map((line, i) => (
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
                {INTRO.name}
              </span>
              <span className="block text-[13px] uppercase tracking-widest text-bronze mt-1">
                {INTRO.role}
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
              {INTRO.brief}
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
              {/* The photo frame — ivory border, shadow, subtle parallax */}
              <motion.div
                className="relative z-10 bg-ivory p-2 lg:p-3 shadow-[0_8px_40px_-8px_rgba(26,26,26,0.2)]"
                style={{ y: imgY, rotate: imgRotate }}
              >
                <div className="relative aspect-2/3 w-full">
                  <Image
                    src={profileImg}
                    alt="Ar. Ujjwal Kapoor — Founder of Vision Architect"
                    fill
                    placeholder="blur"
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
                    Haridwar, India
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-drift">
                    Est. 2018
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
          {STORY.label}
        </motion.span>

        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* Left — pull quote */}
          <motion.blockquote
            className="font-serif text-[clamp(1.6rem,5vw,2.6rem)] leading-[1.15] tracking-[-0.01em] text-ink mb-10 lg:mb-0 max-w-[520px]"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...springGentle, delay: 0.1 }}
          >
            &ldquo;{STORY.pullQuote}&rdquo;
          </motion.blockquote>

          {/* Right — narrative paragraphs */}
          <div className="space-y-6">
            {STORY.paragraphs.map((p, i) => (
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
          Humara approach
        </motion.span>

        {/* Values grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {VALUES.map((value, i) => (
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
