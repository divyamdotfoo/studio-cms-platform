import type { CollectionConfig } from "payload";

export const FaqCollection: CollectionConfig = {
  slug: "faq",
  fields: [
    {
      name: "question",
      label: "Question",
      type: "textarea",
      required: true,
    },
    {
      name: "answer",
      label: "Answer",
      type: "textarea",
      required: true,
    },
  ],
};
