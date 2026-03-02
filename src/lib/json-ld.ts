import type { SeoConfig } from "@/payload-types";

const normalizeBaseUrl = (url: string) => url.replace(/\/+$/, "");

export function organizationJsonLd(seoConfig: SeoConfig) {
  const base = normalizeBaseUrl(seoConfig.metadataBase);
  const org = seoConfig.organization;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: org.name,
    legalName: org.legalName,
    url: org.url,
    logo: org.logoUrl,
    founder: {
      "@type": "Person",
      name: org.founderName,
      jobTitle: org.founderJobTitle,
    },
    foundingDate: org.foundingDate,
    sameAs: org.sameAs?.map((item) => item.url) ?? [],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: org.telephone,
      email: org.email,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
  };
}

export function localBusinessJsonLd(seoConfig: SeoConfig) {
  const base = normalizeBaseUrl(seoConfig.metadataBase);
  const org = seoConfig.organization;

  return {
    "@context": "https://schema.org",
    "@type": "Architect",
    "@id": `${base}/#localbusiness`,
    name: org.name,
    url: org.url,
    telephone: org.telephone,
    email: org.email,
    image: org.logoUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: org.addressLocality,
      addressRegion: org.addressRegion,
      addressCountry: org.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: org.geoLatitude,
      longitude: org.geoLongitude,
    },
    areaServed:
      org.areaServed?.map((item) => ({
        "@type": item.type,
        name: item.name,
      })) ?? [],
    founder: {
      "@type": "Person",
      name: org.founderName,
      jobTitle: org.founderJobTitle,
    },
    foundingDate: org.foundingDate,
    description: org.description,
    priceRange: org.priceRange,
    sameAs: org.sameAs?.map((item) => item.url) ?? [],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${org.name} Services`,
      itemListElement:
        org.serviceCatalog?.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.description,
          },
        })) ?? [],
    },
  };
}

export function websiteJsonLd(seoConfig: SeoConfig) {
  const base = normalizeBaseUrl(seoConfig.metadataBase);
  const org = seoConfig.organization;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    name: org.name,
    url: org.url,
    publisher: { "@id": `${base}/#organization` },
  };
}

export function articleJsonLd({
  title,
  description,
  slug,
  coverImage,
  seoConfig,
}: {
  title: string;
  description: string;
  slug: string;
  coverImage: string;
  seoConfig: SeoConfig;
}) {
  const base = normalizeBaseUrl(seoConfig.metadataBase);
  const org = seoConfig.organization;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${base}/blog/${slug}`,
    image: coverImage,
    author: {
      "@type": "Person",
      name: org.founderName,
      url: `${base}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: org.name,
      url: org.url,
      logo: { "@type": "ImageObject", url: org.logoUrl },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${base}/blog/${slug}` },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; href: string }[],
  metadataBase: string
) {
  const base = normalizeBaseUrl(metadataBase);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${base}${item.href}`,
    })),
  };
}

export function faqJsonLd(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
