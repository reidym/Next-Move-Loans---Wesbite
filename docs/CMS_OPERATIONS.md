# CMS operations

The secure CMS is available at `/admin`. Authentication uses the project’s managed login. The project owner is promoted automatically; additional editors should be granted the `admin` role deliberately rather than sharing credentials.

## Admin areas

| Area | What an administrator can manage |
| --- | --- |
| Overview | Current content, approved reviews, active awards, new leads and operational shortcuts. |
| Content | Standard pages and articles, status, schedule, SEO title, meta description, indexability, sections and related records. |
| Brokers | Reusable biographies, roles, expertise, contact details, service areas, bookings and profile media. |
| Reviews | Source-attributed public Google records or manually approved records, placements and activation. No review wording, rating or identity should be invented. |
| Awards | Awarding body, category, year, exact recognition level, source and badge media. Finalist records must not be presented as wins. |
| Content blocks | Reusable, placement-aware structured content. |
| Media | Managed object-storage uploads with file name, mime type, alternative text, caption and credit. |
| Settings | Contact details, booking links, analytics IDs, call-tracking controls and conversion mappings. Public settings must not contain secrets. |
| Leads | Light enquiries and operational status. No financial documents or detailed financial data are collected. |
| Export | Full structured export and media manifest for GitHub-backed portability and recovery. |

## Publishing states

| Status | Public behaviour |
| --- | --- |
| Draft | Visible only in the CMS. It is excluded from public APIs, sitemap, related articles and topic hubs. |
| Scheduled | Public only after the stored UTC publication time has elapsed. |
| Published | Public immediately when the page is indexable and otherwise valid. |
| Unpublished | Removed from public APIs and discovery surfaces without deleting the record. |

Before publishing a time-sensitive finance, policy, tax, grant, Budget or market article, confirm every date-dependent claim and update the source notes. The two supplied Budget email adaptations remain drafts for that reason.

## Article workflow

Create the article record with a unique slug, clear title, one-paragraph summary, audience eyebrow, decision topic, tags, author, read time and structured sections. Complete the SEO title and meta description, then choose draft, scheduled or published. Published articles automatically update the Learning Centre, relevant decision hubs, related perspectives, article schema and the dynamic sitemap.

## Review workflow

Use only public Google review data or reviews explicitly supplied and approved by the business. Store the source URL or external identifier when available, retain the original wording, and activate only after attribution and permission are clear. The website deliberately shows a transparent empty state when no approved reviews exist.

## Export workflow

Open **Export** and download both the complete CMS export and the media manifest before a migration, major schema change or external handoff. Store one copy outside the website account. The complete export contains the database content model; the media manifest explains where media is stored and where each item is used.

