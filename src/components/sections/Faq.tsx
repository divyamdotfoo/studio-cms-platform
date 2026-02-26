"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { useContent } from "@/lib/content-ctx";
import { spring, springGentle, springSnap, STAGGER } from "@/lib/motion";
import type { Faq as FaqItem } from "@/payload-types";

/* ────────────────────────────────────────────────────
 * FaqRow — expandable on hover (desktop) / tap (mobile)
 *
 * Mirrors ServiceRow interaction: hover to expand on
 * desktop, tap to toggle on mobile.
 * ──────────────────────────────────────────────────── */

interface RowProps {
  item: FaqItem;
  index: number;
  isInView: boolean;
  isExpanded: boolean;
  onHover: () => void;
  onLeave: () => void;
  onToggle: () => void;
}

function FaqRow({
  item,
  index,
  isInView,
  isExpanded,
  onHover,
  onLeave,
  onToggle,
}: RowProps) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ ...spring, delay: index * STAGGER * 2.5 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Top border */}
      <motion.div
        className="h-px origin-left bg-sand"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ ...spring, delay: index * STAGGER * 2.5 + 0.08 }}
      />

      {/* Question row */}
      <div
        className="relative grid grid-cols-[36px_1fr_auto] lg:grid-cols-[60px_1fr_auto] items-baseline gap-4 lg:gap-8 py-5 lg:py-7 cursor-pointer"
        onClick={onToggle}
      >
        {/* Number */}
        <motion.span
          className="font-serif text-sm"
          animate={{ color: isExpanded ? "#8B7355" : "#94908A" }}
          transition={springSnap}
        >
          {num}
        </motion.span>

        {/* Question */}
        <motion.h3
          className="font-serif text-xl lg:text-[1.75rem] tracking-[-0.01em] text-ink"
          animate={{ x: isExpanded ? 6 : 0 }}
          transition={springSnap}
        >
          {item.question}
        </motion.h3>

        {/* Plus/minus indicator */}
        <motion.div
          className="flex items-center justify-center w-5 h-5 lg:w-6 lg:h-6"
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={springSnap}
        >
          <Plus
            className="w-4 h-4 lg:w-5 lg:h-5 text-drift"
            strokeWidth={1.5}
          />
        </motion.div>
      </div>

      {/* Expandable answer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springSnap}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[60px_1fr] gap-4 lg:gap-8 pb-6 lg:pb-8 pl-10 lg:pl-0">
              <div className="hidden lg:block" />
              <motion.p
                initial={{ y: 8 }}
                animate={{ y: 0 }}
                transition={springSnap}
                className="text-[15px] leading-[1.8] text-stone max-w-[600px]"
              >
                {item.answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────
 * FAQ section
 *
 * Layout mirrors Reviews & Social:
 * Desktop: sticky heading left | FAQ rows right
 * Mobile:  heading top, rows below
 * ──────────────────────────────────────────────────── */

export function Faq() {
  const { homepage, faq } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const faqById = new Map(faq.map((item) => [item.id, item]));
  const faqItems = homepage.faqSectionItems
    .map((item) =>
      typeof item.value === "number"
        ? faqById.get(item.value) ?? null
        : item.value
    )
    .filter((item): item is FaqItem => item !== null);

  const handleToggle = (index: number, isExpanded: boolean) => {
    if (isExpanded) {
      setExpandedIndexes((prev) => prev.filter((item) => item !== index));
      setHoveredIndex((prev) => (prev === index ? null : prev));
      return;
    }

    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev : [...prev, index]
    );
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-28"
      aria-label="Frequently asked questions"
    >
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        {/* Top divider */}
        <motion.div
          className="h-px bg-sand origin-left mb-16 lg:mb-20"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={spring}
        />

        <div className="lg:grid lg:grid-cols-[340px_1fr] lg:gap-20">
          {/* ── Left — sticky heading ── */}
          <div className="lg:relative">
            <motion.div
              className="lg:sticky lg:top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={springGentle}
            >
              <span className="text-[13px] uppercase tracking-[0.12em] text-drift block mb-4 lg:mb-5">
                {homepage.faqSectionLabel}
              </span>
              <h2 className="font-serif text-[clamp(1.8rem,6vw,3.4rem)] leading-[1.05] tracking-[-0.015em] text-ink">
                {homepage.faqSectionHeadlinePartOne}
                <br />
                {homepage.faqSectionHeadlinePartTwo}
              </h2>

              <motion.p
                className="mt-5 lg:mt-6 text-[15px] leading-[1.75] text-stone max-w-[320px]"
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...springGentle, delay: 0.15 }}
              >
                {homepage.faqSectionDescription}
              </motion.p>
            </motion.div>
          </div>

          {/* ── Right — FAQ rows ── */}
          <div className="mt-10 lg:mt-0">
            {faqItems.map((item, i) => (
              <FaqRow
                key={item.question}
                item={item}
                index={i}
                isInView={isInView}
                isExpanded={expandedIndexes.includes(i) || hoveredIndex === i}
                onHover={() => setHoveredIndex(i)}
                onLeave={() => setHoveredIndex(null)}
                onToggle={() =>
                  handleToggle(
                    i,
                    expandedIndexes.includes(i) || hoveredIndex === i
                  )
                }
              />
            ))}

            {/* Bottom border */}
            <motion.div
              className="h-px origin-left bg-sand"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{
                ...spring,
                delay: faqItems.length * STAGGER * 2.5 + 0.05,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
