import type { Metadata } from "next";
import { ServicesPage } from "@/components/pages/services/ServicesPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildCmsSeoMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { getServiceCards, getSeoConfig, getServicesPage } from "@/server/queries";

export async function generateMetadata(): Promise<Metadata> {
  const servicesPage = await getServicesPage();
  return buildCmsSeoMetadata(servicesPage.seo);
}

export default async function Page() {
  const services = await getServiceCards();
  const seoConfig = await getSeoConfig();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ], seoConfig.metadataBase)}
      />
      <ServicesPage services={services} />
    </>
  );
}
