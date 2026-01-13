import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Search, BookOpen, Clock, Tag } from "lucide-react";

const ARTICLES = [
    { title: "Understanding Insulin Types", category: "Basics", readTime: "5 min", img: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=500&q=80" },
    { title: "Carb Counting 101: A Beginner's Guide", category: "Nutrition", readTime: "8 min", img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=500&q=80" },
    { title: "Managing Blood Sugar During Exercise", category: "Lifestyle", readTime: "6 min", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80" },
    { title: "Travel Tips with Type 1 Diabetes", category: "Travel", readTime: "4 min", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=500&q=80" },
    { title: "Mental Health and Chronic Illness", category: "Wellness", readTime: "7 min", img: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&w=500&q=80" },
    { title: "New Technologies in Diabetes Care", category: "Innovation", readTime: "5 min", img: "https://images.unsplash.com/photo-1576091160550-2187580023f7?auto=format&fit=crop&w=500&q=80" },
];

export default function LibraryPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            <header className="bg-[#003E7E] text-white py-12">
                <div className="container px-6 text-center space-y-6">
                    <h1 className="text-4xl font-black">Diabetes Library</h1>
                    <p className="text-blue-100 max-w-2xl mx-auto text-lg">Expert-reviewed articles, guides, and latest research to help you manage your condition effectively.</p>
                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                        <Input placeholder="Search articles..." className="pl-12 h-12 rounded-full text-slate-900 border-none shadow-lg" />
                    </div>
                </div>
            </header>

            <div className="container px-6 py-12">
                {/* FILTERS */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {["All", "Basics", "Nutrition", "Lifestyle", "Research", "Kids & Teens"].map((filter, i) => (
                        <Button key={i} variant={i === 0 ? "default" : "outline"} className={`rounded-full ${i === 0 ? "bg-[#003E7E] hover:bg-[#002a5e]" : "text-slate-600 border-slate-300"}`}>
                            {filter}
                        </Button>
                    ))}
                </div>

                {/* GRID */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ARTICLES.map((article, i) => (
                        <div key={i} className="group cursor-pointer flex flex-col h-full border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="relative h-56 overflow-hidden">
                                <img src={article.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={article.title} />
                                <Badge className="absolute top-4 left-4 bg-white/90 text-[#003E7E] hover:bg-white backdrop-blur font-bold px-3 py-1">
                                    {article.category}
                                </Badge>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#009CDF] transition-colors">{article.title}</h3>
                                <div className="mt-auto flex items-center gap-4 text-xs text-slate-500 font-medium pt-4 border-t border-slate-50">
                                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {article.readTime} read</span>
                                    <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> Guide</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button variant="outline" className="border-[#003E7E] text-[#003E7E] rounded-full px-8 hover:bg-blue-50 font-bold">Load More Articles</Button>
                </div>
            </div>
        </div>
    )
}
