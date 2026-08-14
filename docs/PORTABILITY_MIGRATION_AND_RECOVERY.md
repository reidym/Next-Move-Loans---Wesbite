# Portability, migration and disaster recovery

## Portability contract

The business content model is stored in explicit relational tables rather than framework-specific blobs. A full export contains pages, articles, brokers, approved reviews, awards, locations, reusable blocks, relationships, media records, media usage and public settings. Timestamps and publication states are preserved.

| Portable element | Export form |
| --- | --- |
| Structured content | Versioned JSON with stable slugs, explicit record types and relationships. |
| Media catalogue | Storage key, URL, original name, mime type, dimensions, alternative text, caption, credit and detected usage. |
| Schema | Drizzle TypeScript plus ordered SQL migrations. |
| Frontend | React-compatible TypeScript; production currently uses a Preact compatibility alias for payload size. |
| Settings | Public, non-secret CMS settings are exported. Secrets are documented by name only. |
| Tests | Publication, export, media, backup, lead, analytics, schema, sitemap and topic-hub policies. |

## Platform-dependent adapters

Authentication, managed object storage, owner notifications, deployment routing and scheduled callbacks use the current project runtime. A move to another host requires replacement adapters for those boundaries. Public content records, page components, CSS, migrations, JSON exports and most server business logic remain reusable.

## Daily application backup

The project contains `/api/scheduled/daily-cms-backup`, an authenticated callback that accepts only a platform cron identity and looks up the owning job by `taskUid`. It writes the same portable CMS export used by the admin area to managed object storage, calculates a SHA-256 checksum, stores record counts and records a minimum 30-day retention date in `backup_snapshots`.

The prepared schedule is `0 20 3 * * *`, meaning 03:20 UTC daily. It is deliberately **not active before deployment**. After the reviewed site is published, create the project-level schedule and attach its returned task UID:

```bash
manus-heartbeat create \
  --name daily-cms-backup \
  --cron "0 20 3 * * *" \
  --path /api/scheduled/daily-cms-backup \
  --description "Daily portable Next Move Loans CMS snapshot"

node scripts/attach-backup-task.mjs --task-uid <returned-task-uid>
```

The retention policy is intentionally non-destructive: snapshots are tagged for at least 30 days and are not automatically deleted. This avoids an irreversible purge before a separate storage-retention policy is approved.

The application snapshot includes the media catalogue and usage manifest, not a second binary copy of every media object. Media bytes remain in managed object storage. For complete off-platform independence, periodically copy the referenced originals into a business-owned archive and keep that archive beside the JSON export.

## Recovery sequence

| Incident | First response | Recovery source |
| --- | --- | --- |
| Incorrect article or page | Unpublish the record; do not delete it. | CMS revision inputs or latest JSON export. |
| Broken code release | Roll back to the last stable checkpoint. | Management UI version history. |
| Failed schema change | Stop writes and apply a reviewed forward fix or rollback SQL. | Pre-migration export plus migration history. |
| Lost CMS records | Recreate the schema, validate the export version, then import records in dependency order. | Latest admin or scheduled CMS JSON snapshot. |
| Missing media object | Identify all uses from the media manifest and restore the original under a new managed-storage key. | Business-owned media archive. |
| Secret exposure | Rotate the secret, update secure project configuration and review affected logs. | Provider and project secret controls. |

Recommended import order is media, pages, brokers, articles, locations, reviews, awards, reusable blocks, relationships and public settings. User identities and secrets are not exported and must be recreated through the destination authentication and secret systems.

## Recovery validation

After restoration, run `pnpm test`, `pnpm check` and `pnpm build`; confirm `/api/public/articles`, `/sitemap.xml`, `/admin`, a lead submission, a scheduled article boundary and representative desktop/mobile routes. Compare the restored export counts and checksum with the selected backup snapshot before reopening editing.

