export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  readingTime: string;
}

export const posts: BlogPost[] = [
  {
    slug: "vastu-meets-modern-design",
    title: "Vastu Meets Modern Design",
    description:
      "How to honour Vastu Shastra principles without compromising on contemporary aesthetics. A practical guide for North Indian homeowners.",
    coverImage:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80",
    readingTime: "5 min read",
  },
  {
    slug: "the-art-of-modern-architecture",
    title: "The Art of Modern Architecture",
    description:
      "Exploring the principles that shape contemporary architectural design, from materiality and light to the dialogue between built form and landscape.",
    coverImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    readingTime: "4 min read",
  },
];
