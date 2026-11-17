"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Menu, Store } from "lucide-react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
export function MarketingHeader() {
  const path = usePathname();
  const [open,setOpen] = useState(false);
  const {data:session}=useSession();
  const links=[["Tracker","/tracker"],["Devices","/devices"],["For Chemists","/partner-portal"],["Library","/library"],["Resources","/resources"],["About","/about"],["Help","/contact"]];
  if (path?.startsWith("/login")) return null;
  return <header className="sticky top-0 z-50 bg-white shadow-sm">
    <div className="hidden border-b border-slate-100 py-2 lg:block"><div className="mx-auto flex max-w-7xl justify-between px-6 text-xs font-semibold">
      <span className="text-[#008B65]">● Building a neighbourhood diabetes-care network</span>
      <span className="text-slate-500">Hyderabad pilot · Partner verification in progress</span>
    </div></div>
    <div className="border-b-4 border-[#003E7E]"><div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4">
      <Link href="/" className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#003E7E] text-white"><Activity size={25}/></span><span className="text-xl font-black tracking-tight text-[#003E7E] sm:text-2xl">Insulin<span className="text-[#009CDF]">Inside</span><small className="block text-[9px] font-bold uppercase tracking-wider">Your diabetes care companion</small></span></Link>
      <nav className="hidden items-center gap-5 xl:flex">{links.map(([title,url])=><Link key={url} href={url} className="text-xs font-bold uppercase text-slate-700 hover:text-[#009CDF]">{title}</Link>)}</nav>
      <div className="hidden items-center gap-3 md:flex"><Link href="/devices" className="rounded-xl border-2 border-[#003E7E] px-4 py-2 text-xs font-bold text-[#003E7E] hover:bg-sky-50"><Store size={13} className="mr-1 inline"/> Explore Devices</Link>
        {session?<button onClick={()=>void signOut()} className="rounded-xl bg-[#003E7E] px-4 py-2.5 text-xs font-bold text-white">Sign out</button>:<Link href="/login" className="rounded-xl bg-[#003E7E] px-4 py-2.5 text-xs font-bold text-white">Sign in / Tracker</Link>}</div>
      <button aria-label="Toggle navigation" aria-expanded={open} onClick={()=>setOpen(!open)} className="rounded-xl border p-2 xl:hidden"><Menu size={22}/></button>
    </div></div>
    {open&&<nav className="flex flex-col border-t bg-white p-4 xl:hidden">{links.map(([title,url])=><Link onClick={()=>setOpen(false)} href={url} key={url} className="rounded-xl px-3 py-2 text-sm font-bold text-[#003E7E] hover:bg-blue-50">{title}</Link>)}<Link onClick={()=>setOpen(false)} href="/login" className="px-3 py-2 text-sm font-bold">Sign in</Link></nav>}
  </header>;
}
