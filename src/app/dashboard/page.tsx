"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
    Activity, Plus, Clock, CheckCircle2, AlertCircle,
    Calendar, TrendingUp, Pill, Snowflake, ShieldCheck,
    Store, Download, Heart, Sparkles, ChevronRight,
    Utensils, Droplets, RefreshCw, FileText, ArrowUpRight,
    Check, X, AlertTriangle, ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getStoredLogs, HealthLogRow } from "@/lib/demo-data";
import { GlucoseChart } from "@/components/analytics/glucose-chart";

interface ScheduledMed {
    id: string;
    name: string;
    dose: string;
    time: string;
    timingLabel: "Morning (Fasting)" | "Breakfast" | "Lunch" | "Dinner" | "Bedtime";
    status: "taken" | "pending" | "snoozed" | "skipped";
    type: "insulin_basal" | "insulin_bolus" | "oral_med" | "thyroid";
}

const INITIAL_SCHEDULE: ScheduledMed[] = [
    { id: "sm-1", name: "Thyronorm 50 mcg", dose: "1 Tablet", time: "06:30 AM", timingLabel: "Morning (Fasting)", status: "taken", type: "thyroid" },
    { id: "sm-2", name: "Actrapid Bolus Insulin", dose: "6 Units (Pre-meal)", time: "08:00 AM", timingLabel: "Breakfast", status: "taken", type: "insulin_bolus" },
    { id: "sm-3", name: "Glycomet-GP 2 Forte", dose: "1 Tablet (With food)", time: "08:30 AM", timingLabel: "Breakfast", status: "taken", type: "oral_med" },
    { id: "sm-4", name: "Actrapid Bolus Insulin", dose: "8 Units (Pre-meal)", time: "01:15 PM", timingLabel: "Lunch", status: "pending", type: "insulin_bolus" },
    { id: "sm-5", name: "Forxiga 10mg", dose: "1 Tablet", time: "02:00 PM", timingLabel: "Lunch", status: "pending", type: "oral_med" },
    { id: "sm-6", name: "Actrapid Bolus Insulin", dose: "8 Units (Pre-meal)", time: "07:45 PM", timingLabel: "Dinner", status: "pending", type: "insulin_bolus" },
    { id: "sm-7", name: "Basaglar Basal Insulin", dose: "18 Units (Bedtime)", time: "10:00 PM", timingLabel: "Bedtime", status: "pending", type: "insulin_basal" },
];

