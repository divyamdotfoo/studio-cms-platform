import type { GlobalConfig } from "payload";

export const ProjectsPageCollection: GlobalConfig = {
  slug: "projects-page",
  fields: [
    {
      name: "heroHeadlinePartOne",
      label: "Hero Label",
      type: "text",
      required: true,
    },
    {
      name: "heroHeadlinePartTwo",
      label: "Hero Headline Part Two",
      type: "text",
      required: true,
    },
    {
      name: "heroDescription",
      label: "Hero Description",
      type: "textarea",
      required: true,
    },
    {
      name: "projects",
      type: "relationship",
      label: "Select projects to showcase",
      relationTo: "project",
      hasMany: true,
      required: true,
      minRows: 1,
    },
  ],
};
