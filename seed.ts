import payload, { type SanitizedConfig } from "payload";

const SEED_META = {
  phone: "tel:+917668761558",
  whatsapp: "https://wa.me/917668761558",
  email: "mailto:visionarchitect29@gmail.com",
  insta: "https://www.instagram.com/vision_architect_/",
  youtube: "https://www.youtube.com/@visionarchitect3537",
  tagline_footer: "From concept to creation.",
  instaFollowers: "10k+",
  youtubeSubscribers: "3k+",
};

const SEED_PROJECTS = [
  {
    key: "project-01",
    name: "Arya Residence",
    descriptionShort:
      "A modern family home that blends warmth with style. Every room is thoughtfully designed — from the living room to the kitchen, everything is tailored to your lifestyle.",
    descriptionLong:
      "A modern family home that blends warmth with style. Every room is thoughtfully designed — from the living room to the kitchen, everything is tailored to your lifestyle.",
    features: [
      { feature: "Vastu-compliant floor plan with east-facing entrance" },
      { feature: "Open-plan living and dining with double-height ceiling" },
      { feature: "Modular kitchen with dedicated pantry storage" },
      { feature: "Cross-ventilation optimised for Haridwar's humid summers" },
      { feature: "Private terrace garden with Shivalik hill views" },
      { feature: "Dedicated puja room with natural marble flooring" },
    ],
    area: "2,400 sq.ft",
    timeline: "8 months",
    type: "residential" as const,
    location: "Haridwar",
  },
  {
    key: "project-02",
    name: "Nanda Villa",
    descriptionShort:
      "A spacious villa with contemporary design and a traditional touch. Double-height living areas, an open courtyard, and greenery visible from every angle.",
    descriptionLong:
      "A spacious villa with contemporary design and a traditional touch. Double-height living areas, an open courtyard, and greenery visible from every angle.",
    features: [
      { feature: "Double-height living area with floor-to-ceiling glazing" },
      {
        feature: "Central open courtyard integrating indoor and outdoor spaces",
      },
      { feature: "Locally sourced stone and timber facade" },
      { feature: "Rainwater harvesting and passive cooling systems" },
      { feature: "Landscaped garden visible from every room" },
      { feature: "Separate guest wing with independent access" },
    ],
    area: "3,100 sq.ft",
    timeline: "14 months",
    type: "residential" as const,
    location: "Rishikesh",
  },
  {
    key: "project-03",
    name: "Kapoor House",
    descriptionShort:
      "Compact yet elegant — designed for a young couple. Smart storage, clean lines, and plenty of natural light. A small home with a big feel.",
    descriptionLong:
      "Compact yet elegant — designed for a young couple. Smart storage, clean lines, and plenty of natural light. A small home with a big feel.",
    features: [
      { feature: "Space-efficient layout maximising every square foot" },
      { feature: "Built-in smart storage across all rooms" },
      { feature: "Floor-to-ceiling windows for abundant natural light" },
      { feature: "Minimalist clean-line interiors with warm wood tones" },
      { feature: "Compact home office nook with integrated shelving" },
      { feature: "Low-maintenance materials suited to the local climate" },
    ],
    area: "1,850 sq.ft",
    timeline: "6 months",
    type: "residential" as const,
    location: "Haridwar",
  },
];

const SEED_MICRO_OFFERINGS = [
  "Floor Planning",
  "3D Visualization",
  "Construction Drawings",
  "Vastu Consultation",
  "Space Planning",
  "Brand-Aligned Interiors",
  "Lighting Design",
  "Furniture Layout",
  "Material Selection",
  "Custom Furniture",
  "Color Consultation",
  "Decor Styling",
  "Site Analysis",
  "Budget Planning",
  "Regulatory Guidance",
  "Project Timeline",
];

