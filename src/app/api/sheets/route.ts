import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { appendToSheet, getSheetData } from "@/lib/sheets";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { range, values } = await req.json();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
        return NextResponse.json({ error: "Sheet ID not configured" }, { status: 500 });
    }

    try {
        const result = await appendToSheet(session.accessToken, spreadsheetId, range, values);
        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        return NextResponse.json({ error: "Failed to append data" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range");

    if (!session || !session.accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
        return NextResponse.json({ error: "Sheet ID not configured" }, { status: 500 });
    }

    if (!range) {
        return NextResponse.json({ error: "Range parameter required" }, { status: 400 });
    }

    try {
        const data = await getSheetData(session.accessToken, spreadsheetId, range);
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
