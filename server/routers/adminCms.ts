import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { adminProcedure, router } from "../_core/trpc";
import {
  exportCmsContent,
  listAdminArticles,
  listAdminAwards,
  listAdminBrokers,
  listAdminContentBlocks,
  listAdminLeads,
  listAdminMedia,
  listAdminPages,
  listAdminRelations,
  listAdminReviews,
  listAdminSettings,
  saveArticle,
  saveAward,
  saveBroker,
  saveContentBlock,
  saveContentRelation,
  saveMedia,
  savePage,
  saveReview,
  saveSetting,
  updateLeadStatus,
  getLeadForPrivacyRequest,
  deleteLeadForPrivacyRequest,
} from "../cmsDb";
import { storagePut } from "../storage";

const nullableUrl = z.string().trim().url().nullable().optional();
const nullableText = (max: number) => z.string().trim().max(max).nullable().optional();

const pageInput = z.object({
  id: z.number().int().positive().optional(),
  pageType: z.enum(["solution", "loan_type", "location", "article", "broker", "standard"]),
  slug: z.string().trim().min(1).max(220).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(2).max(255),
  eyebrow: nullableText(160),
  excerpt: nullableText(1200),
  sections: z.array(z.record(z.string(), z.unknown())),
  status: z.enum(["draft", "scheduled", "published", "unpublished"]),
  publishAt: z.date().nullable().optional(),
  indexable: z.boolean(),
  seoTitle: nullableText(255),
  metaDescription: nullableText(320),
  canonicalUrl: nullableUrl,
  ogTitle: nullableText(255),
  ogDescription: nullableText(320),
  ogImageUrl: nullableUrl,
  schemaJson: z.record(z.string(), z.unknown()).nullable().optional(),
  ctaKey: nullableText(120),
});

const articleInput = z.object({
  id: z.number().int().positive().optional(),
  pageId: z.number().int().positive(),
  authorBrokerId: z.number().int().positive().nullable().optional(),
  publicationDate: z.date().nullable().optional(),
  contentUpdatedDate: z.date().nullable().optional(),
  featuredMediaId: z.number().int().positive().nullable().optional(),
  topic: z.string().trim().min(2).max(140),
  tags: z.array(z.string().trim().min(1).max(80)).max(30),
  sourceNotes: nullableText(12000),
});

const brokerInput = z.object({
  id: z.number().int().positive().optional(),
  pageId: z.number().int().positive(),
  fullName: z.string().trim().min(2).max(180),
  roleTitle: z.string().trim().min(2).max(180),
  biography: z.string().trim().min(20).max(20000),
  qualifications: z.array(z.string().trim().min(1).max(240)).max(30),
  expertise: z.array(z.string().trim().min(1).max(240)).max(30),
  serviceAreas: z.array(z.string().trim().min(1).max(180)).max(50),
  phone: nullableText(40),
  email: z.string().email().nullable().optional(),
  bookingUrl: nullableUrl,
  profileMediaId: z.number().int().positive().nullable().optional(),
  active: z.boolean(),
});

const reviewInput = z.object({
  id: z.number().int().positive().optional(),
  source: z.enum(["google_public", "manual_approved"]),
  externalId: nullableText(255),
  reviewerDisplayName: z.string().min(1).max(180),
  rating: z.number().int().min(1).max(5).nullable().optional(),
  reviewText: z.string().min(2).max(6000),
  reviewDate: z.date().nullable().optional(),
  sourceUrl: nullableUrl,
  serviceContext: nullableText(180),
  placements: z.array(z.string().max(160)),
  active: z.boolean(),
  approvedByUserId: z.number().int().positive().nullable().optional(),
});

const awardInput = z.object({
  id: z.number().int().positive().optional(),
  awardingBody: z.string().min(2).max(220),
  awardName: z.string().min(2).max(255),
  category: z.string().min(2).max(255),
  year: z.number().int().min(2000).max(2100),
  recognitionLevel: z.string().min(2).max(80),
  mediaId: z.number().int().positive().nullable().optional(),
  sourceUrl: nullableUrl,
  active: z.boolean(),
  displayOrder: z.number().int(),
});

const blockInput = z.object({
  id: z.number().int().positive().optional(),
  stableKey: z.string().trim().min(2).max(160).regex(/^[a-z0-9]+(?:[-_.][a-z0-9]+)*$/),
  label: z.string().trim().min(2).max(220),
  blockType: z.string().trim().min(2).max(100),
  schemaVersion: z.number().int().min(1).max(100),
  payload: z.record(z.string(), z.unknown()),
  status: z.enum(["draft", "published", "unpublished"]),
  placements: z.array(z.string().trim().min(1).max(160)).max(50),
});

