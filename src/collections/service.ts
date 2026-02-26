import type { CollectionConfig, CollectionSlug } from "payload";
import { MediaCollection } from "./media";
import { ServiceItemCollection } from "./service-item";
import { withMediaRelationshipPicker } from "./utils/media-relationship-picker";

const formatSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const ServiceCollection: CollectionConfig = {
  slug: "service",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: "Service Title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Service Slug",
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
      label: "Service Description",
      type: "textarea",
      required: true,
    },
    withMediaRelationshipPicker(
      {
        name: "serviceThumbnail",
        label: "Service Thumbnail",
        type: "relationship",
        relationTo: [MediaCollection.slug as CollectionSlug],
        required: false,
      },
      {
        buttonLabel: "Select service thumbnail",
        modalTitle: "Service media library",
        helperText: "Choose service thumbnail from your media library.",
      }
    ),
    {
      name: "serviceItems",
      label: "Service Items",
      type: "relationship",
      relationTo: [ServiceItemCollection.slug as CollectionSlug],
      required: false,
      hasMany: true,
    },
  ],
};
