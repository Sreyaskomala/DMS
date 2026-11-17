"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
type Offer = { id: string; product_name: string; category: string; brand: string; zone: string; city: string; price_inr: number; mrp_inr: number | null; wear_days: number | null; cooling_notes: string | null; availability: string };
export default function Devices() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Loading available devices…");
  useEffect(() => {
    fetch("/api/platform/offers").then(async r => {
      const body = await r.json();
      if (!r.ok) throw Error(body.error || "Unavailable");
      setOffers(body.offers || []);
      setStatus("No verified device offers are available yet. New partners must complete review before listings appear.");
    }).catch(() => setStatus("Live device inventory is not connected. No stock can be confirmed."));
  }, []);
  const filtered = offers.filter(o => (o.product_name + o.brand + o.category + o.zone).toLowerCase().includes(search.toLowerCase()));
  return <main className="min-h-screen bg-[#F2F8FF] px-5 py-12"><div className="mx-auto max-w-6xl">
    <p className="text-xs font-bold uppercase tracking-widest text-[#008B65]">Phase 1 · Diabetes devices</p>
    <h1 className="mt-3 text-4xl font-extrabold text-[#003E7E]">Find diabetes care essentials</h1>
    <p className="mt-3 max-w-2xl text-slate-600">Compare eligible CGMs, cooling equipment and consumables from reviewed local partners. Inventory is displayed only when independently confirmed.</p>
    <label className="mt-8 block max-w-xl"><span className="sr-only">Search devices</span><input className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm outline-[#009CDF]" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search CGM, needles, cooling wallet…" /></label>
    {filtered.length===0 ? <div className="mt-10 rounded-3xl border border-blue-100 bg-white p-10 text-slate-600">{status} <Link href="/partner-portal" className="ml-1 font-semibold text-[#003E7E] underline">Become a partner</Link></div> :
    <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map(o=><article key={o.id} className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
      <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-[#003E7E]">{o.category}</span><h2 className="mt-4 text-xl font-extrabold text-[#003E7E]">{o.product_name}</h2><p className="mt-1 text-sm text-slate-600">{o.brand}</p>
      <p className="mt-4 text-sm text-slate-500">{o.zone}, {o.city} · {o.availability}</p><div className="mt-4 text-2xl font-black text-[#008B65]">₹{o.price_inr.toLocaleString("en-IN")}</div>
      {o.cooling_notes && <p className="mt-3 text-xs text-slate-600">Suitability: {o.cooling_notes}</p>}
      <p className="mt-5 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">Orders are not yet enabled. Do not travel based on this listing without confirmed availability.</p>
    </article>)}</div>}
  </div></main>;
}
