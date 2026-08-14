import { createHash } from "node:crypto";
import type { Request, Response } from "express";
import { sdk } from "./_core/sdk";
import { exportCmsContent } from "./cmsDb";
import { storagePut } from "./storage";
import { getAutomationJobByTaskUid, recordBackupFailure, recordBackupSuccess } from "./backupDb";

type CmsExport = Awaited<ReturnType<typeof exportCmsContent>>;

export const backupRecordCounts = (payload: CmsExport) => Object.fromEntries(Object.entries(payload.content).map(([key, value]) => [key, Array.isArray(value) ? value.length : 0]));

export function buildBackupEnvelope(payload: CmsExport, now: Date, retentionDays: number) {
  return {
    backupFormat: "next-move-loans-daily-backup",
    backupVersion: 1,
    createdAt: now.toISOString(),
    retentionPolicy: { minimumDays: Math.max(30, retentionDays), destructiveAutoPurgeEnabled: false },
    recordCounts: backupRecordCounts(payload),
    export: payload,
  };
}

export async function dailyCmsBackupHandler(req: Request, res: Response) {
  let jobId: number | undefined;
  try {
    const user = await sdk.authenticateRequest(req).catch(() => undefined);
    if (!user || !user.isCron || !user.taskUid) return res.status(403).json({ error: "cron-only" });
    const job = await getAutomationJobByTaskUid(user.taskUid);
    if (!job) return res.json({ ok: true, skipped: "orphan" });
    jobId = job.id;
    if (!job.enabled) return res.json({ ok: true, skipped: "disabled" });

    const now = new Date();
    const payload = await exportCmsContent();
    const envelope = buildBackupEnvelope(payload, now, job.retentionDays);
    const body = JSON.stringify(envelope, null, 2);
    const checksumSha256 = createHash("sha256").update(body).digest("hex");
    const dateKey = now.toISOString().replace(/[:.]/g, "-");
    const stored = await storagePut(`backups/cms/${dateKey}.json`, body, "application/json");
    const retentionUntil = new Date(now.getTime() + Math.max(30, job.retentionDays) * 86_400_000);
    await recordBackupSuccess({ automationJobId: job.id, storageKey: stored.key, publicUrl: stored.url, checksumSha256, byteSize: Buffer.byteLength(body), recordCounts: envelope.recordCounts, retentionUntil });
    return res.json({ ok: true, snapshot: { storageKey: stored.key, checksumSha256, byteSize: Buffer.byteLength(body), retentionUntil: retentionUntil.toISOString() } });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (jobId) await recordBackupFailure(jobId, message).catch(() => undefined);
    return res.status(500).json({ error: message, stack: error instanceof Error ? error.stack : undefined, context: { url: req.originalUrl, taskUid: (req as Request & { taskUid?: string }).taskUid }, timestamp: new Date().toISOString() });
  }
}
