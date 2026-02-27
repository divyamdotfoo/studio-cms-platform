"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Phone } from "lucide-react";
import { HoverLink } from "@/components/effects/nav-link";
import { buttonVariants } from "@/components/ui/button/variants";
import { cn } from "@/lib/utils";
import type { Meta } from "@/payload-types";

/* ── Hardcoded navigation data ── */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "About", href: "/about" },
];

const BRAND = "VISION ARCHITECT";

/* ── Inline WhatsApp icon (no lucide equivalent) ── */

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────
 * Navbar
 *
 * Desktop (lg+): brand left | nav links + CTA buttons right
 * Mobile (<lg):  brand left | CTA icon buttons right
 *
 * No entry animations — visible immediately on page load.
 * ──────────────────────────────────────────────────── */

export function Navbar({ meta }: { meta: Meta }) {
  const pathname = usePathname();
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
      <nav className="hidden lg:flex mx-auto max-w-[1400px] items-center justify-between px-10 h-16">
        {/* Left — Brand */}
        <div>
          <Link
            href="/"
            className="relative z-10"
            aria-label={`${BRAND} — Home`}
          >
            <span className="font-serif italic text-xl font-medium tracking-tight text-ink">
              {BRAND}
            </span>
          </Link>
        </div>

        {/* Right — Nav links + CTA buttons */}
        <div className="flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <div key={link.href}>
              <HoverLink
                href={link.href}
                label={link.label}
                isActive={
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href)
                }
              />
            </div>
          ))}

          {/* CTA buttons */}
          <div className="flex items-center gap-2 ml-2">
            <Link
              href={meta.phone}
              className={cn(
                buttonVariants({ variant: "outline", size: "default" }),
                "gap-1.5"
              )}
            >
              <Phone className="size-3.5" />
              <span>Call Us</span>
            </Link>
            <Link
              href={meta.whatsapp}
              className={cn(
                buttonVariants({ variant: "default", size: "default" }),
                "gap-1.5"
              )}
            >
              <WhatsAppIcon className="size-3.5" />
              <span>WhatsApp</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Mobile nav ── */}
      <nav className="lg:hidden flex items-center justify-between px-5 h-14">
        {/* Brand */}
        <div>
          <Link href="/" aria-label={`${BRAND} — Home`}>
            <span className="font-serif italic text-lg font-semibold tracking-tight text-ink">
              {BRAND}
            </span>
          </Link>
        </div>

        {/* CTA buttons */}
        <div className="flex items-center gap-1.5">
          <Link
            href={meta.phone}
            className={cn(
              buttonVariants({ variant: "outline", size: "default" })
            )}
            aria-label="Call us"
          >
            <Phone className="size-4" />
            Call
          </Link>
          <Link
            href={meta.whatsapp}
            className={cn(
              buttonVariants({ variant: "default", size: "default" })
            )}
            aria-label="WhatsApp us"
          >
            <WhatsAppIcon className="size-4" />
            Chat
          </Link>
        </div>
      </nav>

      {/* ── Bottom border ── */}
      <div className="h-px" style={{ backgroundColor: "var(--color-sand)" }} />
    </header>
  );
}
