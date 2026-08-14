# Next Move Loans — Site Architecture

## Experience hierarchy

The public experience follows the brand sequence **Why → How → What → Proof → Learn → Conversation**. This allows the homepage to behave like a premium consumer-brand introduction while the deeper architecture supports service, location, and educational search intent.

| Layer | User question | Website response |
| --- | --- | --- |
| Why | “Do they understand what I am trying to achieve?” | Brand belief, the enemy of uncertainty, and the “What are you building?” question. |
| How | “How will they help me make the decision?” | The Approval Method™ and the Next Move Framework™. |
| What | “Can they actually handle my situation?” | Grouped service hubs and specialist service pages. |
| Proof | “Why should I believe them?” | Verified credentials, team, reviews, lender panel, recognition, and future case studies. |
| Learn | “Can they teach me something useful now?” | Decision-led topic hubs, articles, FAQs, and future calculators. |
| Conversation | “What is the easiest useful next step?” | Plan Your Next Move and Book a Call pathways. |

## Primary navigation

The top-level navigation remains intentionally concise: **Why Next Move**, **How We Work**, **Finance**, **Learn**, **Locations**, and **Plan Your Next Move**. Service depth is exposed through a structured mega-menu and the footer rather than crowding the header.

## Proposed sitemap

### Brand and conversion

| Route | Page purpose | Initial status |
| --- | --- | --- |
| `/` | Premium brand homepage following Why → How → What. | Build now |
| `/approval-method` | Detailed explanation of the four-step branded process. | Build now |
| `/about` | Brand story, principles, and scalable business positioning. | Build now |
| `/team` | Team index with room for future brokers and support staff. | Build now |
| `/team/martin-reidy` | Verified founder authority page for Martin “Marty” Reidy. | Build now |
| `/reviews` | Review-ready page without fabricated or unverified content. | Build now |
| `/contact` | Contact pathways and important information prompts. | Build now |
| `/plan-your-next-move` | Short, low-friction planning form. | Build now |
| `/book-a-call` | Booking-integration placeholder with clear expectations. | Build now |

### Finance hubs and services

| Hub route | Child routes |
| --- | --- |
| `/finance/home-property` | `/home-loans`, `/refinancing`, `/first-home-buyers`, `/upgrading`, `/construction-loans`, `/bridging-finance`, `/acreage-rural-finance` |
| `/finance/investment` | `/investment-property-loans`, `/equity`, `/portfolio-lending`, `/smsf-property-lending` |
| `/finance/business-commercial` | `/self-employed-home-loans`, `/business-finance`, `/commercial-property-finance`, `/working-capital` |
| `/finance/asset` | `/asset-finance`, `/vehicle-finance`, `/equipment-finance`, `/machinery-finance` |

Every service page will use a reusable template with a challenger opening, decision context, “what may stand in the way” section, practical fit indicators, Approval Method™ summary, FAQs, related learning, and a situation-specific CTA.

### Learning and resources

| Route | Purpose |
| --- | --- |
| `/learn` | Learning Centre index with topic filters and editorial features. |
| `/learn/home-property` | Home and property topic hub. |
| `/learn/investment` | Investment and equity topic hub. |
| `/learn/business` | Self-employed, business, and commercial topic hub. |
| `/learn/asset-finance` | Vehicles, equipment, machinery, and working-capital content. |
| `/learn/:article-slug` | Reusable article template with author, dates, related service, and FAQs. |
| `/case-studies` | Case-study index that remains empty until verified client stories are approved. |
| `/case-studies/:slug` | Reusable verified case-study template. |
| `/calculators` | Calculator-ready resource hub; initial version explains what will be added. |

### Locations

| Route | Initial rationale |
| --- | --- |
| `/locations` | Clear service-area index without implying offices. |
| `/locations/south-gippsland` | Core regional authority hub. |
| `/locations/leongatha` | Historic operating presence and strongest local proof base. |
| `/locations/inverloch-bass-coast` | Distinct coastal, holiday-home, renovation, and lifestyle-move intent. |
| `/locations/warragul-drouin` | Regional growth, construction, tree-changer, and self-employed focus. |
| `/locations/pakenham-officer` | New estates, first-home buyers, construction, and upgrading focus. |

Korumburra, Wonthaggi, Beaconsfield, Berwick, and Narre Warren remain explicitly listed as serviced areas. Standalone pages should be created after unique local evidence, photography, case studies, or search data earns them.

### Trust, compliance, and technical pages

| Route or file | Purpose |
| --- | --- |
| `/important-information` | Credit representative, commission, fee, complaint, and licence placeholders for approval. |
| `/privacy` | Privacy-policy placeholder. |
| `/credit-guide` | Credit-guide placeholder and launch dependency. |
| `/accessibility` | Accessibility commitment and contact route. |
| `/404` | Branded recovery page with high-value escape routes. |
| `/sitemap.xml` | Crawlable route inventory. |
| `/robots.txt` | Crawl directives and sitemap location. |

## Internal linking model

Every service page links upward to its hub, sideways to closely related services, forward to two or three relevant articles, and geographically to the most relevant regional hub. Articles link back to one primary service page and one next-step CTA. Location pages link to locally meaningful services rather than every service indiscriminately. Broker profiles link to the services and regions supported by verifiable experience.

## Metadata framework

Each route will define a unique title, description, canonical path, social title, social description, and page type. Titles prioritise the customer decision and service rather than repeating “mortgage broker” mechanically. Location metadata uses “serving” language unless a genuine office is confirmed.

## Canonical and redirect strategy

The preferred origin is `https://nextmoveloans.com.au`. Every indexable page receives a self-referencing canonical. Trailing-slash and `www` variants should redirect consistently at the hosting layer. Historic YBR URLs require a final redirect map once ownership and migration timing are confirmed; no redirects should be guessed from the old franchise site without access to analytics and the final launch arrangement.

