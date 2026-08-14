# Next Move Loans — Refinement Audit

## Confirmed direction

The next version should keep the strategic distinction of **clarity before commitment**, but present it with less visual ceremony and faster access to the visitor’s actual need. The homepage should become shorter, cleaner, more useful above the fold, and less dependent on repeated process language. The chosen operating model is a **built-in secure CMS** with a private GitHub-owned codebase and clean, documented content and media exports.

## Evidence summary

| Source | Decision supported |
| --- | --- |
| User refinement notes | Simplify the homepage; move Purchase, Refinance, Investment, Business, Agri and Asset choices earlier; show real phone details; reduce booking emphasis; add verified awards and public reviews; remove case studies; build solution-specific pages; add a secure CMS; and meet explicit performance, SEO, portability and launch requirements. |
| Supplied HTML reference | Favour a compact header, simple value proposition, trust strip, clear audience/solution choices, a concise four-step method and a single reusable closing CTA rather than a long sequence of equally weighted brand sections. |
| Marketing avatars | Prioritise the Ambitious Upgrader, Emerging Property Builder, Regional Lifestyle Mover and Business Owner Building More. Lead with the decision tension, not product features or lender counts. |
| Campaign emails | Use short paragraphs, direct hooks, a clear contradiction or trade-off, plain English, grounded consequences and a practical conclusion. Preserve the confident challenger voice without importing unverified political, tax, market or policy claims into evergreen pages. |
| Mobile screenshot | The internal hero title is too large and insufficiently constrained at narrow widths; decorative route marks and the current composition make the problem look worse. |
| Award assets | Four distinct finalist claims can be displayed accurately; none may be described as a win. |

## Exact proof available

| Recognition | Accurate website wording |
| --- | --- |
| Latrobe Health Services Gippsland Business Awards 2026 | **Finalist — Business & Professional Services** |
| The Adviser Australian Broking Awards 2025 | **Finalist — Regional Broker of the Year** |
| The Adviser Australian Broking Awards 2025 | **Finalist — Regional Office of the Year** |
| MFAA Excellence Awards 2026 | **State Finalist — Regional Finance Broker Award** |

The proof system should use the supplied high-resolution badges with concise text labels, accessible alternatives, dates and awarding bodies. The badges should support credibility without dominating the homepage or implying endorsement, ranking or victory beyond the artwork.

## Homepage correction

The revised homepage should follow this order: a concise ambition-led hero with direct phone access; an early six-path solution chooser; a compact verified proof band for awards and public reviews; a short Approval Method explanation; a focused founder/why section; three useful Learning Centre articles; and one final planning CTA. The current uncertainty question field, large comparison band, long location route map, repeated booking CTA and oversized editorial section count should be removed or significantly compressed.

## Global visual correction

The following treatments should be removed across the public site: the homepage grid overlay, internal-page grid backgrounds, the repeating left-edge route spine, decorative route dots, unnecessary vertical labels, and typographic quotation marks used as decoration around headings or question lists. Route meaning should remain through hierarchy, arrows, concise labels and interaction—not through marks that resemble rendering bugs.

On mobile, hero and page titles need a narrower maximum size, safer line breaking, `min-width: 0`, and no absolute decoration that can widen the layout. All public pages should be retested at 320, 375 and 390 pixels before delivery.

## Solution and content architecture

The six primary entry paths are **Purchase, Refinance, Investment, Business, Agri and Asset**. Within those, the highest-priority solution pages are buying a first home, buying a first investment property, renovating, refinancing to consolidate debt, buying the next home, funding business growth, purchasing business premises, refinancing to release equity, using bridging finance and building a home.

The marketing avatars determine the message hierarchy. Upgraders need keep/sell/build/bridge/equity comparisons. Emerging investors need capacity, equity, lender sequence and portfolio structure. Regional lifestyle movers need property-acceptability, acreage, zoning, valuation and construction guidance. Business owners need financial interpretation, evidence strategy, working capital, premises and growth-finance content.

Location content should lead with towns and suburbs that people actually identify with, beginning with Leongatha, Warragul and Berwick. Regional context may appear naturally inside the copy, but council- or shire-led pages should not be the primary search architecture. New location pages must contain unique local evidence, relevant property or business context, genuine service availability and useful nearby-area relationships.

## Founder narrative

Martin Reidy’s profile should move from a credential list to a clearer story: the business began in Berwick; the move to Leongatha reconnected him with country roots; the local branch was created to give people real choice; the client base extends beyond one region; and the mission is to help like-minded people build the life or business they want. The story should acknowledge that better advice changed his own trajectory and name **uncertainty** and exploitation as the enemies, without overclaiming personal outcomes.

## Conversion and contact decisions

The public phone details are **03 5639 9204** and **0417 690 985**. The email is **unlock@nextmoveloans.com.au** and the confirmed address is **19 Bair Street, Leongatha VIC 3953**. Discovery calls should link to `https://calendly.com/martin-reidy/discovery-call`; Game Plan sessions should link to `https://calendly.com/martin-reidy/strategysession`. Calendly should be opened through direct links or on-demand loading so its scripts do not affect every page.

The lead form should collect only name, email, mobile, service/enquiry type and an optional message. It must not collect payslips, identification, tax returns, bank statements or other detailed financial documents. A database record and clear delivery status should be retained. Email delivery will be configured server-side through an approved provider secret rather than exposing credentials in the browser.

## Reviews decision

The public site may display public Google review data or reviews explicitly supplied and approved by the business. It must not request owner/manager OAuth access to the Google Business Profile or modify that profile. The CMS should also support approved review records with attribution, service context, placement controls and deactivation. No review wording, rating, count or outcome may be invented.

## CMS and portability acceptance criteria

The CMS should store structured articles, brokers, approved reviews, reusable content blocks, media references, SEO fields, relationships, publication states and timestamps in explicit tables. Scheduled content can become public when its `publishAt` time is reached without rewriting code. Public queries, indexes, structured data and sitemap output should use only publish-ready, indexable records.

Portability requires an authenticated JSON content export, a media manifest, documented schema and relationships, an environment-variable inventory without secrets, build and migration instructions, and a disaster-recovery section. Business content must not be trapped in opaque framework-specific blobs. The code will remain ready for a private GitHub connection, while repository ownership and final push require the user to connect the intended account through the project settings.

## Performance implications

The performance target requires one font family with fewer weights, smaller route chunks, compressed responsive images, no globally loaded Calendly or review widget scripts, and no analytics tags until configured. The current client-side application is unlikely to meet the requested compressed initial-JavaScript target without further dependency and rendering review. The final audit will report PASS, FIX or NOT YET SUPPLIED against the full budget rather than claiming an unmeasured score.

