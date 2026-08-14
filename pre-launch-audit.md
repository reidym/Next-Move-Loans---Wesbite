# Next Move Loans pre-launch audit

**Audit date:** 14 August 2026  
**Audit target:** isolated production build, not the unpublished preview  
**Status vocabulary:** **PASS** means implemented and verified; **FIX** means a project defect remains; **NOT YET SUPPLIED** means launch depends on approved business information, credentials, accounts, historic URLs, production DNS, or post-launch field data that was not available to the build.

> The project has no unresolved code-level **FIX** items in this audit. It remains intentionally unpublished because several business-controlled launch inputs are **NOT YET SUPPLIED**.

## 1. Experience, navigation, and conversion

| Audit item | Status | Evidence and launch note |
| --- | --- | --- |
| Desktop layout | **PASS** | Final full-page captures completed at 1280 × 800 for the homepage, Learning Centre, topic hub, enquiry form, Leongatha page, and secure CMS entry. |
| Mobile layout | **PASS** | Final full-page captures completed at 360 × 800. The supplied screenshot’s title clipping and horizontal overflow no longer occur; navigation, cards, forms, footers, and sticky call access remain usable. |
| Navigation links | **PASS** | Automated rendered-DOM audit covered 15 representative production routes, inspected 57 internal links, and found zero unknown internal destinations. |
| Solution paths and loan-type discovery | **PASS** | Six early solution hubs, ten priority scenario pages, dedicated loan-type index, finance hubs, and service pages are routed and responsive. |
| Calls to action | **PASS** | Internal CTA destinations, direct phone links, email links, enquiry actions, and both Calendly destinations were checked. No repeated unconditional Calendly script is loaded. |
| Discovery Call booking | **PASS** | `https://calendly.com/martin-reidy/discovery-call` returned HTTP 200. |
| Game Plan booking | **PASS** | `https://calendly.com/martin-reidy/strategysession` returned HTTP 200. |
| Confirmed contact details | **PASS** | Landline `03 5639 9204`, mobile `0417 690 985`, `unlock@nextmoveloans.com.au`, and `19 Bair Street, Leongatha VIC 3953` are used consistently. |
| Lead form fields and privacy restraint | **PASS** | Form collects only move type, name, email, mobile, preferred contact, timing, optional message, and consent. It explicitly rejects sensitive-document use. |
| Lead persistence | **PASS** | Public REST and typed CMS transports share one validation/persistence service. Successful submissions receive a saved reference and truthful delivery state. |
| Lead email delivery adapter | **PASS** | A tested text-only Resend adapter targets `unlock@nextmoveloans.com.au`, uses the client email only as reply-to, and persists `sent`, `failed`, or `not_configured` truthfully without losing the stored enquiry. |
| Lead email credentials and activation | **NOT YET SUPPLIED** | The user confirmed the values are not available yet. Until `RESEND_API_KEY` and an approved `LEAD_FROM_EMAIL` are supplied, enquiries remain safely stored in the CMS, owner alerts remain available, and the interface reports that email delivery is not configured. |
| Spam controls | **PASS** | Shared hidden honeypot, minimum-completion policy, and short-window throttling protect both public form transports; covered by automated tests. |
| Lead access/deletion requests | **PASS** | Admin-only per-lead JSON export and confirmed permanent deletion controls are implemented. Customer enquiries are excluded from the general public-content export. |
| Custom 404 experience and status | **PASS** | Unknown production routes render the branded recovery shell with HTTP 404; valid public, CMS-derived, utility, and admin routes remain HTTP 200. |

## 2. Content, proof, and local relevance

