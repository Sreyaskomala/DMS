import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSheetData } from "@/lib/sheets";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlucoseChart } from "@/components/analytics/glucose-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AISummary } from "@/components/analytics/ai-summary";

export default async function AnalyticsPage() {
    const session = await getServerSession(authOptions);
    let glucoseData: any[] = [];
    let avgGlucose = 0;
    let totalEntries = 0;

    if (session?.accessToken && process.env.GOOGLE_SHEET_ID) {
        try {
            // Fetch A to AH (34 columns)
            const rows = await getSheetData(session.accessToken, process.env.GOOGLE_SHEET_ID, "Sheet1!A:AH");

            // Skip header row if it exists (usually first row)
            const dataRows = rows && rows.length > 0 && rows[0][0] === "Timestamp" ? rows.slice(1) : rows || [];

            // Parse columns based on sheets_setup_guide.md
            // J(9): FBS, K(10): Time
            // L(11): PBS, M(12): Time
            // N(13): Pre-Lunch, O(14): Time
            // P(15): Post-Lunch, Q(16): Time
            // R(17): Pre-Dinner, S(18): Time
            // T(19): Post-Dinner, U(20): Time
            // V(21): Random, W(22): Time

            dataRows.forEach(row => {
                const date = row[1]; // Column B: Date

                const glucoseMap = [
                    { valIdx: 9, timeIdx: 10, label: "Fasting" },
                    { valIdx: 11, timeIdx: 12, label: "Post-Breakfast" },
                    { valIdx: 13, timeIdx: 14, label: "Pre-Lunch" },
                    { valIdx: 15, timeIdx: 16, label: "Post-Lunch" },
                    { valIdx: 17, timeIdx: 18, label: "Pre-Dinner" },
                    { valIdx: 19, timeIdx: 20, label: "Post-Dinner" },
                    { valIdx: 21, timeIdx: 22, label: "Random" }
                ];

                glucoseMap.forEach(item => {
                    const valStr = row[item.valIdx];
                    const timeStr = row[item.timeIdx];

                    if (valStr) {
                        const val = parseFloat(valStr);
                        if (!isNaN(val) && val > 0) {
                            glucoseData.push({
                                timestamp: timeStr ? `${date} ${timeStr}` : `${date} 00:00`,
                                glucose: val,
                                type: item.label
                            });
                        }
                    }
                });
            });

            // Sort by timestamp
            glucoseData.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

            if (glucoseData.length > 0) {
                const sum = glucoseData.reduce((acc, curr) => acc + curr.glucose, 0);
                avgGlucose = Math.round(sum / glucoseData.length);
                totalEntries = glucoseData.length;
            }

        } catch (e) {
            console.error("Failed to load analytics data", e);
        }
    }

    return (
        <div className="container mx-auto py-10 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" asChild>
                        <Link href="/dashboard">
                            <MoveLeft className="mr-2 h-4 w-4" />
                            Back to Log
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                </div>
                <div className="w-[300px]">
                    <AISummary data={glucoseData} />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Glucose</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{avgGlucose} mg/dL</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalEntries}</div>
                    </CardContent>
                </Card>
                {/* Add more stats cards here */}
            </div>

            <div className="w-full">
                <GlucoseChart data={glucoseData} />
            </div>
        </div>
    );
}
