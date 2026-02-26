import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/pages/services/ServicePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { getServiceBySlug, getServicesContent } from "@/server/queries";

interface ServiceRouteProps {
  params: Promise<{ serviceSlug: string }>;
}

export async function generateStaticParams() {
  const services = await getServicesContent();
  return services.map((service) => ({ serviceSlug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServiceRouteProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = await getServiceBySlug(serviceSlug);

  if (!service) {
    return {
      title: "Service Not Found — Vision Architect",
    };
  }

  return {
    title: `${service.name} — Vision Architect`,
    description: service.description,
  };
}

export default async function ServiceSlugPage({ params }: ServiceRouteProps) {
  const { serviceSlug } = await params;
  const service = await getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name, href: `/services/${service.slug}` },
        ])}
      />
      <ServicePage service={service} />
    </>
  );
}
