import type { CollectionConfig, CollectionSlug } from "payload";
import { MediaCollection } from "./media";
import { withMediaRelationshipPicker } from "./utils/media-relationship-picker";

const formatSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const ServiceItemCollection: CollectionConfig = {
  slug: "service-item",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: "Service Item Title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Service Item Slug",
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
            if (data?.name) {
              return formatSlug(String(data.name));
            }
            return value;
          },
        ],
      },
    },
    {
      name: "description",
      label: "Service Item Description",
      type: "textarea",
      required: true,
    },
    withMediaRelationshipPicker(
      {
        name: "images",
        label: "Service Images to show the user",
        type: "relationship",
        relationTo: [MediaCollection.slug as CollectionSlug],
        required: false,
        hasMany: true,
      },
      {
        buttonLabel: "Select service images",
        modalTitle: "Service media library",
        helperText: "Choose service images from your media library.",
      }
    ),
    {
      name: "componentLayout",
      label: "Component Layout if applicable like ()",
      type: "text",
      required: false,
    },
    {
      name: "componentDimensions",
      label: "Component Dimensions like (10x10 feet)",
      type: "text",
      required: false,
    },

    {
      name: "specialFeatures",
      label: "Special Features",
      type: "array",
      required: false,
      fields: [
        {
          name: "feature",
          label: "Feature",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "estimatedTime",
      label: "Estimated Time",
      type: "text",
      required: true,
    },
    {
      name: "estimatedCost",
      label: "Estimated Cost Range like (20k-30k)",
      type: "text",
      required: false,
    },
    {
      name: "colours",
      label: "Colours for each component",
      type: "array",
      required: false,
      fields: [
        {
          name: "colour",
          label: "Colour name like (white, black, red, blue, etc.)",
          type: "text",
          required: true,
        },
        {
          name: "component",
          label: "Component name like (walls, floors, ceilings, etc.)",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
