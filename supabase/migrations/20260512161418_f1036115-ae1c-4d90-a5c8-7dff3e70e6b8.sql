
-- App role enum and user_roles table for admin access
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
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "users see own roles" on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

-- contact_messages
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
create policy "anyone can insert contact" on public.contact_messages for insert to anon, authenticated with check (true);
create policy "admins read contact" on public.contact_messages for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- employer_requests
create table public.employer_requests (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  job_title text,
  hiring_needs text,
  message text,
  created_at timestamptz not null default now()
);
alter table public.employer_requests enable row level security;
create policy "anyone can insert employer" on public.employer_requests for insert to anon, authenticated with check (true);
create policy "admins read employer" on public.employer_requests for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- candidate_applications
create table public.candidate_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  job_title text,
  experience text,
  skills text,
  message text,
  resume_url text,
  created_at timestamptz not null default now()
);
alter table public.candidate_applications enable row level security;
create policy "anyone can insert candidate" on public.candidate_applications for insert to anon, authenticated with check (true);
create policy "admins read candidate" on public.candidate_applications for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- inquiries (homepage quick inquiry)
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('employer','candidate')),
  name text not null,
  email text not null,
  phone text,
  company text,
  role text,
  city text,
  experience text,
  openings int,
  message text,
  created_at timestamptz not null default now()
);
alter table public.inquiries enable row level security;
create policy "anyone can insert inquiry" on public.inquiries for insert to anon, authenticated with check (true);
create policy "admins read inquiry" on public.inquiries for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for resumes (public read so we can store public URLs)
insert into storage.buckets (id, name, public) values ('resumes','resumes', true)
on conflict (id) do nothing;

create policy "anyone upload resume" on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'resumes');
create policy "anyone read resume" on storage.objects for select to anon, authenticated
  using (bucket_id = 'resumes');
