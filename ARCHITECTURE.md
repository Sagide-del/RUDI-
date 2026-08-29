# RUDI architecture — Phase 1

RUDI is a multi-tenant customer-return platform for salons and barbershops. It never processes a business's customer payments: subscription records apply only to RUDI's monthly plan.

## Tenant isolation

The server resolves an authenticated user and membership, then derives `business_id`. Browser requests never choose a tenant. Every operational query filters by `business_id`; a compound business/phone index prevents duplicate customer imports within a business.

## Product route map

| Surface | Route |
| --- | --- |
| Owner home | `/` |
| Onboarding | `/onboarding` |
| Customers and imports | `/customers`, `/customers/imports/:id` |
| Chat | `/chat`, `/chat/:conversationId` |
| Bookings | `/bookings` |
| Public booking | `/b/:businessSlug` |
| Platform admin | `/admin` |

## Next phases

D1 stores business-scoped metadata and R2 stores import files. The requested production topology remains Vercel + Railway: PostgreSQL, Redis, background workers and configurable WhatsApp/SMS provider adapters. Import, daily due checks, reminder sends and subscription checks run as idempotent queued jobs. All secrets are environment variables.
