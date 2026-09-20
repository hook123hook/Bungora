import { NextResponse } from "next/server";
import { xmrTryRate } from "../_lib";

// GET /api/xmr/rate -> { try_per_xmr, updated_at }
export async function GET() {
  try {
    const tryPerXmr = await xmrTryRate();
    return NextResponse.json({ try_per_xmr: tryPerXmr, updated_at: Date.now() });
  } catch {
    return NextResponse.json({ error: "Rate unavailable" }, { status: 502 });
  }
}