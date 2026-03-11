import type { CollectionConfig } from "payload";

export const MediaCollection: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "filename",
    defaultColumns: ["thumbnailURL", "filename", "alt", "updatedAt"],
    components: {
      views: {
        list: {
          Component: {
            path: "@/components/payload/MediaGridListView",
            exportName: "MediaGridListView",
          },
        },
      },
    },
  },
  upload: {
    adminThumbnail: "thumbnail",
    mimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
      "video/mp4",
    ],
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
