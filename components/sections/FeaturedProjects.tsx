"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  MotionValue,
} from "motion/react";
import { useContent } from "@/lib/content-ctx";
import { spring, springGentle, STAGGER, T_FEATURED } from "@/lib/motion";
import { getFeaturedImage } from "@/assets/featured";
import type { FeaturedProject } from "@/cms/types";

/* ────────────────────────────────────────────────────
 * FeaturedProjects
 *
 * Vertically stacked showcases with alternating layout.
 * Each row has a photo-collage side and a text side.
 * Scroll-driven parallax: the two halves travel at
 * different speeds, giving a cinematic depth feel.
 *
 * Palette: ink, stone, drift, bronze, sand, ivory, cream
 * ──────────────────────────────────────────────────── */

/* ── Collage slot config ─────────────────────────── */

interface CollageSlot {
  top: string;
  left: string;
  width: string;
  rotate: number;
  z: number;
  /** Per-image parallax multiplier (higher z = more travel) */
  parallaxFactor: number;
}

const COLLAGE_LAYOUTS: CollageSlot[][] = [
  /* Layout A — dominant top-left, supporting scattered */
  [
    {
      top: "0%",
      left: "0%",
      width: "58%",
      rotate: -2,
      z: 2,
      parallaxFactor: 0.5,
    },
    {
      top: "6%",
      left: "48%",
      width: "48%",
      rotate: 3,
      z: 3,
      parallaxFactor: 0.8,
    },
    {
      top: "54%",
      left: "2%",
      width: "38%",
      rotate: -3.5,
      z: 1,
      parallaxFactor: 0.3,
    },
    {
      top: "46%",
      left: "34%",
      width: "50%",
      rotate: 1.5,
      z: 4,
      parallaxFactor: 1.0,
    },
  ],
  /* Layout B — asymmetric, tight cluster */
  [
    {
      top: "4%",
      left: "6%",
      width: "52%",
      rotate: 2.5,
      z: 2,
      parallaxFactor: 0.6,
    },
    {
      top: "0%",
      left: "48%",
      width: "46%",
      rotate: -1.5,
      z: 3,
      parallaxFactor: 0.9,
    },
    {
      top: "50%",
      left: "0%",
      width: "42%",
      rotate: 1,
      z: 4,
      parallaxFactor: 1.0,
    },
    {
      top: "44%",
      left: "36%",
      width: "54%",
      rotate: -2.5,
      z: 1,
      parallaxFactor: 0.35,
    },
  ],
  /* Layout C — centred, overlapping pile */
  [
    {
      top: "0%",
      left: "2%",
      width: "55%",
      rotate: -1,
      z: 2,
      parallaxFactor: 0.55,
    },
    {
      top: "5%",
      left: "42%",
      width: "52%",
      rotate: 3.5,
      z: 3,
      parallaxFactor: 0.85,
    },
    {
      top: "48%",
      left: "6%",
      width: "48%",
      rotate: 2,
      z: 4,
      parallaxFactor: 1.0,
    },
    {
      top: "52%",
      left: "40%",
      width: "42%",
      rotate: -2,
      z: 1,
      parallaxFactor: 0.4,
    },
  ],
];

/* ── PhotoFrame — single image with parallax ─────── */

