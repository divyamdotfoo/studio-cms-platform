import type { CollectionConfig } from "payload";

export const MediaCollection: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "filename",
    defaultColumns: ["thumbnailURL", "filename", "alt", "updatedAt"],
  },
  upload: {
    adminThumbnail: "thumbnail",
    imageSizes: [
      {
        name: "thumbnail",
        width: 320,
        height: 240,
        position: "centre",
      },
    ],
  },
  fields: [
    {
      name: "alt",
      label: "Alt Text",
      type: "text",
    },
  ],
};
