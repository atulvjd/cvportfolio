-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Users Table (Syncs with Supabase Auth if needed, or standalone)
create table users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Audits Table
create table audits (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  website_url text not null,
  status text not null check (status in ('pending', 'processing', 'completed', 'failed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Audit Results Table
create table audit_results (
  id uuid primary key default uuid_generate_v4(),
  audit_id uuid references audits(id) on delete cascade unique,
  performance_score integer,
  seo_score integer,
  accessibility_score integer,
  ux_score integer,
  mobile_score integer,
  ai_report jsonb, -- Stores the structured AI analysis
  raw_lighthouse_data jsonb, -- Stores the full Lighthouse JSON (can be large)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Leads Table (For agency lead collection)
create table leads (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  website_url text not null,
  audit_id uuid references audits(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table users enable row level security;
alter table audits enable row level security;
alter table audit_results enable row level security;
alter table leads enable row level security;

-- Policies (Simple public read for now, or auth restricted)
create policy "Users can view their own audits" on audits for select using (auth.uid() = user_id);
create policy "Users can insert their own audits" on audits for insert with check (auth.uid() = user_id);
create policy "Users can update their own audits" on audits for update using (auth.uid() = user_id);
create policy "Users can view their own audit results" on audit_results for select using (
  exists (
    select 1 from audits
    where audits.id = audit_results.audit_id
    and audits.user_id = auth.uid()
  )
);
