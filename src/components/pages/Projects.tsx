"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, Transition } from "motion/react";
import { XIcon, Check } from "lucide-react";
import { useContent } from "@/lib/content-ctx";
import { spring, springGentle, STAGGER } from "@/lib/motion";
import type { Project as PayloadProject } from "@/payload-types";
import { cn } from "@/lib/utils";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogImage,
  MorphingDialogContainer,
} from "@/components/effects/morphing-dialog";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

/* ────────────────────────────────────────────────────
 * Projects page
 *
 * Each text element observes its own viewport entry
 * so content animates in naturally as the user scrolls.
 * Photos scroll freely; content column sticks on desktop.
 *
 * Palette: ink, stone, drift, bronze, sand, ivory, cream
 * ──────────────────────────────────────────────────── */

const VIEW_MARGIN = "-12%";

interface Project {
  id: number;
  name: string;
  description: string;
  images: string[];
  features: string[];
  details: { label: string; value: string }[];
}

/* ── Reveal — self-observing animated wrapper ─────── */

function Reveal({
  children,
  className,
  y = 18,
  x = 0,
  scaleX,
  delay = 0,
  transition = spring,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  x?: number;
  scaleX?: number;
  delay?: number;
  transition?: Transition;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: VIEW_MARGIN });

  const initial: Record<string, number> = { opacity: 0 };
  const animate: Record<string, number> = { opacity: 1 };

  if (scaleX !== undefined) {
    initial.scaleX = 0;
    animate.scaleX = 1;
  } else {
    if (y) {
      initial.y = y;
      animate.y = 0;
    }
    if (x) {
      initial.x = x;
      animate.x = 0;
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={inView ? animate : initial}
      transition={{ ...transition, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── PhotoStrip — vertically stacked photos with white borders ── */

function PhotoStrip({
  images,
  name,
  projectIndex = 0,
  scrollable = false,
}: {
  images: string[];
  name: string;
  projectIndex?: number;
  scrollable?: boolean;
}) {
  return (
    <div
      className={cn(
        "bg-ivory shadow-[0_2px_20px_-4px_rgba(26,26,26,0.10)]",
        scrollable
          ? "h-[70vh] max-h-[500px] min-h-[320px] overflow-y-auto scrollbar-hide p-1.5 sm:p-2"
          : "p-1.5 sm:p-2 lg:p-3"
      )}
    >
      <div
        className={cn(
          "flex flex-col",
          scrollable ? "gap-1.5 sm:gap-2" : "gap-1.5 sm:gap-2 lg:gap-3"
        )}
      >
        {images.slice(0, 4).map((imgPath, i) => (
          <PhotoFrame
            key={imgPath}
            src={imgPath}
            alt={`${name} — photo ${i + 1}`}
            index={i}
            loading={projectIndex === 0 && i === 0 ? "eager" : "lazy"}
            fetchPriority={projectIndex === 0 && i === 0 ? "high" : "auto"}
          />
        ))}
      </div>
    </div>
  );
}

function PhotoFrame({
  src,
  alt,
  index,
  loading = "lazy",
  fetchPriority = "auto",
}: {
  src: string;
  alt: string;
  index: number;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-4%" });

  return (
    <motion.div
      ref={ref}
      initial={{ filter: "grayscale(1)", y: 20 }}
      animate={inView ? { filter: "grayscale(0)", y: 0 } : {}}
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay: index * STAGGER * 2,
      }}
    >
      <MorphingDialog transition={{ duration: 0.3, ease: "easeInOut" }}>
        <MorphingDialogTrigger className="w-full block">
          <MorphingDialogImage
            src={src}
            alt={alt}
            className="w-full aspect-4/3 object-cover select-none"
            loading={loading}
            fetchPriority={fetchPriority}
          />
        </MorphingDialogTrigger>
        <MorphingDialogContainer>
          <MorphingDialogContent className="relative">
            <MorphingDialogImage
              src={src}
              alt={alt}
              className="h-auto w-full max-w-[90vw] max-h-[90vh] md:max-w-[70vw] lg:max-h-[70vh] rounded-[4px] object-contain"
              loading="lazy"
              fetchPriority="auto"
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
  );
}

function MobilePhotoCarousel({
  images,
  name,
  projectIndex,
}: {
  images: string[];
  name: string;
  projectIndex: number;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleImages = images.slice(0, 4);

  useEffect(() => {
    if (!api) return;

    const updateActiveIndex = () => setActiveIndex(api.selectedScrollSnap());
    updateActiveIndex();
    api.on("select", updateActiveIndex);
    api.on("reInit", updateActiveIndex);

    return () => {
      api.off("select", updateActiveIndex);
      api.off("reInit", updateActiveIndex);
    };
  }, [api]);

  return (
    <div className="bg-ivory shadow-[0_2px_20px_-4px_rgba(26,26,26,0.10)] p-1.5 sm:p-2">
      <Carousel
        setApi={setApi}
        opts={{ align: "start" }}
        aria-label={`${name} images`}
      >
        <CarouselContent className="ml-0">
          {visibleImages.map((imgPath, i) => (
            <CarouselItem key={imgPath} className="pl-0">
              <PhotoFrame
                src={imgPath}
                alt={`${name} — photo ${i + 1}`}
                index={i}
                loading={projectIndex === 0 && i === 0 ? "eager" : "lazy"}
                fetchPriority={projectIndex === 0 && i === 0 ? "high" : "auto"}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {visibleImages.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {visibleImages.map((_, dotIndex) => {
            const isActive = activeIndex === dotIndex;
            return (
              <button
                key={dotIndex}
                type="button"
                onClick={() => api?.scrollTo(dotIndex)}
                aria-label={`Go to image ${dotIndex + 1}`}
                aria-current={isActive}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  isActive ? "bg-bronze scale-110" : "bg-sand/70"
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── ProjectContent — text column with per-element reveal ── */

function ProjectContent({
  project,
  index,
  reversed,
}: {
  project: Project;
  index: number;
  reversed: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className={cn(
        "flex flex-col py-6 sm:py-8 lg:py-16",
        reversed && "lg:items-end lg:text-right"
      )}
    >
      {/* Project number */}
      <Reveal y={10}>
        <span className="text-[12px] sm:text-[13px] uppercase tracking-widest text-drift mb-3 sm:mb-4 lg:mb-5 block">
          Project {num}
        </span>
      </Reveal>

      {/* Name */}
      <Reveal y={24} transition={springGentle}>
        <h2 className="font-serif text-[clamp(1.5rem,6vw,3rem)] leading-[1.1] tracking-[-0.01em] text-ink mb-3 sm:mb-4 lg:mb-6">
          {project.name}
        </h2>
      </Reveal>

      {/* Bronze accent line */}
      <Reveal
        scaleX={0}
        className={cn(
          "w-10 h-px bg-bronze mb-4 sm:mb-5 lg:mb-6",
          reversed ? "origin-right ml-auto lg:ml-0" : "origin-left"
        )}
      >
        <span className="sr-only">divider</span>
      </Reveal>

      {/* Description */}
      <Reveal y={14}>
        <p
          className={cn(
            "text-[14px] sm:text-[15px] leading-[1.75] sm:leading-[1.8] text-stone mb-6 sm:mb-8 lg:mb-10",
            reversed ? "lg:max-w-[460px] lg:ml-auto" : "max-w-[460px]"
          )}
        >
          {project.description}
        </p>
      </Reveal>

      {/* Features list */}
      <div
        className={cn(
          "mb-6 sm:mb-8 lg:mb-10",
          reversed ? "lg:max-w-[460px] lg:ml-auto" : "max-w-[460px]"
        )}
      >
        <Reveal y={10}>
          <span className="text-[11px] uppercase tracking-widest text-drift block mb-3 sm:mb-4">
            Key Features
          </span>
        </Reveal>
        <ul className="space-y-2.5 sm:space-y-3">
          {project.features.map((feature, i) => (
            <FeatureItem
              key={feature}
              feature={feature}
              index={i}
              reversed={reversed}
            />
          ))}
        </ul>
      </div>

      {/* Detail chips */}
      <div
        className={cn(
          "flex flex-wrap gap-x-5 sm:gap-x-6 gap-y-3",
          reversed && "lg:justify-end"
        )}
      >
        {project.details.map((d, i) => (
          <DetailChip
            key={d.label}
            label={d.label}
            value={d.value}
            index={i}
            reversed={reversed}
          />
        ))}
      </div>
    </div>
  );
}

function FeatureItem({
  feature,
  index,
  reversed,
}: {
  feature: string;
  index: number;
  reversed: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: VIEW_MARGIN });

  return (
    <motion.li
      ref={ref}
      className={cn(
        "flex items-start gap-2.5 sm:gap-3 text-[13px] sm:text-[14px] leading-[1.7] text-stone",
        reversed && "lg:flex-row-reverse lg:text-right"
      )}
      initial={{ opacity: 0, x: reversed ? 14 : -14 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ ...spring, delay: index * STAGGER }}
    >
      <Check className="size-3.5 sm:size-4 text-bronze mt-[3px] shrink-0" />
      <span>{feature}</span>
    </motion.li>
  );
}

function DetailChip({
  label,
  value,
  index,
  reversed,
}: {
  label: string;
  value: string;
  index: number;
  reversed: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: VIEW_MARGIN });

  return (
    <motion.div
      ref={ref}
      className={cn("flex flex-col", reversed && "lg:items-end")}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring, delay: index * STAGGER * 2 }}
    >
      <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-drift">
        {label}
      </span>
      <span className="text-[13px] sm:text-sm text-ink font-medium mt-0.5">
        {value}
      </span>
    </motion.div>
  );
}

/* ── ProjectSection — single project block ───────── */

function ProjectSection({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const dividerRef = useRef<HTMLDivElement>(null);
  const dividerInView = useInView(dividerRef, {
    once: true,
    margin: VIEW_MARGIN,
  });
  const reversed = index % 2 === 1;

  return (
    <div>
      {/* Divider between projects */}
      {index > 0 && (
        <motion.div
          ref={dividerRef}
          className="h-px bg-sand mx-auto max-w-[400px] sm:max-w-[600px] my-10 sm:my-12 lg:my-20 origin-center"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={dividerInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={spring}
        />
      )}

      {/* Mobile + tablet: photos in scrollable container, then content */}
      <div className="lg:hidden">
        <MobilePhotoCarousel
          images={project.images}
          name={project.name}
          projectIndex={index}
        />
        <ProjectContent project={project} index={index} reversed={false} />
      </div>

      {/* Desktop: photos scroll, content sticks */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:items-start">
        <div className={reversed ? "lg:order-2" : ""}>
          <PhotoStrip
            images={project.images}
            name={project.name}
            projectIndex={index}
          />
        </div>
        <div
          className={cn(
            "lg:sticky lg:top-24 lg:self-start",
            reversed ? "lg:order-1" : ""
          )}
        >
          <ProjectContent project={project} index={index} reversed={reversed} />
        </div>
      </div>
    </div>
  );
}

/* ── Architectural sketch illustrations ───────────── */

interface SketchPath {
  d: string;
  accent?: boolean;
  dashed?: boolean;
}

interface SketchDef {
  viewBox: string;
  className: string;
  paths: SketchPath[];
}

const HEADER_SKETCHES: SketchDef[] = [
  {
    viewBox: "0 0 120 100",
    className: "w-28 lg:w-40",
    paths: [
      { d: "M10 90 L10 35 L60 8 L110 35 L110 90" },
      { d: "M10 90 L110 90" },
      { d: "M45 90 L45 65 L75 65 L75 90" },
      { d: "M25 45 L25 68 L42 68 L42 45" },
      { d: "M78 45 L78 68 L95 68 L95 45" },
      { d: "M33 45 L33 68", accent: true },
      { d: "M86 45 L86 68", accent: true },
      { d: "M60 8 L60 2", accent: true },
      { d: "M55 2 L65 2", accent: true },
      { d: "M20 90 L20 95", accent: true, dashed: true },
      { d: "M100 90 L100 95", accent: true, dashed: true },
      { d: "M20 95 L100 95", accent: true, dashed: true },
    ],
  },
  {
    viewBox: "0 0 90 110",
    className: "w-24 lg:w-32",
    paths: [
      { d: "M10 110 L10 10 L80 10 L80 110" },
      { d: "M10 10 L45 2 L80 10" },
      { d: "M25 30 L40 30 L40 50 L25 50 Z" },
      { d: "M50 30 L65 30 L65 50 L50 50 Z" },
      { d: "M35 110 L35 75 L55 75 L55 110" },
      { d: "M25 60 L65 60", accent: true },
      { d: "M32 30 L32 50", accent: true },
      { d: "M57 30 L57 50", accent: true },
      { d: "M10 70 L80 70", accent: true, dashed: true },
    ],
  },
  {
    viewBox: "0 0 100 90",
    className: "w-24 lg:w-36",
    paths: [
      { d: "M5 85 L5 25" },
      { d: "M95 85 L95 25" },
      { d: "M5 25 Q5 5 50 5 Q95 5 95 25" },
      { d: "M5 85 L95 85" },
      { d: "M30 85 L30 50" },
      { d: "M70 85 L70 50" },
      { d: "M30 50 Q30 35 50 35 Q70 35 70 50" },
      { d: "M50 5 L50 35", accent: true },
      { d: "M5 55 L30 55", accent: true, dashed: true },
      { d: "M70 55 L95 55", accent: true, dashed: true },
      { d: "M18 25 L18 85", accent: true, dashed: true },
      { d: "M82 25 L82 85", accent: true, dashed: true },
    ],
  },
];

function ArchSketch({
  sketch,
  inView,
  delay = 0,
}: {
  sketch: SketchDef;
  inView: boolean;
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
          animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
          transition={{
            pathLength: {
              duration: 2.2,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.15,
            },
            opacity: { duration: 0.5, delay: delay + i * 0.15 },
          }}
        />
      ))}
    </svg>
  );
}

function HeaderSketches() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div
      ref={ref}
      className="hidden lg:flex items-center justify-center gap-10 xl:gap-14 opacity-70"
    >
      {HEADER_SKETCHES.map((sketch, i) => (
        <div
          key={i}
          className="relative"
          style={{
            transform: `translateY(${i % 2 === 0 ? -12 : 12}px) rotate(${
              i === 0 ? -3 : i === 1 ? 2 : -1.5
            }deg)`,
          }}
        >
          <ArchSketch sketch={sketch} inView={inView} delay={i * 0.4} />
        </div>
      ))}
    </div>
  );
}

/* ── ProjectsPage — main export ──────────────────── */

export function ProjectsPage() {
  const { projects, projectsPage } = useContent();
  const normalizedProjects: Project[] = projects.map(
    (project: PayloadProject) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      images:
        project.projectImage
          ?.map((image) => {
            if (typeof image.value === "number") return null;
            return image.value.url ?? null;
          })
          .filter((url): url is string => Boolean(url)) ?? [],
      features: project.features.map((item) => item.feature),
      details: [
        { label: "Area", value: project.area },
        { label: "Timeline", value: project.timeline },
        { label: "Type", value: project.type },
        { label: "Location", value: project.location },
      ],
    })
  );

  return (
    <main>
      <section
        className="pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-24"
        aria-label="All Projects"
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-5 lg:px-10">
          {/* ── Page header ── */}
          <div className="lg:grid lg:grid-cols-[1fr_auto] lg:gap-16 xl:gap-24 lg:items-end lg:mb-20">
            <div>
              <Reveal y={30} transition={springGentle}>
                <h1 className="font-serif text-[clamp(1.8rem,8vw,3.6rem)] lg:text-[clamp(2.4rem,5vw,4.2rem)] leading-none tracking-[-0.02em] text-ink mb-5 sm:mb-6 lg:mb-8">
                  <span className="block">
                    {projectsPage.heroHeadlinePartOne}
                  </span>
                  <span className="block">
                    <em className="font-serif italic text-bronze">
                      {projectsPage.heroHeadlinePartTwo}
                    </em>
                  </span>
                </h1>
              </Reveal>

              <Reveal
                scaleX={0}
                className="w-12 h-px bg-bronze mb-5 sm:mb-6 lg:mb-8 origin-left"
              >
                <span className="sr-only">divider</span>
              </Reveal>

              <Reveal y={14}>
                <p className="text-[14px] sm:text-[15px] lg:text-base leading-[1.75] sm:leading-[1.8] text-stone max-w-[560px] mb-10 sm:mb-12 lg:mb-0">
                  {projectsPage.heroDescription}
                </p>
              </Reveal>
            </div>

            <HeaderSketches />
          </div>

          {/* ── Project list ── */}
          {normalizedProjects.map((project, i) => (
            <ProjectSection key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
