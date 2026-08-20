"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Download, FileText, Smartphone, Printer, ExternalLink,
    CreditCard, CheckCircle2, AlertTriangle, ShieldCheck, Heart, Sparkles, User
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import Link from "next/link";

interface ResourceDoc {
    id: string;
    title: string;
    description: string;
    category: "Printable Logs" | "Clinical Checklists" | "Nutrition Guides";
    pages: string;
    content: string[];
}

const RESOURCES: ResourceDoc[] = [
    {
        id: "res-1",
        title: "Weekly Blood Glucose & Insulin Titration Sheet",
        description: "Official 7-day printable grid for recording FBS, PBS, Pre/Post meals, Basaglar & Actrapid doses to show your doctor.",
        category: "Printable Logs",
        pages: "1 Page PDF",
        content: [
            "Includes dedicated columns for Fasting, Post-Breakfast, Pre-Lunch, Post-Lunch, Pre-Dinner, Post-Dinner, Bedtime.",
            "Sections for Thyroid (Thyronorm), Basal insulin (Basaglar), Bolus insulin (Actrapid), and nighttime hypo tracking.",
            "Recommended by leading Indian endocrinologists for clinic review visits."
        ]
    },
    {
        id: "res-2",
        title: "Indian Carbohydrate Exchange Cheat Sheet",
        description: "Pocket-sized reference for Roti, Rice, Dosa, Idli, Dals, Fruits, and sweets carb counts (15g exchanges).",
        category: "Nutrition Guides",
        pages: "2 Page PDF",
        content: [
            "Complete table of 40+ staple North and South Indian foods with carb grams, glycemic index, and portion sizes.",
            "Quick rules for managing high-fat mixed meals (Biryani, Paneer Butter Masala) to avoid late nocturnal spikes.",
            "Healthy swaps for refined flours (Maida) with Jowar, Ragi, and Multigrain."
        ]
    },
    {
        id: "res-3",
        title: "Quarterly Doctor Appointment Checklist",
        description: "Essential tests (HbA1c, Lipid Profile, Urine Microalbumin, Eye Exam, Foot Exam) to track before consultation.",
        category: "Clinical Checklists",
        pages: "1 Page PDF",
        content: [
            "HbA1c test (every 3 months; target <7.0%).",
            "Annual Comprehensive Dilated Eye Exam (Retinopathy screening).",
            "Urine Albumin-to-Creatinine Ratio (UACR) & eGFR for kidney health.",
            "Comprehensive Diabetic Foot Examination and monofilament sensation test."
        ]
    },
    {
        id: "res-4",
        title: "Travel & Airport Security Medical Protocol",
        description: "Official checklist for packing insulin cooling wallets, airport security scanner exemptions, and doctor letters.",
        category: "Clinical Checklists",
        pages: "2 Page PDF",
        content: [
            "Doctor's Medical Certificate template declaring insulin syringes, lancets, and CGM sensors.",
            "Airport security guide: Request hand inspection for insulin pumps & CGM transmitters (do not pass through X-Ray/CT).",
            "Emergency Hypo Kit packing list: Glucose tablets, juice packs, Glucagon kit."
        ]
    }
];

