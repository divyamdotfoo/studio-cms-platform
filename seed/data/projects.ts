export const SEED_PROJECTS = [
  {
    key: "project-01",
    name: "Riverview Residence",
    description:
      "A family home designed around daylight, ventilation, and flexible common spaces.",
    features: [
      { feature: "Vastu-aware entrance planning" },
      { feature: "Open living and dining with visual continuity" },
      { feature: "Dedicated puja and study nooks" },
      { feature: "Cross-ventilation tuned for humid months" },
    ],
    area: "2,300 sq.ft",
    timeline: "8 months",
    type: "residential" as const,
    location: "Haridwar",
    imageKeys: ["one", "two", "three", "four"],
  },
  {
    key: "project-02",
    name: "Hillside Courtyard Villa",
    description:
      "A modern villa that blends local materials with a courtyard-centered circulation plan.",
    features: [
      { feature: "Central courtyard for light and airflow" },
      { feature: "Stone and timber facade language" },
      { feature: "Rainwater harvesting system" },
      { feature: "Guest suite with independent access" },
    ],
    area: "3,000 sq.ft",
    timeline: "12 months",
    type: "residential" as const,
    location: "Rishikesh",
    imageKeys: ["one", "two", "three", "four"],
  },
  {
    key: "project-03",
    name: "Compact Urban House",
    description:
      "A compact layout with efficient storage and warm minimal interiors for a young household.",
    features: [
      { feature: "Space-optimized room planning" },
      { feature: "Integrated storage in all key zones" },
      { feature: "Large openings for natural light" },
      { feature: "Low-maintenance finish palette" },
    ],
    area: "1,800 sq.ft",
    timeline: "6 months",
    type: "residential" as const,
    location: "Dehradun",
    imageKeys: ["one", "two", "three", "four"],
  },
];
