import type { Metadata } from "next";
import type { Homepage, SeoConfig } from "@/payload-types";

export function buildCmsSeoMetadata(
  seo: Homepage["seo"],
  options: {
    openGraphType?: "website" | "article";
    siteName?: SeoConfig["siteName"];
    twitterCard?: SeoConfig["defaultTwitterCard"];
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
  } = {}
): Metadata {
  const { openGraphType = "website", siteName, twitterCard, images } = options;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonicalPath,
    },
    openGraph: {
      title: seo.openGraphTitle,
      description: seo.openGraphDescription,
      type: openGraphType,
      ...(siteName ? { siteName } : {}),
      ...(images?.length ? { images } : {}),
    },
    twitter: {
      ...(twitterCard ? { card: twitterCard } : {}),
      title: seo.twitterTitle,
      description: seo.twitterDescription,
      ...(images?.length ? { images: images.map((image) => image.url) } : {}),
    },
  };
}

export function buildDynamicEntityMetadata({
  title,
  description,
  canonicalPath,
  siteName,
  titleSuffix,
  imageUrl,
  imageAlt,
}: {
  title: string;
  description: string;
  canonicalPath: string;
  siteName: SeoConfig["siteName"];
  titleSuffix: SeoConfig["titleSuffix"];
  imageUrl?: string;
  imageAlt?: string;
}): Metadata {
  const fullTitle = `${title}${titleSuffix}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: fullTitle,
      description,
      siteName,
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                alt: imageAlt ?? title,
              },
            ],
          }
        : {}),
    },
  };
}

export function buildLayoutMetadata(
  seoConfig: SeoConfig,
  faviconUrl?: string | null
): Metadata {
  console.log("faviconUrl", faviconUrl);
  return {
    metadataBase: new URL(seoConfig.metadataBase),
    title: `${seoConfig.organization.name}${seoConfig.titleSuffix}`,
    description: seoConfig.organization.description,
    ...(faviconUrl
      ? {
          icons: {
            icon: faviconUrl,
            shortcut: faviconUrl,
          },
        }
      : {}),
    openGraph: {
      title: `${seoConfig.organization.name}${seoConfig.titleSuffix}`,
      description: seoConfig.organization.description,
      locale: "en_IN",
      siteName: seoConfig.siteName,
      type: "website",
      images: [
        {
          url: seoConfig.defaultOgImageUrl,
          width: 1200,
          height: 630,
          alt: seoConfig.defaultOgImageAlt,
        },
      ],
    },
    twitter: {
      card: seoConfig.defaultTwitterCard,
      images: [seoConfig.defaultOgImageUrl],
    },
    robots: {
      index: seoConfig.defaultRobotsIndex,
      follow: seoConfig.defaultRobotsFollow,
      googleBot: {
        index: seoConfig.defaultRobotsIndex,
        follow: seoConfig.defaultRobotsFollow,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
