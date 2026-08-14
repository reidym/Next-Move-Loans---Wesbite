# Next Move Loans launch review checklist

The structural build and pre-launch technical audit are complete. This checklist now contains only owner-, compliance-, account-, and production-dependent actions.

## Brand and content approval

| Item | Owner | Status |
| --- | --- | --- |
| Approve final homepage, solution, Approval Method™, and founder wording | Martin / brand lead | Awaiting approval |
| Confirm any qualifications/accreditations to publish on Marty’s profile | Martin / compliance | Not yet supplied |
| Approve Leongatha office and Warragul/Berwick service-area wording | Business owner | Awaiting approval |
| Approve seven published evergreen articles | Martin / compliance | Awaiting approval |
| Verify the two Budget drafts against current official sources before publishing | Editorial / compliance | Held as drafts |

## Compliance and trust

| Item | Owner | Status |
| --- | --- | --- |
| Legal entity, ABN/ACN, credit representative/licence details | Compliance | Not yet supplied |
| Aggregator, commission/fee, complaints, AFCA, and approved disclaimer wording | Compliance | Not yet supplied |
| Final Credit Guide | Compliance | Not yet supplied |
| Final privacy policy matching CRM, email, analytics, booking, retention, and document flows | Legal/privacy | Not yet supplied |
| Approved verified review records or public-data-only review provider | Business owner | Not yet supplied |
| Confirm supplied finalist artwork permissions and optional award source URLs | Business owner | Awaiting approval |

## Conversion and operations

| Item | Owner | Status |
| --- | --- | --- |
| Provide `RESEND_API_KEY` and approved `LEAD_FROM_EMAIL` | Operations | Not yet supplied |
| Run a production enquiry and verify inbox delivery after credentials are configured | Operations / QA | After configuration |
| Confirm response-time wording if it will be displayed | Operations | Optional / not supplied |
| Confirm Discovery Call and Game Plan Calendly availability | Martin | URLs pass; calendar review required |

## Analytics and search

| Item | Owner | Status |
| --- | --- | --- |
| GA4 measurement ID | Marketing | Optional / not supplied |
| GTM container ID | Marketing | Optional / not supplied |
| Search Console verification value and property | SEO owner | Not yet supplied |
| Meta Pixel / Google Ads conversion values | Marketing | Optional / not supplied |
| Approved call-tracking replacement number and original-number mapping | Marketing / operations | Optional / disabled |
| Verify consent wording and provider policy alignment | Legal/privacy | Before enabling providers |

## Search migration and ownership

| Item | Owner | Status |
| --- | --- | --- |
| Connect/select the user-owned private GitHub repository | Project owner | Not yet connected |
| Perform first repository ownership push and verify clone/build | Project owner / technical owner | After connection |
| Export verified legacy URL inventory | SEO / technical owner | Not yet supplied |
| Approve and test 301 redirect map | SEO / technical owner | After inventory |
| Confirm `nextmoveloans.com.au` DNS and cutover plan | Domain owner | Not yet approved |

## Production release

| Item | Owner | Status |
| --- | --- | --- |
| Review the final checkpoint in preview | Project owner | Required |
| Publish using the project UI | Project owner | Only after all launch gates clear |
| Attach the real daily-backup schedule UID and run/verify first production snapshot | Technical owner | After deployment |
| Run enquiry, phone, email, Calendly, review, privacy, and complaints smoke tests | QA / compliance | After deployment |
| Validate live-domain headers, sitemap, robots, canonical, schema, 404, and redirects | SEO / technical owner | After deployment |
| Submit sitemap and verify Search Console | SEO owner | After deployment |
| Monitor field Core Web Vitals and error logs | Technical owner | Post-launch |

See `pre-launch-audit.md` for the complete evidence matrix and `docs/GITHUB_STAGING_AND_RELEASE.md` for the release procedure.

