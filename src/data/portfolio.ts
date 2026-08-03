/**
 * ============================================================================
 * PORTFOLIO DATA — SINGLE SOURCE OF TRUTH
 * ============================================================================
 *
 * Every piece of portfolio content (websites, graphic designs, reels) is
 * defined here, in `PORTFOLIO_ITEMS`, and nowhere else.
 *
 * TO ADD A NEW PROJECT:
 *   1. Drop its assets into the matching folder under `public/portfolio/`:
 *        public/portfolio/websites/<slug>/thumbnail.jpg
 *        public/portfolio/websites/<slug>/gallery/*.jpg
 *        public/portfolio/graphic-designs/<slug>/thumbnail.jpg
 *        public/portfolio/reels/<slug>/thumbnail.jpg
 *        public/portfolio/reels/<slug>/video.mp4
 *   2. Add one object to the `PORTFOLIO_ITEMS` array below.
 *   3. Nothing else. No component, route, or config changes are required.
 *
 * Everything downstream (`src/data/projects.ts`, the `WebsitesExperience`,
 * `DesignsExperience`, and `ReelsExperience` components, and the `/work`
 * routes) is derived from this file via the helper functions exported here.
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// Core taxonomy
// ----------------------------------------------------------------------------

/**
 * The three portfolio disciplines the site currently supports.
 * Adding a brand-new discipline in the future (e.g. "case-study") only
 * requires extending this union — it does not change the shape of
 * `PortfolioItem` itself.
 */
export type PortfolioType = "website" | "graphic-design" | "reel";

/**
 * Freeform sub-category / discipline label, e.g. "Landing page",
 * "Business site", "Social Ads", "Brand identity", "Short-form".
 * Deliberately typed as `string` (not a union) so new categories never
 * require a structural/type change — just a new string on a new item.
 */
export type PortfolioCategory = string;

// ----------------------------------------------------------------------------
// Future-proofing building blocks
// ----------------------------------------------------------------------------
// These are optional, nested under `metadata`, so none of them are required
// today and none of them can ever break an existing item. New future concepts
// (a new kind of award, a new metric shape, etc.) can be added to
// `PortfolioMetadata` — or even ad-hoc via its index signature — without
// touching `PortfolioItem` or any component that already consumes it.

/** A single supplementary media asset (beyond thumbnail/gallery/video). */
export interface MediaAsset {
    type: "image" | "video" | "embed";
    src: string;
    alt?: string;
    poster?: string;
}

/** A named external link beyond the built-in liveUrl/githubUrl fields. */
export interface ExternalLink {
    label: string;
    url: string;
}

/** A single quantified outcome, e.g. { label: "Conversion rate", value: "+38%" }. */
export interface Metric {
    label: string;
    value: string;
}

export interface Testimonial {
    quote: string;
    author: string;
    role?: string;
    avatar?: string;
}

export interface Award {
    title: string;
    issuer?: string;
    year?: number;
}

export interface CaseStudy {
    challenge?: string;
    solution?: string;
    results?: string;
}

/**
 * Open-ended metadata bag. Everything in here is optional, and the index
 * signature means brand-new future fields can be attached to a project
 * without ever touching this interface or `PortfolioItem`.
 */
export interface PortfolioMetadata {
    caseStudy?: CaseStudy;
    testimonials?: Testimonial[];
    awards?: Award[];
    clientLogo?: string;
    metrics?: Metric[];
    externalLinks?: ExternalLink[];
    media?: MediaAsset[];
    [key: string]: unknown;
}

// ----------------------------------------------------------------------------
// The reusable portfolio item type
// ----------------------------------------------------------------------------

export interface PortfolioItem {
    /** Unique, URL-safe identifier. Used for routing (`/work/$slug`) and keys. */
    slug: string;
    title: string;

    /** Which of the three (or future) disciplines this item belongs to. */
    type: PortfolioType;
    /** Freeform sub-category within that discipline. */
    category: PortfolioCategory;

    /** Show this item in "featured" rails/sections. */
    featured?: boolean;
    /** Ascending sort key. Lower numbers render first within a type. */
    order: number;

    client?: string;
    /** ISO date string, e.g. "2025-03-01". */
    date?: string;

