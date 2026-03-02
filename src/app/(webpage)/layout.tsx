import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Dock } from "@/components/layout/Dock";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildLayoutMetadata } from "@/lib/metadata";
import { organizationJsonLd, websiteJsonLd } from "@/lib/json-ld";
import {
  getBlogs,
  getFooterServices,
  getMeta,
  getSeoConfig,
} from "@/server/queries";

import type { Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata(): Promise<Metadata> {
  const seoConfig = await getSeoConfig();
  return buildLayoutMetadata(seoConfig);
}

export default async function WebpageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const meta = await getMeta();
  const seoConfig = await getSeoConfig();
  const services = await getFooterServices();
  const blogs = await getBlogs();

  const blogLinks = blogs.map((post) => ({
    slug: post.slug,
    title: post.title,
  }));

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-cream text-ink">
        <Toaster />
        <JsonLd data={organizationJsonLd(seoConfig)} />
        <JsonLd data={websiteJsonLd(seoConfig)} />
        <Navbar meta={meta} />
        {children}
        <Footer blogs={blogLinks} meta={meta} services={services} />
        <Dock />
        <Analytics />
      </body>
    </html>
  );
}

export const revalidate = 60;
