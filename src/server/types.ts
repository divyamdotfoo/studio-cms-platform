import type { Media, Service, ServiceItem } from "@/payload-types";

export type ServiceItemContent = Pick<
  ServiceItem,
  | "id"
  | "name"
  | "description"
  | "componentLayout"
  | "componentDimensions"
  | "estimatedTime"
  | "estimatedCost"
> & {
  slug: string;
  imageUrls: string[];
  specialFeatures: NonNullable<ServiceItem["specialFeatures"]>;
  colours: NonNullable<ServiceItem["colours"]>;
};

export type ServiceContent = Pick<Service, "id" | "name" | "description"> & {
  slug: string;
  thumbnailUrl: string;
  serviceItems: ServiceItemContent[];
};

export type ServiceCardContent = Pick<
  ServiceContent,
  "id" | "slug" | "name" | "description" | "thumbnailUrl"
>;

export type FooterServiceContent = Pick<ServiceContent, "slug" | "name"> & {
  serviceItems: Array<Pick<ServiceItemContent, "slug" | "name">>;
};

export type MediaRelation = { relationTo: "media"; value: number | Media };
