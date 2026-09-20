"use client";
import { useSitePreferences, HeaderPreferences } from "@/components/site-preferences";
import { useMemo, useRef, useState, type FormEvent } from "react";
import { ArrowDownUp, ArrowRight, BedDouble, CalendarDays, Check, CircleHelp, Compass, Flame, Leaf, MapPin, PawPrint, Search, SlidersHorizontal, Sparkles, Trees, Users, Waves, X } from "lucide-react";
import { PropertyGallery } from "@/components/property-gallery";
import { BannerSlideshow } from "@/components/banner-slideshow";
import { getPropertyPhotos } from "@/lib/property-gallery";
import { PropertyPhoto } from "@/components/property-photo";
import { BookingRequest } from "@/components/booking-request";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { BUNGALOWS, REGIONS, FEATURES, MAX_PRICE, getNightlyPrice, filterBungalows, getStayError, type Bungalow, type FeatureId, type SortOrder } from "@/lib/bungalows";
import { localizeBungalow } from "@/lib/catalog-translations";
import { translate } from "@/lib/messages";
const SEARCHABLE_BUNGALOWS = BUNGALOWS.map((item) => ({ ...item, aliases: [...(item.aliases ?? []), ...(["en", "ar", "ru"] as const).map((language) => translate(language, item.region))] }));
const featureIcons = { pool: Waves, heated: Waves, jacuzzi: Sparkles, fireplace: Flame, pets: PawPrint, breakfast: Leaf };
function Brand() {
    const { t } = useSitePreferences();
    return <a className="brand" href="#top" aria-label={t("Bungora ana sayfa")}><span className="brand-mark" aria-hidden="true"/><span className="brand-wordmark">bungora</span></a>;
}
function GuestPicker({ value, onChange, id }: {
    value: string;
    onChange: (value: string) => void;
    id: string;
}) {
    const { t, dir } = useSitePreferences();
    return <Select dir={dir} value={value} onValueChange={onChange}><SelectTrigger id={id} className="guest-select" aria-label={t("Misafir sayısı")}><SelectValue>{t("{n} misafir", { n: value })}</SelectValue></SelectTrigger><SelectContent>{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => <SelectItem key={n} value={String(n)}>{t("{n} misafir", { n })}</SelectItem>)}</SelectContent></Select>;
}
export default function Home() {
    const { t, language, dir, money } = useSitePreferences();
    const [query, setQuery] = useState("");
    const [appliedQuery, setAppliedQuery] = useState("");
    const [region, setRegion] = useState("Tümü");
    const [guests, setGuests] = useState("2");
    const [appliedGuests, setAppliedGuests] = useState(2);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
    const [features, setFeatures] = useState<FeatureId[]>([]);
    const [sort, setSort] = useState<SortOrder>("recommended");
    const [mobileFilters, setMobileFilters] = useState(false);
    const [selectedRecord, setSelected] = useState<Bungalow | null>(null);
    const selected = selectedRecord ? localizeBungalow(selectedRecord, language) : null;
    const detailOpener = useRef<HTMLElement | null>(null);
    const [dateError, setDateError] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const results = useMemo(() => filterBungalows(SEARCHABLE_BUNGALOWS, { query: appliedQuery, region, guests: appliedGuests, maxPrice, features, sort }).map((item) => localizeBungalow(item, language)), [language, appliedQuery, region, appliedGuests, maxPrice, features, sort]);
    const filterCount = features.length + Number(maxPrice < MAX_PRICE) + Number(region !== "Tümü");
    function openDetails(bungalow: Bungalow) {
        detailOpener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        setSelected(BUNGALOWS.find((item) => item.id === bungalow.id) ?? bungalow);
    }
    function resetFilters() {
        setQuery("");
        setAppliedQuery("");
        setRegion("Tümü");
        setGuests("2");
        setAppliedGuests(2);
        setMaxPrice(MAX_PRICE);
        setFeatures([]);
        setSort("recommended");
        setCheckIn("");
        setCheckOut("");
        setDateError("");
        setSearchStatus("");
    }
    function toggleFeature(feature: FeatureId, enabled: boolean) {
        setFeatures((current) => enabled ? [...current.filter((item) => item !== feature), feature] : current.filter((item) => item !== feature));
    }
    function search(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (checkIn || checkOut) {
            const error = getStayError(checkIn, checkOut);
            if (error) {
                setDateError(error);
                return;
            }
        }
        setDateError("");
        setAppliedQuery(query);
        setAppliedGuests(Number(guests));
        setSearchStatus(checkIn ? "Tarihler eklendi; gerçek müsaitlik doğrulaması yapılmaz." : "Seçimlerine uygun bungalovlar gösteriliyor.");
        document.getElementById("bungalovlar")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    function showPoolBungalows() {
        resetFilters();
        setFeatures(["pool"]);
        document.getElementById("bungalovlar")?.scrollIntoView({ behavior: "smooth" });
    }
    const filterFields = <>
    <div className="filter-section"><h3>{t("Gecelik bütçen")}</h3><p className="filter-caption">{t("Gecelik başlangıç fiyatı")}</p><div className="price-limits"><span><bdi>{money(0)}</bdi></span><strong><bdi>{money(maxPrice)}</bdi>{maxPrice === MAX_PRICE ? "+" : ""}</strong></div><Slider dir={dir} className="budget-slider" aria-valuetext={money(maxPrice)} aria-label={t("En yüksek gecelik fiyat")} min={0} max={MAX_PRICE} step={250} value={[maxPrice]} onValueChange={(value) => setMaxPrice(value[0])}/><p className="range-hint">{t("Fiyatı belirtilmeyen ilanlarda temsili ortalama kullanılır.")}</p></div>
    <div className="filter-section"><h3>{t("Nasıl bir kaçamak?")}</h3><div className="feature-options">{FEATURES.map((feature) => { const Icon = featureIcons[feature.id]; return <label key={feature.id} className="filter-checkbox"><Checkbox checked={features.includes(feature.id)} onCheckedChange={(checked) => toggleFeature(feature.id, checked === true)}/><Icon size={16} strokeWidth={1.6}/><span>{t(feature.label)}</span></label>; })}</div></div>
    <div className="filter-footnote"><Leaf size={23} strokeWidth={1.4}/><p>{t("Biraz yavaşla.")}<br /><strong>{t("Doğa seni bekliyor.")}</strong></p></div>
  </>;
    return <div id="top" dir={dir} lang={language}>
    <a className="skip-link" href="#main">{t("İçeriğe geç")}</a>
    <header className="header"><div className="shell header-inner"><Brand /><nav aria-label={t("Ana menü")}><a className="nav-active" href="#bungalovlar">{t("Bungalovları keşfet")}</a><a href="#bolgeler">{t("Bölgeler")}</a><button onClick={showPoolBungalows}>{t("Havuzlu bungalovlar")}</button></nav><HeaderPreferences /></div></header>
    <main id="main" className="shell">
      <section className="intro" aria-labelledby="main-title"><div><h1 id="main-title">{t("Bir bungalov.")}<br className="mobile-break"/> <em>{t("Bin güzel ihtimal.")}</em></h1><p className="intro-description">{t("Türkiye’nin kıyılarından yaylalarına, sana uygun bir bungalov.")}</p></div><div className="intro-note"><Trees size={32} strokeWidth={1.2}/><span>{t("Şehrin sesini kıs.")}<br /><strong>{t("Doğaya kulak ver.")}</strong></span></div></section>
      <form className="search-bar" onSubmit={search} aria-label={t("Bungalov ara")}>
        <div className="search-field destination-field"><MapPin size={20}/><div><label htmlFor="destination">{t("Nereye gidelim?")}</label><Input id="destination" placeholder={t("Bölge veya bungalov adı")} autoComplete="off" value={query} onChange={(event) => setQuery(event.target.value)}/></div></div>
        <div className="search-field date-field"><CalendarDays size={19}/><div><label htmlFor="check-in">{t("Giriş tarihi")}</label><Input id="check-in" aria-describedby={dateError ? "date-error" : undefined} type="date" value={checkIn} onChange={(event) => { setCheckIn(event.target.value); setDateError(""); }}/></div></div>
        <div className="search-field date-field"><CalendarDays size={19}/><div><label htmlFor="check-out">{t("Çıkış tarihi")}</label><Input id="check-out" aria-describedby={dateError ? "date-error" : undefined} type="date" min={checkIn || undefined} value={checkOut} onChange={(event) => { setCheckOut(event.target.value); setDateError(""); }}/></div></div>
        <div className="search-field guest-field"><Users size={19}/><div><label htmlFor="guests">{t("Kimler geliyor?")}</label><GuestPicker id="guests" value={guests} onChange={setGuests}/></div></div>
        <button type="submit" className="primary-button search-button"><Search size={18}/>{t("Bungalov bul")}</button>
      </form>
      {dateError && <p className="field-error" id="date-error" role="alert">{t(dateError)}</p>}
      <BannerSlideshow/>
      <section className="region-row" id="bolgeler" aria-label={t("Bölge seç")}><span className="region-label"><Compass size={18}/>{" " + t("Rotanı seç") + ""}</span><div className="region-chips">{["Tümü", ...REGIONS].map((item) => <button key={item} className={`region-chip ${region === item ? "selected" : ""}`} aria-pressed={region === item} onClick={() => setRegion(item)}>{t(item === "Tümü" ? "Tüm bölgeler" : item)}{region === item && <Check size={13}/>}</button>)}</div><p>{t("Her rota, başka bir hikâye.")}</p></section>
      <section className="catalog" id="bungalovlar" aria-labelledby="catalog-title">
        <aside className="filter-panel"><div className="filter-title"><h2><SlidersHorizontal size={17}/>{t("Filtrele")}</h2><button onClick={resetFilters}>{t("Temizle")}</button></div>{filterFields}</aside>
        <div className="catalog-main"><div className="catalog-toolbar"><div><h2 id="catalog-title">{t("Sana iyi gelecek yerler")}</h2><p aria-live="polite"><strong>{t("{n} bungalov", { n: results.length })}</strong>{" " + t("keşfedilmeyi bekliyor") + " "}</p></div><div className="toolbar-actions"><button className="mobile-filter-button" onClick={() => setMobileFilters(true)}><SlidersHorizontal size={16}/>{t("Filtrele")}{filterCount > 0 && <span>{filterCount}</span>}</button><Select dir={dir} value={sort} onValueChange={(value) => setSort(value as SortOrder)}><SelectTrigger className="sort-select" aria-label={t("Bungalovları sırala")}><ArrowDownUp size={14}/><SelectValue>{t(sort === "recommended" ? "Önerilen sıralama" : sort === "price-asc" ? "Fiyat: düşükten yükseğe" : "Fiyat: yüksekten düşüğe")}</SelectValue></SelectTrigger><SelectContent><SelectItem value="recommended">{t("Önerilen sıralama")}</SelectItem><SelectItem value="price-asc">{t("Fiyat: düşükten yükseğe")}</SelectItem><SelectItem value="price-desc">{t("Fiyat: yüksekten düşüğe")}</SelectItem></SelectContent></Select></div></div>
        {searchStatus && <div className="search-status" role="status"><Check size={14}/>{t(searchStatus)}<button aria-label={t("Bilgiyi kapat")} onClick={() => setSearchStatus("")}><X size={14}/></button></div>}
        {(appliedQuery || features.length > 0 || maxPrice < MAX_PRICE || appliedGuests > 2) && <div className="active-filters">{appliedQuery && <button onClick={() => { setAppliedQuery(""); setQuery(""); }}>{appliedQuery}<X size={12}/></button>}{features.map((feature) => <button key={feature} onClick={() => toggleFeature(feature, false)}>{t(FEATURES.find((item) => item.id === feature)?.label ?? "")}<X size={12}/></button>)}{maxPrice < MAX_PRICE && <button onClick={() => setMaxPrice(MAX_PRICE)}>{"" + t("En çok") + " "}<bdi>{money(maxPrice)}</bdi><X size={12}/></button>}{appliedGuests > 2 && <button onClick={() => { setAppliedGuests(2); setGuests("2"); }}>{t("{n} misafir", { n: appliedGuests })}<X size={12}/></button>}</div>}
        {results.length ? <div className="property-grid">{results.map((bungalow) => <article className="property-card" data-property-id={bungalow.id} key={bungalow.id}><button className="property-image" onClick={() => openDetails(bungalow)} aria-label={t("{name} detaylarını aç", { name: bungalow.name })}><PropertyPhoto src={bungalow.image} alt={bungalow.name}/><span className="property-tag">{bungalow.tag}</span><span className="image-counter">{t("{n} fotoğraf", { n: getPropertyPhotos(bungalow).length })}</span></button><div className="property-body"><p className="property-location"><MapPin size={13}/>{bungalow.location}</p><h3><button onClick={() => openDetails(bungalow)}>{bungalow.name}</button></h3><div className="property-capacity"><span><Users size={14}/>{bungalow.capacityLabel ?? t("{n} misafir", { n: bungalow.capacity })}</span>{bungalow.bedrooms !== null && <><i /><span><BedDouble size={15}/>{t("{n} oda", { n: bungalow.bedrooms! })}</span></>}</div><div className="property-features">{bungalow.features.slice(0, 2).map((feature) => { const Icon = featureIcons[feature]; return <span key={feature}><Icon size={12}/>{t(FEATURES.find((item) => item.id === feature)?.shortLabel ?? "")}</span>; })}</div><div className="property-bottom"><div><p><strong><bdi>{money(getNightlyPrice(bungalow))}</bdi></strong><span>{" " + t("/ gece") + ""}</span></p><small>{bungalow.price !== null ? t("Başlangıç fiyatı · koşulları incele") : t("Tahmini gecelik fiyat")}</small></div><button className="detail-button" onClick={() => openDetails(bungalow)}>{t("İncele")}<ArrowRight className="directional-icon" size={15}/></button></div></div></article>)}</div> : <div className="empty-state"><Search size={33} strokeWidth={1.3}/><h3>{t("Bu kez biraz farklı bakalım.")}</h3><p>{t("Bu seçimlerle eşleşen ilan yok.")}<br />{t("Filtreleri azaltarak yeni bir rota bulabilirsin.")}</p><button className="primary-button" onClick={resetFilters}>{t("Tüm bungalovları göster")}<ArrowRight className="directional-icon" size={16}/></button></div>}
        <p className="demo-note"><CircleHelp size={14}/><span>{t("Fiyatlar tarihe, kişi sayısına ve konaklama koşullarına göre değişebilir. Rezervasyon talebi kaydedilir ve ödeme Monero (XMR) ile anonim yapılır; canlı müsaitlik kontrolü yapılmaz.")}</span></p></div>
      </section>
      <section className="slow-note"><div className="slow-icon"><Leaf size={28} strokeWidth={1.4}/></div><div><p className="eyebrow">{t("BİR SONRAKİ MOLAN")}</p><h2>{"" + t("Az plan.") + " "}<em>{t("Çok güzel an.")}</em></h2><p>{t("Bir fincan kahve, temiz hava ve sana ait bir bungalov.")}</p></div><a href="#top">{t("Kaçamağını planla")}<ArrowRight className="directional-icon" size={18}/></a></section>
    </main>
    <footer className="footer"><div className="shell"><Brand /><p>{t("Yalnızca bungalov. Doğanın her tonunda.")}</p><a className="simplex-contact" href="https://smp19.simplex.im/a#o7JePoRgFSCSF5EaJJcJ8gG2a7CzrOLaeo9aVU3rliE" target="_blank" rel="noopener noreferrer"><img src="/images/simplex-qr.png" width={72} height={72} alt={t("SimpleX davet QR kodu")} loading="lazy"/><span>{t("Rezervasyon ve iletişim SimpleX üzerinden — QR'ı okut, yaz.")}</span></a><span>{t("© 2026 · Tasarım konsepti")}</span></div></footer>
    <Dialog open={mobileFilters} onOpenChange={setMobileFilters}><DialogContent dir={dir} closeLabel={t("Kapat")} className="filters-dialog"><DialogHeader><DialogTitle>{t("Kaçamağını filtrele")}</DialogTitle><DialogDescription>{t("Bütçeni ve bungalov özelliklerini seç.")}</DialogDescription></DialogHeader>{filterFields}<button className="primary-button" onClick={() => setMobileFilters(false)}>{t("{n} bungalovu göster", { n: results.length })}<ArrowRight className="directional-icon" size={16}/></button><button className="text-button" onClick={resetFilters}>{t("Tüm filtreleri temizle")}</button></DialogContent></Dialog>
    <Dialog open={!!selected} onOpenChange={(open) => { if (!open)
        setSelected(null); }}><DialogContent dir={dir} className="property-dialog" showCloseButton={false} onCloseAutoFocus={(event) => { event.preventDefault(); detailOpener.current?.focus(); }}>{selected && <><DialogClose className="dialog-close" aria-label={t("Detayı kapat")}><X size={20}/></DialogClose><PropertyGallery key={selected.id} bungalow={selected}/><div className="detail-content"><DialogHeader><p className="property-location"><MapPin size={14}/>{selected.location}</p><DialogTitle className="detail-title">{selected.name}</DialogTitle><DialogDescription className="detail-description">{selected.description}</DialogDescription></DialogHeader><div className="detail-facts"><span><Users size={17}/>{selected.capacityLabel ?? t("En fazla {n} misafir", { n: selected.capacity })}</span>{selected.bedrooms !== null && <span><BedDouble size={18}/>{t("{n} oda", { n: selected.bedrooms! })}</span>}<span><Trees size={18}/>{t("Bungalov konaklama")}</span></div><h3 className="detail-subtitle">{t("Olanaklar")}</h3><div className="detail-amenities">{!selected.features.length && <p>{t("Olanak ayrıntılarını aşağıdaki konaklama bilgilerinden incele.")}</p>}{selected.features.map((feature) => { const Icon = featureIcons[feature]; return <span key={feature}><Icon size={18}/>{t(FEATURES.find((item) => item.id === feature)?.label ?? "")}</span>; })}</div><section className="listing-notes"><h3>{t("Konaklama bilgileri")}</h3><p>{selected.priceNote}</p><ul>{selected.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></section><BookingRequest key={selected.id} bungalow={selected} initialCheckIn={checkIn} initialCheckOut={checkOut} initialGuests={appliedGuests}/><p className="demo-note">{t("Rezervasyon talebin kaydedilir; ödeme Monero (XMR) ile anonim yapılır. Canlı müsaitlik kontrolü yapılmaz.")}</p></div></>}</DialogContent></Dialog>

  </div>;
}
