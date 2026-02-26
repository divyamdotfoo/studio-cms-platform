"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Home, Grid, FileText, User, Briefcase } from "lucide-react";
import { springGentle, springSnap } from "@/lib/motion";

/* ────────────────────────────────────────────────────
 * Dock
 *
 * Apple-style floating bottom navigation for mobile.
 * Pill-shaped, frosted glass, with 3 page icons.
 * Slides up on initial load with a gentle spring.
 * ──────────────────────────────────────────────────── */

/* ── Hardcoded dock items ── */

const DOCK_ITEMS = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Services", href: "/services", Icon: Briefcase },
  { label: "Projects", href: "/projects", Icon: Grid },
  { label: "Blogs", href: "/blogs", Icon: FileText },
  { label: "About", href: "/about", Icon: User },
];

function isItemActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

/* ── Component ── */

export function Dock() {
  const pathname = usePathname();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden pointer-events-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <motion.nav
        className="pointer-events-auto w-full border-t border-mist/80"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={springGentle}
        aria-label="Mobile navigation"
        style={{
          backgroundColor: "rgba(245, 243, 239, 0.96)",
          backdropFilter: "blur(22px) saturate(1.25)",
          WebkitBackdropFilter: "blur(22px) saturate(1.25)",
          boxShadow: "0 -6px 24px -10px rgba(26, 26, 26, 0.2)",
        }}
      >
        <div className="grid grid-cols-5 gap-0 px-1 py-1.5">
          {DOCK_ITEMS.map((item) => {
            const isActive = isItemActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl py-2 transition-colors duration-200 ${
                  isActive ? "text-ink" : "text-drift"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <item.Icon className="size-[22px]" strokeWidth={1.8} />
                <span className="text-[11px] uppercase tracking-[0.04em] font-medium">
                  {item.label}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 h-0.5 w-6 rounded-full bg-ink"
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