    tags: string[];
    technologies?: string[];

    shortDescription: string;
    longDescription?: string;

    /** Path relative to /public, e.g. "/portfolio/websites/aurora-coaching/thumbnail.jpg". */
    thumbnail?: string;
    /** Additional images, e.g. for lightboxes/case studies. */
    gallery?: string[];
    /** Path or URL to a video file (reels, or a website walkthrough). */
    video?: string;

    websiteUrl?: string;
    githubUrl?: string;

    /** Escape hatch for anything not yet modeled — see `PortfolioMetadata`. */
    metadata?: PortfolioMetadata;
}

// ----------------------------------------------------------------------------
// The single exported array — ALL portfolio content lives here
// ----------------------------------------------------------------------------

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
    {
        slug: "Trikaya-MUN",
        title: "Trikaya MUN",
        type: "website",
        category: "Landing page",
        featured: true,
        order: 1,
        client: "Trikaya MUN",
        date: "2026-6-18",
        tags: ["Landing page", "SEO", "WhatsApp"],
        technologies: ["React", "Tailwind CSS", "Remix"],
        shortDescription:
            "More than a conference — a movement of ideas, voices, and change-makers. Held on United Nations Day.",
        thumbnail: "public/portfolio/websites/Trikaya-MUN/Trikaya-MUN.png",
        gallery: [ "public/portfolio/websites/Trikaya-MUN/Trikaya-MUN.png" ],
        websiteUrl: "https://trikayamun.in",
    },
    {
        slug: "Gplus-Energy-Solution",
        title: "Gplus Energy Solution",
        type: "website",
        category: "Business site",
        order: 2,
        client: "Gplus Energy Solution",
        date: "2024-08-15",
        tags: ["Business site", "Case studies"],
        technologies: ["React", "Tailwind CSS", "Remix"],
        shortDescription:
            "Powering Homes & Businesses with Clean, Reliable Solar Energy",
        thumbnail: "/portfolio/websites/gplus/gplus.png",
        gallery: [],
        websiteUrl: "https://gplusenergysoultion.netlify.app/"
    },
    {
        slug: "Samvaad-MUN",
        title: "Samvaad MUN secretariat form out now",
        type: "graphic-design",
        category: "Graphic Design",
        featured: true,
        order: 1,
        date: "2025-09-01",
        tags: ["Social", "Ads", "Brand"],
        shortDescription:
            "A curated set of the strongest brand creatives across social, announcement instagram post.",
        thumbnail: "public/portfolio/graphic-designs/Tanmay-design/design1.jpeg",
        gallery: ["/portfolio/graphic-designs/Tanmay-design/design1.jpeg"],
    },
    {
        slug: "reels-collection",
        title: "Reels Collection",
        type: "reel",
        category: "Short-form",
        order: 2,
        date: "2024-10-01",
        tags: ["Reels", "Short-form"],
        shortDescription:
            "Selected short-form reels edited for coaches and D2C brands — hooks, motion titles, and captions.",
        thumbnail: "/portfolio/reels/reels-collection/thumbnail.jpg",
        video: "/portfolio/reels/reels-collection/video.mp4",
    },

    {
    slug: "orbitx",
    title: "OrbitX",
    type: "reel",
    category: "reel",
    order: 1,
    tags: ["Reels", "Short-form"],
    shortDescription: "A reel project for OrbitX.",
    thumbnail: "public/portfolio/reels/orbitx-reel/thumbnail.png",
    video: "public/portfolio/reels/orbitx-reel/0630.mp4"
    },

    {
        slug: "Samvaad-MUN",
        title: "Samvaad MUN committees and agendas",
        type: "graphic-design",
        category: "Graphic Design",
        featured: true,
        order: 2,
        date: "2025-09-01",
        tags: ["Social", "Ads", "Brand"],
        shortDescription:
            "A curated set of the strongest brand creatives across social, announcement instagram post.",
        thumbnail: "public/portfolio/graphic-designs/Tanmay-design/design2.jpeg",
        gallery: ["/portfolio/graphic-designs/Tanmay-design/design2.jpeg"],
    },

    {
        slug: "Trikaya-MUN",
        title: "Trikaya MUN committees and agendas",
        type: "graphic-design",
        category: "Graphic Design",
        featured: true,
        order: 3,
        date: "2025-09-01",
        tags: ["Social", "Ads", "Brand"],
        shortDescription:
            "A curated set of the strongest brand creatives across social, announcement instagram post.",
        thumbnail: "public/portfolio/graphic-designs/Tanmay-design/design3.jpeg",
        gallery: ["/portfolio/graphic-designs/Tanmay-design/design3.jpeg"],
    },

    {
        slug: "Renaissance-MUN",
        title: "Renaissance MUN committees and agendas",
        type: "graphic-design",
        category: "Graphic Design",
        featured: true,
        order: 4,
        date: "2025-09-01",
        tags: ["Social", "Ads", "Brand"],
        shortDescription:
            "A curated set of the strongest brand creatives across social, announcement instagram post.",
        thumbnail: "public/portfolio/graphic-designs/Tanmay-design/design4.jpeg",
        gallery: ["/portfolio/graphic-designs/Tanmay-design/design4.jpeg"],
    },
];

