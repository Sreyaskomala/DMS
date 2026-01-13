"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { Activity, Search, Globe, LogIn, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { usePathname } from "next/navigation"

export function MarketingHeader() {
    const { data: session } = useSession()
    const pathname = usePathname()

    if (pathname?.startsWith("/dashboard")) {
        return null
    }

    return (
        <>
            {/* 1. TOP UTILITY BAR */}
            <div className="bg-white border-b border-slate-200 py-2 hidden lg:block">
                <div className="container mx-auto px-6 lg:px-8 flex justify-end gap-6 text-xs font-bold text-slate-600 uppercase tracking-tight">
                    <Link href="/about" className="hover:text-[#003E7E] transition-colors">Who we are</Link>
                    <Link href="/contact" className="hover:text-[#003E7E] transition-colors">Our Network</Link>
                    <Link href="/library" className="hover:text-[#003E7E] transition-colors">Diabetes Library</Link>
                    <Link href="/contact" className="hover:text-[#003E7E] transition-colors">Contact</Link>
                    <div className="flex gap-2 items-center text-[#003E7E] border-l pl-6 border-slate-300">
                        <Search className="h-3.5 w-3.5" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none w-20 text-xs placeholder:text-slate-400 focus:w-32 transition-all"
                        />
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex gap-2 items-center text-[#E31C79] cursor-pointer outline-none">
                            <Globe className="h-3.5 w-3.5" />
                            <span>Select Language</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto grid grid-cols-2 gap-1 p-2">
                            {["English", "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu", "Gujarati", "Kannada", "Odia", "Malayalam", "Punjabi", "Assamese", "Maithili", "Santali", "Kashmiri", "Nepali", "Konkani", "Sindhi", "Dogri", "Manipuri", "Sanskrit"].map(lang => <DropdownMenuItem
                                key={lang}
                                className="text-[10px] cursor-pointer hover:bg-[#E31C79] hover:text-white"
                                onClick={() => {
                                    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
                                    if (select) {
                                        select.value = lang;
                                        select.dispatchEvent(new Event('change'));
                                    }
                                }}
                            >
                                {lang}
                            </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* 2. MAIN HEADER */}
            <header className="bg-white py-5 px-6 lg:px-8 border-b-[6px] border-[#003E7E] sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-4">
                        {/* Logo Mark */}
                        <div className="h-12 w-12 bg-[#003E7E] rounded-tr-3xl rounded-bl-3xl flex items-center justify-center text-white">
                            <Activity className="h-7 w-7" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-2xl font-black text-[#003E7E] tracking-tighter">Insulin<span className="text-[#009CDF]">Inside</span></span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">India's Biggest Community</span>
                        </div>
                    </Link>

                    {/* Desktop Nav - Centered & Responsive */}
                    <nav className="hidden xl:flex gap-8 font-bold text-slate-800 text-sm tracking-tight">
                        <Link href="/dashboard" className="hover:text-[#009CDF] py-2 border-b-2 border-transparent hover:border-[#009CDF] transition-all">MY TRACKER</Link>
                        <Link href="/marketplace" className="hover:text-[#009CDF] py-2 border-b-2 border-transparent hover:border-[#009CDF] transition-all">MARKETPLACE</Link>
                        <Link href="/library" className="hover:text-[#009CDF] py-2 border-b-2 border-transparent hover:border-[#009CDF] transition-all">LIBRARY</Link>
                        <Link href="/resources" className="hover:text-[#009CDF] py-2 border-b-2 border-transparent hover:border-[#009CDF] transition-all">RESOURCES</Link>
                        <Link href="/community" className="hover:text-[#009CDF] py-2 border-b-2 border-transparent hover:border-[#009CDF] transition-all">COMMUNITY</Link>
                    </nav>

                    {/* CTAs / User Auth */}
                    <div className="hidden sm:flex items-center gap-3">
                        <Button className="hidden lg:flex rounded-full border-2 border-[#003E7E] text-[#003E7E] bg-transparent hover:bg-blue-50 font-extrabold px-6 h-10 text-xs uppercase tracking-wide" asChild>
                            <Link href="/contact">Partner With Us</Link>
                        </Button>

                        {session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                        <Avatar>
                                            <AvatarImage src={session.user?.image || ""} />
                                            <AvatarFallback className="bg-[#E31C79] text-white font-bold">
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
                                        <Link href="/dashboard/settings">Settings</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button className="rounded-full bg-[#E31C79] hover:bg-[#c21565] text-white font-extrabold px-6 h-10 text-xs uppercase tracking-wide shadow-lg hover:shadow-xl transition-all" asChild>
                                <Link href="/login">Join Community</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </header>
        </>
    )
}
