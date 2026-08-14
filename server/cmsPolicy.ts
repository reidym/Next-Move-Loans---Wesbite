export type PublicationRecord = {
  status: "draft" | "scheduled" | "published" | "unpublished";
  publishAt?: Date | null;
  indexable?: boolean;
};

export function isPublicAt(record: PublicationRecord, now = new Date()) {
  if (record.status === "published") return true;
  return record.status === "scheduled" && Boolean(record.publishAt && record.publishAt.getTime() <= now.getTime());
}

export function isSitemapEligible(record: PublicationRecord, now = new Date()) {
  return Boolean(record.indexable) && isPublicAt(record, now);
}

