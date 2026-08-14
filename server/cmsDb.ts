import { and, asc, desc, eq, lte, or } from "drizzle-orm";
import {
  articles,
  awards,
  brokers,
  contentBlocks,
  contentRelations,
  leads,
  locations,
  media,
  pages,
  reviews,
  siteSettings,
} from "../drizzle/schema";
import { getDb } from "./db";
import { buildMediaManifest } from "./cmsExport";

const publicNow = () => or(eq(pages.status, "published"), and(eq(pages.status, "scheduled"), lte(pages.publishAt, new Date())));

async function requireDb() {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  return db;
}

export async function getPublicPageBySlug(slug: string) {
  const db = await requireDb();
  return (await db.select().from(pages).where(and(eq(pages.slug, slug), publicNow())).limit(1))[0] ?? null;
}

export async function listPublicPages(pageType?: typeof pages.$inferSelect.pageType) {
  const db = await requireDb();
  const condition = pageType ? and(eq(pages.pageType, pageType), publicNow()) : publicNow();
  return db.select().from(pages).where(condition).orderBy(desc(pages.publishAt), desc(pages.updatedAt));
}

export async function listPublicArticles() {
  const db = await requireDb();
  return db
    .select({ page: pages, article: articles, author: brokers })
    .from(pages)
    .innerJoin(articles, eq(articles.pageId, pages.id))
    .leftJoin(brokers, eq(articles.authorBrokerId, brokers.id))
    .where(and(eq(pages.pageType, "article"), publicNow()))
    .orderBy(desc(articles.publicationDate), desc(pages.updatedAt));
}

export async function listActiveAwards() {
  const db = await requireDb();
  return db
    .select({ award: awards, media })
    .from(awards)
    .leftJoin(media, eq(awards.mediaId, media.id))
    .where(eq(awards.active, true))
    .orderBy(asc(awards.displayOrder), desc(awards.year));
}

export async function listActiveReviews(placement?: string) {
  const db = await requireDb();
  const rows = await db.select().from(reviews).where(eq(reviews.active, true)).orderBy(desc(reviews.reviewDate), desc(reviews.createdAt));
  return placement ? rows.filter(row => row.placements.includes(placement)) : rows;
}

export async function listPublicSettings(settingGroup = "public") {
  const db = await requireDb();
  return db.select().from(siteSettings).where(eq(siteSettings.settingGroup, settingGroup)).orderBy(asc(siteSettings.settingKey));
}

export async function listAdminPages() {
  const db = await requireDb();
  return db.select().from(pages).orderBy(desc(pages.updatedAt));
}

export async function savePage(input: typeof pages.$inferInsert & { id?: number }) {
  const db = await requireDb();
  const { id, ...values } = input;
  if (id) {
    await db.update(pages).set(values).where(eq(pages.id, id));
    return (await db.select().from(pages).where(eq(pages.id, id)).limit(1))[0];
  }
  const result = await db.insert(pages).values(values).$returningId();
  return (await db.select().from(pages).where(eq(pages.id, result[0].id)).limit(1))[0];
}

export async function listAdminArticles() {
  const db = await requireDb();
  return db.select().from(articles).orderBy(desc(articles.updatedAt));
}

export async function saveArticle(input: typeof articles.$inferInsert & { id?: number }) {
  const db = await requireDb();
  const { id, ...values } = input;
  if (id) {
    await db.update(articles).set(values).where(eq(articles.id, id));
    return (await db.select().from(articles).where(eq(articles.id, id)).limit(1))[0];
  }
  const result = await db.insert(articles).values(values).$returningId();
  return (await db.select().from(articles).where(eq(articles.id, result[0].id)).limit(1))[0];
}

export async function listAdminBrokers() {
  const db = await requireDb();
  return db.select().from(brokers).orderBy(asc(brokers.fullName));
}

export async function saveBroker(input: typeof brokers.$inferInsert & { id?: number }) {
  const db = await requireDb();
  const { id, ...values } = input;
  if (id) {
    await db.update(brokers).set(values).where(eq(brokers.id, id));
    return (await db.select().from(brokers).where(eq(brokers.id, id)).limit(1))[0];
  }
  const result = await db.insert(brokers).values(values).$returningId();
  return (await db.select().from(brokers).where(eq(brokers.id, result[0].id)).limit(1))[0];
}

export async function listAdminContentBlocks() {
  const db = await requireDb();
  return db.select().from(contentBlocks).orderBy(asc(contentBlocks.label));
}

export async function saveContentBlock(input: typeof contentBlocks.$inferInsert & { id?: number }) {
  const db = await requireDb();
  const { id, ...values } = input;
  if (id) {
    await db.update(contentBlocks).set(values).where(eq(contentBlocks.id, id));
    return (await db.select().from(contentBlocks).where(eq(contentBlocks.id, id)).limit(1))[0];
  }
  const result = await db.insert(contentBlocks).values(values).$returningId();
  return (await db.select().from(contentBlocks).where(eq(contentBlocks.id, result[0].id)).limit(1))[0];
}

export async function listAdminMedia() {
  const db = await requireDb();
  return db.select().from(media).orderBy(desc(media.createdAt));
}

