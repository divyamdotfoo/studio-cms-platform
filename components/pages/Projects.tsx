"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { XIcon, Check } from "lucide-react";
import { useContent } from "@/lib/content-ctx";
import { spring, springGentle, STAGGER } from "@/lib/motion";
import type { Project } from "@/cms/types";
import { cn } from "@/lib/utils";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogImage,
  MorphingDialogContainer,
} from "@/components/effects/morphing-dialog";

/* ────────────────────────────────────────────────────
 * Projects page
 *
 * Full project showcase with:
 *   - Page header
 *   - Alternating sticky-scroll layout per project
 *   - "Wall of photos" arrangement with morphing dialog
 *   - Features list, details, description
 *
 * Palette: ink, stone, drift, bronze, sand, ivory, cream
 * ──────────────────────────────────────────────────── */

/* ── PhotoStrip — vertically stacked photos with white borders ── */

function PhotoStrip({
  images,
  name,
  isInView,
  baseDelay = 0,
}: {
  images: string[];
  name: string;
  isInView: boolean;
  baseDelay?: number;
}) {
  return (
    <div className="bg-ivory p-2 lg:p-3 shadow-[0_2px_20px_-4px_rgba(26,26,26,0.10)]">
      <div className="flex flex-col gap-2 lg:gap-3">
        {images.slice(0, 4).map((imgPath, i) => (
          <motion.div
            key={imgPath}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: baseDelay + i * STAGGER * 3 }}
          >
            <MorphingDialog
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <MorphingDialogTrigger className="w-full block">
                <MorphingDialogImage
                  src={imgPath}
                  alt={`${name} — photo ${i + 1}`}
                  className="w-full aspect-4/3 object-cover select-none"
                />
              </MorphingDialogTrigger>
              <MorphingDialogContainer>
                <MorphingDialogContent className="relative">
                  <MorphingDialogImage
                    src={imgPath}
                    alt={`${name} — photo ${i + 1}`}
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
        ))}
      </div>
    </div>
  );
}

/* ── ProjectContent — scrollable text column ──────── */

function ProjectContent({
  project,
  index,
  isInView,
  reversed,
  baseDelay = 0,
}: {
  project: Project;
  index: number;
  isInView: boolean;
  reversed: boolean;
  baseDelay?: number;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className={cn(
        "flex flex-col justify-center py-8 lg:py-16",
        reversed && "lg:items-end lg:text-right"
      )}
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
      <motion.h2
        className="font-serif text-[clamp(1.8rem,5vw,3rem)] leading-[1.1] tracking-[-0.01em] text-ink mb-4 lg:mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...springGentle, delay: baseDelay + 0.15 }}
      >
        {project.name}
      </motion.h2>

      {/* Bronze accent line */}
      <motion.div
        className={cn(
          "w-10 h-px bg-bronze mb-5 lg:mb-6",
          reversed ? "origin-right ml-auto lg:ml-0" : "origin-left"
        )}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ ...spring, delay: baseDelay + 0.25 }}
      />

      {/* Description */}
      <motion.p
        className={cn(
          "text-[15px] leading-[1.8] text-stone mb-8 lg:mb-10",
          reversed ? "lg:max-w-[460px] lg:ml-auto" : "max-w-[460px]"
        )}
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...spring, delay: baseDelay + 0.3 }}
      >
        {project.description}
      </motion.p>

      {/* Features list */}
      <motion.div
        className={cn(
          "mb-8 lg:mb-10",
          reversed ? "lg:max-w-[460px] lg:ml-auto" : "max-w-[460px]"
        )}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ ...spring, delay: baseDelay + 0.35 }}
      >
        <span className="text-[11px] uppercase tracking-widest text-drift block mb-4">
          Key Features
        </span>
        <ul className="space-y-3">
          {project.features.map((feature, i) => (
            <motion.li
              key={feature}
              className={cn(
                "flex items-start gap-3 text-[14px] leading-[1.7] text-stone",
                reversed && "lg:flex-row-reverse lg:text-right"
              )}
              initial={{ opacity: 0, x: reversed ? 12 : -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                ...spring,
                delay: baseDelay + 0.4 + i * STAGGER,
              }}
            >
              <Check className="size-4 text-bronze mt-[3px] shrink-0" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Detail chips */}
      <motion.div
        className={cn(
          "flex flex-wrap gap-x-6 gap-y-3",
          reversed && "lg:justify-end"
        )}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ ...spring, delay: baseDelay + 0.55 }}
      >
        {project.details.map((d, i) => (
          <motion.div
            key={d.label}
            className={cn("flex flex-col", reversed && "lg:items-end")}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              ...spring,
              delay: baseDelay + 0.55 + i * STAGGER * 2,
            }}
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
    </div>
  );
}

/* ── ProjectSection — single project with sticky photo grid ── */

function ProjectSection({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reversed = index % 2 === 1;

  return (
    <div ref={ref}>
      {/* Divider between projects */}
      {index > 0 && (
        <motion.div
          className="h-px bg-sand mx-auto max-w-[600px] my-12 lg:my-20 origin-center"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={spring}
        />
      )}

      {/* Mobile: photos first, then content */}
      <div className="lg:hidden">
        <PhotoStrip
          images={project.images}
          name={project.name}
          isInView={isInView}
        />
        <ProjectContent
          project={project}
          index={index}
          isInView={isInView}
          reversed={false}
        />
      </div>

      {/* Desktop: photos scroll, content sticks */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:items-start">
        {/* Photos column — tall, scrolls naturally */}
        <div className={reversed ? "lg:order-2" : ""}>
          <PhotoStrip
            images={project.images}
            name={project.name}
            isInView={isInView}
          />
        </div>
        {/* Content column — sticky */}
        <div
          className={cn(
            "lg:sticky lg:top-24 lg:self-start",
            reversed ? "lg:order-1" : ""
          )}
        >
          <ProjectContent
            project={project}
            index={index}
            isInView={isInView}
            reversed={reversed}
          />
        </div>
      </div>
    </div>
  );
}

/* ── ProjectsPage — main export ──────────────────── */

export function ProjectsPage() {
  const { projects } = useContent();
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <main>
      <section
        className="pt-20 lg:pt-28 pb-16 lg:pb-24"
        aria-label="All Projects"
      >
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          {/* ── Page header ── */}
          <div ref={headerRef}>
            <motion.span
              className="text-[13px] uppercase tracking-widest text-drift block mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 8 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={spring}
            >
              Our Projects
            </motion.span>

            <motion.h1
              className="font-serif text-[clamp(2rem,8vw,3.6rem)] lg:text-[clamp(2.4rem,5vw,4.2rem)] leading-none tracking-[-0.02em] text-ink mb-6 lg:mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...springGentle, delay: 0.08 }}
            >
              <span className="block">Every project tells</span>
              <span className="block">
                a different{" "}
                <em className="font-serif italic text-bronze">story</em>
              </span>
            </motion.h1>

            <motion.div
              className="w-12 h-px bg-bronze mb-6 lg:mb-8 origin-left"
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ ...spring, delay: 0.2 }}
            />

            <motion.p
              className="text-[15px] lg:text-base leading-[1.8] text-stone max-w-[560px] mb-12 lg:mb-20"
              initial={{ opacity: 0, y: 12 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...spring, delay: 0.25 }}
            >
              From family homes in Haridwar to contemporary villas in Rishikesh
              — each space is designed around the people who live in it. Browse
              our work and see the details that make a difference.
            </motion.p>
          </div>

          {/* ── Project list ── */}
          {projects.map((project, i) => (
            <ProjectSection key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
