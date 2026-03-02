import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Services } from "@/components/sections/Services";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { Social } from "@/components/sections/Social";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildCmsSeoMetadata } from "@/lib/metadata";
import { localBusinessJsonLd, faqJsonLd } from "@/lib/json-ld";
import {
  getFaq,
  getHomepage,
  getMeta,
  getMicroOfferings,
  getProjects,
  getReviews,
  getSeoConfig,
} from "@/server/queries";

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepage();
  return buildCmsSeoMetadata(homepage.seo);
}

export default async function Page() {
  const homepage = await getHomepage();
  const meta = await getMeta();
  const faq = await getFaq();
  const projects = await getProjects();
  const reviews = await getReviews();
  const microOfferings = await getMicroOfferings();
  const seoConfig = await getSeoConfig();

  return (
    <main>
      <JsonLd data={localBusinessJsonLd(seoConfig)} />
      <JsonLd
        data={faqJsonLd(
          faq.map((item) => ({ question: item.question, answer: item.answer }))
        )}
      />
      <Hero homepage={homepage} meta={meta} />
      <FeaturedProjects homepage={homepage} projects={projects} />
      <Services homepage={homepage} microOfferings={microOfferings} />
      <Reviews homepage={homepage} reviews={reviews} />
      <Faq homepage={homepage} faq={faq} />
      <Social homepage={homepage} meta={meta} />
    </main>
  );
}
