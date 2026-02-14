"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useContent } from "@/lib/content-ctx";
import { spring, springGentle, springSnap, STAGGER } from "@/lib/motion";
import type { ServiceItem } from "@/cms/types";

/* ────────────────────────────────────────────────────
 * ServiceRow — expandable on hover
 * ──────────────────────────────────────────────────── */

interface RowProps {
  service: ServiceItem;
  index: number;
  isInView: boolean;
  isExpanded: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function ServiceRow({ service, index, isInView, isExpanded, onHover, onLeave }: RowProps) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ ...spring, delay: index * STAGGER * 2.5 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Top border — draws in on scroll */}
      <motion.div
        className="h-px origin-left"
        style={{ backgroundColor: "#C4C1B8" }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ ...spring, delay: index * STAGGER * 2.5 + 0.05 }}
      />

      {/* Hover background */}
      <motion.div
        className="absolute inset-0 top-px bg-deep-black/2 pointer-events-none"
        initial={false}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={springSnap}
      />

      {/* Main row content */}
      <div className="relative grid grid-cols-[60px_1fr_auto] items-baseline gap-8 py-7 cursor-pointer">
        {/* Number */}
        <motion.span
          className="font-serif text-sm text-deep-black/25"
          animate={{ color: isExpanded ? "rgba(139, 115, 85, 0.6)" : "rgba(26, 26, 26, 0.25)" }}
          transition={springSnap}
        >
          {service.num}
        </motion.span>

        {/* Title */}
        <motion.h3
          className="font-serif text-[1.75rem] tracking-[-0.01em] text-deep-black"
          animate={{ x: isExpanded ? 6 : 0 }}
          transition={springSnap}
        >
          {service.title}
        </motion.h3>

        {/* Arrow */}
        <motion.div
          animate={{ rotate: isExpanded ? -45 : 0, x: isExpanded ? 2 : 0 }}
          transition={springSnap}
        >
          <svg
            className="w-5 h-5 text-deep-black/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </motion.div>
      </div>

      {/* Expandable detail area */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springSnap}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-[60px_1fr_1fr] gap-8 pb-8">
              {/* Spacer for alignment with number column */}
              <div />

              {/* Description */}
              <motion.p
                initial={{ y: 8 }}
                animate={{ y: 0 }}
                transition={springSnap}
                className="text-sm leading-[1.8] text-deep-black/50 max-w-[440px]"
              >
                {service.description}
              </motion.p>

              {/* Deliverables */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 items-start">
                {service.deliverables.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...springSnap, delay: i * 0.04 }}
                    className="text-xs uppercase tracking-[0.08em] text-earth-brown/60 whitespace-nowrap"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────
 * Heading renderer — replaces {italic} token with
 * an italic <span> using the provided word.
 * ──────────────────────────────────────────────────── */

function RichHeadingLine({ template, italicWord }: { template: string; italicWord: string }) {
  const parts = template.split("{italic}");
  return (
    <>
      {parts[0]}
      <span className="italic">{italicWord}</span>
      {parts[1]}
    </>
  );
}

/* ────────────────────────────────────────────────────
 * Services section
 * ──────────────────────────────────────────────────── */

export function Services() {
  const { services } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="py-28" aria-label="Services">
      <div className="mx-auto max-w-[1400px] px-10">

        {/* ── Section header ── */}
        <div className="grid grid-cols-[1fr_380px] gap-14 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={springGentle}
          >
            <span className="text-xs uppercase tracking-[0.12em] text-deep-black/35 block mb-5">
              {services.label}
            </span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] leading-[1.05] tracking-[-0.015em]">
              {services.heading.line1}
              <br />
              <RichHeadingLine
                template={services.heading.line2}
                italicWord={services.heading.italicWord}
              />
            </h2>
          </motion.div>

          <motion.p
            className="text-sm leading-[1.8] text-deep-black/45 self-end"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...springGentle, delay: STAGGER * 3 }}
          >
            {services.description}
          </motion.p>
        </div>

        {/* ── Stats strip — credibility ── */}
        <motion.div
          className="grid grid-cols-4 mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ ...spring, delay: STAGGER * 4 }}
        >
          {services.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative py-8"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...spring, delay: STAGGER * 4 + i * STAGGER * 2 }}
            >
              {/* Left border on all except first */}
              {i > 0 && (
                <motion.div
                  className="absolute left-0 top-6 bottom-6 w-px origin-top"
                  style={{ backgroundColor: "#C4C1B8" }}
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ ...spring, delay: STAGGER * 4 + i * STAGGER * 2 }}
                />
              )}
              <div className={i > 0 ? "pl-10" : ""}>
                <span className="font-serif text-[2.8rem] leading-none tracking-tight text-deep-black">
                  {stat.value}
                </span>
                <span className="block mt-2 text-xs uppercase tracking-[0.08em] text-deep-black/35">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Service rows — expandable list ── */}
        <div>
          {services.items.map((service, i) => (
            <ServiceRow
              key={service.num}
              service={service}
              index={i}
              isInView={isInView}
              isExpanded={expandedIndex === i}
              onHover={() => setExpandedIndex(i)}
              onLeave={() => setExpandedIndex(null)}
            />
          ))}

          {/* Bottom border for the last row */}
          <motion.div
            className="h-px origin-left"
            style={{ backgroundColor: "#C4C1B8" }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ ...spring, delay: services.items.length * STAGGER * 2.5 + 0.05 }}
          />
        </div>
      </div>
    </section>
  );
}
