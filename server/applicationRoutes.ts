import type { NextFunction, Request, Response } from "express";
import { listPublicArticles } from "./cmsDb";
import { buildSitemapRoutes } from "./sitemap";

const extraApplicationRoutes = new Set([
  "/404",
  "/privacy",
  "/important-information",
  "/credit-guide",
  "/accessibility",
  "/calculators",
  "/admin",
  "/admin/content",
  "/admin/brokers",
  "/admin/reviews",
  "/admin/awards",
  "/admin/blocks",
  "/admin/media",
  "/admin/settings",
  "/admin/leads",
  "/admin/export",
]);

let cachedRoutes: Set<string> | undefined;
let cacheExpiresAt = 0;

export function isKnownApplicationPath(pathname: string, sitemapRoutes: string[]) {
  return extraApplicationRoutes.has(pathname) || sitemapRoutes.includes(pathname);
}

async function getApplicationRoutes() {
  const now = Date.now();
  if (cachedRoutes && now < cacheExpiresAt) return cachedRoutes;
  const articles = await listPublicArticles();
  cachedRoutes = new Set(buildSitemapRoutes(articles));
  cacheExpiresAt = now + 60_000;
  return cachedRoutes;
}

export async function markUnknownApplicationRoutes(req: Request, res: Response, next: NextFunction) {
  if (!['GET', 'HEAD'].includes(req.method) || !req.accepts('html') || req.path.startsWith('/api/') || req.path.includes('.')) return next();
  try {
    const sitemapRoutes = Array.from(await getApplicationRoutes());
    if (!isKnownApplicationPath(req.path, sitemapRoutes)) res.status(404);
  } catch (error) {
    console.error('[Application routes]', error);
  }
  next();
}
