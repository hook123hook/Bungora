"use client";
import { useSitePreferences } from "@/components/site-preferences";
import { useState } from "react";
import { ImageOff } from "lucide-react";
export function PropertyPhoto({ src, alt, eager = false }: {
    src: string;
    alt: string;
    eager?: boolean;
}) {
    const { t } = useSitePreferences();
    const [failed, setFailed] = useState(false);
    if (failed)
        return <div className="photo-unavailable" role="img" aria-label={`${alt}. ${t("Fotoğraf yüklenemedi")}.`}><ImageOff size={25} strokeWidth={1.4}/><span>{t("Fotoğraf yüklenemedi")}</span><small>{t("Galerideki diğer fotoğraflara göz atabilirsin.")}</small></div>;
    return <img src={src} alt={alt} width="1200" height="800" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} referrerPolicy="no-referrer" onError={() => setFailed(true)}/>;
}
