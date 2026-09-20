# Bungora — Kurulum Rehberi (Deploy + DB + Ödeme)

Bu paket, **Bungora** sitesinin aynısını sıfırdan kurmak için gereken tüm
kaynak kodu, veritabanı şemaları, ödeme bridge'i ve yapılandırma örneklerini içerir.
Gerçek gizli anahtarlar (Supabase service-role, Resend API, e-posta parolası) KASITLI
olarak dahil edilmemiştir; aşağıdaki adımlarda kendi değerlerini doldur.

---

## 1. Paket İçeriği

| Klasör / Dosya | Açıklama |
|---|---|
| `app/`, `components/`, `lib/`, `public/` | Next.js kaynak kodu (site) |
| `supabase/schema-xmr.sql` | Ödeme (XMR) tabloları + RLS |
| `supabase/schema-booking.sql` | Rezervasyon tablosu + RLS |
| `services/monero/` | Monero ödeme köprüsü (bridge) + Docker |
| `services/monero/config.example.json` | Bridge yapılandırma şablonu (sır yok) |
| `services/monero/README.md` | Bridge kurulum/çalıştırma detayları |
| `.env.example` | Vercel env değişken şablonu |
| `vercel.json` | Vercel yapılandırması (CSP başlıkları) |
| `.vercelignore` | Deploy'da dışarıda tutulacak dosyalar |
| `docs/` | İçerik & galeri kaynakları |

---

## 2. Gereksinimler

- Node.js ≥ 20.9 (site build) — bu paketle test edilen: Node v24, Next.js 16.2.6, React 19
- Vercel CLI (`npm i -g vercel`) veya Vercel web arayüzü
- Bir **Supabase** projesi (ücretsiz tier yeterli)
- Bir **Monero** cüzdanı + `monero-wallet-rpc` (bridge için, yerel makinada çalışır)
- İsteğe bağlı: Resend hesabı (e-posta konfirmasyonu için; varsayılan email'sız akıştır)

---

## 3. Veritabanı (Supabase) Kurulumu

1. Supabase'te yeni proje oluştur (ör. `Bungora`).
2. SQL Editor'de **sırayla** çalıştır:
   - `supabase/schema-xmr.sql`
   - `supabase/schema-booking.sql`
   Sh'emalar `xmr_invoices`, `xmr_address_pool`, `xmr_payments`, `bungalow_bookings`
   tablolarını ve RLS politikalarını oluşturur.
3. Not: müşteri e-postası `xmr_invoices` içinde tutulmaz; kod, fatura `reference`
   alanındaki rezervasyon kimliğiyle `bungalow_bookings.email` adresini okur.
   `schema-booking.sql`, admin panelindeki "Kaynak" sütunu için `source`
   alanını da ekler (eski kurulumlarda idempotent `add column` ile gelir).
4. Supabase > Settings > API'den şunları kaydet:
   - `Project URL` (ör. `https://XXXX.supabase.co`)
   - `anon public` key
   - `service_role` key (sadece bridge'de, istemciye asla)

---

## 4. Bridge (services/monero) Kurulumu

1. `services/monero/config.example.json` dosyasını `config.json` olarak kopyala.
2. Doldur:
   - `supabaseUrl`: Supabase Project URL
   - `supabaseServiceRoleKey`: service_role key
   - `mainAddress`: kendi Monero ana adresin
   - `wallet.*`: `monero-wallet-rpc` kullanıcı adı/parola ve RPC portu
   - `mailTransport` / `resendApiKey`: e-posta istiyorsan; değilse email'sız akış kullanılır
3. `docker-compose.yml` ile `monero-wallet-rpc` + bridge'i başlat
   (veya `xmr-bridge.js`'i Node ile çalıştır — ayrıntılar `README.md`'de).
4. Bridge, ödemeyi izler, `xmr_invoices`'i günceller ve rezervasyonu tamamlar.

---

## 5. Siteyi Deploy Et (Vercel)

1. Bu klasörde Vercel'e giriş yap: `vercel login`
2. Projeyi bağla: `vercel link`
3. Env değişkenlerini ekle (`vercel env add` veya dashboard):
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY` (public/anon)
   - `SUPABASE_SERVICE_ROLE_KEY` (sunucu tarafı)
   (`MAIL_FROM` / `RESEND_API_KEY` yalnızca cüzdan makinesindeki bridge
   `config.json` dosyasına yazılır, Vercel'e eklenmez.)
4. Build: `vercel build` → Prod: `vercel --prod`

> Site, **email'sız konfirmasyon** kullanır: ödeme sonrası ekranda benzersiz onay kodu
> ve SimpleX QR/linki gösterilir (SimpleX linki `monero-payment.tsx`'de yapılandırılır).

---

## 6. Güvenlik Notları

- `config.json` (gerçek sırlar) **asla** git'e / Vercel'e yüklenmemeli —
  bu paketteki `.gitignore` ve `.vercelignore` bunu zaten engeller.
- service_role anahtarı tam DB erişimi verir; yalnızca bridge'de kullan, istemcide asla.
- Yeni kurulumda tüm anahtarları (service-role, Resend, cüzdan parolası) kendin üret.

---

## 7. Benzer Site Kurarken Değiştirilecekler

- `lib/bungalows.ts`, `lib/messages.ts`, `lib/catalog-translations.ts` — bungalov içerikleri
- `lib/preferences.ts`, `lib/property-gallery.ts` — fiyat/tesis tercihleri, galeri
- `public/` — görseller
- `services/monero/config.json` — cüzdan adresi, RPC, SimpleX, Resend
- `components/monero-payment.tsx` — SimpleX linki / marka metinleri
