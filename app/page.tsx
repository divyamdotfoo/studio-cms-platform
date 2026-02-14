import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Reviews } from "@/components/sections/Reviews";

export default function Page() {
  return (
    <main className="pb-28 lg:pb-0">
      <Hero />
      <Services />
      <Reviews />
    </main>
  );
}
