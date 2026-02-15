"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useContent } from "@/lib/content-ctx";
import { springGentle, springSnap } from "@/lib/motion";

/* ────────────────────────────────────────────────────
 * Dock
 *
 * Apple-style floating bottom navigation for mobile.
 * Pill-shaped, frosted glass, with 3 page icons.
 * Slides up on initial load with a gentle spring.
 * ──────────────────────────────────────────────────── */

/* ── Icon map ── */

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      {!active && <polyline points="9 22 9 12 15 12 15 22" />}
    </svg>
  );
}

function ProjectsIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function AboutIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

const ICON_MAP: Record<string, React.FC<{ active: boolean }>> = {
  home: HomeIcon,
  projects: ProjectsIcon,
  about: AboutIcon,
};

/* ── Component ── */

export function Dock() {
  const { nav } = useContent();
  const pathname = usePathname();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden flex justify-center pointer-events-none"
      style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
    >
      <motion.nav
        className="pointer-events-auto"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...springGentle, delay: 0.8 }}
        aria-label="Navigation dock"
      >
        <div
          className="flex items-center gap-1 px-3 py-2 border border-mist"
          style={{
            backgroundColor: "rgba(245, 243, 239, 0.94)",
            backdropFilter: "blur(24px) saturate(1.4)",
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            borderRadius: "22px",
            boxShadow: "0 4px 24px -4px rgba(26, 26, 26, 0.12)",
          }}
        >
          {nav.dock.map((item) => {
            const isActive = pathname === item.href;
            const Icon = ICON_MAP[item.icon];

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-colors duration-200 ${
                  isActive ? "text-ink" : "text-drift"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {Icon && <Icon active={isActive} />}
                <span className="text-[11px] uppercase tracking-[0.04em] font-medium">
                  {item.label}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-ink"
                    layoutId="dock-dot"
                    transition={springSnap}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
}
