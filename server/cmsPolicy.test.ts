import { describe, expect, it } from "vitest";
import { isPublicAt, isSitemapEligible } from "./cmsPolicy";

const now = new Date("2026-08-13T00:00:00.000Z");

describe("CMS publication policy", () => {
  it("keeps drafts and future scheduled pages private", () => {
    expect(isPublicAt({ status: "draft" }, now)).toBe(false);
    expect(isPublicAt({ status: "scheduled", publishAt: new Date("2026-08-14T00:00:00.000Z") }, now)).toBe(false);
  });

  it("makes published and elapsed scheduled pages public", () => {
    expect(isPublicAt({ status: "published" }, now)).toBe(true);
    expect(isPublicAt({ status: "scheduled", publishAt: new Date("2026-08-12T00:00:00.000Z") }, now)).toBe(true);
  });

  it("includes only public indexable records in the sitemap", () => {
    expect(isSitemapEligible({ status: "published", indexable: true }, now)).toBe(true);
    expect(isSitemapEligible({ status: "published", indexable: false }, now)).toBe(false);
    expect(isSitemapEligible({ status: "draft", indexable: true }, now)).toBe(false);
    expect(isSitemapEligible({ status: "unpublished", indexable: true }, now)).toBe(false);
    expect(isSitemapEligible({ status: "scheduled", publishAt: new Date("2026-08-14T00:00:00.000Z"), indexable: true }, now)).toBe(false);
    expect(isSitemapEligible({ status: "scheduled", publishAt: new Date("2026-08-12T00:00:00.000Z"), indexable: true }, now)).toBe(true);
  });
});
