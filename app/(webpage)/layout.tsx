import type { Metadata } from "next";
import { ContentProvider } from "@/lib/content-ctx";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Dock } from "@/components/layout/Dock";
import content from "@/cms/active/content.json";

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
};

export default function WebpageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContentProvider content={content}>
      <Navbar />
      {children}
      <Footer />
      <Dock />
    </ContentProvider>
  );
}