// ----------------------------------------------------------------------------
// Helper functions
// ----------------------------------------------------------------------------

/** All items, sorted by `order` ascending (stable for equal orders). */
export function getAllPortfolioItems(): PortfolioItem[] {
    return [...PORTFOLIO_ITEMS].sort((a, b) => a.order - b.order);
}

/** Items of a single discipline (website / graphic-design / reel), sorted by order. */
export function getPortfolioItemsByType(type: PortfolioType): PortfolioItem[] {
    return getAllPortfolioItems().filter((item) => item.type === type);
}

/** Only items flagged `featured: true`, sorted by order. */
export function getFeaturedPortfolioItems(type?: PortfolioType): PortfolioItem[] {
    return getAllPortfolioItems().filter(
        (item) => item.featured && (type === undefined || item.type === type),
    );
}

/** Items matching a given sub-category, e.g. "Landing page". Case-insensitive. */
export function getPortfolioItemsByCategory(
    category: PortfolioCategory,
    type?: PortfolioType,
): PortfolioItem[] {
    const needle = category.toLowerCase();
    return getAllPortfolioItems().filter(
        (item) =>
            item.category.toLowerCase() === needle && (type === undefined || item.type === type),
    );
}

/**
 * Items that contain ANY of the given tags (case-insensitive) by default.
 * Pass `{ matchAll: true }` to require every tag to be present.
 */
export function getPortfolioItemsByTags(
    tags: string[],
    options?: { matchAll?: boolean; type?: PortfolioType },
): PortfolioItem[] {
    const needles = tags.map((t) => t.toLowerCase());
    const matchAll = options?.matchAll ?? false;

    return getAllPortfolioItems().filter((item) => {
        if (options?.type !== undefined && item.type !== options.type) return false;
        const itemTags = item.tags.map((t) => t.toLowerCase());
        return matchAll
            ? needles.every((n) => itemTags.includes(n))
            : needles.some((n) => itemTags.includes(n));
    });
}

/** Single item lookup by slug. */
export function getPortfolioItemBySlug(slug: string): PortfolioItem | undefined {
    return PORTFOLIO_ITEMS.find((item) => item.slug === slug);
}

/** Distinct list of categories in use, optionally scoped to one type. */
export function getPortfolioCategories(type?: PortfolioType): PortfolioCategory[] {
    const items = type ? getPortfolioItemsByType(type) : PORTFOLIO_ITEMS;
    return Array.from(new Set(items.map((item) => item.category)));
}

/** Distinct list of tags in use, optionally scoped to one type. */
export function getPortfolioTags(type?: PortfolioType): string[] {
    const items = type ? getPortfolioItemsByType(type) : PORTFOLIO_ITEMS;
    return Array.from(new Set(items.flatMap((item) => item.tags)));
}

/** Up to `limit` other items of the same type, excluding the given slug. Useful for "More work" rails. */
export function getRelatedPortfolioItems(slug: string, limit = 3): PortfolioItem[] {
    const current = getPortfolioItemBySlug(slug);
    if (!current) return [];
    return getPortfolioItemsByType(current.type)
        .filter((item) => item.slug !== slug)
        .slice(0, limit);
}

