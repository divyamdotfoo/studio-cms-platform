"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { HoverLink } from "@/components/effects/nav-link";
import { useContent } from "@/lib/content-ctx";
import {
  spring,
  springSnap,
  fade,
  STAGGER,
  T_NAV_LEFT,
  T_NAV_BRAND,
  T_NAV_RIGHT,
  T_NAV_BORDER,
} from "@/lib/motion";

/* ────────────────────────────────────────────────────
 * CtaLink — CTA nav link with a subtle breathing
 * underline that continuously draws attention.
 * ──────────────────────────────────────────────────── */

function CtaLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="relative pb-0.5 text-xs uppercase tracking-[0.08em] text-ink transition-colors duration-200"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}

      {/* Solid hover underline */}
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-ink"
        initial={{ width: "0%" }}
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={springSnap}
      />

      {/* Continuous breathing underline — subtle bronze shimmer */}
      {!hovered && (
        <motion.span
          className="absolute bottom-0 left-0 right-0 h-px bg-bronze"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ originX: 0 }}
        />
      )}
    </Link>
  );
}

/* ────────────────────────────────────────────────────
 * Navbar
 *
 * Desktop (lg+): left links | center brand | right links
 * Mobile (<lg):  brand left | CTA icons right
 * ──────────────────────────────────────────────────── */

export function Navbar() {
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
          ? "bg-cream/80 backdrop-blur-2xl"
          : "bg-transparent backdrop-blur-none"
      }`}
    >
      {/* ── Desktop nav ── */}
      <nav className="hidden lg:grid mx-auto max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-10 h-16">
        {/* Left links */}
        <div className="flex items-center gap-7">
          {nav.leftLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: T_NAV_LEFT + i * STAGGER }}
            >
              <HoverLink href={link.href} label={link.label} />
            </motion.div>
          ))}
        </div>

        {/* Center brand */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: T_NAV_BRAND }}
          className="justify-self-center"
        >
          <Link href="/" className="relative z-10" aria-label={`${nav.brand} — Home`}>
            <span className="font-serif italic text-xl tracking-tight text-ink">
              {nav.brand}
            </span>
          </Link>
        </motion.div>

        {/* Right CTA links */}
        <div className="flex items-center justify-end gap-7">
          {nav.rightLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: T_NAV_RIGHT + i * STAGGER }}
            >
              <CtaLink href={link.href} label={link.label} />
            </motion.div>
          ))}
        </div>
      </nav>

      {/* ── Mobile nav ── */}
      <nav className="lg:hidden flex items-center justify-between px-5 h-14">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...spring, delay: 0.1 }}
        >
          <Link href="/" aria-label={`${nav.brand} — Home`}>
            <span className="font-serif italic text-base tracking-tight text-ink">
              {nav.brand}
            </span>
          </Link>
        </motion.div>

        {/* CTA icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...fade, delay: 0.2 }}
          className="flex items-center gap-0.5"
        >
          {/* Message icon */}
          <Link
            href="/contact"
            className="flex items-center justify-center w-11 h-11 text-drift active:text-ink transition-colors"
            aria-label="Send message"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </Link>

          {/* Phone icon */}
          <Link
            href="/contact?book=true"
            className="flex items-center justify-center w-11 h-11 text-drift active:text-ink transition-colors"
            aria-label="Call us"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
          </Link>
        </motion.div>
      </nav>

      {/* ── Bottom border ── */}
      <motion.div
        className="h-px origin-left"
        style={{ backgroundColor: "var(--color-sand)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ ...spring, delay: T_NAV_BORDER }}
      />
    </header>
  );
}
