import type { Metadata } from "next";
import { ProjectsPage } from "@/components/pages/Projects";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Projects — Vision Architect",
  description:
    "Explore our portfolio of residential and commercial architecture projects across Haridwar, Rishikesh, and Uttarakhand — designed with care and built to last.",
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
        ])}
      />
      <ProjectsPage />
    </>
  );
}
