import { Meta } from "@/payload-types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getContactLinks = (meta: Meta, text?: string) => {
  const whatsappBase = `https://wa.me/${meta.whatsapp}`;
  const whatsappQuery = text ? `?text=${encodeURIComponent(text)}` : "";

  const links = {
    whatsapp: `${whatsappBase}${whatsappQuery}`,
    phone: `tel:${meta.phone}`,
    email: `mailto:${meta.email}`,
    insta: `https://www.instagram.com/${meta.insta}`,
    youtube: `https://www.youtube.com/@${meta.youtube}`,
  };

  return links;
};
