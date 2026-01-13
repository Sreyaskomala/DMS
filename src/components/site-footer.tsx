"use client"

import Link from "next/link"
import { Activity, Heart } from "lucide-react"
import { usePathname } from "next/navigation"

export function SiteFooter() {
    const pathname = usePathname()

    // Hide footer on dashboard to allow app-like layout or simplify
    if (pathname?.startsWith("/dashboard")) {
        return null
    }

    return (
        <footer className="bg-[#101828] text-white pt-24 pb-12 border-t-[6px] border-[#E31C79]">
            <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-5 gap-12 text-sm text-slate-400">
                <div className="lg:col-span-2 space-y-6 pr-12">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-white rounded-md flex items-center justify-center text-[#003E7E]">
                            <Activity className="h-5 w-5" />
                        </div>
                        <span className="text-2xl font-black text-white tracking-tighter">Insulin<span className="text-[#009CDF]">Inside</span></span>
                    </div>
                    <p className="leading-relaxed">
                        Insulin Inside is India's leading digital platform offering comprehensive diabetes care, community support, and advocacy. We are a non-profit initiative dedicated to improving lives.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#009CDF] transition-colors cursor-pointer text-white font-bold">FB</div>
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#009CDF] transition-colors cursor-pointer text-white font-bold">X</div>
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#009CDF] transition-colors cursor-pointer text-white font-bold">IG</div>
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#009CDF] transition-colors cursor-pointer text-white font-bold">LI</div>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Organization</h4>
                    <ul className="space-y-4">
                        <li className="hover:text-[#009CDF] cursor-pointer transition-colors">Our Mission</li>
                        <li className="hover:text-[#009CDF] cursor-pointer transition-colors">Board of Directors</li>
                        <li className="hover:text-[#009CDF] cursor-pointer transition-colors">Annual Reports</li>
                        <li className="hover:text-[#009CDF] cursor-pointer transition-colors">Careers</li>
                        <li className="hover:text-[#009CDF] cursor-pointer transition-colors">Contact Us</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Resources</h4>
                    <ul className="space-y-4">
                        <li className="hover:text-[#009CDF] cursor-pointer transition-colors">Living with Diabetes</li>
                        <li className="hover:text-[#009CDF] cursor-pointer transition-colors">Food Guide</li>
                        <li className="hover:text-[#009CDF] cursor-pointer transition-colors">Find a Doctor</li>
                        <li className="hover:text-[#009CDF] cursor-pointer transition-colors">Support Groups</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Legal</h4>
                    <ul className="space-y-4">
                        <li className="hover:text-[#009CDF] cursor-pointer transition-colors">Privacy Policy</li>
                        <li className="hover:text-[#009CDF] cursor-pointer transition-colors">Terms of Use</li>
                        <li className="hover:text-[#009CDF] cursor-pointer transition-colors">Cookie Policy</li>
                        <li className="hover:text-[#009CDF] cursor-pointer transition-colors">Disclaimer</li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
                <p>© 2026 Insulin Inside Foundation. Registered Non-Profit.</p>
                <p className="mt-2 md:mt-0">Made with <Heart className="h-3 w-3 inline text-red-500" /> in India.</p>
            </div>
        </footer>
    )
}
