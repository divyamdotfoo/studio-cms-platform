import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Reviews } from "@/components/sections/Reviews";
import { Social } from "@/components/sections/Social";

export default function Page() {
  return (
    <main className="pb-28 lg:pb-0">
      <Hero />
      <Services />
      <Reviews />
      <Social />
    </main>
  );
}
