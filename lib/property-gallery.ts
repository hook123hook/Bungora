import galleries from "./property-galleries.json";
import type { Bungalow } from "./bungalows";

// Photo URLs are verified against each property's own gallery. Resized copies
// are one photo; arbitrary query parameters are retained as image identity.
export function galleryPhotoIdentity(src: string): string {
  try {
    let url = new URL(src);
    if (url.pathname.includes("/_next/image") && url.searchParams.has("url")) url = new URL(url.searchParams.get("url")!, url.origin);
    for (const key of ["w", "h", "width", "height", "q", "quality", "fit", "auto", "format", "tr", "impolicy"]) url.searchParams.delete(key);
    if (url.hostname === "www.bungalov.com.tr" || url.hostname === "www.bungalovla.com") url.pathname = url.pathname.replace(/_(?:t|b|k)(\.[a-z]+)$/i, "$1");
    if (url.hostname === "cdn3.enuygun.com") url.pathname = url.pathname.replace(/\/media\/lib\/1x\d+\//, "/media/lib/");
    if (url.hostname === "cdn.tatilsepeti.com") url.pathname = url.pathname.replace(/\/\d+X\d+\//, "/");
    url.hash = "";
    url.searchParams.sort();
    return url.toString();
  } catch { return src; }
}
export function getPropertyPhotos(bungalow: Pick<Bungalow, "id" | "image">): string[] {
  const seen = new Set<string>();
  return [bungalow.image, ...((galleries as Record<string, string[]>)[bungalow.id] ?? [])].filter((src) => {
    if (!/^https:\/\//.test(src)) return false;
    const key = galleryPhotoIdentity(src);
    if (seen.has(key)) return false;
    seen.add(key); return true;
  });
}
