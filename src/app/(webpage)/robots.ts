import type { MetadataRoute } from "next";
import { getSeoConfig } from "@/server/queries";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seoConfig = await getSeoConfig();
  const base = seoConfig.metadataBase.replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
