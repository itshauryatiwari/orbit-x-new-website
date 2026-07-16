export interface Project {
  slug: string;
  title: string;
  category: "Web Development" | "Graphic Design" | "Video Editing";
  summary: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "aurora-coaching",
    title: "Aurora Coaching Website",
    category: "Web Development",
    summary:
      "A conversion-focused site for a life coach — clear positioning, testimonial engine and integrated WhatsApp booking.",
    tags: ["Landing page", "SEO", "WhatsApp"],
  },
  {
    slug: "meridian-consulting",
    title: "Meridian Consulting",
    category: "Web Development",
    summary:
      "Business website for a boutique consulting firm with services, case studies and inquiry funnel.",
    tags: ["Business site", "Case studies"],
  },
  {
    slug: "brand-graphics-vol-1",
    title: "Brand Graphics — Volume 1",
    category: "Graphic Design",
    summary:
      "A curated set of the strongest brand creatives across social, ads and print for our early clients.",
    tags: ["Social", "Ads", "Brand"],
  },
  {
    slug: "reels-collection",
    title: "Reels Collection",
    category: "Video Editing",
    summary:
      "Selected short-form reels edited for coaches and D2C brands — hooks, motion titles, and captions.",
    tags: ["Reels", "Short-form"],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
