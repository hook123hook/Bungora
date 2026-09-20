// Bungora | Monero bridge
// Watches monero-wallet-rpc (view-only wallet) and credits XMR invoices to Supabase.
// Runs locally on the wallet machine (Windows/VPS). Never holds spend keys.
// The final receiving wallet is the same one used by the Viarela payment desk.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import nodemailer from 'nodemailer';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadConfig() {
  const path = process.env.XMR_BRIDGE_CONFIG || join(__dirname, 'config.json');
  if (!existsSync(path)) {
    console.error('[xmr-bridge] config.json bulunamadı. config.example.json kopyalayın.');
    process.exit(1);
  }
  const raw = JSON.parse(readFileSync(path, 'utf8'));
  return {
    supabaseUrl: process.env.SUPABASE_URL || raw.supabaseUrl || '',
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || raw.supabaseServiceRoleKey || '',
    mainAddress: raw.mainAddress || '',
    wallet: {
      rpcUrl: raw.wallet?.rpcUrl || 'http://127.0.0.1:18283',
      username: raw.wallet?.username || '',
      password: raw.wallet?.password || ''
    },
    confirmations: raw.confirmations || 10,
    pollIntervalSec: raw.pollIntervalSec || 300,
    poolTarget: raw.poolTarget || 50,
    poolMin: raw.poolMin || 10,
    simplexNotify: raw.simplexNotify || false,
    mailTransport: process.env.MAIL_TRANSPORT || raw.mailTransport || 'resend',
    resendApiKey: process.env.RESEND_API_KEY || raw.resendApiKey || '',
    brevoApiKey: process.env.BREVO_API_KEY || raw.brevoApiKey || '',
    resendApiKey: process.env.RESEND_API_KEY || raw.resendApiKey || '',
    mailFrom: process.env.MAIL_FROM || raw.mailFrom || 'Bungora <bungora@proton.me>',
    smtp: {
      host: process.env.PROTON_SMTP_HOST || raw.smtp?.host || 'smtp.protonmail.ch',
      port: Number(process.env.PROTON_SMTP_PORT || raw.smtp?.port || 587),
      secure: String(process.env.PROTON_SMTP_SECURE || raw.smtp?.secure || 'false') === 'true',
      user: process.env.PROTON_SMTP_USER || raw.smtp?.user || '',
      password: process.env.PROTON_SMTP_PASSWORD || raw.smtp?.password || ''
    },
    explicit: process.argv.includes('--seed') || Boolean(process.env.XMR_BRIDGE_SEED_ONLY)
  };
}

const cfg = loadConfig();

for (const k of ['supabaseUrl', 'supabaseServiceRoleKey']) {
  if (!cfg[k] || cfg[k].includes('YOUR-PROJECT-REF')) {
    console.error(`[xmr-bridge] ${k} boş/geçersiz. config.json / env doldurun (supabase/schema-xmr.sql uygulandı mı?).`);
    process.exit(1);
  }
}

const log = (...a) => { const t = new Date().toISOString(); console.log(t, ...a); };
const XMR_DIVISOR = 1e12;

async function rpc(method, params = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify({ jsonrpc: '2.0', id: 'Bungora', method, params });
  const r = await fetch(cfg.wallet.rpcUrl, { method: 'POST', headers, body });
  if (!r.ok) throw new Error(`wallet-rpc ${r.status}: ${await r.text()}`);
  const j = await r.json();
  if (j.error) throw new Error(`wallet-rpc ${method} error: ${JSON.stringify(j.error)}`);
  return j.result ?? {};
}

function hdr() {
  return {
    apikey: cfg.supabaseServiceRoleKey,
    Authorization: `Bearer ${cfg.supabaseServiceRoleKey}`,
    'Content-Type': 'application/json'
  };
}

async function sbGet(path) {
  const r = await fetch(cfg.supabaseUrl + path, { headers: hdr() });
  if (!r.ok) throw new Error(`supabase GET ${path} -> ${r.status}`);
  return r.json();
}

