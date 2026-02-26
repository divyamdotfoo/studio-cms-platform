import type {
  AboutPage,
  Faq,
  Homepage,
  Media,
  Meta,
  MicroOffering,
  Project,
  ProjectsPage,
  Review,
  Service,
  ServiceItem,
} from "@/payload-types";

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

export type MediaRelation = { relationTo: "media"; value: number | Media };

export type SiteContent = {
  homepage: Homepage;
  aboutPage: AboutPage;
  projectsPage: ProjectsPage;
  meta: Meta;
  projects: Project[];
  reviews: Review[];
  faq: Faq[];
  microOfferings: MicroOffering[];
  services: ServiceContent[];
};
