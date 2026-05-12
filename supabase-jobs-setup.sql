-- ============================================================
-- OAKsphere — Jobs table setup
-- ============================================================
-- Run this in the Supabase SQL editor (Lovable Cloud already
-- applied it for you via the migration). Creates a `jobs` table
-- + RLS policies so anyone can read jobs but only admins can
-- write them. Used by the public Jobs page and the job-import
-- backend route (`/api/public/import-jobs`).
-- ============================================================

create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text,
  location text,
  job_type text,
  salary text,
  description text,
  apply_url text not null,
  source text,
  external_job_id text unique,
  posted_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.jobs enable row level security;

-- Public read
create policy "anyone can read jobs"
  on public.jobs for select
  to anon, authenticated using (true);

-- Admin-only write (uses the has_role() helper from supabase-setup.sql)
create policy "admins can insert jobs"
  on public.jobs for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

create policy "admins can update jobs"
  on public.jobs for update to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "admins can delete jobs"
  on public.jobs for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create index idx_jobs_posted_at on public.jobs (posted_at desc nulls last);
create index idx_jobs_source on public.jobs (source);
