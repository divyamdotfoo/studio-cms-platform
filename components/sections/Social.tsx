"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useContent } from "@/lib/content-ctx";
import { spring, springGentle, STAGGER } from "@/lib/motion";
import type { SocialChannel } from "@/cms/types";

/* ────────────────────────────────────────────────────
 * Platform icons (inline SVGs)
 * ──────────────────────────────────────────────────── */

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

function ArrowIcon({ className }: { className?: string }) {
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
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
};

/* ────────────────────────────────────────────────────
 * ChannelCard — single social platform card
 * ──────────────────────────────────────────────────── */

function ChannelCard({
  channel,
  index,
  isInView,
}: {
  channel: SocialChannel;
  index: number;
  isInView: boolean;
}) {
  const Icon = ICON_MAP[channel.platform];
  const delay = index * STAGGER * 3;

  return (
    <motion.a
      href={channel.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between p-6 lg:p-8 bg-ivory border border-mist min-h-[200px] lg:min-h-[240px] transition-colors duration-300 hover:border-sand"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...springGentle, delay }}
    >
      {/* Top row — icon + arrow */}
      <div className="flex items-start justify-between">
        {Icon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ ...spring, delay: delay + 0.1 }}
          >
            <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-ink" />
          </motion.div>
        )}
        <ArrowIcon className="w-4 h-4 lg:w-5 lg:h-5 text-drift transition-colors duration-200 group-hover:text-ink" />
      </div>

      {/* Bottom — handle, followers */}
      <div>
        <motion.span
          className="block font-serif text-lg lg:text-xl text-ink tracking-tight"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...springGentle, delay: delay + 0.15 }}
        >
          {channel.handle}
        </motion.span>
        <motion.span
          className="block mt-1.5 text-[13px] uppercase tracking-[0.08em] text-drift"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ ...spring, delay: delay + 0.2 }}
        >
          {channel.followers}
        </motion.span>
      </div>
    </motion.a>
  );
}

/* ────────────────────────────────────────────────────
 * Heading renderer
 * ──────────────────────────────────────────────────── */

function RichHeadingLine({
  template,
  italicWord,
}: {
  template: string;
  italicWord: string;
}) {
  const parts = template.split("{italic}");
  return (
    <>
      {parts[0]}
      <span className="italic">{italicWord}</span>
      {parts[1]}
    </>
  );
}

/* ────────────────────────────────────────────────────
 * Social section
 *
 * Same sticky-heading-left / content-right layout
 * as Reviews, keeping visual continuity.
 *
 * Desktop: heading left (sticky) | channel cards right
 * Mobile:  heading top, cards below
 * ──────────────────────────────────────────────────── */

export function Social() {
  const { pages: { homepage: { social } } } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="py-16 lg:py-28" aria-label="Social">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        {/* ── Top divider ── */}
        <motion.div
          className="h-px bg-sand origin-left mb-16 lg:mb-20"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={spring}
        />

        <div className="lg:grid lg:grid-cols-[340px_1fr] lg:gap-20">
          {/* ── Left — sticky heading ── */}
          <div className="lg:relative">
            <motion.div
              className="lg:sticky lg:top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={springGentle}
            >
              <span className="text-[13px] uppercase tracking-[0.12em] text-drift block mb-4 lg:mb-5">
                {social.label}
              </span>
              <h2 className="font-serif text-[clamp(1.8rem,6vw,3.4rem)] leading-[1.05] tracking-[-0.015em] text-ink">
                {social.heading.line1}
                <br />
                <RichHeadingLine
                  template={social.heading.line2}
                  italicWord={social.heading.italicWord}
                />
              </h2>

              <motion.p
                className="mt-5 lg:mt-6 text-[15px] leading-[1.75] text-stone max-w-[320px]"
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...springGentle, delay: 0.15 }}
              >
                {social.description}
              </motion.p>
            </motion.div>
          </div>

          {/* ── Right — channel cards ── */}
          <div className="mt-10 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 self-start">
            {social.channels.values.map((channel, i) => (
              <ChannelCard
                key={channel.platform}
                channel={channel}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
