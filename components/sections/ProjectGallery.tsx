"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useContent } from "@/lib/content-ctx";
import { springGentle, T_HERO } from "@/lib/motion";

/* ────────────────────────────────────────────────────
 * ProjectGallery
 *
 * Desktop: three side-by-side panels with hover expand.
 * Mobile:  vertical stacked grid.
 * ──────────────────────────────────────────────────── */

const FLEX_ACTIVE = 3.7;
const FLEX_INACTIVE = 1;
const T = T_HERO + 0.55;

const panelSpring = {
  type: "spring" as const,
  stiffness: 80,
  damping: 12,
  mass: 1,
};

/* ── Desktop panel (with flex animation) ── */

interface DesktopPanelProps {
  label: string;
  index: number;
  active: number;
  onHover: (index: number) => void;
}

function DesktopPanel({ label, index, active, onHover }: DesktopPanelProps) {
  const isActive = active === index;

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer h-[420px]"
      style={{ borderRadius: 0 }}
      animate={{ flex: isActive ? FLEX_ACTIVE : FLEX_INACTIVE }}
      transition={panelSpring}
      onMouseEnter={() => onHover(index)}
    >
      <div className="absolute inset-0 bg-shell border border-mist">
        <div className="absolute inset-0 flex items-end p-6">
          <motion.span
            className="text-[13px] uppercase tracking-widest text-drift font-medium"
            animate={{ opacity: isActive ? 1 : 0.6 }}
            transition={panelSpring}
          >
            {label}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Gallery component ── */

export function ProjectGallery() {
  const { projectGallery } = useContent();
  const [active, setActive] = useState(0);

  return (
    <>
      {/* Mobile — vertical stacked grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springGentle, delay: T }}
        className="lg:hidden flex flex-col gap-3 pb-6"
      >
        {projectGallery.panels.map((panel, i) => (
          <div
            key={i}
            className="w-full h-[200px] bg-shell border border-mist overflow-hidden relative"
          >
            <div className="absolute inset-0 flex items-end p-5">
              <span className="text-[13px] uppercase tracking-widest text-drift font-medium">
                {panel.label}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Desktop — flex panels with hover expand */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springGentle, delay: T }}
        className="hidden lg:flex gap-3 pb-8"
      >
        {projectGallery.panels.map((panel, i) => (
          <DesktopPanel
            key={i}
            label={panel.label}
            index={i}
            active={active}
            onHover={setActive}
          />
        ))}
      </motion.div>
    </>
  );
}
