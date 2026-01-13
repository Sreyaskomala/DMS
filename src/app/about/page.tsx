import { Button } from "@/components/ui/button";
import { Users, Target, Globe, Award } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* PROFESSIONAL HEADER (Simplified for Subpages) */}
            <header className="bg-white py-5 px-6 lg:px-8 border-b-4 border-[#003E7E] sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-black text-[#003E7E] tracking-tighter">Insulin<span className="text-[#009CDF]">Inside</span></span>
                    </Link>
                    <nav className="hidden md:flex gap-6 font-bold text-sm text-slate-600">
                        <Link href="/" className="hover:text-[#003E7E]">Home</Link>
                        <Link href="/about" className="text-[#003E7E]">About Us</Link>
                        <Link href="/board" className="hover:text-[#003E7E]">Board</Link>
                        <Link href="/reports" className="hover:text-[#003E7E]">Reports</Link>
                    </nav>
                    <Button className="rounded-full bg-[#E31C79] hover:bg-[#c21565] text-white font-bold h-9 text-xs" asChild>
                        <Link href="/donate">Donate</Link>
                    </Button>
                </div>
            </header>

            {/* HERO */}
            <section className="bg-[#003E7E] text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container px-6 relative z-10 text-center max-w-3xl mx-auto space-y-6">
                    <Badge className="bg-[#009CDF] text-white hover:bg-[#007bb5] border-none px-4 py-1.5 text-xs font-bold uppercase tracking-wider">Since 2026</Badge>
                    <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-tight">Empowering the Diabetes Community</h1>
                    <p className="text-xl text-blue-100 leading-relaxed font-medium">Insulin Inside is a non-profit organization dedicated to improving the lives of people with diabetes through advocacy, education, and support.</p>
                </div>
            </section>

            {/* MISSION & VISION */}
            <section className="py-24 bg-white">
                <div className="container px-6 grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            className="rounded-3xl shadow-2xl border-8 border-slate-50"
                            alt="Team Meeting"
                        />
                    </div>
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-[#003E7E] font-bold text-sm uppercase tracking-wider">
                                <Target className="h-5 w-5" /> Our Mission
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900">To promote diabetes care <br /> and prevention worldwide.</h2>
                            <p className="text-slate-600 leading-relaxed">We strive to ensure that every person with diabetes has affordable access to medication, education, and care.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-[#E31C79] font-bold text-sm uppercase tracking-wider">
                                <Globe className="h-5 w-5" /> Our Vision
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900">A world without <br /> diabetes complications.</h2>
                            <p className="text-slate-600 leading-relaxed">We envision a future where diabetes is managed effectively, preventing complications and ensuring a high quality of life for all.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="bg-slate-50 py-20 border-y border-slate-200">
                <div className="container px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { label: "Members", value: "1.2M+" },
                        { label: "Countries", value: "18" },
                        { label: "Resources", value: "500+" },
                        { label: "Partners", value: "45" }
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="text-4xl lg:text-5xl font-black text-[#003E7E] mb-2">{stat.value}</div>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* LEADERSHIP GRID */}
            <section className="py-24 bg-white">
                <div className="container px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl font-bold text-[#003E7E]">Our Leadership</h2>
                        <p className="text-slate-600">Guided by world-class experts in endocrinology and public health.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Dr. Aditi Sharma", role: "President", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80" },
                            { name: "Rajesh Kumar", role: "Executive Director", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80" },
                            { name: "Sarah Jenkins", role: "Global Advocacy", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80" }
                        ].map((leader, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-slate-100 group-hover:border-[#009CDF] transition-colors">
                                    <img src={leader.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={leader.name} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">{leader.name}</h3>
                                <p className="text-[#009CDF] font-medium">{leader.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    )
}