const SEED_REVIEWS = [
  {
    name: "Gagandeep Singh",
    content:
      "One of the best Architecture firm in Haridwar, quality experience and dedication toward the work is key factor of this firm. Must try it.",
  },
  {
    name: "Nitish Bhardwaj",
    content:
      "Best person in nature, great knowledge of designing. I have designed my shop from this firm — best experience I have ever received.",
  },
  {
    name: "Neeraj Rajput",
    content:
      "One of the best firm with good attitude and work experience. Must try it.",
  },
  {
    name: "Saumya Gupta",
    content: "He is very professional in his work and quality is up to date.",
  },
  {
    name: "Deepak Sharma",
    content: "His work and design is very good and very super friendly person.",
  },
  {
    name: "Shivansh Bajaj",
    content: "Best in town.",
  },
];

const SEED_FAQ = [
  {
    question: "How much does it cost to build a house in Haridwar?",
    answer:
      "Construction costs in Haridwar typically range from ₹1,600 to ₹2,800 per sq.ft depending on the design complexity, materials, and finishes you choose. We always begin with a transparent budget discussion so there are no surprises later. Costs vary based on site conditions and specifications — reach out and we'll give you an honest estimate.",
  },
  {
    question: "Do you follow Vastu principles in your designs?",
    answer:
      "Absolutely. Most families in Haridwar and Rishikesh feel strongly about Vastu, and we respect that. We integrate Vastu-compliant layouts — entrance direction, puja room placement, kitchen positioning — right from the initial floor plan, without compromising on modern aesthetics or functionality.",
  },
  {
    question: "Can you design homes for hilly or sloped terrain?",
    answer:
      "Yes — hill construction is part of what makes designing in Uttarakhand unique. We have experience working with sloped sites in Rishikesh and surrounding areas. Our designs account for soil conditions, drainage, retaining walls, and the natural contour of the land to create homes that sit naturally in the landscape.",
  },
  {
    question: "How long does a typical home project take?",
    answer:
      "A standard residential project usually takes 6–14 months from initial design to handover, depending on the size and complexity. The design phase itself is typically 4–6 weeks. We provide a clear timeline at the start and keep you updated at every stage.",
  },
  {
    question: "Do you handle construction or only design?",
    answer:
      "We offer both. While our core strength is architectural design and planning, we also provide end-to-end project execution — from construction supervision to material sourcing — so you have a single point of contact throughout the entire build.",
  },
  {
    question: "Which areas in Uttarakhand do you serve?",
    answer:
      "We're based in Haridwar and actively work across Rishikesh, Dehradun, and the surrounding towns in Uttarakhand. Whether your site is in the city or tucked into the hills, we're happy to visit and assess it in person.",
  },
];

