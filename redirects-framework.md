# Next Move Loans — Redirects Framework

## Canonical origin

The preferred production origin is `https://nextmoveloans.com.au`. The final hosting configuration should enforce HTTPS, choose either the apex or `www` host as the single canonical host, and normalise trailing-slash behaviour consistently.

## Redirect principles

Permanent redirects should be created only when an old URL has a genuine new equivalent. A service page should redirect to the closest matching Next Move service page, while outdated generic or campaign content should redirect to a relevant hub rather than forcing every URL to the homepage.

| Legacy pattern | Proposed destination logic | Status |
| --- | --- | --- |
| Existing `nextmoveloans.com.au/lander` | `/` | Ready after the new site replaces the current blank lander. |
| Historic YBR home-loan service URL | Matching `/services/...` page | Requires exported legacy URL inventory and migration approval. |
| Historic YBR broker/team URL | `/team/martin-reidy` or `/team` | Requires confirmation that the franchise domain can be redirected. |
| Historic YBR location content | Matching regional or Leongatha hub | Requires analytics and backlink review before mapping. |
| Expired campaign URLs | Closest relevant service or Learning Centre article | Review individually; do not bulk-redirect to home. |
| Parameter and tracking variants | Canonical clean route | Preserve only necessary campaign parameters. |

## Pre-launch migration process

The final redirect map should be created from a crawl or export of the old site, Google Search Console data, analytics landing pages, known campaign URLs, and backlink evidence. Each old URL should be assigned a destination, response code, owner, and test status. Redirect chains and loops must be removed before launch.

The current static build includes canonical tags, sitemap.xml, robots.txt, and stable route paths. Hosting-layer redirects remain a launch action because the current Yellow Brick Road domain, franchise control, and desired transition timing have not been confirmed.