| Audit item | Status | Evidence and launch note |
| --- | --- | --- |
| Homepage simplification | **PASS** | Solution choices appear immediately after the hero; repeated booking emphasis, decorative dots, grid artefacts, and false quotation marks were removed. |
| Awards | **PASS** | Four supplied 2025/2026 finalist recognitions are stored in the CMS and displayed with exact finalist language; no win is inferred. |
| Reviews system | **PASS** | Admin can add source-attributed, approved reviews, assign placements, and deactivate without deletion. Public components render only active approved records and stay empty when none exist. |
| Verified public review content/feed | **NOT YET SUPPLIED** | No customer quote, rating, or outcome was fabricated. No Business Profile owner OAuth was requested. Approved public review records or a public-data-only feed/provider are still needed before reviews appear. |
| Founder profile | **PASS** | Martin “Marty” Reidy’s story now reflects Berwick origins, country roots, Leongatha choice, national reach, better advice, opportunity, and uncertainty without inventing qualifications. |
| Location content | **PASS** | Leongatha is accurately presented as the confirmed office; Warragul and Berwick are service areas. Town-level content uses durable official context and avoids shire-first/thin-page language. |
| Learning Centre voice | **PASS** | Seven evergreen avatar-led perspectives are published through the CMS; two time-sensitive Budget pieces remain verification-gated drafts. |
| Topic hubs and related content | **PASS** | Active CMS articles automatically populate stable topic hubs, recent-content placements, related perspectives, schema, and sitemap routes. |
| Placeholder testimonials | **PASS** | Zero fabricated testimonials or ratings are published. Empty review placements render transparently. |

## 3. CMS and editorial workflow

| Audit item | Status | Evidence and launch note |
| --- | --- | --- |
| Secure administrator area | **PASS** | Authentication and admin-role enforcement protect content, brokers, reviews, awards, blocks, media, settings, leads, and exports. Admin routes use `noindex, nofollow`. |
| Article workflow | **PASS** | New/edit article flow supports draft, scheduled, published, and unpublished states; title, slug, author, dates, image, excerpt, sections/body, topic, tags, SEO, canonical, Open Graph, schema, CTA, FAQ-ready sections, and relations. |
| Broker profiles | **PASS** | Reusable broker records support biography, title, qualifications, expertise, service areas, contact, booking, profile media, articles, and future multi-broker scaling. |
| Reusable blocks | **PASS** | Versioned reusable blocks have stable keys, JSON payloads, placements, and publication states. |
| Media library | **PASS** | Managed S3-backed uploads store file metadata, public URL, storage key, alternative text, caption, credit, and usage references. File bytes are not stored in the database. |
| Publication rules | **PASS** | Draft, future-scheduled, unpublished, and non-indexable records are excluded from public queries and sitemap generation; elapsed schedules become visible automatically. |
| Non-developer usability | **PASS** | Dashboard uses focused sections and explicit save/publication controls; normal article updates do not require source-code edits. |

## 4. SEO, crawl, and structured data

| Audit item | Status | Evidence and launch note |
| --- | --- | --- |
| Titles and descriptions | **PASS** | Automated audit found complete, non-duplicated titles and descriptions across 15 representative rendered routes. CMS exposes editable values for managed pages. |
| Canonical tags | **PASS** | All representative indexable public routes returned the expected `nextmoveloans.com.au` canonical. |
| H1 and heading structure | **PASS** | Each audited route rendered exactly one H1; page sections use logical H2/H3 hierarchy. |
| Open Graph controls | **PASS** | Managed pages support editable Open Graph title, description, and image. |
| Structured data | **PASS** | FinancialService, Person, service/location, CollectionPage, BlogPosting, FAQ, Breadcrumb and page schemas are emitted only where appropriate; JSON-LD parsed without errors in the audit. |
| Sitemap | **PASS** | Database-aware `/sitemap.xml` returned 68 current routes, includes publish-ready CMS articles/topic hubs, and excludes drafts, verification-gated pieces, and obsolete shire/corridor URLs. |
| Static sitemap fallback | **PASS** | Repository fallback is aligned for portable hosting; the production endpoint remains database-aware. |
| Robots | **PASS** | Public content is crawlable; `/admin` and `/api/` are excluded. Drafts are absent from public routes and sitemap. |
| Search Console readiness | **PASS** | Central verification setting and dynamic sitemap are ready without hard-coded tokens. |
| Search Console verification token/property | **NOT YET SUPPLIED** | Add the approved verification value and production property after domain ownership is confirmed. |
| Redirect implementation | **NOT YET SUPPLIED** | Redirect framework exists, but the verified legacy URL inventory and final production redirect map have not been supplied. Do not guess historic redirects. |

