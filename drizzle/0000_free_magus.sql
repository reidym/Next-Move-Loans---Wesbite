CREATE TABLE `articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pageId` int NOT NULL,
	`authorBrokerId` int,
	`publicationDate` timestamp,
	`contentUpdatedDate` timestamp,
	`featuredMediaId` int,
	`topic` varchar(140) NOT NULL,
	`tags` json NOT NULL,
	`sourceNotes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `articles_id` PRIMARY KEY(`id`),
	CONSTRAINT `articles_page_unique` UNIQUE(`pageId`)
);
--> statement-breakpoint
CREATE TABLE `awards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`awardingBody` varchar(220) NOT NULL,
	`awardName` varchar(255) NOT NULL,
	`category` varchar(255) NOT NULL,
	`year` int NOT NULL,
	`recognitionLevel` varchar(80) NOT NULL,
	`mediaId` int,
	`sourceUrl` text,
	`active` boolean NOT NULL DEFAULT true,
	`displayOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `awards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `brokers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pageId` int NOT NULL,
	`fullName` varchar(180) NOT NULL,
	`roleTitle` varchar(180) NOT NULL,
	`biography` text NOT NULL,
	`qualifications` json NOT NULL,
	`expertise` json NOT NULL,
	`serviceAreas` json NOT NULL,
	`phone` varchar(40),
	`email` varchar(320),
	`bookingUrl` text,
	`profileMediaId` int,
	`active` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `brokers_id` PRIMARY KEY(`id`),
	CONSTRAINT `brokers_page_unique` UNIQUE(`pageId`)
);
--> statement-breakpoint
CREATE TABLE `content_blocks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`stableKey` varchar(160) NOT NULL,
	`label` varchar(220) NOT NULL,
	`blockType` varchar(100) NOT NULL,
	`schemaVersion` int NOT NULL DEFAULT 1,
	`payload` json NOT NULL,
	`status` enum('draft','published','unpublished') NOT NULL DEFAULT 'draft',
	`placements` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `content_blocks_id` PRIMARY KEY(`id`),
	CONSTRAINT `content_blocks_key_unique` UNIQUE(`stableKey`)
);
--> statement-breakpoint
CREATE TABLE `content_relations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sourcePageId` int NOT NULL,
	`targetPageId` int NOT NULL,
	`relationType` enum('related_article','related_service','related_location','related_solution') NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `content_relations_id` PRIMARY KEY(`id`),
	CONSTRAINT `content_relations_unique` UNIQUE(`sourcePageId`,`targetPageId`,`relationType`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(180) NOT NULL,
	`email` varchar(320) NOT NULL,
	`mobile` varchar(40) NOT NULL,
	`enquiryType` varchar(160) NOT NULL,
	`message` text,
	`sourcePath` varchar(512) NOT NULL,
	`consentAt` timestamp NOT NULL,
	`deliveryStatus` enum('pending','sent','failed','not_configured') NOT NULL DEFAULT 'pending',
	`internalStatus` enum('new','contacted','closed','archived') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pageId` int NOT NULL,
	`name` varchar(180) NOT NULL,
	`physicalOffice` boolean NOT NULL DEFAULT false,
	`addressLine1` varchar(255),
	`suburb` varchar(160),
	`state` varchar(80),
	`postcode` varchar(16),
	`serviceAreaText` text,
	`nearbyPlaces` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `locations_id` PRIMARY KEY(`id`),
	CONSTRAINT `locations_page_unique` UNIQUE(`pageId`)
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` int AUTO_INCREMENT NOT NULL,
	`storageKey` varchar(512),
	`publicUrl` text NOT NULL,
	`originalFilename` varchar(255) NOT NULL,
	`mimeType` varchar(128) NOT NULL,
	`width` int,
	`height` int,
	`altText` text,
	`caption` text,
	`credit` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `media_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pageType` enum('solution','loan_type','location','article','broker','standard') NOT NULL,
	`slug` varchar(220) NOT NULL,
	`title` varchar(255) NOT NULL,
	`eyebrow` varchar(160),
	`excerpt` text,
	`sections` json NOT NULL,
	`status` enum('draft','scheduled','published','unpublished') NOT NULL DEFAULT 'draft',
	`publishAt` timestamp,
	`indexable` boolean NOT NULL DEFAULT false,
	`seoTitle` varchar(255),
	`metaDescription` text,
	`canonicalUrl` text,
	`ogTitle` varchar(255),
	`ogDescription` text,
	`ogImageUrl` text,
	`schemaJson` json,
	`ctaKey` varchar(120),
	`createdByUserId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pages_id` PRIMARY KEY(`id`),
	CONSTRAINT `pages_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`source` enum('google_public','manual_approved') NOT NULL,
	`externalId` varchar(255),
	`reviewerDisplayName` varchar(180) NOT NULL,
	`rating` int,
	`reviewText` text NOT NULL,
	`reviewDate` timestamp,
	`sourceUrl` text,
	`serviceContext` varchar(180),
	`placements` json NOT NULL,
	`active` boolean NOT NULL DEFAULT false,
	`approvedByUserId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`),
	CONSTRAINT `reviews_source_external_unique` UNIQUE(`source`,`externalId`)
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`settingKey` varchar(180) NOT NULL,
	`valueType` enum('text','json','boolean','number') NOT NULL DEFAULT 'text',
	`valueText` text,
	`valueJson` json,
	`settingGroup` varchar(120) NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_settings_key_unique` UNIQUE(`settingKey`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
ALTER TABLE `articles` ADD CONSTRAINT `articles_pageId_pages_id_fk` FOREIGN KEY (`pageId`) REFERENCES `pages`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `articles` ADD CONSTRAINT `articles_authorBrokerId_brokers_id_fk` FOREIGN KEY (`authorBrokerId`) REFERENCES `brokers`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `articles` ADD CONSTRAINT `articles_featuredMediaId_media_id_fk` FOREIGN KEY (`featuredMediaId`) REFERENCES `media`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `awards` ADD CONSTRAINT `awards_mediaId_media_id_fk` FOREIGN KEY (`mediaId`) REFERENCES `media`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `brokers` ADD CONSTRAINT `brokers_pageId_pages_id_fk` FOREIGN KEY (`pageId`) REFERENCES `pages`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `brokers` ADD CONSTRAINT `brokers_profileMediaId_media_id_fk` FOREIGN KEY (`profileMediaId`) REFERENCES `media`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `content_relations` ADD CONSTRAINT `content_relations_sourcePageId_pages_id_fk` FOREIGN KEY (`sourcePageId`) REFERENCES `pages`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `content_relations` ADD CONSTRAINT `content_relations_targetPageId_pages_id_fk` FOREIGN KEY (`targetPageId`) REFERENCES `pages`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `locations` ADD CONSTRAINT `locations_pageId_pages_id_fk` FOREIGN KEY (`pageId`) REFERENCES `pages`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pages` ADD CONSTRAINT `pages_createdByUserId_users_id_fk` FOREIGN KEY (`createdByUserId`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_approvedByUserId_users_id_fk` FOREIGN KEY (`approvedByUserId`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `articles_topic_idx` ON `articles` (`topic`);--> statement-breakpoint
CREATE INDEX `articles_publication_idx` ON `articles` (`publicationDate`);--> statement-breakpoint
CREATE INDEX `awards_active_order_idx` ON `awards` (`active`,`displayOrder`);--> statement-breakpoint
CREATE INDEX `brokers_active_idx` ON `brokers` (`active`);--> statement-breakpoint
CREATE INDEX `content_blocks_status_idx` ON `content_blocks` (`status`);--> statement-breakpoint
CREATE INDEX `content_relations_source_idx` ON `content_relations` (`sourcePageId`,`relationType`,`sortOrder`);--> statement-breakpoint
CREATE INDEX `leads_status_created_idx` ON `leads` (`internalStatus`,`createdAt`);--> statement-breakpoint
CREATE INDEX `locations_name_idx` ON `locations` (`name`);--> statement-breakpoint
CREATE INDEX `media_filename_idx` ON `media` (`originalFilename`);--> statement-breakpoint
CREATE INDEX `pages_publication_idx` ON `pages` (`status`,`publishAt`,`indexable`);--> statement-breakpoint
CREATE INDEX `pages_type_idx` ON `pages` (`pageType`);--> statement-breakpoint
CREATE INDEX `reviews_active_idx` ON `reviews` (`active`);--> statement-breakpoint
CREATE INDEX `site_settings_group_idx` ON `site_settings` (`settingGroup`);