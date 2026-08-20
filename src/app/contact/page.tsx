"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Loader2, ShieldCheck, HeartPulse, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("Thank you for reaching out! A healthcare coordinator will respond within 24 hours.");
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            {/* Header */}
            <header className="bg-[#003E7E] text-white py-16">
                <div className="container px-6 text-center max-w-3xl mx-auto space-y-4">
                    <Badge className="bg-[#009CDF] text-white border-none font-bold">24/7 SUPPORT & NETWORK</Badge>
                    <h1 className="text-4xl sm:text-5xl font-black">Contact & Partner With Us</h1>
                    <p className="text-blue-100 text-lg leading-relaxed font-medium">
                        Have questions about diabetes management, wish to volunteer, or want to partner as a healthcare organization?
                    </p>
                </div>
            </header>

            <div className="container px-6 py-12 space-y-12">
                <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
                    {/* INFO SIDE */}
                    <div className="bg-gradient-to-br from-[#003E7E] to-[#00264d] text-white p-10 sm:p-12 flex flex-col justify-between space-y-8">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black">Let's Connect</h2>
                            <p className="text-blue-100 text-sm leading-relaxed">
                                Our patient advocacy team and certified diabetes educators are here to guide you.
                            </p>

                            <div className="space-y-5 pt-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 bg-white/10 rounded-xl">
                                        <Phone className="h-5 w-5 text-[#009CDF]" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-blue-200 block uppercase font-bold">Toll-Free Helpline</span>
                                        <span className="font-bold text-base">+91 1800-123-DIAB (3422)</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 bg-white/10 rounded-xl">
                                        <Mail className="h-5 w-5 text-[#009CDF]" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-blue-200 block uppercase font-bold">Email Support</span>
                                        <span className="font-bold text-base">support@insulininside.org</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 bg-white/10 rounded-xl">
                                        <MapPin className="h-5 w-5 text-[#009CDF]" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-blue-200 block uppercase font-bold">National Headquarters</span>
                                        <span className="font-bold text-sm">Insulin Inside Foundation, Health Tech Hub, Indiranagar, Bengaluru, India</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Emergency Hotline Alert */}
                        <div className="p-4 bg-red-500/20 border border-red-400/40 rounded-2xl text-xs text-red-200 space-y-1">
                            <div className="flex items-center gap-2 font-bold text-white">
                                <HeartPulse className="h-4 w-4 text-red-400" />
                                <span>Emergency Medical Services</span>
                            </div>
                            <p>For severe hypoglycemia or diabetic ketoacidosis emergencies, call <strong>108 / 112</strong> immediately.</p>
                        </div>
                    </div>

                    {/* FORM SIDE */}
                    <div className="p-8 sm:p-12 space-y-6">
                        <div>
                            <h3 className="text-2xl font-black text-[#003E7E]">Send a Message</h3>
                            <p className="text-xs text-slate-500 mt-1">We typically reply within 24 business hours.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Full Name</label>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Sreyas Komala"
                                    className="h-12 bg-slate-50"
                                    required
                                />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Email Address</label>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        className="h-12 bg-slate-50"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Phone (Optional)</label>
                                    <Input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+91 98765 43210"
                                        className="h-12 bg-slate-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-600 uppercase block mb-1">How can we help?</label>
                                <Textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Enter your message, inquiry, or partnership proposal..."
                                    className="min-h-[140px] bg-slate-50"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#E31C79] hover:bg-[#c21565] h-12 font-bold rounded-xl text-base shadow-lg transition-all"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Sending Message...
                                    </>
                                ) : (
                                    "Send Message →"
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
