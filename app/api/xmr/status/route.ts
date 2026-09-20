import { NextResponse } from "next/server";
import { requireEnv, supabaseJson } from "../_lib";

// GET /api/xmr/status?id=<uuid>
// Only reports invoice state; crediting happens exclusively in the local bridge.
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id") || "";
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  let cfg;
  try {
    cfg = requireEnv();
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 503 });
  }

  const r = await supabaseJson(cfg.url, `/rest/v1/xmr_invoices?id=eq.${id}&select=id,invoice_no,address,amount_fiat,currency,amount_xmr,fx_rate,status,confirmations,received_amount_xmr,expires_at,created_at,channel,label,reference`, {
    key: cfg.key,
  });
  if (!r.ok) return NextResponse.json({ error: "Storage failed" }, { status: 502 });
  const rows = await r.json();
  if (!rows.length) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

  const row = rows[0];
  return NextResponse.json({
    id: row.id,
    invoice_no: row.invoice_no,
    address: row.address,
    amount_try: Number(row.amount_fiat),
    currency: row.currency || "TRY",
    amount_xmr: Number(row.amount_xmr),
    fx_rate: Number(row.fx_rate),
    status: row.status,
    confirmations: row.confirmations,
    received_amount_xmr: row.received_amount_xmr != null ? Number(row.received_amount_xmr) : null,
    expires_at: row.expires_at,
    created_at: row.created_at,
    channel: row.channel || "xmr",
  });
}