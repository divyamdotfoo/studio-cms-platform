"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useContent } from "@/lib/content-ctx";
import { spring, springGentle, springSnap, STAGGER } from "@/lib/motion";
import type { ServiceItem } from "@/cms/types";

/* ────────────────────────────────────────────────────
 * ServiceRow — expandable on hover (desktop) / tap (mobile)
 * ──────────────────────────────────────────────────── */

interface RowProps {
  service: ServiceItem;
  index: number;
  isInView: boolean;
  isExpanded: boolean;
  onHover: () => void;
  onLeave: () => void;
  onToggle: () => void;
}

function ServiceRow({
  service,
  index,
  isInView,
  isExpanded,
  onHover,
  onLeave,
  onToggle,
}: RowProps) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ ...spring, delay: index * STAGGER * 2.5 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onPointerDown={(e) => {
        if (e.pointerType === "touch") onToggle();
      }}
    >
      {/* Top border */}
      <motion.div
        className="h-px origin-left bg-sand"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ ...spring, delay: index * STAGGER * 2.5 + 0.08 }}
      />

      {/* Main row */}
      <div className="relative grid grid-cols-[36px_1fr_auto] lg:grid-cols-[60px_1fr_auto] items-baseline gap-4 lg:gap-8 py-5 lg:py-7 cursor-pointer">
        {/* Number */}
        <motion.span
          className="font-serif text-sm"
          animate={{ color: isExpanded ? "#8B7355" : "#94908A" }}
          transition={springSnap}
        >
          {service.num}
        </motion.span>

        {/* Title */}
        <motion.h3
          className="font-serif text-xl lg:text-[1.75rem] tracking-[-0.01em] text-ink"
          animate={{ x: isExpanded ? 6 : 0 }}
          transition={springSnap}
        >
          {service.title}
        </motion.h3>

        {/* Arrow */}
        <motion.div
          animate={{
            rotate: isExpanded ? -45 : 0,
            x: isExpanded ? 2 : 0,
          }}
          transition={springSnap}
        >
          <svg
            className="w-4 h-4 lg:w-5 lg:h-5 text-drift"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17L17 7M17 7H7M17 7v10"
            />
          </svg>
        </motion.div>
      </div>

      {/* Expandable detail */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springSnap}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[60px_1fr_1fr] gap-4 lg:gap-8 pb-6 lg:pb-8 pl-10 lg:pl-0">
              {/* Spacer — desktop only */}
              <div className="hidden lg:block" />

              {/* Description */}
              <motion.p
                initial={{ y: 8 }}
                animate={{ y: 0 }}
                transition={springSnap}
                className="text-[15px] leading-[1.8] text-stone max-w-[440px]"
              >
                {service.description}
              </motion.p>

              {/* Deliverables */}
              <div className="flex flex-wrap gap-x-4 lg:gap-x-6 gap-y-2 items-start">
                {service.deliverables.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...springSnap, delay: i * 0.04 }}
                    className="text-[13px] uppercase tracking-[0.08em] text-bronze whitespace-nowrap"
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
 * Heading renderer — replaces {italic} token
 * ──────────────────────────────────────────────────── */

function RichHeadingLine({
  template,
  italicWord,
}: {
  template: string;
  italicWord: string;
}) {
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
  const { pages: { homepage: { services } } } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section ref={sectionRef} className="py-16 lg:py-28" aria-label="Services">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        {/* ── Section header ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-5 lg:gap-14 mb-12 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={springGentle}
          >
            <span className="text-[13px] uppercase tracking-[0.12em] text-drift block mb-4 lg:mb-5">
              {services.label}
            </span>
            <h2 className="font-serif text-[clamp(1.8rem,6vw,3.4rem)] leading-[1.05] tracking-[-0.015em] text-ink">
              {services.heading.line1}
              <br />
              <RichHeadingLine
                template={services.heading.line2}
                italicWord={services.heading.italicWord}
              />
            </h2>
          </motion.div>

          <motion.p
            className="text-[15px] leading-[1.8] text-stone lg:self-end"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...springGentle, delay: STAGGER * 3 }}
          >
            {services.description}
          </motion.p>
        </div>

        {/* ── Stats strip ── */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 lg:gap-y-0 mb-10 lg:mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ ...spring, delay: STAGGER * 4 }}
        >
          {services.stats.values.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative py-4 lg:py-8"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                ...spring,
                delay: STAGGER * 4 + i * STAGGER * 2,
              }}
            >
              {/* Vertical divider — desktop only */}
              {i > 0 && (
                <motion.div
                  className="absolute left-0 top-6 bottom-6 w-px origin-top hidden lg:block bg-sand"
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{
                    ...spring,
                    delay: STAGGER * 4 + i * STAGGER * 2,
                  }}
                />
              )}

              <div className={`${i > 0 ? "lg:pl-10" : ""}`}>
                <span className="font-serif text-[2rem] lg:text-[2.8rem] leading-none tracking-tight text-ink">
                  {stat.value}
                </span>
                <span className="block mt-1.5 lg:mt-2 text-xs lg:text-[13px] uppercase tracking-[0.08em] text-drift">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Service rows ── */}
        <div>
          {services.items.values.map((service, i) => (
            <ServiceRow
              key={service.num}
              service={service}
              index={i}
              isInView={isInView}
              isExpanded={expandedIndex === i}
              onHover={() => setExpandedIndex(i)}
              onLeave={() => setExpandedIndex(null)}
              onToggle={() => handleToggle(i)}
            />
          ))}

          {/* Bottom border */}
          <motion.div
            className="h-px origin-left bg-sand"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{
              ...spring,
              delay: services.items.values.length * STAGGER * 2.5 + 0.05,
            }}
          />
        </div>
      </div>
    </section>
  );
}
