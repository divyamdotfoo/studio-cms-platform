import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { ContentProvider } from "@/lib/content-ctx";
import content from "@/cms/content.json";
import type { SiteContent } from "@/cms/types";
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

/* ── Metadata from CMS ── */
const { meta } = content as SiteContent;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  openGraph: {
    title: meta.og.title,
    description: meta.og.description,
    locale: meta.og.locale,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-cream text-deep-black">
        <ContentProvider content={content as SiteContent}>
          {children}
        </ContentProvider>
      </body>
    </html>
  );
}
