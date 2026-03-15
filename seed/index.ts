import payload, { type SanitizedConfig } from "payload";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SEED_BLOGS, SEED_BLOGS_PAGE } from "./data/blogs";
import { SEED_FAQ, SEED_REVIEWS } from "./data/content";
import { SEED_MEDIA } from "./data/media";
import { SEED_META } from "./data/meta";
import { SEED_ABOUT_PAGE, SEED_HOMEPAGE, SEED_PROJECTS_PAGE } from "./data/pages";
import { SEED_PROJECTS } from "./data/projects";
import {
  ABOUT_PAGE_SEO,
  BLOGS_PAGE_SEO,
  HOMEPAGE_SEO,
  PROJECTS_PAGE_SEO,
  SEO_CONFIG,
  SERVICES_PAGE_SEO,
} from "./data/seo";
import {
  SEED_MICRO_OFFERINGS,
  SEED_SERVICE_ITEMS,
  SEED_SERVICES,
} from "./data/services";

const STOP_SEEDING = false;

const clearCollection = async (collection: string) => {
  await payload.delete({
    collection: collection as never,
    where: { id: { exists: true } },
  });
};

const seedDir = path.dirname(fileURLToPath(import.meta.url));

const requireMediaId = (
  mediaIdMap: Map<string, number>,
  key: string,
  context: string
) => {
  const mediaId = mediaIdMap.get(key);
  if (typeof mediaId !== "number") {
    throw new Error(`Missing media mapping '${key}' for ${context}`);
  }
  return mediaId;
};