## 5. Performance and accessibility

| Audit item | Status | Evidence and launch note |
| --- | --- | --- |
| Performance budget | **PASS** | HTML 602 bytes gzip; public entry JavaScript 19,366 bytes gzip; CSS 19,586 bytes gzip; self-hosted Figtree variable font 10,280 bytes. Secure admin transport/UI is route-deferred. |
| Image delivery | **PASS** | Hero WebP variants are 53 KB and 108 KB; visible award badges are optimised; compact horizontal logos are 12.6 KB and 10.8 KB. Intrinsic dimensions reduce layout shift. |
| Third-party execution | **PASS** | Calendly is link/on-demand only; analytics/ad scripts load only after configuration and consent. Development-only Manus editing/debug runtime is excluded from production. |
| HTTP compression | **PASS** | Express compression is enabled for production HTML, CSS, JavaScript, JSON, and text responses. |
| Lighthouse performance target | **PASS** | Stable production configuration measured **95 Performance**, meeting the requested 95+ mobile lab target. |
| Lighthouse accessibility | **PASS** | **100 Accessibility** after contrast, alternative-text, heading, control-label, and focus checks. |
| Lighthouse best practices | **PASS** | **100 Best Practices**, with no console errors in the measured run. |
| Lighthouse SEO | **PASS** | **100 SEO**. |
| Lab metrics | **PASS** | FCP 1.5 s, LCP 2.6 s, TBT 130 ms, CLS 0, Speed Index 1.5 s; transfer total 189 KiB in the definitive stable run. |
| Core Web Vitals field data | **NOT YET SUPPLIED** | Field CWV requires the published domain and real-user Chrome UX data. The lab proxy is strong; LCP at 2.6 s is close to the 2.5 s “good” boundary and should be monitored after launch rather than represented as field evidence. |
| Responsive visual regression | **PASS** | Final desktop and 360-pixel mobile captures passed after the performance/accessibility changes. |

## 6. Security, privacy, legal, and compliance

| Audit item | Status | Evidence and launch note |
| --- | --- | --- |
| Security headers | **PASS** | Production emits provider-aware CSP, strict referrer policy, restricted permissions policy, `nosniff`, cross-origin opener policy, and two-year HSTS. Preview framing remains limited to trusted Manus origins. |
| Admin indexing | **PASS** | Secure CMS sets `noindex, nofollow`; robots also excludes `/admin`. |
| Backup endpoint authentication | **PASS** | Ordinary POST requests receive HTTP 403; only authenticated scheduled task identities with the attached task UID can execute the daily backup. |
| Privacy page structure | **PASS** | Privacy route exists, is noindex during review, and reflects the light-form/sensitive-document boundary. |
| Final privacy policy | **NOT YET SUPPLIED** | Legal review must confirm the actual production CRM, email provider, analytics, booking, document, retention, access, correction, and complaint flows. |
| Credit guide and important information placeholders | **PASS** | Review routes and launch warnings exist and remain noindex where content is provisional. |
| Final credit/compliance details | **NOT YET SUPPLIED** | Credit representative number, ACL holder, aggregator, commissions, complaints/AFCA, privacy contact, and approved disclaimers must be supplied and legally reviewed before publication. |

## 7. Analytics, advertising, and call tracking

