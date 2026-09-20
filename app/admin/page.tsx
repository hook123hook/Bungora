"use client";

// Bungora — Yönetim Paneli (reservation requests + Monero invoices)
// Auth via Supabase Auth; data via public REST + Realtime.
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

type Cfg = { url: string; anonKey: string };
type Booking = {
  id: string; first_name: string | null; last_name: string | null; contact: string | null;
  email: string | null; listing_id: string | null; listing_name: string | null;
  check_in: string | null; check_out: string | null; guests: number | null; nights: number | null;
  nightly_price: number | null; total_try: number | null; price_estimate: boolean;
  lang: string | null; message: string | null; status: string | null;
  source: string | null; created_at: string;
};
type Invoice = {
  id: string; invoice_no: string; address: string; amount_fiat: number; currency: string;
  amount_xmr: number; fx_rate: number; safety_pct: number; reference: string | null; label: string | null;
  status: string; confirmations: number; received_amount_xmr: number | null; tx_hash: string | null;
  expires_at: string; created_at: string; channel: string;
};

const STATUS_LABEL: Record<string, string> = { new: "Yeni", read: "Okundu", confirmed: "Teyitli", closed: "Kapandı", archived: "Arşiv" };
const XSTATUS_LABEL: Record<string, string> = { pending: "Bekliyor", partial: "Kısmi", credited: "Ödendi", expired: "Süresi doldu", void: "İptal" };
const SAS = "https://esm.sh/@supabase/supabase-js@2";

