export const SAFETY_PCT = 3;
export const VALIDITY_MIN = 30;
export const MAX_AMOUNT_TRY = 500000;

let rateCache: { at: number; value: number } | null = null;
export async function xmrTryRate() {
  if (rateCache && Date.now() - rateCache.at < 120000) return rateCache.value;
  const r = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=try",
    { headers: { Accept: "application/json" } }
  );
  if (!r.ok) throw new Error("Rate upstream failed");
  const j = await r.json();
  const v = Number(j?.monero?.try);
  if (!v || !isFinite(v) || v <= 0) throw new Error("Bad rate payload");
  rateCache = { at: Date.now(), value: v };
  return v;
}

type SupabaseOptions = {
  method?: string;
  key: string;
  headers?: Record<string, string>;
  body?: string;
};

export function supabaseJson(url: string, path: string, opts: SupabaseOptions) {
  const headers: Record<string, string> = {
    apikey: opts.key,
    Authorization: `Bearer ${opts.key}`,
    "Content-Type": "application/json",
    ...(opts.headers || {}),
  };
  return fetch(`${url}${path}`, {
    method: opts.method || "GET",
    headers,
    body: opts.body,
  });
}

export function requireEnv() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Backend not configured");
  return { url, key };
}

export function randomInvoiceNo() {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `BGR-${s}`;
}