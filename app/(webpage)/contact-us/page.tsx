import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us — Vision Architect",
  description:
    "Get in touch with Vision Architect. Share your name, email, or phone number and we'll reach out to discuss your project.",
};

export default function Page() {
  return <ContactForm />;
}
