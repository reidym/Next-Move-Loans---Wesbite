import { describe, expect, it } from "vitest";
import { buildActiveTopicHubs, getTopicHub, topicHubMatchesArticle } from "../client/src/lib/topicHubs";

const refinancing = { slug: "rate-structure", title: "The rate is not the strategy", summary: "Review what refinancing should improve.", category: "Refinancing", audience: "Homeowner", tags: ["rates", "refinance"] };
const rural = { slug: "acreage", title: "Buying acreage", summary: "Check zoning and access.", category: "Regional & Rural", audience: "Regional mover", tags: ["acreage", "rural"] };

describe("CMS-driven topic hubs", () => {
  it("assigns publish-ready article records to stable decision hubs", () => {
    expect(topicHubMatchesArticle(getTopicHub("refinancing")!, refinancing)).toBe(true);
    expect(topicHubMatchesArticle(getTopicHub("regional-rural")!, rural)).toBe(true);
    expect(topicHubMatchesArticle(getTopicHub("assets")!, rural)).toBe(false);
  });

  it("returns only hubs that currently contain articles and refreshes counts", () => {
    const hubs = buildActiveTopicHubs([refinancing, rural]);
    expect(hubs.map(hub => hub.slug)).toEqual(expect.arrayContaining(["refinancing", "regional-rural"]));
    expect(hubs.find(hub => hub.slug === "refinancing")?.articles).toHaveLength(1);
    expect(hubs.some(hub => hub.slug === "assets")).toBe(false);
  });
});

