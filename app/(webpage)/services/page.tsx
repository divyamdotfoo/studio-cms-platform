import type { Metadata } from "next";
import { ComingSoon } from "@/components/pages/ComingSoon";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Services — Vision Architect",
  description:
    "Our architecture services — residential design, commercial spaces, interiors, and consultation. Coming soon.",
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ])}
      />
      <ComingSoon title="Services" />
    </>
  );
}
