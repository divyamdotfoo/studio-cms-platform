import type { Metadata } from "next";
import { ServicesPage } from "@/components/pages/services/ServicesPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { getServiceCards } from "@/server/queries";

export const metadata: Metadata = {
  title: "Services — Vision Architect",
  description:
    "Our architecture services — residential design, commercial spaces, interiors, and consultation. Coming soon.",
  alternates: {
    canonical: "/services",
  },
};

export default async function Page() {
  const services = await getServiceCards();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ])}
      />
      <ServicesPage services={services} />
    </>
  );
}
