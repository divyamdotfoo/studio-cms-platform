import type { Metadata } from "next";
import { ComingSoon } from "@/components/pages/ComingSoon";

export const metadata: Metadata = {
  title: "Projects — Vision Architect",
  description:
    "Our portfolio of residential and commercial architecture projects. Coming soon.",
};

export default function Page() {
  return <ComingSoon title="Projects" />;
}
