"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { PropertyPhoto } from "@/components/property-photo";
import { useSitePreferences } from "@/components/site-preferences";
import { BANNER_PHOTOS, startBannerAutoplay } from "@/lib/banner-slideshow";

const motionQuery = "(prefers-reduced-motion: reduce)";
const reducedMotionSnapshot = () => window.matchMedia(motionQuery).matches;
const serverMotionSnapshot = () => false;
function subscribeMotion(listener: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

export function BannerSlideshow() {
  const { t, dir } = useSitePreferences();
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);
  const [playRequested, setPlayRequested] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeMotion, reducedMotionSnapshot, serverMotionSnapshot);
  const playing = playRequested ?? !reducedMotion;
  const attachApi = useCallback((next: CarouselApi) => {
    setApi(next);
    setIndex(next?.selectedScrollSnap() ?? 0);
  }, []);

  useEffect(() => {
    if (!api) return;
    const update = () => setIndex(api.selectedScrollSnap());
    const pauseForDrag = () => setPlayRequested(false);
    api.on("select", update).on("reInit", update).on("pointerDown", pauseForDrag);
    return () => { api.off("select", update).off("reInit", update).off("pointerDown", pauseForDrag); };
  }, [api]);

  useEffect(() => {
    if (!api || !playing || hovered) return;
    // Restart the full five-second interval after each selection; do not advance hidden tabs.
    return startBannerAutoplay(() => api.scrollNext(reducedMotion), () => !document.hidden);
  }, [api, playing, hovered, index, reducedMotion]);

  return <section className="forest-banner" aria-label={t("Doğada bir mola")}
    onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
    onPointerLeave={() => setHovered(false)}>
    <Carousel key={dir} dir={dir} setApi={attachApi} opts={{ loop: true, direction: dir }}
      className="banner-carousel" aria-label={t("Fotoğraflar")} aria-roledescription={t("Fotoğraf galerisi")}
      onKeyDownCapture={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        setPlayRequested(false);
        const next = dir === "rtl" ? event.key === "ArrowLeft" : event.key === "ArrowRight";
        if (next) api?.scrollNext(reducedMotion); else api?.scrollPrev(reducedMotion);
      }}>
      <CarouselContent className="banner-slides" aria-live="off">
        {BANNER_PHOTOS.map((photo, number) => <CarouselItem key={photo.id} className="banner-slide"
          aria-roledescription={t("Fotoğraf")} aria-label={t("Fotoğraf {current} / {total}", { current: number + 1, total: BANNER_PHOTOS.length })}
          aria-hidden={number !== index}>
          <PropertyPhoto src={photo.src} alt={t("{name} bungalov fotoğrafı", { name: photo.name })}
            eager={number === index || number === (index + 1) % BANNER_PHOTOS.length}/>
        </CarouselItem>)}
      </CarouselContent>
      <div className="banner-shade"/>
      <div className="banner-copy">
        <span>{t("KÜÇÜK BİR KAÇAMAK, BÜYÜK BİR NEFES")}</span>
        <h2>{t("Acele etmediğin")}<br />{t("bir sabaha uyan.")}</h2>
        <a href="#bungalovlar" onFocus={() => setPlayRequested(false)}>{t("Kendi köşeni keşfet")}<ArrowRight className="directional-icon" size={17}/></a>
      </div>
      <div className="banner-controls">
        <button type="button" className="banner-play" onClick={() => setPlayRequested(!playing)}
          aria-label={t(playing ? "Slaytı duraklat" : "Slaytı oynat")} title={t(playing ? "Slaytı duraklat" : "Slaytı oynat")}>
          {playing ? <Pause size={14}/> : <Play size={14}/>}
        </button>
        <div className="banner-dots" role="group" aria-label={t("Fotoğraflar")}>
          {BANNER_PHOTOS.map((photo, number) => <button key={photo.id} type="button"
            className={number === index ? "banner-dot active" : "banner-dot"}
            aria-label={t("Fotoğraf {n}", { n: number + 1 })} aria-pressed={number === index}
            onFocus={() => setPlayRequested(false)}
            onClick={() => { setPlayRequested(false); api?.scrollTo(number, reducedMotion); }}><span/></button>)}
        </div>
        <span className="banner-count" dir="ltr" aria-hidden="true">{`${index + 1} / ${BANNER_PHOTOS.length}`}</span>
      </div>
    </Carousel>
  </section>;
}
