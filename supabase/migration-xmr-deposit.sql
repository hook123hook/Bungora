-- Bungora | Monero ön ödeme (%25) aşaması migration
-- Mevcut xmr_invoices tablosuna ViaRela ile aynı stage/client_key/total_fiat alanlarını ekler.
-- Supabase SQL Editor'da bir kez çalıştır. Tüm ifadeler idempotent.

alter table xmr_invoices add column if not exists stage text not null default 'full';
alter table xmr_invoices add column if not exists total_fiat numeric(16,2);
alter table xmr_invoices add column if not exists client_key text;

do $$
begin
  alter table xmr_invoices drop constraint if exists xmr_invoices_stage_check;
  alter table xmr_invoices add constraint xmr_invoices_stage_check check (stage in ('full','deposit','remainder'));
exception when undefined_table then null;
end $$;

-- Eski kayıtlar ön ödeme oranını doğru göstersin: total_fiat = amount_fiat.
update xmr_invoices set total_fiat = amount_fiat where total_fiat is null;

-- Aynı rezervasyon + aşama + müşteri anahtarı için çift fatura açılmasını engelle.
create unique index if not exists xmr_invoices_client_key_uniq
  on xmr_invoices (client_key, stage, reference)
  where client_key is not null and status in ('pending','partial');
