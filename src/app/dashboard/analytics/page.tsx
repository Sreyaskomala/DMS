"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GlucoseChart } from "@/components/analytics/glucose-chart"
import { AISummary } from "@/components/analytics/ai-summary"
import { ClinicalCalculator } from "@/components/clinical-calculator"
import {
    Activity, MoveLeft, Download, Printer, Calendar, TrendingUp,
    HeartPulse, CheckCircle2, ShieldCheck, FileText, Sparkles, Filter
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    getStoredLogs, extractGlucoseReadings, calculateClinicalStats,
    HealthLogRow, GlucoseReadingPoint
} from "@/lib/demo-data"
import { format } from "date-fns"
import { toast } from "sonner"

export default function AnalyticsPage() {
    const [allLogs, setAllLogs] = useState<HealthLogRow[]>([]);
    const [dateFilter, setDateFilter] = useState<"7" | "14" | "30" | "all">("14");
    const [isPrinting, setIsPrinting] = useState(false);

    useEffect(() => {
        setAllLogs(getStoredLogs());
    }, []);

    // Filter logs based on date range
    const filteredLogs = allLogs.slice(0, dateFilter === "7" ? 7 : dateFilter === "14" ? 14 : dateFilter === "30" ? 30 : allLogs.length);
    const readings = extractGlucoseReadings(filteredLogs);
    const stats = calculateClinicalStats(readings);

    const handlePrintReport = () => {
        setIsPrinting(true);
        setTimeout(() => {
            window.print();
            setIsPrinting(false);
        }, 300);
    };

    const handleExportCSV = () => {
        if (filteredLogs.length === 0) return;
        const headers = ["Date", "Day", "FBS", "PBS", "Pre-Lunch", "Post-Lunch", "Pre-Dinner", "Post-Dinner", "Basaglar", "Actrapid", "Sleep", "Mood", "Remarks"];
        const rows = filteredLogs.map(l => [
            l.date,
            l.day,
            l.fbsValue || "",
            l.pbsValue || "",
            l.preLunchValue || "",
            l.postLunchValue || "",
            l.preDinnerValue || "",
            l.postDinnerValue || "",
            l.basaglarDose || "",
            `${l.actrapidMorning || 0}/${l.actrapidLunch || 0}/${l.actrapidDinner || 0}`,
            l.sleepDuration || "",
            l.mood || "",
            `"${(l.remarks || "").replace(/"/g, '""')}"`
        ]);

        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `clinical_analytics_report_${format(new Date(), "yyyy-MM-dd")}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Clinical CSV report downloaded.");
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
            {/* IDF Style Header */}
            <header className="bg-white border-b-4 border-[#003E7E] sticky top-0 z-50">
                <div className="container h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-[#003E7E] rounded-md flex items-center justify-center text-white">
                                <Activity className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-black text-[#003E7E] tracking-tight hidden sm:inline-block">
                                Insulin<span className="text-[#009CDF]">Inside</span>
                            </span>
                        </Link>
                    </div>
                    <nav className="flex items-center gap-6">
                        <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-[#003E7E] transition-colors">
                            Dashboard
                        </Link>
                        <Link href="/dashboard/analytics" className="text-sm font-bold text-[#003E7E] border-b-2 border-[#003E7E] py-5">
                            Analytics
                        </Link>
                        <Link href="/marketplace" className="text-sm font-bold text-slate-500 hover:text-[#009CDF] transition-colors">
                            Store
                        </Link>
                    </nav>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild className="rounded-full font-bold border-[#003E7E] text-[#003E7E] hover:bg-blue-50">
                            <Link href="/dashboard">
                                <MoveLeft className="mr-1.5 h-4 w-4" /> Back to Log
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container py-8 px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header & Date Range Filter */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-[#003E7E] text-white border-none font-bold">CLINICAL SUITE</Badge>
                            <span className="text-xs text-slate-500 font-semibold">
                                {readings.length} Total Readings Analyzed
                            </span>
                        </div>
                        <h1 className="text-3xl font-black text-[#003E7E]">Glycemic Trends & AI Insights</h1>
                        <p className="text-slate-600 text-sm">
                            Professional clinical metrics adhering to ADA & International Consensus on Time in Range.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {/* Range Buttons */}
                        <div className="flex items-center bg-slate-100 p-1 rounded-xl border">
                            <Button
                                size="sm"
                                variant={dateFilter === "7" ? "default" : "ghost"}
                                className={`text-xs rounded-lg font-bold h-8 ${dateFilter === "7" ? "bg-[#003E7E] text-white" : "text-slate-600"}`}
                                onClick={() => setDateFilter("7")}
                            >
                                7 Days
                            </Button>
                            <Button
                                size="sm"
                                variant={dateFilter === "14" ? "default" : "ghost"}
                                className={`text-xs rounded-lg font-bold h-8 ${dateFilter === "14" ? "bg-[#003E7E] text-white" : "text-slate-600"}`}
                                onClick={() => setDateFilter("14")}
                            >
                                14 Days
                            </Button>
                            <Button
                                size="sm"
                                variant={dateFilter === "30" ? "default" : "ghost"}
                                className={`text-xs rounded-lg font-bold h-8 ${dateFilter === "30" ? "bg-[#003E7E] text-white" : "text-slate-600"}`}
                                onClick={() => setDateFilter("30")}
                            >
                                30 Days
                            </Button>
                            <Button
                                size="sm"
                                variant={dateFilter === "all" ? "default" : "ghost"}
                                className={`text-xs rounded-lg font-bold h-8 ${dateFilter === "all" ? "bg-[#003E7E] text-white" : "text-slate-600"}`}
                                onClick={() => setDateFilter("all")}
                            >
                                All
                            </Button>
                        </div>

                        {/* Export & Print */}
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl border-slate-300 font-bold text-xs h-9"
                            onClick={handleExportCSV}
                        >
                            <Download className="mr-1.5 h-3.5 w-3.5" /> CSV
                        </Button>
                        <Button
                            variant="default"
                            size="sm"
                            className="rounded-xl bg-[#E31C79] hover:bg-[#c21565] font-bold text-xs h-9 text-white shadow-md"
                            onClick={handlePrintReport}
                        >
                            <Printer className="mr-1.5 h-3.5 w-3.5" /> Print Clinical Report
                        </Button>
                    </div>
                </div>

                {/* 1. TOP KEY METRICS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* Average Glucose */}
                    <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-bold uppercase text-slate-500 tracking-wider">Average Glucose</CardTitle>
                            <Activity className="h-4 w-4 text-[#003E7E]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-[#003E7E]">
                                {stats.avgGlucose} <span className="text-sm font-semibold text-slate-500">mg/dL</span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-2">
                                <Badge className={`text-[10px] ${stats.avgGlucose <= 130 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {stats.avgGlucose <= 130 ? 'Optimal' : 'Moderately Controlled'}
                                </Badge>
                                <span className="text-xs text-slate-400">Target: &lt; 140</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Estimated HbA1c */}
                    <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-bold uppercase text-slate-500 tracking-wider">Estimated HbA1c (eA1c)</CardTitle>
                            <HeartPulse className="h-4 w-4 text-[#E31C79]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-[#E31C79]">
                                {stats.estimatedA1c}%
                            </div>
                            <div className="flex items-center gap-1.5 mt-2">
                                <Badge className={`text-[10px] ${stats.estimatedA1c <= 7.0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {stats.estimatedA1c <= 7.0 ? 'Meets ADA Goal (<7%)' : 'Above Target (>7%)'}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Time In Range (TIR %) */}
                    <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-bold uppercase text-slate-500 tracking-wider">Time In Range (TIR)</CardTitle>
                            <ShieldCheck className="h-4 w-4 text-[#009CDF]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-[#009CDF]">
                                {stats.timeInRangePercent}%
                            </div>
                            {/* Segmented Progress Bar */}
                            <div className="w-full h-2 rounded-full overflow-hidden bg-slate-100 flex mt-2">
                                <div style={{ width: `${stats.lowPercent + stats.veryLowPercent}%` }} className="bg-red-400" title={`Low: ${stats.lowPercent}%`}></div>
                                <div style={{ width: `${stats.timeInRangePercent}%` }} className="bg-emerald-500" title={`Target: ${stats.timeInRangePercent}%`}></div>
                                <div style={{ width: `${stats.highPercent + stats.veryHighPercent}%` }} className="bg-amber-400" title={`High: ${stats.highPercent}%`}></div>
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                <span>70-180 mg/dL</span>
                                <span>Target: ≥70%</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Standard Deviation & CV */}
                    <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-bold uppercase text-slate-500 tracking-wider">Glycemic Variability</CardTitle>
                            <TrendingUp className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-slate-800">
                                ±{stats.standardDeviation} <span className="text-xs font-normal text-slate-500">SD</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                                <span>CV: <strong>{stats.coefficientOfVariation}%</strong></span>
                                <Badge className="text-[10px] bg-purple-100 text-purple-800">
                                    {stats.coefficientOfVariation <= 36 ? 'Stable (<36%)' : 'Variable'}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 2. GLYCOGEN CHARTS */}
                <GlucoseChart readings={readings} logs={filteredLogs} />

                {/* 3. AI PATTERN DETECTION & CLINICAL SUMMARY */}
                <AISummary logs={filteredLogs} readings={readings} />

                {/* 4. INTEGRATED CLINICAL CALCULATORS & CARB GUIDE */}
                <ClinicalCalculator />
            </main>
        </div>
    );
}
