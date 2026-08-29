"use client"

import Link from "next/link";
import { Activity, Heart, ShieldCheck, Phone, AlertTriangle } from "lucide-react";
import { usePathname } from "next/navigation";

export function SiteFooter() {
    const pathname = usePathname();

    if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/pharmacy-portal")) {
        return null;
    }

    return (
        <footer className="bg-[#101828] text-white pt-16 pb-12 border-t-4 border-[#009CDF]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Emergency Alert Banner */}
                <div className="bg-red-950/80 border border-red-800/80 p-4 rounded-2xl mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-red-200">
                    <div className="flex items-center gap-2.5">
                        <AlertTriangle className="h-5 w-5 text-red-400 shrink-0" />
                        <span>
                            <strong>Emergency Medical Guidance:</strong> If you or a loved one are experiencing severe hypoglycemia, loss of consciousness, or Diabetic Ketoacidosis (DKA), seek immediate emergency care.
                        </span>
                    </div>
                    <div className="flex items-center gap-3 font-bold shrink-0">
                        <a href="tel:108" className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
                            <Phone className="h-3.5 w-3.5" /> Dial 108 (Ambulance)
                        </a>
                        <a href="tel:112" className="bg-red-800 hover:bg-red-900 text-white px-3 py-1.5 rounded-lg transition-colors">
                            Dial 112 (National Emergency)
                        </a>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 text-xs text-slate-400">
                    <div className="lg:col-span-2 space-y-4 pr-6">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-[#003E7E] rounded-lg flex items-center justify-center text-white font-black">
                                <Activity className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-black text-white tracking-tight">Insulin<span className="text-[#009CDF]">Inside</span></span>
                        </div>
                        <p className="leading-relaxed">
                            Insulin Inside is India&apos;s diabetes management companion and local pharmacy access platform. Launching with a controlled pilot in Hyderabad, Telangana, we empower independent retail chemists and help patients find verified, cold-chain assured medicines at transparent prices.
                        </p>
                        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px] pt-1">
                            <ShieldCheck className="h-4 w-4" /> Partner pharmacies verified via Telangana DCA ODLS
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">For Patients</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/dashboard" className="hover:text-white transition-colors">Diabetes Daily Tracker</Link></li>
                            <li><Link href="/marketplace" className="hover:text-white transition-colors">Find Medicine in Hyderabad</Link></li>
                            <li><Link href="/marketplace" className="hover:text-white transition-colors">Jan Aushadhi Generics</Link></li>
                            <li><Link href="/resources" className="hover:text-white transition-colors">Doctor Appointment Checklist</Link></li>
                            <li><Link href="/community" className="hover:text-white transition-colors">Peer Support Community</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">For Chemists</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/pharmacy-portal" className="hover:text-white transition-colors">Chemist Partner Portal</Link></li>
                            <li><Link href="/pharmacy-portal" className="hover:text-white transition-colors">Join Hyderabad Network</Link></li>
                            <li><Link href="/pharmacy-portal" className="hover:text-white transition-colors">Local Demand Radar</Link></li>
                            <li><Link href="/pharmacy-portal" className="hover:text-white transition-colors">Cold-Chain Guidelines</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Chemist Onboarding Help</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Trust &amp; Governance</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/about" className="hover:text-white transition-colors">Our Mission &amp; Ethics</Link></li>
                            <li><Link href="/library" className="hover:text-white transition-colors">Medically Reviewed Guides</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Grievance Officer</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">Privacy by Design</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">Terms of Platform Use</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-500 gap-2">
                    <p>© 2026 Insulin Inside. Hyderabad Pilot Edition. All Rights Reserved.</p>
                    <p className="flex items-center gap-1">
                        Made for Indian Diabetes Warriors &amp; Local Chemists with <Heart className="h-3 w-3 text-red-500 fill-red-500" />
                    </p>
                </div>
            </div>
        </footer>
    );
}
