"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";

export default function ContactPage() {
    const form = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        // VALIDATION: Basic check
        if (!form.current) return;

        setIsSubmitting(true);

        const serviceId = "service_j7fyl2j";
        const templateId = "YOUR_TEMPLATE_ID"; // TODO: Replace with your actual Template ID
        const publicKey = "YOUR_PUBLIC_KEY";   // TODO: Replace with your actual Public Key

        if (templateId === "YOUR_TEMPLATE_ID" || publicKey === "YOUR_PUBLIC_KEY") {
            toast.error("Configuration Missing: Please set your EmailJS Template ID and Public Key in the code.");
            setIsSubmitting(false);
            return;
        }

        emailjs
            .sendForm(serviceId, templateId, form.current, {
                publicKey: publicKey,
            })
            .then(
                () => {
                    toast.success("Message sent successfully!");
                    if (form.current) form.current.reset();
                },
                (error) => {
                    console.error('FAILED...', error.text);
                    toast.error("Failed to send message. Please try again later.");
                },
            )
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <div className="container px-6 py-20">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* INFO SIDE */}
                    <div className="bg-[#003E7E] text-white p-12 flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            <h1 className="text-4xl font-black mb-6">Get in Touch</h1>
                            <p className="text-blue-100 mb-12">Have questions about diabetes or our platform? We're here to help.</p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <Phone className="h-5 w-5 text-[#009CDF]" />
                                    <span className="font-bold">+91 800-123-4567</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Mail className="h-5 w-5 text-[#009CDF]" />
                                    <span className="font-bold">support@insulininside.org</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <MapPin className="h-5 w-5 text-[#009CDF]" />
                                    <span className="font-bold">123 Health Park, Bangalore, India</span>
                                </div>
                            </div>
                        </div>
                        {/* Decorative Circles */}
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#009CDF] rounded-full opacity-20"></div>
                    </div>

                    {/* FORM SIDE */}
                    <div className="p-12">
                        <form ref={form} onSubmit={sendEmail} className="space-y-6">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Full Name</label>
                                <Input name="user_name" placeholder="John Doe" className="bg-slate-50 border-slate-200 h-12" required />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Email Address</label>
                                <Input name="user_email" type="email" placeholder="john@example.com" className="bg-slate-50 border-slate-200 h-12" required />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Message</label>
                                <Textarea name="message" placeholder="How can we help you?" className="bg-slate-50 border-slate-200 min-h-[150px]" required />
                            </div>
                            <Button type="submit" disabled={isSubmitting} className="w-full bg-[#E31C79] hover:bg-[#c21565] font-bold h-12 text-lg">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    "Send Message"
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
