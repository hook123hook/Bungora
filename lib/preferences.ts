export const LANGUAGES = ["tr", "en", "ar", "ru"] as const;
export const CURRENCIES = ["TRY", "EUR", "USD", "GBP", "CHF", "SAR", "AED", "RUB"] as const;
export type Language = typeof LANGUAGES[number];
export type Currency = typeof CURRENCIES[number];
export type Preferences = { language: Language; currency: Currency };
export const DEFAULT_PREFERENCES: Preferences = { language: "tr", currency: "TRY" };
export const PREFERENCES_KEY = "Bungora.preferences.v1";
export const RATES_KEY = "Bungora.rates.frankfurter.v2";
export const RATES_URL = "https://api.frankfurter.dev/v2/rates";
export const LOCALES: Record<Language, string> = { tr: "tr-TR", en: "en-GB", ar: "ar-SA-u-ca-gregory-nu-latn", ru: "ru-RU" };

export function parsePreferences(raw: unknown): Preferences {
  const value = raw && typeof raw === "object" ? raw as Partial<Preferences> : {};
  return {
    language: LANGUAGES.includes(value.language as Language) ? value.language! : "tr",
    currency: CURRENCIES.includes(value.currency as Currency) ? value.currency! : "TRY",
  };
}
export function direction(language: Language): "rtl" | "ltr" { return language === "ar" ? "rtl" : "ltr"; }
export function currencyCode(currency: Currency) { return currency === "TRY" ? "TL" : currency; }

// A per-provider external store: SSR has a stable default snapshot; browser storage
// is read after hydration. No preferences leak between server requests.
export function createPreferencesStore(initial = DEFAULT_PREFERENCES) {
  const serverSnapshot = parsePreferences(initial);
  let current = serverSnapshot;
  let lastRaw: string | null | undefined;
  const listeners = new Set<() => void>();
  function getSnapshot() {
    if (typeof window === "undefined") return serverSnapshot;
    try {
      const raw = window.localStorage.getItem(PREFERENCES_KEY);
      if (raw !== lastRaw) {
        lastRaw = raw;
        try { current = parsePreferences(JSON.parse(raw || "null")); } catch { current = parsePreferences(null); }
      }
    } catch { /* Storage denied: retain the session preference. */ }
    return current;
  }
  function subscribe(listener: () => void) {
    listeners.add(listener);
    function sync(event: StorageEvent) { if (event.key === PREFERENCES_KEY || event.key === null) listener(); }
    window.addEventListener("storage", sync);
    return () => { listeners.delete(listener); window.removeEventListener("storage", sync); };
  }
  function setPreference<K extends keyof Preferences>(key: K, value: Preferences[K]) {
    current = parsePreferences({ ...getSnapshot(), [key]: value });
    try {
      const raw = JSON.stringify(current);
      window.localStorage.setItem(PREFERENCES_KEY, raw);
      lastRaw = raw;
    } catch { /* Session-only choices remain usable. */ }
    listeners.forEach((listener) => listener());
  }
  return { getSnapshot, getServerSnapshot: () => serverSnapshot, subscribe, setPreference };
}
export type ExchangeRates = { updatedAt: number; nextUpdate: number; rates: Record<Currency, number> };

// Frankfurter v2 daily EUR reference rates, inspected 2026-08-27.
// Convert through TRY; this is an indicative daily snapshot, never a payment quote.
export const INITIAL_RATES: ExchangeRates = {
  updatedAt: Date.parse("2026-08-27T00:00:00Z"), nextUpdate: Date.parse("2026-08-28T00:00:00Z"),
  rates: { TRY: 1, EUR: 1 / 56.103, USD: 1.1657 / 56.103, GBP: 0.85685 / 56.103, CHF: 0.93824 / 56.103, SAR: 4.3714 / 56.103, AED: 4.2811 / 56.103, RUB: 98.67 / 56.103 },
};
export const MAX_RATE_AGE = 3 * 24 * 60 * 60 * 1000;
export function validateRates(value: unknown, now = Date.now()): ExchangeRates | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Partial<ExchangeRates>;
  if (typeof item.updatedAt !== "number" || !Number.isFinite(item.updatedAt) || item.updatedAt <= 0 || item.updatedAt > now + 300000 ||
      typeof item.nextUpdate !== "number" || !Number.isFinite(item.nextUpdate) || item.nextUpdate <= item.updatedAt || !item.rates) return null;
  if (CURRENCIES.some((code) => typeof item.rates![code] !== "number" || !Number.isFinite(item.rates![code]) || item.rates![code] <= 0) || item.rates.TRY !== 1) return null;
  return { updatedAt: item.updatedAt, nextUpdate: item.nextUpdate, rates: Object.fromEntries(CURRENCIES.map((code) => [code, item.rates![code]])) as Record<Currency, number> };
}
export function parseRateResponse(value: unknown, now = Date.now()): ExchangeRates | null {
  if (!Array.isArray(value)) return null;
  const entries = new Map<Currency, { rate: number; timestamp: number }>();
  for (const row of value) {
    if (!row || typeof row !== "object" || !CURRENCIES.includes(row.quote)) continue;
    if (entries.has(row.quote) || row.base !== "EUR" || typeof row.rate !== "number" || !Number.isFinite(row.rate) || row.rate <= 0 ||
        typeof row.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(row.date)) return null;
    const timestamp = Date.parse(`${row.date}T00:00:00Z`);
    if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== row.date || timestamp > now) return null;
    entries.set(row.quote, { rate: row.rate, timestamp });
  }
  if (CURRENCIES.some((code) => !entries.has(code)) || entries.get("EUR")!.rate !== 1) return null;
  const updatedAt = Math.min(...[...entries.values()].map((row) => row.timestamp));
  const rates = Object.fromEntries(CURRENCIES.map((code) => [code, entries.get(code)!.rate / entries.get("TRY")!.rate]));
  return validateRates({ updatedAt, nextUpdate: updatedAt + 86400000, rates }, now);
}
export function usableRates(rates: ExchangeRates | null, now = Date.now()) {
  return !!rates && !!validateRates(rates, now) && now - rates.updatedAt <= MAX_RATE_AGE;
}
export function convertPrice(value: number, currency: Currency, rates: ExchangeRates | null, now = Date.now()) {
  const actualCurrency = currency === "TRY" || usableRates(rates, now) ? currency : "TRY";
  return { value: actualCurrency === "TRY" ? value : value * rates!.rates[actualCurrency], currency: actualCurrency, approximate: actualCurrency !== "TRY" };
}
export function formatPrice(value: number, language: Language, currency: Currency, rates: ExchangeRates | null, now = Date.now()) {
  const converted = convertPrice(value, currency, rates, now);
  const digits = converted.currency === "TRY" ? 0 : 2;
  return `${converted.approximate ? "≈ " : ""}${new Intl.NumberFormat(LOCALES[language], { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(converted.value)} ${currencyCode(converted.currency)}`;
}
export function localizedDate(value: string | number, language: Language) {
  const time = typeof value === "number" ? value : Date.parse(`${value}T00:00:00Z`);
  if (!Number.isFinite(time)) return "—";
  return new Intl.DateTimeFormat(LOCALES[language], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC", calendar: "gregory" }).format(time);
}

// Theme always follows the operating system; previous manual choices are ignored.
export const THEME_BOOTSTRAP = `(function(){var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=d?'dark':'light';document.documentElement.style.colorScheme=d?'dark':'light';document.documentElement.classList.toggle('dark',d)})();`;
