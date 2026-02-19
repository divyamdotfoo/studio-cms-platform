"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  MotionValue,
} from "motion/react";
import { XIcon } from "lucide-react";
import { useContent } from "@/lib/content-ctx";
import { spring, springGentle, STAGGER, T_FEATURED } from "@/lib/motion";
import type { FeaturedProject } from "@/cms/types";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogImage,
  MorphingDialogContainer,
} from "@/components/effects/morphing-dialog";

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
  src: string;
  alt: string;
  slot: CollageSlot;
  isInView: boolean;
  delay: number;
  scrollProgress: MotionValue<number>;
}) {
  const range = 120 * slot.parallaxFactor;
  const y = useTransform(scrollProgress, [0, 1], [range, -range]);
  const rotateParallax = useTransform(
    scrollProgress,
    [0, 1],
    [
      slot.rotate - 1.5 * slot.parallaxFactor,
      slot.rotate + 1.5 * slot.parallaxFactor,
    ]
  );

  return (
    <motion.div
      className="absolute"
      style={{
        top: slot.top,
        left: slot.left,
        width: slot.width,
        zIndex: slot.z,
        y,
        rotate: rotateParallax,
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
        <MorphingDialog transition={{ duration: 0.3, ease: "easeInOut" }}>
          <MorphingDialogTrigger>
            <MorphingDialogImage
              src={src}
              alt={alt}
              className="w-full aspect-4/3 object-cover select-none"
            />
          </MorphingDialogTrigger>
          <MorphingDialogContainer>
            <MorphingDialogContent className="relative">
              <MorphingDialogImage
                src={src}
                alt={alt}
                className="h-auto w-full max-w-[90vw] max-h-[90vh] md:max-w-[70vw] lg:max-h-[70vh] rounded-[4px] object-contain"
              />
            </MorphingDialogContent>
            <MorphingDialogClose
              className="fixed right-6 top-6 h-fit w-fit rounded-full bg-white p-1"
              variants={{
                initial: { opacity: 0 },
                animate: {
                  opacity: 1,
                  transition: { delay: 0.3, duration: 0.1 },
                },
                exit: { opacity: 0, transition: { duration: 0 } },
              }}
            >
              <XIcon className="h-5 w-5 text-zinc-500" />
            </MorphingDialogClose>
          </MorphingDialogContainer>
        </MorphingDialog>
      </motion.div>
    </motion.div>
  );
}

/* ── ImageCollage — 4 scattered photos ───────────── */

function ImageCollage({
  images,
  name,
  layoutIndex,
  isInView,
  scrollProgress,
  baseDelay = 0,
}: {
  images: string[];
  name: string;
  layoutIndex: number;
  isInView: boolean;
  scrollProgress: MotionValue<number>;
  baseDelay?: number;
}) {
  const slots = COLLAGE_LAYOUTS[layoutIndex % COLLAGE_LAYOUTS.length];

  const collageY = useTransform(scrollProgress, [0, 1], [70, -70]);

  return (
    <motion.div
      className="relative w-full h-[340px] sm:h-[380px] lg:h-[520px]"
      style={{ y: collageY }}
    >
      {images.slice(0, 4).map((imgPath, i) => (
        <PhotoFrame
          key={imgPath}
          src={imgPath}
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

  const textY = useTransform(scrollProgress, [0, 1], [180, -180]);

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

/* ── Architectural Sketch Illustrations ─────────── */

interface SketchPath {
  d: string;
  /** Optional: use lighter sand colour instead of default drift */
  accent?: boolean;
  /** Optional: dashed stroke for construction/dimension lines */
  dashed?: boolean;
}

interface SketchDef {
  viewBox: string;
  className: string;
  paths: SketchPath[];
}

const SKETCHES: SketchDef[] = [
  {
    viewBox: "0 0 100 90",
    className: "w-20 sm:w-28 lg:w-36",
    paths: [
      { d: "M6 46 L50 10 L94 46" },
      { d: "M16 46 L16 82 L84 82 L84 46" },
      { d: "M40 82 L40 62 L60 62 L60 82" },
      { d: "M22 52 L34 52 L34 66 L22 66 Z" },
      { d: "M66 52 L78 52 L78 66 L66 66 Z" },
      { d: "M28 52 L28 66", accent: true },
      { d: "M72 52 L72 66", accent: true },
      { d: "M44 6 L44 10", accent: true },
      { d: "M44 6 L50 6 L50 10", accent: true },
    ],
  },
  {
    viewBox: "0 0 80 80",
    className: "w-16 sm:w-24 lg:w-32",
    paths: [
      { d: "M6 74 L6 6 L74 74 Z" },
      { d: "M6 54 L26 74", accent: true },
      { d: "M6 34 L46 74", accent: true, dashed: true },
      { d: "M18 6 L18 10" },
      { d: "M30 6 L30 10" },
      { d: "M42 6 L42 10" },
    ],
  },
  {
    viewBox: "0 0 80 80",
    className: "w-16 sm:w-24 lg:w-32",
    paths: [
      { d: "M10 76 L10 28" },
      { d: "M70 76 L70 28" },
      { d: "M10 28 A 30 30 0 0 1 70 28" },
      { d: "M40 28 L40 4", accent: true },
      { d: "M20 76 L20 42", accent: true, dashed: true },
      { d: "M60 76 L60 42", accent: true, dashed: true },
    ],
  },
  {
    viewBox: "0 0 80 80",
    className: "w-16 sm:w-24 lg:w-32",
    paths: [
      { d: "M12 72 L12 8" },
      { d: "M12 72 L72 24" },
      { d: "M12 30 A 42 42 0 0 1 42 46" },
      { d: "M12 44 A 28 28 0 0 1 32 54", accent: true, dashed: true },
      { d: "M22 8 L22 12" },
      { d: "M32 8 L32 12" },
    ],
  },
  {
    viewBox: "0 0 70 90",
    className: "w-14 sm:w-20 lg:w-28",
    paths: [
      { d: "M8 90 L8 30" },
      { d: "M62 90 L62 30" },
      { d: "M8 30 Q8 6 35 6 Q62 6 62 30" },
      { d: "M8 56 L62 56", accent: true },
      { d: "M35 6 L35 90", accent: true },
      { d: "M8 30 L62 30", accent: true, dashed: true },
    ],
  },
];

function ArchSketch({
  sketch,
  isInView,
  delay = 0,
}: {
  sketch: SketchDef;
  isInView: boolean;
  delay?: number;
}) {
  return (
    <svg viewBox={sketch.viewBox} fill="none" className={sketch.className}>
      {sketch.paths.map((p, i) => (
        <motion.path
          key={p.d}
          d={p.d}
          stroke={p.accent ? "var(--color-sand)" : "var(--color-drift)"}
          strokeWidth={p.accent ? 0.8 : 1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={p.dashed ? "4 3" : undefined}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.7 } : {}}
          transition={{
            pathLength: {
              duration: 2,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.18,
            },
            opacity: { duration: 0.5, delay: delay + i * 0.18 },
          }}
        />
      ))}
    </svg>
  );
}

/* ── GapDecoration — divider line + sketch pair ─── */

interface SketchPlacement {
  sketchIndex: number;
  left?: string;
  right?: string;
  top: string;
  rotate: number;
}

const GAP_LAYOUTS: SketchPlacement[][] = [
  [
    { sketchIndex: 0, left: "4%", top: "-40px", rotate: -3 },
    { sketchIndex: 1, right: "5%", top: "14px", rotate: 2 },
  ],
  [
    { sketchIndex: 2, right: "6%", top: "-36px", rotate: 4 },
    { sketchIndex: 3, left: "5%", top: "18px", rotate: -2 },
  ],
  [
    { sketchIndex: 4, left: "8%", top: "-34px", rotate: -2 },
    { sketchIndex: 0, right: "4%", top: "16px", rotate: 3 },
  ],
];

function GapDecoration({
  gapIndex,
  isInView,
  scrollProgress,
}: {
  gapIndex: number;
  isInView: boolean;
  scrollProgress: MotionValue<number>;
}) {
  const placements = GAP_LAYOUTS[gapIndex % GAP_LAYOUTS.length];
  const yA = useTransform(scrollProgress, [0, 1], [30, -30]);
  const yB = useTransform(scrollProgress, [0, 1], [-20, 20]);
  const parallaxY = [yA, yB];

  return (
    <div className="relative my-6 lg:my-10">
      <motion.div
        className="h-px bg-sand mx-auto max-w-[200px] lg:max-w-[300px] origin-center"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ ...spring }}
      />

      {placements.map((p, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: p.left,
            right: p.right,
            top: p.top,
            y: parallaxY[i],
            rotate: p.rotate,
            opacity: 0.55,
          }}
        >
          <ArchSketch
            sketch={SKETCHES[p.sketchIndex]}
            isInView={isInView}
            delay={0.15 + i * 0.4}
          />
        </motion.div>
      ))}
    </div>
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
  const isInView = useInView(ref, {
    once: true,
    margin: isFirst ? "-60px" : "-150px",
  });
  const reversed = index % 2 === 1;

  const baseDelay = isFirst ? T_FEATURED : 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref}>
      {index > 0 && (
        <GapDecoration
          gapIndex={index - 1}
          isInView={isInView}
          scrollProgress={scrollYProgress}
        />
      )}

      <div className="py-6 lg:py-14">
        {/* Mobile: always collage first, then text */}
        <div className="lg:hidden">
          <ImageCollage
            images={project.images}
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
                images={project.images}
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
                images={project.images}
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
  const {
    projects: allProjects,
    pages: {
      homepage: { projectGallery },
    },
  } = useContent();
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const resolvedProjects: FeaturedProject[] = projectGallery.projects.values
    .map((ref) => {
      const project = allProjects.find((p) => p.id === ref.id);
      if (!project) return null;
      return {
        name: project.name,
        description: project.description,
        images: ref.featuredImages,
        details: project.details,
      } satisfies FeaturedProject;
    })
    .filter((p): p is FeaturedProject => p !== null);

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
        {resolvedProjects.map((project, i) => (
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
