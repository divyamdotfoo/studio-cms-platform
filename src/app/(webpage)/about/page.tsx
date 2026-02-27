import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/About";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { getAboutPage, getMeta } from "@/server/queries";

export const metadata: Metadata = {
  title: "About — Vision Architect | Ar. Ujjwal Kapoor",
  description:
    "Meet Ar. Ujjwal Kapoor, the young architect behind Vision Architect. 6+ years of delivering dream homes across Haridwar and beyond.",
  alternates: {
    canonical: "/about",
  },
};

export default async function Page() {
  const aboutPage = await getAboutPage();
  const meta = await getMeta();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ])}
      />
      <AboutPage aboutPage={aboutPage} meta={meta} />
    </>
  );
}
