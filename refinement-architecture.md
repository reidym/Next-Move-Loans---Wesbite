# Next Move Loans — Refined Public Architecture

## Experience principle

The public website should answer three questions in order: **What are you trying to do? What is making that difficult? Why should Next Move Loans help?** The first version successfully established the brand belief, but the refined version will move the visitor’s solution choice ahead of the longer brand story.

## Primary navigation

| Navigation group | Destinations | Purpose |
| --- | --- | --- |
| **Solutions** | Purchase, Refinance, Investment, Business, Agri & Rural, Asset | Lets visitors self-select by the move they are making before learning product terminology. |
| **Loan Types** | Home loans, first-home lending, refinancing, bridging, construction, investment, self-employed, business, commercial property, working capital, asset, vehicle, equipment and machinery finance | Makes the product taxonomy explicit and search-friendly. |
| **Why Next Move** | The Approval Method™, About, Marty Reidy, Awards & Reviews | Explains method, founder, philosophy and verified proof. |
| **Learn** | Learning Centre and calculators | Builds authority through useful content and practical tools; case studies are removed from the primary architecture. |
| **Locations** | Leongatha, Warragul and Berwick at launch; additional towns only when useful content is available | Supports genuine town and suburb intent without shire-led or cloned pages. |

The utility actions are a direct phone link and **Plan Your Next Move**. Calendly remains available on conversion and founder pages but is no longer a repeated primary navigation emphasis.

## Homepage composition

| Order | Section | Content decision |
| --- | --- | --- |
| 1 | Concise hero | Use one strong promise, one short explanatory paragraph, one primary planning CTA, one direct phone action and the existing hero artwork. Do not use a grid overlay or a second booking CTA. |
| 2 | Six solution paths | Display Purchase, Refinance, Investment, Business, Agri and Asset immediately as clear, tappable choices with one-sentence outcomes. |
| 3 | Verified proof | Present the four supplied finalist recognitions accurately and provide a contained area for public Google review evidence once the listing/place identifier is confirmed. |
| 4 | Problems we solve | Feature the Ambitious Upgrader, Emerging Property Builder, Regional Lifestyle Mover and Business Owner Building More through real tensions and direct links to solution pages. |
| 5 | The Approval Method™ | Compress the four steps into a clear horizontal or stacked explanation with one link to the full method. |
| 6 | Founder and contact | Tell the Berwick-to-Leongatha story, explain the mission and show phone, email and address without forcing a booking flow. |
| 7 | Learning Centre | Feature three useful, specific articles written in the supplied short, direct, trade-off-led voice. |
| 8 | Final action | Invite the visitor to start a light enquiry or phone the office. |

## Solution routes

| Hub | Route | Priority child solutions |
| --- | --- | --- |
| Purchase | `/solutions/purchase` | First home, next home, renovation, construction, bridging/buy-before-sell. |
| Refinance | `/solutions/refinance` | Debt consolidation, equity release, loan restructure, cash-flow reset. |
| Investment | `/solutions/investment` | First investment, next investment, portfolio capacity, equity strategy. |
| Business | `/solutions/business` | Growth funding, term loan, line of credit, business premises, self-employed borrowing. |
| Agri & Rural | `/solutions/agri-rural` | Acreage/lifestyle property, regional construction, machinery and rural property acceptability. |
| Asset | `/solutions/asset` | Vehicle, equipment and machinery finance. |

The ten user-requested high-priority detail routes are `/solutions/first-home`, `/solutions/first-investment-property`, `/solutions/renovating-a-home`, `/solutions/refinance-debt-consolidation`, `/solutions/buying-your-next-home`, `/solutions/fund-business-growth`, `/solutions/business-premises`, `/solutions/release-equity`, `/solutions/bridging-finance`, and `/solutions/building-your-home`.

## Loan-type routes

Loan types remain separate from solutions. A solution page explains a problem and decision path; a loan-type page explains how a facility works, where it may fit, trade-offs, evidence, costs or policy variables, and related solutions. This prevents the site from forcing every visitor to understand lender terminology before they can find help.

## Location strategy

The launch hierarchy is `/locations`, `/locations/leongatha`, `/locations/warragul` and `/locations/berwick`. Leongatha can state the confirmed 19 Bair Street address. Warragul and Berwick are genuine service areas but should remain clearly labelled as service-area pages until a physical office is confirmed. Nearby towns should appear as supporting context inside useful pages rather than receiving thin standalone routes automatically.

## Proof strategy

Awards and reviews are separate evidence types. Awards should show the supplied badge, awarding body, year, category and the word **Finalist** or **State Finalist** exactly. Reviews should show only public Google data or records explicitly approved by an authorised admin. No aggregate rating, review count, reviewer identity or outcome may be rendered unless the source record exists.

## Page template requirements

Every solution, loan-type, location, broker and article page requires one H1, an editable SEO title, meta description, canonical URL, index setting, Open Graph fields, breadcrumbs, page-appropriate structured data, a useful primary body, related content and an explicit CTA. Sitemap inclusion is conditional on `status = published`, `indexable = true`, and `publishAt <= now`.

