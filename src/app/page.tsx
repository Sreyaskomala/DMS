"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Activity, BookOpen, Heart, Search, ChevronRight,
    Users, MapPin, Store, Snowflake,
    CheckCircle2, Sparkles, FileText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HYDERABAD_PHARMACIES } from "@/lib/pharmacy-data";

export default function Home() {
    const [heroSearch, setHeroSearch] = useState("");

    return (
        <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans">
            <main className="flex-1">
                {/* 1. TOP ANNOUNCEMENT BANNER */}
                <div className="bg-[#003E7E] text-white py-2 px-4 text-xs font-semibold">
                    <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span><strong>Hyderabad Pilot Live:</strong> Supporting neighbourhood pharmacies &amp; helping patients access trusted diabetes care.</span>
                        </div>
                        <div className="flex items-center gap-3 font-bold text-blue-200">
                            <Link href="/pharmacy-portal" className="text-white hover:text-[#009CDF] underline">
                                For Hyderabad Chemists →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 2. HERO SECTION */}
                <section className="relative bg-gradient-to-br from-[#F0F7FF] via-white to-blue-50/40 min-h-[620px] flex items-center overflow-hidden pb-20 pt-12">
                    <div className="absolute top-0 right-0 w-[55%] h-full bg-[#EAF6FF] rounded-bl-[180px] z-0 opacity-40 hidden lg:block"></div>

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
                        {/* Left Hero Content (7 cols) */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-[#003E7E] text-xs font-bold uppercase tracking-wider">
                                <Sparkles className="w-3.5 h-3.5 text-[#009CDF]" />
                                India&apos;s Diabetes Buddy &amp; Local Chemist Network
                            </div>

                            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#003E7E] leading-[1.08] tracking-tight">
                                Your Diabetes. <br />
                                <span className="text-[#009CDF]">One Place to Manage It.</span>
                            </h1>

                            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-medium">
                                Track glucose, insulin, and Indian meals effortlessly. Find genuine medicines from verified neighbourhood pharmacies across Hyderabad with 100% cold-chain assurance and transparent neighbourhood pricing.
                            </p>

                            {/* Hero Interactive Search Bar */}
                            <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-200 max-w-xl flex items-center gap-2">
                                <div className="flex items-center gap-2 px-3 flex-1">
                                    <Search className="h-4 w-4 text-[#009CDF] shrink-0" />
                                    <input
                                        type="text"
                                        value={heroSearch}
                                        onChange={(e) => setHeroSearch(e.target.value)}
                                        placeholder="Search Lantus, NovoRapid, Metformin, Accu-Chek..."
                                        className="w-full bg-transparent text-xs sm:text-sm outline-none font-medium placeholder:text-slate-400"
                                    />
                                </div>
                                <Button
                                    asChild
                                    className="bg-[#003E7E] hover:bg-[#002a5e] text-white font-bold text-xs h-10 px-5 rounded-xl shrink-0"
                                >
                                    <Link href={`/marketplace${heroSearch ? `?q=${encodeURIComponent(heroSearch)}` : ""}`}>
                                        Find Medicine
                                    </Link>
                                </Button>
                            </div>

                            {/* Primary Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <Button size="lg" className="rounded-2xl bg-[#003E7E] hover:bg-[#002a5e] h-13 px-8 text-sm font-bold shadow-xl shadow-blue-900/10" asChild>
                                    <Link href="/dashboard">
                                        <Activity className="h-4 w-4 mr-2 text-[#009CDF]" /> Start Tracking Free
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="rounded-2xl border-2 border-[#003E7E] text-[#003E7E] font-bold hover:bg-blue-50 h-13 px-6 text-sm flex gap-2" asChild>
                                    <Link href="/marketplace">
                                        <Store className="h-4 w-4" /> Hyderabad Chemist Network
                                    </Link>
                                </Button>
                            </div>

                            {/* Trust Signals */}
                            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-2">
                                <span className="flex items-center gap-1 text-emerald-700">
                                    <CheckCircle2 className="h-3.5 w-3.5" /> Telangana DCA Compliant
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1 text-cyan-700">
                                    <Snowflake className="h-3.5 w-3.5" /> 2°C - 8°C Cold-Chain Assured
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1 text-[#E31C79]">
                                    <Heart className="h-3.5 w-3.5" /> Save 20% - 80% on Refills
                                </span>
                            </div>
                        </div>

                        {/* Right Hero Product Card Showcase (5 cols) */}
                        <div className="lg:col-span-5 relative">
                            <div className="bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 space-y-4 relative z-10">
                                <div className="flex items-center justify-between border-b pb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                                        <span className="text-xs font-bold text-slate-800">Hyderabad Live Refill Hub</span>
                                    </div>
                                    <Badge className="bg-blue-50 text-[#003E7E] text-[10px] font-bold">
                                        8 Chemists Active
                                    </Badge>
                                </div>

                                {/* Sample Item Preview */}
                                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <Badge className="bg-[#003E7E] text-white text-[10px]">Basal Insulin</Badge>
                                            <h4 className="font-bold text-slate-900 text-sm mt-1">Lantus SoloStar Pen (100 IU/ml)</h4>
                                            <p className="text-[11px] text-slate-500">In stock at Sri Balaji Medical (Banjara Hills)</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[11px] text-slate-400 line-through">MRP ₹985</div>
                                            <div className="text-lg font-black text-emerald-700">₹795</div>
                                            <div className="text-[10px] text-emerald-600 font-bold">Save ₹190 (19%)</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px] pt-1 text-slate-600 border-t">
                                        <span className="flex items-center gap-1 text-cyan-700 font-medium">
                                            <Snowflake className="h-3 w-3" /> Cold-Chain 3.8°C Monitored
                                        </span>
                                        <span className="font-bold text-[#003E7E]">Ready for 4h Hold</span>
                                    </div>
                                </div>

                                {/* Jan Aushadhi Banner */}
                                <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs space-y-1">
                                    <div className="flex items-center justify-between font-bold text-amber-900">
                                        <span>PMBJP Jan Aushadhi Regular Insulin:</span>
                                        <span className="text-emerald-700 font-black text-sm">₹140 / vial</span>
                                    </div>
                                    <p className="text-[11px] text-amber-800">
                                        Available at Osmania Hospital Jan Aushadhi Kendra (83% cheaper than branded).
                                    </p>
                                </div>

                                <Button asChild className="w-full bg-[#003E7E] hover:bg-[#002a5e] text-white font-bold text-xs h-10 rounded-xl">
                                    <Link href="/marketplace">
                                        Explore All 50+ Diabetes Medicines →
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. WHAT DO YOU NEED TODAY? QUICK ACTIONS */}
                <section className="bg-slate-50 py-12 border-y border-slate-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
                            <h2 className="text-2xl font-bold text-[#003E7E]">What do you need today?</h2>
                            <p className="text-xs sm:text-sm text-slate-500">Quick tools to manage your diabetes or find affordable supplies</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { title: "Log Glucose & Vitals", subtitle: "Record FBS, PBS, BP & Weight", icon: <Activity className="h-6 w-6" />, href: "/dashboard", color: "bg-blue-50 text-[#003E7E]" },
                                { title: "Find Medicine & Save", subtitle: "Live stock at Hyd chemists", icon: <Store className="h-6 w-6" />, href: "/marketplace", color: "bg-emerald-50 text-emerald-800" },
                                { title: "Doctor PDF Report", subtitle: "1-Click clinical summary", icon: <FileText className="h-6 w-6" />, href: "/dashboard", color: "bg-pink-50 text-[#E31C79]" },
                                { title: "Indian Food Carb Guide", subtitle: "Roti, Rice, Dosa exchanges", icon: <BookOpen className="h-6 w-6" />, href: "/library", color: "bg-amber-50 text-amber-800" },
                            ].map((item, i) => (
                                <Link
                                    key={i}
                                    href={item.href}
                                    className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:shadow-lg hover:-translate-y-1 transition-all group"
                                >
                                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#003E7E] transition-colors">{item.title}</h3>
                                    <p className="text-xs text-slate-500 mt-1">{item.subtitle}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. THE FOUR PILLARS OF INSULIN INSIDE */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
                            <Badge className="bg-[#009CDF] text-white border-none font-bold text-xs uppercase tracking-wider">
                                Comprehensive Diabetes Care
                            </Badge>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#003E7E]">
                                Everything You Need In One Platform
                            </h2>
                            <p className="text-slate-600 text-sm">
                                Built specifically for Indian patients, caregivers, and neighbourhood pharmacies.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    icon: <Activity className="h-6 w-6 text-[#009CDF]" />,
                                    title: "1. Manage Daily",
                                    desc: "Quick vitals logging (Glucose, Basal/Bolus insulin, Oral meds, BP, Weight) with smart refill prediction engine.",
                                    linkText: "Open Tracker",
                                    href: "/dashboard"
                                },
                                {
                                    icon: <Store className="h-6 w-6 text-emerald-600" />,
                                    title: "2. Access & Save",
                                    desc: "Reserve medicines directly at verified neighbourhood chemists. Compare with Jan Aushadhi generic alternatives.",
                                    linkText: "Find Medicine",
                                    href: "/marketplace"
                                },
                                {
                                    icon: <BookOpen className="h-6 w-6 text-[#E31C79]" />,
                                    title: "3. Medically Reviewed",
                                    desc: "Clinical guides for Indian diets (Roti/Rice glycemic loads, summer insulin storage, hypo emergency 15-15 rule).",
                                    linkText: "Browse Library",
                                    href: "/library"
                                },
                                {
                                    icon: <Users className="h-6 w-6 text-amber-600" />,
                                    title: "4. Peer Community",
                                    desc: "Moderated peer discussions for Type 1, Type 2, and Parents. Hyderabad local chapter for local support.",
                                    linkText: "Join Community",
                                    href: "/community"
                                },
                            ].map((pillar, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                                    <div className="space-y-3">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                            {pillar.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-[#003E7E]">{pillar.title}</h3>
                                        <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
                                    </div>
                                    <div className="pt-6">
                                        <Link href={pillar.href} className="text-xs font-bold text-[#003E7E] hover:text-[#009CDF] flex items-center gap-1">
                                            {pillar.linkText} <ChevronRight className="h-3.5 w-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. HYDERABAD PHARMACY SHOWCASE */}
                <section className="py-16 bg-gradient-to-b from-blue-50/50 to-white border-t border-slate-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                            <div>
                                <Badge className="bg-emerald-100 text-emerald-800 border-none font-bold text-xs">
                                    Local Business Empowerment
                                </Badge>
                                <h2 className="text-2xl sm:text-3xl font-bold text-[#003E7E] mt-1">
                                    Verified Hyderabad Chemist Network
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-500">
                                    Empowering independent neighbourhood pharmacies with digital discovery and live demand intelligence.
                                </p>
                            </div>
                            <Button asChild variant="outline" className="border-[#003E7E] text-[#003E7E] font-bold text-xs">
                                <Link href="/marketplace">View All Localities →</Link>
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {HYDERABAD_PHARMACIES.slice(0, 3).map((pharma) => (
                                <div key={pharma.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-md space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-sm">{pharma.name}</h3>
                                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                                <MapPin className="h-3 w-3 text-[#E31C79]" /> {pharma.locality}
                                            </p>
                                        </div>
                                        <Badge className="bg-blue-100 text-[#003E7E] text-xs font-bold">
                                            ★ {pharma.rating}
                                        </Badge>
                                    </div>

                                    <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl space-y-1">
                                        <div className="flex justify-between">
                                            <span>Telangana DCA Lic:</span>
                                            <strong className="font-mono text-slate-800">{pharma.dcaLicenceNo.slice(0, 15)}...</strong>
                                        </div>
                                        <div className="flex justify-between text-cyan-800 font-bold">
                                            <span>Cold-Chain Status:</span>
                                            <span>{pharma.coldChainTempCurrent} ✓</span>
                                        </div>
                                    </div>

                                    <div className="text-[11px] text-emerald-800 font-medium bg-emerald-50 p-2 rounded-lg">
                                        💡 {pharma.discountNote}
                                    </div>

                                    <Button asChild size="sm" className="w-full bg-[#003E7E] hover:bg-[#002a5e] text-white font-bold text-xs h-9">
                                        <Link href="/marketplace">Check In-Store Stock</Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
