import Link from "next/link";
import { buttonVariants } from "@/components/ui/button/variants";
import { getMeta } from "@/server/queries";
import { cn, getContactLinks } from "@/lib/utils";

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

export async function ContactCTA({
  variant = "banner",
  heading,
  description,
}: ContactCTAProps) {
  const meta = await getMeta();
  const contactLinks = getContactLinks(meta);

  if (variant === "inline") {
    return (
      <div className="my-8 rounded-sm border border-sand bg-shell/50 px-6 py-5 not-prose">
        <p className="text-[15px] leading-relaxed text-stone">{description}</p>
        <Link
          href={contactLinks.whatsapp}
          className="mt-2 inline-block text-[15px] font-medium text-bronze underline underline-offset-2 decoration-bronze/40 transition-colors duration-200 hover:decoration-bronze hover:text-ink"
        >
          {heading}
        </Link>
      </div>
    );
  }

  return (
    <div className="my-12 border-y border-sand py-10 not-prose text-center">
      <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-ink">
        {heading}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-stone max-w-lg mx-auto">
        {description}
      </p>
      <Link
        href={contactLinks.whatsapp}
        className={cn(
          buttonVariants({ variant: "default" }),
          "mt-5 px-7 py-3 h-auto text-sm tracking-wide uppercase"
        )}
      >
        Get in Touch
      </Link>
    </div>
  );
}
