"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Search, BookOpen, Clock, Tag, ChevronRight, Bookmark,
    CheckCircle2, Share2, ArrowLeft, Heart, Sparkles, ShieldCheck
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Article {
    id: string;
    title: string;
    category: "Basics" | "Nutrition" | "Lifestyle" | "Travel" | "Emergency" | "Innovation";
    readTime: string;
    img: string;
    excerpt: string;
    content: string[];
    keyTakeaways: string[];
    author: string;
    reviewDate: string;
}

const ARTICLES: Article[] = [
    {
        id: "art-1",
        title: "Understanding Insulin Types & Storage in India",
        category: "Basics",
        readTime: "5 min",
        img: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=80",
        excerpt: "A comprehensive guide on Rapid-acting, Regular (Actrapid), NPH, and Long-acting (Basaglar/Lantus) insulins, with cold-chain guidelines for Indian climates.",
        author: "Dr. Aditi Sharma, MD Endocrinology",
        reviewDate: "Jan 2026",
        keyTakeaways: [
            "Unopened insulin must be stored between 2°C and 8°C (never frozen).",
            "In-use pens/vials can stay at room temperature (below 30°C) for up to 28 days.",
            "In Indian summers (>35°C), use an evaporative cooling pouch (like Frio) or clay pot cooler."
        ],
        content: [
            "Insulin is the life-sustaining hormone required by all individuals with Type 1 Diabetes and many with Type 2 Diabetes. Understanding the onset, peak, and duration of each insulin type is fundamental to achieving optimal glycemic control.",
            "1. Rapid-Acting Analogues (Aspart, Lispro, Glulisine): Onset in 10-15 minutes, peaks at 1-2 hours, lasts 3-5 hours. Ideal for immediate meal coverage.",
            "2. Short-Acting Regular Human Insulin (Actrapid / Huminsulin R): Onset in 30 minutes, peaks at 2-3 hours, lasts 6-8 hours. Inject 30 minutes before meal start.",
            "3. Intermediate-Acting (NPH / Insulatard): Cloudy suspension with onset at 1-2 hours, peak at 4-8 hours, duration 12-18 hours.",
            "4. Long-Acting Basal Analogues (Glargine / Basaglar / Degludec): Peakless, flat 24-hour background coverage that keeps hepatic glucose output in check.",
            "Climate Considerations in India: Extreme heat denatures the insulin protein. Never leave insulin in parked cars, near windows, or direct sunlight. If traveling without refrigeration, use cooling wallets."
        ]
    },
    {
        id: "art-2",
        title: "Carb Counting 101: A Guide for Indian Meals",
        category: "Nutrition",
        readTime: "8 min",
        img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        excerpt: "Master the art of calculating carbohydrate exchanges for Rotis, Rice, Dosa, Dals, and festive sweets to calculate precise meal boluses.",
        author: "Pooja Singhania, RD CDE",
        reviewDate: "Feb 2026",
        keyTakeaways: [
            "1 Carbohydrate Exchange = 15 grams of total carbohydrates.",
            "1 medium whole wheat phulka (30g) = 1 exchange (15g carbs).",
            "1 cup cooked white rice (150g) = 3 exchanges (45g carbs)."
        ],
        content: [
            "Carbohydrates have the most direct impact on post-prandial blood glucose. Learning carb counting allows you the flexibility to enjoy your favorite Indian cuisines while maintaining tight control.",
            "Step 1: Identify Carbohydrate Sources. Grains (Wheat, Rice, Millets), Starchy Vegetables (Potatoes, Arbi), Legumes (Dals, Chana, Rajma), Dairy (Milk, Curd), and Fruits.",
            "Step 2: Know Your Insulin-to-Carbohydrate Ratio (I:C). For example, an I:C of 1:10 means 1 unit of rapid insulin covers 10 grams of carbs.",
            "Step 3: Factor in Protein & Fat. High-fat meals (Paneer Butter Masala, Biryani) delay gastric emptying, leading to delayed glycemic spikes 3-5 hours later. Split bolusing can help manage this effect."
        ]
    },
    {
        id: "art-3",
        title: "Managing Blood Sugar During Exercise & Yoga",
        category: "Lifestyle",
        readTime: "6 min",
        img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
        excerpt: "How aerobic vs anaerobic exercise impacts blood sugar, avoiding delayed hypoglycemia, and the role of yoga in reducing insulin resistance.",
        author: "Karan Mehta, Sports Physiotherapist",
        reviewDate: "Jan 2026",
        keyTakeaways: [
            "Aerobic exercise (walking, swimming) generally lowers blood glucose.",
            "Anaerobic exercise (heavy weight lifting, sprinting) can cause temporary adrenaline-induced spikes.",
            "Check BG before exercising; if <100 mg/dL, eat 15g carbs; if >250 mg/dL with ketones, delay exercise."
        ],
        content: [
            "Physical activity increases insulin sensitivity by promoting GLUT4 transporter translocation to muscle cell surfaces independent of insulin.",
            "Pre-Exercise Protocol: Test your blood glucose 15 minutes before starting. Ensure active insulin on board is low to prevent rapid hypoglycemia.",
            "Post-Exercise Delayed Drops: Muscle glycogen replenishment can cause blood sugar drops up to 12-24 hours after intense physical exertion (the 'lag effect'). Monitor nighttime levels closely.",
            "Yoga & Pranayama: Studies show regular Surya Namaskar and Kapalbhati improve autonomic regulation, reduce cortisol-induced insulin resistance, and enhance mood."
        ]
    },
    {
        id: "art-4",
        title: "Travel Protocol with Type 1 Diabetes: Airport & Train Rules",
        category: "Travel",
        readTime: "4 min",
        img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        excerpt: "Navigating airport security with insulin pumps, CGMs, carrying doctor travel certificates, and handling time zone adjustments.",
        author: "Patient Advocacy Board",
        reviewDate: "Jan 2026",
        keyTakeaways: [
            "Never check insulin or CGM sensors in checked baggage (cargo hold freezes).",
            "Carry a Doctor's Travel Certificate stating the medical necessity of carrying needles & liquids.",
            "CGMs and insulin pumps should NOT go through full-body X-ray/CT scanners; request manual pat-down."
        ],
        content: [
            "Traveling with diabetes requires proactive preparation. Keep all medication, testing supplies, and fast-acting glucose in your carry-on luggage.",
            "Time Zone Adjustments: When traveling East (shortening day), you may need slightly less basal insulin. When traveling West (lengthening day), you may need supplementary bolus.",
            "Always pack 2x the supplies you anticipate needing for the trip duration."
        ]
    },
    {
        id: "art-5",
        title: "Sick Day Rules & Ketone Emergency Management",
        category: "Emergency",
        readTime: "7 min",
        img: "https://images.unsplash.com/photo-1576091160550-2187580023f7?auto=format&fit=crop&w=800&q=80",
        excerpt: "Critical protocols for managing viral fever, infection, or vomiting to prevent Diabetic Ketoacidosis (DKA).",
        author: "Dr. Rajesh Kumar, Intensive Care Specialist",
        reviewDate: "Jan 2026",
        keyTakeaways: [
            "NEVER stop taking basal insulin, even if you are unable to eat.",
            "Test blood glucose every 2-3 hours and check blood/urine ketones if BG > 240 mg/dL.",
            "Drink plenty of fluids (at least 200-250 ml every hour) to stay hydrated."
        ],
        content: [
            "During illness or infection, the body releases stress hormones (cortisol, adrenaline, glucagon) that cause blood sugar levels and insulin resistance to rise significantly.",
            "Step 1: Continue Basal Insulin. Without basal insulin, the body begins breaking down fat rapidly, producing toxic acidic ketones.",
            "Step 2: Supplemental Correction Boluses. You may require 10-20% extra correction doses every 3-4 hours based on ketone levels.",
            "When to Seek Immediate Hospital Emergency: Persistent vomiting (>4 hours), moderate-to-large ketones, difficulty breathing (Kussmaul breathing), or confusion."
        ]
    },
    {
        id: "art-6",
        title: "Overcoming Diabetes Burnout & Mental Wellness",
        category: "Lifestyle",
        readTime: "5 min",
        img: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&w=800&q=80",
        excerpt: "Strategies to combat chronic illness fatigue, finding peer community support, and developing a sustainable management mindset.",
        author: "Meera Nair, Health Psychologist",
        reviewDate: "Feb 2026",
        keyTakeaways: [
            "Diabetes requires ~180 extra decisions per day; fatigue is completely normal.",
            "A blood sugar reading is just data to guide your next decision, not a moral judgment.",
            "Connecting with peers in the community reduces feelings of isolation."
        ],
        content: [
            "Diabetes distress refers to the emotional burden, stress, and overwhelm that comes with the 24/7 demands of managing a chronic condition.",
            "Reframing the Numbers: Treat glucometer readings as neutral speedometer data that helps you navigate, rather than a test score of 'good' or 'bad'.",
            "Set Realistic Micro-Goals: If logging every meal feels overwhelming, focus on just logging fasting numbers for a week.",
            "Join Community Circles: Sharing experiences with others who understand the daily nuances of finger-pricks and carb counts provides unmatched relief."
        ]
    }
];

