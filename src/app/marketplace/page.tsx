"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
    Activity, Search, ShoppingCart, Star, Truck, ShieldCheck,
    Phone, Stethoscope, TestTube, Repeat, HeartPulse, Clock
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PRODUCTS } from "@/lib/marketplace-data"

export default function MarketplacePage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* 1. PROFESSIONAL HEADER */}
            <header className="bg-white border-b sticky top-0 z-50">
                {/* Top Utility */}
                <div className="bg-[#003E7E] text-white py-2 text-xs font-bold text-center tracking-wide">
                    FREE SHIPPING on orders above ₹999 | Use Code: <span className="text-[#009CDF]">INSULIN20</span> for 20% OFF
                </div>

                <div className="container px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-[#003E7E] rounded-md flex items-center justify-center text-white">
                                <Activity className="h-6 w-6" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-xl font-black text-[#003E7E] tracking-tight">Insulin<span className="text-[#009CDF]">Store</span></span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Supplies</span>
                            </div>
                        </Link>

                        {/* Mega Menu Links */}
                        <nav className="hidden lg:flex gap-6 text-sm font-bold text-slate-600">
                            <Link href="#" className="hover:text-[#003E7E]">Medicines</Link>
                            <Link href="#" className="hover:text-[#003E7E]">Devices</Link>
                            <Link href="#" className="hover:text-[#003E7E] text-[#009CDF]">Plans & Care</Link>
                            <Link href="#" className="hover:text-[#003E7E]">Lab Tests</Link>
                        </nav>
                    </div>

                    <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input placeholder="Search for 'Accu-Chek', 'Insulin', 'Doctor'..." className="pl-10 bg-slate-100 border-none focus-visible:ring-[#003E7E] rounded-full" />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative hover:bg-blue-50">
                            <ShoppingCart className="h-6 w-6 text-[#003E7E]" />
                            <span className="absolute -top-1 -right-1 h-5 w-5 bg-[#E31C79] text-white rounded-full text-[10px] font-bold flex items-center justify-center">2</span>
                        </Button>
                        <Button className="bg-[#003E7E] hover:bg-[#002a5e] font-bold rounded-full" asChild>
                            <Link href="/dashboard">My Prescription</Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="">

                {/* 2. CATEGORY NAV - Quickly navigate specialized needs */}
                <div className="bg-white border-b border-slate-200 py-4 shadow-sm">
                    <div className="container px-6 flex justify-between gap-4 overflow-x-auto no-scrollbar">
                        {[
                            { icon: <TestTube className="h-5 w-5" />, label: "Lab Tests" },
                            { icon: <Stethoscope className="h-5 w-5" />, label: "Consult Doctor" },
                            { icon: <Repeat className="h-5 w-5" />, label: "Subscriptions" },
                            { icon: <HeartPulse className="h-5 w-5" />, label: "Sugar Control" },
                            { icon: <Phone className="h-5 w-5" />, label: "Emergency" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 px-6 py-2 rounded-full border border-slate-200 hover:border-[#009CDF] hover:bg-blue-50 cursor-pointer transition-all whitespace-nowrap group">
                                <div className="text-slate-400 group-hover:text-[#003E7E]">{item.icon}</div>
                                <span className="font-bold text-slate-700 group-hover:text-[#003E7E]">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. HERO BANNER - Subscription Focus (High Relevance) */}
                <div className="container px-6 py-8">
                    <div className="rounded-3xl bg-[#003E7E] text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#009CDF] to-transparent opacity-80"></div>
                        <div className="relative z-10 grid lg:grid-cols-2 gap-8 p-12 items-center">
                            <div className="space-y-6">
                                <Badge className="bg-[#E31C79] hover:bg-[#c21565] border-none px-3 py-1 text-xs font-bold uppercase tracking-wider">Most Popular</Badge>
                                <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                                    Never run out of <br /> Test Strips again.
                                </h1>
                                <p className="text-blue-100 text-lg font-medium">
                                    Subscribe to our monthly "Sugar Smart" box. Includes strips, lancets, and a free doctor consultation every month.
                                </p>
                                <div className="flex gap-4 pt-2">
                                    <Button className="bg-white text-[#003E7E] hover:bg-blue-50 rounded-full h-12 px-8 font-bold">Start Subscription</Button>
                                    <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-full h-12 px-8 font-bold">View Plans</Button>
                                </div>
                            </div>
                            <div className="hidden lg:block relative h-64">
                                <img
                                    src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=800&q=80"
                                    className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 object-cover rounded-2xl shadow-2xl rotate-3 border-4 border-white"
                                    alt="Subscription Box"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST PILLARS - Critical for Health Marketplaces */}
                <div className="container px-6 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: <ShieldCheck className="h-6 w-6" />, title: "100% Genuine", desc: "Sourced directly from manufacturers" },
                            { icon: <Truck className="h-6 w-6" />, title: "Cold Chain", desc: "Insulin delivered at right temperature" },
                            { icon: <Clock className="h-6 w-6" />, title: "24h Delivery", desc: "Available in Top 20 Metro cities" },
                            { icon: <Stethoscope className="h-6 w-6" />, title: "Expert Support", desc: "Chat with a pharmacist anytime" },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center gap-2 hover:shadow-md transition-shadow">
                                <div className="p-2 bg-blue-50 text-[#003E7E] rounded-full">{item.icon}</div>
                                <h3 className="font-bold text-sm text-[#003E7E]">{item.title}</h3>
                                <p className="text-xs text-slate-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. PRODUCT GRID - Essentials */}
                <div className="container px-6 py-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-[#003E7E]">Daily Essentials</h2>
                        <Link href="#" className="text-sm font-bold text-[#009CDF] hover:underline">View All Products</Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {PRODUCTS.map((product) => (
                            <Card key={product.id} className="group overflow-hidden border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl">
                                <div className="aspect-square relative bg-white p-6 flex items-center justify-center border-b border-slate-50">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "https://placehold.co/400?text=Product";
                                        }}
                                    />
                                    {product.originalPrice > product.price && (
                                        <div className="absolute top-3 left-3 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                        </div>
                                    )}
                                </div>
                                <CardContent className="p-5">
                                    <div className="text-[10px] font-bold text-[#009CDF] uppercase tracking-wide mb-2">{product.category}</div>
                                    <h3 className="font-bold text-slate-800 line-clamp-2 mb-2 group-hover:text-[#003E7E] transition-colors h-12">{product.name}</h3>
                                    <div className="flex items-center gap-1 mb-3">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <Star key={s} className={`h-3 w-3 ${s <= Math.round(product.rating) ? "fill-orange-400 text-orange-400" : "text-slate-200"}`} />
                                            ))}
                                        </div>
                                        <span className="text-xs text-slate-400">({product.reviews})</span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-black text-[#003E7E]">₹{product.price}</span>
                                        <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-5 pt-0">
                                    <Button className="w-full bg-white text-[#003E7E] border-2 border-[#003E7E] hover:bg-[#003E7E] hover:text-white font-bold rounded-xl transition-all h-10">
                                        Add to Cart
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* 6. CARE PACKAGES - Relevant to Community */}
                <div className="bg-[#EAF6FF] py-16 mt-8">
                    <div className="container px-6">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-3xl font-bold text-[#003E7E] mb-4">Complete Care Plans</h2>
                            <p className="text-slate-600">
                                Managing diabetes is easier with a team. Get a personal coach, nutritionist, and doctor on your side.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { name: "Starter", price: "₹499/mo", color: "bg-white", features: ["App Access", "Glucose Tracking", "Monthly Report"] },
                                { name: "Pro Care", price: "₹1,499/mo", color: "bg-[#003E7E] text-white", features: ["Everything in Starter", "2 Doctor Consults", "Diet Plan", "Unlimited Coach Chat"], popular: true },
                                { name: "Family", price: "₹2,499/mo", color: "bg-white", features: ["For 4 Family Members", "Shared Reports", "Priority Support"] }
                            ].map((plan, i) => (
                                <div key={i} className={`rounded-3xl p-8 shadow-xl ${plan.color} relative ${plan.popular ? 'transform scale-105 border-4 border-[#009CDF]' : ''}`}>
                                    {plan.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#009CDF] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Most Popular</div>}
                                    <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-[#003E7E]'}`}>{plan.name}</h3>
                                    <div className="text-3xl font-black mb-6">{plan.price}</div>
                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((f, j) => (
                                            <li key={j} className="flex items-center gap-3 text-sm font-medium opacity-90">
                                                <div className={`p-1 rounded-full ${plan.popular ? 'bg-white/20' : 'bg-blue-100'}`}>
                                                    <ShieldCheck className="h-3 w-3" />
                                                </div>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button className={`w-full h-12 rounded-xl font-bold ${plan.popular ? 'bg-white text-[#003E7E] hover:bg-blue-50' : 'bg-[#003E7E] text-white hover:bg-[#002a5e]'}`}>
                                        Choose {plan.name}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}
