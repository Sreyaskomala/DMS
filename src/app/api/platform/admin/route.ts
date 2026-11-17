import { NextResponse } from "next/server";
import { z } from "zod";
import { dbRead, dbUpdate, identity, responseError } from "@/lib/platform-db";
const schema = z.object({ id: z.string().uuid(), decision: z.enum(["approved", "rejected"]) });
export async function PATCH(request: Request) {
  try {
    const user = await identity();
    if (!user || user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const input = schema.safeParse(await request.json());
    if (!input.success) return NextResponse.json({ error: "Invalid decision" }, { status: 400 });
    // Approval is documentary review only. It cannot publish offers or assert license verification.
    const [application] = await dbUpdate("partner_applications",
      "id=eq." + input.data.id + "&status=eq.pending",
      { status: input.data.decision, reviewed_by: user.email, reviewed_at: new Date().toISOString() });
    if (!application) return NextResponse.json({ error: "Not found or already reviewed" }, { status: 409 });
    return NextResponse.json({ application });
  } catch (e) { return NextResponse.json(responseError(e), { status: 503 }); }
}
