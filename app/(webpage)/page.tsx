import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Services } from "@/components/sections/Services";
import { Reviews } from "@/components/sections/Reviews";
import { Social } from "@/components/sections/Social";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessJsonLd } from "@/lib/json-ld";

export default function Page() {
  return (
    <main>
      <JsonLd data={localBusinessJsonLd()} />
      <Hero />
      <FeaturedProjects />
      <Services />
      <Reviews />
      <Social />
    </main>
  );
}
