# OAKsphere — Setup Guide

This site is built on Lovable + Lovable Cloud (Supabase under the hood).
All public forms (Contact, Employer, Candidate + resume upload, Homepage
inquiry) save real data to your backend, and the AI Resume Match feature
calls Google Gemini through a secure server route.

## 1. Backend (Lovable Cloud)

Lovable Cloud is already enabled for this project. The required tables and
storage bucket were created automatically. If you ever migrate to a fresh
Supabase project, run [`supabase-setup.sql`](./supabase-setup.sql) in the
Supabase SQL editor.

Tables created:

- `contact_messages` — Contact page submissions
- `employer_requests` — Hire Talent / Employer page submissions
- `candidate_applications` — Candidate page submissions (with `resume_url`)
- `inquiries` — Homepage Quick Inquiry submissions

Storage bucket: `resumes` (public, max 5 MB, PDF/DOC/DOCX only — enforced
in the frontend).

## 2. Environment variables

These are auto-managed by Lovable Cloud and live in `.env`. You should
**never edit `.env` by hand** — it is regenerated when Cloud is connected.

| Variable | Where it's used |
|---|---|
| `VITE_SUPABASE_URL` | Browser (forms, storage uploads) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Browser |
| `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` | Server SSR |
| `GEMINI_API_KEY` | Server-only — used by `/api/match-resume` route |

The Gemini key is **never** sent to the browser; the AI Match form posts to
`/api/match-resume` which runs server-side.

## 3. Granting yourself admin access (to read submissions)

1. Sign up an account on the site (auth needs to be enabled — when you do
   so, sign up at the auth page).
2. In Lovable Cloud → Backend → SQL editor, run:

   ```sql
   insert into public.user_roles (user_id, role)
   values ('<your-auth-user-id>', 'admin');
   ```

3. Now you can read all four submission tables. Anonymous visitors can only
   insert.

## 4. Testing each form

- **Contact** (`/contact`) → submit → row appears in `contact_messages`
- **Employer** (`/employers`) → submit → row in `employer_requests`
- **Candidate** (`/candidates`) → upload PDF → row in
  `candidate_applications` with `resume_url` populated
- **Homepage Quick Inquiry** (`/`) → row in `inquiries`
- **AI Match** (`/ai-match`) → returns score / strengths / gaps

## 5. Deploying

Click **Publish** in the Lovable editor. Custom domain is configured under
Project → Domain.

---

## Jobs board (free public job sources)

The Jobs page (`/jobs`) loads live jobs from the `jobs` table in the database.
A backend route imports jobs from **free, public APIs** — no paid keys, no
scraping of LinkedIn/Naukri/Indeed.

Currently enabled sources:

- **Remotive** — `https://remotive.com/api/remote-jobs`
- **Arbeitnow** — `https://www.arbeitnow.com/api/job-board-api`

### Setup (already done on Lovable Cloud)

1. The `jobs` table + RLS policies are created. To replicate in a fresh
   Supabase project, run [`supabase-jobs-setup.sql`](./supabase-jobs-setup.sql)
   in the SQL editor.
2. Anyone can read jobs; only admins can write (admin role granted via
   `user_roles` — see step 3 of the main setup above).

### Manual import

Run a one-off import from your terminal:

```bash
npm run import-jobs
```

This calls `POST /api/public/import-jobs` on your published site. It fetches
the latest jobs and **upserts** them by `external_job_id` so duplicates are
skipped automatically.

To target preview instead:

```bash
IMPORT_URL=https://project--6f9062c4-ff2c-48a1-9810-dc856d806d80-dev.lovable.app/api/public/import-jobs npm run import-jobs
```

### Optional: protect the import endpoint with a secret

By default the endpoint is open (safe — it only inserts rows the public can
already see). To restrict who can trigger imports, add a runtime secret named
`JOBS_IMPORT_SECRET` in Lovable Cloud → Backend → Secrets, then export the
same value locally:

```bash
export JOBS_IMPORT_SECRET=your-long-random-string
npm run import-jobs
```

### Schedule a daily import (free)

**Option A — GitHub Actions (recommended, totally free):**

Create `.github/workflows/import-jobs.yml`:

```yaml
name: Daily job import
on:
  schedule:
    - cron: "0 3 * * *"   # every day at 03:00 UTC
  workflow_dispatch:
jobs:
  import:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: node scripts/import-jobs.mjs
        env:
          IMPORT_URL: https://oaksphere.in/api/public/import-jobs
          JOBS_IMPORT_SECRET: ${{ secrets.JOBS_IMPORT_SECRET }}
```

Add `JOBS_IMPORT_SECRET` under GitHub → repo → Settings → Secrets → Actions
(only needed if you set the secret on the backend too).

**Option B — Supabase pg_cron (free with Lovable Cloud):**

In Backend → SQL editor, run:

```sql
select cron.schedule(
  'daily-job-import', '0 3 * * *',
  $$ select net.http_post(
       url := 'https://oaksphere.in/api/public/import-jobs',
       headers := '{"Content-Type":"application/json"}'::jsonb,
       body := '{}'::jsonb
     ); $$
);
```

### Testing the Jobs page

1. Run `npm run import-jobs` once.
2. Visit `/jobs` — you should see live cards.
3. Try the search box and the **type** / **source** dropdowns.
4. Click **Apply on original site** — opens the original posting in a new tab.

### Adding more legal sources later

Open `src/routes/api/public/import-jobs.ts` and add a new `fetchXxx()` function
that returns the same `Job` shape, then push its results into the `runImport`
flow. Suggested free, legal options:

- The Muse API (free tier, requires free key)
- USAJobs API (US government)
- Public RSS feeds from company career pages (where the site's terms permit)

Avoid LinkedIn, Naukri, Indeed, Monster, Glassdoor — their ToS forbid scraping.
