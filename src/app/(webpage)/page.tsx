import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Services } from "@/components/sections/Services";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { Social } from "@/components/sections/Social";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessJsonLd, faqJsonLd } from "@/lib/json-ld";
import { getSiteContent } from "@/server/queries";

export const metadata: Metadata = {
  title: "Vision Architect — Haridwar's Trusted Architecture Partner",
  description:
    "Professional architecture services in Haridwar for homes, cafes, and commercial spaces across Uttarakhand.",
  alternates: {
    canonical: "/",
  },
};

export default async function Page() {
  const { faq } = await getSiteContent();

  return (
    <main>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={faqJsonLd(
          faq.map((item) => ({ question: item.question, answer: item.answer }))
        )}
      />
      <Hero />
      <FeaturedProjects />
      <Services />
      <Reviews />
      <Faq />
      <Social />
    </main>
  );
}
