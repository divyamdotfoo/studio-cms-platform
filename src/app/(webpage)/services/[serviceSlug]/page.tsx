import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/pages/services/ServicePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildDynamicEntityMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import {
  getSeoConfig,
  getServiceBySlug,
  getServiceSlugs,
} from "@/server/queries";

interface ServiceRouteProps {
  params: Promise<{ serviceSlug: string }>;
}

export async function generateStaticParams() {
  const serviceSlugs = await getServiceSlugs();
  return serviceSlugs.map((serviceSlug) => ({ serviceSlug }));
}

export async function generateMetadata({
  params,
}: ServiceRouteProps): Promise<Metadata> {
  const seoConfig = await getSeoConfig();
  const { serviceSlug } = await params;
  const service = await getServiceBySlug(serviceSlug);

  if (!service) {
    return {
      title: seoConfig.serviceNotFoundTitle,
    };
  }

  return buildDynamicEntityMetadata({
    title: service.name,
    description: service.description,
    canonicalPath: `/services/${service.slug}`,
    siteName: seoConfig.siteName,
    titleSuffix: seoConfig.titleSuffix,
    imageUrl: service.thumbnailUrl,
    imageAlt: service.name,
  });
}

export default async function ServiceSlugPage({ params }: ServiceRouteProps) {
  const seoConfig = await getSeoConfig();
  const { serviceSlug } = await params;
  const service = await getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: service.name, href: `/services/${service.slug}` },
          ],
          seoConfig.metadataBase
        )}
      />
      <ServicePage service={service} />
    </>
  );
}
