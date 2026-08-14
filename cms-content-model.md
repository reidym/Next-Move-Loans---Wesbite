# Next Move Loans — Export-First CMS Content Model

## Architecture boundary

The secure admin application will use authenticated, role-gated procedures and a relational database. Public pages will consume published records through typed queries. Secrets stay in server-side environment variables. The business content model remains explicit and documented so that content can be exported without depending on proprietary runtime objects.

## Core entities

| Entity | Essential fields | Portability rule |
| --- | --- | --- |
| **User** | ID, external identity, name, email, role, created/updated timestamps | Authentication identifiers are infrastructure; content ownership uses stable numeric IDs and author snapshots where needed. |
| **Page** | ID, type, slug, title, eyebrow, excerpt, body/sections, status, publishAt, indexable, SEO fields, OG fields, schema overrides, CTA key, created/updated timestamps | Page sections use versioned JSON with documented component types; title, slug, status and SEO remain first-class columns. |
| **Article** | Page relationship, author, publication/update dates, featured media, topic, tags, related pages/services/articles, FAQ, source notes | Export includes both relationships and resolved slugs so content can be reconstructed on another platform. |
| **Broker** | Name, slug, title, biography, qualifications, expertise, genuine service areas, contact, booking link, media, active state | No broker is coupled to an authentication account; profile content can migrate independently. |
| **Review** | Source, external ID, approved attribution, rating when verified, review text, review date, service context, placements, active state, source URL | Public Google data and manually approved records are distinguishable; the source record is never overwritten by presentation copy. |
| **Award** | Awarding body, award name, category, year, recognition level, media, source URL, active state, display order | Recognition level is constrained to accurate language such as Finalist or State Finalist. |
| **Location** | Name, slug, page relationship, physical-office flag, address fields, service-area text, nearby places, coordinates when approved | Office status and service area are explicit fields, preventing false LocalBusiness claims. |
| **Media** | ID, public URL, storage key where available, original filename, MIME type, width, height, alt text, caption, credit, created timestamp | Export contains a manifest; database stores references, never binary file blobs. |
| **Content block** | Stable key, label, block type, versioned payload, status, placements, updated timestamp | Reusable blocks export as standalone JSON records with placement relationships. |
| **Lead** | Name, email, mobile, enquiry type, optional message, source path, consent timestamp, delivery status, internal status, created timestamp | Lead exports are separate from public content and should follow privacy/retention rules. |
| **Site setting** | Key, typed public value, group, updated timestamp | Secrets are excluded; contact details, default CTAs and non-secret display settings can export. |

## Page status model

| Status | Public visibility | Sitemap | Admin behaviour |
| --- | --- | --- | --- |
| Draft | Hidden | Excluded | Editable and previewable by authorised users. |
| Scheduled | Hidden until `publishAt`; public automatically when time is reached | Included only after publish time and when indexable | No background rewrite is required; public queries evaluate the timestamp. |
| Published | Visible | Included when indexable | Can be edited with updated timestamp and preview. |
| Unpublished | Hidden | Excluded | Retained for restoration or revision. |

## Structured page sections

The initial section vocabulary is `richText`, `statement`, `decisionList`, `checklist`, `faq`, `image`, `awardProof`, `reviewProof`, `relatedLinks`, `contactPanel` and `cta`. Each section record includes a stable `type`, a `version`, an optional heading and a typed payload. Unknown future section types remain exportable even if another platform requires a different renderer.

## Relationship model

Explicit join tables connect pages to services, locations, articles and CTA presets. Reviews can be placed on the homepage, service pages, broker profiles and location pages without duplicating text. Articles can relate to multiple services and other articles. Brokers can relate to expertise and genuine service locations. These relationships export as both IDs and slugs.

## Export contract

An admin-only content export will return a versioned JSON object containing export metadata, all public-content records, relationships, non-secret settings and schema documentation. A second media manifest will list every referenced asset with its filename, URL, storage key, metadata and related record IDs. Leads will have a separate authorised export and will never be included in the public-content package.

## Central integrations

GA4, Google Tag Manager, Search Console verification, Meta Pixel, future advertising tags, email delivery, public review data and call tracking use central configuration. Public, non-secret IDs may be stored as settings or environment variables. Provider tokens and keys remain server-side secrets and are excluded from exports, logs and client bundles.

## Publishing behaviour

Public article and page queries return only records that are published now, not merely records labelled published in the future. Topic indexes, related-content queries, structured data and dynamic sitemap output use the same publication predicate. This keeps draft and scheduled content out of public indexes without a separate file-generation process.

## GitHub and independent hosting

The repository will document the frontend, server, database schema, migrations, required environment variables, storage expectations, build command, deployment command, data export process, media export process and restore sequence. Platform-provided authentication, storage URLs and database connection details will be clearly identified so an independent host can replace them without rebuilding the public information architecture.
