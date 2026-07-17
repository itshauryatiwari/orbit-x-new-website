export interface Package {
  name: string;
  tagline: string;
  price: string;
  priceNote?: string;
  features: string[];
  featured?: boolean;
}

export interface PackageGroup {
  title: string;
  slug: string;
  packages: Package[];
}

export const SERVICE_PACKAGES: PackageGroup[] = [
  {
    title: "Web Development",
    slug: "web-development",
    packages: [
      {
        name: "Launch",
        tagline: "One-page site to go live fast.",
        price: "₹3,000",
        features: [
          "Up to 1 page (landing)",
          "Mobile-first responsive",
          "Contact form + WhatsApp",
          "Basic on-page SEO",
          "1 round of revisions",
        ],
      },
      {
        name: "Growth",
        tagline: "For serious small businesses.",
        price: "₹7,000",
        featured: true,
        features: [
          "Up to 5 pages",
          "Custom design system",
          "SEO setup + Analytics",
          "Content collaboration",
          "2 rounds of revisions",
        ],
      },
      {
        name: "Premium",
        tagline: "Scaled sites, CMS, integrations.",
        price: "From ₹15,000",
        features: [
          "8+ pages / CMS",
          "Custom integrations",
          "Advanced SEO",
          "Performance-tuned",
          "Priority support",
        ],
      },
    ],
  },
  {
    title: "Social Media",
    slug: "social-media",
    packages: [
      {
        name: "Starter",
        tagline: "For new brands finding their voice.",
        price: "₹5,000/mo",
        features: ["8 posts / month", "1 reel / week", "Captions & hashtags", "Monthly report"],
      },
      {
        name: "Growth",
        tagline: "Consistent presence and momentum.",
        price: "₹10,000/mo",
        featured: true,
        features: ["16 posts / month", "2 reels / week", "Content strategy", "Community replies"],
      },
      {
        name: "Premium",
        tagline: "Full-service, multi-platform.",
        price: "₹20,000/mo",
        features: ["Daily posting", "4 reels / week", "Multi-platform", "Dedicated manager"],
      },
    ],
  },
  {
    title: "Graphic Design",
    slug: "graphic-design",
    packages: [
      {
        name: "Starter",
        tagline: "On-demand creatives.",
        price: "₹5,000/mo",
        features: ["10 designs / month", "2-day turnaround", "Source files"],
      },
      {
        name: "Business",
        tagline: "For active brands.",
        price: "₹10,000/mo",
        featured: true,
        features: ["25 designs / month", "24h turnaround", "Ad creatives", "Brand system"],
      },
      {
        name: "Premium",
        tagline: "Unlimited creative support.",
        price: "₹20,000/mo",
        features: ["Unlimited requests", "Same-day priority", "Motion graphics"],
      },
    ],
  },
  {
    title: "Video Editing",
    slug: "video-editing",
    packages: [
      {
        name: "Starter",
        tagline: "Short-form starter pack.",
        price: "₹8,000/mo",
        features: ["8 reels / month", "Captions", "1 round revisions"],
      },
      {
        name: "Creator",
        tagline: "For creators & founders.",
        price: "₹16,000/mo",
        featured: true,
        features: ["16 reels / month", "Motion graphics", "Thumbnails", "2 revisions"],
      },
      {
        name: "Premium",
        tagline: "Full video production support.",
        price: "₹25,000/mo",
        features: ["Unlimited short-form", "Long-form edits", "Priority delivery"],
      },
    ],
  },
];

export const BUNDLES: Package[] = [
  {
    name: "Brand Starter",
    tagline: "Graphics + Social",
    price: "₹20,000/mo",
    features: [
      "16 posts / month",
      "20 designs / month",
      "Content calendar",
      "Monthly performance report",
    ],
  },
  {
    name: "Growth Accelerator",
    tagline: "Graphics + Social + Video",
    price: "₹30,000/mo",
    featured: true,
    features: [
      "20 posts / month",
      "25 designs / month",
      "12 reels / month",
      "Strategy + reporting",
    ],
  },
  {
    name: "Complete Digital Presence",
    tagline: "Website + Social + Graphics + Video",
    price: "From ₹40,000",
    features: [
      "Full website build",
      "Ongoing social + design",
      "Monthly video edits",
      "Dedicated account manager",
    ],
  },
];
