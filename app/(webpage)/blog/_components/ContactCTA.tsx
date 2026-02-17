import Link from "next/link";

/**
 * ContactCTA — Two variants for use inside blog posts.
 *
 * variant="inline"  → a subtle in-content link block (use mid-article)
 * variant="banner"  → a prominent end-of-article CTA section
 */

interface ContactCTAProps {
  variant?: "inline" | "banner";
  /** Override the default heading text */
  heading?: string;
  /** Override the default description text */
  description?: string;
}

export function ContactCTA({
  variant = "banner",
  heading,
  description,
}: ContactCTAProps) {
  if (variant === "inline") {
    return (
      <div className="my-8 rounded-sm border border-sand bg-shell/50 px-6 py-5 not-prose">
        <p className="text-[15px] leading-relaxed text-stone">
          {description ??
            "Looking for an architect who understands Uttarakhand's climate, culture, and craft?"}
        </p>
        <Link
          href="/whatsapp"
          className="mt-2 inline-block text-[15px] font-medium text-bronze underline underline-offset-2 decoration-bronze/40 transition-colors duration-200 hover:decoration-bronze hover:text-ink"
        >
          {heading ?? "Talk to our team at Vision Architect →"}
        </Link>
      </div>
    );
  }

  return (
    <div className="my-12 border-y border-sand py-10 not-prose text-center">
      <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-ink">
        {heading ?? "Ready to Build Your Dream Space?"}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-stone max-w-lg mx-auto">
        {description ??
          "Whether it's a family home in Haridwar, a cafe in Rishikesh, or a modern office in Dehradun — our team is here to help you design something meaningful."}
      </p>
      <Link
        href="/whatsapp"
        className="mt-5 inline-block bg-ink text-cream px-7 py-3 text-sm font-medium tracking-wide uppercase transition-colors duration-200 hover:bg-bronze"
      >
        Get in Touch
      </Link>
    </div>
  );
}
