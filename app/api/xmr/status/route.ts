import { NextResponse } from "next/server";
import { DEPOSIT_PCT, stageFactor, requireEnv, supabaseJson, type Stage } from "../_lib";

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

  const r = await supabaseJson(cfg.url, `/rest/v1/xmr_invoices?id=eq.${id}&select=id,invoice_no,address,amount_fiat,total_fiat,currency,amount_xmr,fx_rate,status,confirmations,received_amount_xmr,expires_at,created_at,channel,label,reference,stage`, {
    key: cfg.key,
  });
  if (!r.ok) return NextResponse.json({ error: "Storage failed" }, { status: 502 });
  const rows = await r.json();
  if (!rows.length) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

  const row = rows[0];
  const stage: Stage = row.stage || "full";
  const totalTry = Number(row.total_fiat ?? row.amount_fiat);
  return NextResponse.json({
    id: row.id,
    invoice_no: row.invoice_no,
    address: row.address,
    amount_try: Number(row.amount_fiat),
    total_try: totalTry,
    currency: row.currency || "TRY",
    stage,
    deposit_pct: DEPOSIT_PCT,
    // After a deposit is credited, the balance still owed on arrival.
    remaining_try: stage === "deposit" ? Math.max(0, Math.round(totalTry * (1 - stageFactor(stage)))) : 0,
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