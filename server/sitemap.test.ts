import { describe, expect, it } from "vitest";
import { buildSitemapRoutes } from "./sitemap";

const cmsArticle = (slug: string, topic: string, tags: string[]) => ({
  page: { id: 1, slug, pageType: "article" as const, title: slug, eyebrow: topic, excerpt: null, heroMediaId: null, bodyJson: null, seoTitle: slug, metaDescription: `${topic} decision guidance`, canonicalUrl: null, indexable: true, status: "published" as const, publishAt: new Date("2026-08-12T00:00:00.000Z"), createdAt: new Date(), updatedAt: new Date() },
  article: { id: 1, pageId: 1, authorBrokerId: null, topic, tags, readMinutes: 4, sourceNotes: null, verificationStatus: "verified" as const, createdAt: new Date(), updatedAt: new Date() },
  author: null,
  featuredMedia: null,
});

describe("dynamic sitemap route composition", () => {
  it("adds publish-ready CMS articles and their active topic hubs", () => {
    const routes = buildSitemapRoutes([cmsArticle("rate-structure", "Refinancing", ["rates", "refinance"])]);
    expect(routes).toContain("/learn/rate-structure");
    expect(routes).toContain("/learn/topics/refinancing");
    expect(routes).not.toContain("/learn/topics/assets");
  });

  it("contains refined stable routes and excludes obsolete shire paths", () => {
    const routes = buildSitemapRoutes([]);
    expect(routes).toContain("/solutions/buying-your-next-home");
    expect(routes).toContain("/locations/warragul");
    expect(routes).not.toContain("/locations/south-gippsland");
  });
});

