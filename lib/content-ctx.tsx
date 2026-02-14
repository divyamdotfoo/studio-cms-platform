"use client";

import { createContext, useContext } from "react";
import type { SiteContent } from "@/cms/types";

/* ────────────────────────────────────────────────────
 * Content Context
 *
 * Provides site-wide CMS content to all client components
 * via React context. Data is loaded once in the root layout
 * (server component) and passed down through <ContentProvider>.
 *
 * Usage in any client component:
 *
 *   const { hero, nav } = useContent();
 *   return <h1>{hero.headline.line1}</h1>;
 *
 * ──────────────────────────────────────────────────── */

const ContentContext = createContext<SiteContent | null>(null);

/* ── Provider ── */

interface ContentProviderProps {
  content: SiteContent;
  children: React.ReactNode;
}

export function ContentProvider({ content, children }: ContentProviderProps) {
  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
}

/* ── Hook ── */

export function useContent(): SiteContent {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error(
      "useContent() must be used within a <ContentProvider>. " +
        "Make sure the root layout wraps children with <ContentProvider>."
    );
  }
  return ctx;
}
