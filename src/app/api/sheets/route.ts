import { NextResponse } from "next/server";
// Legacy free-form Sheets proxy disabled: user-controlled ranges could expose or alter unrelated records.
export async function GET() {
  return NextResponse.json({ error: "Legacy Sheets API disabled. Use the private tracker API." }, { status: 410 });
}
export async function POST() {
  return NextResponse.json({ error: "Legacy Sheets API disabled. Use the private tracker API." }, { status: 410 });
}
