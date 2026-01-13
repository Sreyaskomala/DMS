import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Activity, BookOpen, Globe, Heart, Megaphone, Search, ChevronRight,
  Users, Calendar, PlayCircle, ArrowUpRight, FileText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IndiaMapSection } from "@/components/india-map-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans">

      <main className="flex-1">

        {/* 3. HERO SECTION - Overlapping Blue Gradient */}
        <section className="relative bg-gradient-to-br from-[#F0F7FF] via-white to-white min-h-[600px] flex items-center overflow-hidden pb-32">
          {/* Background Abstract Shape */}
          <div className="absolute top-0 right-0 w-[60%] h-full bg-[#EAF6FF] rounded-bl-[200px] z-0 opacity-50 hidden lg:block"></div>

          <div className="container mx-auto px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center py-20">
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#003E7E] text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#009CDF] animate-pulse"></span>
                Trusted by 1 Million+ Indians
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-[#003E7E] leading-[1.05]">
                Uniting <span className="text-[#009CDF]">India</span> <br />
                to fight diabetes.
              </h1>
              <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
                We are a national network of patients, doctors, and caregivers. Get access to affordable medication, smart tracking, and expert care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="rounded-full bg-[#003E7E] hover:bg-[#002a5e] h-14 px-10 text-base font-bold shadow-xl shadow-blue-900/10" asChild>
                  <Link href="/dashboard">Start Your Journey</Link>
                </Button>
                <Button size="lg" variant="ghost" className="rounded-full text-[#003E7E] font-bold hover:bg-blue-50 h-14 px-8 flex gap-2 border-2 border-transparent hover:border-blue-100">
                  Download Annual Report <ArrowUpRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right duration-700 delay-200">
              {/* Circular image mask effect characteristic of IDF */}
              <div className="relative z-10 w-full aspect-square max-w-md mx-auto lg:max-w-full rounded-full border-[16px] border-white shadow-2xl overflow-hidden bg-slate-200">
                <img
                  src="/hero-generated.png"
                  className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
                  alt="Compassionate Diabetes Care in India"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute top-10 right-10 z-20 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-bounce duration-[3000ms]">
                <Heart className="h-6 w-6 text-red-500 fill-red-500" />
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Lives Impacted</p>
                  <p className="text-xl font-black text-[#003E7E]">1,240,593</p>
                </div>
              </div>
            </div>
          </div>

          {/* Blue Banner Strip */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#003E7E] flex items-center justify-center text-white z-20">
            <div className="container mx-auto flex justify-between items-center text-xs sm:text-sm font-bold tracking-widest uppercase opacity-80 px-6">
              <span className="hidden sm:inline">Advocacy • Action • Awareness</span>
              <span className="flex items-center gap-2"> The Voice of Diabetes in India <Globe className="h-4 w-4" /></span>
              <span className="hidden sm:inline">Est. 2026</span>
            </div>
          </div>
        </section>

        {/* 4. THREE PILLARS - Cards overlapping */}
        {/* Adjusted to remove negative margin overlap that was covering text */}
        <section className="bg-slate-50 relative pb-24 pt-16">
          <div className="container mx-auto px-6 relative z-30 grid md:grid-cols-3 gap-8 text-left">
            {[
              { icon: <Users className="h-8 w-8" />, title: "Community", text: "Join support groups in your city and share your lived experience.", color: "text-[#009CDF]", bg: "bg-blue-50" },
              { icon: <Activity className="h-8 w-8" />, title: "Management", text: "World-class tools to track glucose, insulin, and diet patterns.", color: "text-[#E31C79]", bg: "bg-pink-50" },
              { icon: <BookOpen className="h-8 w-8" />, title: "Education", text: "Certified courses on carb counting and diabetes management.", color: "text-[#FDB913]", bg: "bg-yellow-50" }
            ].map((item, i) => (
              <div key={i} className="group bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-10 -mt-10 transition-colors group-hover:bg-slate-100"></div>
                <div className={`relative w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-6 ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="relative text-2xl font-bold text-[#003E7E] mb-3 group-hover:text-[#009CDF] transition-colors">{item.title}</h3>
                <p className="relative text-slate-600 leading-relaxed font-medium">{item.text}</p>
                <div className="relative mt-6 flex items-center text-sm font-bold text-[#003E7E] group-hover:gap-2 transition-all cursor-pointer">
                  Learn More <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            ))}
          </div>

          {/* 5. INDIA MAP ATLAS */}
          <IndiaMapSection />

          {/* 6. IN FOCUS - Featured Report */}
          <div className="container mx-auto px-6 mt-12 bg-white">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-bold text-[#003E7E]">In Focus</h2>
              <div className="h-1 flex-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-1/6 h-full bg-[#E31C79]"></div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl bg-white">
              <div className="p-12 lg:p-16 flex flex-col justify-center items-start space-y-8">
                <Badge className="bg-[#E31C79] hover:bg-[#c21565] text-white border-none rounded-md px-4 py-1.5 text-xs font-bold tracking-wider">NEW RESEARCH</Badge>
                <h3 className="text-4xl lg:text-5xl font-bold text-[#003E7E] leading-tight">
                  Indian Diabetes <br /> Atlas 2026
                </h3>
                <p className="text-slate-600 text-lg font-medium leading-relaxed">
                  New data reveals the impact of urbanization on diabetes rates in India. Download the full report to understand the regional breakdown.
                </p>
                <div className="flex gap-4 w-full sm:w-auto">
                  <Button className="flex-1 sm:flex-none rounded-full bg-[#003E7E] hover:bg-[#002a5e] h-12 px-8 font-bold">Download PDF</Button>
                  <Button variant="outline" className="flex-1 sm:flex-none rounded-full border-[#003E7E] text-[#003E7E] h-12 px-8 font-bold hover:bg-blue-50">View Interactive Map</Button>
                </div>
              </div>
              <div className="bg-slate-200 min-h-[400px] relative">
                <img src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover" alt="Report Cover" />
                <div className="absolute inset-0 bg-[#003E7E]/10 mix-blend-multiply"></div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. LATEST RESOURCES GRID */}
        <section className="py-24 bg-white">
          <div className="container px-6">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-[#003E7E] mb-2">Latest Resources</h2>
                <p className="text-slate-500 font-medium">Tools and guides for better management</p>
              </div>
              <Button variant="link" className="text-[#009CDF] font-bold">View All Resources</Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { tag: "Guide", title: "Indian Carb Exchange List", img: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=500&q=80" },
                { tag: "Tool", title: "Insulin Dose Calculator", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80" },
                { tag: "Video", title: "Yoga for Glycemic Control", img: "https://images.unsplash.com/photo-1544367563-12123d896889?auto=format&fit=crop&w=500&q=80" },
                { tag: "Event", title: "National Diabetes Summit", img: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=500&q=80" }
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 scroll-pl-6">
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#003E7E] text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wide">
                      {item.tag}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-[#009CDF] transition-colors">
                    {item.title}
                  </h3>
                  <div className="mt-2 w-8 h-1 bg-slate-200 group-hover:bg-[#E31C79] transition-colors rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. CTA STRIP - "Join the Community" */}
        <section className="py-20 bg-[#003E7E] text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-6 relative z-10 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight">Ready to take control?</h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Join India's largest digital health platform today. Verified by doctors, loved by patients.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-[#E31C79] hover:bg-[#c21565] rounded-full h-14 px-10 text-lg font-bold shadow-xl" asChild>
                <Link href="/dashboard">Create Free Account</Link>
              </Button>
            </div>
            <p className="text-xs text-blue-300 font-medium opacity-70 mt-6">
              *Always consult your physician before changing medication.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
