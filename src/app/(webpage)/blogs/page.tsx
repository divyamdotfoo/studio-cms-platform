import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { posts } from "@/app/(webpage)/blog/_data/posts";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title:
    "Architecture Blogs for Haridwar, Rishikesh & Dehradun — Vision Architect",
  description:
    "SEO-friendly architecture guides for North Indian homeowners and business owners in Haridwar, Rishikesh, and Dehradun.",
};

export default function BlogsPage() {
  return (
    <main className="pt-28 lg:pt-36 pb-20 lg:pb-28">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Blogs", href: "/blogs" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Vision Architect Blog Posts",
          itemListElement: posts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `https://visionarchitect.in/blog/${post.slug}`,
            name: post.title,
          })),
        }}
      />
      <div className="mx-auto max-w-[1100px] px-5 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-14 lg:mb-20">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-ink leading-[1.1]">
            Blogs
          </h1>
          <p className="mt-4 text-lg text-stone leading-relaxed">
            Practical architecture tips for Haridwar, Rishikesh, Dehradun, and
            families across North India.
          </p>
        </div>

        {/* Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white p-3 block border border-sand overflow-hidden transition-colors duration-200 hover:border-bronze/40"
            >
              <article>
                {/* Cover image */}
                <div className="relative h-52 lg:h-60 overflow-hidden bg-shell">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Text */}
                <div className="py-5 px-2 lg:py-6">
                  <span className="text-xs uppercase tracking-widest text-drift">
                    {post.readingTime}
                  </span>
                  <h2 className="mt-2 font-serif text-xl lg:text-2xl font-medium tracking-tight text-ink leading-snug line-clamp-2 min-h-14 group-hover:text-bronze transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-stone line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
