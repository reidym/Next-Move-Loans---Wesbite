import "dotenv/config";
import mysql from "mysql2/promise";

const position = process.argv.indexOf("--task-uid");
const taskUid = position >= 0 ? process.argv[position + 1] : undefined;

if (!taskUid || !/^[-_a-zA-Z0-9]{8,65}$/.test(taskUid)) throw new Error("Provide a valid --task-uid returned by manus-heartbeat create");
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");

const connection = await mysql.createConnection(process.env.DATABASE_URL);
try {
  const [result] = await connection.execute(
    `UPDATE automation_jobs SET scheduleCronTaskUid = ?, enabled = true, updatedAt = CURRENT_TIMESTAMP WHERE stableKey = 'daily-cms-backup'`,
    [taskUid],
  );
  if (!result.affectedRows) throw new Error("The daily-cms-backup job definition is missing; run scripts/seed-backup-job.mjs first");
  console.log(`Attached daily-cms-backup to task UID ${taskUid}.`);
} finally {
  await connection.end();
}
