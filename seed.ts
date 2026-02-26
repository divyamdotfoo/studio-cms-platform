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
  ownerName: "Ar. Ujjwal Kapoor",
  ownerRole: "Founder & Principal Architect",
  yearOfEstablishment: 2018,
  headquartersLocation: "Haridwar, Uttarakhand",
};

const SEED_PROJECTS = [
  {
    key: "project-01",
    name: "Arya Residence",
    description:
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
    description:
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
    description:
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

const SEED_SERVICE_ITEMS = [
  {
    key: "service-item-01",
    serviceKey: "service-01",
    slug: "parallel-modular-kitchen",
    name: "Parallel Modular Kitchen",
    description:
      "Dual-counter layout focused on smooth cooking movement and practical storage.",
    componentLayout: "Parallel counter layout",
    componentDimensions: "8x12 ft",
    specialFeatures: [
      { feature: "Soft-close drawer channels" },
      { feature: "Dedicated pantry pull-out unit" },
      { feature: "Quartz countertop edge detailing" },
    ],
    estimatedTime: "3-4 weeks",
    estimatedCost: "INR 2.8L - 4.5L",
    colours: [
      { colour: "Warm White", component: "Upper cabinets" },
      { colour: "Walnut Brown", component: "Base cabinets" },
      { colour: "Grey Stone", component: "Backsplash" },
    ],
  },
  {
    key: "service-item-02",
    serviceKey: "service-01",
    slug: "l-shaped-modular-kitchen",
    name: "L-Shaped Modular Kitchen",
    description:
      "Open kitchen setup that maximizes corners and supports easy workflow.",
    componentLayout: "L-shape corner format",
    componentDimensions: "10x10 ft",
    specialFeatures: [
      { feature: "Tall unit for appliances" },
      { feature: "Task-oriented under-cabinet lighting" },
      { feature: "Ergonomic work triangle planning" },
    ],
    estimatedTime: "3-5 weeks",
    estimatedCost: "INR 3.2L - 5.2L",
    colours: [
      { colour: "Sand Beige", component: "Cabinets" },
      { colour: "Black Galaxy", component: "Countertop" },
      { colour: "Brushed Steel", component: "Handles" },
    ],
  },
  {
    key: "service-item-03",
    serviceKey: "service-02",
    slug: "minimal-living-room",
    name: "Minimal Living Room",
    description:
      "A clutter-free family lounge with balanced furniture and soft layered lighting.",
    componentLayout: "Open central seating",
    componentDimensions: "14x16 ft",
    specialFeatures: [
      { feature: "Accent panel TV wall" },
      { feature: "Concealed cove lighting" },
      { feature: "Integrated storage bench" },
    ],
    estimatedTime: "2-3 weeks",
    estimatedCost: "INR 1.9L - 3.4L",
    colours: [
      { colour: "Soft Greige", component: "Walls" },
      { colour: "Light Taupe", component: "Sofa" },
      { colour: "Bronze", component: "Accents" },
    ],
  },
  {
    key: "service-item-04",
    serviceKey: "service-03",
    slug: "sliding-door-wardrobe",
    name: "Sliding Door Wardrobe",
    description:
      "Space-efficient wardrobe with smooth sliding shutters and loft organization.",
    componentLayout: "Full-height sliding wardrobe",
    componentDimensions: "7x8 ft",
    specialFeatures: [
      { feature: "Soft-closing sliding channels" },
      { feature: "Internal accessory trays" },
      { feature: "Overhead loft sections" },
    ],
    estimatedTime: "10-14 days",
    estimatedCost: "INR 1.3L - 2.4L",
    colours: [
      { colour: "Matte White", component: "Shutters" },
      { colour: "Birch", component: "Interiors" },
      { colour: "Black", component: "Aluminium profile" },
    ],
  },
  {
    key: "service-item-05",
    serviceKey: "service-04",
    slug: "floating-tv-unit",
    name: "Floating TV Unit",
    description:
      "Wall-mounted media setup with concealed wiring and compact storage.",
    componentLayout: "Floating wall-mounted unit",
    componentDimensions: "8x7 ft",
    specialFeatures: [
      { feature: "Backlit wall panel" },
      { feature: "Concealed cable channeling" },
      { feature: "Push-to-open drawers" },
    ],
    estimatedTime: "7-10 days",
    estimatedCost: "INR 70K - 1.5L",
    colours: [
      { colour: "Concrete Grey", component: "Panel" },
      { colour: "Matte White", component: "Console" },
      { colour: "Teak", component: "Accent strip" },
    ],
  },
  {
    key: "service-item-06",
    serviceKey: "service-05",
    slug: "textured-wallpaper",
    name: "Textured Wallpaper",
    description:
      "Feature wall treatment with tactile textures for visual depth and warmth.",
    componentLayout: "Single focal wall",
    componentDimensions: "10x9 ft",
    specialFeatures: [
      { feature: "Washable premium surface" },
      { feature: "Low-VOC installation adhesives" },
      { feature: "Moisture-aware application" },
    ],
    estimatedTime: "2-3 days",
    estimatedCost: "INR 25K - 70K",
    colours: [
      { colour: "Taupe Textured", component: "Feature wall" },
      { colour: "Ivory", component: "Secondary walls" },
      { colour: "Bronze", component: "Trim accents" },
    ],
  },
  {
    key: "service-item-07",
    serviceKey: "service-06",
    slug: "dry-wet-zoning-bathroom",
    name: "Dry-Wet Zoning Bathroom",
    description:
      "Functional bathroom layout with practical partitioning and anti-skid safety.",
    componentLayout: "Linear dry + wet split",
    componentDimensions: "7x8 ft",
    specialFeatures: [
      { feature: "Framed glass partition" },
      { feature: "Wall-hung vanity with storage" },
      { feature: "Concealed flush system" },
    ],
    estimatedTime: "2-3 weeks",
    estimatedCost: "INR 1.7L - 3.4L",
    colours: [
      { colour: "Slate Grey", component: "Floor tiles" },
      { colour: "Off White", component: "Wall tiles" },
      { colour: "Natural Teak", component: "Vanity" },
    ],
  },
];

const SEED_SERVICES = [
  {
    key: "service-01",
    slug: "modular-kitchen-design",
    name: "Modular Kitchen Design",
    description:
      "Smart kitchen planning with efficient layouts and premium modular finishes.",
  },
  {
    key: "service-02",
    slug: "living-room-design",
    name: "Living Room Design",
    description:
      "Comfort-driven living spaces with aesthetic furniture layouts and focal walls.",
  },
  {
    key: "service-03",
    slug: "wardrobe-design",
    name: "Wardrobe Design",
    description:
      "Custom wardrobe systems tailored to bedroom dimensions and storage habits.",
  },
  {
    key: "service-04",
    slug: "tv-unit-design",
    name: "TV Unit Design",
    description:
      "Media walls and TV units designed for both functionality and visual balance.",
  },
  {
    key: "service-05",
    slug: "wallpaper-and-wall-finish",
    name: "Wallpaper & Wall Finish",
    description:
      "Wall styling solutions with textures, murals, and elegant finish combinations.",
  },
  {
    key: "service-06",
    slug: "bathroom-design",
    name: "Bathroom Design",
    description:
      "Modern bathroom solutions with durable finishes and practical space planning.",
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

const SEED_PROJECTS_PAGE = {
  heroHeadlinePartOne: "Every project tells",
  heroHeadlinePartTwo: "a different story",
  heroDescription:
    "From family homes in Haridwar to contemporary villas in Rishikesh — each space is designed around the people who live in it. Browse our work and see the details that make a difference.",
  projectKeys: ["project-01", "project-02", "project-03"],
};

const SEED_ABOUT_PAGE = {
  heroLabel: "The founder",
  heroHeadlinePartOne: "A simple dream —",
  heroHeadlinePartTwo: "to build homes that people truly call their own",
  heroDescription:
    "Armed with an architecture degree since 2018 and a lifelong passion for building homes, Ujjwal started Vision Architect with one clear idea — your home, designed your way.",
  sectionTwoLabel: "The journey",
  sectionTwoHeadline:
    "Design isn't just about appearance — it has to be lived in.",
  sectionTwoDescription: [
    "While others were settling into routine careers, Ujjwal took on his first project — a small house, but an enormous dream. No team, no office. Just a laptop, AutoCAD, and the drive to work past 2 AM every night.",
    "Today, with over 50 projects and 100 happy families behind us, Vision Architect has become a trusted name in Haridwar. What started here has now grown to Rishikesh and the surrounding cities.",
    "But one thing has never changed — the same dedication, the same attention to detail, as on day one. Because for Ujjwal, every home is a responsibility, not just a project.",
  ],
  sectionThreeLabel: "Our approach",
  approachSectionItems: [
    {
      approachItemTitle: "Listen first, design later",
      approachItemDescription:
        "We understand your needs before we pick up a pen. Every home is different because every family is different.",
    },
    {
      approachItemTitle: "Respect for your budget",
      approachItemDescription:
        "It's easy to dream big on paper. Delivering within budget is the hard part — and that's exactly what we do.",
    },
    {
      approachItemTitle: "Delivered on time",
      approachItemDescription:
        "When we commit to a deadline, we mean it. Few things are more frustrating than delays — and we understand that.",
    },
  ],
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

  const serviceItemIdMap = new Map<string, number>();
  const microOfferingIdMap = new Map<string, number>();
  const reviewIdMap = new Map<string, number>();
  const faqIdMap = new Map<string, number>();
  const projectIdMap = new Map<string, number>();

  await clearCollection("service");
  await clearCollection("service-item");
  await clearCollection("project");
  await clearCollection("reviews");
  await clearCollection("faq");
  await clearCollection("micro-offerings");

  for (const item of SEED_SERVICE_ITEMS) {
    const created = await payload.create({
      collection: "service-item",
      data: {
        name: item.name,
        slug: item.slug,
        description: item.description,
        componentLayout: item.componentLayout,
        componentDimensions: item.componentDimensions,
        specialFeatures: item.specialFeatures,
        estimatedTime: item.estimatedTime,
        estimatedCost: item.estimatedCost,
        colours: item.colours,
      },
    });
    serviceItemIdMap.set(item.key, Number(created.id));
  }

  for (const service of SEED_SERVICES) {
    const relatedServiceItems = SEED_SERVICE_ITEMS.filter(
      (item) => item.serviceKey === service.key
    )
      .map((item) => serviceItemIdMap.get(item.key))
      .filter((id): id is number => typeof id === "number");

    await payload.create({
      collection: "service",
      data: {
        name: service.name,
        slug: service.slug,
        description: service.description,
        serviceItems: relatedServiceItems.map((id) => ({
          relationTo: "service-item" as const,
          value: id,
        })),
      },
    });
  }

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
        description: project.description,
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
  const projectsPageProjects = SEED_PROJECTS_PAGE.projectKeys
    .map((key) => projectIdMap.get(key))
    .filter((id): id is number => typeof id === "number");

  const featuredReviewId = reviewIdMap.get(SEED_HOMEPAGE.featuredReviewName);

  await payload.updateGlobal({
    slug: "homepage",
    data: {
      heroHeadlinePartOne: SEED_HOMEPAGE.heroHeadlinePartOne,
      heroHeadlinePartTwo: SEED_HOMEPAGE.heroHeadlinePartTwo,
      heroDescription: SEED_HOMEPAGE.heroDescription,
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

  await payload.updateGlobal({
    slug: "projects-page",
    data: {
      heroHeadlinePartOne: SEED_PROJECTS_PAGE.heroHeadlinePartOne,
      heroHeadlinePartTwo: SEED_PROJECTS_PAGE.heroHeadlinePartTwo,
      heroDescription: SEED_PROJECTS_PAGE.heroDescription,
      projects: projectsPageProjects,
    },
  });

  await payload.updateGlobal({
    slug: "about-page",
    data: {
      heroLabel: SEED_ABOUT_PAGE.heroLabel,
      heroHeadlinePartOne: SEED_ABOUT_PAGE.heroHeadlinePartOne,
      heroHeadlinePartTwo: SEED_ABOUT_PAGE.heroHeadlinePartTwo,
      heroDescription: SEED_ABOUT_PAGE.heroDescription,
      sectionTwoLabel: SEED_ABOUT_PAGE.sectionTwoLabel,
      sectionTwoHeadline: SEED_ABOUT_PAGE.sectionTwoHeadline,
      sectionTwoDescription: SEED_ABOUT_PAGE.sectionTwoDescription.map(
        (journeyItem) => ({
          journeyItem,
        })
      ),
      sectionThreeLabel: SEED_ABOUT_PAGE.sectionThreeLabel,
      approachSectionItems: SEED_ABOUT_PAGE.approachSectionItems,
    },
  });

  payload.logger.info(
    "Seed complete (all target collections, services, and service items reseeded)"
  );
  process.exit(0);
};