const relationInput = z.object({
  id: z.number().int().positive().optional(),
  sourcePageId: z.number().int().positive(),
  targetPageId: z.number().int().positive(),
  relationType: z.enum(["related_article", "related_service", "related_location", "related_solution"]),
  sortOrder: z.number().int().min(0).max(999),
});

export const allowedCmsMediaTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "application/pdf"] as const;
export const sanitiseCmsFileName = (name: string) => name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 180) || "upload";

export const adminCmsRouter = router({
  pages: adminProcedure.query(() => listAdminPages()),
  savePage: adminProcedure.input(pageInput).mutation(({ input, ctx }) => savePage({ ...input, createdByUserId: ctx.user.id })),
  articles: adminProcedure.query(() => listAdminArticles()),
  saveArticle: adminProcedure.input(articleInput).mutation(({ input }) => saveArticle(input)),
  brokers: adminProcedure.query(() => listAdminBrokers()),
  saveBroker: adminProcedure.input(brokerInput).mutation(({ input }) => saveBroker(input)),
  reviews: adminProcedure.query(() => listAdminReviews()),
  saveReview: adminProcedure.input(reviewInput).mutation(({ input, ctx }) => saveReview({ ...input, approvedByUserId: input.active ? ctx.user.id : input.approvedByUserId })),
  awards: adminProcedure.query(() => listAdminAwards()),
  saveAward: adminProcedure.input(awardInput).mutation(({ input }) => saveAward(input)),
  blocks: adminProcedure.query(() => listAdminContentBlocks()),
  saveBlock: adminProcedure.input(blockInput).mutation(({ input }) => saveContentBlock(input)),
  relations: adminProcedure.query(() => listAdminRelations()),
  saveRelation: adminProcedure.input(relationInput).mutation(({ input }) => saveContentRelation(input)),
  media: adminProcedure.query(() => listAdminMedia()),
  uploadMedia: adminProcedure.input(z.object({
    fileName: z.string().min(1).max(255),
    mimeType: z.enum(allowedCmsMediaTypes),
    contentBase64: z.string().min(4).max(8_000_000),
    altText: nullableText(1000),
    caption: nullableText(4000),
    credit: nullableText(1000),
  })).mutation(async ({ input, ctx }) => {
    const bytes = Buffer.from(input.contentBase64, "base64");
    if (!bytes.length || bytes.length > 5_000_000) throw new Error("Media must be between 1 byte and 5 MB");
    const fileName = sanitiseCmsFileName(input.fileName);
    const { key, url } = await storagePut(`cms/${ctx.user.id}/${Date.now()}-${fileName}`, bytes, input.mimeType);
    return saveMedia({ storageKey: key, publicUrl: url, originalFilename: input.fileName, mimeType: input.mimeType, altText: input.altText, caption: input.caption, credit: input.credit });
  }),
  settings: adminProcedure.query(() => listAdminSettings()),
  saveSetting: adminProcedure.input(z.object({ id: z.number().int().positive().optional(), settingKey: z.string().min(2).max(180), valueType: z.enum(["text", "json", "boolean", "number"]), valueText: z.string().nullable().optional(), valueJson: z.union([z.record(z.string(), z.unknown()), z.array(z.unknown())]).nullable().optional(), settingGroup: z.string().min(2).max(120) })).mutation(({ input }) => saveSetting(input)),
  leads: adminProcedure.query(() => listAdminLeads()),
  updateLeadStatus: adminProcedure.input(z.object({ id: z.number().int().positive(), internalStatus: z.enum(["new", "contacted", "closed", "archived"]) })).mutation(({ input }) => updateLeadStatus(input.id, input.internalStatus)),
  exportLead: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ input }) => {
    const lead = await getLeadForPrivacyRequest(input.id);
    if (!lead) throw new TRPCError({ code: "NOT_FOUND", message: "Lead not found" });
    return { format: "next-move-loans-lead-export", version: 1, exportedAt: new Date().toISOString(), lead };
  }),
  deleteLead: adminProcedure.input(z.object({ id: z.number().int().positive(), confirm: z.literal("DELETE") })).mutation(async ({ input }) => {
    const deleted = await deleteLeadForPrivacyRequest(input.id);
    if (!deleted) throw new TRPCError({ code: "NOT_FOUND", message: "Lead not found" });
    return deleted;
  }),
  exportContent: adminProcedure.query(() => exportCmsContent()),
});
