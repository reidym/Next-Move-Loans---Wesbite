import { describe, expect, it } from "vitest";
import { isKnownApplicationPath } from "./applicationRoutes";

describe("application route status", () => {
  const sitemapRoutes = ["/", "/services/refinancing", "/learn/published-article", "/learn/topics/refinancing"];

  it("accepts public, CMS-derived, utility and secure admin routes", () => {
    expect(isKnownApplicationPath("/", sitemapRoutes)).toBe(true);
    expect(isKnownApplicationPath("/learn/published-article", sitemapRoutes)).toBe(true);
    expect(isKnownApplicationPath("/privacy", sitemapRoutes)).toBe(true);
    expect(isKnownApplicationPath("/admin/content", sitemapRoutes)).toBe(true);
  });

  it("rejects unknown paths so the SPA recovery page can carry HTTP 404 status", () => {
    expect(isKnownApplicationPath("/not-a-real-route", sitemapRoutes)).toBe(false);
    expect(isKnownApplicationPath("/learn/unpublished-draft", sitemapRoutes)).toBe(false);
  });
});
