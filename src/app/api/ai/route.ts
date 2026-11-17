import { NextResponse } from "next/server";
// Legacy AI endpoint disabled until a consented, privacy-reviewed medical-data workflow exists.
export async function POST() {
  return NextResponse.json({ error: "AI analysis is not enabled in the Phase 1 pilot." }, { status: 503 });
}
