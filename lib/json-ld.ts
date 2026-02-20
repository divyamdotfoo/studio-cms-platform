const BASE = "https://visionarchitect.in";

const BUSINESS = {
  name: "Vision Architect",
  legalName: "Vision Architect",
  url: BASE,
  telephone: "+917668761558",
  email: "visionarchitect29@gmail.com",
  foundingDate: "2018",
  founder: {
    "@type": "Person" as const,
    name: "Ar. Ujjwal Kapoor",
    jobTitle: "Founder & Principal Architect",
  },
  address: {
    "@type": "PostalAddress" as const,
    addressLocality: "Haridwar",
    addressRegion: "Uttarakhand",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates" as const,
    latitude: 29.9367,
    longitude: 78.1377,
  },
  areaServed: [
    { "@type": "City" as const, name: "Haridwar" },
    { "@type": "City" as const, name: "Rishikesh" },
    { "@type": "City" as const, name: "Dehradun" },
    {
      "@type": "State" as const,
      name: "Uttarakhand",
    },
  ],
  sameAs: [
    "https://www.instagram.com/vision_architect_/",
    "https://www.youtube.com/@visionarchitect3537",
  ],
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE}/#organization`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    logo: `${BASE}/logo.png`,
    founder: BUSINESS.founder,
    foundingDate: BUSINESS.foundingDate,
    sameAs: BUSINESS.sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS.telephone,
      email: BUSINESS.email,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Architect",
    "@id": `${BASE}/#localbusiness`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    image: `${BASE}/logo.png`,
    address: BUSINESS.address,
    geo: BUSINESS.geo,
    areaServed: BUSINESS.areaServed,
    founder: BUSINESS.founder,
    foundingDate: BUSINESS.foundingDate,
    description:
      "Professional architecture firm in Haridwar specializing in residential homes, cafes, and commercial spaces across Haridwar, Rishikesh, and Dehradun.",
    priceRange: "$$",
    sameAs: BUSINESS.sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Architecture Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Residential Design",
            description:
              "Complete home design including floor planning, 3D visualization, construction drawings, and Vastu consultation.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial Spaces",
            description:
              "Cafe, office, and showroom design with space planning, brand-aligned interiors, lighting, and furniture layout.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Interior Design",
            description:
              "Complete interior solutions — material selection, custom furniture, colour consultation, and decor styling.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Consultation & Planning",
            description:
              "Site analysis, budget planning, regulatory guidance, and project timeline planning.",
          },
        },
      ],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    publisher: { "@id": `${BASE}/#organization` },
  };
}

export function articleJsonLd({
  title,
  description,
  slug,
  coverImage,
}: {
  title: string;
  description: string;
  slug: string;
  coverImage: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${BASE}/blog/${slug}`,
    image: coverImage,
    author: {
      "@type": "Person",
      name: "Ar. Ujjwal Kapoor",
      url: `${BASE}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      url: BUSINESS.url,
      logo: { "@type": "ImageObject", url: `${BASE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/blog/${slug}` },
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE}${item.href}`,
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
