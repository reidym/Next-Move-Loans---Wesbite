# Next Move Loans website and secure CMS

This repository contains the responsive Next Move Loans public website, its secure content-management area, lightweight public content APIs, lead-capture workflow, analytics configuration layer, dynamic sitemap and export-first content model.

The public design follows the approved **Pathfinder Editorial** system: dark blue, paper, coral, slate and gold; Figtree typography; direct question-led writing; a solution-first navigation model; and verified proof without invented reviews, ratings or credentials.

## Project map

| Area | Purpose |
| --- | --- |
| `client/src/pages` | Public routes, solution templates, town pages, Learning Centre and secure admin screens. |
| `client/src/lib` | Shared brand data, solution records, CMS transforms, public API hooks, analytics validation and topic-hub rules. |
| `server` | Public REST endpoints, secure tRPC procedures, lead handling, CMS queries, exports, sitemap generation and scheduled-backup callback. |
| `drizzle` | Versioned relational schema and reviewed SQL migrations. |
| `scripts` | Idempotent production-content seeds and deployment handoff helpers. |
| `docs` | CMS operations, configuration, GitHub/staging workflow, portability, migration and recovery procedures. |

## Local commands

| Command | Purpose |
| --- | --- |
| `pnpm install` | Install the locked project dependencies. |
| `pnpm dev` | Run the full-stack development server. |
| `pnpm test` | Run the Vitest policy and helper suite. |
| `pnpm check` | Run TypeScript validation without writing build output. |
| `pnpm build` | Build the production client and server. Production aliases React APIs to Preact compatibility to reduce initial JavaScript. |
| `pnpm drizzle-kit generate` | Generate SQL from schema changes. Generated SQL must be reviewed and applied through the managed database workflow. |

## Public and admin routes

The public site begins at `/`. The authenticated CMS begins at `/admin`. Admin access uses the project’s managed authentication and permits only the project owner or users with the `admin` role. Public content requests use lightweight `/api/public/*` endpoints, while secure admin mutations use `/api/trpc`.

Content publication is state-based. A `published` record is public immediately. A `scheduled` record becomes public when its UTC `publishAt` timestamp has elapsed. Draft, unpublished and future-scheduled records stay out of public queries, related content, topic hubs and the sitemap.

## Data and media

The relational CMS stores explicit pages, articles, brokers, locations, approved reviews, verified awards, reusable blocks, relationships, settings, leads, automation jobs and backup snapshots. Media bytes remain in managed object storage; the database stores URLs, storage keys and descriptive metadata.

The admin export creates a vendor-neutral JSON package. The media export includes original names, storage keys, public URLs, alternative text, captions, credits and every detected use. See [`docs/PORTABILITY_MIGRATION_AND_RECOVERY.md`](docs/PORTABILITY_MIGRATION_AND_RECOVERY.md) before moving the project or changing the schema.

## Release status

The project remains in preview. Outbound lead email requires approved transactional-email credentials, final regulatory details remain outstanding, live analytics IDs have not been supplied, public review records have not been approved, and the daily backup schedule cannot be activated until the site is published. These dependencies are tracked in `todo.md` and the pre-launch audit.

## Operating guides

| Guide | Use it for |
| --- | --- |
| [`docs/CMS_OPERATIONS.md`](docs/CMS_OPERATIONS.md) | Routine publishing, reviews, awards, brokers, media, leads and exports. |
| [`docs/CONFIGURATION_SHEET.md`](docs/CONFIGURATION_SHEET.md) | Secrets, public marketing IDs, contact settings and ownership. |
| [`docs/GITHUB_STAGING_AND_RELEASE.md`](docs/GITHUB_STAGING_AND_RELEASE.md) | Private repository connection, staging, checkpoints, releases and rollback. |
| [`docs/PORTABILITY_MIGRATION_AND_RECOVERY.md`](docs/PORTABILITY_MIGRATION_AND_RECOVERY.md) | Export, backup, migration, restoration and platform-dependent components. |

