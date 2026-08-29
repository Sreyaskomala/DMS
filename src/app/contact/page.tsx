"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Loader2, ShieldCheck, HeartPulse, Store } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("Patient Support");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("Thank you for reaching out! Our Hyderabad team will respond within 24 hours.");
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
                    <Badge className="bg-[#009CDF] text-white border-none font-bold text-xs uppercase tracking-wider">
                        Hyderabad Operations &amp; Support
                    </Badge>
                    <h1 className="text-4xl sm:text-5xl font-black">Contact &amp; Grievance Redressal</h1>
                    <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-medium">
                        Patient inquiries, pharmacy partner onboarding in Hyderabad, and customer grievance desk.
                    </p>
                </div>
            </header>

            <div className="container px-6 py-12 space-y-12">
                <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
                    {/* INFO SIDE */}
                    <div className="bg-gradient-to-br from-[#003E7E] to-[#00264d] text-white p-8 sm:p-12 flex flex-col justify-between space-y-8">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black">Let&apos;s Connect</h2>
                            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                                Our patient coordinators and Hyderabad pharmacy relationship managers are here to assist you.
                            </p>

                            <div className="space-y-5 pt-2 text-xs">
                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 bg-white/10 rounded-xl shrink-0">
                                        <Store className="h-5 w-5 text-[#009CDF]" />
                                    </div>
                                    <div>
                                        <span className="text-blue-200 block uppercase font-bold text-[10px]">Hyderabad Chemist Desk</span>
                                        <span className="font-bold text-sm">+91 98490 12345 (WhatsApp Available)</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 bg-white/10 rounded-xl shrink-0">
                                        <Mail className="h-5 w-5 text-[#009CDF]" />
                                    </div>
                                    <div>
                                        <span className="text-blue-200 block uppercase font-bold text-[10px]">Support &amp; Grievance Email</span>
                                        <span className="font-bold text-sm">support@insulininside.org</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 bg-white/10 rounded-xl shrink-0">
                                        <MapPin className="h-5 w-5 text-[#009CDF]" />
                                    </div>
                                    <div>
                                        <span className="text-blue-200 block uppercase font-bold text-[10px]">Hyderabad Pilot Office</span>
                                        <span className="font-bold text-xs">Insulin Inside Healthcare, Road No. 12, Banjara Hills, Hyderabad, Telangana 500034</span>
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
                            <p>For severe hypoglycemia or diabetic emergencies, dial <strong>108 / 112</strong> immediately.</p>
                        </div>
                    </div>

                    {/* FORM SIDE */}
                    <div className="p-8 sm:p-12 space-y-6">
                        <div>
                            <h3 className="text-2xl font-black text-[#003E7E]">Send a Message</h3>
                            <p className="text-xs text-slate-500 mt-1">We respond within 24 business hours.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Sreyas Komala"
                                    className="h-10 bg-slate-50 text-xs"
                                    required
                                />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        className="h-10 bg-slate-50 text-xs"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-slate-700 block mb-1">Phone (WhatsApp)</label>
                                    <Input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+91 98490 00000"
                                        className="h-10 bg-slate-50 text-xs"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="font-bold text-slate-700 block mb-1">Inquiry Type</label>
                                <select
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                                >
                                    <option value="Patient Support">Patient Refill &amp; Tracking Support</option>
                                    <option value="Hyderabad Chemist Onboarding">Hyderabad Chemist Partner Onboarding</option>
                                    <option value="Prescription Inquiry">Prescription Verification Query</option>
                                    <option value="Grievance">Grievance / Feedback</option>
                                </select>
                            </div>

                            <div>
                                <label className="font-bold text-slate-700 block mb-1">Message</label>
                                <Textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Enter your message or pharmacy details..."
                                    className="min-h-[110px] bg-slate-50 text-xs"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#003E7E] hover:bg-[#002a5e] h-11 font-bold rounded-xl text-xs text-white shadow-md transition-all"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    "Submit Inquiry →"
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
