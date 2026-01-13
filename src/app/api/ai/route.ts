import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import OpenAI from "openai";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
        // Mock response if no key
        return NextResponse.json({
            summary: "This is a simulated AI insight. Your logging frequency is consistent. Glucose levels appear stable. (Configure OPENAI_API_KEY for real analysis)."
        });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are a health analytics assistant. Analyze the provided health logs (glucose, meds, meals, sleep) and provide a concise, encouraging summary of trends and insights. Do not give medical advice. Keep it under 100 words."
                },
                {
                    role: "user",
                    content: JSON.stringify(data)
                }
            ]
        });

        return NextResponse.json({ summary: response.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI Error:", error);
        return NextResponse.json({ error: "Failed to generate insights" }, { status: 500 });
    }
}
