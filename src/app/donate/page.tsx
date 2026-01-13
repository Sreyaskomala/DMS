import { Button } from "@/components/ui/button";
import { Heart, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DonatePage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <header className="bg-white py-6 border-b sticky top-0 z-50">
                <div className="container px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-black text-xl text-[#003E7E]">
                        Insulin<span className="text-[#009CDF]">Inside</span>
                    </div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest hidden sm:block">Secure Donation</div>
                </div>
            </header>

            <div className="container px-6 py-12">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <Badge className="bg-green-100 text-green-700 border-none mb-4">Tax Deductible (80G)</Badge>
                    <h1 className="text-4xl md:text-5xl font-black text-[#003E7E] mb-6">Support the Cause</h1>
                    <p className="text-lg text-slate-600">Your donation provides insulin, education, and support to children and families in need across India.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* ONE TIME */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-slate-100 hover:border-[#009CDF] transition-colors relative overflow-hidden">
                        <h3 className="text-xl font-bold text-slate-600 mb-2">One-Time Gift</h3>
                        <div className="text-4xl font-black text-[#003E7E] mb-6">₹1,000</div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex gap-3 text-sm text-slate-600"><CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" /> Provides 1 month of test strips</li>
                            <li className="flex gap-3 text-sm text-slate-600"><CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" /> Supports educational workshops</li>
                        </ul>
                        <Button className="w-full bg-[#003E7E] hover:bg-[#002a5e] h-12 font-bold rounded-xl">Donate Once</Button>
                    </div>

                    {/* MONTHLY - HIGHLIGHTED */}
                    <div className="bg-[#003E7E] text-white p-8 rounded-2xl shadow-2xl border-2 border-[#003E7E] relative transform lg:-translate-y-4">
                        <div className="absolute top-0 right-0 bg-[#E31C79] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">MOST IMPACTFUL</div>
                        <h3 className="text-xl font-bold text-blue-100 mb-2">Monthly Sponsor</h3>
                        <div className="text-4xl font-black text-white mb-6">₹500<span className="text-lg font-medium text-blue-200">/mo</span></div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex gap-3 text-sm text-blue-100"><Heart className="h-5 w-5 text-[#E31C79] flex-shrink-0" /> Adopts a child's insulin needs</li>
                            <li className="flex gap-3 text-sm text-blue-100"><Heart className="h-5 w-5 text-[#E31C79] flex-shrink-0" /> Quarterly health checkups</li>
                            <li className="flex gap-3 text-sm text-blue-100"><Heart className="h-5 w-5 text-[#E31C79] flex-shrink-0" /> Exclusive donor updates</li>
                        </ul>
                        <Button className="w-full bg-[#E31C79] hover:bg-[#c21565] h-12 font-bold rounded-xl shadow-lg">Join Monthly</Button>
                    </div>

                    {/* CUSTOM */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-slate-100 hover:border-[#009CDF] transition-colors">
                        <h3 className="text-xl font-bold text-slate-600 mb-2">Custom Amount</h3>
                        <div className="text-4xl font-black text-[#003E7E] mb-6">Any</div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex gap-3 text-sm text-slate-600"><CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" /> Every bit counts</li>
                            <li className="flex gap-3 text-sm text-slate-600"><CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" /> Flexible contribution</li>
                        </ul>
                        <Button variant="outline" className="w-full border-2 border-[#003E7E] text-[#003E7E] hover:bg-blue-50 h-12 font-bold rounded-xl">Choose Amount</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
