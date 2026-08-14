# Next Move Loans — Website QA Summary

**Author:** Manus AI  
**Review date:** 12 August 2026

## Outcome

The website has passed TypeScript validation and a production build after the final visual-review revisions. The implemented experience includes the brand homepage, Approval Method™, About, team and founder authority pages, four finance hubs, 19 reusable service pages, a Learning Centre and article template, priority regional hubs, conversion pages, review-ready and calculator-ready states, trust placeholders, structured SEO, analytics-ready events, and branded error recovery.

## Validation evidence

| Check | Result | Notes |
| --- | --- | --- |
| TypeScript | Passed | `pnpm check` completed with no errors. |
| Production build | Passed | Vite and server bundle completed successfully. |
| Route-level code splitting | Passed | Page modules now build as separate route chunks. The shared root chunk remains slightly above Vite’s advisory 500 kB threshold but is gzip-compressed and does not block the build. |
| Desktop visual review | Passed | Full-page captures reviewed at 1440 × 1000 for the homepage, Approval Method, Home & Property hub, Bridging Finance service page, and Learning Centre. |
| Mobile visual review | Passed | Full-page captures reviewed at 390 × 844 for the homepage, Plan Your Next Move, and Locations. |
| Critical asset availability | Passed | Approved logos, hero artwork, Framework, Canvas, and five replacement editorial photographs returned HTTP 200 during QA. |
| Responsive navigation | Passed visually | Desktop menus, mobile menu control, footer routes, and sticky mobile actions are implemented. Fixed mobile actions are intentionally excluded from full-page screenshots by the capture system. |
| Conversion transparency | Passed | The preview form does not claim to submit or store data. Booking and CRM endpoints remain explicit review-cycle integrations. |
| Review and case-study safety | Passed | No fabricated review, rating, testimonial, award, or client case study appears in the build. |

## Accessibility implementation

The frontend includes a skip link, semantic landmarks, labelled navigation, keyboard-reachable controls, visible focus states, structured headings, descriptive image alternatives, form labels and required states, an explicit reduced-motion mode, high-contrast paper/navy surfaces, and non-colour directional markers. Final accessibility validation should include manual keyboard testing, browser zoom, screen-reader spot checks, and a production automated audit after the live domain is connected.

## SEO implementation

Each public route sets a unique title, description, canonical URL, Open Graph fields, Twitter fields, and route-appropriate index directive. Structured data is implemented for the organisation, founder, services, articles, and breadcrumbs. Priority location pages use WebPage/Place context rather than falsely declaring a separate LocalBusiness office.

The static build includes `robots.txt` and `sitemap.xml`. Placeholder reviews, case studies, calculators, privacy, credit-guide, and incomplete disclosure pages are marked `noindex` and have been removed from the XML sitemap until approved content or integrations exist.

## Design review outcome

The independent style review confirmed that the Pathfinder Editorial direction is clearly expressed through the typographic scale, navy/paper/coral system, numbered hierarchy, challenger voice, wayfinding language, and Approval Method composition. Its accepted recommendations were implemented in one build-on-top pass: a continuous route spine now runs through major desktop pages; service, article, and related-content directories use route nodes and coordinates; internal service heroes vary by category; plan textures were added; and coral was reduced from a large flat statement block to decisive action and directional use.

## Known launch dependencies

| Dependency | Why it remains open | Required decision or input |
| --- | --- | --- |
| Credit and legal disclosures | The new legal entity, licence or credit-representative arrangement, aggregator, commissions, fees, complaint process, and AFCA details were not supplied. | Approved exact wording and documents. |
| Contact details and office claims | Historic information should not be carried into the new brand by assumption. | Final phone, email, business address, public office status, and response expectations. |
| Booking integration | The production booking URL was not supplied. | Approved calendar provider and destination URL. |
| CRM or secure form destination | A frontend-only preview cannot safely transmit or store enquiries without a confirmed endpoint and privacy model. | CRM/email provider, fields, consent wording, error handling, and success behaviour. |
| Google reviews and ratings | Existing public review evidence has not yet been verified for the new brand and permissions. | Approved Google Business Profile or review provider, current totals, and usage approval. |
| Awards and recognition | Historical awards shown on third-party or franchise pages require recency and usage verification. | Approved names, years, issuer links, and artwork rights. |
| Team expansion | Only Martin Reidy’s public qualifications and experience were verified. | Approved biographies, credentials, portraits, roles, service areas, and contact preferences. |
| Case studies | No client stories were supplied with verification and permission. | Approved anonymised or attributed cases using the prepared Situation → Complication → Strategy → Outcome template. |
| Calculators | Tool architecture is ready, but provider, methodology, disclaimers, and maintenance ownership are undecided. | Approved calculator source and compliance review. |
| Legacy redirects | Final ownership, analytics, backlink data, and migration timing for historic Yellow Brick Road URLs are unknown. | Exported URL inventory, Search Console/analytics data, and domain control. |
| Owned photography | Stable editorial photography is used where generated supporting images failed. | Replace with approved owned team, client-neutral, regional, property, and business photography when available. |
| Analytics and consent | Provider-agnostic intent events are ready, but production privacy and attribution settings need approval. | Provider choice, consent rules, internal filters, campaign taxonomy, and final success events. |

## Recommended review sequence

First approve legal and contact information, because those details affect every conversion and footer surface. Next connect the booking and CRM destinations, then verify reviews, awards, team information, and imagery. After those high-trust elements are approved, complete the redirect map, connect production analytics, test successful enquiry and booking flows, run a live-domain accessibility and performance audit, and submit the final sitemap through the relevant webmaster tools.

