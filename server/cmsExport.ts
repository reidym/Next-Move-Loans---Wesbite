type MediaLike = { id: number; publicUrl: string; storageKey: string | null } & Record<string, unknown>;
type PageLike = { id: number; slug: string; title: string; ogImageUrl: string | null; sections: Array<Record<string, unknown>> };
type ArticleLike = { id: number; pageId: number; featuredMediaId: number | null };
type BrokerLike = { id: number; pageId: number; fullName: string; profileMediaId: number | null };
type AwardLike = { id: number; mediaId: number | null; awardName: string; category: string; year: number };

export type MediaUsage = {
  entityType: "page" | "article" | "broker" | "award";
  entityId: number;
  pageId?: number;
  slug?: string;
  label: string;
  field: string;
};

export function buildMediaManifest(mediaRows: MediaLike[], pageRows: PageLike[], articleRows: ArticleLike[], brokerRows: BrokerLike[], awardRows: AwardLike[]) {
  const pagesById = new Map(pageRows.map(page => [page.id, page]));
  return mediaRows.map(item => {
    const usages: MediaUsage[] = [];
    for (const article of articleRows) {
      if (article.featuredMediaId !== item.id) continue;
      const page = pagesById.get(article.pageId);
      usages.push({ entityType: "article", entityId: article.id, pageId: article.pageId, slug: page?.slug, label: page?.title ?? `Article ${article.id}`, field: "featuredMediaId" });
    }
    for (const broker of brokerRows) {
      if (broker.profileMediaId !== item.id) continue;
      const page = pagesById.get(broker.pageId);
      usages.push({ entityType: "broker", entityId: broker.id, pageId: broker.pageId, slug: page?.slug, label: broker.fullName, field: "profileMediaId" });
    }
    for (const award of awardRows) {
      if (award.mediaId !== item.id) continue;
      usages.push({ entityType: "award", entityId: award.id, label: `${award.year} ${award.awardName} — ${award.category}`, field: "mediaId" });
    }
    for (const page of pageRows) {
      if (page.ogImageUrl === item.publicUrl) usages.push({ entityType: "page", entityId: page.id, pageId: page.id, slug: page.slug, label: page.title, field: "ogImageUrl" });
      const serializedSections = JSON.stringify(page.sections);
      if (serializedSections.includes(item.publicUrl) || (item.storageKey && serializedSections.includes(item.storageKey))) {
        usages.push({ entityType: "page", entityId: page.id, pageId: page.id, slug: page.slug, label: page.title, field: "sections" });
      }
    }
    return { ...item, usages };
  });
}

