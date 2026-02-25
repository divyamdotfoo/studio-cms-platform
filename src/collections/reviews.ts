import type { CollectionConfig, CollectionSlug } from "payload";
import { MediaCollection } from "./media";

export const ReviewsCollection: CollectionConfig = {
  slug: "reviews",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      required: true,
    },
    {
      name: "content",
      label: "Review Content",
      type: "textarea",
      required: true,
    },
    {
      name: "video",
      label: "Select video",
      type: "relationship",
      relationTo: [MediaCollection.slug as CollectionSlug],
      required: false,
      hasMany: false,
    },
  ],
};
