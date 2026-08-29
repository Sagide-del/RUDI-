# RUDI production deployment

## Vercel — web

1. Import `Sagide-del/RUDI-` into Vercel.
2. Use the repository root as the Root Directory and accept the detected Next.js framework.
3. Add `NEXT_PUBLIC_API_URL` with the Railway API public URL for Preview and Production.
4. Set `main` as the production branch. Feature branches receive Preview deployments.
5. Add `app.rudi.co.ke` and `rudi.co.ke` after the first successful deployment.

## Railway — API, worker and data

1. Create a project named `rudi-production`.
2. Provision PostgreSQL and Redis. Keep both private; do not expose database ports publicly.
3. Create an API service from this GitHub repository. Set its Root Directory to `apps/api`, leave Config File Path empty, set Healthcheck Path to `/health`, and add a public domain. The included Dockerfile is detected automatically.
4. Create a worker service from the same repository. Set its Root Directory to `apps/worker`, leave Config File Path empty, and do not generate a public domain.
5. For API and worker, use Railway reference variables for `DATABASE_URL` and `REDIS_URL`. Set the remaining variables from their `.env.example` files as encrypted service variables.
6. Point `api.rudi.co.ke` to the API service only after `/health` returns `{"status":"ok","service":"rudi-api"}`.

## Safety checklist

- Never add a value from an `.env` file to Git.
- Production, Preview and local development require separate secrets and databases.
- Do not add M-Pesa, WhatsApp or SMS credentials until the respective provider integration exists.
- The API is the only service permitted to reach PostgreSQL. The web app talks to it over HTTPS.
- When the Railway project is stable, use `railway config pull` to import its real PostgreSQL, Redis and service state into one `.railway/railway.ts` file. Do not write an IaC file from scratch for an existing environment.
