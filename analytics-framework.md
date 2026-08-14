# Next Move Loans — Analytics-Ready Framework

## Measurement principle

The measurement model prioritises **qualified conversation intent**, not vanity engagement. The site loads the existing project analytics script and includes a provider-agnostic client event bridge. If Umami is available, the bridge forwards the events directly; otherwise, it keeps a temporary in-page event queue for testing.

| Event | Trigger | Decision it helps measure |
| --- | --- | --- |
| `cta_plan_next_move` | Click to the planning form | Which pages generate deeper problem-context intent. |
| `cta_book_call` | Click to the booking page | Which pages generate direct conversation intent. |
| `cta_contact` | Click to contact | Whether users need a broader contact route. |
| `form_plan_preview` | Preview-form submission action | Whether the planning experience is clear before final CRM integration. |
| `booking_placeholder_open` | Booking placeholder action | Demand for the calendar before the production URL is supplied. |
| `external_broker_profile` | Click to public BrokerPages profile | Use of external proof while the owned review system is awaiting approval. |

## Production actions

Before launch, the business should confirm the analytics provider, privacy and consent requirements, internal-traffic filtering, campaign naming convention, form-success event, booking-completion event, phone and email click tracking, and CRM source attribution. The preview events must be replaced with genuine success events only after the final integrations transmit successfully.
