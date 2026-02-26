import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceItemPage } from "@/components/pages/services/ServiceItemPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import {
  getSiteContent,
  getServiceItemBySlug,
  getServicesContent,
} from "@/server/queries";

interface ServiceItemRouteProps {
  params: Promise<{
    serviceSlug: string;
    serviceItemSlug: string;
  }>;
}

export async function generateStaticParams() {
  const services = await getServicesContent();
  return services.flatMap((service) =>
    service.serviceItems.map((item) => ({
      serviceSlug: service.slug,
      serviceItemSlug: item.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: ServiceItemRouteProps): Promise<Metadata> {
  const { serviceSlug, serviceItemSlug } = await params;
  const resolved = await getServiceItemBySlug(serviceSlug, serviceItemSlug);

  if (!resolved) {
    return {
      title: "Service Item Not Found — Vision Architect",
    };
  }

  return {
    title: `${resolved.serviceItem.name} — Vision Architect`,
    description: resolved.serviceItem.description,
  };
}

export default async function ServiceItemSlugPage({
  params,
}: ServiceItemRouteProps) {
  const { serviceSlug, serviceItemSlug } = await params;
  const resolved = await getServiceItemBySlug(serviceSlug, serviceItemSlug);
  const { meta } = await getSiteContent();

  if (!resolved) {
    notFound();
  }

  const consultationText = encodeURIComponent(
    `Hi Vision Architect, I want to book a consultation for ${resolved.service.name} - ${resolved.serviceItem.name}. Please share the next steps.`
  );
  const separator = meta.whatsapp.includes("?") ? "&" : "?";
  const consultationHref = `${meta.whatsapp}${separator}text=${consultationText}`;

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
        ])}
      />
      <ServiceItemPage
        service={resolved.service}
        serviceItem={resolved.serviceItem}
        consultationHref={consultationHref}
      />
    </>
  );
}
