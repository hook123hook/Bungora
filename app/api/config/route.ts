import { NextResponse } from "next/server";

// GET /api/config
// Hands the admin panel the public Supabase URL + anon key. Protects the service role key.
export async function GET() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return NextResponse.json({ error: "Backend not configured" }, { status: 503 });
  }

  return NextResponse.json({ url, anonKey });
}