| Audit item | Status | Evidence and launch note |
| --- | --- | --- |
| Central analytics configuration | **PASS** | GA4, GTM, Search Console, Meta Pixel, Google Ads/Meta conversion labels, call tracking, and event mappings are centralised in admin-managed non-secret settings. |
| Consent-gated loading | **PASS** | GA4/GTM/Meta and provider-specific conversions remain absent until configured and consented. |
| Event catalogue | **PASS** | Phone, email, Calendly, review, form-start, form-submit, and success events use a provider-agnostic bridge with validated mappings. |
| Safe call tracking | **PASS** | Primary-number replacement is disabled/no-op until an approved replacement number and exact original numbers are configured. |
| Production analytics IDs and labels | **NOT YET SUPPLIED** | GA4, GTM, Search Console, Meta, Google Ads, and call-tracking production values remain empty by design. |

## 8. Ownership, portability, backup, and release

| Audit item | Status | Evidence and launch note |
| --- | --- | --- |
| Source-code portability | **PASS** | README documents React/Preact-compatible frontend, Express/tRPC server, MySQL/TiDB schema, S3 storage, scripts, build, runtime, variables, and Manus-specific replacement points. |
| Structured content export | **PASS** | Authenticated full JSON export covers pages, articles, brokers, reviews, awards, blocks, relations, settings, SEO, publication states, and timestamps. |
| Media export manifest | **PASS** | Export records original filenames, URLs, storage keys, metadata, and explicit article/broker/award/page/section usage references. |
| Database migration/recovery | **PASS** | Versioned Drizzle schema/migrations, seed scripts, export procedure, restore sequence, and disaster-recovery runbook are documented. |
| Verified pre-launch backup | **PASS** | Snapshot `backups/prelaunch/2026-08-13T06-41-09-599Z_f5730ebf.json` was uploaded, re-downloaded, parsed, and SHA-256 verified (`8a2585d7585ef51c3ab9c026758bf50dcd8969754925e2e7cbba0d4489fefee5`). |
| Daily backup foundation | **PASS** | Deployment-gated daily job, persistent snapshots, durable run catalogue, task-UID auth, and minimum 30-day retention are implemented. |
| Live daily backup schedule | **NOT YET SUPPLIED** | Activate only after production deployment, then attach the real schedule task UID using the documented helper. |
| Private GitHub ownership | **NOT YET SUPPLIED** | Repository-ready documentation and export workflow are complete. The user must connect/select the private GitHub repository in the project UI; no external repository was created or pushed without approval. |
| Staging/preview and rollback | **PASS** | Current work remains in preview; checkpoints provide version history and rollback. Publication is intentionally deferred. |
| Production domain/DNS | **NOT YET SUPPLIED** | Bind `nextmoveloans.com.au` and confirm DNS/TLS only after content, legal, integrations, email delivery, redirects, and launch approval are complete. |

## 9. Automated evidence

| Evidence | Result |
| --- | --- |
| Vitest | **26 tests passed across 12 files** |
| TypeScript | **PASS**, zero errors |
| Production build | **PASS** |
| Rendered route audit | **PASS**, 15 routes |
| Sitemap URLs | **68** |
| Internal links inspected | **57**, zero unknown |
| Image sources inspected | **10**, zero broken |
| Duplicate titles/descriptions | **0 / 0** |
| JSON-LD parse errors | **0** |
| Unknown-route HTTP status | **404** |
| Unpublished CMS route HTTP status | **404** |
| Booking URL checks | **200 / 200** |
| Security header suite | **PASS** |

## 10. Launch gate

Do not publish until the following business-controlled items are supplied and approved:

1. Final privacy, credit, complaints, licence/representative, aggregator, commission, and legal wording.
2. Transactional email credentials and approved sender identity for lead delivery.
3. Verified review records or an approved public-data-only Google reviews provider/feed.
4. Production GA4/GTM/Search Console/Meta/Ads/call-tracking values, if used at launch.
5. Verified legacy URL inventory and redirect map.
6. Private GitHub repository connection and first ownership push.
7. Production domain/DNS approval and post-publish daily-backup schedule activation.
8. Production smoke test, Search Console sitemap submission, and post-launch field CWV monitoring.

Once those inputs are supplied, the remaining work is configuration, legal/content approval, publication, and post-launch verification—not a structural rebuild.
