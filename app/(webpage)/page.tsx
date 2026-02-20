import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Services } from "@/components/sections/Services";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { Social } from "@/components/sections/Social";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessJsonLd, faqJsonLd } from "@/lib/json-ld";
import content from "@/cms/active/content.json";

export default function Page() {
  return (
    <main>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(content.pages.homepage.faq.items.values)} />
      <Hero />
      <FeaturedProjects />
      <Services />
      <Reviews />
      <Faq />
      <Social />
    </main>
  );
}
