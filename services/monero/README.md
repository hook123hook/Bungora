# Bungora — Monero köprüsü (XMR)

Web sitesiyle iletişim kuran Monero ödeme motoru. Bu klasör **cüzdan makinesinde** (Windows
PC / VPS) çalışır, Vercel'de DEĞİL. Görevleri:

1. **Adres havuzu** oluşturmak (`xmr_address_pool`) — her checkout bir adres "çeker"
   (`pop_xmr_address` RPC).
2. **View-only cüzdanı** izlemek (`monero-wallet-rpc`), gelen transferleri faturalarla
   eşleştirmek ve ödeme onaylanınca faturayı `credited` yapmak.

> Nihai alıcı adres, Viarela ile aynı cüzdandır. **Gizli anahtar asla bu klasöre girmez**;
> yalnızca view-only (izleme) cüzdan kullanılır.

## Gereksinimler
- Node.js 18+ (Node 20 önerilir)
- Windows 10/11 veya Linux VPS
- `monero-wallet-cli.exe` + `monero-wallet-rpc.exe` (isteğe bağlı `monerod`) → `bin\` klasörü
- Supabase projesi (şemalar uygulanmış: `supabase/schema-booking.sql`, `supabase/schema-xmr.sql`)

## Kurulum

### 1. Yapılandırma
```powershell
copy config.example.json config.json
```
`config.json` içini doldurun:
- `supabaseUrl` / `supabaseServiceRoleKey` — Supabase → Project Settings → API (service_role).
- `wallet.rpcUrl` — `monero-wallet-rpc` JSON-RPC adresi (önerilen `http://127.0.0.1:18283/json_rpc`).
- `wallet.username` / `wallet.password` — wallet-rpc girişi (start.bat'takiyle aynı).
- `mainAddress` — nihai alıcı adres (Viarela ile aynı, değişmez).
- `mailTransport` — `resend` (ücretsiz önerilen), `smtp` veya `resend`; Proton adresi için Resend sender doğrulaması gerekir.
- `resendApiKey` — Resend ücretsiz hesabının API anahtarı; `RESEND_API_KEY` ortam değişkeniyle de verilebilir.
- `mailFrom` — gönderen adresi; bu kurulumda `bungora@proton.me`.
- `smtp.user` / `smtp.password` — Proton SMTP token kimlik bilgileri. `password` normal Proton
  hesabı parolası değil, Proton ayarlarından üretilen SMTP token olmalıdır. Ortam değişkenleri:
  `PROTON_SMTP_USER` ve `PROTON_SMTP_PASSWORD`.

### 2. View-only cüzdan oluştur
```powershell
make-watch.cmd
```
veya node tabanlı yöntem (aynı sonucu üretir, otomatik doğrulamalı):
```powershell
cd tools
npm install
node make-watch-rpc.mjs
```
Sonuç: `Bungora-watch` (+ `.keys`) klasörde oluşur.

### 3. (İsteğe bağlı) Kendi Monero düğümün
`bin\monerod.exe --prune-blockchain --data-dir data\monerod --rpc-bind-port 18081`
Yoksa public node kullan: `node.moneroworld.com:18081`.

### 4. Daemon + wallet-rpc + bridge'i başlat
```powershell
copy start.bat start.local.bat
rem start.local.bat içinde PAROLA/SIFRE değerlerini gerçek değerlerle değiştirin
start.local.bat
```

### 5. Sağlık kontrolü ve havuz
```powershell
npm run doctor    # her şey [OK] olmalı
npm run seed      # adres havuzunu 50 boş adrese doldurur
```
`seed` yalnızca gerekirse tekrar çalıştırılır; bridge her tıklamada havuzu doldurmayı dener.

Ödeme 10 blok onayına ulaştığında bridge, invoice referansındaki booking kaydının email alanını
bulur ve Resend üzerinden otomatik konfirmasyon gönderir. Resend ücretsiz hesabında
`Bungora@proton.me` sender olarak eklenip Proton gelen kutusundaki doğrulama bağlantısı
onaylanmalıdır. Resend API anahtarı olmadan gönderim yapılamaz.

### 6. Canlı test
Siteyi Vercel'de yayınla, `/pay` üzerinden küçük bir XMR göndererek ödeme akışını `credited`
olana kadar test et (10 confirmation, birkaç dakika).

## Docker ile (Linux VPS)
```bash
cp config.example.json config.json     # doldurun
# Bungora-watch.keys dosyasını ./data/watch altına kopyalayın
cp ./data/watch/.keys.example ./data/watch/.keys   # adı kendi watch dosyanızla eşleşmeli
docker compose up -d monerod wallet-rpc bridge
```

## Yer tutucular
- `start.bat` içindeki `PAROLA`/`SIFRE` — gerçek değerler `start.local.bat`'a yazılır
  (git'e girmez, `.gitignore` içinde).
- `docker-compose.yml` içindeki `PAROLA`/`SIFRE` — cüzdan/wallet-rpc parolasıyla aynı olmalı.

## Teslim sözleşmesi
- `start.bat`, `make-watch.cmd`, `xmr-bridge.js`, `doctor.js` sürüm kontrolüne girer.
- `config.json`, `start.local.bat`, `Bungora-watch*`, `data/`, `bin/`, `tools/node_modules/`
  **git'e girmez** (repo kökündeki `.gitignore`).
