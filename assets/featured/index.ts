import type { StaticImageData } from "next/image";

/* ────────────────────────────────────────────────────
 * Static image imports for featured projects.
 *
 * Next.js processes these at build time, generating
 * blur placeholders (blurDataURL) and intrinsic
 * width/height automatically.
 *
 * Usage:
 *   import { FEATURED_IMAGES } from "@/assets/featured";
 *   const img = FEATURED_IMAGES[projectIndex][imageKey];
 * ──────────────────────────────────────────────────── */

/* ── Project 1 ── */
import p1one from "./project-1/one.jpg";
import p1two from "./project-1/two.jpg";
import p1three from "./project-1/three.jpg";
import p1four from "./project-1/four.jpg";

/* ── Project 2 ── */
import p2one from "./project-2/one.jpg";
import p2two from "./project-2/two.jpg";
import p2three from "./project-2/three.jpg";
import p2four from "./project-2/four.jpg";

/* ── Project 3 ── */
import p3one from "./project-3/one.jpg";
import p3two from "./project-3/two.jpg";
import p3three from "./project-3/three.jpg";
import p3four from "./project-3/four.jpg";

/* ── Lookup: FEATURED_IMAGES[projectIndex]["one"] → StaticImageData ── */

/**
 * Resolve a static image from project index + image key.
 *
 * @param projectIndex - 0-based project index
 * @param key          - image key from CMS ("one", "two", etc.)
 */
export function getFeaturedImage(
  projectIndex: number,
  key: string
): StaticImageData {
  const PROJECT_MAP: Record<string, StaticImageData>[] = [
    { one: p1one, two: p1two, three: p1three, four: p1four },
    { one: p2one, two: p2two, three: p2three, four: p2four },
    { one: p3one, two: p3two, three: p3three, four: p3four },
  ];
  return PROJECT_MAP[projectIndex][key];
}
