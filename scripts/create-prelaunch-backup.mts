import "dotenv/config";
import { createHash } from "node:crypto";
import { exportCmsContent } from "../server/cmsDb";
import { buildBackupEnvelope } from "../server/cmsBackup";
import { getAutomationJobByStableKey, recordBackupSuccess } from "../server/backupDb";
import { storageGetSignedUrl, storagePut } from "../server/storage";

const job = await getAutomationJobByStableKey("daily-cms-backup");
if (!job) throw new Error("Run scripts/seed-backup-job.mjs first");

const now = new Date();
const payload = await exportCmsContent();
const envelope = buildBackupEnvelope(payload, now, job.retentionDays);
const body = JSON.stringify(envelope, null, 2);
const checksumSha256 = createHash("sha256").update(body).digest("hex");
const dateKey = now.toISOString().replace(/[:.]/g, "-");
const stored = await storagePut(`backups/prelaunch/${dateKey}.json`, body, "application/json");

const verificationUrl = await storageGetSignedUrl(stored.key);
const downloaded = await fetch(verificationUrl).then(async response => {
  if (!response.ok) throw new Error(`Backup verification download failed: ${response.status}`);
  return response.text();
});
const downloadedChecksum = createHash("sha256").update(downloaded).digest("hex");
if (downloadedChecksum !== checksumSha256) throw new Error("Backup checksum verification failed");
const restored = JSON.parse(downloaded);
if (restored.backupFormat !== "next-move-loans-daily-backup" || restored.export?.format !== "next-move-loans-cms-export") throw new Error("Backup structure verification failed");

const retentionUntil = new Date(now.getTime() + Math.max(30, job.retentionDays) * 86_400_000);
await recordBackupSuccess({ automationJobId: job.id, storageKey: stored.key, publicUrl: stored.url, checksumSha256, byteSize: Buffer.byteLength(body), recordCounts: envelope.recordCounts, retentionUntil });

console.log(JSON.stringify({ verified: true, storageKey: stored.key, checksumSha256, byteSize: Buffer.byteLength(body), recordCounts: envelope.recordCounts, retentionUntil: retentionUntil.toISOString() }, null, 2));
process.exit(0);
