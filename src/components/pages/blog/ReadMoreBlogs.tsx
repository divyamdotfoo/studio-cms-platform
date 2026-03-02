import Link from "next/link";
import Image from "next/image";
import type { Blog } from "@/payload-types";

type ReadMoreBlogsProps = {
  posts: Blog[];
  currentSlug: string;
};

export function ReadMoreBlogs({ posts, currentSlug }: ReadMoreBlogsProps) {
  const otherPosts = posts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 3);

  if (otherPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-sand">
      <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-ink mb-8">
        Read More From Us
      </h2>

      <div className="flex flex-col gap-5">
        {otherPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex gap-4 sm:gap-5 items-start p-3 border border-sand transition-colors duration-200 hover:border-bronze/40 bg-white"
          >
            <div className="relative w-24 h-20 sm:w-32 sm:h-24 shrink-0 overflow-hidden bg-shell">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt || post.title}
                fill
                sizes="128px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>

            <div className="flex-1 min-w-0 py-0.5">
              <span className="text-[11px] uppercase tracking-widest text-drift">
                {post.readingTime}
              </span>
              <h3 className="mt-1 font-serif text-base sm:text-lg font-medium tracking-tight text-ink leading-snug group-hover:text-bronze transition-colors duration-200 line-clamp-2">
                {post.title}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-stone line-clamp-2 hidden sm:block">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
