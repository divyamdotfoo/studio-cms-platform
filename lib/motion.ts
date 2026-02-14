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
 * The entry sequence flows left-to-right across the navbar,
 * then cascades down into the hero content.
 * ──────────────────────────────────────────────────── */

/** Number of items in the left nav group. */
const LEFT_COUNT = 4;
/** Number of items in the right nav group. */
const RIGHT_COUNT = 2;

/** When the left nav group starts revealing. */
export const T_NAV_LEFT = 0;
/** When the brand name appears. */
export const T_NAV_BRAND = LEFT_COUNT * STAGGER + 0.04;
/** When the right nav group starts revealing. */
export const T_NAV_RIGHT = T_NAV_BRAND + 0.1;
/** When the header border draws in. */
export const T_NAV_BORDER = T_NAV_RIGHT + RIGHT_COUNT * STAGGER + 0.04;

/** After the navbar is done — hero content starts here. */
export const T_HERO = T_NAV_BORDER + 0.15;
