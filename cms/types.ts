/* ────────────────────────────────────────────────────
 * CMS Content Types
 *
 * Single source of truth for the shape of all site copy.
 * Structure: nav, footer, pages.homepage, pages.about …
 * ──────────────────────────────────────────────────── */

/* ── Shared ── */

export interface NavLink {
  label: string;
  href: string;
}

export interface DockItem {
  label: string;
  href: string;
  icon: string;
}

export interface SectionHeading {
  line1: string;
  line2: string;
  italicWord: string;
}

/* ── Nav ── */

export interface NavContent {
  brand: string;
  leftLinks: NavLink[];
  rightLinks: NavLink[];
  dock: DockItem[];
}

/* ── Footer ── */

export interface FooterContent {
  brand: string;
  tagline: string;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
  };
  socials: { platform: string; url: string; label: string }[];
  copyright: string;
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

export interface FeaturedProject {
  name: string;
  description: string;
  images: string[];
  details: { label: string; value: string }[];
}

export interface ProjectGalleryContent {
  label: string;
  heading: SectionHeading;
  projects: FeaturedProject[];
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
  stats: Stat[];
  items: ServiceItem[];
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
  items: ReviewItem[];
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
  channels: SocialChannel[];
}

export interface HomepageContent {
  hero: HeroContent;
  projectGallery: ProjectGalleryContent;
  services: ServicesContent;
  reviews: ReviewsContent;
  social: SocialContent;
}

/* ── About page ── */

export interface AboutIntro {
  label: string;
  headline: string[];
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
  paragraphs: string[];
}

export interface AboutValueItem {
  num: string;
  title: string;
  description: string;
}

export interface AboutValues {
  label: string;
  items: AboutValueItem[];
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
  nav: NavContent;
  footer: FooterContent;
  pages: PagesContent;
}
