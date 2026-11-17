-- Execute in a private Supabase project. No browser-accessible service role key.
create extension if not exists pgcrypto;
create table if not exists public.members (
 email text primary key check (email = lower(email)),
 role text not null default 'patient' check (role in ('patient','partner','admin')),
 created_at timestamptz not null default now()
);
create table if not exists public.care_logs (
 id uuid primary key default gen_random_uuid(),
 owner_email text not null,
 type text not null check (type in ('glucose','blood_pressure_systolic','blood_pressure_diastolic','weight','carbohydrates','insulin_taken')),
 value numeric(10,2) not null check (value > 0 and value <= 10000),
 context varchar(120),
 occurred_at timestamptz not null default now()
);
create index if not exists care_logs_owner_occurred on public.care_logs(owner_email, occurred_at desc);
create table if not exists public.partner_applications (
 id uuid primary key default gen_random_uuid(),
 owner_email text not null,
 legal_name varchar(160) not null,
 city varchar(80) not null,
 zone varchar(80) not null,
 license_type text not null check (license_type in ('md42','drug_license')),
 license_number varchar(90) not null,
 gstin varchar(15) not null,
 status text not null default 'pending' check (status in ('pending','approved','rejected')),
 reviewed_by text,
 reviewed_at timestamptz,
 created_at timestamptz not null default now()
);
create index if not exists partner_applications_owner on public.partner_applications(owner_email);
create table if not exists public.device_offers (
 id uuid primary key default gen_random_uuid(),
 partner_id uuid not null references public.partner_applications(id),
 product_name varchar(180) not null,
 brand varchar(120) not null,
 category text not null check (category in ('CGM','Cooling','Needles','Care kit','Testing supplies')),
 price_inr numeric(12,2) not null check (price_inr > 0),
 mrp_inr numeric(12,2) check (mrp_inr >= price_inr),
 wear_days integer,
 cooling_notes text,
 stock_qty integer not null default 0 check (stock_qty >= 0),
 availability text not null default 'awaiting confirmation',
 verified_at timestamptz,
 created_at timestamptz not null default now()
);
-- Activate only after separate, documented seller checks; the UI deliberately provides no self-publish endpoint.
create or replace view public.public_device_offers with (security_invoker = true) as
 select o.id,o.product_name,o.category,o.brand,p.zone,p.city,o.price_inr,o.mrp_inr,o.wear_days,o.cooling_notes,o.availability
 from public.device_offers o join public.partner_applications p on p.id=o.partner_id
 where p.status='approved' and o.verified_at is not null and o.stock_qty>0;
-- All public tables use denied-by-default row-level security. Only server-side service role can query.
alter table public.members enable row level security;
alter table public.care_logs enable row level security;
alter table public.partner_applications enable row level security;
alter table public.device_offers enable row level security;
revoke all on public.members,public.care_logs,public.partner_applications,public.device_offers from anon,authenticated;
revoke all on public.public_device_offers from anon,authenticated;
