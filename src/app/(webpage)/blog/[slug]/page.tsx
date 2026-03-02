import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { parseMDX } from "@/lib/mdx";
import { buildCmsSeoMetadata } from "@/lib/metadata";
import { mdxComponents } from "@/components/mdx";
import { getBlogBySlug, getBlogs, getSeoConfig } from "@/server/queries";
import { ReadMoreBlogs } from "@/components/pages/blog/ReadMoreBlogs";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";

type BlogRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogRouteProps): Promise<Metadata> {
  const seoConfig = await getSeoConfig();
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) {
    return {};
  }

  return buildCmsSeoMetadata(
    {
      ...post.seo,
      canonicalPath: `/blog/${post.slug}`,
    },
    {
      openGraphType: "article",
      siteName: seoConfig.siteName,
      twitterCard: seoConfig.defaultTwitterCard,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 675,
          alt: post.coverImageAlt || post.title,
        },
      ],
    }
  );
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPage({ params }: BlogRouteProps) {
  const seoConfig = await getSeoConfig();
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  const blogs = await getBlogs();
  if (!post) {
    notFound();
  }

  const Content = await parseMDX(post.content);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          slug: post.slug,
          coverImage: post.coverImage,
          seoConfig,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Blogs", href: "/blogs" },
          { name: post.title, href: `/blog/${post.slug}` },
        ], seoConfig.metadataBase)}
      />
      <h1 className="font-serif text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-ink mb-6">
        {post.title}
      </h1>
      <Content components={mdxComponents} />
      <ReadMoreBlogs posts={blogs} currentSlug={post.slug} />
    </>
  );
}
