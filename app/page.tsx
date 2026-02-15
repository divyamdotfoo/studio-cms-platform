import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Services } from "@/components/sections/Services";
import { Reviews } from "@/components/sections/Reviews";
import { Social } from "@/components/sections/Social";

export default function Page() {
  return (
    <main>
      <Hero />
      <FeaturedProjects />
      <Services />
      <Reviews />
      <Social />
    </main>
  );
}
