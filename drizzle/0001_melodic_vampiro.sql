CREATE TABLE `automation_jobs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`stableKey` varchar(160) NOT NULL,
	`scheduleCronTaskUid` varchar(65),
	`cronExpression` varchar(64) NOT NULL,
	`callbackPath` varchar(255) NOT NULL,
	`retentionDays` int NOT NULL DEFAULT 30,
	`enabled` boolean NOT NULL DEFAULT true,
	`lastRunAt` timestamp,
	`lastRunStatus` enum('never','success','failed') NOT NULL DEFAULT 'never',
	`lastRunMessage` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `automation_jobs_id` PRIMARY KEY(`id`),
	CONSTRAINT `automation_jobs_stable_key_unique` UNIQUE(`stableKey`),
	CONSTRAINT `automation_jobs_task_uid_unique` UNIQUE(`scheduleCronTaskUid`)
);
--> statement-breakpoint
CREATE TABLE `backup_snapshots` (
	`id` int AUTO_INCREMENT NOT NULL,
	`automationJobId` int NOT NULL,
	`storageKey` varchar(512) NOT NULL,
	`publicUrl` text NOT NULL,
	`checksumSha256` varchar(64) NOT NULL,
	`byteSize` int NOT NULL,
	`recordCounts` json NOT NULL,
	`retentionUntil` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `backup_snapshots_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `backup_snapshots` ADD CONSTRAINT `backup_snapshots_automationJobId_automation_jobs_id_fk` FOREIGN KEY (`automationJobId`) REFERENCES `automation_jobs`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `automation_jobs_enabled_idx` ON `automation_jobs` (`enabled`);--> statement-breakpoint
CREATE INDEX `backup_snapshots_job_created_idx` ON `backup_snapshots` (`automationJobId`,`createdAt`);--> statement-breakpoint
CREATE INDEX `backup_snapshots_retention_idx` ON `backup_snapshots` (`retentionUntil`);