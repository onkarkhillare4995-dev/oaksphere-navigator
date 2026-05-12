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
