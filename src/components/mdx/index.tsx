import type { ReactNode } from "react";
import { Children, isValidElement } from "react";
import Image from "next/image";
import { ContactCTA } from "@/components/mdx/ContactCTA";
import { BlogImage } from "@/components/mdx/BlogImage";

function containsOnlyImage(children: ReactNode): boolean {
  const kids = Children.toArray(children);
  if (kids.length !== 1) return false;
  const child = kids[0];
  return (
    isValidElement(child) &&
    typeof child.props === "object" &&
    child.props !== null &&
    "src" in (child.props as Record<string, unknown>)
  );
}

export const mdxComponents = {
  ContactCTA,
  BlogImage,
  p({ children }: { children: ReactNode }) {
    if (containsOnlyImage(children)) {
      return <>{children}</>;
    }
    return <p>{children}</p>;
  },
  wrapper({ children }: { children: ReactNode }) {
    return (
      <article
        className={[
          "prose prose-lg max-w-none",
          "prose-headings:font-serif prose-headings:text-ink prose-headings:tracking-tight",
          "prose-p:text-stone prose-p:leading-relaxed",
          "prose-li:text-stone",
          "prose-strong:text-ink prose-strong:font-semibold",
          "prose-a:text-bronze prose-a:underline prose-a:underline-offset-2 prose-a:decoration-bronze/40 hover:prose-a:decoration-bronze",
          "prose-blockquote:border-l-bronze prose-blockquote:text-drift prose-blockquote:font-serif prose-blockquote:italic",
          "prose-code:text-ink prose-code:bg-shell prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none",
          "prose-pre:bg-ink prose-pre:text-cream",
          "prose-hr:border-sand",
        ].join(" ")}
      >
        {children}
      </article>
    );
  },
  h1({ children }: { children: ReactNode }) {
    return (
      <h1 className="font-serif text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-ink mb-6">
        {children}
      </h1>
    );
  },
  img(props: { src?: string; alt?: string }) {
    return (
      <figure className="my-10 -mx-5 lg:-mx-12">
        <Image
          src={props.src || ""}
          alt={props.alt || ""}
          width={1200}
          height={675}
          className="w-full max-h-128 object-cover rounded-lg"
        />
        {props.alt && (
          <figcaption className="mt-3 px-5 lg:px-12 text-center text-sm text-drift">
            {props.alt}
          </figcaption>
        )}
      </figure>
    );
  },
  blockquote({ children }: { children: ReactNode }) {
    return (
      <blockquote className="border-l-[3px] border-bronze pl-6 my-8 text-lg font-serif italic text-drift">
        {children}
      </blockquote>
    );
  },
  a(props: { href?: string; children?: ReactNode }) {
    const isExternal =
      props.href?.startsWith("http") || props.href?.startsWith("//");
    return (
      <a
        {...props}
        className="text-bronze underline underline-offset-2 decoration-bronze/40 transition-colors duration-200 hover:decoration-bronze hover:text-ink"
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      />
    );
  },
  hr() {
    return <hr className="my-12 border-t border-sand" />;
  },
};
