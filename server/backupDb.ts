import { desc, eq } from "drizzle-orm";
import { automationJobs, backupSnapshots } from "../drizzle/schema";
import { getDb } from "./db";

async function requireDb() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db;
}

export async function getAutomationJobByTaskUid(taskUid: string) {
  const db = await requireDb();
  return (await db.select().from(automationJobs).where(eq(automationJobs.scheduleCronTaskUid, taskUid)).limit(1))[0];
}

export async function getAutomationJobByStableKey(stableKey: string) {
  const db = await requireDb();
  return (await db.select().from(automationJobs).where(eq(automationJobs.stableKey, stableKey)).limit(1))[0];
}

export async function recordBackupSuccess(input: { automationJobId: number; storageKey: string; publicUrl: string; checksumSha256: string; byteSize: number; recordCounts: Record<string, number>; retentionUntil: Date }) {
  const db = await requireDb();
  await db.insert(backupSnapshots).values(input);
  await db.update(automationJobs).set({ lastRunAt: new Date(), lastRunStatus: "success", lastRunMessage: `Stored ${input.byteSize} bytes at ${input.storageKey}` }).where(eq(automationJobs.id, input.automationJobId));
}

export async function recordBackupFailure(automationJobId: number, message: string) {
  const db = await requireDb();
  await db.update(automationJobs).set({ lastRunAt: new Date(), lastRunStatus: "failed", lastRunMessage: message.slice(0, 4000) }).where(eq(automationJobs.id, automationJobId));
}

export async function listBackupSnapshots(limit = 60) {
  const db = await requireDb();
  return db.select().from(backupSnapshots).orderBy(desc(backupSnapshots.createdAt)).limit(limit);
}
