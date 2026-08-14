# Next Move Loans refined project delivery

**Delivery date:** 14 August 2026  
**Project state:** review-ready preview; intentionally not published

## Delivered outcome

Next Move Loans is now a responsive, solution-first marketing site and secure full-stack publishing platform. It retains the approved **Pathfinder Editorial** brand system while simplifying the homepage, surfacing six finance pathways early, strengthening verified proof, adding useful town/service content, and removing the decorative bugs and template-like repetition identified during review.

The public experience is backed by a role-protected CMS, export-first relational model, managed media library, light enquiry workflow, compliant review controls, dynamic article/topic publishing, centrally configured marketing integrations, production security headers, and documented portability and recovery procedures.

## Current scope

| Area | Delivered |
| --- | --- |
| Public brand | Simplified homepage, About, Approval Method™, team/founder, awards/reviews, contact, booking, legal review states, accessible 404. |
| Solutions | Six early decision hubs and ten priority problem-specific pages for first home, investment, renovation, debt consolidation, next home, business growth/premises, equity release, bridging, and construction. |
| Finance | Dedicated loan-type index, four finance hubs, and nineteen service templates. |
| Locations | Specific Leongatha, Warragul, and Berwick pages with confirmed-office versus service-area distinction and durable official context. |
| Learning | CMS-backed Learning Centre, seven published evergreen perspectives, two verification-gated drafts, recent content, related articles, and active topic hubs. |
| Proof | Four exact supplied finalist recognitions; approved-only review records with placement and deactivation controls; zero invented testimonials. |
| Conversion | Persisted low-friction form, direct phone/email paths, Discovery Call and Game Plan links, anti-spam controls, truthful delivery status, admin lead triage/export/deletion. |
| CMS | Pages/articles, brokers, reviews, awards, reusable blocks, media, settings, relations, leads, scheduling, SEO, exports, and role enforcement. |
| SEO | Metadata, canonical/Open Graph controls, index rules, dynamic sitemap, robots, breadcrumbs, FinancialService/Person/Service/CollectionPage/BlogPosting/FAQ schemas, related content, crawler-correct 404 status. |
| Performance | 19.4 KB gzip public entry, 19.6 KB gzip CSS, self-hosted Figtree, compressed responses, route splitting, lightweight public APIs, optimised responsive imagery. |
| Portability | Private-GitHub handoff instructions, database migrations, content/media exports, configuration inventory, staging/release workflow, migration plan, backup/recovery runbook. |

## Verified quality

| Evidence | Result |
| --- | --- |
| Vitest | 26 tests passed across 12 files |
| TypeScript | PASS |
| Production build | PASS |
| Rendered route audit | 15/15 routes passed |
| Internal links | 57 inspected; 0 unknown |
| Images | 10 inspected; 0 broken |
| Sitemap | 68 current URLs; drafts excluded |
| Lighthouse | 95 Performance, 100 Accessibility, 100 Best Practices, 100 SEO |
| Lab metrics | FCP 1.5 s, LCP 2.6 s, TBT 130 ms, CLS 0 |
| Desktop/mobile visual QA | PASS at 1280 × 800 and 360 × 800 |
| Pre-launch backup | Uploaded, re-downloaded, parsed, and SHA-256 verified |

The definitive matrix is in `pre-launch-audit.md`; machine-readable and visual evidence is under `qa/`.

## Remaining launch inputs

The platform is structurally complete, but publication remains blocked on business-controlled inputs:

1. Final privacy, credit, representative/licence, aggregator, commission, complaint/AFCA, and approved disclaimer wording.
2. `RESEND_API_KEY` and an approved sender identity to activate the completed email adapter for stored enquiries.
3. Approved public review records or a public-data-only Google reviews provider/feed.
4. Production analytics, advertising, Search Console, and call-tracking values if used at launch.
5. Verified legacy URL inventory and redirect map.
6. Connection to the user-owned private GitHub repository.
7. Production domain/DNS approval, final smoke test, and activation of the deployment-gated daily backup schedule.

## Key delivery documents

| File | Purpose |
| --- | --- |
| `pre-launch-audit.md` | Definitive PASS / FIX / NOT YET SUPPLIED matrix. |
| `performance-qa.md` | Bundle, Lighthouse, route, responsive, accessibility, security, and backup evidence. |
| `README.md` | Architecture, commands, environment, integrations, portability, and recovery index. |
| `docs/CMS_OPERATIONS.md` | Editorial and operational CMS workflow. |
| `docs/CONFIGURATION_SHEET.md` | Central settings and environment-variable inventory. |
| `docs/GITHUB_STAGING_AND_RELEASE.md` | Private GitHub ownership and preview-to-production process. |
| `docs/PORTABILITY_MIGRATION_AND_RECOVERY.md` | Independent-host migration and disaster recovery. |
| `launch-review-checklist.md` | Remaining owner/compliance/operations approvals. |
| `competitive-opportunity-report.md` | Benchmark, local-market, SEO, and strategic findings. |

## Recommended next action

Review the final preview and `pre-launch-audit.md`, then supply the remaining legal/compliance, email, review, analytics, redirect, GitHub, and domain inputs. After those are approved, create a launch checkpoint, publish through the project UI, activate the daily backup schedule, submit the sitemap, and run the documented production smoke test.
