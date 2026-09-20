import { NextResponse } from "next/server";
import {
  MAX_AMOUNT_TRY,
  SAFETY_PCT,
  VALIDITY_MIN,
  randomInvoiceNo,
  requireEnv,
  supabaseJson,
  xmrTryRate,
} from "../_lib";

// POST /api/xmr/invoice
// Body: { amount_try: number, reference: string, label?: string }
// Pops one unused subaddress from the pool and stores the invoice (single private XMR payment).
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const amountTry = Number(body.amount_try);
  const reference = String(body.reference || "").trim();
  const label = String(body.label || "").trim().slice(0, 200);
  if (!Number.isFinite(amountTry) || amountTry <= 0 || amountTry > MAX_AMOUNT_TRY) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }
  if (!reference || reference.length > 80) {
    return NextResponse.json({ error: "Invalid reference" }, { status: 400 });
  }

  let cfg;
  try {
    cfg = requireEnv();
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 503 });
  }

  let tryPerXmr;
  try {
    tryPerXmr = await xmrTryRate();
  } catch {
    return NextResponse.json({ error: "Rate unavailable, please retry" }, { status: 502 });
  }

  const amountXmr = Math.round((amountTry * (1 + SAFETY_PCT / 100) / tryPerXmr) * 1000000) / 1000000;

  // Atomically pop one unused subaddress from the pool (RPC in supabase/schema-xmr.sql)
  let popped;
  try {
    const r = await supabaseJson(cfg.url, "/rest/v1/rpc/pop_xmr_address", {
      method: "POST",
      key: cfg.key,
      headers: { Prefer: "return=representation" },
      body: "{}",
    });
    if (!r.ok) throw new Error("pool_pop_failed");
    const rows = await r.json();
    popped = rows && rows[0];
  } catch {
    return NextResponse.json(
      {
        error: "NO_ADDRESS_AVAILABLE",
        message:
          "Monero address pool is empty. Owner must run xmr-bridge on the wallet machine to seed addresses.",
      },
      { status: 409 }
    );
  }
  if (!popped) {
    return NextResponse.json({ error: "NO_ADDRESS_AVAILABLE", message: "Address pool empty." }, { status: 409 });
  }

  const expiresAt = new Date(Date.now() + VALIDITY_MIN * 60000).toISOString();

  // Insert invoice (unique invoice_no collision retry)
  for (let attempt = 0; attempt < 3; attempt++) {
    const invoiceNo = randomInvoiceNo();
    const ins = await supabaseJson(cfg.url, "/rest/v1/xmr_invoices", {
      method: "POST",
      key: cfg.key,
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        invoice_no: invoiceNo,
        address: popped.address,
        subaddress_index: popped.subaddress_index,
        amount_fiat: amountTry,
        currency: "TRY",
        amount_xmr: amountXmr,
        fx_rate: tryPerXmr,
        safety_pct: SAFETY_PCT,
        reference,
        label: label || null,
        expires_at: expiresAt,
      }),
    });
    if (ins.ok) {
      const rec = await ins.json();
      const row = rec[0];
      return NextResponse.json(
        {
          id: row.id,
          invoice_no: row.invoice_no,
          address: row.address,
          subaddress_index: row.subaddress_index,
          amount_try: Number(row.amount_fiat),
          amount_xmr: Number(row.amount_xmr),
          fx_rate: Number(row.fx_rate),
          expires_at: row.expires_at,
          qr: `monero:${row.address}?tx_amount=${Number(row.amount_xmr)}&tx_description=${encodeURIComponent(invoiceNo)}`,
        },
        { status: 201 }
      );
    }
    if (ins.status !== 409) {
      return NextResponse.json({ error: "Invoice storage failed" }, { status: 502 });
    }
  }
  return NextResponse.json({ error: "Invoice storage failed" }, { status: 502 });
}