const ESC_MAP: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
function esc(s: unknown) { return String(s ?? "").replace(/[&<>"]/g, (m) => ESC_MAP[m]); }
function fmtDate(iso: string | null) { return iso ? new Date(iso).toLocaleString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"; }
function fmtD(iso: string | null) { return iso ? new Date(`${iso}T00:00:00Z`).toLocaleDateString("tr-TR", { day: "numeric", month: "short" }) : "—"; }
function money(n: number | null) { return n == null ? "-" : new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n); }

function rest(url: string, key: string, path: string, method = "GET", body?: unknown) {
  return fetch(`${url}/rest/v1${path}`, {
    method,
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: method === "POST" ? "return=minimal" : "return=representation" },
    body: body ? JSON.stringify(body) : undefined,
  });
}
function downloadCsv(data: Invoice[]) {
  const head = ["invoice_no", "channel", "reference", "label", "amount_try", "amount_xmr", "fx_rate", "status", "confirmations", "received_amount_xmr", "tx_hash", "address", "created_at", "expires_at"];
  const lines = [head.join(";")];
  data.forEach((r) => lines.push(head.map((h) => `"${String((r as Record<string, unknown>)[h] ?? "").replace(/"/g, '""')}"`).join(";")));
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "Bungora-xmr-" + new Date().toISOString().slice(0, 10) + ".csv";
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function Admin() {
  const [loginVisible, setLoginVisible] = useState(true);
  const [fatal, setFatal] = useState("");
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [rows, setRows] = useState<Booking[]>([]);
  const [xrows, setXrows] = useState<Invoice[]>([]);
  const [filter, setFilter] = useState("all");
  const [xfilter, setXfilter] = useState("all");
  const [q, setQ] = useState("");
  const [current, setCurrent] = useState<Booking | null>(null);
  const [toasts, setToasts] = useState<{ key: number; html: string }[]>([]);
  const cfgRef = useRef<Cfg | null>(null);
  const subs = useRef<{ unsubscribe: () => void }[]>([]);
  type SupaAuth = {
  getSession: () => Promise<{ data: { session: unknown | null } | null; error: unknown | null }>;
  signInWithPassword: (creds: { email: string; password: string }) => Promise<{ error: { message: string } | null }>;
  signOut: () => Promise<unknown>;
};
type SupaChannel = { unsubscribe: () => void };
type SupaClient = {
  auth: SupaAuth;
  channel: (name: string) => {
    on: <T>(type: string, filter: unknown, cb: (p: T) => void) => { subscribe: () => SupaChannel };
  };
};

type BookingEvent = { eventType: "INSERT" | "UPDATE" | "DELETE"; new: Booking | null; old: Booking | null };
type InvoiceEvent = { eventType: "INSERT" | "UPDATE" | "DELETE"; new: Invoice | null; old: Invoice | null };

const sbModuleRef = useRef<SupaClient | null>(null);

  function toast(html: string) {
    const key = Date.now() + Math.random();
    setToasts((t) => [...t, { key, html }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.key !== key)), 10000);
  }

  useEffect(() => {
    let stopped = false;
    void (async () => {
      try {
        const r = await fetch("/api/config", { cache: "no-store" });
        if (!r.ok) throw new Error("cfg");
        const cfg: Cfg = await r.json();
        if (stopped) return;
        cfgRef.current = cfg;
        const supabase = (await import(/* webpackIgnore: true */ SAS)).createClient(cfg.url, cfg.anonKey);
        sbModuleRef.current = supabase;
        const { data: { session } } = await supabase.auth.getSession();
        if (stopped) return;
        if (session) { setLoginVisible(false); setAuthed(true); }
      } catch { if (!stopped) setFatal("Sunucu yapılandırması eksik. Vercel > Settings > Environment Variables: SUPABASE_URL, SUPABASE_ANON_KEY."); }
    })();
    return () => { stopped = true; subs.current.forEach((s) => s?.unsubscribe()); };
  }, []);

  useEffect(() => {
    if (!authed || !cfgRef.current) return;
    let stopped = false;
    void (async () => {
      await loadBookings(); await loadInvoices();
      if (stopped) return;
      subscribe();
    })();
    const t1 = setInterval(() => { if (!stopped) void loadBookings(); }, 30000);
    const t2 = setInterval(() => { if (!stopped) void loadInvoices(); }, 45000);
    return () => { stopped = true; clearInterval(t1); clearInterval(t2); subs.current.forEach((s) => s?.unsubscribe()); subs.current = []; };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- loader/subscribe keep newest closure; re-run only on auth change
  }, [authed]);

  async function loadBookings() {
    const cfg = cfgRef.current; if (!cfg) return;
    const r = await rest(cfg.url, cfg.anonKey, "/bungalow_bookings?select=*&order=created_at.desc&limit=300");
    if (r.ok) setRows(await r.json());
  }
  async function loadInvoices() {
    const cfg = cfgRef.current; if (!cfg) return;
    const r = await rest(cfg.url, cfg.anonKey, "/xmr_invoices?select=*&order=created_at.desc&limit=200");
    if (r.ok) setXrows(await r.json());
  }
  function subscribe() {
    const sb = sbModuleRef.current; if (!sb) return;
    subs.current.forEach((s) => s?.unsubscribe()); subs.current = [];
    const ch1 = sb.channel("bookings-live").on("postgres_changes", { event: "*", schema: "public", table: "bungalow_bookings" }, (p: BookingEvent) => {
      if (p.eventType === "DELETE") { if (p.old) setRows((prev) => prev.filter((r) => r.id !== p.old!.id)); return; }
      if (!p.new) return;
      setRows((prev) => {
        const ix = prev.findIndex((r) => r.id === p.new!.id);
        const next = ix >= 0 ? prev.map((r, i) => (i === ix ? p.new! : r)) : [p.new!, ...prev];
        if (p.eventType === "INSERT") toast(`<strong>Yeni rezervasyon talebi</strong><small>${esc(p.new!.first_name)} ${esc(p.new!.last_name)} · ${esc(p.new!.listing_name || p.new!.listing_id)}</small>`);
        return next;
      });
    }).subscribe();
    const ch2 = sb.channel("xmr-live").on("postgres_changes", { event: "*", schema: "public", table: "xmr_invoices" }, (p: InvoiceEvent) => {
      if (p.eventType === "DELETE") { if (p.old) setXrows((prev) => prev.filter((r) => r.id !== p.old!.id)); return; }
      if (!p.new) return;
      setXrows((prev) => {
        const ix = prev.findIndex((r) => r.id === p.new!.id);
        const next = ix >= 0 ? prev.map((r, i) => (i === ix ? p.new! : r)) : [p.new!, ...prev];
        if (p.eventType === "UPDATE" && p.old?.status !== "credited" && p.new!.status === "credited") toast(`<strong>Monero ödemesi onaylandı</strong><small>${esc(p.new!.invoice_no)} · ${money(p.new!.amount_fiat)} · ${p.new!.amount_xmr} XMR düştü</small>`);
        return next;
      });
    }).subscribe();
    subs.current = [ch1, ch2];
  }

  async function doLogin(e: FormEvent) {
    e.preventDefault();
    setLoginError("");
    const sb = sbModuleRef.current; if (!sb) return;
    const { error } = await sb.auth.signInWithPassword({ email: email.trim(), password });
    if (error) { setLoginError(error.message); return; }
    setLoginVisible(false); setAuthed(true);
  }
  async function doLogout() { await sbModuleRef.current?.auth.signOut(); setAuthed(false); setLoginVisible(true); }

  const filtered = useMemo(() => rows.filter((r) => (filter === "all" || r.status === filter) && (!q || [r.first_name, r.last_name, r.contact, r.listing_name, r.message].join(" ").toLowerCase().includes(q))), [rows, filter, q]);
  const xfiltered = useMemo(() => xrows.filter((r) => xfilter === "all" || r.status === xfilter), [xrows, xfilter]);
  const unread = rows.filter((r) => r.status === "new").length;

  async function setStatus(id: string, status: string) {
    const cfg = cfgRef.current; if (!cfg) return;
    await rest(cfg.url, cfg.anonKey, `/bungalow_bookings?id=eq.${id}`, "PATCH", { status });
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  if (fatal) return <div className="admin-body">{stylesEl}<div className="fatal" dangerouslySetInnerHTML={{ __html: fatal }} /></div>;

  return (
    <div className="admin-body">
      {stylesEl}

      {loginVisible && (
        <div className="auth-wrap">
          <form className="auth-card" onSubmit={doLogin}>
            <h1>Bungora · Yönetim</h1>
            <label>E-posta<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" /></label>
            <label>Şifre<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" /></label>
            <button className="btn btn-primary" type="submit" style={{ width: "100%", marginTop: 18 }}>Giriş yap</button>
            {loginError && <p className="auth-error">{loginError}</p>}
            <p className="auth-hint">Yalnızca yetkili personel erişebilir. Girişler Supabase Auth ile doğrulanır.</p>
          </form>
        </div>
      )}

      {!loginVisible && authed && (
        <div className="admin-dash">
          <header className="admin-topbar"><div className="container">
            <span className="admin-title">Bungora · Rezervasyon ve Ödeme Paneli</span>
            <span className="admin-spacer" />
            <button className="icon-btn" title="Yenile" onClick={() => { void loadBookings(); void loadInvoices(); }}>⟳</button>
            <button className="icon-btn" title="Yeni talepler">🔔{unread > 0 && <span className="badge-dot">{unread}</span>}</button>
            <button className="icon-btn" title="Çıkış" onClick={() => void doLogout()}>⎋</button>
          </div></header>

          <main className="container">
            <section className="stat-grid">
              <div className="stat-card is-new"><small>Yeni talep</small><strong>{unread}</strong></div>
              <div className="stat-card"><small>Bugün gelen</small><strong>{rows.filter((r) => new Date(r.created_at).toDateString() === new Date().toDateString()).length}</strong></div>
              <div className="stat-card"><small>Toplam talep</small><strong>{rows.length}</strong></div>
              <div className="stat-card"><small>Onaylı ödeme</small><strong>{xrows.filter((r) => r.status === "credited").length}</strong></div>
            </section>

            <section>
              <div className="admin-filters">
                {["all", ...Object.keys(STATUS_LABEL)].map((k) => <button key={k} className={`tab-btn ${filter === k ? "is-on" : ""}`} onClick={() => setFilter(k)}>{k === "all" ? "Tümü" : STATUS_LABEL[k]}</button>)}
                <input className="admin-search" value={q} onChange={(e) => setQ(e.target.value.toLowerCase().trim())} placeholder="İsim, iletişim, tesis, mesaj ara..." />
              </div>
              <div className="case-table-wrap">
                <table className="cases"><thead><tr><th>Durum</th><th>Ad</th><th>Tesis</th><th>Tarih</th><th>Misafir</th><th>Tutar</th><th>İletişim</th></tr></thead>
                  <tbody>{filtered.map((r) => <tr key={r.id} className={`row ${r.status === "new" ? "is-unread" : ""}`} onClick={() => setCurrent(r)}>
                    <td><span className={`pill ${r.status}`}>{STATUS_LABEL[r.status ?? "new"] || r.status}</span></td>
                    <td>{esc(r.first_name)} {esc(r.last_name)}</td>
                    <td>{esc(r.listing_name || r.listing_id)}<br /><small className="muted">{fmtD(r.check_in)} → {fmtD(r.check_out)}</small></td>
                    <td><small>{fmtDate(r.created_at)}</small></td>
                    <td>{r.guests ?? "-"}</td>
                    <td><bdi>{money(r.total_try)}</bdi></td>
                    <td>{esc(r.contact || r.email || "-")}</td>
                  </tr>)}</tbody>
                </table>
                <div className="empty-state" hidden={filtered.length > 0}>Henüz kayıt yok. Form gönderimleri burada anında görünür.</div>
              </div>
            </section>

            <section className="xmr-panel">
              <div className="xmr-head"><h2>Monero ödemeleri</h2>
                <button className="btn btn-secondary" type="button" onClick={() => downloadCsv(xrows)}>CSV indir</button>
              </div>
              <div className="admin-filters">
                {["all", ...Object.keys(XSTATUS_LABEL)].map((k) => <button key={k} className={`tab-btn ${xfilter === k ? "is-on" : ""}`} onClick={() => setXfilter(k)}>{k === "all" ? "Tümü" : XSTATUS_LABEL[k]}</button>)}
              </div>
              <div className="case-table-wrap">
                <table className="cases"><thead><tr><th>Fatura</th><th>Referans · Tesis</th><th>Kanal</th><th>TRY</th><th>XMR tutar</th><th>Durum</th><th>Onay</th><th>Tarih</th></tr></thead>
                  <tbody>{xfiltered.map((r) => <tr className="row" key={r.id}>
                    <td>{esc(r.invoice_no)}</td>
                    <td>{esc(r.reference || "-")}<br /><small className="muted">{esc((r.label || "").slice(0, 34))}</small></td>
                    <td><span className="pill ch-xmr">XMR</span></td>
                    <td><bdi>{money(r.amount_fiat)}</bdi></td>
                    <td>{r.amount_xmr} XMR{r.received_amount_xmr != null ? <><br /><small className="muted">aldı: {r.received_amount_xmr} XMR</small></> : null}</td>
                    <td><span className={`pill ${r.status}`}>{XSTATUS_LABEL[r.status] || r.status}</span></td>
                    <td>{r.confirmations || 0}/10</td>
                    <td><small>{r.tx_hash ? esc(r.tx_hash.slice(0, 12)) + "…" : "—"}<br />{fmtDate(r.created_at)}</small></td>
                  </tr>)}</tbody>
                </table>
                <div className="empty-state" hidden={xfiltered.length > 0}>Henüz ödeme yok.</div>
              </div>
            </section>
          </main>
        </div>
      )}

      {current && <Drawer booking={current} close={() => setCurrent(null)} setStatus={setStatus} />}
      <div className="toast-zone">{toasts.map((t) => <div key={t.key} className="toast" dangerouslySetInnerHTML={{ __html: t.html }} onClick={() => setToasts((x) => x.filter((y) => y.key !== t.key))} />)}</div>
    </div>
  );
}

function Drawer({ booking, close, setStatus }: { booking: Booking; close: () => void; setStatus: (id: string, status: string) => void }) {
  const kv: [string, string][] = [
    ["Durum", `<span class="pill ${booking.status}">${STATUS_LABEL[booking.status ?? "new"] || booking.status}</span>`],
    ["Ad Soyad", esc(booking.first_name) + " " + esc(booking.last_name)],
    ["İletişim", esc(booking.contact || booking.email || "-")],
    ["Tesis", esc(booking.listing_name || booking.listing_id)],
    ["Giriş · Çıkış", `${fmtD(booking.check_in)} → ${fmtD(booking.check_out)}`],
    ["Konaklama", `${booking.nights ?? "-"} gece · ${booking.guests ?? "-"} misafir`],
    ["Gece fiyatı", money(booking.nightly_price)],
    ["Tahmini tutar", money(booking.total_try)],
    ["Fiyat kaynağı", booking.price_estimate ? "Tarife" : "Temsili"],
    ["Dil", esc(booking.lang || "tr")],
    ["Kaynak", esc(booking.source || "web")],
    ["Tarih", fmtDate(booking.created_at)],
  ];
  return (
    <aside className="drawer open" aria-hidden="false">
      <div className="drawer-head"><h2>{esc(booking.first_name)} {esc(booking.last_name)}</h2><button className="icon-btn" onClick={close} title="Kapat">✕</button></div>
      <div className="drawer-body">
        <div className="drawer-actions">{Object.entries(STATUS_LABEL).map(([v, l]) => <button key={v} className={`tab-btn ${booking.status === v ? "is-on" : ""}`} onClick={() => setStatus(booking.id, v)}>{l}</button>)}</div>
        <dl className="kv">{kv.map(([k, v]) => <div key={k}><dt>{k}</dt><dd dangerouslySetInnerHTML={{ __html: v }} /></div>)}</dl>
        <strong style={{ display: "block", marginBottom: 8 }}>Mesaj</strong>
        <div className="msg-box">{booking.message || "—"}</div>
      </div>
    </aside>
  );
}

const stylesEl = <style>{`
.admin-body{--green:#1e7a4f;--border:#24342b;--card:#111a15;--muted:#8f9c92;--soft:#16211b;background:#0a0f0d;color:#e7efe6;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;min-height:100vh;font-size:14px;margin:0}
*{box-sizing:border-box}.container{max-width:1180px;margin:0 auto;padding:20px}
.admin-topbar{background:#0d1411;border-bottom:1px solid var(--border)}.admin-topbar .container{display:flex;align-items:center;gap:14px}.admin-title{font-weight:600}.admin-spacer{flex:1}
.icon-btn{background:none;border:1px solid var(--border);border-radius:8px;color:var(--muted);width:34px;height:34px;cursor:pointer;position:relative}
.badge-dot{position:absolute;top:-6px;right:-6px;background:#d43f2f;color:#fff;font-size:9px;border-radius:9px;min-width:17px;height:17px;display:grid;place-items:center;padding:0 4px}
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:26px}.stat-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:18px}.stat-card small{color:var(--muted);font-size:11px}.stat-card strong{font-size:28px;display:block;margin-top:6px}.stat-card.is-new strong{color:#3ddc80}
.admin-filters{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:14px}.admin-search{margin-inline-start:auto;background:var(--card);border:1px solid var(--border);color:#e7efe6;border-radius:8px;padding:8px 11px;font-size:12px;min-width:230px}
.tab-btn{background:none;border:1px solid var(--border);color:var(--muted);border-radius:7px;padding:6px 12px;font-size:12px;cursor:pointer}.tab-btn.is-on{background:var(--green);border-color:var(--green);color:#fff}
.case-table-wrap{background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:auto;margin-bottom:28px}.cases{width:100%;border-collapse:collapse;font-size:12px}.cases th{text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);padding:12px 14px;border-bottom:1px solid var(--border)}.cases td{padding:13px 14px;border-bottom:1px solid #1b2820;vertical-align:top}.cases tr.row{cursor:pointer}.cases tr.row:hover{background:#0f1a14}.cases tr.is-unread td{background:#12231a}
.pill{display:inline-block;border-radius:20px;padding:3px 10px;font-size:10px;font-weight:600;background:var(--soft);color:var(--muted)}.pill.new{background:#2a4a37;color:#7fe0a8}.pill.read{background:#21405f;color:#8ecfe8}.pill.confirmed{background:#1e4a6b;color:#8ecfe8}.pill.closed,.pill.expired,.pill.void{background:#3a2a2a;color:#e8a7a7}.pill.archived{color:var(--muted)}.pill.credited,.pill.pending{background:#2a4a37;color:#7fe0a8}.pill.partial{background:#3b3a2a;color:#e8d07a}.pill.ch-xmr{background:#38302a;color:#e8c07a}
.xmr-panel{margin-top:6px}.xmr-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}.xmr-head h2{font-size:16px;margin:0}
.drawer{position:fixed;inset-inline-end:0;top:0;bottom:0;width:min(420px,100vw);background:#0d1411;border-inline-start:1px solid var(--border);z-index:40;overflow-y:auto}.drawer-head{display:flex;align-items:center;justify-content:space-between;padding:18px;border-bottom:1px solid var(--border)}.drawer-body{padding:18px}.drawer-actions{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:18px}
.kv{margin:0}.kv dt{color:var(--muted);font-size:10px;text-transform:uppercase;letter-spacing:.4px;margin-top:12px}.kv dd{margin:2px 0 0;font-size:13px;word-break:break-word}.msg-box{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:13px;white-space:pre-wrap;font-size:12px;line-height:1.7}
.toast-zone{position:fixed;bottom:18px;inset-inline-end:18px;display:grid;gap:9px;z-index:50}.toast{background:#123523;border:1px solid #1f4e38;color:#d8f5e2;border-radius:10px;padding:12px 15px;max-width:320px;cursor:pointer}.toast strong{display:block;font-size:12px;margin-bottom:4px}.toast small{font-size:11px;color:#8fd9ad;display:block;line-height:1.6}
.fatal{padding:40px;text-align:center;line-height:1.8;color:#e8a7a7}
.auth-wrap{padding-top:120px;display:grid;place-items:center}.auth-card{width:min(360px,90vw);background:var(--card);border:1px solid var(--border);border-radius:14px;padding:32px}.auth-card h1{font-size:19px;margin:0 0 22px}.auth-card label{display:grid;gap:6px;font-size:12px;color:var(--muted);margin-bottom:14px}.auth-card input{background:#0a0f0d;border:1px solid var(--border);color:#e7efe6;border-radius:8px;padding:10px 12px}.auth-error{color:#e8a7a7;font-size:12px}.auth-hint{font-size:11px;color:var(--muted);line-height:1.6;margin-top:16px}
.btn{display:inline-block;border:none;border-radius:8px;padding:10px 16px;font-size:13px;cursor:pointer}.btn-primary{background:var(--green);color:#fff}.btn-secondary{background:var(--soft);color:#e7efe6;border:1px solid var(--border)}
@media(max-width:760px){.stat-grid{grid-template-columns:repeat(2,1fr)}.admin-search{min-width:100%;margin-inline-start:0}.cases{font-size:11px}}
`}</style>;