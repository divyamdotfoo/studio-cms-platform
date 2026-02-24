import type { CollectionConfig } from "payload";

export const MicroOfferingsCollection: CollectionConfig = {
  slug: "micro-offerings",
  admin: {
    useAsTitle: "name",
    description:
      "Micro Offerings are the small services that we offer to our clients. They are not part of our main services but are offered as a separate service.",
  },

  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
  ],
};
