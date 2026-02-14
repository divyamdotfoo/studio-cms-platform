/* ────────────────────────────────────────────────────
 * CMS Content Types
 *
 * Single source of truth for the shape of all site copy.
 * Mirrors what you'd get from a headless CMS response.
 * ──────────────────────────────────────────────────── */

export interface NavLink {
  label: string;
  href: string;
}

export interface DockItem {
  label: string;
  href: string;
  icon: string;
}

export interface NavContent {
  brand: string;
  leftLinks: NavLink[];
  rightLinks: NavLink[];
  dock: DockItem[];
}

export interface HeroContent {
  headline: {
    line1: string;
    line2: string;
    line2Italic: string;
  };
  location: string;
  description: string;
}

export interface GalleryPanel {
  label: string;
}

export interface ProjectGalleryContent {
  panels: GalleryPanel[];
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
  heading: {
    line1: string;
    line2: string;
    italicWord: string;
  };
  description: string;
  stats: Stat[];
  items: ServiceItem[];
}

export interface SiteContent {
  nav: NavContent;
  hero: HeroContent;
  projectGallery: ProjectGalleryContent;
  services: ServicesContent;
}
