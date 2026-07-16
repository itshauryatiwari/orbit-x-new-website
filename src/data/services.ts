import { Code2, Megaphone, Palette, Video } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ServiceSlug =
  | "web-development"
  | "social-media-management"
  | "graphic-design"
  | "video-editing";

export interface Service {
  slug: ServiceSlug;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  flagship?: boolean;
  problem: string;
  solution: string;
  benefits: string[];
  deliverables: string[];
  process: string[];
  faqs: { q: string; a: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    short: "Fast, modern websites that convert visitors into customers.",
    description:
      "Landing pages, business sites, portfolios, and e-commerce built for speed, SEO and conversions.",
    icon: Code2,
    flagship: true,
    problem:
      "Most small business websites are slow, generic, and don't turn traffic into leads.",
    solution:
      "We design and build fast, SEO-ready, mobile-first websites tailored to how your customers actually buy.",
    benefits: [
      "Higher lead conversion",
      "Faster load times",
      "Better search rankings",
      "Ownership of your platform",
      "Scales as you grow",
    ],
    deliverables: [
      "Custom design system",
      "Responsive development",
      "On-page SEO setup",
      "Contact & lead forms",
      "WhatsApp integration",
      "Analytics setup",
    ],
    process: ["Discovery", "Strategy", "Design", "Development", "Launch"],
    faqs: [
      {
        q: "How long does a website take?",
        a: "Landing pages take 1–2 weeks. Business sites take 3–5 weeks. Custom builds are scoped after discovery.",
      },
      {
        q: "Do I own the website?",
        a: "Yes. You get full ownership of the code, content and hosting account.",
      },
    ],
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    short: "Content strategy and daily social that grows your audience.",
    description:
      "Instagram, LinkedIn and short-form content planning, posting and community management.",
    icon: Megaphone,
    problem:
      "Posting inconsistently and without a strategy makes social feel like busywork with no return.",
    solution:
      "A monthly content plan tied to your business goals, executed on schedule with clear performance reporting.",
    benefits: [
      "Consistent brand presence",
      "Audience growth",
      "Higher engagement",
      "More qualified DMs & leads",
    ],
    deliverables: [
      "Monthly content calendar",
      "Feed & story designs",
      "Reels scripting & editing",
      "Captions & hashtags",
      "Performance report",
    ],
    process: ["Audit", "Strategy", "Content", "Publish", "Report"],
    faqs: [
      {
        q: "Which platforms do you cover?",
        a: "Primarily Instagram and LinkedIn. YouTube Shorts and Facebook can be added on request.",
      },
    ],
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    short: "Brand-consistent creatives that make your business look premium.",
    description:
      "Logos, social creatives, ad graphics, brochures and pitch decks that feel intentional.",
    icon: Palette,
    problem:
      "Inconsistent visuals make small businesses look amateur — even when the work is great.",
    solution:
      "A tight visual system and on-brand creative delivered fast, so every touchpoint feels premium.",
    benefits: [
      "Cohesive brand look",
      "Trust from first impression",
      "Faster campaign turnaround",
      "Ad-ready creatives",
    ],
    deliverables: [
      "Logo & brand kit",
      "Social post templates",
      "Ad creatives",
      "Brochures & flyers",
      "Pitch decks",
    ],
    process: ["Brief", "Concepts", "Refine", "Deliver", "Iterate"],
    faqs: [
      {
        q: "How many revisions?",
        a: "Two rounds of revisions per deliverable are standard, more can be added.",
      },
    ],
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    short: "Reels, shorts and brand videos that stop the scroll.",
    description:
      "Short-form reels, testimonial edits, product videos and long-form YouTube edits.",
    icon: Video,
    problem:
      "Great footage often stays on the phone because editing feels overwhelming.",
    solution:
      "Send raw clips — get back polished, on-brand edits ready to publish with captions and hooks.",
    benefits: [
      "More reach on short-form",
      "Professional finish",
      "Consistent posting cadence",
      "Higher watch time",
    ],
    deliverables: [
      "Reels & shorts",
      "Long-form edits",
      "Motion graphics",
      "Subtitles & captions",
      "Thumbnails",
    ],
    process: ["Brief", "Rough cut", "Feedback", "Final cut", "Delivery"],
    faqs: [
      {
        q: "How do I send footage?",
        a: "Upload to a shared drive we create for you. We handle the rest.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
