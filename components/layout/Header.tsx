"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { HoverLink } from "@/components/effects/nav-link";
import { useContent } from "@/lib/content-ctx";
import {
  spring,
  STAGGER,
  T_NAV_LEFT,
  T_NAV_BRAND,
  T_NAV_RIGHT,
  T_NAV_BORDER,
} from "@/lib/motion";

/* ────────── component ────────── */

export function Header() {
  const { nav } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter] duration-500 ${
        isScrolled
          ? "bg-cream/80 backdrop-blur-2xl supports-backdrop-filter:bg-cream/70"
          : "bg-transparent backdrop-blur-none"
      }`}
    >
      <nav className="mx-auto max-w-[1400px] grid grid-cols-[1fr_auto_1fr] items-center px-10 h-16">
        {/* ── Left nav links ── */}
        <div className="flex items-center gap-7">
          {nav.leftLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...spring,
                delay: T_NAV_LEFT + i * STAGGER,
              }}
            >
              <HoverLink href={link.href} label={link.label} />
            </motion.div>
          ))}
        </div>

        {/* ── Center brand ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: T_NAV_BRAND }}
          className="justify-self-center"
        >
          <Link
            href="/"
            className="relative z-10"
            aria-label={`${nav.brand} — Home`}
          >
            <span className="font-serif italic text-xl tracking-tight text-deep-black">
              {nav.brand}
            </span>
          </Link>
        </motion.div>

        {/* ── Right CTA links ── */}
        <div className="flex items-center justify-end gap-7">
          {nav.rightLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...spring,
                delay: T_NAV_RIGHT + i * STAGGER,
              }}
            >
              <HoverLink href={link.href} label={link.label} />
            </motion.div>
          ))}
        </div>
      </nav>

      {/* ── Animated bottom border ── */}
      <motion.div
        className="h-px origin-left"
        style={{ backgroundColor: "#C4C1B8" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ ...spring, delay: T_NAV_BORDER }}
      />
    </header>
  );
}
