# Bungora — Vercel / Next.js

Bu klasör Vercel'e doğrudan aktarılabilen bağımsız Next.js projesidir. 93 ilan,
fotoğraf galerileri, arama ve filtreleme, TR/EN/AR/RU dil seçenekleri, sekiz para
birimi, sistem temasını takip eden görünüm, tarih bazlı fiyat hesabı ve 10
fotoğraflı otomatik banner dahildir.

## Vercel ile yayınlama

1. Bu klasörü kendi GitHub deponuza yükleyin (`Bungora`).
2. Vercel'de **Add New → Project** bölümünü açın ve depoyu seçin.
3. Framework olarak **Next.js** otomatik seçilir. Root Directory, bu klasör
   deponun kökündeyse boş bırakılır.
4. Build Command `npm run build`, Install Command `npm install` olarak kalabilir.
5. Vercel → Project → Settings → Environment Variables bölümünde `.env.example`
   dosyasındaki `SUPABASE_URL`, `SUPABASE_ANON_KEY` ve `SUPABASE_SERVICE_ROLE_KEY`
   değerlerini doldurun.
6. **Deploy** düğmesine basın.

Bilgisayarda çalıştırmak için Node.js 22 kullanın:

```bash
npm install
npm run dev
```

Üretim kontrolü:

```bash
npm run build
npm start
```

## İçerik düzenleme

- İlanlar ve fiyatlar: `lib/bungalows.ts`
- Fotoğraf galerileri: `lib/property-galleries.json`
- Dil metinleri: `lib/messages.ts` ve `lib/catalog-translations.ts`
- Tasarım: `app/globals.css`
- Ana sayfa: `app/page.tsx`

## Önemli

Ödeme sayfası yalnızca tasarım önizlemesidir; ödeme veya rezervasyon oluşturmaz.
Canlı satış için lisanslı bir ödeme sağlayıcısı, rezervasyon altyapısı, KVKK/GDPR
metinleri ve sunucu tarafı doğrulama ayrıca eklenmelidir. Harici tesis fotoğrafları
ve içerikleri ticari yayından önce kullanım izni açısından doğrulanmalıdır.