export default function DashboardPage() {
    const [schedule, setSchedule] = useState<ScheduledMed[]>(INITIAL_SCHEDULE);
    const [recentLogs] = useState<HealthLogRow[]>(() => getStoredLogs());
    const [latestBg, setLatestBg] = useState({ value: 108, context: "Fasting", time: "07:30 AM", inRange: true });

    // Quick Quick Log Modal
    const [isQuickBgOpen, setIsQuickBgOpen] = useState(false);
    const [newBgValue, setNewBgValue] = useState("");
    const [newBgContext, setNewBgContext] = useState("Post-Breakfast");

    // Doctor Report Modal
    const [isDoctorReportOpen, setIsDoctorReportOpen] = useState(false);

    const handleMarkMed = (id: string, status: ScheduledMed["status"]) => {
        setSchedule(prev => prev.map(m => m.id === id ? { ...m, status } : m));
        if (status === "taken") {
            toast.success("Dose recorded as taken ✓", { description: "Updated your daily medication adherence history." });
        } else if (status === "snoozed") {
            toast.info("Reminder snoozed for 15 minutes.");
        } else {
            toast.info("Dose marked as skipped.");
        }
    };

    const handleSaveQuickBg = (e: React.FormEvent) => {
        e.preventDefault();
        const val = parseInt(newBgValue, 10);
        if (!val || isNaN(val)) {
            toast.error("Please enter a valid glucose value (mg/dL).");
            return;
        }

        const inRange = val >= 70 && val <= 180;
        setLatestBg({
            value: val,
            context: newBgContext,
            time: "Just now",
            inRange
        });

        setIsQuickBgOpen(false);
        setNewBgValue("");

        if (val < 70) {
            toast.error(`Low Glucose Alert: ${val} mg/dL!`, {
                description: "Hypoglycemia detected. Follow the 15-15 rule: Take 15g fast sugar (3 glucose tabs / 1/2 cup fruit juice), rest, and retest in 15 mins."
            });
        } else if (val > 250) {
            toast.warning(`High Glucose Reading: ${val} mg/dL`, {
                description: "Hydrate well with plain water and check for ketones if experiencing nausea or fatigue."
            });
        } else {
            toast.success(`Logged ${val} mg/dL (${newBgContext})`, {
                description: "Great job! Your reading is in the clinical target range (70–180 mg/dL)."
            });
        }
    };

    // Calculate adherence percentage
    const takenCount = schedule.filter(m => m.status === "taken").length;
    const adherencePercent = Math.round((takenCount / schedule.length) * 100);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
            {/* Dashboard Header Bar */}
            <header className="bg-white border-b-4 border-[#003E7E] sticky top-0 z-40 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-9 w-9 bg-[#003E7E] rounded-xl flex items-center justify-center text-white font-black">
                                <Activity className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-black text-[#003E7E] tracking-tight hidden sm:inline-block">
                                Insulin<span className="text-[#009CDF]">Inside</span>
                            </span>
                        </Link>
                        <Badge className="bg-blue-100 text-[#003E7E] text-[10px] font-bold border-none">
                            Today Dashboard
                        </Badge>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setIsDoctorReportOpen(true)}
                            className="border-[#003E7E] text-[#003E7E] font-bold text-xs h-9 rounded-xl flex items-center gap-1.5 hover:bg-blue-50"
                        >
                            <Download className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Doctor-Ready PDF Report</span>
                            <span className="sm:hidden">Report</span>
                        </Button>

                        <Button
                            size="sm"
                            asChild
                            className="bg-[#003E7E] hover:bg-[#002a5e] text-white font-bold text-xs h-9 rounded-xl shadow-md"
                        >
                            <Link href="/marketplace">
                                <Store className="h-3.5 w-3.5 mr-1" /> Find Medicine
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Sub-Nav Bar */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2 text-xs font-bold">
                    <div className="flex gap-6 text-slate-600">
                        <Link href="/dashboard" className="text-[#003E7E] border-b-2 border-[#003E7E] pb-2">
                            Today Overview
                        </Link>
                        <Link href="/dashboard/analytics" className="hover:text-[#009CDF] pb-2 transition-colors">
                            Clinical Analytics
                        </Link>
                        <Link href="/marketplace" className="hover:text-[#009CDF] pb-2 transition-colors">
                            Chemist Partner Network
                        </Link>
                        <Link href="/community" className="hover:text-[#009CDF] pb-2 transition-colors">
                            Community
                        </Link>
                    </div>
                    <div className="text-slate-400 font-medium hidden sm:block">
                        Indian Standard Time (IST) • India
                    </div>
                </div>
            </div>

            {/* Main Dashboard Container */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
                {/* 1. Greeting & Quick Action Hero */}
                <div className="bg-gradient-to-r from-[#003E7E] via-[#004e9e] to-[#009CDF] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="space-y-2 max-w-xl">
                        <Badge className="bg-white/20 text-white border-none text-xs font-bold">
                            Type 1 Diabetes Tracker · Day 14 Streak 🔥
                        </Badge>
                        <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                            Namaste, Sreyas! 👋
                        </h1>
                        <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                            Your glucose has been in range <strong>86% of the time</strong> this week. 3 of 7 scheduled doses taken today.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button
                            onClick={() => setIsQuickBgOpen(true)}
                            className="bg-white text-[#003E7E] hover:bg-blue-50 font-extrabold text-xs h-11 px-5 rounded-2xl shadow-lg"
                        >
                            <Plus className="h-4 w-4 mr-1 text-[#009CDF]" /> Log Blood Sugar
                        </Button>
                        <Button
                            asChild
                            className="bg-[#E31C79] hover:bg-[#c21565] text-white font-extrabold text-xs h-11 px-5 rounded-2xl shadow-lg"
                        >
                            <Link href="/marketplace">
                                <Store className="h-4 w-4 mr-1" /> Find Medicine
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* 2. Refill Alert Banner (Commerce & Utility Bridge) */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-start gap-3">
                        <div className="h-10 w-10 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center shrink-0">
                            <Snowflake className="h-5 w-5 text-cyan-700" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-amber-900 text-sm">Refill Prediction: Basal Insulin Running Low</span>
                                <Badge className="bg-amber-200 text-amber-900 border-none text-[10px] font-black">~4 Days Supply Left</Badge>
                            </div>
                            <p className="text-xs text-amber-800 mt-0.5">
                                Based on your 18 units/day bedtime regimen, your Basaglar pen has ~36 units left. Verified local chemist stock is confirmed in Banjara Hills &amp; Madhapur.
                            </p>
                        </div>
                    </div>

                    <Button asChild size="sm" className="bg-[#003E7E] hover:bg-[#002a5e] text-white font-bold text-xs shrink-0 rounded-xl">
                        <Link href="/marketplace">
                            Reserve at Local Chemist (Save ₹135) →
                        </Link>
                    </Button>
                </div>

                {/* 3. Core Daily Widgets Grid */}
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left: Blood Glucose & Medication Timeline (8 cols) */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Blood Sugar Live Card */}
                        <div className="grid sm:grid-cols-3 gap-4">
                            <Card className="sm:col-span-1 bg-white border-slate-200 shadow-md">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-wider">Latest Blood Sugar</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-[#003E7E]">{latestBg.value}</span>
                                        <span className="text-xs text-slate-500 font-bold">mg/dL</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Badge className="bg-emerald-100 text-emerald-800 border-none font-bold text-[10px]">
                                            {latestBg.context}
                                        </Badge>
                                        <span className="text-[11px] text-slate-400 font-medium">{latestBg.time}</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setIsQuickBgOpen(true)}
                                        className="w-full text-xs font-bold border-slate-200 hover:bg-slate-50 text-[#003E7E]"
                                    >
                                        + Add New Reading
                                    </Button>
                                </CardFooter>
                            </Card>

                            <Card className="sm:col-span-1 bg-white border-slate-200 shadow-md">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated HbA1c</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-emerald-700">6.8%</span>
                                        <span className="text-xs text-slate-500 font-bold">(eAG 148)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Badge className="bg-emerald-100 text-emerald-800 border-none font-bold text-[10px]">
                                            Target &lt;7.0% Met ✓
                                        </Badge>
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0">
                                    <Link href="/dashboard/analytics" className="text-xs text-[#009CDF] font-bold hover:underline flex items-center">
                                        View 90-Day Trend <ChevronRight className="h-3 w-3 ml-0.5" />
                                    </Link>
                                </CardFooter>
                            </Card>

                            <Card className="sm:col-span-1 bg-white border-slate-200 shadow-md">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-wider">Daily Adherence</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-[#003E7E]">{adherencePercent}%</span>
                                        <span className="text-xs text-slate-500 font-bold">({takenCount}/{schedule.length} taken)</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                        <div className="bg-[#009CDF] h-full rounded-full transition-all" style={{ width: `${adherencePercent}%` }}></div>
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0 text-[11px] text-slate-400">
                                    4 upcoming doses remaining today
                                </CardFooter>
                            </Card>
                        </div>

                        {/* Today's Medication & Insulin Timeline */}
                        <Card className="bg-white border-slate-200 shadow-md">
                            <CardHeader className="border-b pb-3 flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg font-bold text-[#003E7E] flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-[#009CDF]" />
                                        Today&apos;s Medication &amp; Insulin Schedule
                                    </CardTitle>
                                    <CardDescription className="text-xs">
                                        Track scheduled basal, bolus, thyroid, and oral medicines.
                                    </CardDescription>
                                </div>
                                <span className="text-xs font-bold text-slate-400">
                                    {schedule.filter(s => s.status === "taken").length} of {schedule.length} Completed
                                </span>
                            </CardHeader>

                            <CardContent className="p-4 divide-y divide-slate-100">
                                {schedule.map((med) => (
                                    <div
                                        key={med.id}
                                        className={`py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${med.status === "taken" ? "opacity-75" : ""
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0 ${med.status === "taken"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-blue-50 text-[#003E7E]"
                                                }`}>
                                                {med.status === "taken" ? <Check className="h-5 w-5" /> : <Clock className="h-4 w-4" />}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <strong className="text-sm text-slate-900">{med.name}</strong>
                                                    <Badge className={
                                                        med.type.includes("insulin")
                                                            ? "bg-cyan-50 text-cyan-800 border-cyan-200 text-[10px] font-bold"
                                                            : "bg-slate-100 text-slate-700 border-slate-200 text-[10px]"
                                                    }>
                                                        {med.dose}
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                                                    <span>Scheduled: <strong>{med.time}</strong></span>
                                                    <span>•</span>
                                                    <span>{med.timingLabel}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                            {med.status === "taken" ? (
                                                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold text-xs px-3 py-1">
                                                    ✓ Taken
                                                </Badge>
                                            ) : (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleMarkMed(med.id, "snoozed")}
                                                        className="text-xs text-slate-500 hover:bg-slate-100 h-8"
                                                    >
                                                        Snooze 15m
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleMarkMed(med.id, "skipped")}
                                                        className="text-xs text-slate-400 hover:bg-slate-100 h-8"
                                                    >
                                                        Skip
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleMarkMed(med.id, "taken")}
                                                        className="bg-[#003E7E] hover:bg-[#002a5e] text-white text-xs font-bold h-8 px-4 rounded-lg"
                                                    >
                                                        Mark Taken
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Recent Glycemic Trend Visualization Preview */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-[#003E7E]">Glycemic Trend Preview</h3>
                                <Link href="/dashboard/analytics" className="text-xs text-[#009CDF] font-bold hover:underline">
                                    Full Interactive Analytics →
                                </Link>
                            </div>
                            <GlucoseChart readings={[]} logs={recentLogs} />
                        </div>
                    </div>

                    {/* Right: Indian Meal Carbs & Health Snapshot (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Health Snapshot Vitals */}
                        <Card className="bg-white border-slate-200 shadow-md">
                            <CardHeader className="pb-3 border-b">
                                <CardTitle className="text-sm font-bold text-[#003E7E] uppercase tracking-wider">
                                    Health Vitals Snapshot
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-3 text-xs">
                                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl">
                                    <span className="text-slate-500">Blood Pressure:</span>
                                    <strong className="text-slate-900 font-bold text-sm">120 / 80 mmHg (Normal)</strong>
                                </div>
                                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl">
                                    <span className="text-slate-500">Current Weight:</span>
                                    <strong className="text-slate-900 font-bold text-sm">68.5 kg (Stable)</strong>
                                </div>
                                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl">
                                    <span className="text-slate-500">Daily Water:</span>
                                    <strong className="text-slate-900 font-bold text-sm">2.5 L / 3.0 L Target</strong>
                                </div>
                                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl">
                                    <span className="text-slate-500">Thyroid (TSH):</span>
                                    <strong className="text-slate-900 font-bold text-sm">2.1 µIU/mL (Optimal)</strong>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Indian Food Carb Helper Card */}
                        <Card className="bg-white border-slate-200 shadow-md">
                            <CardHeader className="pb-3 border-b">
                                <div className="flex items-center gap-2">
                                    <Utensils className="h-4 w-4 text-[#E31C79]" />
                                    <CardTitle className="text-sm font-bold text-[#003E7E]">
                                        Indian Meal Carb Cheat Sheet
                                    </CardTitle>
                                </div>
                                <CardDescription className="text-[11px]">
                                    Standard 15g Carbohydrate Exchanges for Indian Diets.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 space-y-2.5 text-xs">
                                <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                                    <span>1 Whole Wheat Roti / Phulka (30g)</span>
                                    <strong className="text-[#003E7E]">15g Carbs</strong>
                                </div>
                                <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                                    <span>1 Cup Cooked White Rice (150g)</span>
                                    <strong className="text-amber-700">45g Carbs (3 Exch)</strong>
                                </div>
                                <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                                    <span>1 Plain Dosa (Med Size)</span>
                                    <strong className="text-[#003E7E]">25g Carbs</strong>
                                </div>
                                <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                                    <span>2 Steamed Idlis with Sambar</span>
                                    <strong className="text-[#003E7E]">30g Carbs</strong>
                                </div>
                                <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                                    <span>1 Cup Dal Tadka / Chana</span>
                                    <strong className="text-emerald-700">12g Carbs + Protein</strong>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                                <Link href="/library" className="text-xs text-[#009CDF] font-bold hover:underline flex items-center">
                                    Read Full Indian Nutrition Guide →
                                </Link>
                            </CardFooter>
                        </Card>

                        {/* Emergency SOS Card */}
                        <div className="bg-red-50 border border-red-200 p-4 rounded-2xl space-y-2 text-xs text-red-950">
                            <div className="flex items-center gap-2 font-bold text-red-700">
                                <AlertTriangle className="h-4 w-4" />
                                Emergency Hypo Protocols
                            </div>
                            <p className="text-[11px] text-red-900 leading-relaxed">
                                If blood sugar drops &lt;70 mg/dL: Take 15g fast carbs (3 glucose tabs / 1/2 cup fruit juice). Retest in 15 mins.
                            </p>
                            <div className="pt-1 flex gap-2">
                                <Button size="sm" variant="destructive" className="w-full text-xs font-bold h-8" asChild>
                                    <a href="tel:108">Emergency Dial: 108 / 112</a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* ----------------- MODAL: QUICK LOG BLOOD SUGAR ----------------- */}
            <Dialog open={isQuickBgOpen} onOpenChange={setIsQuickBgOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <div className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-[#003E7E]" />
                            <DialogTitle className="text-xl font-bold text-[#003E7E]">
                                Log Blood Glucose Reading
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-xs text-slate-500">
                            Keep your clinical logs updated for doctor review and trend calculations.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSaveQuickBg} className="space-y-4 text-xs">
                        <div className="space-y-1">
                            <label className="font-bold text-slate-700">Blood Sugar Value (mg/dL):</label>
                            <Input
                                type="number"
                                value={newBgValue}
                                onChange={(e) => setNewBgValue(e.target.value)}
                                placeholder="e.g. 110"
                                className="text-lg font-black h-12 text-[#003E7E]"
                                required
                                autoFocus
                            />
                            <div className="text-[11px] text-slate-400">Target clinical range: 70 - 180 mg/dL</div>
                        </div>

                        <div className="space-y-1">
                            <label className="font-bold text-slate-700">Timing &amp; Meal Context:</label>
                            <select
                                value={newBgContext}
                                onChange={(e) => setNewBgContext(e.target.value)}
                                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold"
                            >
                                <option value="Fasting (FBS)">Fasting (FBS - Morning)</option>
                                <option value="Post-Breakfast (PBS)">Post-Breakfast (PBS 2h)</option>
                                <option value="Pre-Lunch">Pre-Lunch</option>
                                <option value="Post-Lunch">Post-Lunch (2h)</option>
                                <option value="Pre-Dinner">Pre-Dinner</option>
                                <option value="Post-Dinner">Post-Dinner (2h)</option>
                                <option value="Bedtime">Bedtime</option>
                                <option value="Random / Pre-Workout">Random / Pre-Workout</option>
                            </select>
                        </div>

                        <Button type="submit" className="w-full bg-[#003E7E] text-white font-bold h-10 text-xs rounded-xl">
                            Save Glucose Reading
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            {/* ----------------- MODAL: DOCTOR-READY CLINICAL SUMMARY REPORT ----------------- */}
            <Dialog open={isDoctorReportOpen} onOpenChange={setIsDoctorReportOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-[#003E7E]" />
                            <DialogTitle className="text-xl font-bold text-[#003E7E]">
                                Doctor-Ready Clinical Summary Report
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-xs text-slate-500">
                            Official printable 14-day glycemic and medication adherence record to present during endocrinologist consultations.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-6 bg-white border-2 border-slate-200 rounded-2xl text-xs space-y-4 font-sans text-slate-800">
                        <div className="flex justify-between items-start border-b pb-4">
                            <div>
                                <h3 className="text-lg font-black text-[#003E7E]">INSULIN INSIDE CLINICAL SUMMARY</h3>
                                <p className="text-[11px] text-slate-500">Patient: <strong>Sreyas Komala (Age 28, Type 1 Diabetes)</strong></p>
                                <p className="text-[11px] text-slate-500">Reporting Period: <strong>Last 14 Days (Aug 2026)</strong></p>
                            </div>
                            <div className="text-right">
                                <Badge className="bg-emerald-100 text-emerald-800 font-bold text-xs">Estimated HbA1c: 6.8%</Badge>
                                <p className="text-[11px] text-slate-400 mt-1">Generated: Today, IST</p>
                            </div>
                        </div>

                        {/* Summary Metrics */}
                        <div className="grid grid-cols-4 gap-2 text-center bg-slate-50 p-3 rounded-xl">
                            <div>
                                <div className="text-slate-400 text-[10px]">Avg Fasting</div>
                                <strong className="text-sm text-[#003E7E]">108 mg/dL</strong>
                            </div>
                            <div>
                                <div className="text-slate-400 text-[10px]">Avg Post-Meal</div>
                                <strong className="text-sm text-[#003E7E]">144 mg/dL</strong>
                            </div>
                            <div>
                                <div className="text-slate-400 text-[10px]">Time-in-Range (70-180)</div>
                                <strong className="text-sm text-emerald-700">86% TIR</strong>
                            </div>
                            <div>
                                <div className="text-slate-400 text-[10px]">Med Adherence</div>
                                <strong className="text-sm text-[#003E7E]">94% Taken</strong>
                            </div>
                        </div>

                        {/* Current Regimen Table */}
                        <div className="space-y-1.5">
                            <h4 className="font-bold text-slate-800 text-xs">Current Prescribed Regimen:</h4>
                            <table className="w-full text-[11px] border">
                                <thead className="bg-slate-100">
                                    <tr>
                                        <th className="p-1.5 border">Medication / Insulin</th>
                                        <th className="p-1.5 border">Dose</th>
                                        <th className="p-1.5 border">Schedule</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-1.5 border font-semibold">Basaglar (Glargine 100IU)</td>
                                        <td className="p-1.5 border">18 Units</td>
                                        <td className="p-1.5 border">Bedtime (10:00 PM)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-1.5 border font-semibold">Actrapid (Regular Human)</td>
                                        <td className="p-1.5 border">6u / 8u / 8u</td>
                                        <td className="p-1.5 border">Pre-Breakfast, Lunch, Dinner</td>
                                    </tr>
                                    <tr>
                                        <td className="p-1.5 border font-semibold">Glycomet-GP 2 Forte</td>
                                        <td className="p-1.5 border">1 Tab</td>
                                        <td className="p-1.5 border">Morning with Breakfast</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="text-[10px] text-slate-400 border-t pt-2 italic">
                            Disclaimer: Generated from patient self-monitored logs. Does not substitute for laboratory HbA1c venous testing or professional endocrinologist diagnosis.
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => window.print()}
                            className="flex-1 text-xs font-bold"
                        >
                            Print / Save as PDF
                        </Button>
                        <Button
                            onClick={() => {
                                setIsDoctorReportOpen(false);
                                toast.success("Doctor Report exported to clipboard!");
                            }}
                            className="flex-1 bg-[#003E7E] text-white text-xs font-bold"
                        >
                            Done
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
