import {
  boolean,
  index,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const media = mysqlTable(
  "media",
  {
    id: int("id").autoincrement().primaryKey(),
    storageKey: varchar("storageKey", { length: 512 }),
    publicUrl: text("publicUrl").notNull(),
    originalFilename: varchar("originalFilename", { length: 255 }).notNull(),
    mimeType: varchar("mimeType", { length: 128 }).notNull(),
    width: int("width"),
    height: int("height"),
    altText: text("altText"),
    caption: text("caption"),
    credit: text("credit"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [index("media_filename_idx").on(table.originalFilename)],
);

export const pages = mysqlTable(
  "pages",
  {
    id: int("id").autoincrement().primaryKey(),
    pageType: mysqlEnum("pageType", ["solution", "loan_type", "location", "article", "broker", "standard"]).notNull(),
    slug: varchar("slug", { length: 220 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    eyebrow: varchar("eyebrow", { length: 160 }),
    excerpt: text("excerpt"),
    sections: json("sections").$type<Array<Record<string, unknown>>>().notNull(),
    status: mysqlEnum("status", ["draft", "scheduled", "published", "unpublished"]).default("draft").notNull(),
    publishAt: timestamp("publishAt"),
    indexable: boolean("indexable").default(false).notNull(),
    seoTitle: varchar("seoTitle", { length: 255 }),
    metaDescription: text("metaDescription"),
    canonicalUrl: text("canonicalUrl"),
    ogTitle: varchar("ogTitle", { length: 255 }),
    ogDescription: text("ogDescription"),
    ogImageUrl: text("ogImageUrl"),
    schemaJson: json("schemaJson").$type<Record<string, unknown> | null>(),
    ctaKey: varchar("ctaKey", { length: 120 }),
    createdByUserId: int("createdByUserId").references(() => users.id, { onDelete: "set null" }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    uniqueIndex("pages_slug_unique").on(table.slug),
    index("pages_publication_idx").on(table.status, table.publishAt, table.indexable),
    index("pages_type_idx").on(table.pageType),
  ],
);

export const brokers = mysqlTable(
  "brokers",
  {
    id: int("id").autoincrement().primaryKey(),
    pageId: int("pageId").notNull().references(() => pages.id, { onDelete: "cascade" }),
    fullName: varchar("fullName", { length: 180 }).notNull(),
    roleTitle: varchar("roleTitle", { length: 180 }).notNull(),
    biography: text("biography").notNull(),
    qualifications: json("qualifications").$type<string[]>().notNull(),
    expertise: json("expertise").$type<string[]>().notNull(),
    serviceAreas: json("serviceAreas").$type<string[]>().notNull(),
    phone: varchar("phone", { length: 40 }),
    email: varchar("email", { length: 320 }),
    bookingUrl: text("bookingUrl"),
    profileMediaId: int("profileMediaId").references(() => media.id, { onDelete: "set null" }),
    active: boolean("active").default(true).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [uniqueIndex("brokers_page_unique").on(table.pageId), index("brokers_active_idx").on(table.active)],
);

export const articles = mysqlTable(
  "articles",
  {
    id: int("id").autoincrement().primaryKey(),
    pageId: int("pageId").notNull().references(() => pages.id, { onDelete: "cascade" }),
    authorBrokerId: int("authorBrokerId").references(() => brokers.id, { onDelete: "set null" }),
    publicationDate: timestamp("publicationDate"),
    contentUpdatedDate: timestamp("contentUpdatedDate"),
    featuredMediaId: int("featuredMediaId").references(() => media.id, { onDelete: "set null" }),
    topic: varchar("topic", { length: 140 }).notNull(),
    tags: json("tags").$type<string[]>().notNull(),
    sourceNotes: text("sourceNotes"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    uniqueIndex("articles_page_unique").on(table.pageId),
    index("articles_topic_idx").on(table.topic),
    index("articles_publication_idx").on(table.publicationDate),
  ],
);

export const locations = mysqlTable(
  "locations",
  {
    id: int("id").autoincrement().primaryKey(),
    pageId: int("pageId").notNull().references(() => pages.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 180 }).notNull(),
    physicalOffice: boolean("physicalOffice").default(false).notNull(),
    addressLine1: varchar("addressLine1", { length: 255 }),
    suburb: varchar("suburb", { length: 160 }),
    state: varchar("state", { length: 80 }),
    postcode: varchar("postcode", { length: 16 }),
    serviceAreaText: text("serviceAreaText"),
    nearbyPlaces: json("nearbyPlaces").$type<string[]>().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [uniqueIndex("locations_page_unique").on(table.pageId), index("locations_name_idx").on(table.name)],
);

export const reviews = mysqlTable(
  "reviews",
  {
    id: int("id").autoincrement().primaryKey(),
    source: mysqlEnum("source", ["google_public", "manual_approved"]).notNull(),
    externalId: varchar("externalId", { length: 255 }),
    reviewerDisplayName: varchar("reviewerDisplayName", { length: 180 }).notNull(),
    rating: int("rating"),
    reviewText: text("reviewText").notNull(),
    reviewDate: timestamp("reviewDate"),
    sourceUrl: text("sourceUrl"),
    serviceContext: varchar("serviceContext", { length: 180 }),
    placements: json("placements").$type<string[]>().notNull(),
    active: boolean("active").default(false).notNull(),
    approvedByUserId: int("approvedByUserId").references(() => users.id, { onDelete: "set null" }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    uniqueIndex("reviews_source_external_unique").on(table.source, table.externalId),
    index("reviews_active_idx").on(table.active),
  ],
);

export const awards = mysqlTable(
  "awards",
  {
    id: int("id").autoincrement().primaryKey(),
    awardingBody: varchar("awardingBody", { length: 220 }).notNull(),
    awardName: varchar("awardName", { length: 255 }).notNull(),
    category: varchar("category", { length: 255 }).notNull(),
    year: int("year").notNull(),
    recognitionLevel: varchar("recognitionLevel", { length: 80 }).notNull(),
    mediaId: int("mediaId").references(() => media.id, { onDelete: "set null" }),
    sourceUrl: text("sourceUrl"),
    active: boolean("active").default(true).notNull(),
    displayOrder: int("displayOrder").default(0).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [index("awards_active_order_idx").on(table.active, table.displayOrder)],
);

export const contentBlocks = mysqlTable(
  "content_blocks",
  {
    id: int("id").autoincrement().primaryKey(),
    stableKey: varchar("stableKey", { length: 160 }).notNull(),
    label: varchar("label", { length: 220 }).notNull(),
    blockType: varchar("blockType", { length: 100 }).notNull(),
    schemaVersion: int("schemaVersion").default(1).notNull(),
    payload: json("payload").$type<Record<string, unknown>>().notNull(),
    status: mysqlEnum("status", ["draft", "published", "unpublished"]).default("draft").notNull(),
    placements: json("placements").$type<string[]>().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [uniqueIndex("content_blocks_key_unique").on(table.stableKey), index("content_blocks_status_idx").on(table.status)],
);

export const contentRelations = mysqlTable(
  "content_relations",
  {
    id: int("id").autoincrement().primaryKey(),
    sourcePageId: int("sourcePageId").notNull().references(() => pages.id, { onDelete: "cascade" }),
    targetPageId: int("targetPageId").notNull().references(() => pages.id, { onDelete: "cascade" }),
    relationType: mysqlEnum("relationType", ["related_article", "related_service", "related_location", "related_solution"]).notNull(),
    sortOrder: int("sortOrder").default(0).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => [
    uniqueIndex("content_relations_unique").on(table.sourcePageId, table.targetPageId, table.relationType),
    index("content_relations_source_idx").on(table.sourcePageId, table.relationType, table.sortOrder),
  ],
);

export const leads = mysqlTable(
  "leads",
  {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 180 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    mobile: varchar("mobile", { length: 40 }).notNull(),
    enquiryType: varchar("enquiryType", { length: 160 }).notNull(),
    message: text("message"),
    sourcePath: varchar("sourcePath", { length: 512 }).notNull(),
    consentAt: timestamp("consentAt").notNull(),
    deliveryStatus: mysqlEnum("deliveryStatus", ["pending", "sent", "failed", "not_configured"]).default("pending").notNull(),
    internalStatus: mysqlEnum("internalStatus", ["new", "contacted", "closed", "archived"]).default("new").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [index("leads_status_created_idx").on(table.internalStatus, table.createdAt)],
);

export const siteSettings = mysqlTable(
  "site_settings",
  {
    id: int("id").autoincrement().primaryKey(),
    settingKey: varchar("settingKey", { length: 180 }).notNull(),
    valueType: mysqlEnum("valueType", ["text", "json", "boolean", "number"]).default("text").notNull(),
    valueText: text("valueText"),
    valueJson: json("valueJson").$type<Record<string, unknown> | unknown[] | null>(),
    settingGroup: varchar("settingGroup", { length: 120 }).notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [uniqueIndex("site_settings_key_unique").on(table.settingKey), index("site_settings_group_idx").on(table.settingGroup)],
);

export const automationJobs = mysqlTable(
  "automation_jobs",
  {
    id: int("id").autoincrement().primaryKey(),
    stableKey: varchar("stableKey", { length: 160 }).notNull(),
    scheduleCronTaskUid: varchar("scheduleCronTaskUid", { length: 65 }),
    cronExpression: varchar("cronExpression", { length: 64 }).notNull(),
    callbackPath: varchar("callbackPath", { length: 255 }).notNull(),
    retentionDays: int("retentionDays").default(30).notNull(),
    enabled: boolean("enabled").default(true).notNull(),
    lastRunAt: timestamp("lastRunAt"),
    lastRunStatus: mysqlEnum("lastRunStatus", ["never", "success", "failed"]).default("never").notNull(),
    lastRunMessage: text("lastRunMessage"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    uniqueIndex("automation_jobs_stable_key_unique").on(table.stableKey),
    uniqueIndex("automation_jobs_task_uid_unique").on(table.scheduleCronTaskUid),
    index("automation_jobs_enabled_idx").on(table.enabled),
  ],
);

export const backupSnapshots = mysqlTable(
  "backup_snapshots",
  {
    id: int("id").autoincrement().primaryKey(),
    automationJobId: int("automationJobId").notNull().references(() => automationJobs.id, { onDelete: "cascade" }),
    storageKey: varchar("storageKey", { length: 512 }).notNull(),
    publicUrl: text("publicUrl").notNull(),
    checksumSha256: varchar("checksumSha256", { length: 64 }).notNull(),
    byteSize: int("byteSize").notNull(),
    recordCounts: json("recordCounts").$type<Record<string, number>>().notNull(),
    retentionUntil: timestamp("retentionUntil").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => [
    index("backup_snapshots_job_created_idx").on(table.automationJobId, table.createdAt),
    index("backup_snapshots_retention_idx").on(table.retentionUntil),
  ],
);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type CmsPage = typeof pages.$inferSelect;
export type InsertCmsPage = typeof pages.$inferInsert;
export type CmsArticle = typeof articles.$inferSelect;
export type CmsBroker = typeof brokers.$inferSelect;
export type CmsReview = typeof reviews.$inferSelect;
export type CmsAward = typeof awards.$inferSelect;
export type CmsLead = typeof leads.$inferSelect;
export type CmsMedia = typeof media.$inferSelect;
export type AutomationJob = typeof automationJobs.$inferSelect;
export type BackupSnapshot = typeof backupSnapshots.$inferSelect;
