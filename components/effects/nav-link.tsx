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
 * to the right on leave.  Uses Framer Motion springs
 * so the line feels physical rather than tween-y.
 * ──────────────────────────────────────────────────── */

interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
}

export function HoverLink({ href, label, className }: NavLinkProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className={`relative pb-0.5 text-xs uppercase tracking-[0.08em] text-deep-black transition-colors duration-200 ${
        className ?? ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}

      {/* Underline — spring-animated width. */}
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-black"
        initial={{ width: "0%" }}
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={springSnap}
      />
    </Link>
  );
}
