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

## Deployment topology

The root Next.js application deploys to Vercel. Railway hosts three separate production resources: PostgreSQL, Redis, and two services from this repository: `apps/api` for HTTP/webhooks and `apps/worker` for asynchronous automation. The worker is never exposed publicly. Vercel receives only `NEXT_PUBLIC_API_URL`; all provider tokens, database URLs and queue credentials remain in Railway.

## Next phases

The Railway API will own PostgreSQL data access and tenant resolution. Import, daily due checks, reminder sends and subscription checks run as idempotent queued jobs through Redis. WhatsApp and SMS use configurable provider adapters. All secrets are environment variables.
