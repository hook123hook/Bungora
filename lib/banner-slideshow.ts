import { BUNGALOWS } from "@/lib/bungalows";

// Reuse the catalog's property photographs, not the old breakfast banner.
const PROPERTY_IDS = [
  "so-sapanca", "mirror-rize", "shine-sapanca", "forest-dream",
  "stenhus-sapanca", "kokina-suit", "homywood-trabzon", "rua-sapanca",
  "wooden-palaces", "grand-wooden",
] as const;

export const BANNER_PHOTOS = PROPERTY_IDS.map((id) => {
  const property = BUNGALOWS.find((item) => item.id === id);
  if (!property) throw new Error(`Missing banner property: ${id}`);
  return { id, src: property.image, name: property.name };
});

export const BANNER_INTERVAL_MS = 5_000;

export function startBannerAutoplay(advance: () => void, canAdvance: () => boolean) {
  const timer = setInterval(() => {
    if (canAdvance()) advance();
  }, BANNER_INTERVAL_MS);
  return () => clearInterval(timer);
}
