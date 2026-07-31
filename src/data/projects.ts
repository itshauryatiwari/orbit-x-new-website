/**
 * ============================================================================
 * LEGACY COMPATIBILITY ADAPTER — DO NOT ADD PROJECTS HERE
 * ============================================================================
 *
 * `src/data/portfolio.ts` is now the single source of truth for all
 * portfolio content. This file exists only so existing consumers
 * (`WebsitesExperience`, `DesignsExperience`, `ReelsExperience`, and the
 * `/work` and `/work/$slug` routes) keep working unmodified — every value
 * here is *derived* from `PORTFOLIO_ITEMS`, never authored directly.
 *
 * To add a new project, edit `src/data/portfolio.ts` — see the header
 * comment there for the full workflow.
 * ============================================================================
 */
import {
  PORTFOLIO_ITEMS,
  type PortfolioItem,
  type PortfolioType,
} from "@/data/portfolio";

export interface Project {
  slug: string;
  title: string;
  category: "Web Development" | "Graphic Design" | "Video Editing";
  summary: string;
  tags: string[];
  thumbnail?: string;
  video?: string;
}

/** Maps the new taxonomy to the legacy category labels the UI renders. */
const TYPE_TO_LEGACY_CATEGORY: Record<PortfolioType, Project["category"]> = {
  website: "Web Development",
  "graphic-design": "Graphic Design",
  reel: "Video Editing",
};

function toLegacyProject(item: PortfolioItem): Project {
  return {
    slug: item.slug,
    title: item.title,
    category: TYPE_TO_LEGACY_CATEGORY[item.type],
    summary: item.shortDescription,
    tags: item.tags,
    thumbnail: item.thumbnail,
    video: item.video,
  };
}

export const PROJECTS: Project[] = [...PORTFOLIO_ITEMS]
  .sort((a, b) => a.order - b.order)
  .map(toLegacyProject);

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}