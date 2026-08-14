# Next Move Loans — Content Model

## Shared page vocabulary

The build will use a data-driven content system so pages share structure without repeating generic wording.

| Entity | Core fields |
| --- | --- |
| Service hub | title, eyebrow, belief statement, introduction, child services, featured question, related articles, CTA |
| Service | title, slug, category, meta title, description, challenge line, customer situation, barriers, options, process notes, FAQs, related services, related locations, CTA |
| Broker | name, preferred name, role, verified credentials, verified experience, service strengths, service areas, public profiles, image, contact status |
| Location | name, regional cluster, service-area wording, local property and borrower context, priority services, FAQs, nearby areas, office status |
| Article | title, slug, topic, summary, author, published date, modified date, reading time, related service, body sections, FAQs |
| Case study | approval status, anonymisation method, verified situation, complication, strategy, outcome, disclaimer, related service, related location |
| Proof item | type, exact approved claim, source, permission status, valid date, visual asset |

## Content safety rules

No testimonial, rating, review quote, case study, office address, lender count, award, credential, fee, rate, turnaround time, or performance statistic may be published unless the source and approval status are stored with the content item. Draft components should visibly indicate what is awaiting confirmation rather than fill the gap with mock data.

## Conversion states

The two primary conversion flows are **Plan Your Next Move** and **Book a Call**. The planning form captures only the minimum useful context: name, preferred contact, what the person is building, approximate timing, and a short description of the decision. It should not collect sensitive financial documents or detailed financial data in the static frontend.

Until the final CRM, email endpoint, privacy wording, and booking URL are supplied, submissions will use an explicit front-end review state that explains the integration is being finalised. No form should pretend that information has been transmitted when it has not.

