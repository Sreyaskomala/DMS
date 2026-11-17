import { NextResponse } from "next/server";
import { dbRead, responseError } from "@/lib/platform-db";

export async function GET() {
  try {
    // Public view contains zones and products only: never send merchant legal details or coordinates.
    const offers = await dbRead<Record<string, unknown>>("public_device_offers",
      "select=id,product_name,category,brand,zone,city,price_inr,mrp_inr,wear_days,cooling_notes,availability&order=product_name.asc&limit=100");
    return NextResponse.json({ offers });
  } catch (error) {
    return NextResponse.json(responseError(error), { status: 503 });
  }
}
