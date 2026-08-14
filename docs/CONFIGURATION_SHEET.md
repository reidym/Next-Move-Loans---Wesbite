# Configuration sheet

Secrets belong in the project’s secure secret manager and must never be committed. Public marketing identifiers belong in **CMS → Settings**, where administrators can change them without editing code.

## Server-side secrets and managed environment

| Variable | Purpose | Current state |
| --- | --- | --- |
| `DATABASE_URL` | Managed relational CMS database. | Managed by project runtime. |
| `JWT_SECRET` | Session signing. | Managed by project runtime. |
| `VITE_APP_ID`, `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL` | Managed authentication. | Managed by project runtime. |
| `OWNER_OPEN_ID`, `OWNER_NAME` | Owner identity and default admin promotion. | Managed by project runtime. |
| `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY` | Server-side managed storage, notifications and platform services. | Managed by project runtime. |
| `VITE_FRONTEND_FORGE_API_URL`, `VITE_FRONTEND_FORGE_API_KEY` | Frontend platform services supplied by the runtime. | Managed by project runtime. |
| `RESEND_API_KEY` | Transactional delivery of lead notifications to the business inbox. | **Not supplied.** |
| `LEAD_FROM_EMAIL` | Verified sender used for lead notification email. | **Not supplied.** |

Until the two email variables are approved, enquiries are saved in the database and surfaced in CMS → Leads, while outbound delivery is reported truthfully as not configured.

## Public CMS settings

| Setting key | Purpose | Launch rule |
| --- | --- | --- |
| `contact.*` | Phone, mobile, email and Leongatha office address. | Confirmed values are seeded. |
| `booking.discoveryCall` | Discovery-call Calendly link. | Confirmed value is seeded. |
| `booking.gamePlan` | Game Plan session Calendly link. | Confirmed value is seeded. |
| `analytics.ga4MeasurementId` | GA4 provider ID. | Empty until supplied. |
| `analytics.gtmContainerId` | Google Tag Manager container ID. | Empty until supplied. |
| `analytics.searchConsoleVerification` | Search Console verification token. | Empty until supplied. |
| `analytics.metaPixelId` | Meta Pixel ID. | Empty until supplied. |
| `analytics.callTracking` | Approved replacement number and enable flag. | Disabled by default; no number replacement occurs. |
| `analytics.conversionMappings` | Provider-specific Google Ads and Meta labels mapped to the site’s conversion catalogue. | Structure is seeded; provider labels remain empty. |
| `analytics.conversionCatalogue` | Stable phone, email, Calendly, review and lead event names. | Seeded. |

GA4, GTM and Meta scripts load only after analytics consent. Call tracking remains a no-op until the setting is explicitly enabled and an approved replacement number is present.

