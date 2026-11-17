import { NextResponse } from "next/server";
import { z } from "zod";
import { dbInsert, dbRead, identity, responseError } from "@/lib/platform-db";
const schema = z.object({
  legal_name: z.string().trim().min(3).max(160),
  city: z.string().trim().min(2).max(80),
  zone: z.string().trim().min(2).max(80),
  license_type: z.enum(["drug_license", "md42"]),
  license_number: z.string().trim().min(4).max(90),
  gstin: z.string().trim().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/),
});
export async function GET() {
  try {
    const user = await identity();
    if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
    const query = user.role === "admin"
      ? "select=id,legal_name,city,zone,license_type,license_number,gstin,status,owner_email&order=created_at.desc&limit=100"
      : "select=id,legal_name,city,zone,status&owner_email=eq." + encodeURIComponent(user.email);
    const applications = await dbRead("partner_applications", query);
    return NextResponse.json({ applications });
  } catch (e) { return NextResponse.json(responseError(e), { status: 503 }); }
}
export async function POST(request: Request) {
  try {
    const user = await identity();
    if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
    const body = schema.safeParse(await request.json());
    if (!body.success) return NextResponse.json({ error: "Invalid application", details: body.error.flatten().fieldErrors }, { status: 400 });
    const [application] = await dbInsert("partner_applications", { ...body.data, owner_email: user.email, status: "pending" });
    return NextResponse.json({ application }, { status: 201 });
  } catch (e) { return NextResponse.json(responseError(e), { status: 503 }); }
}
