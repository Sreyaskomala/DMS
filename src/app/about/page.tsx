"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Store, ShieldCheck, Heart,
    Lock, Snowflake
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            {/* HERO */}
            <section className="bg-gradient-to-br from-[#003E7E] to-[#00254d] text-white py-16 sm:py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
                    <Badge className="bg-[#009CDF] text-white border-none px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
                        India&apos;s Biggest Diabetes Platform
                    </Badge>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                        Empowering Diabetes Warriors <br />
                        <span className="text-cyan-300">&amp; Supporting Neighbourhood Pharmacies Across India</span>
                    </h1>
                    <p className="text-base sm:text-lg text-blue-100 leading-relaxed font-medium">
                        Insulin Inside is building India&apos;s biggest diabetes platform — empowering patients with daily health tracking while supporting local pharmacies with modern digital tools to serve their communities.
                    </p>
                </div>
            </section>

            {/* OUR PURPOSE */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-12">
                    <div className="text-center space-y-2">
                        <Badge className="bg-blue-100 text-[#003E7E] border-none font-bold text-xs">Our Purpose</Badge>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003E7E]">Why We Are Building Insulin Inside</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-4">
                            <div className="w-12 h-12 bg-red-100 text-red-700 rounded-2xl flex items-center justify-center font-black">
                                <Heart className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">1. Accessible &amp; Transparent Diabetes Care</h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                Diabetes management requires daily commitment and ongoing medical care. We make it simple for patients to track glucose vitals, understand carbohydrate exchanges, connect with trusted local chemists for temperature-controlled medicines, and explore affordable options including Pradhan Mantri Jan Aushadhi generic alternatives.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-4">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center font-black">
                                <Store className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">2. Supporting Neighbourhood Pharmacies</h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                Local retail chemists are the heart of healthcare in every Indian community. We support neighbourhood pharmacies with digital discovery, convenient reservation management, and local demand insights so they can better serve patients and deliver timely, personalized care right in their neighbourhoods.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CORE PRINCIPLES */}
            <section className="py-16 bg-slate-100/60 border-y border-slate-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003E7E]">Our Operating Principles</h2>
                        <p className="text-xs sm:text-sm text-slate-500">How we maintain clinical safety, regulatory compliance, and patient trust.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 text-xs">
                        <div className="bg-white p-5 rounded-2xl shadow-sm space-y-2 border">
                            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                                <ShieldCheck className="h-4 w-4 text-emerald-600" /> 100% DCA Licensing
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                Every partner pharmacy is verified against the Telangana DCA Online Drugs Licensing System (ODLS) with licensed registered pharmacists.
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow-sm space-y-2 border">
                            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                                <Snowflake className="h-4 w-4 text-cyan-600" /> Cold-Chain Integrity
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                Insulins require strictly 2°C–8°C storage. We verify refrigerator monitoring and provide thermal gel packaging for local pickup and delivery.
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow-sm space-y-2 border">
                            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                                <Lock className="h-4 w-4 text-[#003E7E]" /> Privacy-by-Design
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                Your glucose logs, insulin doses, and prescriptions are strictly private. We never monetize or sell identifiable medical data to third-party advertisers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="py-16 bg-white text-center">
                <div className="container mx-auto px-4 max-w-2xl space-y-6">
                    <h2 className="text-3xl font-black text-[#003E7E]">Join the Movement Across India</h2>
                    <p className="text-xs sm:text-sm text-slate-600">
                        Whether you are a patient looking for reliable refills, a caregiver, or a local chemist wanting to join our growing network, we welcome you.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <Button asChild className="bg-[#003E7E] hover:bg-[#002a5e] text-white font-bold h-11 px-6 rounded-xl">
                            <Link href="/dashboard">Start Daily Health Tracking</Link>
                        </Button>
                        <Button asChild variant="outline" className="border-[#003E7E] text-[#003E7E] font-bold h-11 px-6 rounded-xl hover:bg-blue-50">
                            <Link href="/pharmacy-portal">For Partner Chemists</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