const SEED_HOMEPAGE = {
  heroHeadlinePartOne: "DESIGNING SPACES,",
  heroHeadlinePartTwo: "INSPIRE LIVES",
  heroDescription:
    "We design spaces that feel like home the moment you walk in. Whether it's a residence, a cafe, or any place in between — every project is shaped to match the vision you had in mind.",
  heroLocation: "Haridwar, Uttarakhand",
  featuredProjectsSectionLabel: "Featured Work",
  featuredProjectsSectionHeadlinePartOne: "Our work speaks",
  featuredProjectsSectionHeadlinePartTwo: "for itself",
  featuredProjectKeys: ["project-01", "project-02", "project-03"],
  servicesSectionLabel: "What we do",
  servicesSectionHeadlinePartOne: "Behind every space,",
  servicesSectionHeadlinePartTwo: "there's a vision",
  servicesSectionDescription:
    "Design isn't just about how things look — it's about how they live, how they work, and how they feel. That's why we approach every project with a fresh perspective.",
  servicesSectionStats: [
    { stat: "12+", label: "Years of experience" },
    { stat: "50+", label: "Projects delivered" },
    { stat: "3", label: "Cities served" },
    { stat: "100+", label: "Families who trust us" },
  ],
  servicesSectionList: [
    {
      serviceHeading: "Residential Design",
      serviceDescription:
        "Building a home is more than walls and a roof — it's a reflection of your life. We design every room with your family in mind, paying attention to everything from Vastu to ventilation.",
      serviceDeliverables: [
        "Floor Planning",
        "3D Visualization",
        "Construction Drawings",
        "Vastu Consultation",
      ],
    },
    {
      serviceHeading: "Commercial Spaces",
      serviceDescription:
        "Whether it's a cafe, an office, or a showroom — your space should make people want to come back. We balance functionality and aesthetics so your business can grow.",
      serviceDeliverables: [
        "Space Planning",
        "Brand-Aligned Interiors",
        "Lighting Design",
        "Furniture Layout",
      ],
    },
    {
      serviceHeading: "Interior Design",
      serviceDescription:
        "Bringing interiors to life is what we do best. Furniture, lighting, materials, and colours — everything comes together to tell a story. We make sure that story is yours.",
      serviceDeliverables: [
        "Material Selection",
        "Custom Furniture",
        "Color Consultation",
        "Decor Styling",
      ],
    },
    {
      serviceHeading: "Consultation & Planning",
      serviceDescription:
        "Before any project begins, understanding comes first — what you need, what the budget allows, and what the timeline looks like. We listen first, then lay out a clear roadmap.",
      serviceDeliverables: [
        "Site Analysis",
        "Budget Planning",
        "Regulatory Guidance",
        "Project Timeline",
      ],
    },
  ],
  reviewsSectionLabel: "Reviews",
  reviewsSectionHeadlinePartOne: "Our work,",
  reviewsSectionHeadlinePartTwo: "in their words",
  featuredReviewName: "Gagandeep Singh",
  reviewsItems: [
    "Gagandeep Singh",
    "Nitish Bhardwaj",
    "Neeraj Rajput",
    "Saumya Gupta",
    "Deepak Sharma",
    "Shivansh Bajaj",
  ],
  faqSectionLabel: "Common questions",
  faqSectionHeadlinePartOne: "Questions we",
  faqSectionHeadlinePartTwo: "hear often",
  faqSectionDescription:
    "Building or renovating in Uttarakhand? Here are the answers to the questions families and business owners ask us most.",
  faqSectionItems: [
    "How much does it cost to build a house in Haridwar?",
    "Do you follow Vastu principles in your designs?",
    "Can you design homes for hilly or sloped terrain?",
    "How long does a typical home project take?",
    "Do you handle construction or only design?",
    "Which areas in Uttarakhand do you serve?",
  ],
  socialSectionLabel: "Follow our journey",
  socialSectionHeadlinePartOne: "Our work,",
  socialSectionHeadlinePartTwo: "daily on social",
  socialSectionDescription:
    "From the design process to the final reveal — we share it all. Follow along and see how an idea becomes a home.",
};

const clearCollection = async (collection: string) => {
  await payload.delete({
    collection: collection as never,
    where: {
      id: {
        exists: true,
      },
    },
  });
};

