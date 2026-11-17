"use client";
import Link from "next/link";
import { useState } from "react";
import { Activity, Search, Store, ShieldCheck, HeartPulse, PackageCheck, ArrowRight } from "lucide-react";
export default function Home() {
 const [q,setQ]=useState("");
 return <main className="min-h-screen bg-white text-slate-900">
  <div className="bg-[#003E7E] px-5 py-3 text-center text-xs font-semibold text-white">● Insulin Inside: Helping people manage diabetes and connecting communities with independent care suppliers <Link className="ml-2 underline" href="/partner-portal">For partners →</Link></div>
  <section className="relative overflow-hidden bg-gradient-to-br from-[#F0F7FF] via-white to-[#EAF6FF]">
   <div className="mx-auto grid min-h-[630px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-12">
    <div className="lg:col-span-7"><div className="inline-flex rounded-full bg-[#DCEBFF] px-4 py-2 text-xs font-black uppercase tracking-wider text-[#003E7E]">✦ Diabetes care, connected</div>
     <h1 className="mt-7 text-5xl font-black leading-[1.08] tracking-tight text-[#003E7E] sm:text-6xl lg:text-7xl">Your Diabetes.<br/><span className="text-[#009CDF]">One Place to Manage It.</span></h1>
     <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-600">Track glucose, insulin already taken and Indian meals in one place. Explore CGMs, cooling devices and essential supplies as we onboard and verify local partners.</p>
     <form onSubmit={e=>{e.preventDefault();location.href="/devices"+(q.trim()?"?q="+encodeURIComponent(q.trim()):"");}} className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
       <Search className="ml-3 shrink-0 text-[#009CDF]" size={20}/><label htmlFor="hero-device-search" className="sr-only">Search diabetes devices</label><input id="hero-device-search" className="min-w-0 flex-1 p-2 text-sm outline-none" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search CGMs, test strips, cooling cases…"/><button type="submit" className="rounded-xl bg-[#003E7E] px-5 py-3 text-xs font-bold text-white">Find Devices</button>
     </form>
     <div className="mt-8 flex flex-wrap gap-3"><Link href="/tracker" className="inline-flex items-center gap-2 rounded-2xl bg-[#003E7E] px-7 py-4 text-sm font-bold text-white shadow-lg"><Activity size={18}/> Start Tracking Free</Link><Link href="/partner-portal" className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#003E7E] bg-white px-6 py-4 text-sm font-bold text-[#003E7E]"><Store size={18}/> Become a Partner</Link></div>
     <div className="mt-8 flex flex-wrap gap-5 text-xs font-semibold text-slate-600"><span className="inline-flex items-center gap-1 text-emerald-700"><ShieldCheck size={15}/> Partner review required</span><span className="inline-flex items-center gap-1 text-cyan-700"><HeartPulse size={15}/> Personal care tracking</span><span className="inline-flex items-center gap-1 text-[#E31C79]"><PackageCheck size={15}/> Device-first pilot</span></div>
    </div>
    <div className="lg:col-span-5"><div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-2xl">
     <div className="flex items-center justify-between border-b pb-4"><b className="text-sm text-slate-900">Diabetes Devices & Care Hub</b><span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-[#003E7E]">Hyderabad pilot</span></div>
     <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5"><span className="rounded-lg bg-[#003E7E] px-3 py-1 text-xs font-bold text-white">CGM Sensors</span><h2 className="mt-3 text-xl font-black">Monitoring made easier</h2><p className="mt-2 text-sm leading-relaxed text-slate-600">Compare eligible products when reviewed partners publish verified prices and stock. No invented live inventory.</p><span className="mt-4 inline-flex rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800">Stock onboarding in progress</span></div>
     <div className="mt-4 rounded-2xl border border-sky-100 bg-sky-50 p-5"><h3 className="font-bold text-[#003E7E]">Cooling & Storage Suitability</h3><p className="mt-2 text-sm text-slate-600">Check manufacturer-specific conditions. Cooling wallets are not substitutes for validated refrigerated insulin storage.</p></div>
     <Link href="/devices" className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#003E7E] p-4 text-sm font-bold text-white">Explore Devices <ArrowRight size={17}/></Link>
    </div></div>
   </div>
  </section>
  <section className="mx-auto grid max-w-7xl gap-5 px-6 py-16 md:grid-cols-3">{[["Track your care","Record glucose, blood pressure, food carbohydrates and treatment already taken.","/tracker"],["Find essential devices","Compare CGMs, cooling hardware and diabetes supplies when local stock becomes verified.","/devices"],["Support local partners","Apply as an independent pharmacy or medical-device dealer for review.","/partner-portal"]].map(([title,desc,url])=><Link href={url} key={title} className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm transition hover:shadow-lg"><h2 className="text-lg font-extrabold text-[#003E7E]">{title}</h2><p className="mt-3 text-sm leading-relaxed text-slate-600">{desc}</p><span className="mt-4 inline-block text-xs font-bold text-[#009CDF]">Learn more →</span></Link>)}</section>
 </main>;
}
