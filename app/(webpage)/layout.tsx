import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { ContentProvider } from "@/lib/content-ctx";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Dock } from "@/components/layout/Dock";
import content from "@/cms/active/content.json";
import { Toaster } from "@/components/ui/sonner";
import "../globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-cream text-ink">
        <ContentProvider content={content}>
          <Toaster />
          <Navbar />
          {children}
          <Footer />
          <Dock />
        </ContentProvider>
      </body>
    </html>
  );
}
