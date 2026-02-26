import config from "@payload-config";
import { getPayload } from "payload";
import type {
  MediaRelation,
  ServiceContent,
  ServiceItemContent,
  SiteContent,
} from "@/server/types";
import type { Service as PayloadService, ServiceItem } from "@/payload-types";

const FALLBACK_IMAGE = "/images/service-placeholder.svg";

function getMediaUrl(
  relation: MediaRelation | null | undefined
): string | null {
  if (!relation || typeof relation.value === "number") return null;
  return relation.value.url ?? null;
}

function getMediaUrls(relations: MediaRelation[] | null | undefined) {
  if (!relations) return [];

  return relations
    .map((relation) => getMediaUrl(relation))
    .filter((url): url is string => Boolean(url));
}

function toServiceItemContent(item: ServiceItem): ServiceItemContent {
  return {
    id: item.id,
    slug: item.slug,
    name: item.name,
    description: item.description,
    imageUrls: getMediaUrls(item.images as MediaRelation[] | null | undefined),
    componentLayout: item.componentLayout,
    componentDimensions: item.componentDimensions,
    specialFeatures: item.specialFeatures ?? [],
    estimatedTime: item.estimatedTime,
    estimatedCost: item.estimatedCost,
    colours: item.colours ?? [],
  };
}

function toServiceContent(service: PayloadService): ServiceContent {
  return {
    id: service.id,
    slug: service.slug,
    name: service.name,
    description: service.description,
    thumbnailUrl:
      getMediaUrl(
        service.serviceThumbnail as MediaRelation | null | undefined
      ) ?? FALLBACK_IMAGE,
    serviceItems:
      service.serviceItems
        ?.map((relation) => {
          if (typeof relation.value === "number") return null;
          return toServiceItemContent(relation.value as ServiceItem);
        })
        .filter((item): item is ServiceItemContent => Boolean(item)) ?? [],
  };
}

export const getSiteContent = async (): Promise<SiteContent> => {
  const payload = await getPayload({ config });

  const [
    homepage,
    aboutPage,
    projectsPage,
    meta,
    projects,
    reviews,
    faq,
    microOfferings,
    servicesRes,
  ] = await Promise.all([
    payload.findGlobal({
      slug: "homepage",
      depth: 2,
    }),
    payload.findGlobal({
      slug: "about-page",
    }),
    payload.findGlobal({
      slug: "projects-page",
    }),
    payload.findGlobal({
      slug: "meta",
    }),
    payload.find({
      collection: "project",
      depth: 2,
    }),
    payload.find({
      collection: "reviews",
      depth: 2,
    }),
    payload.find({
      collection: "faq",
      depth: 0,
      limit: 100,
    }),
    payload.find({
      collection: "micro-offerings",
      depth: 0,
      limit: 100,
    }),
    payload.find({
      collection: "service",
      depth: 2,
      limit: 100,
      sort: "createdAt",
    }),
  ]);

  return {
    homepage,
    aboutPage,
    projectsPage,
    meta,
    projects: projects.docs,
    reviews: reviews.docs,
    faq: faq.docs,
    microOfferings: microOfferings.docs,
    services: servicesRes.docs.map((service) =>
      toServiceContent(service as PayloadService)
    ),
  };
};

export const getServicesContent = async (): Promise<ServiceContent[]> => {
  const content = await getSiteContent();
  return content.services;
};

export const getServiceBySlug = async (serviceSlug: string) => {
  const services = await getServicesContent();
  return services.find((service) => service.slug === serviceSlug) ?? null;
};

export const getServiceItemBySlug = async (
  serviceSlug: string,
  serviceItemSlug: string
) => {
  const service = await getServiceBySlug(serviceSlug);
  if (!service) return null;

  const serviceItem =
    service.serviceItems.find((item) => item.slug === serviceItemSlug) ?? null;
  if (!serviceItem) return null;

  return {
    service,
    serviceItem,
  };
};
