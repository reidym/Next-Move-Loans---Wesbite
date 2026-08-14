import type { Express } from "express";
import { locations, services, solutionHubs } from "../client/src/lib/siteData";
import { solutions } from "../client/src/lib/solutionData";
import { buildActiveTopicHubs } from "../client/src/lib/topicHubs";
import { listPublicArticles } from "./cmsDb";

const BASE_URL = "https://nextmoveloans.com.au";

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, character => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[character] ?? character);

type SitemapArticle = Awaited<ReturnType<typeof listPublicArticles>>[number];

export const buildSitemapRoutes = (articles: SitemapArticle[]) => {
  const topicArticles = articles.map(item => ({ slug: item.page.slug, title: item.page.title, summary: item.page.metaDescription ?? item.page.excerpt ?? item.page.title, category: item.article.topic, audience: item.page.eyebrow ?? undefined, tags: item.article.tags ?? [] }));
  const routes: string[] = [
    "/", "/approval-method", "/about", "/team", "/team/martin-reidy", "/reviews", "/contact", "/plan-your-next-move", "/book-a-call", "/loan-types", "/learn", "/locations",
    ...solutionHubs.map(item => item.path),
    ...solutions.map(item => `/solutions/${item.slug}`),
    "/finance/home-property", "/finance/investment", "/finance/business-commercial", "/finance/asset",
    ...services.map(item => `/services/${item.slug}`),
    ...locations.map(item => `/locations/${item.slug}`),
    ...articles.map(item => `/learn/${item.page.slug}`),
    ...buildActiveTopicHubs(topicArticles).map(hub => `/learn/topics/${hub.slug}`),
  ];
  return Array.from(new Set<string>(routes)).sort((left, right) => left === "/" ? -1 : right === "/" ? 1 : left.localeCompare(right));
};

export function registerSitemap(app: Express) {
  app.get("/sitemap.xml", async (_req, res) => {
    try {
      const articles = await listPublicArticles();
      const unique = buildSitemapRoutes(articles);
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${unique.map(path => `  <url><loc>${escapeXml(`${BASE_URL}${path}`)}</loc></url>`).join("\n")}\n</urlset>\n`;
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=3600");
      res.send(xml);
    } catch (error) {
      console.error("[Sitemap]", error);
      res.status(500).type("text/plain").send("Sitemap temporarily unavailable.");
    }
  });
}
