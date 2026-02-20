/* ────────────────────────────────────────────────────
 * CMS Content Types
 *
 * Single source of truth for the shape of all site copy.
 * Structure: general, pages.homepage, pages.about …
 * ──────────────────────────────────────────────────── */

/* ── Shared ── */

export interface SectionHeading {
  line1: string;
  line2: string;
  italicWord: string;
}

/**
 * Wraps every CMS array so the admin panel knows
 * whether the user can add/remove entries.
 *
 * `extendable: false` → edit-only (no add/delete)
 * `extendable: true`  → add/delete allowed
 * `min` / `max`       → optional bounds (only relevant when extendable)
 */
export interface ContentArray<T> {
  extendable: boolean;
  min?: number;
  max?: number;
  values: T[];
}

/* ── General (site-wide contact / social info) ── */

export interface GeneralContent {
  phone: string;
  whatsapp: string;
  email: string;
  insta: string;
  youtube: string;
  tagline_footer: string;
}

/* ── Homepage ── */

export interface HeroContent {
  headline: {
    line1: string;
    line2: string;
    line2Italic: string;
  };
  location: string;
  description: string;
}

/* ── Projects (top-level) ── */

export interface Project {
  id: string;
  name: string;
  description: string;
  images: string[];
  details: { label: string; value: string }[];
  features: string[];
}

/* ── Featured project reference (used inside the hero gallery) ── */

export interface FeaturedProjectRef {
  id: string;
  featuredImages: string[];
}

/**
 * Resolved shape consumed by display components — built at
 * render time by joining a FeaturedProjectRef with its Project.
 */
export interface FeaturedProject {
  name: string;
  description: string;
  images: string[];
  details: { label: string; value: string }[];
}

export interface ProjectGalleryContent {
  label: string;
  heading: SectionHeading;
  projects: ContentArray<FeaturedProjectRef>;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ServiceItem {
  num: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ServicesContent {
  label: string;
  heading: SectionHeading;
  description: string;
  stats: ContentArray<Stat>;
  items: ContentArray<ServiceItem>;
}

export interface ReviewItem {
  name: string;
  content: string;
  videoUrl?: string;
  featured?: boolean;
}

export interface ReviewsContent {
  label: string;
  heading: SectionHeading;
  items: ContentArray<ReviewItem>;
}

export interface SocialChannel {
  platform: string;
  handle: string;
  url: string;
  followers: string;
  featuredPostUrl?: string;
}

export interface SocialContent {
  label: string;
  heading: SectionHeading;
  description: string;
  channels: ContentArray<SocialChannel>;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  label: string;
  heading: SectionHeading;
  description: string;
  items: ContentArray<FaqItem>;
}

export interface HomepageContent {
  hero: HeroContent;
  projectGallery: ProjectGalleryContent;
  services: ServicesContent;
  reviews: ReviewsContent;
  faq: FaqContent;
  social: SocialContent;
}

/* ── About page ── */

export interface AboutIntro {
  label: string;
  headline: ContentArray<string>;
  name: string;
  role: string;
  brief: string;
  profileImage: string;
  captionLeft: string;
  captionRight: string;
}

export interface AboutStory {
  label: string;
  pullQuote: string;
  paragraphs: ContentArray<string>;
}

export interface AboutValueItem {
  num: string;
  title: string;
  description: string;
}

export interface AboutValues {
  label: string;
  items: ContentArray<AboutValueItem>;
}

export interface AboutPageContent {
  intro: AboutIntro;
  story: AboutStory;
  values: AboutValues;
}

/* ── Pages ── */

export interface PagesContent {
  homepage: HomepageContent;
  about: AboutPageContent;
}

/* ── Root ── */

export interface SiteContent {
  general: GeneralContent;
  projects: Project[];
  pages: PagesContent;
}
