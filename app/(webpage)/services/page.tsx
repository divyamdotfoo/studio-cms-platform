import type { Metadata } from "next";
import { ComingSoon } from "@/components/pages/ComingSoon";

export const metadata: Metadata = {
  title: "Services — Vision Architect",
  description:
    "Our architecture services — residential design, commercial spaces, interiors, and consultation. Coming soon.",
};

export default function Page() {
  return <ComingSoon title="Services" />;
}
