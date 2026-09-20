"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { PropertyPhoto } from "@/components/property-photo";
import { useSitePreferences } from "@/components/site-preferences";
import { getPropertyPhotos } from "@/lib/property-gallery";
import type { Bungalow } from "@/lib/bungalows";

export function PropertyGallery({ bungalow }: { bungalow: Bungalow }) {
  const { t, dir } = useSitePreferences();
  const photos = getPropertyPhotos(bungalow);
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);
  const attachApi = useCallback((next: CarouselApi) => {
    setApi(next);
    setIndex(next?.selectedScrollSnap() ?? 0);
  }, []);
  useEffect(() => {
    if (!api) return;
    const update = () => setIndex(api.selectedScrollSnap());
    api.on("select", update); api.on("reInit", update);
    return () => { api.off("select", update); api.off("reInit", update); };
  }, [api]);
  return <section className="property-gallery" aria-label={t("{name} fotoğraf galerisi", { name: bungalow.name })}>
    <Carousel key={dir} setApi={attachApi} opts={{ loop: photos.length > 1, direction: dir }} className="gallery-carousel" aria-label={t("Fotoğraflar")} aria-roledescription={t("Fotoğraf galerisi")} onKeyDownCapture={(event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const next = dir === "rtl" ? event.key === "ArrowLeft" : event.key === "ArrowRight";
      if (next) api?.scrollNext(); else api?.scrollPrev();
    }}>
      <CarouselContent className="gallery-slides">{photos.map((src, number) => <CarouselItem key={src} className="gallery-slide" aria-roledescription={t("Fotoğraf")} aria-label={t("Fotoğraf {current} / {total}", { current: number + 1, total: photos.length })}><PropertyPhoto src={src} alt={`${bungalow.name} · ${t("Fotoğraf {n}", { n: number + 1 })}`} eager={number === 0}/></CarouselItem>)}</CarouselContent>
      {photos.length > 1 && <><button className="gallery-arrow gallery-prev" type="button" onClick={() => api?.scrollPrev()} aria-label={t("Önceki fotoğraf")}><ChevronLeft className="directional-icon" size={22}/></button><button className="gallery-arrow gallery-next" type="button" onClick={() => api?.scrollNext()} aria-label={t("Sonraki fotoğraf")}><ChevronRight className="directional-icon" size={22}/></button></>}
      <span className="gallery-counter" aria-live="polite"><Images size={15}/>{t("Fotoğraf {current} / {total}", { current: index + 1, total: photos.length })}</span>
    </Carousel>
    {photos.length > 1 && <div className="gallery-thumbnails" aria-label={t("Tüm fotoğraflar")}>{photos.map((src, number) => <button type="button" key={src} className={index === number ? "selected" : ""} aria-label={t("Fotoğraf {n}", { n: number + 1 })} aria-pressed={index === number} onClick={() => api?.scrollTo(number)}><PropertyPhoto src={src} alt=""/></button>)}</div>}
    <p className="gallery-note">{t("Galeri, tesisin ortak alanlarını ve farklı konaklama tiplerini içerebilir. Seçilen birimin özelliklerini aşağıdan incele.")}</p>
  </section>;
}
