import type { ArticleData } from "@/lib/articleLibrary";
import { applyArticleVoiceToMany } from "@/lib/articleVoice";
import { ensureAspirationalDepthForMany } from "@/lib/articleAspirationalDepth";

export type CmsArticleRow = {
  page: { slug: string; title: string; eyebrow: string | null; excerpt: string | null; sections: Array<Record<string, unknown>>; publishAt: Date | string | null; updatedAt: Date | string; ctaKey: string | null };
  article: { topic: string; tags: string[]; publicationDate: Date | string | null; contentUpdatedDate: Date | string | null; sourceNotes: string | null };
  author: { fullName: string } | null;
};

const iso = (value: Date | string | null | undefined) => value ? new Date(value).toISOString() : undefined;

export function cmsArticleToArticleData(row: CmsArticleRow): ArticleData & { authorName: string } {
  const sections = row.page.sections.flatMap(section => {
    const heading = typeof section.heading === "string" ? section.heading.trim() : "";
    const body = typeof section.body === "string" ? section.body.trim() : "";
    return heading && body ? [{ heading, body }] : [];
  });
  const relatedService = row.page.ctaKey?.startsWith("service:") ? row.page.ctaKey.slice(8) : "home-loans";
  const words = sections.reduce((total, section) => total + section.heading.split(/\s+/).length + section.body.split(/\s+/).length, (row.page.excerpt ?? "").split(/\s+/).length);
  return {
    slug: row.page.slug,
    title: row.page.title,
    category: row.article.topic,
    summary: row.page.excerpt ?? "A useful perspective for the decision before the application.",
    relatedService,
    sections,
    audience: row.page.eyebrow ?? undefined,
    decision: row.page.eyebrow ?? undefined,
    tags: row.article.tags,
    readMinutes: Math.max(4, Math.ceil(words / 210)),
    publishedAt: iso(row.article.publicationDate ?? row.page.publishAt),
    updatedAt: iso(row.article.contentUpdatedDate ?? row.page.updatedAt),
    sourceNote: row.article.sourceNotes ?? undefined,
    authorName: row.author?.fullName ?? "Martin Reidy",
  };
}

const finishArticles = (items: ArticleData[]) => ensureAspirationalDepthForMany(applyArticleVoiceToMany(items));

export function mergeCmsArticles(staticArticles: ArticleData[], cmsRows: CmsArticleRow[] | undefined) {
  if (!cmsRows?.length) return finishArticles(staticArticles).map(article => ({ ...article, authorName: "Martin Reidy" }));
  const cmsArticles = cmsRows.map(cmsArticleToArticleData);
  const cmsSlugs = new Set(cmsArticles.map(article => article.slug));
  const merged = [...cmsArticles, ...staticArticles.filter(article => !cmsSlugs.has(article.slug)).map(article => ({ ...article, authorName: "Martin Reidy" }))];
  return finishArticles(merged);
}
