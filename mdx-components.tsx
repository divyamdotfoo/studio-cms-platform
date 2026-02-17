import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import { Children, isValidElement } from "react";
import Image from "next/image";

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

export function useMDXComponents(): MDXComponents {
  return {
    p({ children }) {
      if (containsOnlyImage(children)) {
        return <>{children}</>;
      }
      return <p>{children}</p>;
    },
    wrapper({ children }) {
      return (
        <article
          className={[
            "prose prose-lg max-w-none",
            // Headings
            "prose-headings:font-serif prose-headings:text-ink prose-headings:tracking-tight",
            // Body text
            "prose-p:text-stone prose-p:leading-relaxed",
            "prose-li:text-stone",
            "prose-strong:text-ink prose-strong:font-semibold",
            // Links
            "prose-a:text-bronze prose-a:underline prose-a:underline-offset-2 prose-a:decoration-bronze/40 hover:prose-a:decoration-bronze",
            // Blockquotes
            "prose-blockquote:border-l-bronze prose-blockquote:text-drift prose-blockquote:font-serif prose-blockquote:italic",
            // Code
            "prose-code:text-ink prose-code:bg-shell prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none",
            "prose-pre:bg-ink prose-pre:text-cream",
            // Horizontal rules
            "prose-hr:border-sand",
            // Images handled by component override below
          ].join(" ")}
        >
          {children}
        </article>
      );
    },

    h1({ children }) {
      return (
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-ink mb-6">
          {children}
        </h1>
      );
    },

    img(props) {
      return (
        <figure className="my-10 -mx-5 lg:-mx-12">
          <Image
            src={props.src || ""}
            alt={props.alt || ""}
            width={1200}
            height={675}
            className="w-full h-auto object-cover"
          />
          {props.alt && (
            <figcaption className="mt-3 px-5 lg:px-12 text-center text-sm text-drift">
              {props.alt}
            </figcaption>
          )}
        </figure>
      );
    },

    blockquote({ children }) {
      return (
        <blockquote className="border-l-[3px] border-bronze pl-6 my-8 text-lg font-serif italic text-drift">
          {children}
        </blockquote>
      );
    },

    a(props) {
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
}
