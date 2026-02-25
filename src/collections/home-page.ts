import type { GlobalConfig, CollectionSlug } from "payload";
import { MicroOfferingsCollection } from "./micro-offering";
import { ReviewsCollection } from "./reviews";
import { FaqCollection } from "./faq";

export const HomepageCollection: GlobalConfig = {
  slug: "homepage",
  fields: [
    {
      name: "heroHeadlinePartOne",
      label: "Hero Headline Part One",
      type: "text",
      required: true,
    },
    {
      name: "heroHeadlinePartTwo",
      label: "Hero Headline Part two",
      type: "text",
      required: true,
    },
    {
      name: "heroDescription",
      label: "Hero Description",
      type: "textarea",
      required: true,
    },
    {
      name: "featuredProjectsSectionLabel",
      label: "Featured Projects Section Label",
      type: "text",
      required: true,
    },
    {
      name: "featuredProjectsSectionHeadlinePartOne",
      label: "Featured Projects Section Headline Part One",
      type: "text",
      required: true,
    },
    {
      name: "featuredProjectsSectionHeadlinePartTwo",
      label: "Featured Projects Section Headline Part Two",
      type: "text",
      required: true,
    },
    {
      name: "featuredProjects",
      type: "relationship",
      relationTo: "project",
      hasMany: true,
      label: "Featured Projects",
      required: true,
      maxRows: 5,
      minRows: 2,
    },
    {
      name: "servicesSectionLabel",
      label: "Services Section Label",
      type: "text",
      required: true,
    },
    {
      name: "servicesSectionHeadlinePartOne",
      label: "Services Section Headline Part One",
      type: "text",
      required: true,
    },
    {
      name: "servicesSectionHeadlinePartTwo",
      label: "Services Section Headline Part Two",
      type: "text",
      required: true,
    },
    {
      name: "servicesSectionDescription",
      label: "Services Section Description",
      type: "textarea",
      required: true,
    },
    {
      name: "servicesSectionStats",
      label: "Services Section Horizontal Stats",
      type: "array",
      required: true,
      fields: [
        {
          name: "stat",
          label: "Stat",
          type: "text",
          required: true,
        },
        {
          name: "label",
          label: "Label",
          type: "text",
          required: true,
        },
      ],
      maxRows: 4,
    },

    {
      name: "servicesSectionList",
      label: "Services Section Vertical List",
      type: "array",
      required: true,
      fields: [
        {
          name: "serviceHeading",
          label: "Service Heading",
          type: "text",
        },
        {
          name: "serviceDescription",
          label: "Service Description",
          type: "textarea",
        },
        {
          name: "serviceDeliverables",
          label: "Service Deliverables",
          type: "relationship",
          relationTo: [MicroOfferingsCollection.slug as CollectionSlug],
          hasMany: true,
        },
      ],
    },
    {
      name: "reviewsSectionLabel",
      label: "Reviews Section Label",
      type: "text",
      required: true,
    },
    {
      name: "reviewsSectionHeadlinePartOne",
      label: "Reviews Section Headline Part One",
      type: "text",
    },
    {
      name: "reviewsSectionHeadlinePartTwo",
      label: "Reviews Section Headline Part Two",
      type: "text",
    },
    {
      name: "featuredReview",
      label: "Choose a review to show as featured",
      type: "relationship",
      relationTo: [ReviewsCollection.slug as CollectionSlug],
      hasMany: false,
      required: true,
    },
    {
      name: "reviewsItems",
      type: "relationship",
      relationTo: [ReviewsCollection.slug as CollectionSlug],
      hasMany: true,
      label: "Select reviews",
      required: true,
      minRows: 2,
    },
    {
      name: "faqSectionLabel",
      label: "FAQ Section Label",
      type: "text",
      required: true,
    },
    {
      name: "faqSectionHeadlinePartOne",
      label: "FAQ Section Headline Part One",
      type: "text",
      required: true,
    },
    {
      name: "faqSectionHeadlinePartTwo",
      label: "FAQ Section Headline Part Two",
      type: "text",
      required: true,
    },
    {
      name: "faqSectionDescription",
      label: "FAQ Section Description",
      type: "textarea",
      required: true,
    },
    {
      name: "faqSectionItems",
      type: "relationship",
      relationTo: [FaqCollection.slug as CollectionSlug],
      hasMany: true,
      label: "Select FAQ items",
      required: true,
      minRows: 2,
    },
    {
      name: "socialSectionLabel",
      label: "Social Section Label",
      type: "text",
      required: true,
    },
    {
      name: "socialSectionHeadlinePartOne",
      label: "Social Section Headline Part One",
      type: "text",
    },
    {
      name: "socialSectionHeadlinePartTwo",
      label: "Social Section Headline Part Two",
      type: "text",
    },
    {
      name: "socialSectionDescription",
      label: "Social Section Description",
      type: "textarea",
      required: true,
    },
  ],
};