export default function ResourcesPage() {
    // Medical ID Card Generator State
    const [idName, setIdName] = useState("Sreyas Komala");
    const [idCondition, setIdCondition] = useState("Type 1 Diabetes (Insulin Dependent)");
    const [idInsulin, setIdInsulin] = useState("Basaglar 18u (Night), Actrapid 6-8u (Pre-meals)");
    const [idEmergencyContact, setIdEmergencyContact] = useState("+91 98765 43210 (Dr. Sharma / Family)");
    const [idAllergies, setIdAllergies] = useState("Sulfa drugs, Penicillin");
    const [selectedDoc, setSelectedDoc] = useState<ResourceDoc | null>(null);

    const handlePrintIdCard = () => {
        window.print();
    };

    const handleDownloadDoc = (doc: ResourceDoc) => {
        setSelectedDoc(doc);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            {/* Header */}
            <header className="bg-[#003E7E] text-white py-16">
                <div className="container px-6 text-center max-w-3xl mx-auto space-y-4">
                    <Badge className="bg-[#009CDF] text-white border-none font-bold">
                        FREE CLINICAL DOWNLOADS & TOOLS
                    </Badge>
                    <h1 className="text-4xl sm:text-5xl font-black">Downloads, Logs & Medical Tools</h1>
                    <p className="text-blue-100 text-lg leading-relaxed font-medium">
                        Printable daily tracking sheets, Indian carb exchange cheat sheets, and emergency medical identification generators.
                    </p>
                </div>
            </header>

            <div className="container px-6 py-12 space-y-16">

                {/* 1. INTERACTIVE MEDICAL ID CARD GENERATOR */}
                <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b pb-6">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <CreditCard className="h-6 w-6 text-[#E31C79]" />
                                <h2 className="text-2xl sm:text-3xl font-black text-[#003E7E]">Emergency Medical ID Card Generator</h2>
                            </div>
                            <p className="text-slate-600 text-sm">
                                Create and print your customized wallet medical ID card to carry in case of hypoglycemia or travel emergencies.
                            </p>
                        </div>
                        <Button
                            type="button"
                            className="bg-[#E31C79] hover:bg-[#c21565] text-white font-bold rounded-xl h-11 px-6 shadow-md"
                            onClick={handlePrintIdCard}
                        >
                            <Printer className="h-4 w-4 mr-2" /> Print / Save Wallet Card
                        </Button>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                        {/* Input Fields */}
                        <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Your Medical Information</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-600 block mb-1">Full Name</label>
                                    <Input value={idName} onChange={(e) => setIdName(e.target.value)} className="bg-white font-semibold" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-600 block mb-1">Medical Condition</label>
                                    <Input value={idCondition} onChange={(e) => setIdCondition(e.target.value)} className="bg-white" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-600 block mb-1">Insulin & Medication Regimen</label>
                                    <Input value={idInsulin} onChange={(e) => setIdInsulin(e.target.value)} className="bg-white" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-600 block mb-1">Emergency Contact Phone</label>
                                    <Input value={idEmergencyContact} onChange={(e) => setIdEmergencyContact(e.target.value)} className="bg-white font-semibold text-[#003E7E]" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-600 block mb-1">Known Allergies / Hospital Notes</label>
                                    <Input value={idAllergies} onChange={(e) => setIdAllergies(e.target.value)} className="bg-white" />
                                </div>
                            </div>
                        </div>

                        {/* Live Printable Wallet Card Preview */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Live Wallet Card Preview (Front & Back)</h3>
                            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#003E7E] to-[#002244] text-white shadow-2xl border-4 border-red-500 relative overflow-hidden space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <div className="h-9 w-9 bg-red-600 rounded-xl flex items-center justify-center text-white font-black text-lg">
                                            +
                                        </div>
                                        <div>
                                            <span className="text-xs font-black uppercase tracking-widest text-red-400">EMERGENCY MEDICAL ID</span>
                                            <h4 className="text-lg font-black">{idName || "Patient Name"}</h4>
                                        </div>
                                    </div>
                                    <Badge className="bg-red-600 text-white font-bold text-[10px]">IF UNCONSCIOUS CALL 108</Badge>
                                </div>

                                <div className="space-y-2 pt-2 border-t border-white/20 text-xs">
                                    <div>
                                        <span className="text-blue-200 text-[10px] uppercase font-bold block">Condition</span>
                                        <p className="font-bold text-white text-sm">{idCondition}</p>
                                    </div>
                                    <div>
                                        <span className="text-blue-200 text-[10px] uppercase font-bold block">Medications</span>
                                        <p className="text-white font-medium">{idInsulin}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                        <div>
                                            <span className="text-blue-200 text-[10px] uppercase font-bold block">Emergency Phone</span>
                                            <p className="font-bold text-yellow-300">{idEmergencyContact}</p>
                                        </div>
                                        <div>
                                            <span className="text-blue-200 text-[10px] uppercase font-bold block">Allergies</span>
                                            <p className="text-white font-medium">{idAllergies}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-white/20 flex justify-between items-center text-[10px] text-blue-200">
                                    <span>Insulin Inside Medical ID Network</span>
                                    <span>Give Sugar/Juice if Confused</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. PRINTABLE RESOURCES & GUIDES */}
                <section className="space-y-8">
                    <div>
                        <h2 className="text-3xl font-black text-[#003E7E]">Downloadable Clinical Tools & Templates</h2>
                        <p className="text-slate-600 text-sm">Free to download, print, and share with your healthcare providers.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {RESOURCES.map((doc) => (
                            <Card key={doc.id} className="border-slate-200 shadow-md hover:shadow-xl transition-all rounded-3xl overflow-hidden flex flex-col justify-between">
                                <CardHeader className="bg-slate-50 border-b p-6">
                                    <div className="flex justify-between items-start">
                                        <Badge className="bg-[#003E7E] text-white font-bold text-xs">{doc.category}</Badge>
                                        <span className="text-xs font-semibold text-slate-500">{doc.pages}</span>
                                    </div>
                                    <CardTitle className="text-xl font-bold text-[#003E7E] mt-3">{doc.title}</CardTitle>
                                    <CardDescription className="text-slate-600 text-sm mt-1">{doc.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                                    <ul className="space-y-2 text-xs text-slate-600">
                                        {doc.content.map((point, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        onClick={() => handleDownloadDoc(doc)}
                                        className="w-full bg-[#003E7E] hover:bg-[#002a5e] font-bold text-xs h-11 rounded-xl"
                                    >
                                        <Download className="h-4 w-4 mr-2" /> View & Print Document
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* 3. QUICK LINK TO CLINICAL CALCULATORS */}
                <section className="bg-gradient-to-r from-[#003E7E] to-[#005bb7] text-white p-8 sm:p-12 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="space-y-3 max-w-xl">
                        <Badge className="bg-[#E31C79] text-white border-none font-bold">DIGITAL HEALTH SUITE</Badge>
                        <h2 className="text-3xl sm:text-4xl font-black">Interactive Insulin & Carb Calculator</h2>
                        <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                            Need to calculate an instant insulin bolus for your meal plate or find the carb count of 40+ Indian dishes? Try our interactive clinical calculator.
                        </p>
                    </div>
                    <Button size="lg" className="bg-[#E31C79] hover:bg-[#c21565] text-white font-bold rounded-full h-14 px-8 shadow-xl shrink-0" asChild>
                        <Link href="/dashboard/analytics">
                            Launch Calculator & Analytics <ExternalLink className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </section>

            </div>

            {/* DOCUMENT PRINTABLE VIEW MODAL */}
            <Dialog open={!!selectedDoc} onOpenChange={(open) => !open && setSelectedDoc(null)}>
                <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-8 rounded-3xl">
                    {selectedDoc && (
                        <div className="space-y-6">
                            <DialogHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge className="bg-[#003E7E] text-white">{selectedDoc.category}</Badge>
                                </div>
                                <DialogTitle className="text-2xl font-black text-[#003E7E]">
                                    {selectedDoc.title}
                                </DialogTitle>
                                <DialogDescription className="text-slate-600">
                                    {selectedDoc.description}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                                <h4 className="font-bold text-slate-800 text-sm uppercase">Document Contents & Guidelines</h4>
                                <ul className="space-y-3 text-sm text-slate-700">
                                    {selectedDoc.content.map((c, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                                            <span>{c}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    className="flex-1 bg-[#003E7E] hover:bg-[#002a5e] font-bold h-12 rounded-xl"
                                    onClick={() => {
                                        window.print();
                                        toast.success("Document sent to printer / PDF exporter");
                                    }}
                                >
                                    <Printer className="h-4 w-4 mr-2" /> Print Document
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 border-slate-300 font-bold h-12 rounded-xl"
                                    onClick={() => setSelectedDoc(null)}
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
