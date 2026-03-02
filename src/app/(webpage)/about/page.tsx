import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/About";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildCmsSeoMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { getAboutPage, getMeta, getSeoConfig } from "@/server/queries";

export async function generateMetadata(): Promise<Metadata> {
  const aboutPage = await getAboutPage();
  return buildCmsSeoMetadata(aboutPage.seo);
}

export default async function Page() {
  const aboutPage = await getAboutPage();
  const meta = await getMeta();
  const seoConfig = await getSeoConfig();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ], seoConfig.metadataBase)}
      />
      <AboutPage aboutPage={aboutPage} meta={meta} />
    </>
  );
}
