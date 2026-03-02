import type { GlobalConfig } from "payload";

export const BlogPageCollection: GlobalConfig = {
  slug: "blogs-page",
  fields: [
    {
      name: "title",
      label: "Page Title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Page Description",
      type: "textarea",
      required: true,
    },
    {
      name: "seo",
      label: "SEO",
      type: "group",
      fields: [
        {
          name: "title",
          label: "Meta Title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          label: "Meta Description",
          type: "textarea",
          required: true,
        },
        {
          name: "keywords",
          label: "Meta Keywords",
          type: "textarea",
          required: true,
        },
        {
          name: "canonicalPath",
          label: "Canonical Path",
          type: "text",
          required: true,
        },
        {
          name: "openGraphTitle",
          label: "Open Graph Title",
          type: "text",
          required: true,
        },
        {
          name: "openGraphDescription",
          label: "Open Graph Description",
          type: "textarea",
          required: true,
        },
        {
          name: "twitterTitle",
          label: "Twitter Title",
          type: "text",
          required: true,
        },
        {
          name: "twitterDescription",
          label: "Twitter Description",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
};
