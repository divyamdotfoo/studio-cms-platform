"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "motion/react";
import { useContent } from "@/lib/content-ctx";
import { spring, springGentle } from "@/lib/motion";
import type { ReviewItem } from "@/cms/types";

/* ────────────────────────────────────────────────────
 * VideoPlayer
 *
 * Plays inline, muted. Click to unmute.
 * Only ONE video plays unmuted at a time (managed by parent).
 * Auto-mutes when scrolled out of view.
 * ──────────────────────────────────────────────────── */

function VideoPlayer({
  id,
  src,
  activeVideoId,
  onActivate,
}: {
  id: string;
  src: string;
  activeVideoId: string | null;
  onActivate: (id: string | null) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(containerRef, { amount: 0.4 });
  const isActive = activeVideoId === id;

  /* Auto-play when visible, mute when scrolled away */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isVisible) {
      v.play().catch(() => {});
    } else {
      v.muted = true;
      if (isActive) onActivate(null);
    }
  }, [isVisible]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Mute/unmute when active video changes */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !isActive;
  }, [isActive]);

  const handleClick = () => {
    if (isActive) {
      onActivate(null); // mute this one
    } else {
      onActivate(id); // unmute this, mutes all others
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative cursor-pointer overflow-hidden bg-shell w-full h-full"
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        loop
        className="w-full h-full object-cover"
      />

      {/* Mute indicator */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-cream/80 backdrop-blur-md rounded-full">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-ink"
        >
          {!isActive ? (
            <>
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </>
          ) : (
            <>
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
            </>
          )}
        </svg>
        <span className="text-[11px] uppercase tracking-[0.04em] font-medium text-ink">
          {!isActive ? "Tap to listen" : "Playing"}
        </span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────
 * FeaturedReview — big pull-quote
 * ──────────────────────────────────────────────────── */

function FeaturedReview({ review }: { review: ReviewItem }) {
  const ref = useRef<HTMLQuoteElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.blockquote
      ref={ref}
      className="py-10 lg:py-14"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={springGentle}
    >
      <motion.span
        className="block font-serif text-[5rem] lg:text-[7rem] leading-[0.5] text-mist select-none mb-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ ...spring, delay: 0.1 }}
        aria-hidden
      >
        &ldquo;
      </motion.span>

      <motion.p
        className="font-serif italic text-[clamp(1.3rem,3vw,2rem)] leading-[1.4] text-ink"
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...springGentle, delay: 0.15 }}
      >
        {review.content}
      </motion.p>

      <motion.span
        className="block mt-5 lg:mt-6 text-[13px] uppercase tracking-[0.08em] font-medium text-bronze"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ ...spring, delay: 0.25 }}
      >
        — {review.name}
      </motion.span>
    </motion.blockquote>
  );
}

/* ────────────────────────────────────────────────────
 * VideoReviewCard — video + name + optional text below
 * Constrained to max-w / max-h so it doesn't overflow.
 * ──────────────────────────────────────────────────── */

function VideoReviewCard({
  review,
  activeVideoId,
  onActivate,
}: {
  review: ReviewItem;
  activeVideoId: string | null;
  onActivate: (id: string | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="w-full sm:w-[260px] lg:w-[240px] shrink-0"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={springGentle}
    >
      {/* Video container — fixed aspect, constrained height */}
      <div className="aspect-9/16 max-h-[360px] overflow-hidden">
        <VideoPlayer
          id={review.name}
          src={review.videoUrl!}
          activeVideoId={activeVideoId}
          onActivate={onActivate}
        />
      </div>

      {/* Name — below the video */}
      <motion.span
        className="block mt-4 text-[13px] uppercase tracking-[0.08em] font-medium text-drift"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ ...spring, delay: 0.15 }}
      >
        {review.name}
      </motion.span>

      {/* Text content — if the review also has text */}
      {review.content && (
        <motion.p
          className="mt-2.5 font-serif italic text-[15px] leading-[1.55] text-stone"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...springGentle, delay: 0.2 }}
        >
          &ldquo;{review.content}&rdquo;
        </motion.p>
      )}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────
 * TextReviewCard — text-only reviews
 * ──────────────────────────────────────────────────── */

