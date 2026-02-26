"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { Phone, Mail } from "lucide-react";
import { useContent } from "@/lib/content-ctx";
import { spring, springGentle, STAGGER } from "@/lib/motion";
import { ContactFormFields } from "@/components/sections/ContactFormFields";
import { InstagramIcon } from "@/components/icons.tsx/insta";
import { YouTubeIcon } from "@/components/icons.tsx/yt";
import { WhatsAppIcon } from "@/components/icons.tsx/whatsapp";

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

type FooterBlog = {
  slug: string;
  title: string;
};

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

interface FooterProps {
  blogs: FooterBlog[];
}

export function Footer({ blogs }: FooterProps) {
  const { meta, services } = useContent();
  const contactRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const isContactInView = useInView(contactRef, {
    once: true,
    margin: "-40px",
  });
  const isFooterInView = useInView(footerRef, { once: true, margin: "-40px" });

  const year = new Date().getFullYear();
  const copyright = COPYRIGHT_TEMPLATE.replace("{year}", String(year));
  const featuredBlogs = blogs.slice(0, 4);
  const serviceItemLinks = services.flatMap((service) =>
    service.serviceItems.map((item) => ({
      href: `/services/${service.slug}/${item.slug}`,
      label: `See ${item.name} (${service.name})`,
    }))
  );

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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 lg:gap-10">
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
                  {meta.tagline_footer}
                </p>

                <div className="flex items-center gap-3 mt-6">
                  <a
                    href={meta.insta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 border border-stone text-sand transition-all duration-200 hover:text-ivory hover:border-drift"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-[16px] h-[16px]" />
                  </a>
                  <a
                    href={meta.youtube}
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

              {/* ── Services ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...springGentle, delay: STAGGER * 3 }}
              >
                <span className="text-[13px] uppercase tracking-[0.12em] text-sand block mb-5">
                  Services
                </span>

                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/services"
                      className="text-[15px] text-mist transition-colors duration-200 hover:text-ivory"
                    >
                      See all services
                    </Link>
                  </li>
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-[15px] text-mist transition-colors duration-200 hover:text-ivory"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* ── Blogs ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...springGentle, delay: STAGGER * 4 }}
              >
                <span className="text-[13px] uppercase tracking-[0.12em] text-sand block mb-5">
                  Blogs
                </span>

                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/blogs"
                      className="text-[15px] text-mist transition-colors duration-200 hover:text-ivory"
                    >
                      Explore all blog posts
                    </Link>
                  </li>
                  {featuredBlogs.map((blog) => (
                    <li key={blog.slug}>
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="text-[15px] leading-relaxed text-mist transition-colors duration-200 hover:text-ivory line-clamp-2"
                      >
                        {blog.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* ── Contact + map and deep links ── */}
            <motion.div
              className="mt-12 lg:mt-14 pt-10 border-t border-stone/60 grid grid-cols-1 xl:grid-cols-[1fr_1.45fr] gap-12 lg:gap-10"
              initial={{ opacity: 0, y: 12 }}
              animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...springGentle, delay: STAGGER * 5 }}
            >
              <div>
                <span className="text-[13px] uppercase tracking-[0.12em] text-sand block mb-5">
                  Get in touch
                </span>

                <ul className="space-y-3.5">
                  <li>
                    <a
                      href={meta.phone}
                      className="group flex items-center gap-3 text-[15px] text-mist transition-colors duration-200 hover:text-ivory"
                    >
                      <Phone
                        className="w-[18px] h-[18px] shrink-0 text-sand transition-colors duration-200 group-hover:text-mist"
                        strokeWidth={1.8}
                      />
                      Call us
                    </a>
                  </li>
                  <li>
                    <a
                      href={meta.whatsapp}
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
                      href={meta.email}
                      className="group flex items-center gap-3 text-[15px] text-mist transition-colors duration-200 hover:text-ivory"
                    >
                      <Mail
                        className="w-[18px] h-[18px] shrink-0 text-sand transition-colors duration-200 group-hover:text-mist"
                        strokeWidth={1.8}
                      />
                      Email us
                    </a>
                  </li>
                </ul>

                <div className="mt-8 overflow-hidden border border-stone w-full max-w-[420px] aspect-3/2">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d671.5169117158848!2d78.13765208010588!3d29.93671897216422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39094706cf38250d%3A0x4e520b77699b721!2sVISION%20ARCHITECT!5e0!3m2!1sen!2sin!4v1771153421760!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
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
                </div>
              </div>

              <div>
                <span className="text-[13px] uppercase tracking-[0.12em] text-sand block mb-5">
                  Explore service routes
                </span>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {serviceItemLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[14px] leading-relaxed text-drift transition-colors duration-200 hover:text-ivory"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
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
              transition={{ ...springGentle, delay: STAGGER * 6 }}
            >
              {copyright}
            </motion.p>

            <motion.p
              className="text-[13px] text-drift tracking-wide"
              initial={{ opacity: 0 }}
              animate={isFooterInView ? { opacity: 1 } : {}}
              transition={{ ...springGentle, delay: STAGGER * 7 }}
            >
              Crafted with care in Haridwar
            </motion.p>
          </div>
        </div>
      </footer>
    </>
  );
}
