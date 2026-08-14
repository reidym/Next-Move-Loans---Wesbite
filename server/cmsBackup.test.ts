import { describe, expect, it } from "vitest";
import { backupRecordCounts, buildBackupEnvelope } from "./cmsBackup";

const payload = {
  format: "next-move-loans-cms-export",
  version: 1,
  exportedAt: "2026-08-13T00:00:00.000Z",
  content: { pages: [{ id: 1 }], articles: [{ id: 1 }], brokers: [], reviews: [], awards: [{ id: 1 }], locations: [], contentBlocks: [], contentRelations: [], media: [{ id: 1 }], mediaManifest: [{ id: 1 }], siteSettings: [] },
} as never;

describe("daily CMS backup envelope", () => {
  it("reuses the portable export and records content plus media-manifest counts", () => {
    expect(backupRecordCounts(payload)).toMatchObject({ pages: 1, articles: 1, awards: 1, media: 1, mediaManifest: 1 });
    const envelope = buildBackupEnvelope(payload, new Date("2026-08-13T00:00:00.000Z"), 14);
    expect(envelope.export).toBe(payload);
    expect(envelope.retentionPolicy).toEqual({ minimumDays: 30, destructiveAutoPurgeEnabled: false });
  });
});
