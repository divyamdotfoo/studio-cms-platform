"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { springGentle, T_HERO } from "@/lib/motion";

/* ────────────────────────────────────────────────────
 * ProjectGallery
 *
 * Three side-by-side panels. The first panel starts
 * expanded; hovering any panel expands it while the
 * others shrink. Uses spring-based flex animation
 * so the transition feels fluid and physical.
 * ──────────────────────────────────────────────────── */

/** Flex values: 65% active, ~17.5% each inactive. */
const FLEX_ACTIVE = 3.7;
const FLEX_INACTIVE = 1;

/** Gallery enters after the headline and separator. */
const T = T_HERO + 0.55;

interface PanelProps {
  index: number;
  active: number;
  onHover: (index: number) => void;
}

function GalleryPanel({ index, active, onHover }: PanelProps) {
  const isActive = active === index;

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer h-[420px]"
      style={{ borderRadius: 0 }}
      animate={{
        flex: isActive ? FLEX_ACTIVE : FLEX_INACTIVE,
      }}
      transition={{ type: "spring", stiffness: 80, damping: 12, mass: 1 }}
      onMouseEnter={() => onHover(index)}
    >
      {/* Inner container — overflow-hidden on the panel ensures
       *  anything rendered inside (images, text, overlays) gets
       *  cleanly clipped regardless of the animated width.       */}
      <div className="absolute inset-0 bg-light-gray/40 border border-warm-gray/20">
        <div className="absolute inset-0 flex items-end p-6">
          <motion.span
            className="text-xs uppercase tracking-widest text-deep-black/30 font-medium"
            animate={{ opacity: isActive ? 1 : 0.5 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 14,
              mass: 0.6,
            }}
          >
            Project {index + 1}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectGallery() {
  const [active, setActive] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springGentle, delay: T }}
      className="flex gap-3 pb-8"
    >
      {[0, 1, 2].map((i) => (
        <GalleryPanel key={i} index={i} active={active} onHover={setActive} />
      ))}
    </motion.div>
  );
}
