# Production performance and quality evidence

## Verified production payload

The final isolated production build uses a production-only Preact compatibility alias, route-level code splitting, a lightweight public REST layer, deferred secure-admin providers, self-hosted Figtree, HTTP compression, responsive images, and no production visual-editor/debug runtime.

| Budget item | Final measured result | Status |
| --- | ---: | --- |
| Initial HTML, gzip | 602 bytes | **PASS** against 100 KB target |
| Initial public JavaScript entry, gzip | 19,366 bytes | **PASS** against 150 KB target |
| Public CSS, gzip | 19,586 bytes | **PASS** against 50 KB target |
| Self-hosted Figtree variable font | 10,280 bytes | **PASS**, one family and one font file |
| Secure admin transport/UI | Deferred behind `/admin` | **PASS** |
| Hero 1440 WebP | 108 KB | **PASS** against 150–200 KB target |
| Hero 960 WebP | 53 KB | **PASS** |
| Framework 1280 WebP | 126 KB | **PASS** |
| Canvas 1280 WebP | 103 KB | **PASS** |
| Horizontal logo WebP | 12.6 KB | **PASS** |
| Reversed horizontal logo WebP | 10.8 KB | **PASS** |

Public routes do not eagerly load React Query, tRPC, superjson, authentication, toast/tooltip providers, or CMS controls. Public CMS data uses small JSON endpoints; authenticated admin routes retain typed tRPC and role enforcement. Calendly uses direct/on-demand pathways, and analytics/ad providers remain absent until configured and consented.

## Lighthouse lab result

The definitive stable production run was measured in headless Chromium against the isolated production server.

| Category or metric | Result |
| --- | ---: |
| Performance | **95** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |
| First Contentful Paint | 1.5 s |
| Largest Contentful Paint | 2.6 s |
| Total Blocking Time | 130 ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 1.5 s |
| Total transfer | 189 KiB |
| Console errors | 0 |

This is reproducible lab evidence, not field Core Web Vitals. LCP is close to the 2.5-second “good” boundary and must be monitored after production traffic creates field data. No claim is made that unpublished preview results guarantee every device/network outcome.

## Rendered route and crawl audit

The automated production audit rendered 15 representative routes in Chromium and checked status, titles, descriptions, canonical/noindex directives, exactly one H1, JSON-LD parsing, image alternative text, form controls, internal links, assets, sitemap, and security headers.

| Check | Result |
| --- | ---: |
| Representative routes | 15 passed |
| Dynamic sitemap URLs | 68 |
| Internal links inspected | 57 |
| Unknown internal links | 0 |
| Image sources inspected | 10 |
| Broken images | 0 |
| Duplicate titles | 0 |
| Duplicate descriptions | 0 |
| Unknown route status | HTTP 404 |
| Unpublished CMS route status | HTTP 404 |

The dynamic sitemap includes current solution, service, loan-type, location, Learning Centre, publish-ready article, and active topic-hub routes. Draft, future-scheduled, unpublished, non-indexable, obsolete shire/corridor, and verification-gated Budget pages are excluded.

## Responsive and accessibility verification

Final full-page desktop captures at 1280 × 800 and mobile captures at 360 × 800 covered the homepage, Learning Centre, topic hub, enquiry form, Leongatha page, and secure CMS entry. Titles wrap correctly, the reported mobile clipping is absent, forms remain readable, sticky call access remains available, and no horizontal overflow or removed decorative artefacts returned.

Accessibility reached 100 after correcting small-text contrast, preserving keyboard focus, labelling form controls, retaining reduced-motion support, supplying image alternative text and intrinsic dimensions, and keeping heading structure logical.

## Security and delivery verification

Production responses use gzip/br compression where supported and emit a provider-aware Content Security Policy, strict referrer policy, restricted permissions policy, `nosniff`, cross-origin opener policy, and HSTS. The scheduled backup endpoint rejects ordinary callers with HTTP 403. A real pre-launch backup was uploaded, downloaded, parsed, and checksum-verified before being catalogued.

Reports are stored under `qa/`, including the rendered production audit and Lighthouse HTML/JSON evidence.