export const script = async (config: SanitizedConfig) => {
  if (STOP_SEEDING) {
    console.log("Seed stopped by user request");
    return;
  }

  await payload.init({ config });

  const serviceItemIdMap = new Map<string, number>();
  const microOfferingIdMap = new Map<string, number>();
  const reviewIdMap = new Map<string, number>();
  const faqIdMap = new Map<string, number>();
  const projectIdMap = new Map<string, number>();
  const mediaIdMap = new Map<string, number>();

  await clearCollection("service");
  await clearCollection("service-item");
  await clearCollection("project");
  await clearCollection("reviews");
  await clearCollection("faq");
  await clearCollection("micro-offerings");
  await clearCollection("blog");
  await clearCollection("media");

  for (const mediaItem of SEED_MEDIA) {
    const absoluteMediaPath = path.resolve(seedDir, mediaItem.filePath);
    if (!existsSync(absoluteMediaPath)) {
      throw new Error(`Missing seed media file at ${absoluteMediaPath}`);
    }

    const created = await payload.create({
      collection: "media",
      data: {
        alt: mediaItem.alt,
      },
      filePath: absoluteMediaPath,
    });

    mediaIdMap.set(mediaItem.key, Number(created.id));
  }

  for (const item of SEED_SERVICE_ITEMS) {
    if (!Array.isArray(item.imageKeys) || item.imageKeys.length === 0) {
      throw new Error(`Missing imageKeys for service item '${item.key}'`);
    }

    const itemImageIds = item.imageKeys.map((mediaKey) =>
      requireMediaId(mediaIdMap, mediaKey, `service item '${item.key}'`)
    );

    const created = await payload.create({
      collection: "service-item",
      data: {
        name: item.name,
        slug: item.slug,
        description: item.description,
        componentLayout: item.componentLayout,
        componentDimensions: item.componentDimensions,
        specialFeatures: item.specialFeatures,
        estimatedTime: item.estimatedTime,
        estimatedCost: item.estimatedCost,
        colours: item.colours,
        images: itemImageIds.map((id) => ({
          relationTo: "media" as const,
          value: id,
        })),
      },
    });
    serviceItemIdMap.set(item.key, Number(created.id));
  }

  for (const service of SEED_SERVICES) {
    if (!service.thumbnailImageKey) {
      throw new Error(`Missing thumbnailImageKey for service '${service.key}'`);
    }

    const serviceThumbnailId = requireMediaId(
      mediaIdMap,
      service.thumbnailImageKey,
      `service '${service.key}'`
    );

    const relatedServiceItems = SEED_SERVICE_ITEMS.filter(
      (item) => item.serviceKey === service.key
    )
      .map((item) => serviceItemIdMap.get(item.key))
      .filter((id): id is number => typeof id === "number");

    await payload.create({
      collection: "service",
      data: {
        name: service.name,
        slug: service.slug,
        description: service.description,
        serviceThumbnail: {
          relationTo: "media" as const,
          value: serviceThumbnailId,
        },
        serviceItems: relatedServiceItems.map((id) => ({
          relationTo: "service-item" as const,
          value: id,
        })),
      },
    });
  }

  for (const name of SEED_MICRO_OFFERINGS) {
    const created = await payload.create({
      collection: "micro-offerings",
      data: {
        name,
      },
    });
    microOfferingIdMap.set(name, Number(created.id));
  }

  for (const item of SEED_FAQ) {
    const created = await payload.create({
      collection: "faq",
      data: {
        question: item.question,
        answer: item.answer,
      },
    });
    faqIdMap.set(item.question, Number(created.id));
  }

  for (const item of SEED_REVIEWS) {
    const created = await payload.create({
      collection: "reviews",
      data: {
        name: item.name,
        content: item.content,
      },
    });
    reviewIdMap.set(item.name, Number(created.id));
  }

  for (const project of SEED_PROJECTS) {
    if (!Array.isArray(project.imageKeys) || project.imageKeys.length === 0) {
      throw new Error(`Missing imageKeys for project '${project.key}'`);
    }

    const projectImageIds = project.imageKeys.map((mediaKey) =>
      requireMediaId(mediaIdMap, mediaKey, `project '${project.key}'`)
    );

    const created = await payload.create({
      collection: "project",
      data: {
        name: project.name,
        projectImage: projectImageIds.map((id) => ({
          relationTo: "media" as const,
          value: id,
        })),
        description: project.description,
        features: project.features,
        area: project.area,
        timeline: project.timeline,
        type: project.type,
        location: project.location,
      },
    });
    projectIdMap.set(project.key, Number(created.id));
  }

  for (const post of SEED_BLOGS) {
    await payload.create({
      collection: "blog",
      data: {
        slug: post.slug,
        title: post.title,
        description: post.description,
        coverImage: post.coverImage,
        coverImageAlt: post.coverImageAlt,
        readingTime: post.readingTime,
        content: post.content,
        status: post.status,
        publishedAt: post.publishedAt,
        seo: post.seo,
      },
    });
  }

  const featuredProjects = SEED_HOMEPAGE.featuredProjectKeys
    .map((key) => projectIdMap.get(key))
    .filter((id): id is number => typeof id === "number");
  const projectsPageProjects = SEED_PROJECTS_PAGE.projectKeys
    .map((key) => projectIdMap.get(key))
    .filter((id): id is number => typeof id === "number");

  const featuredReviewId = reviewIdMap.get(SEED_HOMEPAGE.featuredReviewName);

  await payload.updateGlobal({
    slug: "homepage",
    data: {
      heroHeadlinePartOne: SEED_HOMEPAGE.heroHeadlinePartOne,
      heroHeadlinePartTwo: SEED_HOMEPAGE.heroHeadlinePartTwo,
      heroDescription: SEED_HOMEPAGE.heroDescription,
      featuredProjectsSectionLabel: SEED_HOMEPAGE.featuredProjectsSectionLabel,
      featuredProjectsSectionHeadlinePartOne:
        SEED_HOMEPAGE.featuredProjectsSectionHeadlinePartOne,
      featuredProjectsSectionHeadlinePartTwo:
        SEED_HOMEPAGE.featuredProjectsSectionHeadlinePartTwo,
      featuredProjects,
      servicesSectionLabel: SEED_HOMEPAGE.servicesSectionLabel,
      servicesSectionHeadlinePartOne:
        SEED_HOMEPAGE.servicesSectionHeadlinePartOne,
      servicesSectionHeadlinePartTwo:
        SEED_HOMEPAGE.servicesSectionHeadlinePartTwo,
      servicesSectionDescription: SEED_HOMEPAGE.servicesSectionDescription,
      servicesSectionStats: [...SEED_HOMEPAGE.servicesSectionStats],
      servicesSectionList: SEED_HOMEPAGE.servicesSectionList.map((item) => ({
        serviceHeading: item.serviceHeading,
        serviceDescription: item.serviceDescription,
        serviceDeliverables: item.serviceDeliverables
          .map((deliverable) => microOfferingIdMap.get(deliverable))
          .filter((id): id is number => typeof id === "number")
          .map((id) => ({
            relationTo: "micro-offerings" as const,
            value: id,
          })),
      })),
      reviewsSectionLabel: SEED_HOMEPAGE.reviewsSectionLabel,
      reviewsSectionHeadlinePartOne:
        SEED_HOMEPAGE.reviewsSectionHeadlinePartOne,
      reviewsSectionHeadlinePartTwo:
        SEED_HOMEPAGE.reviewsSectionHeadlinePartTwo,
      featuredReview: {
        relationTo: "reviews",
        value:
          typeof featuredReviewId === "number"
            ? featuredReviewId
            : Number(Array.from(reviewIdMap.values())[0]),
      },
      reviewsItems: SEED_HOMEPAGE.reviewsItems
        .map((name) => reviewIdMap.get(name))
        .filter((id): id is number => typeof id === "number")
        .map((id) => ({
          relationTo: "reviews" as const,
          value: id,
        })),
      faqSectionLabel: SEED_HOMEPAGE.faqSectionLabel,
      faqSectionHeadlinePartOne: SEED_HOMEPAGE.faqSectionHeadlinePartOne,
      faqSectionHeadlinePartTwo: SEED_HOMEPAGE.faqSectionHeadlinePartTwo,
      faqSectionDescription: SEED_HOMEPAGE.faqSectionDescription,
      faqSectionItems: SEED_HOMEPAGE.faqSectionItems
        .map((question) => faqIdMap.get(question))
        .filter((id): id is number => typeof id === "number")
        .map((id) => ({
          relationTo: "faq" as const,
          value: id,
        })),
      socialSectionLabel: SEED_HOMEPAGE.socialSectionLabel,
      socialSectionHeadlinePartOne: SEED_HOMEPAGE.socialSectionHeadlinePartOne,
      socialSectionHeadlinePartTwo: SEED_HOMEPAGE.socialSectionHeadlinePartTwo,
      socialSectionDescription: SEED_HOMEPAGE.socialSectionDescription,
      seo: HOMEPAGE_SEO,
    },
  });

  await payload.updateGlobal({
    slug: "meta",
    data: SEED_META,
  });

  await payload.updateGlobal({
    slug: "projects-page",
    data: {
      heroHeadlinePartOne: SEED_PROJECTS_PAGE.heroHeadlinePartOne,
      heroHeadlinePartTwo: SEED_PROJECTS_PAGE.heroHeadlinePartTwo,
      heroDescription: SEED_PROJECTS_PAGE.heroDescription,
      projects: projectsPageProjects,
      seo: PROJECTS_PAGE_SEO,
    },
  });

  await payload.updateGlobal({
    slug: "about-page",
    data: {
      heroLabel: SEED_ABOUT_PAGE.heroLabel,
      heroHeadlinePartOne: SEED_ABOUT_PAGE.heroHeadlinePartOne,
      heroHeadlinePartTwo: SEED_ABOUT_PAGE.heroHeadlinePartTwo,
      heroDescription: SEED_ABOUT_PAGE.heroDescription,
      sectionTwoLabel: SEED_ABOUT_PAGE.sectionTwoLabel,
      sectionTwoHeadline: SEED_ABOUT_PAGE.sectionTwoHeadline,
      sectionTwoDescription: SEED_ABOUT_PAGE.sectionTwoDescription.map(
        (journeyItem) => ({
          journeyItem,
        })
      ),
      sectionThreeLabel: SEED_ABOUT_PAGE.sectionThreeLabel,
      approachSectionItems: SEED_ABOUT_PAGE.approachSectionItems,
      seo: ABOUT_PAGE_SEO,
    },
  });

  await payload.updateGlobal({
    slug: "seo-config",
    data: SEO_CONFIG,
  });

  await payload.updateGlobal({
    slug: "blogs-page",
    data: {
      title: SEED_BLOGS_PAGE.title,
      description: SEED_BLOGS_PAGE.description,
      seo: BLOGS_PAGE_SEO,
    },
  });

  await payload.updateGlobal({
    slug: "services-page",
    data: {
      seo: SERVICES_PAGE_SEO,
    },
  });

  payload.logger.info("Seed complete (core data + blogs + seo)");
  process.exit(0);
};