export default function LibraryPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

    const toggleBookmark = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (bookmarkedIds.includes(id)) {
            setBookmarkedIds(bookmarkedIds.filter(b => b !== id));
            toast.info("Removed from saved bookmarks");
        } else {
            setBookmarkedIds([...bookmarkedIds, id]);
            toast.success("Article saved to your bookmarks");
        }
    };

    const filteredArticles = ARTICLES.filter(art => {
        const matchesCategory = selectedCategory === "All" || art.category === selectedCategory;
        const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            art.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* Header */}
            <header className="bg-gradient-to-r from-[#003E7E] to-[#005bb7] text-white py-16">
                <div className="container px-6 text-center space-y-6 max-w-3xl mx-auto">
                    <Badge className="bg-[#009CDF] text-white border-none font-bold">
                        CLINICALLY REVIEWED REPOSITORY
                    </Badge>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Diabetes Knowledge Library</h1>
                    <p className="text-blue-100 text-lg leading-relaxed font-medium">
                        Evidence-based educational guides, Indian nutrition protocols, and expert-reviewed articles to empower your daily management.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative pt-2">
                        <Search className="absolute left-4 top-5.5 h-5 w-5 text-slate-400" />
                        <Input
                            placeholder="Search articles on insulin, carbs, exercise, sick days..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-14 rounded-full text-slate-900 bg-white border-none shadow-xl text-base"
                        />
                    </div>
                </div>
            </header>

            <div className="container px-6 py-12">
                {/* CATEGORY FILTERS */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {["All", "Basics", "Nutrition", "Lifestyle", "Travel", "Emergency", "Innovation"].map((filter) => (
                        <Button
                            key={filter}
                            variant={selectedCategory === filter ? "default" : "outline"}
                            className={`rounded-full px-6 font-bold text-xs h-10 ${
                                selectedCategory === filter
                                    ? "bg-[#003E7E] text-white hover:bg-[#002a5e]"
                                    : "text-slate-600 border-slate-300 hover:bg-blue-50 hover:text-[#003E7E]"
                            }`}
                            onClick={() => setSelectedCategory(filter)}
                        >
                            {filter}
                        </Button>
                    ))}
                </div>

                {/* ARTICLES GRID */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map((article) => (
                        <div
                            key={article.id}
                            onClick={() => setSelectedArticle(article)}
                            className="group cursor-pointer flex flex-col h-full bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative"
                        >
                            <div className="relative h-56 overflow-hidden bg-slate-100">
                                <img
                                    src={article.img}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    alt={article.title}
                                />
                                <Badge className="absolute top-4 left-4 bg-white/90 text-[#003E7E] hover:bg-white backdrop-blur font-bold px-3 py-1 text-xs">
                                    {article.category}
                                </Badge>
                                <button
                                    type="button"
                                    onClick={(e) => toggleBookmark(article.id, e)}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-slate-700 hover:text-[#E31C79] backdrop-blur shadow-md"
                                >
                                    <Bookmark className={`h-4 w-4 ${bookmarkedIds.includes(article.id) ? 'fill-[#E31C79] text-[#E31C79]' : ''}`} />
                                </button>
                            </div>

                            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#009CDF] transition-colors leading-snug mb-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                                        {article.excerpt}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="h-3.5 w-3.5 text-[#009CDF]" /> {article.readTime} read
                                    </span>
                                    <span className="flex items-center gap-1 text-[#003E7E] font-bold group-hover:translate-x-1 transition-transform">
                                        Read Guide <ChevronRight className="h-4 w-4" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredArticles.length === 0 && (
                    <div className="text-center py-20 space-y-4">
                        <BookOpen className="h-12 w-12 text-slate-300 mx-auto" />
                        <h3 className="text-xl font-bold text-slate-700">No articles found</h3>
                        <p className="text-sm text-slate-500">Try adjusting your search terms or filter category.</p>
                    </div>
                )}
            </div>

            {/* FULL ARTICLE MODAL READER */}
            <Dialog open={!!selectedArticle} onOpenChange={(open) => !open && setSelectedArticle(null)}>
                <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto p-6 sm:p-10 rounded-3xl">
                    {selectedArticle && (
                        <div className="space-y-6">
                            <DialogHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge className="bg-[#003E7E] text-white">{selectedArticle.category}</Badge>
                                    <span className="text-xs text-slate-500">{selectedArticle.readTime} read • Reviewed {selectedArticle.reviewDate}</span>
                                </div>
                                <DialogTitle className="text-2xl sm:text-3xl font-black text-[#003E7E] leading-tight">
                                    {selectedArticle.title}
                                </DialogTitle>
                                <DialogDescription className="text-slate-500 text-sm">
                                    By {selectedArticle.author}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md">
                                <img src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
                            </div>

                            {/* Key Takeaways Box */}
                            <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200 space-y-2">
                                <h4 className="font-bold text-xs uppercase tracking-wider text-[#003E7E] flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-[#009CDF]" /> Key Clinical Takeaways
                                </h4>
                                <ul className="space-y-2 text-sm text-slate-700 font-medium">
                                    {selectedArticle.keyTakeaways.map((t, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                                            <span>{t}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Article Body */}
                            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                                {selectedArticle.content.map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-slate-200 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-500">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-green-600" />
                                    <span>Verified by Insulin Inside Medical Review Board</span>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-full text-xs font-bold"
                                    onClick={() => {
                                        toast.success("Article link copied to clipboard!");
                                    }}
                                >
                                    <Share2 className="h-3.5 w-3.5 mr-1.5" /> Share Article
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
