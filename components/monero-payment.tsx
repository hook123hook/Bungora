"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, CircleCheck, CircleHelp, Copy, LockKeyhole, MapPin, Wallet } from "lucide-react";
import { DialogClose, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PropertyPhoto } from "@/components/property-photo";
import { useSitePreferences } from "@/components/site-preferences";
import { getNights, getStayError, getStayPriceBreakdown, type Bungalow } from "@/lib/bungalows";

const SIMPLEXLINK = "https://smp19.simplex.im/a#o7JePoRgFSCSF5EaJJcJ8gG2a7CzrOLaeo9aVU3rliE";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type InvoiceData = {
  id: string;
  invoice_no: string;
  address: string;
  amount_try: number;
  amount_xmr: number;
  fx_rate: number;
  expires_at: string;
  qr: string;
};
type StatusData = {
  id: string;
  invoice_no: string;
  status: "pending" | "partial" | "credited" | "expired" | "void";
  confirmations: number;
  received_amount_xmr: number | null;
  expires_at: string;
};

function timeLeft(expiresAt: string, now: number) {
  return Math.max(0, Math.floor((Date.parse(expiresAt) - now) / 1000));
}

export function MoneroPayment({ bungalow, checkIn, checkOut, guests }: { bungalow: Bungalow; checkIn: string; checkOut: string; guests: number }) {
  const { t, money, date, language } = useSitePreferences();
  const receipt = useRef<HTMLHeadingElement>(null);
  const invalid = !!getStayError(checkIn, checkOut) || !Number.isInteger(guests) || guests < 1 || guests > bungalow.capacity;
  const estimate = invalid ? null : getStayPriceBreakdown(bungalow, checkIn, checkOut, guests);
  const nights = getNights(checkIn, checkOut);

  const [step, setStep] = useState<"form" | "pay" | "paid" | "expired" | "error">(estimate ? "form" : "error");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [status, setStatus] = useState<StatusData | null>(null);
  const [copied, setCopied] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (step !== "pay" || !invoice) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial tick so countdown shows immediately on pay
    setSecondsLeft(timeLeft(invoice.expires_at, Date.now()));
    const timer = setInterval(() => setSecondsLeft(timeLeft(invoice.expires_at, Date.now())), 1000);
    return () => clearInterval(timer);
  }, [step, invoice]);

  useEffect(() => {
    if (step !== "pay" || !invoice) return;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const inv = invoice;
    async function poll() {
      try {
        const r = await fetch(`/api/xmr/status?id=${encodeURIComponent(inv.id)}`, { cache: "no-store" });
        if (!r.ok) throw new Error("status");
        const row: StatusData = await r.json();
        if (stopped) return;
        setStatus(row);
        if (row.status === "credited") { setStep("paid"); requestAnimationFrame(() => receipt.current?.focus()); return; }
        if (row.status === "expired" || row.status === "void") { setStep("expired"); return; }
        if (timeLeft(inv.expires_at, Date.now()) <= 0) { setStep("expired"); return; }
      } catch { /* Retry on the next tick. */ }
      timer = setTimeout(poll, 4000);
    }
    void poll();
    return () => { stopped = true; clearTimeout(timer); };
  }, [step, invoice]);

  const copyAddress = useCallback(async () => {
    if (!invoice) return;
    try { await navigator.clipboard.writeText(invoice.address); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* Clipboard denied. */ }
  }, [invoice]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || !estimate || !agreed) return;
    if (!firstName.trim() || !contact.trim()) { setError(t("Lütfen adını ve iletişim bilgini gir.")); return; }
    setSending(true); setError("");
    let bookingOk = false;
    let bookingId: string | null = null;
    try {
      const booking = await fetch("/api/booking", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          contact: contact.trim(),
          email: EMAIL_RE.test(contact.trim()) ? contact.trim().toLowerCase() : null,
          listing_id: bungalow.id,
          listing_name: bungalow.name,
          check_in: checkIn,
          check_out: checkOut,
          guests,
          nights,
          nightly_price: estimate.total / Math.max(1, nights),
          total_try: Math.round(estimate.total),
          price_estimate: estimate.basis !== "generic",
          lang: language,
          message: message.trim(),
          website: "",
        }),
      });
      bookingOk = booking.ok;
      const bookingData: { id?: unknown } = await booking.json().catch(() => ({}));
      bookingId = typeof bookingData.id === "string" ? bookingData.id : null;
    } catch { /* Booking failure is not fatal; invoice still works. */ }

    try {
      const invoiceReference = bookingId ? `${bungalow.id}-${checkIn}-${checkOut}-${bookingId}` : `${bungalow.id}-${checkIn}-${checkOut}`;
      const invoiceLabel = `${bungalow.name} · ${date(checkIn)} — ${date(checkOut)}`;
      const r = await fetch("/api/xmr/invoice", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount_try: Math.round(estimate.total), reference: invoiceReference, label: invoiceLabel }),
      });
      const data = await r.json();
      if (!r.ok) {
        setError(data?.message || data?.error || t("Fatura oluşturulamadı. Daha sonra yeniden dene."));
        setStep("error");
        return;
      }
      setInvoice(data); setStep("pay");
      if (!bookingOk) { /* Booking kept locally; invoice flow proceeds. */ }
    } catch {
      setError(t("Fatura oluşturulamadı. Daha sonra yeniden dene."));
      setStep("error");
    } finally {
      setSending(false);
    }
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const countdown = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  if (step === "paid") {
    const confirmationCode = status?.invoice_no || invoice?.invoice_no || "";
    return <div className="payment-complete" id="booking-receipt">
      <span className="complete-icon"><CircleCheck size={38}/></span>
      <DialogHeader>
        <DialogTitle ref={receipt} tabIndex={-1}>{t("Rezervasyon onaylandı.")}</DialogTitle>
        <DialogDescription>{t("Ödemen alındı. Aşağıdaki onay kodunu SimpleX'ten tesise ilet; teyit ve detaylar için seninle iletişime geçecekler.")}</DialogDescription>
      </DialogHeader>
      <div className="receipt-card">
        <div className="receipt-code-box">
          <small>{t("Rezervasyon Onay Kodu")}</small>
          <strong className="receipt-code" dir="ltr">{confirmationCode}</strong>
          <button type="button" className="xmr-copy-button" onClick={async () => { try { await navigator.clipboard.writeText(confirmationCode); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard denied */ } }}>{copied ? t("Kopyalandı.") : t("Kodu kopyala")}</button>
        </div>
        <dl className="receipt-details">
          <div><dt>{t("Tesis")}</dt><dd>{bungalow.name}</dd></div>
          <div><dt>{t("Giriş")}</dt><dd>{date(checkIn)}</dd></div>
          <div><dt>{t("Çıkış")}</dt><dd>{date(checkOut)}</dd></div>
          <div><dt>{t("Konaklama")}</dt><dd>{t("{nights} gece · {guests} misafir", { nights, guests })}</dd></div>
          <div><dt>{t("Ödenen tutar")}</dt><dd>≈ {estimate ? money(estimate.total) : ""} · {(status?.received_amount_xmr ?? invoice?.amount_xmr ?? 0).toFixed(6)} XMR</dd></div>
        </dl>
      </div>
      <div className="receipt-simplex">
        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&qzone=1&data=${encodeURIComponent(SIMPLEXLINK)}`} width={140} height={140} alt={t("SimpleX QR kodu")} loading="lazy"/>
        <div>
          <p><strong>{t("SimpleX ile iletişime geç")}</strong></p>
          <p>{t("QR kodu okut veya aşağıdaki butonu tıkla. Onay kodunu mesaj olarak yaz.")}</p>
          <a className="primary-button" href={SIMPLEXLINK} target="_blank" rel="noopener noreferrer">{t("SimpleX'te aç")}<ArrowRight className="directional-icon" size={16}/></a>
        </div>
      </div>
      <div className="receipt-actions">
        <DialogClose className="edit-request">{t("Kapat")}</DialogClose>
      </div>
      <p className="xmr-privacy-note"><LockKeyhole size={13}/>{t("Ödeme anonim Monero (XMR) üzerinden yapıldı; kart veya banka bilgisi istenmedi. Bu ekran bilgileri sakla.")}</p>
    </div>;
  }

  if (step === "error" || !estimate) {
    return <div className="payment-screen"><DialogHeader className="payment-header"><p className="eyebrow">{t("MONERO (XMR) İLE ÖDE")}</p><DialogTitle>{t("Şu an ödeme başlatılamıyor.")}</DialogTitle><DialogDescription>{t("Bu konaklama için kesin bir tutar istemeden ödeme ekranı açılamıyor. SimpleX üzerinden ulaş, tutarı birlikte netleştir.")}</DialogDescription></DialogHeader>
      <div className="xmr-fallback"><a className="primary-button" href={SIMPLEXLINK} target="_blank" rel="noopener noreferrer"><Wallet size={16}/>{t("SimpleX üzerinden yaz")}</a><DialogClose className="edit-request"><ArrowLeft className="directional-icon" size={15}/>{t("Tarihleri değiştir")}</DialogClose></div>
      {error && <p className="booking-error" role="alert">{error}</p>}
    </div>;
  }

  if (step === "expired" && invoice) {
    return <div className="payment-screen"><DialogHeader className="payment-header"><p className="eyebrow">{t("MONERO (XMR) İLE ÖDE")}</p><DialogTitle>{t("Ödeme süresi doldu.")}</DialogTitle><DialogDescription>{t("Bu fatura yalnızca {invoice_no} numarasıyla {minutes} dakika geçerliydi. Yeni bir fatura için ekranı kapatıp tekrar başlat." , { invoice_no: invoice.invoice_no, minutes: 30 })}</DialogDescription></DialogHeader>
      <div className="xmr-fallback"><DialogClose className="primary-button">{t("Ekranı kapat")}</DialogClose></div>
      <p className="xmr-privacy-note"><LockKeyhole size={13}/>{t("Gönderdiysen adresi yine de kontrol et; o adrese gelen ödeme takip cüzdanında görünür.")}</p>
    </div>;
  }

  if (step === "pay" && invoice) {
    return <div className="payment-screen">
      <DialogHeader className="payment-header"><p className="eyebrow">{t("MONERO (XMR) İLE ÖDE")}</p><DialogTitle>{t("Faturan hazır.")}</DialogTitle><DialogDescription>{t("Ödemeyi Monero cüzdanından bu adrese gönder. Tutar ve adres bir kez oluşturulur; aynı adrese tek seferde beklentisiyle gönder.")}</DialogDescription></DialogHeader>
      <ol className="checkout-steps" aria-label={t("İşlem adımları")}><li><CircleCheck size={14}/>{t("Konaklama")}</li><li aria-current="step"><span>02</span>{t("Ödeme")}</li><li><span>03</span>{t("Onay")}</li></ol>
      <div className="checkout-layout">
        <section className="checkout-summary xmr-summary" aria-labelledby="xmr-amount-heading">
          <h3 id="xmr-amount-heading">{t("Gönderilecek tutar")}</h3>
          <div className="xmr-amount-box"><strong className="xmr-amount-xmr"><bdi>{invoice.amount_xmr.toFixed(6)} XMR</bdi></strong><span className="xmr-amount-try">{t("≈ {amount} (fatura kurundan)", { amount: money(invoice.amount_try) })}</span></div>
          <p className="xmr-rate-line">{t("Kur: 1 XMR ≈ {rate} · %{safety} güvenlik payı dahil", { rate: money(invoice.fx_rate), safety: 3 })}</p>
          <div className="xmr-invoice-ref"><span>{t("Fatura")}</span><strong><bdi>{invoice.invoice_no}</bdi></strong></div>
          <dl className="request-summary xmr-property-summary"><div className="checkout-property"><div className="checkout-photo"><PropertyPhoto src={bungalow.image} alt={bungalow.name}/></div><div><strong>{bungalow.name}</strong><p><MapPin size={12}/>{bungalow.location}</p></div></div><div><dt>{t("Giriş")}</dt><dd>{date(checkIn)}</dd></div><div><dt>{t("Çıkış")}</dt><dd>{date(checkOut)}</dd></div><div><dt>{t("Konaklama")}</dt><dd>{t("{nights} gece · {guests} misafir", { nights, guests })}</dd></div></dl>
        </section>
        <section className="payment-panel" aria-labelledby="xmr-address-heading">
          <h3 id="xmr-address-heading"><Wallet size={19}/>{t("Monero adresi")}</h3>
          <p className="payment-panel-note">{t("{invoice_no} fatura numarasıyla aynı adrese yalnızca bu ödeme için tahsis edildi", { invoice_no: invoice.invoice_no })}</p>
          <div className="xmr-address-layout">
            <img className="xmr-qr" src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&qzone=1&data=${encodeURIComponent(invoice.qr)}`} width={150} height={150} alt={t("Monero ödeme QR kodu")} loading="lazy"/>
            <code className="xmr-address" dir="ltr">{invoice.address}</code>
          </div>
          <button type="button" className="xmr-copy-button" onClick={copyAddress}><Copy size={15}/>{copied ? t("Kopyalandı.") : t("Adresi kopyala")}</button>
          <div className="xmr-status">
            <span className={`xmr-status-dot ${status?.status === "partial" ? "is-partial" : status?.status === "credited" ? "is-done" : ""}`} aria-hidden="true"/>
            <div><strong>{status?.status === "partial" ? t("Kısmi ödeme görüldü") : status?.status === "credited" ? t("Ödeme alındı") : t("Ödeme bekleniyor")}</strong><small>{status?.status === "partial" ? t("Gönderilen tutar beklenenden farklı — destek için kopyaladığın adresi ve fatura numarasını ilet.") : t("Gönderimi işledikçe burada görünür. 10 blok onayı birkaç dakika sürebilir.")}</small></div>
          </div>
          <p className="xmr-expiry"><CircleHelp size={13}/>{t("Ödeme süresi")}: <strong><bdi>{countdown}</bdi></strong> <span>{t("Geride")}</span></p>
          <DialogClose className="edit-request"><ArrowLeft className="directional-icon" size={15}/>{t("Ekranı kapat")}</DialogClose>
        </section>
      </div>
    </div>;
  }

  return <div className="payment-screen">
    <DialogHeader className="payment-header"><p className="eyebrow">{t("İLETİŞİM · REZERVASYON TALEBİ")}</p><DialogTitle>{t("Ödemen için son adım.")}</DialogTitle><DialogDescription>{t("Tesise görünür bir talep oluşturulur; ödemeni anonim Monero (XMR) ile yaparsın.")}</DialogDescription></DialogHeader>
    <ol className="checkout-steps" aria-label={t("İşlem adımları")}><li aria-current="step"><span>01</span>{t("İletişim")}</li><li><span>02</span>{t("Ödeme")}</li><li><span>03</span>{t("Onay")}</li></ol>
    <div className="checkout-layout">
      <section className="checkout-summary" aria-labelledby="stay-summary-heading"><h3 id="stay-summary-heading">{t("Konaklama özeti")}</h3><div className="checkout-property"><div className="checkout-photo"><PropertyPhoto src={bungalow.image} alt={bungalow.name}/></div><div><strong>{bungalow.name}</strong><p><MapPin size={12}/>{bungalow.location}</p></div></div><dl className="request-summary"><div><dt>{t("Giriş")}</dt><dd>{date(checkIn)}</dd></div><div><dt>{t("Çıkış")}</dt><dd>{date(checkOut)}</dd></div><div><dt>{t("Konaklama")}</dt><dd>{t("{nights} gece · {guests} misafir", { nights, guests })}</dd></div>{estimate.lines.map((line) => <div className="stay-price-line" key={line.nightlyPrice}><dt><bdi>{t("{nights} gece × {price}", { nights: line.nights, price: money(line.nightlyPrice) })}</bdi></dt><dd><bdi>{money(line.total)}</bdi></dd></div>)}<div className="summary-total"><dt>{t("Tahmini konaklama tutarı")}</dt><dd>{<bdi>{money(estimate.total)}</bdi>}</dd></div></dl>
        <p className="xmr-privacy-note"><LockKeyhole size={13}/>{t("Ödeme takibi anonim Monero ile yapılır; kart veya banka bilgisi istenmez.")}</p>
      </section>
      <section className="payment-panel" aria-labelledby="contact-fields-heading">
        <h3 id="contact-fields-heading">{t("İletişim bilgileri")}</h3>
        <form className="xmr-contact-fields" onSubmit={submit} noValidate>
          <div><label htmlFor="xmr-first-name">{t("Ad")}</label><Input id="xmr-first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" required/></div>
          <div><label htmlFor="xmr-last-name">{t("Soyad")}</label><Input id="xmr-last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name"/></div>
          <div><label htmlFor="xmr-contact">{t("İletişim (e-posta veya SimpleX)")}</label><Input id="xmr-contact" value={contact} onChange={(e) => setContact(e.target.value)} autoComplete="email" dir="ltr" required/></div>
          <div><label htmlFor="xmr-message">{t("Mesaj (isteğe bağlı)")}</label><Input id="xmr-message" value={message} onChange={(e) => setMessage(e.target.value)}/></div>
          <input type="text" name="website" value="" hidden aria-hidden="true" tabIndex={-1} autoComplete="off"/>
          <label className="payment-acknowledgement"><input type="checkbox" className="xmr-checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}/><span>{t("Rezervasyon talebimin kaydedilmesini kabul ediyorum. {amount} tutarındaki fatura bir kez oluşturulur ve ödeme bilgilerim gizli tutulur.", { amount: money(estimate.total) })}</span></label>
          {error && <p className="booking-error" role="alert">{error}</p>}
          <button type="submit" className="primary-button booking-submit" disabled={sending}>{sending ? t("Gönderiliyor…") : t("Talep gönder ve XMR ile öde")}<ArrowRight className="directional-icon" size={16}/></button>
          <DialogClose className="edit-request"><ArrowLeft className="directional-icon" size={15}/>{t("Tarihleri değiştir")}</DialogClose>
        </form>
      </section>
    </div>
  </div>;
}
