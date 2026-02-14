import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
      </main>
    </>
  );
}
