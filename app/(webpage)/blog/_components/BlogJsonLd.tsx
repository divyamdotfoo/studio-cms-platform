"use client";

import { usePathname } from "next/navigation";
import { posts } from "../_data/posts";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";

export function BlogJsonLd() {
  const pathname = usePathname();
  const slug = pathname.replace("/blog/", "");
  const post = posts.find((p) => p.slug === slug);

  if (!post) return null;

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          slug: post.slug,
          coverImage: post.coverImage,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Blogs", href: "/blogs" },
          { name: post.title, href: `/blog/${post.slug}` },
        ])}
      />
    </>
  );
}
