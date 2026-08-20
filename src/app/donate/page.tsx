"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, CheckCircle2, QrCode, CreditCard, ShieldCheck, Download, Printer, Sparkles, Building2, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import Link from "next/link";
import { format } from "date-fns";

export default function DonatePage() {
    const [donationType, setDonationType] = useState<"monthly" | "once">("monthly");
    const [selectedAmount, setSelectedAmount] = useState<number>(500);
    const [customAmount, setCustomAmount] = useState<string>("");
    const [donorName, setDonorName] = useState<string>("Sreyas Komala");
    const [donorPan, setDonorPan] = useState<string>("ABCDE1234F");
    const [donorEmail, setDonorEmail] = useState<string>("sreyas@example.com");

    // Modal state
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);
    const [receiptId, setReceiptId] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState(false);

    const activeAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

    const handleStartDonation = () => {
        if (activeAmount <= 0) {
            toast.error("Please enter a valid donation amount");
            return;
        }
        setIsPaymentOpen(true);
    };

    const handleConfirmPayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsPaymentOpen(false);
            const genReceipt = `80G-2026-${Math.floor(100000 + Math.random() * 900000)}`;
            setReceiptId(genReceipt);
            setIsReceiptOpen(true);
            toast.success("Thank you for your generous contribution!");
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            {/* Header */}
            <header className="bg-white py-6 border-b sticky top-0 z-40">
                <div className="container px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-black text-xl text-[#003E7E]">
                        Insulin<span className="text-[#009CDF]">Inside</span>
                    </Link>
                    <Badge className="bg-green-100 text-green-800 font-bold border-none text-xs">
                        Section 80G Tax Deductible (India)
                    </Badge>
                </div>
            </header>

            <div className="container px-6 py-12 space-y-16">
                {/* Hero Title */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <Badge className="bg-[#E31C79] text-white border-none font-bold">LIFESAVING IMPACT</Badge>
                    <h1 className="text-4xl sm:text-5xl font-black text-[#003E7E] tracking-tight">
                        Help Underprivileged Children Access Life-Saving Insulin
                    </h1>
                    <p className="text-lg text-slate-600 font-medium leading-relaxed">
                        No child in India should suffer or lose their future simply because their family cannot afford daily insulin and test strips. 100% of public donations go directly to patient aid.
                    </p>
                </div>

                {/* LIVE IMPACT COUNTER */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                    {[
                        { label: "Children Adopted", value: "1,420+", color: "text-[#003E7E]" },
                        { label: "Test Strips Distributed", value: "850,000+", color: "text-[#009CDF]" },
                        { label: "Rural Health Camps", value: "48 Cities", color: "text-[#E31C79]" },
                        { label: "Tax Exemption", value: "50% 80G", color: "text-green-600" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
                            <div className={`text-3xl font-black ${stat.color} mb-1`}>{stat.value}</div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* DONATION CARD CONTAINER */}
                <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-slate-200 space-y-8">
                    {/* Toggle Frequency */}
                    <div className="flex justify-center">
                        <div className="bg-slate-100 p-1 rounded-2xl flex border">
                            <button
                                type="button"
                                onClick={() => setDonationType("monthly")}
                                className={`px-8 py-3 rounded-xl font-black text-sm transition-all ${
                                    donationType === "monthly"
                                        ? "bg-[#003E7E] text-white shadow-md"
                                        : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                Give Monthly (High Impact)
                            </button>
                            <button
                                type="button"
                                onClick={() => setDonationType("once")}
                                className={`px-8 py-3 rounded-xl font-black text-sm transition-all ${
                                    donationType === "once"
                                        ? "bg-[#003E7E] text-white shadow-md"
                                        : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                Give One-Time
                            </button>
                        </div>
                    </div>

                    {/* Amount Tier Selectors */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[500, 1000, 2500, 5000].map((amt) => (
                            <button
                                key={amt}
                                type="button"
                                onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                                className={`p-6 rounded-2xl border-2 text-center transition-all ${
                                    selectedAmount === amt && !customAmount
                                        ? "border-[#003E7E] bg-blue-50/50 shadow-md transform -translate-y-1"
                                        : "border-slate-200 hover:border-slate-300"
                                }`}
                            >
                                <div className="text-2xl font-black text-[#003E7E]">₹{amt.toLocaleString()}</div>
                                <span className="text-xs text-slate-500 font-medium">
                                    {amt === 500 ? "1 Mo Strips" : amt === 1000 ? "Insulin + Strips" : amt === 2500 ? "Full Child Care" : "Adopt 2 Children"}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Custom Amount */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600 uppercase">Or Enter Custom Amount (₹)</label>
                        <Input
                            type="number"
                            placeholder="Enter custom amount in INR"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            className="h-12 text-lg font-bold"
                        />
                    </div>

                    {/* Donor Details for 80G Receipt */}
                    <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t">
                        <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">Full Name (for 80G)</label>
                            <Input value={donorName} onChange={(e) => setDonorName(e.target.value)} required />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">PAN Card Number</label>
                            <Input value={donorPan} onChange={(e) => setDonorPan(e.target.value.toUpperCase())} placeholder="ABCDE1234F" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">Email for Tax Receipt</label>
                            <Input value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} required />
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                        type="button"
                        onClick={handleStartDonation}
                        className="w-full bg-[#E31C79] hover:bg-[#c21565] h-14 text-lg font-bold rounded-2xl shadow-xl transition-all"
                    >
                        <Heart className="h-5 w-5 mr-2 fill-white" />
                        Donate ₹{activeAmount.toLocaleString()} {donationType === "monthly" ? "Monthly" : "Now"} →
                    </Button>
                </div>
            </div>

            {/* UPI & PAYMENT CHECKOUT MODAL */}
            <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                <DialogContent className="max-w-md p-8 rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-[#003E7E]">Complete Your Contribution</DialogTitle>
                        <DialogDescription>
                            Secure payment powered by UPI & Razorpay Payment Gateway.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 pt-2">
                        <div className="bg-slate-50 p-4 rounded-2xl border flex items-center justify-between">
                            <div>
                                <span className="text-xs text-slate-500 block">Total Donation</span>
                                <span className="text-2xl font-black text-[#003E7E]">₹{activeAmount.toLocaleString()}</span>
                            </div>
                            <Badge className="bg-green-100 text-green-800 font-bold">Tax Exempt 80G</Badge>
                        </div>

                        {/* UPI QR Simulation */}
                        <div className="p-6 bg-white rounded-2xl border-2 border-dashed border-[#003E7E] text-center space-y-3">
                            <div className="w-36 h-36 mx-auto bg-slate-100 rounded-xl flex items-center justify-center border">
                                <QrCode className="h-28 w-28 text-[#003E7E]" />
                            </div>
                            <p className="text-xs font-bold text-slate-600">Scan with any UPI App (GPay, PhonePe, Paytm, BHIM)</p>
                            <div className="flex justify-center gap-2 text-[10px] font-bold text-slate-500">
                                <span className="px-2 py-1 bg-slate-100 rounded">GPay</span>
                                <span className="px-2 py-1 bg-slate-100 rounded">PhonePe</span>
                                <span className="px-2 py-1 bg-slate-100 rounded">Paytm</span>
                                <span className="px-2 py-1 bg-slate-100 rounded">Credit Card</span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            disabled={isProcessing}
                            onClick={handleConfirmPayment}
                            className="w-full bg-[#003E7E] hover:bg-[#002a5e] h-12 font-bold rounded-xl text-base shadow-lg"
                        >
                            {isProcessing ? "Verifying Transaction..." : "Simulate UPI Payment Success →"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* 80G OFFICIAL TAX RECEIPT MODAL */}
            <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
                <DialogContent className="max-w-xl p-8 rounded-3xl">
                    <DialogHeader>
                        <div className="flex items-center gap-2 mb-1">
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                            <Badge className="bg-green-100 text-green-800 font-bold">OFFICIAL 80G RECEIPT</Badge>
                        </div>
                        <DialogTitle className="text-2xl font-black text-[#003E7E]">Contribution Receipt & Tax Exemption</DialogTitle>
                        <DialogDescription>
                            Eligible for 50% deduction under Section 80G of the Indian Income Tax Act.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-xs">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-slate-500">Receipt No:</span>
                            <span className="font-mono font-bold text-slate-900">{receiptId}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-slate-500">Date & Time:</span>
                            <span className="font-bold">{format(new Date(), "PPP p")}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-slate-500">Donor Name:</span>
                            <span className="font-bold">{donorName}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-slate-500">Donor PAN:</span>
                            <span className="font-bold">{donorPan}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-slate-500">Amount Received:</span>
                            <span className="font-black text-[#003E7E] text-sm">₹{activeAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Exemption Authority:</span>
                            <span className="font-bold text-green-700">Reg No: AACTI2026E80G1</span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            className="flex-1 bg-[#003E7E] hover:bg-[#002a5e] font-bold h-12 rounded-xl"
                            onClick={() => {
                                window.print();
                                toast.success("Printing 80G tax receipt...");
                            }}
                        >
                            <Printer className="h-4 w-4 mr-2" /> Print / Save PDF Receipt
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setIsReceiptOpen(false)}
                            className="rounded-xl"
                        >
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
