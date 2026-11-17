"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    MessageCircle, ThumbsUp,
    Search, Plus, ShieldCheck, CheckCircle2, Send
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

interface ForumPost {
    id: string;
    author: string;
    role?: "Patient" | "Parent" | "Educator" | "Doctor";
    title: string;
    body: string;
    topic: string;
    repliesCount: number;
    likesCount: number;
    hasLiked?: boolean;
    timeAgo: string;
    comments: Array<{ author: string; text: string; time: string; role?: string }>;
}

const INITIAL_POSTS: ForumPost[] = [
    {
        id: "post-1",
        author: "Sarah_T1D",
        role: "Patient",
        title: "Best protocol to prevent delayed hypoglycemia after evening gym sessions?",
        body: "I've been lifting weights and doing 20 mins cardio at 6 PM. My blood sugar is fine before bed (140), but at 3:30 AM I consistently drop into the 60s. Any tips on bedtime snack macro ratios or basal reduction?",
        topic: "Type 1 Talk",
        repliesCount: 8,
        likesCount: 24,
        timeAgo: "2 hours ago",
        comments: [
            { author: "Dr. Aditi Sharma", role: "Doctor", text: "Delayed glucose drop is typical 6-10 hours post-anaerobic workout due to glycogen replenishment. Try a bedtime snack containing complex carbs + slow protein (e.g. 1 tbsp peanut butter with 1 multigrain cracker or 1/2 cup curd with walnuts).", time: "1 hour ago" },
            { author: "Rahul_PumpUser", role: "Patient", text: "Setting a temporary basal rate of -20% for 4 hours starting midnight solved this exact issue for me on heavy workout days.", time: "45 mins ago" }
        ]
    },
    {
        id: "post-2",
        author: "Priya_Mom",
        role: "Parent",
        title: "Kid-friendly low GI lunchbox recipes for school (Grade 3)",
        body: "My 8-year old son was diagnosed with Type 1 five months ago. School starts next week and I'm looking for Indian tiffin ideas that don't cause huge post-lunch spikes when he is in class.",
        topic: "Parents & Carers",
        repliesCount: 15,
        likesCount: 38,
        timeAgo: "5 hours ago",
        comments: [
            { author: "Meera_CDE", role: "Educator", text: "Besan Chilla with grated paneer and mint chutney is a big hit. It has a very flat glycemic curve. Also Paneer Bhurji with 1 Jowar Roti works wonders!", time: "3 hours ago" }
        ]
    },
    {
        id: "post-3",
        author: "Vikram_Tech",
        role: "Patient",
        title: "Switching from MDI (Multiple Daily Injections) to Continuous Glucose Monitor (CGM)",
        body: "After 4 years of 5-6 finger pricks a day, I started wearing a FreeStyle Libre sensor. The trend arrows have completely transformed how I make correction decisions before meals.",
        topic: "Diet & Tech",
        repliesCount: 22,
        likesCount: 56,
        timeAgo: "1 day ago",
        comments: [
            { author: "Ananya_S", role: "Patient", text: "The trend arrow is crucial! If you see double arrows up, bolusing 15 mins earlier prevents the spike from reaching 200.", time: "18 hours ago" }
        ]
    },
    {
        id: "post-4",
        author: "Amit_Newbie",
        role: "Patient",
        title: "Newly diagnosed with HbA1c 10.4% - Feeling overwhelmed and scared",
        body: "Just received my lab results yesterday. Doctor started me on basal insulin and Metformin. Feeling lost about what I can and cannot eat.",
        topic: "Newly Diagnosed",
        repliesCount: 31,
        likesCount: 89,
        timeAgo: "1 day ago",
        comments: [
            { author: "Kavita_Advocate", role: "Patient", text: "Take a deep breath Amit. We have all stood exactly where you are today. High HbA1c comes down quickly once you start treatment. You can live a full, athletic, and joyful life. We are here for you!", time: "22 hours ago" },
            { author: "Dr. Aditi Sharma", role: "Doctor", text: "Welcome to the community Amit. Reach out to our certified diabetes educators anytime. Your numbers will normalize safely.", time: "20 hours ago" }
        ]
    }
];

const COMMUNITY_STORAGE_KEY = "insulin_inside_community_posts";

