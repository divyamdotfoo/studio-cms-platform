export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  readingTime: string;
}

export const posts: BlogPost[] = [
  {
    slug: "cafe-design-ideas-rishikesh",
    title: "5 Cafe Design Ideas That Work in Rishikesh's Spiritual Vibe",
    description:
      "Discover cafe design ideas for Rishikesh that blend spiritual ambiance with modern functionality — from open-air Ganga-view decks to sustainable material palettes.",
    coverImage:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    readingTime: "6 min read",
  },
  {
    slug: "monsoon-proof-home-construction-uttarakhand",
    title:
      "Monsoon-Proof Your Home: Construction Tips for Rishikesh & Haridwar",
    description:
      "Practical monsoon-proof construction tips for homeowners in Uttarakhand. From roof design and wall treatment to drainage and ventilation strategies.",
    coverImage:
      "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800&q=80",
    readingTime: "7 min read",
  },
  {
    slug: "traditional-pahadi-architecture-bringing-heritage-into-modern-homes",
    title:
      "Traditional Pahadi Architecture: Bringing Heritage Into Modern Homes",
    description:
      "How traditional Uttarakhand architecture — stone walls, carved jharokhas, and sloped roofs — inspires modern home design in Haridwar, Rishikesh, and Dehradun.",
    coverImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    readingTime: "6 min read",
  },
  {
    slug: "vastu-meets-modern-design",
    title: "Vastu Meets Modern Design",
    description:
      "How to honour Vastu Shastra principles without compromising on contemporary aesthetics. A practical guide for homeowners in Haridwar, Rishikesh, and Dehradun.",
    coverImage:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80",
    readingTime: "5 min read",
  },
  {
    slug: "the-art-of-modern-architecture",
    title: "The Art of Modern Mountain Home Architecture in Uttarakhand",
    description:
      "How modern architecture in Uttarakhand blends materiality, light, and landscape — design insights from Vision Architect in Haridwar.",
    coverImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    readingTime: "4 min read",
  },
];
