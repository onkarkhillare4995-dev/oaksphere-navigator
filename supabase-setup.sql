-- ============================================================
-- OAKsphere — Supabase setup
-- ============================================================
-- This file documents the schema/policies that power all forms
-- on the website. If you are using Lovable Cloud, these have
-- already been applied for you. To run manually in a fresh
-- Supabase project, paste this entire file into the SQL editor.
-- ============================================================

-- 1) Roles (used to gate admin reads)
create type public.app_role as enum ('admin', 'moderator', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

-- 2) Form tables
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null, phone text,
  company text, subject text, message text not null,
  created_at timestamptz not null default now()
);

create table public.employer_requests (
  id uuid primary key default gen_random_uuid(),
  company_name text not null, contact_name text not null,
  email text not null, phone text, job_title text,
  hiring_needs text, message text,
  created_at timestamptz not null default now()
);

create table public.candidate_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null, email text not null, phone text,
  job_title text, experience text, skills text, message text,
  resume_url text, created_at timestamptz not null default now()
);

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('employer','candidate')),
  name text not null, email text not null, phone text,
  company text, role text, city text, experience text,
  openings int, message text,
  created_at timestamptz not null default now()
);

-- 3) RLS — anon may submit, only admins may read
do $$
declare t text;
begin
  foreach t in array array['contact_messages','employer_requests','candidate_applications','inquiries']
  loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('create policy "anon can insert" on public.%I for insert to anon, authenticated with check (true);', t);
    execute format('create policy "admins can read" on public.%I for select to authenticated using (public.has_role(auth.uid(), ''admin''));', t);
  end loop;
end$$;

-- 4) Storage bucket for resume uploads
insert into storage.buckets (id, name, public) values ('resumes','resumes', true)
on conflict (id) do nothing;

create policy "anyone upload resume" on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'resumes');
create policy "anyone read resume" on storage.objects for select to anon, authenticated
  using (bucket_id = 'resumes');

-- 5) To grant yourself admin access (run once after signing up):
-- insert into public.user_roles (user_id, role) values ('<your-auth-user-id>', 'admin');
