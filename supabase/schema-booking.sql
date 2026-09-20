-- Bungora | Booking requests schema (admin panel + realtime notifications)
-- Run in Supabase Dashboard > SQL Editor (safe to re-run, idempotent)

create table if not exists public.bungalow_bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  contact text,
  email text,
  listing_id text not null,
  listing_name text,
  check_in date not null,
  check_out date not null,
  guests int not null,
  nights int,
  nightly_price numeric(12,2),
  total_try numeric(16,2),
  price_estimate boolean not null default true,
  lang text not null default 'tr',
  message text,
  status text not null default 'new',
  admin_notes text,
  invoice_id uuid
);

create index if not exists bungalow_bookings_created_idx on public.bungalow_bookings (created_at desc);
create index if not exists bungalow_bookings_status_idx on public.bungalow_bookings (status);

alter table public.bungalow_bookings enable row level security;

-- Anonymous visitors can NEVER read or write directly.
-- Inserts happen only through /api/booking (service role key on Vercel).
-- The admin panel authenticates via Supabase Auth; logged-in admins get access:

drop policy if exists "admins_select_bookings" on public.bungalow_bookings;
create policy "admins_select_bookings"
  on public.bungalow_bookings for select
  to authenticated
  using (true);

drop policy if exists "admins_update_bookings" on public.bungalow_bookings;
create policy "admins_update_bookings"
  on public.bungalow_bookings for update
  to authenticated
  using (true);

-- Realtime: pushes new submissions to the open admin panel instantly.
do $$
begin
  alter publication supabase_realtime add table public.bungalow_bookings;
exception when duplicate_object then null;
end $$;

-- Admin panel reads booking.source ("Kaynak" column); older installs lack it.
alter table public.bungalow_bookings add column if not exists source text;