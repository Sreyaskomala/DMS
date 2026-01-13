"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Loader2 } from "lucide-react"

export function AISummary({ data }: { data: any[] }) {
    const [summary, setSummary] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function getInsights() {
        setLoading(true);
        try {
            const res = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data }),
            });
            const json = await res.json();
            if (json.summary) {
                setSummary(json.summary);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    AI Insights
                </CardTitle>
            </CardHeader>
            <CardContent>
                {summary ? (
                    <p className="text-sm text-muted-foreground mt-2">{summary}</p>
                ) : (
                    <div className="mt-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={getInsights}
                            disabled={loading || data.length === 0}
                            className="w-full"
                        >
                            {loading ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
                            ) : (
                                "Generate Weekly Insight"
                            )}
                        </Button>
                        {data.length === 0 && (
                            <p className="text-xs text-muted-foreground mt-2 text-center">Log data to get insights</p>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
