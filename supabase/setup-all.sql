-- Bungora | TEK SEFERLİK KURULUM (Supabase Dashboard > SQL Editor > New query > yapıştır > Run)
-- Sıra önemli değil; tüm ifadeler idempotent (tekrar çalıştırılabilir).
-- İçerik: 1) Monero ödeme şeması  2) %25 ön ödeme migration  3) Rezervasyon şeması

-- =====================================================================
-- 1) Monero (XMR) ödeme şeması (adres havuzu -> fatura -> ödeme defteri)
-- =====================================================================

create table if not exists xmr_address_pool (
  id bigint generated always as identity primary key,
  address text unique not null,
  subaddress_index int unique not null,
  status text not null default 'unused' check (status in ('unused','assigned')),
  invoice_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists xmr_invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_no text unique not null,
  address text unique not null,
  subaddress_index int not null,
  amount_fiat numeric(16,2) not null,
  currency text not null default 'TRY' check (currency in ('TRY','EUR')),
  stage text not null default 'full' check (stage in ('full','deposit','remainder')),
  total_fiat numeric(16,2),
  client_key text,
  amount_xmr numeric(14,8) not null,
  fx_rate numeric(16,8) not null,
  safety_pct numeric(6,2) not null default 3.00,
  reference text not null,
  label text,
  status text not null default 'pending' check (status in ('pending','partial','credited','expired','void')),
  confirmations int not null default 0,
  received_amount_xmr numeric(14,8),
  tx_hash text,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  channel text not null default 'xmr' check (channel in ('xmr','card','psp'))
);

create table if not exists xmr_payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references xmr_invoices(id) on delete cascade,
  tx_hash text not null,
  amount_xmr numeric(14,8) not null,
  confirmations int not null default 0,
  detected_at timestamptz not null default now(),
  unique (invoice_id, tx_hash)
);

alter table xmr_address_pool enable row level security;
alter table xmr_invoices enable row level security;
alter table xmr_payments enable row level security;

drop policy if exists admins_select_address_pool on xmr_address_pool;
create policy admins_select_address_pool on xmr_address_pool
  for select to authenticated using (true);

drop policy if exists admins_select_xmr_invoices on xmr_invoices;
create policy admins_select_xmr_invoices on xmr_invoices
  for select to authenticated using (true);

drop policy if exists admins_update_xmr_invoices on xmr_invoices;
create policy admins_update_xmr_invoices on xmr_invoices
  for update to authenticated using (true);

drop policy if exists admins_select_xmr_payments on xmr_payments;
create policy admins_select_xmr_payments on xmr_payments
  for select to authenticated using (true);

do $$
begin
  alter publication supabase_realtime add table public.xmr_invoices;
  alter publication supabase_realtime add table public.xmr_payments;
exception when duplicate_object then null;
end $$;

create or replace function pop_xmr_address()
returns table (address text, subaddress_index int)
language plpgsql security definer
as $$
declare
  v xmr_address_pool%rowtype;
begin
  select * into v
    from xmr_address_pool
   where status = 'unused'
   order by id
   limit 1
   for update skip locked;
  if v.id is null then
    raise exception 'NO_ADDRESS_AVAILABLE';
  end if;
  update xmr_address_pool set status = 'assigned' where id = v.id;
  return query select v.address, v.subaddress_index;
end $$;

revoke all on function pop_xmr_address() from public;
grant execute on function pop_xmr_address() to service_role, authenticated;

-- =====================================================================
-- 2) %25 ön ödeme migration (eski kurulumlar için; yeni kurulumda etkisiz)
-- =====================================================================

alter table xmr_invoices add column if not exists stage text not null default 'full';
alter table xmr_invoices add column if not exists total_fiat numeric(16,2);
alter table xmr_invoices add column if not exists client_key text;

do $$
begin
  alter table xmr_invoices drop constraint if exists xmr_invoices_stage_check;
  alter table xmr_invoices add constraint xmr_invoices_stage_check check (stage in ('full','deposit','remainder'));
exception when undefined_table then null;
end $$;

update xmr_invoices set total_fiat = amount_fiat where total_fiat is null;

create unique index if not exists xmr_invoices_client_key_uniq
  on xmr_invoices (client_key, stage, reference)
  where client_key is not null and status in ('pending','partial');

-- =====================================================================
-- 3) Rezervasyon şeması (admin panel + realtime bildirim)
-- =====================================================================

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
  payment_stage text not null default 'full' check (payment_stage in ('full','deposit')),
  lang text not null default 'tr',
  message text,
  status text not null default 'new',
  admin_notes text,
  invoice_id uuid
);

create index if not exists bungalow_bookings_created_idx on public.bungalow_bookings (created_at desc);
create index if not exists bungalow_bookings_status_idx on public.bungalow_bookings (status);

alter table public.bungalow_bookings enable row level security;

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

do $$
begin
  alter publication supabase_realtime add table public.bungalow_bookings;
exception when duplicate_object then null;
end $$;

alter table public.bungalow_bookings add column if not exists source text;
alter table public.bungalow_bookings add column if not exists payment_stage text not null default 'full';
update public.bungalow_bookings set payment_stage = 'full' where payment_stage is null;
