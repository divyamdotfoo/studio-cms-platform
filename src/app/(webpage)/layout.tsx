import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { ContentProvider } from "@/lib/content-ctx";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Dock } from "@/components/layout/Dock";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/json-ld";
import { getSiteContent } from "@/server/queries";
import { posts } from "@/app/(webpage)/blog/_data/posts";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://visionarchitect.in"),
  title: "Vision Architect — Haridwar's Trusted Architecture Partner",
  description:
    "Professional architecture services in Haridwar. Specializing in homes, cafes, and commercial spaces. Designing spaces that inspire lives.",
  keywords:
    "architect haridwar, architecture firm haridwar, home design haridwar, commercial architecture, vision architect",
  openGraph: {
    title: "Vision Architect — Haridwar",
    description: "Professional architecture services in Haridwar",
    locale: "en_IN",
    siteName: "Vision Architect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function WebpageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getSiteContent();

  const blogLinks = posts.map((post) => ({
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
        <ContentProvider content={content}>
          <JsonLd data={organizationJsonLd()} />
          <JsonLd data={websiteJsonLd()} />
          <Navbar />
          {children}
          <Footer blogs={blogLinks} />
          <Dock />
        </ContentProvider>
        <Analytics />
      </body>
    </html>
  );
}

export const revalidate = 300;
