"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Activity, Globe, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

export function MarketingHeader() {
    const { data: session } = useSession();
    const pathname = usePathname();

    if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/pharmacy-portal")) {
        return null;
    }

    return (
        <>
            {/* 1. TOP UTILITY BAR */}
            <div className="bg-white border-b border-slate-200 py-2 hidden lg:block">
                <div className="container mx-auto px-6 lg:px-8 flex justify-between items-center text-xs font-bold text-slate-600">
                    <div className="flex items-center gap-4 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1 text-emerald-700 font-bold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            India&apos;s Biggest Diabetes Platform
                        </span>
                        <span>•</span>
                        <span>Verified Chemist &amp; DCA Compliant Network</span>
                    </div>

                    <div className="flex gap-6 uppercase tracking-tight items-center">
                        <Link href="/about" className="hover:text-[#003E7E] transition-colors">Our Mission</Link>
                        <Link href="/library" className="hover:text-[#003E7E] transition-colors">Diabetes Guides</Link>
                        <Link href="/resources" className="hover:text-[#003E7E] transition-colors">Clinical Tools</Link>
                        <Link href="/contact" className="hover:text-[#003E7E] transition-colors">Help &amp; Grievance</Link>
                        <Link href="/pharmacy-portal" className="text-[#003E7E] hover:text-[#009CDF] transition-colors flex items-center gap-1">
                            <Store className="h-3.5 w-3.5" /> Chemist Portal
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex gap-1.5 items-center text-[#E31C79] cursor-pointer outline-none font-bold">
                                <Globe className="h-3.5 w-3.5" />
                                <span>Language (EN/TE/HI)</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48 p-2">
                                {["English", "తెలుగు (Telugu)", "हिंदी (Hindi)", "ಕನ್ನಡ (Kannada)", "தமிழ் (Tamil)", "मराठी (Marathi)"].map(lang => (
                                    <DropdownMenuItem
                                        key={lang}
                                        className="text-xs cursor-pointer hover:bg-blue-50 hover:text-[#003E7E]"
                                    >
                                        {lang}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* 2. MAIN HEADER */}
            <header className="bg-white py-4 px-6 lg:px-8 border-b-4 border-[#003E7E] sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="h-11 w-11 bg-[#003E7E] rounded-2xl flex items-center justify-center text-white font-black shadow-md">
                            <Activity className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-2xl font-black text-[#003E7E] tracking-tighter">Insulin<span className="text-[#009CDF]">Inside</span></span>
                            <span className="text-[10px] font-bold text-[#003E7E] uppercase tracking-wider mt-0.5">India&apos;s Biggest Diabetes Platform</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden xl:flex gap-7 font-bold text-slate-800 text-xs tracking-wide">
                        <Link href="/dashboard" className="hover:text-[#009CDF] py-2 transition-colors">MY TRACKER</Link>
                        <Link href="/marketplace" className="hover:text-[#009CDF] py-2 text-[#003E7E] font-black transition-colors flex items-center gap-1">
                            <Store className="h-3.5 w-3.5 text-[#E31C79]" /> FIND MEDICINE
                        </Link>
                        <Link href="/pharmacy-portal" className="hover:text-[#009CDF] py-2 transition-colors">FOR CHEMISTS</Link>
                        <Link href="/library" className="hover:text-[#009CDF] py-2 transition-colors">LIBRARY</Link>
                        <Link href="/resources" className="hover:text-[#009CDF] py-2 transition-colors">RESOURCES</Link>
                        <Link href="/community" className="hover:text-[#009CDF] py-2 transition-colors">COMMUNITY</Link>
                    </nav>

                    {/* CTAs / User Auth */}
                    <div className="flex items-center gap-3">
                        <Button className="hidden sm:flex rounded-xl border-2 border-[#003E7E] text-[#003E7E] bg-transparent hover:bg-blue-50 font-bold px-4 h-9 text-xs" asChild>
                            <Link href="/marketplace">Check Chemist Stock</Link>
                        </Button>

                        {session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={session.user?.image || ""} />
                                            <AvatarFallback className="bg-[#003E7E] text-white font-bold text-xs">
                                                {session.user?.name?.charAt(0) || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard">Dashboard</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/marketplace">Find Medicine</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button className="rounded-xl bg-[#003E7E] hover:bg-[#002a5e] text-white font-bold px-5 h-9 text-xs shadow-md" asChild>
                                <Link href="/dashboard">Open Tracker</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}
