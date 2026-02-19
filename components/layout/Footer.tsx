"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useContent } from "@/lib/content-ctx";
import { spring, springGentle, STAGGER } from "@/lib/motion";
import { ContactFormFields } from "@/components/sections/ContactFormFields";

/* ── Hardcoded constants ── */

const BRAND = "VISION ARCHITECT";
const COPYRIGHT_TEMPLATE = "© {year} Vision Architect. All rights reserved.";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Blogs", href: "/blogs" },
];

/* ────────────────────────────────────────────────────
 * Inline SVG icons
 * ──────────────────────────────────────────────────── */

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
      <polygon
        points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/* ────────────────────────────────────────────────────
 * Footer
 *
 * Dark background (#131211) with the existing site
 * palette colors used at full value.
 *
 * Layout:
 * Desktop: 4-col grid — brand | links | contact info | contact form
 *          Map spans across underneath
 * Mobile:  Single column
 * ──────────────────────────────────────────────────── */

export function Footer() {
  const { general } = useContent();
  const contactRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const isContactInView = useInView(contactRef, { once: true, margin: "-40px" });
  const isFooterInView = useInView(footerRef, { once: true, margin: "-40px" });

  const year = new Date().getFullYear();
  const copyright = COPYRIGHT_TEMPLATE.replace("{year}", String(year));

  return (
    <>
      {/* ── Contact-us section — above the dark footer ── */}
      <section
        ref={contactRef}
        className="bg-[#f0eeea] border-t border-sand/30"
        aria-label="Contact us"
      >
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-16 lg:py-24">
          <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16 xl:gap-24 lg:items-start">
            {/* Left: heading + description */}
            <motion.div
              className="max-w-[480px] mb-12 lg:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={isContactInView ? { opacity: 1, y: 0 } : {}}
              transition={springGentle}
            >
              <span className="text-[13px] uppercase tracking-widest text-drift block mb-4">
                Get in touch
              </span>
              <h2 className="font-serif text-[clamp(1.8rem,5vw,2.8rem)] leading-tight tracking-[-0.02em] text-ink">
                Have a project in mind?
              </h2>
              <div className="w-12 h-px bg-bronze my-6 lg:my-8" />
              <p className="text-[15px] leading-[1.8] text-stone max-w-[400px]">
                Whether you&rsquo;re planning a home, a cafe, or a commercial
                space &mdash; share your details and our team will get back to
                you shortly.
              </p>
            </motion.div>

            {/* Right: contact form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isContactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...springGentle, delay: STAGGER * 2 }}
            >
              <ContactFormFields />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Dark footer ── */}
      <footer ref={footerRef} className="bg-[#131211]" aria-label="Footer">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="pt-14 lg:pt-20 pb-10 lg:pb-14">
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr] gap-12 lg:gap-10">
              {/* ── Brand column ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
                transition={springGentle}
              >
                <Link href="/" aria-label="Vision Architect — Home">
                  <span className="font-serif italic text-xl lg:text-2xl tracking-tight text-ivory">
                    {BRAND}
                  </span>
                </Link>
                <p className="mt-3 text-[15px] leading-relaxed text-sand max-w-[280px]">
                  {general.tagline_footer}
                </p>

                <div className="flex items-center gap-3 mt-6">
                  <a
                    href={general.insta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 border border-stone text-sand transition-all duration-200 hover:text-ivory hover:border-drift"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-[16px] h-[16px]" />
                  </a>
                  <a
                    href={general.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 border border-stone text-sand transition-all duration-200 hover:text-ivory hover:border-drift"
                    aria-label="YouTube"
                  >
                    <YouTubeIcon className="w-[16px] h-[16px]" />
                  </a>
                </div>
              </motion.div>

              {/* ── Quick links column ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...springGentle, delay: STAGGER * 2 }}
              >
                <span className="text-[13px] uppercase tracking-[0.12em] text-sand block mb-5">
                  Quick links
                </span>

                <ul className="space-y-3">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[15px] text-mist transition-colors duration-200 hover:text-ivory"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* ── Contact info column ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...springGentle, delay: STAGGER * 3 }}
              >
                <span className="text-[13px] uppercase tracking-[0.12em] text-sand block mb-5">
                  Get in touch
                </span>

                <ul className="space-y-3.5">
                  <li>
                    <a
                      href={general.phone}
                      className="group flex items-center gap-3 text-[15px] text-mist transition-colors duration-200 hover:text-ivory"
                    >
                      <PhoneIcon className="w-[18px] h-[18px] shrink-0 text-sand transition-colors duration-200 group-hover:text-mist" />
                      Call us
                    </a>
                  </li>
                  <li>
                    <a
                      href={general.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-[15px] text-mist transition-colors duration-200 hover:text-ivory"
                    >
                      <WhatsAppIcon className="w-[18px] h-[18px] shrink-0 text-sand transition-colors duration-200 group-hover:text-mist" />
                      WhatsApp
                    </a>
                  </li>
                  <li>
                    <a
                      href={general.email}
                      className="group flex items-center gap-3 text-[15px] text-mist transition-colors duration-200 hover:text-ivory"
                    >
                      <MailIcon className="w-[18px] h-[18px] shrink-0 text-sand transition-colors duration-200 group-hover:text-mist" />
                      Email us
                    </a>
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* ── Map embed — full width below ── */}
            <motion.div
              className="mt-12 lg:mt-14 overflow-hidden border border-stone"
              initial={{ opacity: 0, y: 12 }}
              animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...springGentle, delay: STAGGER * 4 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d671.5169117158848!2d78.13765208010588!3d29.93671897216422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39094706cf38250d%3A0x4e520b77699b721!2sVISION%20ARCHITECT!5e0!3m2!1sen!2sin!4v1771153421760!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{
                  border: 0,
                  display: "block",
                  filter: "grayscale(0.1) brightness(0.75)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vision Architect location on Google Maps"
              />
            </motion.div>
          </div>

          {/* ── Bottom bar ── */}
          <motion.div
            className="h-px bg-stone origin-left"
            initial={{ scaleX: 0 }}
            animate={isFooterInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={spring}
          />

          <div className="py-5 pb-32 lg:py-6 lg:pb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <motion.p
              className="text-[13px] text-drift tracking-wide"
              initial={{ opacity: 0 }}
              animate={isFooterInView ? { opacity: 1 } : {}}
              transition={{ ...springGentle, delay: STAGGER * 5 }}
            >
              {copyright}
            </motion.p>

            <motion.p
              className="text-[13px] text-drift tracking-wide"
              initial={{ opacity: 0 }}
              animate={isFooterInView ? { opacity: 1 } : {}}
              transition={{ ...springGentle, delay: STAGGER * 6 }}
            >
              Crafted with care in Haridwar
            </motion.p>
          </div>
        </div>
      </footer>
    </>
  );
}
