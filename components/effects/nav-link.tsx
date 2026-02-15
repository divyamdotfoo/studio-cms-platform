"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { springSnap } from "@/lib/motion";

/* ────────────────────────────────────────────────────
 * HoverLink
 *
 * A small-caps navigation link with an animated
 * underline: enters from the left on hover, exits
 * to the right on leave.  When `isActive` is true
 * the underline stays permanently visible.
 * ──────────────────────────────────────────────────── */

interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
  isActive?: boolean;
}

export function HoverLink({ href, label, className, isActive }: NavLinkProps) {
  const [hovered, setHovered] = useState(false);
  const showLine = hovered || isActive;

  return (
    <Link
      href={href}
      className={`relative pb-0.5 text-xs uppercase tracking-[0.08em] text-ink transition-colors duration-200 ${
        className ?? ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}

      {/* Underline — spring-animated width. Always visible when active. */}
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-ink"
        initial={{ width: "0%" }}
        animate={{ width: showLine ? "100%" : "0%" }}
        transition={springSnap}
      />
    </Link>
  );
}