export async function saveMedia(input: typeof media.$inferInsert & { id?: number }) {
  const db = await requireDb();
  const { id, ...values } = input;
  if (id) {
    await db.update(media).set(values).where(eq(media.id, id));
    return (await db.select().from(media).where(eq(media.id, id)).limit(1))[0];
  }
  const result = await db.insert(media).values(values).$returningId();
  return (await db.select().from(media).where(eq(media.id, result[0].id)).limit(1))[0];
}

export async function listAdminRelations() {
  const db = await requireDb();
  return db.select().from(contentRelations).orderBy(asc(contentRelations.sourcePageId), asc(contentRelations.sortOrder));
}

export async function saveContentRelation(input: typeof contentRelations.$inferInsert & { id?: number }) {
  const db = await requireDb();
  const { id, ...values } = input;
  if (id) {
    await db.update(contentRelations).set(values).where(eq(contentRelations.id, id));
    return (await db.select().from(contentRelations).where(eq(contentRelations.id, id)).limit(1))[0];
  }
  const result = await db.insert(contentRelations).values(values).$returningId();
  return (await db.select().from(contentRelations).where(eq(contentRelations.id, result[0].id)).limit(1))[0];
}

export async function listAdminAwards() {
  const db = await requireDb();
  return db.select().from(awards).orderBy(asc(awards.displayOrder), desc(awards.year));
}

export async function saveAward(input: typeof awards.$inferInsert & { id?: number }) {
  const db = await requireDb();
  const { id, ...values } = input;
  if (id) {
    await db.update(awards).set(values).where(eq(awards.id, id));
    return (await db.select().from(awards).where(eq(awards.id, id)).limit(1))[0];
  }
  const result = await db.insert(awards).values(values).$returningId();
  return (await db.select().from(awards).where(eq(awards.id, result[0].id)).limit(1))[0];
}

export async function listAdminReviews() {
  const db = await requireDb();
  return db.select().from(reviews).orderBy(desc(reviews.updatedAt));
}

export async function saveReview(input: typeof reviews.$inferInsert & { id?: number }) {
  const db = await requireDb();
  const { id, ...values } = input;
  if (id) {
    await db.update(reviews).set(values).where(eq(reviews.id, id));
    return (await db.select().from(reviews).where(eq(reviews.id, id)).limit(1))[0];
  }
  const result = await db.insert(reviews).values(values).$returningId();
  return (await db.select().from(reviews).where(eq(reviews.id, result[0].id)).limit(1))[0];
}

export async function listAdminSettings() {
  const db = await requireDb();
  return db.select().from(siteSettings).orderBy(asc(siteSettings.settingGroup), asc(siteSettings.settingKey));
}

export async function saveSetting(input: typeof siteSettings.$inferInsert & { id?: number }) {
  const db = await requireDb();
  const { id, ...values } = input;
  await db.insert(siteSettings).values(values).onDuplicateKeyUpdate({ set: values });
  return (await db.select().from(siteSettings).where(eq(siteSettings.settingKey, values.settingKey)).limit(1))[0];
}

export async function createLead(input: Omit<typeof leads.$inferInsert, "consentAt">) {
  const db = await requireDb();
  const result = await db.insert(leads).values({ ...input, consentAt: new Date() }).$returningId();
  return result[0];
}

export async function listAdminLeads() {
  const db = await requireDb();
  return db.select().from(leads).orderBy(desc(leads.createdAt));
}

export async function updateLeadStatus(id: number, internalStatus: typeof leads.$inferSelect.internalStatus) {
  const db = await requireDb();
  await db.update(leads).set({ internalStatus }).where(eq(leads.id, id));
  return (await db.select().from(leads).where(eq(leads.id, id)).limit(1))[0];
}

export async function updateLeadDeliveryStatus(id: number, deliveryStatus: typeof leads.$inferSelect.deliveryStatus) {
  const db = await requireDb();
  await db.update(leads).set({ deliveryStatus }).where(eq(leads.id, id));
  return (await db.select().from(leads).where(eq(leads.id, id)).limit(1))[0];
}

export async function getLeadForPrivacyRequest(id: number) {
  const db = await requireDb();
  return (await db.select().from(leads).where(eq(leads.id, id)).limit(1))[0];
}

export async function deleteLeadForPrivacyRequest(id: number) {
  const db = await requireDb();
  const existing = (await db.select().from(leads).where(eq(leads.id, id)).limit(1))[0];
  if (!existing) return undefined;
  await db.delete(leads).where(eq(leads.id, id));
  return { id, deletedAt: new Date().toISOString() };
}

export async function exportCmsContent() {
  const db = await requireDb();
  const [pageRows, articleRows, brokerRows, reviewRows, awardRows, locationRows, blockRows, relationRows, mediaRows, settingRows] = await Promise.all([
    db.select().from(pages), db.select().from(articles), db.select().from(brokers), db.select().from(reviews), db.select().from(awards),
    db.select().from(locations), db.select().from(contentBlocks), db.select().from(contentRelations), db.select().from(media), db.select().from(siteSettings),
  ]);
  return {
    format: "next-move-loans-cms-export",
    version: 1,
    exportedAt: new Date().toISOString(),
    content: { pages: pageRows, articles: articleRows, brokers: brokerRows, reviews: reviewRows, awards: awardRows, locations: locationRows, contentBlocks: blockRows, contentRelations: relationRows, media: mediaRows, mediaManifest: buildMediaManifest(mediaRows, pageRows, articleRows, brokerRows, awardRows), siteSettings: settingRows },
  };
}