function PhotoFrame({
  src,
  alt,
  slot,
  isInView,
  delay,
  scrollProgress,
}: {
  src: StaticImageData;
  alt: string;
  slot: CollageSlot;
  isInView: boolean;
  delay: number;
  scrollProgress: MotionValue<number>;
}) {
  /* Each photo drifts at its own rate based on parallaxFactor.
     We use an outer wrapper for continuous scroll-parallax (y),
     and the inner motion.div for the one-time entrance animation
     (opacity + rotate + scale). This avoids conflicts between
     the MotionValue and the initial/animate y. */
  const range = 80 * slot.parallaxFactor;
  const y = useTransform(scrollProgress, [0, 1], [range, -range]);

  return (
    <motion.div
      className="absolute"
      style={{
        top: slot.top,
        left: slot.left,
        width: slot.width,
        zIndex: slot.z,
        y,
      }}
    >
      <motion.div
        className="bg-ivory p-[5px] lg:p-2 shadow-[0_4px_30px_-6px_rgba(26,26,26,0.18)]"
        initial={{
          opacity: 0,
          y: 60,
          rotate: slot.rotate + (slot.rotate > 0 ? 8 : -8),
          scale: 0.9,
        }}
        animate={
          isInView ? { opacity: 1, y: 0, rotate: slot.rotate, scale: 1 } : {}
        }
        transition={{ ...spring, delay }}
      >
        <div className="relative w-full aspect-4/3">
          <Image
            src={src}
            alt={alt}
            fill
            placeholder="blur"
            className="object-cover select-none"
            sizes="(max-width: 768px) 45vw, 30vw"
            draggable={false}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── ImageCollage — 4 scattered photos ───────────── */

function ImageCollage({
  imageKeys,
  projectIndex,
  name,
  layoutIndex,
  isInView,
  scrollProgress,
  baseDelay = 0,
}: {
  imageKeys: string[];
  projectIndex: number;
  name: string;
  layoutIndex: number;
  isInView: boolean;
  scrollProgress: MotionValue<number>;
  baseDelay?: number;
}) {
  const slots = COLLAGE_LAYOUTS[layoutIndex % COLLAGE_LAYOUTS.length];

  /* Collage as a whole drifts slower than the text side */
  const collageY = useTransform(scrollProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      className="relative w-full h-[340px] sm:h-[380px] lg:h-[520px]"
      style={{ y: collageY }}
    >
      {imageKeys.slice(0, 4).map((key, i) => (
        <PhotoFrame
          key={key}
          src={getFeaturedImage(projectIndex, key)}
          alt={`${name} — photo ${i + 1}`}
          slot={slots[i]}
          isInView={isInView}
          delay={baseDelay + i * STAGGER * 4}
          scrollProgress={scrollProgress}
        />
      ))}
    </motion.div>
  );
}

/* ── ProjectInfo — text side with parallax ───────── */

function ProjectInfo({
  project,
  index,
  isInView,
  reversed,
  scrollProgress,
  baseDelay = 0,
}: {
  project: FeaturedProject;
  index: number;
  isInView: boolean;
  reversed: boolean;
  scrollProgress: MotionValue<number>;
  baseDelay?: number;
}) {
  const num = String(index + 1).padStart(2, "0");

  /* Text travels faster than images → differential parallax */
  const textY = useTransform(scrollProgress, [0, 1], [120, -120]);

  return (
    <motion.div
      className={`flex flex-col justify-center py-8 lg:py-0 ${
        reversed ? "lg:items-end lg:text-right" : ""
      }`}
      style={{ y: textY }}
    >
      {/* Project number */}
      <motion.span
        className="text-[13px] uppercase tracking-widest text-drift mb-4 lg:mb-5"
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...spring, delay: baseDelay + 0.1 }}
      >
        Project {num}
      </motion.span>

      {/* Name */}
      <motion.h3
        className="font-serif text-[clamp(1.6rem,5vw,2.8rem)] leading-[1.1] tracking-[-0.01em] text-ink mb-4 lg:mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...springGentle, delay: baseDelay + 0.15 }}
      >
        {project.name}
      </motion.h3>

      {/* Bronze accent line */}
      <motion.div
        className={`w-10 h-px bg-bronze mb-5 lg:mb-6 ${
          reversed ? "origin-right ml-auto lg:ml-0" : "origin-left"
        }`}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ ...spring, delay: baseDelay + 0.25 }}
      />

      {/* Description */}
      <motion.p
        className={`text-[15px] leading-[1.8] text-stone mb-6 lg:mb-8 ${
          reversed ? "lg:max-w-[420px] lg:ml-auto" : "max-w-[420px]"
        }`}
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...spring, delay: baseDelay + 0.3 }}
      >
        {project.description}
      </motion.p>

      {/* Detail chips */}
      <motion.div
        className={`flex flex-wrap gap-x-6 gap-y-3 ${
          reversed ? "lg:justify-end" : ""
        }`}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ ...spring, delay: baseDelay + 0.4 }}
      >
        {project.details.map((d, i) => (
          <motion.div
            key={d.label}
            className={`flex flex-col ${reversed ? "lg:items-end" : ""}`}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: baseDelay + 0.4 + i * STAGGER * 2 }}
          >
            <span className="text-[11px] uppercase tracking-widest text-drift">
              {d.label}
            </span>
            <span className="text-sm text-ink font-medium mt-0.5">
              {d.value}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ── ProjectShowcase — single project row ────────── */

function ProjectShowcase({
  project,
  index,
  isFirst,
}: {
  project: FeaturedProject;
  index: number;
  isFirst: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reversed = index % 2 === 1;

  /* First project syncs with the page choreography (navbar → hero → this).
     Subsequent projects animate immediately when they enter the viewport. */
  const baseDelay = isFirst ? T_FEATURED : 0;

  /* Scroll progress for this specific row (0 = enters bottom, 1 = exits top) */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref}>
      {/* Divider between projects */}
      {index > 0 && (
        <motion.div
          className="h-px bg-sand mx-auto max-w-[200px] lg:max-w-[300px] origin-center my-6 lg:my-10"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ ...spring, delay: 0 }}
        />
      )}

      <div className="py-6 lg:py-14">
        {/* Mobile: always collage first, then text */}
        <div className="lg:hidden">
          <ImageCollage
            imageKeys={project.images}
            projectIndex={index}
            name={project.name}
            layoutIndex={index}
            isInView={isInView}
            scrollProgress={scrollYProgress}
            baseDelay={baseDelay}
          />
          <ProjectInfo
            project={project}
            index={index}
            isInView={isInView}
            reversed={false}
            scrollProgress={scrollYProgress}
            baseDelay={baseDelay}
          />
        </div>

        {/* Desktop: alternating layout */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center">
          {reversed ? (
            <>
              <ProjectInfo
                project={project}
                index={index}
                isInView={isInView}
                reversed={reversed}
                scrollProgress={scrollYProgress}
                baseDelay={baseDelay}
              />
              <ImageCollage
                imageKeys={project.images}
                projectIndex={index}
                name={project.name}
                layoutIndex={index}
                isInView={isInView}
                scrollProgress={scrollYProgress}
                baseDelay={baseDelay}
              />
            </>
          ) : (
            <>
              <ImageCollage
                imageKeys={project.images}
                projectIndex={index}
                name={project.name}
                layoutIndex={index}
                isInView={isInView}
                scrollProgress={scrollYProgress}
                baseDelay={baseDelay}
              />
              <ProjectInfo
                project={project}
                index={index}
                isInView={isInView}
                reversed={reversed}
                scrollProgress={scrollYProgress}
                baseDelay={baseDelay}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── FeaturedProjects — main section ─────────────── */

export function FeaturedProjects() {
  const { projectGallery } = useContent();
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="" aria-label="Featured Projects">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        {/* ── Small section label with accent line ── */}
        <div
          ref={headerRef}
          className="mt-10 flex items-center justify-end gap-4 w-full"
        >
          <motion.div
            className="h-px w-20 bg-sand origin-right"
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ ...spring, delay: T_FEATURED }}
          />
          <motion.span
            className="text-[13px] uppercase tracking-widest text-drift"
            initial={{ opacity: 0, y: 8 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: T_FEATURED + 0.05 }}
          >
            {projectGallery.label}
          </motion.span>
        </div>

        {/* ── Project list ── */}
        {projectGallery.projects.map((project, i) => (
          <ProjectShowcase
            key={project.name}
            project={project}
            index={i}
            isFirst={i === 0}
          />
        ))}
      </div>
    </section>
  );
}
