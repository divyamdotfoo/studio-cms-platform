import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceItemPage } from "@/components/pages/services/ServiceItemPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildDynamicEntityMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { getContactLinks } from "@/lib/utils";
import {
  getMeta,
  getSeoConfig,
  getServiceItemParams,
  getServiceItemBySlug,
} from "@/server/queries";

interface ServiceItemRouteProps {
  params: Promise<{
    serviceSlug: string;
    serviceItemSlug: string;
  }>;
}

export async function generateStaticParams() {
  return getServiceItemParams();
}

export async function generateMetadata({
  params,
}: ServiceItemRouteProps): Promise<Metadata> {
  const seoConfig = await getSeoConfig();
  const { serviceSlug, serviceItemSlug } = await params;
  const resolved = await getServiceItemBySlug(serviceSlug, serviceItemSlug);

  if (!resolved) {
    return {
      title: seoConfig.serviceItemNotFoundTitle,
    };
  }

  return buildDynamicEntityMetadata({
    title: resolved.serviceItem.name,
    description: resolved.serviceItem.description,
    canonicalPath: `/services/${resolved.service.slug}/${resolved.serviceItem.slug}`,
    siteName: seoConfig.siteName,
    titleSuffix: seoConfig.titleSuffix,
    imageUrl: resolved.serviceItem.imageUrls[0],
    imageAlt: resolved.serviceItem.name,
  });
}

export default async function ServiceItemSlugPage({
  params,
}: ServiceItemRouteProps) {
  const seoConfig = await getSeoConfig();
  const { serviceSlug, serviceItemSlug } = await params;
  const resolved = await getServiceItemBySlug(serviceSlug, serviceItemSlug);
  const meta = await getMeta();

  if (!resolved) {
    notFound();
  }

  const consultationText = `Hi, I want to book a consultation for ${resolved.service.name} - ${resolved.serviceItem.name}. Please share the next steps.`;
  const consultationHref = getContactLinks(meta, consultationText).whatsapp;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          {
            name: resolved.service.name,
            href: `/services/${resolved.service.slug}`,
          },
          {
            name: resolved.serviceItem.name,
            href: `/services/${resolved.service.slug}/${resolved.serviceItem.slug}`,
          },
        ], seoConfig.metadataBase)}
      />
      <ServiceItemPage
        service={resolved.service}
        serviceItem={resolved.serviceItem}
        consultationHref={consultationHref}
      />
    </>
  );
}