function TextReviewCard({ review }: { review: ReviewItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="py-8 lg:py-10"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={springGentle}
    >
      {/* Top border */}
      <motion.div
        className="h-px bg-sand origin-left"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ ...spring, delay: 0.1 }}
      />

      <div className="pt-6 lg:pt-8">
        <motion.p
          className="font-serif italic text-[17px] lg:text-[19px] leading-[1.55] text-ink"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...springGentle, delay: 0.15 }}
        >
          &ldquo;{review.content}&rdquo;
        </motion.p>

        <motion.span
          className="block mt-5 lg:mt-6 text-[13px] uppercase tracking-[0.08em] font-medium text-drift"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ ...spring, delay: 0.25 }}
        >
          {review.name}
        </motion.span>
      </div>
    </motion.div>
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
 * Reviews section
 *
 * Rendering order:
 *   1. Featured review (big pull-quote)
 *   2. Video reviews (horizontal flex, wraps)
 *   3. Text-only reviews (stacked)
 *
 * Desktop: sticky heading left | content right
 * Mobile:  heading on top, then stacked content
 *
 * Only one video plays unmuted at a time.
 * ──────────────────────────────────────────────────── */

export function Reviews() {
  const { pages: { homepage: { reviews } } } = useContent();
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  /* Only one video unmuted at a time */
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const handleActivate = useCallback((id: string | null) => {
    setActiveVideoId(id);
  }, []);

  /* Split reviews into three groups */
  const featured = reviews.items.find((r) => r.featured);
  const videoReviews = reviews.items.filter((r) => !r.featured && r.videoUrl);
  const textReviews = reviews.items.filter((r) => !r.featured && !r.videoUrl);

  return (
    <section className="py-16 lg:py-28" aria-label="Reviews">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="lg:grid lg:grid-cols-[340px_1fr] lg:gap-20">
          {/* ── Left column — sticky heading (desktop) ── */}
          <div ref={headerRef} className="lg:relative">
            <motion.div
              className="lg:sticky lg:top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={springGentle}
            >
              <span className="text-[13px] uppercase tracking-[0.12em] text-drift block mb-4 lg:mb-5">
                {reviews.label}
              </span>
              <h2 className="font-serif text-[clamp(1.8rem,6vw,3.4rem)] leading-[1.05] tracking-[-0.015em] text-ink">
                {reviews.heading.line1}
                <br />
                <RichHeadingLine
                  template={reviews.heading.line2}
                  italicWord={reviews.heading.italicWord}
                />
              </h2>

              <motion.p
                className="mt-6 text-[13px] text-drift hidden lg:block"
                initial={{ opacity: 0 }}
                animate={headerInView ? { opacity: 1 } : {}}
                transition={{ ...spring, delay: 0.3 }}
              >
                {reviews.items.length} reviews from Google
              </motion.p>
            </motion.div>
          </div>

          {/* ── Right column — ordered content ── */}
          <div className="mt-8 lg:mt-0">
            {/* 1. Featured review */}
            {featured && <FeaturedReview review={featured} />}

            {/* 2. Video reviews — horizontal flex, wraps */}
            {videoReviews.length > 0 && (
              <>
                <motion.div
                  className="h-px bg-sand origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={spring}
                />
                <div className="flex flex-wrap gap-5 lg:gap-6 py-8 lg:py-10">
                  {videoReviews.map((review) => (
                    <VideoReviewCard
                      key={review.name}
                      review={review}
                      activeVideoId={activeVideoId}
                      onActivate={handleActivate}
                    />
                  ))}
                </div>
              </>
            )}

            {/* 3. Text-only reviews — stacked vertically */}
            {textReviews.map((review) => (
              <TextReviewCard key={review.name} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
