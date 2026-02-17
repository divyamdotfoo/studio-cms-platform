import type { Transition } from "motion/react";

/**
 * Shared motion configuration for the entire site.
 *
 * One spring to rule them all — Apple/macOS-like fluid deceleration.
 * Using springs for position & scale ensures natural, physics-based
 * motion that feels consistent regardless of distance or direction.
 */

/* ────────────────────────────────────────────────────
 * Springs
 * ──────────────────────────────────────────────────── */

/** Default spring — smooth fluid deceleration, no bounce. */
export const spring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.8,
} satisfies Transition;

/** Snappier spring for small UI feedback (hovers, toggles). */
export const springSnap = {
  type: "spring",
  stiffness: 200,
  damping: 26,
  mass: 0.6,
} satisfies Transition;

/** Gentle spring for large reveals (hero headlines, sections). */
export const springGentle = {
  type: "spring",
  stiffness: 70,
  damping: 18,
  mass: 1,
} satisfies Transition;

/* ────────────────────────────────────────────────────
 * Tweens (for opacity / color fades only)
 * ──────────────────────────────────────────────────── */

/** Smooth fade — used for opacity-only transitions. */
export const fade = {
  type: "tween",
  duration: 0.45,
  ease: "easeOut",
} satisfies Transition;

/** Slow fade for subtle background / color shifts. */
export const fadeSlow = {
  type: "tween",
  duration: 0.7,
  ease: "easeOut",
} satisfies Transition;

/* ────────────────────────────────────────────────────
 * Stagger
 * ──────────────────────────────────────────────────── */

/** Delay between staggered sibling items (seconds). */
export const STAGGER = 0.065;

/* ────────────────────────────────────────────────────
 * Page choreography timing
 *
 * Navbar is visible instantly (no staggered entrance).
 * Hero content and subsequent sections start at 0.
 * ──────────────────────────────────────────────────── */

/** When the left nav group starts revealing. */
export const T_NAV_LEFT = 0;
/** When the brand name appears. */
export const T_NAV_BRAND = 0;
/** When the right nav group starts revealing. */
export const T_NAV_RIGHT = 0;
/** When the header border draws in. */
export const T_NAV_BORDER = 0;

/** Hero content starts immediately. */
export const T_HERO = 0;

/** Featured projects can start after a short content delay. */
export const T_FEATURED = 0.55;
