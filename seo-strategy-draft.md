# Next Move Loans — SEO and Trust Strategy Draft

**Author:** Manus AI  
**Research date:** 12 August 2026

This working note records current official guidance that will shape the site’s structured data, content architecture, and compliance placeholders. It will be consolidated into the final strategy and pre-launch checklist.

## Structured-data principles

Google’s LocalBusiness documentation requires at least a business **name** and **address** for LocalBusiness rich-result eligibility, and recommends properties such as telephone, URL, opening hours, geo coordinates, ratings, and reviews when those details are accurate and present on the page.[1]

Because the supplied brief explicitly warns against implying a physical office where none exists, the initial build should use **Organization** schema for the brand and **Person** schema for verified broker profiles. LocalBusiness or a more specific subtype should only be added after the exact trading address, public-office status, opening hours, and phone details are confirmed for the new brand.

The scalable schema plan should use:

| Page type | Initial structured-data approach |
| --- | --- |
| Home | `Organization`, `WebSite`, and a primary `WebPage` entity with explicit brand, logo, URL, contact placeholders, and service-area relationships. |
| Approval Method™ | `WebPage` with clear headings and a four-step `ItemList`; avoid unsupported rich-result promises. |
| Broker profile | `Person` linked to the `Organization`, with only verified credentials, role, service areas, and same-as profiles. |
| Service page | `Service` linked to the provider organization, with audience, area served, and related learning content. |
| Location page | `WebPage` plus service-area relationships; use `LocalBusiness` only when the page represents a real staffed location. |
| Article | `Article` or `BlogPosting` with author, publisher, date published, date modified, and a canonical URL. |
| Breadcrumbs | `BreadcrumbList` on deeper routes, matching visible navigation. |
| FAQ content | Visible semantic question-and-answer sections; do not rely on FAQ rich-result eligibility as a primary traffic strategy. |

All markup should be rendered in JSON-LD, validated before launch, and kept consistent with what users can see on the page. Google warns that guideline violations can trigger manual action, so unsupported ratings, offices, credentials, or claims must never be inserted.[1]

## Consumer trust and educational content

Moneysmart defines the practical role of a mortgage broker as understanding the customer’s needs and goals, working out an affordable borrowing position, finding options, explaining loan costs and features, and managing the application through settlement. It also states that mortgage brokers must act in the customer’s best interests when suggesting a loan.[2]

The site should therefore explain the process in a way that helps prospects ask better questions. High-value trust content includes how lender panels work, why a particular loan may be recommended, how interest rates, comparison rates, features, and fees interact, what commissions may be payable, and when any direct broker fee could apply.[2]

The first build will reserve a dedicated **Important Information** area for final credit representative details, licence or aggregator relationships, commission and fee wording, privacy policy, credit guide, complaints process, and Australian Financial Complaints Authority information. These details must be supplied or approved before launch; they should not be invented from the historic Yellow Brick Road identity.

## Technical implementation priorities

The initial production structure should include semantic headings, crawlable internal links, unique metadata, canonical tags, XML sitemap, robots.txt, meaningful alt text, responsive images, and route-specific structured data. The top-level navigation should remain concise, while deeper service and content links can be exposed through a structured mega-menu and footer.

Location pages should be published only when they contain genuinely local information. The initial recommendation is to create a strong **South Gippsland** regional hub and a small number of priority town pages with verifiable local relevance, rather than cloning the same copy across every named suburb.

## References

[1]: https://developers.google.com/search/docs/appearance/structured-data/local-business "Google Search Central — LocalBusiness structured data"
[2]: https://moneysmart.gov.au/home-loans/using-a-mortgage-broker "Moneysmart — Using a mortgage broker"
