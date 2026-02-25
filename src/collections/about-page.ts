import type { GlobalConfig } from "payload";

export const AboutPageCollection: GlobalConfig = {
  slug: "about-page",
  fields: [
    {
      name: "heroLabel",
      label: "Hero Label",
      type: "text",
      required: true,
    },
    {
      name: "heroHeadlinePartOne",
      label: "Hero Headline Part One",
      type: "text",
      required: true,
    },
    {
      name: "heroHeadlinePartTwo",
      label: "Hero Headline Part Two",
      type: "text",
    },
    {
      name: "heroDescription",
      label: "Hero Description",
      type: "textarea",
      required: true,
    },
    {
      name: "sectionTwoLabel",
      label: "Section Two Label",
      type: "text",
      required: true,
    },
    {
      name: "sectionTwoHeadline",
      label: "Section Two Headline",
      type: "text",
      required: true,
    },
    {
      name: "sectionTwoDescription",
      label: "Section Two Description",
      type: "array",
      required: true,
      fields: [
        {
          name: "journeyItem",
          label: "Journey Item",
          type: "text",
          required: true,
        },
      ],
      maxRows: 5,
      minRows: 3,
    },
    {
      name: "sectionThreeLabel",
      label: "Section Three Label",
      type: "text",
      required: true,
    },
    {
      name: "approachSectionItems",
      label: "Approach Section Items",
      type: "array",
      required: true,
      fields: [
        {
          name: "approachItemTitle",
          label: "Approach Item Title",
          type: "text",
          required: true,
        },
        {
          name: "approachItemDescription",
          label: "Approach Item Description",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
};
