import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/About";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "About — Vision Architect | Ar. Ujjwal Kapoor",
  description:
    "Meet Ar. Ujjwal Kapoor, the young architect behind Vision Architect. 6+ years of delivering dream homes across Haridwar and beyond.",
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ])}
      />
      <AboutPage />
    </>
  );
}