async function sbPatch(path, body) {
  const r = await fetch(cfg.supabaseUrl + path, { method: 'PATCH', headers: hdr(), body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`supabase PATCH ${path} -> ${r.status}`);
  const txt = await r.text();
  return txt ? JSON.parse(txt) : {};
}

async function sbPost(path, body) {
  const r = await fetch(cfg.supabaseUrl + path, { method: 'POST', headers: hdr(), body: JSON.stringify(body) });
  if (!r.ok) {
    const txt = await r.text().catch(() => '');
    throw new Error(`supabase POST ${path} -> ${r.status} ${txt.slice(0, 200)}`);
  }
  const txt = await r.text();
  return txt ? JSON.parse(txt) : {};
}

async function seedPool() {
  const rows = await sbGet('/rest/v1/xmr_address_pool?select=address,status');
  const existing = new Set((rows || []).map(r => r.address));
  const unused = (rows || []).filter(r => r.status === 'unused').length;
  const want = cfg.poolTarget - unused;
  if (want <= 0) { log(`[pool] yeterli (${unused} boş)`); return; }
  log(`[pool] ${want} yeni subaddress üretiliyor…`);
  let res;
  try {
    res = await rpc('create_address', { account_index: 0, count: want, label: 'Bungora-pool' });
  } catch (e) {
    log(`[pool] create_address BAŞARISIZ (wallet çalışmıyor olabilir): ${e.message}`);
    return;
  }
  let added = 0;
  const addrs = res.addresses || [];
  const indices = res.address_indices || [];
  for (let i = 0; i < addrs.length; i++) {
    const addr = typeof addrs[i] === 'string' ? addrs[i] : addrs[i].address;
    if (!addr || existing.has(addr)) continue;
    const idx = indices[i] || res.address_index + i;
    try {
      await sbPost('/rest/v1/xmr_address_pool', {
        address: addr,
        subaddress_index: idx,
        status: 'unused'
      });
      added++;
    } catch (e) {
      log(`[pool] kayıt hatası ${addr}: ${e.message}`);
    }
  }
  log(`[pool] ${added} adres eklendi (toplam boş: ${unused + added})`);
}

async function expireOld() {
  const now = new Date().toISOString();
  const rows = await sbGet(`/rest/v1/xmr_invoices?status=eq.pending&expires_at=lt.${now}&select=id`);
  for (const r of rows || []) {
    await sbPatch(`/rest/v1/xmr_invoices?id=eq.${r.id}`, { status: 'expired' }).catch(() => {});
  }
  if (rows?.length) log(`[expire] ${rows.length} fatura süresi doldu`);
}

async function scanIncoming() {
  let res;
  try {
    res = await rpc('get_transfers', { in: true, pending: true, pool: true, filter_by_height: false });
  } catch (e) {
    log(`[scan] get_transfers BAŞARISIZ: ${e.message}`);
    return;
  }
  const entries = [...(res.in || []), ...(res.pending || [])];
  for (const e of entries) {
    if (e.subaddr_index?.major !== 0) continue;
    const idx = e.subaddr_index.major === 0 ? e.subaddr_index.minor : -1;
    if (idx < 0) continue;
    const amountXmr = Number(e.amount) / XMR_DIVISOR;
    const conf = Number(e.confirmations ?? 0);

    const invs = await sbGet(`/rest/v1/xmr_invoices?subaddress_index=eq.${idx}&or=(status.eq.pending,status.eq.partial)&select=id,amount_xmr,amount_fiat,status,confirmations,reference,label`);
    for (const inv of invs || []) {
      const expected = Number(inv.amount_xmr);
      const within = Math.abs(amountXmr - expected) / expected <= 0.02;
      const arrivedEnough = within || amountXmr >= expected;
      const nextStatus = arrivedEnough ? undefined : 'partial';
      const patch = { confirmations: conf, received_amount_xmr: amountXmr, tx_hash: e.txid };
      if (nextStatus) patch.status = nextStatus;

      if (conf >= cfg.confirmations && arrivedEnough) {
        patch.status = 'credited';
        let credited = false;
        try {
          await sbPatch(`/rest/v1/xmr_invoices?id=eq.${inv.id}`, patch);
          credited = true;
        } catch (e) {
          log(`[credit] patch hata: ${e.message}`);
        }
        if (!credited) continue;
        await sbPost('/rest/v1/xmr_payments', {
          invoice_id: inv.id, tx_hash: e.txid, amount_xmr: amountXmr, confirmations: conf
        }).catch(() => {}); // unique(row) sağlar, tekrar olursa sessiz geç
        log(`[credit] FATURA ${idx} -> ${amountXmr} XMR onaylandı (tx ${String(e.txid).slice(0, 8)}…)`);
        if (cfg.simplexNotify) await sendSimpleXNotification(inv.id, amountXmr, e.txid);
        const customerEmail = await findBookingEmail(inv.reference);
        if (customerEmail) await sendConfirmationEmail(customerEmail, { ...inv, amount_xmr: amountXmr });
      } else if (patch.status === 'partial') {
        await sbPatch(`/rest/v1/xmr_invoices?id=eq.${inv.id}`, patch).catch(() => {});
        log(`[warn] FATURA ${idx}: beklenen ${expected} XMR, gelen ${amountXmr} XMR -> partial`);
      } else {
        // only bump confirmations occasionally to avoid write spam
        if (conf !== Number(inv.confirmations)) {
          await sbPatch(`/rest/v1/xmr_invoices?id=eq.${inv.id}`, patch).catch(() => {});
          if (conf % 5 === 0) log(`[scan] fatura ${idx}: ${conf}/${cfg.confirmations} onay`);
        }
      }
    }
  }
}

async function verifyMain() {
  if (!cfg.mainAddress) return;
  try {
    const r = await rpc('get_address_index', { address: cfg.mainAddress });
    if (r.index) log(`[verify] nihai adres cüzdana ait (index ${r.index.major} ${r.index.minor})`);
    else log('[verify] nihai adres bu cüzdana ait değil! Ana cüzdan adresini kontrol et.');
  } catch (e) {
    log(`[verify] nihai adres bu cüzdana ait değil! (${e.message})`);
  }
}

async function sendSimpleXNotification(invId, amountXmr, txHash) {
  try {
    const relay = 'https://smp19.simplex.im';
    const message = [
      'Bungora ödeme bildirimi:',
      `- Fatura ID: ${invId}`,
      `- Tutar: ${amountXmr} XMR`,
      `- TxHash: ${txHash}`,
      `- Zaman: ${new Date().toISOString()}`,
      '',
      'Bu ödeme Bungora ödeme ekranından gelmiştir.'
    ].join('\n');

    const payload = {
      bubbles: ['https://smp19.simplex.im/a#o7JePoRgFSCSF5EaJJcJ8gG2a7CzrOLaeo9aVU3rliE'],
      content: message,
      tag: 'Bungora-payment-notification'
    };

    const r = await fetch(`${relay}/api/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const txt = await r.text().catch(() => '');
      log(`[simplex] bildirim gönderilemedi: ${r.status} ${txt.slice(0, 200)}`);
    } else {
      log(`[simplex] bildirim gönderildi: fatura ${invId}`);
    }
  } catch (e) {
    log(`[simplex] bildirim hatası: ${e.message}`);
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BOOKING_ID_RE = /([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i;

async function findBookingEmail(reference) {
  const match = String(reference || '').match(BOOKING_ID_RE);
  if (!match) return '';
  try {
    const rows = await sbGet(`/rest/v1/bungalow_bookings?id=eq.${encodeURIComponent(match[1])}&select=email,contact&limit=1`);
    const row = rows?.[0];
    const email = row?.email || row?.contact || '';
    return EMAIL_RE.test(email) ? email.trim().toLowerCase() : '';
  } catch (e) {
    log(`[email] booking bilgisi alınamadı: ${e.message}`);
    return '';
  }
}

function paymentConfirmationHtml(invNo, amountXmr, amountTry, checkIn, checkOut, nights, propertyName) {
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const safeInvoiceNo = escapeHtml(invNo);
  const safeCheckIn = escapeHtml(checkIn);
  const safeCheckOut = escapeHtml(checkOut);
  const safeNights = escapeHtml(nights);
  const safePropertyName = escapeHtml(propertyName);
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8faf8;margin:0;padding:32px 16px}
.card{max-width:520px;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #e2e8e0;padding:32px}
h1{font-size:20px;color:#1a4731;margin:0 0 8px}
p{font-size:14px;color:#475569;line-height:1.6;margin:8px 0}
.amount{font-size:28px;font-weight:700;color:#16a34a;margin:16px 0}
.detail{background:#f0fdf4;border-radius:8px;padding:16px;margin:16px 0}
.detail dt{font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 2px}
.detail dd{font-size:14px;color:#1e293b;margin:0 0 12px}
.detail dd:last-child{margin-bottom:0}
.btn{display:inline-block;background:#16a34a;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;margin:16px 0}
.footer{font-size:12px;color:#94a3b8;margin-top:24px;border-top:1px solid #e2e8e0;padding-top:16px}
</style></head><body><div class="card">
<h1>Ödemeniz Alındı</h1>
<p>Merhaba,<strong> ${safePropertyName}</strong> için konaklamanız onaylandı. Ödemeniz başarıyla alındı.</p>
<div class="amount">≈ ${Number(amountXmr).toFixed(6)} XMR</div>
<dl class="detail">
<div><dt>Fatura No</dt><dd>${safeInvoiceNo}</dd></div>
<div><dt>Giriş</dt><dd>${safeCheckIn}</dd></div>
<div><dt>Çıkış</dt><dd>${safeCheckOut}</dd></div>
<div><dt>Konaklama</dt><dd>${safeNights} gece</dd></div>
<div><dt>Ödenen Tutar</dt><dd>≈ ${Number(amountTry).toLocaleString('tr-TR')} ₺ (${Number(amountXmr).toFixed(6)} XMR)</dd></div>
</dl>
<a class="btn" href="https://smp19.simplex.im/a#o7JePoRgFSCSF5EaJJcJ8gG2a7CzrOLaeo9aVU3rliE">SimpleX ile İletişime Geç</a>
<p>Rezervasyon detayları ve tesis iletişimi için yukarıdaki butonu kullanın.</p>
<div class="footer"><p>Bu e-posta Bungora otomatik ödeme sistemi tarafından gönderilmiştir.<br>Ödeme: Monero (XMR) · Anonim &amp; güvenli.</p></div>
</div></body></html>`;
}

async function sendConfirmationEmail(to, inv) {
  if (!EMAIL_RE.test(to)) return;
  try {
    const referenceDateMatch = String(inv.reference || '').match(/-(\d{4}-\d{2}-\d{2})-(\d{4}-\d{2}-\d{2})-[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    const labelDateMatch = inv.label ? inv.label.match(/(\d{4}-\d{2}-\d{2})\s*—\s*(\d{4}-\d{2}-\d{2})/) : null;
    const dateMatch = referenceDateMatch || labelDateMatch;
    const checkIn = dateMatch?.[1] || '-';
    const checkOut = dateMatch?.[2] || '-';
    const emailNights = dateMatch ? Math.round((Date.parse(dateMatch[2]) - Date.parse(dateMatch[1])) / 86400000) : '-';
    const propertyName = inv.label ? inv.label.split(' · ')[0] || '' : '';
    const html = paymentConfirmationHtml(inv.invoice_no, inv.amount_xmr, inv.amount_fiat, checkIn, checkOut, emailNights, propertyName);
    if (cfg.mailTransport === 'smtp') {
      if (!cfg.smtp.user || !cfg.smtp.password) {
        log('[email] Proton SMTP yapılandırılmamış: PROTON_SMTP_PASSWORD gerekli');
        return;
      }
      const transporter = nodemailer.createTransport({
        host: cfg.smtp.host,
        port: cfg.smtp.port,
        secure: cfg.smtp.secure,
        requireTLS: !cfg.smtp.secure,
        auth: { user: cfg.smtp.user, pass: cfg.smtp.password }
      });
      await transporter.sendMail({
        from: cfg.mailFrom,
        to,
        subject: `Ödeme Onayı — ${inv.invoice_no}`,
        html
      });
      log(`[email] Proton konfirmasyonu gönderildi: ${to} (fatura ${inv.invoice_no})`);
      return;
    }

    const apiKey = cfg.resendApiKey;
    if (!apiKey) {
      log('[email] Resend API anahtarı yapılandırılmamış');
      return;
    }
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `bungalov-payment-${inv.id}`
      },
      body: JSON.stringify({ from: cfg.mailFrom, to: [to], subject: `Ödeme Onayı — ${inv.invoice_no}`, html }),
    });
    if (!r.ok) {
      const txt = await r.text().catch(() => '');
      log(`[email] gönderilemedi: ${r.status} ${txt.slice(0, 200)}`);
    } else {
      log(`[email] konfirmasyon gönderildi: ${to} (fatura ${inv.invoice_no})`);
    }
  } catch (e) {
    log(`[email] hatası: ${e.message}`);
  }
}

async function tick() {
  try {
    await expireOld();
    await scanIncoming();
    await seedPool();
  } catch (e) {
    log(`[tick] hata: ${e?.message} | cause: ${e?.cause?.message || e?.cause?.code || e?.cause || ''}`);
  }
}

const initial = Date.now() + 3000;
setTimeout(async () => {
  await verifyMain();
  await tick();
  if (cfg.explicit) { log('[xmr-bridge] seed-only modu tamamlandı.'); process.exit(0); }
  setInterval(tick, cfg.pollIntervalSec * 1000);
  log(`[xmr-bridge] çalışıyor — her ${cfg.pollIntervalSec}s. RPC: ${cfg.wallet.rpcUrl}`);
  if (cfg.mainAddress) log(`[xmr-bridge] nihai alıcı cüzdan: ${cfg.mainAddress.slice(0, 10)}…${cfg.mainAddress.slice(-6)}`);
}, Math.max(0, initial - Date.now()));

process.on('SIGINT', () => { log('kapatılıyor'); process.exit(0); });
process.on('SIGTERM', () => { log('kapatılıyor'); process.exit(0); });
