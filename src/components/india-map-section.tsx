"use client"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge"

// Mock Data for States
const STATE_DATA = [
    { id: "DL", name: "Delhi", top: "28%", left: "28%", cases: "2.4M", risk: "High", color: "bg-red-500" },
    { id: "MH", name: "Maharashtra", top: "58%", left: "25%", cases: "5.1M", risk: "High", color: "bg-red-500" },
    { id: "KA", name: "Karnataka", top: "72%", left: "28%", cases: "3.2M", risk: "Med", color: "bg-yellow-500" },
    { id: "TN", name: "Tamil Nadu", top: "82%", left: "32%", cases: "4.0M", risk: "High", color: "bg-red-500" },
    { id: "WB", name: "West Bengal", top: "45%", left: "68%", cases: "2.8M", risk: "Med", color: "bg-yellow-500" },
    { id: "GJ", name: "Gujarat", top: "45%", left: "15%", cases: "2.1M", risk: "Med", color: "bg-yellow-500" },
    { id: "UP", name: "Uttar Pradesh", top: "35%", left: "40%", cases: "3.5M", risk: "High", color: "bg-red-500" },
    { id: "KL", name: "Kerala", top: "88%", left: "28%", cases: "1.9M", risk: "High", color: "bg-red-500" },
]

export function IndiaMapSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Text Content */}
                    <div className="lg:w-1/2 space-y-8">
                        <Badge className="bg-[#009CDF] text-white hover:bg-[#007bb5] border-none px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
                            National Data Initiative 2026
                        </Badge>
                        <h2 className="text-4xl lg:text-5xl font-black text-[#003E7E] leading-tight">
                            Mapping the Crisis: <br /> Diabetes in India
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-medium">
                            Our interactive atlas provides real-time insights into diabetes prevalence across Indian states. We use this data to target resources where they are needed most.
                        </p>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="text-3xl font-black text-[#E31C79] mb-1">101M+</div>
                                <div className="text-xs font-bold text-slate-500 uppercase">Total Cases</div>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="text-3xl font-black text-[#009CDF] mb-1">15.3%</div>
                                <div className="text-xs font-bold text-slate-500 uppercase">Pre-Diabetic</div>
                            </div>
                        </div>
                    </div>

                    {/* Map Visual */}
                    <div className="lg:w-1/2 relative min-h-[500px] bg-slate-50 rounded-3xl border border-slate-100 p-8 shadow-inner flex items-center justify-center group overflow-hidden">

                        {/* India Map Silhouette Image */}
                        <div className="relative w-full max-w-md aspect-[3/4] transition-all duration-500 hover:scale-105">
                            <img
                                src="/india-map-silhouette.png"
                                alt="Diabetes Prevalence Map of India"
                                className="w-full h-full object-contain drop-shadow-2xl opacity-90"
                            />


                            {/* Data Points */}
                            {STATE_DATA.map((state) => (
                                <HoverCard key={state.id}>
                                    <HoverCardTrigger asChild>
                                        <button
                                            className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-150 transition-transform duration-300 ${state.color} animate-pulse`}
                                            style={{ top: state.top, left: state.left }}
                                        />
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-auto p-4 bg-[#003E7E] text-white border-none shadow-xl">
                                        <div className="font-bold text-lg mb-1">{state.name}</div>
                                        <div className="text-xs font-medium text-blue-200 uppercase tracking-widest mb-3">Prevalence Data</div>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <div className="opacity-70 text-xs">Active Cases</div>
                                                <div className="font-bold">{state.cases}</div>
                                            </div>
                                            <div>
                                                <div className="opacity-70 text-xs">Risk Level</div>
                                                <div className={`font-bold ${state.risk === 'High' ? 'text-[#E31C79]' : 'text-yellow-400'}`}>{state.risk}</div>
                                            </div>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                            ))}
                        </div>

                        <div className="absolute bottom-8 right-8 bg-white p-4 rounded-xl shadow-lg text-xs font-bold text-slate-500">
                            <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> High Prevalence</div>
                            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Moderate Prevalence</div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
