import { NextResponse } from "next/server";

// POST /api/booking
// Saves a booking request (insert only, service role key). Anon never reads/writes directly.
export async function POST(request: Request) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Backend not configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: bots that fill the hidden field get a fake success.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : null);
  const num = (v: unknown) => (Number.isFinite(v) ? (v as number) : null);

  const record = {
    first_name: str(body.first_name, 100),
    last_name: str(body.last_name, 100),
    contact: str(body.contact, 200),
    email: str(body.email, 200),
    listing_id: str(body.listing_id, 80),
    listing_name: str(body.listing_name, 200),
    check_in: str(body.check_in, 10),
    check_out: str(body.check_out, 10),
    guests: Number.isInteger(body.guests) ? (body.guests as number) : null,
    nights: Number.isInteger(body.nights) ? (body.nights as number) : null,
    nightly_price: num(body.nightly_price),
    total_try: num(body.total_try),
    price_estimate: body.price_estimate !== false,
    lang: str(body.lang, 10) || "tr",
    message: str(body.message, 5000),
    source: str(body.source, 20) || "web",
  };

  if (
    !record.first_name ||
    !record.last_name ||
    !record.listing_id ||
    !record.check_in ||
    !record.check_out ||
    !record.guests ||
    record.guests < 1
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const r = await fetch(`${url}/rest/v1/bungalow_bookings`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(record),
    });
    if (!r.ok) {
      return NextResponse.json({ error: "Storage failed" }, { status: 502 });
    }
    const rows = await r.json().catch(() => []);
    return NextResponse.json({ ok: true, id: rows[0]?.id || null });
  } catch {
    return NextResponse.json({ error: "Storage failed" }, { status: 502 });
  }
}