export default function CommunityPage() {
    const [posts, setPosts] = useState<ForumPost[]>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem(COMMUNITY_STORAGE_KEY);
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        return parsed;
                    }
                } catch {
                    return INITIAL_POSTS;
                }
            }
        }
        return INITIAL_POSTS;
    });
    const [selectedTopic, setSelectedTopic] = useState<string>("All Discussions");
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Modal state
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newCategory, setNewCategory] = useState("Type 1 Talk");
    const [newBody, setNewBody] = useState("");
    const [newAuthor, setNewAuthor] = useState("Community Member");

    // Thread View state
    const [activePost, setActivePost] = useState<ForumPost | null>(null);
    const [replyText, setReplyText] = useState("");

    const savePosts = (newPosts: ForumPost[]) => {
        setPosts(newPosts);
        if (typeof window !== "undefined") {
            localStorage.setItem(COMMUNITY_STORAGE_KEY, JSON.stringify(newPosts));
        }
    };

    const handleCreatePost = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim() || !newBody.trim()) {
            toast.error("Please enter a discussion title and body.");
            return;
        }

        const newEntry: ForumPost = {
            id: `post-${Date.now()}`,
            author: newAuthor || "Community Member",
            role: "Patient",
            title: newTitle,
            body: newBody,
            topic: newCategory,
            repliesCount: 0,
            likesCount: 1,
            timeAgo: "Just now",
            comments: []
        };

        const updated = [newEntry, ...posts];
        savePosts(updated);
        setIsCreateOpen(false);
        setNewTitle("");
        setNewBody("");
        toast.success("Your topic has been posted to the community!");
    };

    const handleLikeToggle = (postId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const updated = posts.map(p => {
            if (p.id === postId) {
                const nextLiked = !p.hasLiked;
                return {
                    ...p,
                    hasLiked: nextLiked,
                    likesCount: nextLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
                };
            }
            return p;
        });
        savePosts(updated);
        if (activePost?.id === postId) {
            const current = updated.find(p => p.id === postId);
            if (current) setActivePost(current);
        }
    };

    const handleAddReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (!activePost || !replyText.trim()) return;

        const updatedComment = {
            author: "You (Community Member)",
            role: "Patient",
            text: replyText,
            time: "Just now"
        };

        const updatedPosts = posts.map(p => {
            if (p.id === activePost.id) {
                return {
                    ...p,
                    repliesCount: p.repliesCount + 1,
                    comments: [...p.comments, updatedComment]
                };
            }
            return p;
        });

        savePosts(updatedPosts);
        const refreshedActive = updatedPosts.find(p => p.id === activePost.id) || null;
        setActivePost(refreshedActive);
        setReplyText("");
        toast.success("Reply added to discussion!");
    };

    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedTopic === "All Discussions" || post.topic === selectedTopic;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
                <div className="container px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-[#003E7E] rounded-2xl flex items-center justify-center text-white font-black text-xl">
                            <MessageCircle className="h-6 w-6" />
                        </div>
                        <div>
                            <span className="text-2xl font-black text-[#003E7E]">Insulin<span className="text-[#009CDF]">Community</span></span>
                            <span className="block text-[10px] uppercase font-bold text-slate-400">Safe, Moderated Peer Support Network</span>
                        </div>
                    </div>

                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        className="bg-[#E31C79] hover:bg-[#c21565] font-bold rounded-full h-11 px-6 shadow-lg"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Start New Topic
                    </Button>
                </div>
            </header>

            <div className="container px-6 py-10 grid lg:grid-cols-4 gap-8">
                {/* SIDEBAR: TOPICS & GROUPS */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
                        <h3 className="font-black text-xs uppercase tracking-wider text-[#003E7E]">Categories</h3>
                        <ul className="space-y-1 text-sm font-bold">
                            {["All Discussions", "Type 1 Talk", "Type 2 Support", "Parents & Carers", "Diet & Tech", "Newly Diagnosed"].map((topic) => (
                                <li
                                    key={topic}
                                    onClick={() => setSelectedTopic(topic)}
                                    className={`p-3 rounded-2xl cursor-pointer transition-all flex items-center justify-between ${
                                        selectedTopic === topic
                                            ? "bg-[#003E7E] text-white shadow-md"
                                            : "text-slate-600 hover:bg-slate-100"
                                    }`}
                                >
                                    <span>{topic}</span>
                                    {selectedTopic === topic && <CheckCircle2 className="h-4 w-4 text-[#009CDF]" />}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community Guidelines Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-3xl border border-blue-200 space-y-3 text-xs text-slate-600">
                        <div className="flex items-center gap-2 font-bold text-[#003E7E]">
                            <ShieldCheck className="h-5 w-5 text-[#009CDF]" />
                            <span>Community Care Code</span>
                        </div>
                        <p>
                            We are a safe space. All peer advice is experiential. Always confirm insulin dosing adjustments with your physician.
                        </p>
                    </div>
                </div>

                {/* MAIN FEED */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="relative flex-1 w-full max-w-md">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search discussions, topics, questions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 bg-white border-slate-200 rounded-full h-11"
                            />
                        </div>
                        <span className="text-xs font-bold text-slate-500">
                            Showing {filteredPosts.length} discussions
                        </span>
                    </div>

                    {/* Posts List */}
                    <div className="space-y-4">
                        {filteredPosts.map((post) => (
                            <div
                                key={post.id}
                                onClick={() => setActivePost(post)}
                                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:border-[#009CDF] hover:shadow-xl transition-all cursor-pointer space-y-4"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#003E7E] to-[#009CDF] flex items-center justify-center text-white font-bold text-sm">
                                            {post.author.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-black text-slate-900">{post.author}</span>
                                                {post.role === "Doctor" && (
                                                    <Badge className="bg-green-100 text-green-800 text-[10px] font-bold">Doctor</Badge>
                                                )}
                                                {post.role === "Educator" && (
                                                    <Badge className="bg-blue-100 text-blue-800 text-[10px] font-bold">Certified Educator</Badge>
                                                )}
                                            </div>
                                            <span className="text-xs text-slate-400">{post.timeAgo}</span>
                                        </div>
                                    </div>
                                    <Badge className="bg-blue-50 text-[#003E7E] hover:bg-blue-100 font-bold border-none text-xs">
                                        {post.topic}
                                    </Badge>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-[#003E7E] hover:text-[#009CDF] transition-colors leading-snug">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed font-medium">
                                        {post.body}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                    <div className="flex items-center gap-6">
                                        <button
                                            type="button"
                                            onClick={(e) => handleLikeToggle(post.id, e)}
                                            className={`flex items-center gap-1.5 font-bold transition-colors ${
                                                post.hasLiked ? 'text-[#E31C79]' : 'hover:text-[#003E7E]'
                                            }`}
                                        >
                                            <ThumbsUp className={`h-4 w-4 ${post.hasLiked ? 'fill-[#E31C79]' : ''}`} />
                                            <span>{post.likesCount} Helpful</span>
                                        </button>
                                        <div className="flex items-center gap-1.5 font-bold hover:text-[#009CDF]">
                                            <MessageCircle className="h-4 w-4 text-[#009CDF]" />
                                            <span>{post.repliesCount} Replies</span>
                                        </div>
                                    </div>
                                    <span className="text-[#003E7E] font-bold">Join Discussion →</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CREATE TOPIC MODAL */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-h-[calc(100dvh-1.5rem)] max-w-xl overflow-y-auto rounded-3xl p-5 sm:p-8">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-[#003E7E]">Start a New Discussion</DialogTitle>
                        <DialogDescription>
                            Share an experience, ask advice about insulin management, or seek support from peers.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCreatePost} className="space-y-4 pt-2">
                        <div>
                            <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Your Display Name</label>
                            <Input
                                value={newAuthor}
                                onChange={(e) => setNewAuthor(e.target.value)}
                                placeholder="e.g. Sreyas or Anonymous"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Topic Category</label>
                            <select
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold"
                            >
                                <option value="Type 1 Talk">Type 1 Talk</option>
                                <option value="Type 2 Support">Type 2 Support</option>
                                <option value="Parents & Carers">Parents & Carers</option>
                                <option value="Diet & Tech">Diet & Tech</option>
                                <option value="Newly Diagnosed">Newly Diagnosed</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Discussion Title</label>
                            <Input
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                placeholder="e.g. How do you manage blood sugars during wedding feasts?"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Question / Experience Details</label>
                            <Textarea
                                value={newBody}
                                onChange={(e) => setNewBody(e.target.value)}
                                placeholder="Provide context, medications you are taking, and what you need advice on..."
                                className="min-h-[120px]"
                                required
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button type="submit" className="flex-1 bg-[#003E7E] hover:bg-[#002a5e] font-bold h-12 rounded-xl">
                                Publish to Community
                            </Button>
                            <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)} className="rounded-xl">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* THREAD DETAIL & REPLY MODAL: centered above navigation with one scrollable body */}
            <Dialog open={!!activePost} onOpenChange={(open) => !open && setActivePost(null)}>
                <DialogContent
                    className="flex w-[calc(100vw-1.5rem)] max-w-3xl flex-col gap-0 overflow-hidden rounded-3xl border border-slate-200 bg-white p-0 shadow-2xl"
                    style={{ maxHeight: "calc(100dvh - 1.5rem)" }}
                >
                    {activePost && (
                        <>
                            <DialogHeader className="shrink-0 gap-3 border-b border-slate-200 bg-white px-5 py-5 pr-12 text-left sm:px-8 sm:py-6">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <Badge className="bg-[#003E7E] text-white">{activePost.topic}</Badge>
                                    <span className="text-xs text-slate-500">{activePost.timeAgo}</span>
                                </div>
                                <DialogTitle className="break-words text-xl font-black leading-snug text-[#003E7E] sm:text-2xl">
                                    {activePost.title}
                                </DialogTitle>
                                <DialogDescription className="text-sm font-medium text-slate-600">
                                    Posted by {activePost.author}
                                </DialogDescription>
                            </DialogHeader>

                            <div
                                className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain px-5 py-5 sm:px-8 sm:py-6"
                                role="region"
                                aria-label="Discussion and replies"
                                tabIndex={0}
                            >
                                <div className="whitespace-pre-wrap break-words rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium leading-relaxed text-slate-800 sm:p-5 sm:text-base">
                                    {activePost.body}
                                </div>

                                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
                                    Example community content, not verified clinical advice. Always discuss insulin dose or pump-setting changes with your diabetes care team.
                                </div>

                                <section aria-label="Community replies" className="space-y-4">
                                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                                        <MessageCircle className="h-4 w-4 shrink-0 text-[#009CDF]" />
                                        Community Replies ({activePost.comments.length})
                                    </h3>
                                    {activePost.comments.length === 0 && (
                                        <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                                            No replies yet. You can add the first reply below.
                                        </p>
                                    )}
                                    <div className="space-y-3">
                                        {activePost.comments.map((comment, idx) => (
                                            <article key={idx} className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4">
                                                <div className="flex flex-wrap items-start justify-between gap-2">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="break-words text-sm font-bold text-slate-900">{comment.author}</span>
                                                        {comment.role === "Doctor" && <Badge className="bg-slate-100 text-slate-600 text-[10px]">Example doctor reply</Badge>}
                                                        {comment.role === "Educator" && <Badge className="bg-slate-100 text-slate-600 text-[10px]">Example educator reply</Badge>}
                                                    </div>
                                                    <span className="shrink-0 text-xs text-slate-500">{comment.time}</span>
                                                </div>
                                                <p className="whitespace-pre-wrap break-words text-sm font-medium leading-relaxed text-slate-700">
                                                    {comment.text}
                                                </p>
                                            </article>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            <form
                                onSubmit={handleAddReply}
                                className="flex shrink-0 flex-col gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:px-8"
                            >
                                <label htmlFor="community-thread-reply" className="sr-only">Your reply</label>
                                <Input
                                    id="community-thread-reply"
                                    placeholder="Write a supportive reply..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    className="h-11 min-w-0 flex-1 bg-white"
                                    required
                                />
                                <Button type="submit" className="h-11 shrink-0 rounded-xl bg-[#003E7E] px-6 font-bold text-white hover:bg-[#002a5e]">
                                    <Send className="mr-2 h-4 w-4" /> Reply
                                </Button>
                            </form>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
