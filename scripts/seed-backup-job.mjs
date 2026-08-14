import "dotenv/config";
import mysql from "mysql2/promise";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");

const connection = await mysql.createConnection(process.env.DATABASE_URL);
try {
  await connection.execute(
    `INSERT INTO automation_jobs
      (stableKey, scheduleCronTaskUid, cronExpression, callbackPath, retentionDays, enabled, lastRunStatus)
     VALUES (?, NULL, ?, ?, ?, true, 'never')
     ON DUPLICATE KEY UPDATE
       cronExpression = VALUES(cronExpression),
       callbackPath = VALUES(callbackPath),
       retentionDays = GREATEST(retentionDays, VALUES(retentionDays)),
       updatedAt = CURRENT_TIMESTAMP`,
    ["daily-cms-backup", "0 20 3 * * *", "/api/scheduled/daily-cms-backup", 30],
  );
  console.log("Daily CMS backup definition is ready; scheduleCronTaskUid remains deployment-gated.");
} finally {
  await connection.end();
}
