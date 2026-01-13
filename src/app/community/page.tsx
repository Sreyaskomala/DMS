import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MessageCircle, ThumbsUp, User, Globe, MessageSquare } from "lucide-react";

export default function CommunityPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <header className="bg-white border-b sticky top-0 z-50">
                <div className="container px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-black text-xl text-[#003E7E]">
                        Insulin<span className="text-[#009CDF]">Community</span>
                    </div>
                    <Button className="bg-[#E31C79] hover:bg-[#c21565] font-bold rounded-full" asChild>
                        <Link href="/login">Log In to Post</Link>
                    </Button>
                </div>
            </header>

            <div className="container px-6 py-8 grid lg:grid-cols-4 gap-8">

                {/* SIDEBAR */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="font-bold text-[#003E7E] mb-4 uppercase text-xs tracking-wider">Topics</h3>
                        <ul className="space-y-2 text-sm font-medium text-slate-600">
                            <li className="p-2 rounded-lg bg-blue-50 text-[#009CDF] cursor-pointer">All Discussions</li>
                            <li className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer">Type 1 Talk</li>
                            <li className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer">Type 2 Support</li>
                            <li className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer">Parents & Carers</li>
                            <li className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer">Diet & Tech</li>
                        </ul>
                    </div>
                </div>

                {/* MAIN FEED */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-slate-800">Recent Discussions</h1>
                        <Button variant="outline" className="rounded-full border-[#003E7E] text-[#003E7E] hover:bg-blue-50 font-bold">
                            <MessageSquare className="mr-2 h-4 w-4" /> Start New Topic
                        </Button>
                    </div>

                    {[
                        { user: "SarahMk2", title: "Best way to handle exercise lows?", topic: "Type 1 Talk", replies: 24, time: "2h ago" },
                        { user: "Rajiv_Dad", title: "Looking for school lunch ideas for my 7yo", topic: "Parents & Carers", replies: 15, time: "4h ago" },
                        { user: "PumpUser99", title: "T-Slim vs Omnipod: My experience after 6 months", topic: "Diet & Tech", replies: 86, time: "1d ago" },
                        { user: "NewbieHere", title: "Just diagnosed, feeling overwhelmed", topic: "Type 1 Talk", replies: 102, time: "1d ago" }
                    ].map((post, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-[#009CDF] transition-colors cursor-pointer">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                                    <User className="h-4 w-4" />
                                </div>
                                <span className="text-sm font-bold text-slate-700">{post.user}</span>
                                <span className="text-xs text-slate-400 px-2">• {post.time}</span>
                                <Badge variant="secondary" className="ml-auto bg-blue-50 text-[#009CDF] hover:bg-blue-100">{post.topic}</Badge>
                            </div>
                            <h3 className="text-lg font-bold text-[#003E7E] mb-2">{post.title}</h3>
                            <div className="flex items-center gap-6 text-slate-500 text-sm mt-4">
                                <div className="flex items-center gap-1 hover:text-[#009CDF]"><MessageCircle className="h-4 w-4" /> {post.replies} Replies</div>
                                <div className="flex items-center gap-1 hover:text-[#009CDF]"><ThumbsUp className="h-4 w-4" /> Like</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
