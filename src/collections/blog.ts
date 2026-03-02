import type { CollectionConfig } from "payload";

const formatSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const BlogCollection: CollectionConfig = {
  slug: "blog",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "status", "updatedAt"],
  },
  fields: [
    {
      name: "title",
      label: "Blog Title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Blog Slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (typeof value === "string" && value.trim().length > 0) {
              return formatSlug(value);
            }
            if (data?.title) {
              return formatSlug(String(data.title));
            }
            return value;
          },
        ],
      },
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedAt",
      label: "Published At",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "readingTime",
      label: "Reading Time",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    {
      name: "coverImage",
      label: "Cover Image URL",
      type: "text",
      required: true,
    },
    {
      name: "coverImageAlt",
      label: "Cover Image Alt",
      type: "text",
      required: true,
    },
    {
      name: "content",
      label: "MDX Content",
      type: "textarea",
      required: true,
      admin: {
        description:
          "Paste MDX body only. Do not include import statements or export metadata.",
      },
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
