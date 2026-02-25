import type { CollectionConfig } from "payload";

export const AdminCollection: CollectionConfig = {
  slug: "admin",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
  auth: true,
};