// Script must define a "script" function export that accepts the sanitized config
export const script = async (config: SanitizedConfig) => {
  await payload.init({ config });

  const microOfferingIdMap = new Map<string, number>();
  const reviewIdMap = new Map<string, number>();
  const faqIdMap = new Map<string, number>();
  const projectIdMap = new Map<string, number>();

  await clearCollection("project");
  await clearCollection("reviews");
  await clearCollection("faq");
  await clearCollection("micro-offerings");

  for (const name of SEED_MICRO_OFFERINGS) {
    const created = await payload.create({
      collection: "micro-offerings",
      data: {
        name,
      },
    });
    microOfferingIdMap.set(name, Number(created.id));
  }

  for (const item of SEED_FAQ) {
    const created = await payload.create({
      collection: "faq",
      data: {
        question: item.question,
        answer: item.answer,
      },
    });
    faqIdMap.set(item.question, Number(created.id));
  }

  for (const item of SEED_REVIEWS) {
    const created = await payload.create({
      collection: "reviews",
      data: {
        name: item.name,
        content: item.content,
      },
    });
    reviewIdMap.set(item.name, Number(created.id));
  }

  for (const project of SEED_PROJECTS) {
    const created = await payload.create({
      collection: "project",
      data: {
        name: project.name,
        descriptionShort: project.descriptionShort,
        descriptionLong: project.descriptionLong,
        features: project.features,
        area: project.area,
        timeline: project.timeline,
        type: project.type,
        location: project.location,
      },
    });
    projectIdMap.set(project.key, Number(created.id));
  }

  const featuredProjects = SEED_HOMEPAGE.featuredProjectKeys
    .map((key) => projectIdMap.get(key))
    .filter((id): id is number => typeof id === "number");

  const featuredReviewId = reviewIdMap.get(SEED_HOMEPAGE.featuredReviewName);

  await payload.updateGlobal({
    slug: "homepage",
    data: {
      heroHeadlinePartOne: SEED_HOMEPAGE.heroHeadlinePartOne,
      heroHeadlinePartTwo: SEED_HOMEPAGE.heroHeadlinePartTwo,
      heroDescription: SEED_HOMEPAGE.heroDescription,
      heroLocation: SEED_HOMEPAGE.heroLocation,
      featuredProjectsSectionLabel: SEED_HOMEPAGE.featuredProjectsSectionLabel,
      featuredProjectsSectionHeadlinePartOne:
        SEED_HOMEPAGE.featuredProjectsSectionHeadlinePartOne,
      featuredProjectsSectionHeadlinePartTwo:
        SEED_HOMEPAGE.featuredProjectsSectionHeadlinePartTwo,
      featuredProjects,
      servicesSectionLabel: SEED_HOMEPAGE.servicesSectionLabel,
      servicesSectionHeadlinePartOne:
        SEED_HOMEPAGE.servicesSectionHeadlinePartOne,
      servicesSectionHeadlinePartTwo:
        SEED_HOMEPAGE.servicesSectionHeadlinePartTwo,
      servicesSectionDescription: SEED_HOMEPAGE.servicesSectionDescription,
      servicesSectionStats: [...SEED_HOMEPAGE.servicesSectionStats],
      servicesSectionList: SEED_HOMEPAGE.servicesSectionList.map((item) => ({
        serviceHeading: item.serviceHeading,
        serviceDescription: item.serviceDescription,
        serviceDeliverables: item.serviceDeliverables
          .map((deliverable) => microOfferingIdMap.get(deliverable))
          .filter((id): id is number => typeof id === "number")
          .map((id) => ({
            relationTo: "micro-offerings" as const,
            value: id,
          })),
      })),
      reviewsSectionLabel: SEED_HOMEPAGE.reviewsSectionLabel,
      reviewsSectionHeadlinePartOne:
        SEED_HOMEPAGE.reviewsSectionHeadlinePartOne,
      reviewsSectionHeadlinePartTwo:
        SEED_HOMEPAGE.reviewsSectionHeadlinePartTwo,
      featuredReview: {
        relationTo: "reviews",
        value:
          typeof featuredReviewId === "number"
            ? featuredReviewId
            : Number(Array.from(reviewIdMap.values())[0]),
      },
      reviewsItems: SEED_HOMEPAGE.reviewsItems
        .map((name) => reviewIdMap.get(name))
        .filter((id): id is number => typeof id === "number")
        .map((id) => ({
          relationTo: "reviews" as const,
          value: id,
        })),
      faqSectionLabel: SEED_HOMEPAGE.faqSectionLabel,
      faqSectionHeadlinePartOne: SEED_HOMEPAGE.faqSectionHeadlinePartOne,
      faqSectionHeadlinePartTwo: SEED_HOMEPAGE.faqSectionHeadlinePartTwo,
      faqSectionDescription: SEED_HOMEPAGE.faqSectionDescription,
      faqSectionItems: SEED_HOMEPAGE.faqSectionItems
        .map((question) => faqIdMap.get(question))
        .filter((id): id is number => typeof id === "number")
        .map((id) => ({
          relationTo: "faq" as const,
          value: id,
        })),
      socialSectionLabel: SEED_HOMEPAGE.socialSectionLabel,
      socialSectionHeadlinePartOne: SEED_HOMEPAGE.socialSectionHeadlinePartOne,
      socialSectionHeadlinePartTwo: SEED_HOMEPAGE.socialSectionHeadlinePartTwo,
      socialSectionDescription: SEED_HOMEPAGE.socialSectionDescription,
    },
  });

  await payload.updateGlobal({
    slug: "meta",
    data: SEED_META,
  });

  payload.logger.info(
    "Seed complete (all target collections cleared and reseeded)"
  );
  process.exit(0);
};
