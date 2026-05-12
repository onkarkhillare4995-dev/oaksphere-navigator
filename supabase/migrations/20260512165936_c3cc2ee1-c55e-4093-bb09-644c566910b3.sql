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

create policy "anyone can read jobs"
  on public.jobs for select
  to anon, authenticated
  using (true);

create policy "admins can insert jobs"
  on public.jobs for insert
  to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

create policy "admins can update jobs"
  on public.jobs for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "admins can delete jobs"
  on public.jobs for delete
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create index idx_jobs_posted_at on public.jobs (posted_at desc nulls last);
create index idx_jobs_source on public.jobs (source);