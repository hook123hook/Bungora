"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Direction } from "radix-ui";
import { Languages } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { translate } from "@/lib/messages";
import { CURRENCIES, DEFAULT_PREFERENCES, INITIAL_RATES, LANGUAGES, RATES_KEY, RATES_URL, createPreferencesStore, currencyCode, direction, formatPrice, localizedDate, parseRateResponse, usableRates, validateRates, type Currency, type ExchangeRates, type Language, type Preferences } from "@/lib/preferences";

const subscribeHydration = () => () => {};
const browserReady = () => true;
const serverReady = () => false;
type RateStatus = "ready" | "loading" | "error";
function helpers(preferences: Preferences, rates: ExchangeRates | null) {
  return {
    ...preferences, dir: direction(preferences.language), rates,
    t: (text: string, values?: Record<string, string | number>) => translate(preferences.language, text, values),
    money: (value: number) => formatPrice(value, preferences.language, preferences.currency, rates),
    date: (value: string | number) => localizedDate(value, preferences.language),
  };
}
type SettingsContext = ReturnType<typeof helpers> & { rateStatus: RateStatus; setPreference: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void; refreshRates: () => void };
const SiteContext = createContext<SettingsContext>({ ...helpers(DEFAULT_PREFERENCES, INITIAL_RATES), rateStatus: "ready", setPreference: () => {}, refreshRates: () => {} });
export function useSitePreferences() { return useContext(SiteContext); }

export function SitePreferencesProvider({ children, initialPreferences = DEFAULT_PREFERENCES, initialRates = INITIAL_RATES }: { children: ReactNode; initialPreferences?: Preferences; initialRates?: ExchangeRates | null }) {
  const [store] = useState(() => createPreferencesStore(initialPreferences));
  const preferences = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const [rates, setRates] = useState<ExchangeRates | null>(initialRates);
  const [rateStatus, setRateStatus] = useState<RateStatus>("ready");
  const ready = useSyncExternalStore(subscribeHydration, browserReady, serverReady);
  const [retry, setRetry] = useState(0);
  const currentRates = useRef(rates);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    function apply() {
      const theme = media.matches ? "dark" : "light";
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
      document.documentElement.classList.toggle("dark", theme === "dark");
      document.documentElement.lang = preferences.language;
      document.documentElement.dir = direction(preferences.language);
      document.title = translate(preferences.language, "Bungora");
    }
    // Wait for storage hydration so the pre-paint theme is not briefly reset.
    if (ready) { apply(); media.addEventListener("change", apply); }
    return () => media.removeEventListener("change", apply);
  }, [preferences.language, ready]);

  useEffect(() => {
    if (!ready) return;
    let stopped = false;
    let inFlight = false;
    let controller: AbortController | undefined;
    let abortTimer: ReturnType<typeof setTimeout> | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    function schedule(delay: number) { clearTimeout(timer); timer = setTimeout(() => void refresh(), Math.min(86400000, Math.max(60000, delay))); }
    async function refresh() {
      if (inFlight || stopped) return;
      // Initial cache read is asynchronous so storage hydration is batched.
      await Promise.resolve();
      if (stopped || inFlight) return;
      try {
        const saved = validateRates(JSON.parse(localStorage.getItem(RATES_KEY) || "null"));
        if (saved && saved.updatedAt > (currentRates.current?.updatedAt ?? 0)) { currentRates.current = saved; setRates(saved); }
      } catch { /* Ignore a malformed or inaccessible cache. */ }
      const cached = currentRates.current;
      if (usableRates(cached) && Date.now() < cached!.nextUpdate) { setRateStatus("ready"); schedule(cached!.nextUpdate - Date.now() + 1000); return; }
      inFlight = true;
      controller = new AbortController();
      abortTimer = setTimeout(() => controller?.abort(), 8000);
      setRateStatus("loading");
      try {
        const response = await fetch(RATES_URL, { signal: controller.signal, credentials: "omit", referrerPolicy: "no-referrer" });
        if (!response.ok) throw new Error("Rate provider unavailable");
        const parsed = parseRateResponse(await response.json());
        if (!parsed || !usableRates(parsed) || (cached && parsed.updatedAt < cached.updatedAt)) throw new Error("Invalid or stale rates");
        if (stopped) return;
        currentRates.current = parsed; setRates(parsed); setRateStatus(Date.now() < parsed.nextUpdate ? "ready" : "error");
        try { localStorage.setItem(RATES_KEY, JSON.stringify(parsed)); } catch { /* Cache is optional. */ }
        schedule(Math.max(3600000, parsed.nextUpdate - Date.now() + 1000));
      } catch { if (!stopped) { setRateStatus("error"); schedule(3600000); } }
      finally { clearTimeout(abortTimer); inFlight = false; }
    }
    void refresh();
    return () => { stopped = true; clearTimeout(timer); clearTimeout(abortTimer); controller?.abort(); };
  }, [ready, retry]);

  const setPreference = store.setPreference;
  const refreshRates = useCallback(() => setRetry((value) => value + 1), []);
  const value = useMemo(() => ({ ...helpers(preferences, rates), rateStatus, setPreference, refreshRates }), [preferences, rates, rateStatus, setPreference, refreshRates]);
  return <SiteContext.Provider value={value}><Direction.Provider dir={value.dir}>{children}</Direction.Provider></SiteContext.Provider>;
}

export function HeaderPreferences() {
  const { language, currency, t, dir, setPreference } = useSitePreferences();
  return <div className="preferences-controls header-preferences" role="group" aria-label={t("Dil ve para birimi")}>
    <Select dir={dir} value={language} onValueChange={(value) => setPreference("language", value as Language)}><SelectTrigger className="preference-select language-select" aria-label={t("Dil")}><Languages size={15} /><SelectValue><bdi>{language.toUpperCase()}</bdi></SelectValue></SelectTrigger><SelectContent>{LANGUAGES.map((code) => <SelectItem key={code} value={code} textValue={code.toUpperCase()}><bdi lang={code}>{code.toUpperCase()}</bdi></SelectItem>)}</SelectContent></Select>
    <Select dir={dir} value={currency} onValueChange={(value) => setPreference("currency", value as Currency)}><SelectTrigger className="preference-select currency-select" aria-label={t("Para birimi")}><SelectValue><bdi>{currencyCode(currency)}</bdi></SelectValue></SelectTrigger><SelectContent>{CURRENCIES.map((code) => <SelectItem key={code} value={code}><bdi>{currencyCode(code)}</bdi></SelectItem>)}</SelectContent></Select>
  </div>;
}
