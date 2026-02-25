import type { CollectionConfig, CollectionSlug } from "payload";
import { MediaCollection } from "./media";

export const ProjectCollection: CollectionConfig = {
  slug: "project",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: "Project Name",
      type: "text",
      required: true,
    },
    {
      name: "projectImage",
      type: "relationship",
      relationTo: [MediaCollection.slug as CollectionSlug],
      required: false,
      hasMany: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    {
      name: "features",
      label: "Features",
      type: "array",
      required: true,
      fields: [
        {
          name: "feature",
          label: "Feature",
          type: "textarea",
          required: true,
        },
      ],
      maxRows: 10,
    },
    {
      name: "area",
      label: "Area (in sq.ft)",
      type: "text",
      required: true,
    },
    {
      name: "timeline",
      type: "text",
      required: true,
      label: "Timeline (in months)",
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        {
          label: "Residential",
          value: "residential",
        },
        {
          label: "Shops & Showrooms",
          value: "shops-showrooms",
        },
        {
          label: "Offices",
          value: "offices",
        },
        {
          label: "Restaurants",
          value: "restaurants",
        },
      ],
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
  ],
};
