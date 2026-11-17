import { NextResponse } from "next/server";
import { z } from "zod";
import { dbInsert, dbRead, identity, responseError } from "@/lib/platform-db";
const schema = z.object({
  type: z.enum(["glucose", "blood_pressure_systolic", "blood_pressure_diastolic", "weight", "carbohydrates", "insulin_taken"]),
  value: z.number().finite().positive().max(10000),
  context: z.string().trim().max(120).optional(),
  occurred_at: z.string().datetime({ offset: true }).optional(),
});
export async function GET() {
  try {
    const user = await identity();
    if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
    const logs = await dbRead("care_logs", "select=id,type,value,context,occurred_at&owner_email=eq." + encodeURIComponent(user.email) + "&order=occurred_at.desc&limit=250");
    return NextResponse.json({ logs });
  } catch (e) { return NextResponse.json(responseError(e), { status: 503 }); }
}
export async function POST(request: Request) {
  try {
    const user = await identity();
    if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
    const body = schema.safeParse(await request.json());
    if (!body.success) return NextResponse.json({ error: "Invalid health log" }, { status: 400 });
    const [log] = await dbInsert("care_logs", { ...body.data, owner_email: user.email });
    return NextResponse.json({ log }, { status: 201 });
  } catch (e) { return NextResponse.json(responseError(e), { status: 503 }); }
}
