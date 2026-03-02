import { cache } from "react";
import type {
  AboutPage,
  Blog,
  BlogsPage,
  Faq,
  Homepage,
  Meta,
  MicroOffering,
  Project,
  ProjectsPage,
  Review,
  SeoConfig,
  Service as PayloadService,
  ServicesPage,
  ServiceItem,
} from "@/payload-types";
import { getPayloadClient } from "@/server/payload/client";
import type {
  FooterServiceContent,
  MediaRelation,
  ServiceCardContent,
  ServiceContent,
  ServiceItemContent,
} from "@/server/types";

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

export const getMeta = cache(async (): Promise<Meta> => {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "meta", depth: 2 });
});

export const getSeoConfig = cache(async (): Promise<SeoConfig> => {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "seo-config", depth: 2 });
});

export const getHomepage = cache(async (): Promise<Homepage> => {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "homepage", depth: 2 });
});

export const getAboutPage = cache(async (): Promise<AboutPage> => {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "about-page", depth: 2 });
});

export const getProjectsPage = cache(async (): Promise<ProjectsPage> => {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "projects-page", depth: 2 });
});

export const getServicesPage = cache(async (): Promise<ServicesPage> => {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "services-page", depth: 2 });
});

export const getProjects = cache(async (): Promise<Project[]> => {
  const payload = await getPayloadClient();
  const response = await payload.find({ collection: "project", depth: 2 });
  return response.docs as Project[];
});

export const getReviews = cache(async (): Promise<Review[]> => {
  const payload = await getPayloadClient();
  const response = await payload.find({ collection: "reviews", depth: 2 });
  return response.docs as Review[];
});

export const getFaq = cache(async (): Promise<Faq[]> => {
  const payload = await getPayloadClient();
  const response = await payload.find({
    collection: "faq",
    depth: 0,
    limit: 100,
  });
  return response.docs as Faq[];
});

export const getMicroOfferings = cache(async (): Promise<MicroOffering[]> => {
  const payload = await getPayloadClient();
  const response = await payload.find({
    collection: "micro-offerings",
    depth: 0,
    limit: 100,
  });
  return response.docs as MicroOffering[];
});

export const getServicesContent = cache(async (): Promise<ServiceContent[]> => {
  const payload = await getPayloadClient();
  const response = await payload.find({
    collection: "service",
    depth: 2,
    limit: 100,
    sort: "createdAt",
  });

  return response.docs.map((service) =>
    toServiceContent(service as PayloadService)
  );
});

export const getServiceCards = cache(
  async (): Promise<ServiceCardContent[]> => {
    const payload = await getPayloadClient();
    const response = await payload.find({
      collection: "service",
      depth: 1,
      limit: 100,
      sort: "createdAt",
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        serviceThumbnail: true,
      },
    });

    return response.docs.map((service) => {
      const typedService = service as PayloadService;
      return {
        id: typedService.id,
        slug: typedService.slug,
        name: typedService.name,
        description: typedService.description,
        thumbnailUrl:
          getMediaUrl(
            typedService.serviceThumbnail as MediaRelation | null | undefined
          ) ?? FALLBACK_IMAGE,
      };
    });
  }
);

export const getFooterServices = cache(
  async (): Promise<FooterServiceContent[]> => {
    const payload = await getPayloadClient();
    const response = await payload.find({
      collection: "service",
      depth: 2,
      limit: 100,
      sort: "createdAt",
      select: {
        slug: true,
        name: true,
        serviceItems: true,
      },
    });

    return response.docs.flatMap((service) => {
      if (!service.slug || !service.name) return [];

      const serviceItems = (service.serviceItems ?? [])
        .map((relation) => {
          if (typeof relation.value === "number") return null;
          return {
            slug: relation.value.slug,
            name: relation.value.name,
          };
        })
        .filter((item): item is Pick<ServiceItemContent, "slug" | "name"> =>
          Boolean(item && item.slug && item.name)
        );

      return [
        {
          slug: service.slug,
          name: service.name,
          serviceItems,
        },
      ];
    });
  }
);

export const getServiceSlugs = cache(async (): Promise<string[]> => {
  const services = await getFooterServices();
  return services
    .map((service) => service.slug)
    .filter((slug): slug is string => Boolean(slug));
});

export const getServiceItemParams = cache(
  async (): Promise<
    Array<{ serviceSlug: string; serviceItemSlug: string }>
  > => {
    const services = await getFooterServices();
    return services.flatMap((service) =>
      service.serviceItems
        .map((item) => ({
          serviceSlug: service.slug,
          serviceItemSlug: item.slug,
        }))
        .filter((item) => Boolean(item.serviceItemSlug))
    );
  }
);

export const getServiceBySlug = cache(async (serviceSlug: string) => {
  const payload = await getPayloadClient();
  const response = await payload.find({
    collection: "service",
    depth: 2,
    limit: 1,
    where: {
      slug: { equals: serviceSlug },
    },
  });

  const service = response.docs[0];
  if (!service) return null;
  return toServiceContent(service as PayloadService);
});

export const getServiceItemBySlug = cache(
  async (serviceSlug: string, serviceItemSlug: string) => {
    const service = await getServiceBySlug(serviceSlug);
    if (!service) return null;

    const serviceItem =
      service.serviceItems.find((item) => item.slug === serviceItemSlug) ??
      null;
    if (!serviceItem) return null;

    return {
      service,
      serviceItem,
    };
  }
);

export const getBlogsPage = cache(async (): Promise<BlogsPage> => {
  const payload = await getPayloadClient();
  return payload.findGlobal({
    slug: "blogs-page",
    depth: 2,
  });
});

export const getBlogs = cache(async (): Promise<Blog[]> => {
  const payload = await getPayloadClient();
  const response = await payload.find({
    collection: "blog",
    depth: 0,
    limit: 100,
    sort: "-publishedAt",
    where: {
      status: { equals: "published" },
    },
  });

  return response.docs;
});

export const getBlogBySlug = cache(
  async (slug: string): Promise<Blog | null> => {
    const payload = await getPayloadClient();
    const response = await payload.find({
      collection: "blog",
      depth: 0,
      limit: 1,
      where: {
        and: [{ slug: { equals: slug } }, { status: { equals: "published" } }],
      },
    });

    const post = response.docs[0];
    if (!post) {
      return null;
    }

    return post;
  }
);

export const getBlogSlugs = cache(async (): Promise<string[]> => {
  const blogs = await getBlogs();
  return blogs.map((blog) => blog.slug);
});
