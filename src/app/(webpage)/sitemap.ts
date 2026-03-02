import type { MetadataRoute } from "next";
import {
  getBlogs,
  getSeoConfig,
  getServiceItemParams,
  getServiceSlugs,
} from "@/server/queries";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seoConfig = await getSeoConfig();
  const base = seoConfig.metadataBase.replace(/\/+$/, "");

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const blogs = await getBlogs();
  const blogPages: MetadataRoute.Sitemap = blogs.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const serviceSlugs = await getServiceSlugs();
  const serviceItemParams = await getServiceItemParams();

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map(
    (serviceSlug) => ({
      url: `${base}/services/${serviceSlug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );
  const serviceItemPages: MetadataRoute.Sitemap = serviceItemParams.map(
    ({ serviceSlug, serviceItemSlug }) => ({
      url: `${base}/services/${serviceSlug}/${serviceItemSlug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  return [...staticPages, ...blogPages, ...servicePages, ...serviceItemPages];
}
