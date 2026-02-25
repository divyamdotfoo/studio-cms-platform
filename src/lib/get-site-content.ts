import { cache } from "react";
import config from "@payload-config";
import { getPayload } from "payload";
import type {
  AboutPage,
  Faq,
  Homepage,
  Meta,
  MicroOffering,
  Project,
  ProjectsPage,
  Review,
} from "../../payload-types";

export type SiteContent = {
  homepage: Homepage;
  aboutPage: AboutPage;
  projectsPage: ProjectsPage;
  meta: Meta;
  projects: Project[];
  reviews: Review[];
  faq: Faq[];
  microOfferings: MicroOffering[];
};

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const payload = await getPayload({ config });

  const [
    homepage,
    aboutPage,
    projectsPage,
    meta,
    projectsRes,
    reviewsRes,
    faqRes,
    microOfferingsRes,
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
      limit: 100,
    }),
    payload.find({
      collection: "reviews",
      depth: 2,
      limit: 100,
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
  ]);

  return {
    homepage,
    aboutPage,
    projectsPage,
    meta,
    projects: projectsRes.docs,
    reviews: reviewsRes.docs,
    faq: faqRes.docs,
    microOfferings: microOfferingsRes.docs,
  };
});
