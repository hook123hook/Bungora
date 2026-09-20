"use client";
import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, CalendarDays, CircleHelp, Users } from "lucide-react";
import { useSitePreferences } from "@/components/site-preferences";
import { MoneroPayment } from "@/components/monero-payment";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getNightlyPrice, getNights, getStayEstimate, getStayError, localToday, type Bungalow } from "@/lib/bungalows";

export function BookingRequest({ bungalow, initialCheckIn, initialCheckOut, initialGuests }: {
  bungalow: Bungalow; initialCheckIn: string; initialCheckOut: string; initialGuests: number;
}) {
  const { t, dir, money } = useSitePreferences();
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(String(Math.max(1, Math.min(initialGuests, bungalow.capacity))));
  const [error, setError] = useState("");
  const [paymentOpen, setPaymentOpen] = useState(false);
  const paymentTrigger = useRef<HTMLButtonElement>(null);
  const nights = getNights(checkIn, checkOut);
  const estimate = getStayEstimate(bungalow, checkIn, checkOut, Number(guests));
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const invalid = getStayError(checkIn, checkOut);
    if (invalid) { setError(invalid); return; }
    if (!Number.isInteger(Number(guests)) || Number(guests) < 1 || Number(guests) > bungalow.capacity) { setError("Tarih ve konuk seçimini yeniden kontrol et."); return; }
    setError(""); setPaymentOpen(true);
  }
  return <section className="booking-box"><div className="booking-header"><div><p className="eyebrow">{t("KENDİNE BİR MOLA AYIR")}</p><h3>{t("Kaçamağını planla.")}</h3></div><p className="booking-price"><strong><bdi>{money(getNightlyPrice(bungalow))}</bdi></strong><span>{t("/ gece")}</span><small>{bungalow.price === null ? t("Tahmini gecelik fiyat") : t("Gecelik başlangıç fiyatı")}</small></p></div>{bungalow.price === null && <p className="generic-price-note">{t("Bu temsili tutar, katalogdaki fiyatların yuvarlanmış ortalamasıdır; tesisin onaylı fiyatı değildir.")}</p>}
    <form onSubmit={submit} noValidate><div className="booking-fields"><div><label htmlFor={`arrival-${bungalow.id}`}><CalendarDays size={13}/>{t("Giriş tarihi")}</label><Input id={`arrival-${bungalow.id}`} type="date" min={localToday()} value={checkIn} onChange={(event) => { setCheckIn(event.target.value); setError(""); }} aria-invalid={!!error} aria-describedby={error ? `booking-error-${bungalow.id}` : undefined}/></div><div><label htmlFor={`departure-${bungalow.id}`}><CalendarDays size={13}/>{t("Çıkış tarihi")}</label><Input id={`departure-${bungalow.id}`} type="date" min={checkIn || localToday()} value={checkOut} onChange={(event) => { setCheckOut(event.target.value); setError(""); }} aria-invalid={!!error} aria-describedby={error ? `booking-error-${bungalow.id}` : undefined}/></div><div className="booking-guests"><label htmlFor={`people-${bungalow.id}`}><Users size={13}/>{t("Misafirler")}</label><Select dir={dir} value={guests} onValueChange={setGuests}><SelectTrigger id={`people-${bungalow.id}`} className="booking-guest-select"><SelectValue>{t("{n} misafir", { n: guests })}</SelectValue></SelectTrigger><SelectContent>{Array.from({ length: bungalow.capacity }, (_, index) => index + 1).map((number) => <SelectItem key={number} value={String(number)}>{t("{n} misafir", { n: number })}</SelectItem>)}</SelectContent></Select></div></div>
{error && <p className="booking-error" id={`booking-error-${bungalow.id}`} role="alert">{t(error)}</p>}
      {nights > 0 && !getStayError(checkIn, checkOut) && (estimate ? <div className="booking-calculation"><span>{t("{nights} gece × {price} = ödenecek tutar", { nights, price: money(getNightlyPrice(bungalow)) })}</span><strong><bdi>{money(estimate.total)}</bdi></strong></div> : <p className="no-rate-note">{t("Bu tarih ve kişi seçimi için fiyat henüz belirlenmedi. Kesin tutar için SimpleX üzerinden ulaş.")}</p>)}
      <button className="primary-button booking-submit" type="submit" ref={paymentTrigger} disabled={!estimate}>{t("Ödeme ekranına geç")}<ArrowRight className="directional-icon" size={16}/></button><p className="booking-fineprint"><CircleHelp size={12}/>{t("Rezervasyon talebi oluşturulur; ödeme Monero (XMR) ile anonim yapılır.")}</p>
    </form>
    <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}><DialogContent dir={dir} className="payment-dialog" closeLabel={t("Kapat")} onCloseAutoFocus={(event) => { event.preventDefault(); paymentTrigger.current?.focus(); }}><MoneroPayment key={`${bungalow.id}-${checkIn}-${checkOut}-${guests}`} bungalow={bungalow} checkIn={checkIn} checkOut={checkOut} guests={Number(guests)}/></DialogContent></Dialog>
  </section>;
}
