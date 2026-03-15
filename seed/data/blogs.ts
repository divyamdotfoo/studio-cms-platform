export const SEED_BLOGS_PAGE = {
  title: "Blogs",
  description:
    "Starter blog content for architecture and interior studio websites built on this template.",
};

export const SEED_BLOGS = [
  {
    slug: "designing-small-home-interiors",
    title: "Designing Small Home Interiors That Feel Spacious",
    description:
      "Practical planning ideas to make compact homes feel open, functional, and comfortable.",
    coverImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    coverImageAlt: "A compact modern living room with natural light",
    readingTime: "5 min read",
    status: "published" as const,
    publishedAt: "2026-02-10T00:00:00.000Z",
    seo: {
      title: "Designing Small Home Interiors That Feel Spacious",
      description:
        "Practical planning ideas to make compact homes feel open, functional, and comfortable.",
      keywords:
        "small home interior design, compact home planning, interior layout tips",
      openGraphTitle: "Designing Small Home Interiors That Feel Spacious",
      openGraphDescription:
        "Practical planning ideas to make compact homes feel open, functional, and comfortable.",
      twitterTitle: "Designing Small Home Interiors",
      twitterDescription:
        "Tips to make compact homes feel open and practical without adding clutter.",
    },
    content: `A compact home can still feel calm and spacious when layout, storage, and lighting are planned together.

## Start with zones

Define clear zones for living, dining, work, and circulation. Even subtle furniture placement can reduce visual clutter.

## Use layered storage

Combine open shelves for daily-use items with closed storage for everything else. This keeps spaces practical without feeling crowded.

## Maximize natural light

Large openings, light finishes, and reflective surfaces help smaller rooms feel larger and more comfortable through the day.`,
  },
  {
    slug: "choosing-materials-for-hill-climate",
    title: "Choosing Building Materials for Hill and Monsoon Climates",
    description:
      "A simple framework for selecting materials that perform well in humid and rainy conditions.",
    coverImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    coverImageAlt: "Material palette board with stone, wood, and samples",
    readingTime: "6 min read",
    status: "published" as const,
    publishedAt: "2026-02-08T00:00:00.000Z",
    seo: {
      title: "Choosing Building Materials for Hill and Monsoon Climates",
      description:
        "A simple framework for selecting materials that perform well in humid and rainy conditions.",
      keywords:
        "monsoon building materials, hill climate architecture, durable finish selection",
      openGraphTitle:
        "Choosing Building Materials for Hill and Monsoon Climates",
      openGraphDescription:
        "A simple framework for selecting materials that perform well in humid and rainy conditions.",
      twitterTitle: "Material Selection for Hill Climates",
      twitterDescription:
        "How to choose durable materials for rainy and humid environments.",
    },
    content: `Material choices affect durability, maintenance effort, and long-term comfort more than most people expect.

## Prioritize moisture resistance

For external surfaces and wet zones, choose finishes tested for moisture and repeated seasonal exposure.

## Keep maintenance realistic

Select materials that local teams can repair and maintain easily over time.

## Balance look and lifecycle

A finish that looks premium but degrades quickly can increase long-term cost. Compare options on lifecycle, not just first cost.`,
  },
];
