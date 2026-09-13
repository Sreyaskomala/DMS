"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
    Search, MapPin, Building2,
    CheckCircle2, UploadCloud, AlertCircle,
    ChevronRight, Snowflake, Pill, FileText,
    Store, Sparkles, Zap, Navigation
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
    MASTER_MEDICINES,
    HYDERABAD_PHARMACIES,
    MedicineProduct,
    PharmacyPartner,
    ReservationRequest,
    MedicineCategory
} from "@/lib/pharmacy-data";

export default function MarketplacePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [selectedLocality, setSelectedLocality] = useState<string>("All Localities");
    const [selectedProduct, setSelectedProduct] = useState<MedicineProduct | null>(null);
    const [selectedPharmacy, setSelectedPharmacy] = useState<PharmacyPartner>(HYDERABAD_PHARMACIES[0]);
    const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
    const [isJanAushadhiModalOpen, setIsJanAushadhiModalOpen] = useState(false);
    const [isDirectRxModalOpen, setIsDirectRxModalOpen] = useState(false);

    // Reservation Form States
    const [patientName, setPatientName] = useState("");
    const [patientPhone, setPatientPhone] = useState("");
    const [reserveQty, setReserveQty] = useState(1);
    const [fulfilmentMode, setFulfilmentMode] = useState<"pickup" | "local_delivery">("pickup");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [rxFileUploaded, setRxFileUploaded] = useState(false);
    const [rxFileName, setRxFileName] = useState("");
    const [coldChainAgreed, setColdChainAgreed] = useState(true);
    const [activeReservation, setActiveReservation] = useState<ReservationRequest | null>(null);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const categories: Array<"All" | MedicineCategory> = [
        "All",
        "Basal Insulin",
        "Bolus Insulin",
        "Premix Insulin",
        "Oral - Metformin",
        "Oral - SGLT2 / DPP4",
        "Test Strips & CGMs",
        "Supplies & Cold-Chain",
        "Hypo Emergency"
    ];

    const localities = [
        "All Localities",
        "Banjara Hills",
        "Madhapur / Hitec City",
        "Secunderabad",
        "Ameerpet",
        "Kukatpally",
        "Koti / Sultan Bazar",
        "Afzal Gunj / Osmania",
        "Dilsukhnagar"
    ];

    // Filter medicines
    const filteredMedicines = MASTER_MEDICINES.filter(med => {
        const matchesCategory = selectedCategory === "All" || med.category === selectedCategory;
        const matchesSearch =
            med.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            med.popularIndication.toLowerCase().includes(searchQuery.toLowerCase()) ||
            med.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Handle initiating reservation
    const handleOpenReservation = (product: MedicineProduct, preselectedPharmacyId?: string) => {
        setSelectedProduct(product);
        if (preselectedPharmacyId) {
            const found = HYDERABAD_PHARMACIES.find(p => p.id === preselectedPharmacyId);
            if (found) setSelectedPharmacy(found);
        } else {
            // Find first pharmacy having it in stock
            const stockPharma = HYDERABAD_PHARMACIES.find(p => p.inventory[product.id]?.stockStatus === "in_stock") || HYDERABAD_PHARMACIES[0];
            setSelectedPharmacy(stockPharma);
        }
        setReserveQty(1);
        setRxFileUploaded(false);
        setRxFileName("");
        setIsReserveModalOpen(true);
    };

    // Handle Confirming Reservation
    const handleConfirmReservation = (e: React.FormEvent) => {
        e.preventDefault();
        if (!patientName.trim() || !patientPhone.trim()) {
            toast.error("Please enter patient name and contact phone number");
            return;
        }

        if (selectedProduct?.prescriptionClass === "Schedule H" && !rxFileUploaded) {
            toast.error("Prescription is required for Schedule H medicine. Please upload prescription or select existing.", {
                description: "Telangana DCA regulations mandate a valid prescription before dispensing."
            });
            return;
        }

        const totalAmt = (selectedPharmacy.inventory[selectedProduct?.id || ""]?.price || selectedProduct?.localPartnerPrice || 0) * reserveQty;
        const totalMrp = (selectedProduct?.corporateGiantMrp || 0) * reserveQty;
        const savings = Math.max(0, totalMrp - totalAmt);

        const newRes: ReservationRequest = {
            id: `RES-HYD-${Math.floor(1000 + Math.random() * 9000)}`,
            patientName,
            patientPhone,
            items: [{
                productId: selectedProduct!.id,
                productName: selectedProduct!.brandName,
                strength: selectedProduct!.strength,
                quantity: reserveQty,
                unitPrice: selectedPharmacy.inventory[selectedProduct!.id]?.price || selectedProduct!.localPartnerPrice,
                requiresColdChain: selectedProduct!.requiresColdChain
            }],
            pharmacyId: selectedPharmacy.id,
            pharmacyName: selectedPharmacy.name,
            pharmacyLocality: selectedPharmacy.locality,
            fulfilmentMode,
            deliveryAddress: fulfilmentMode === "local_delivery" ? deliveryAddress : undefined,
            prescriptionUploaded: rxFileUploaded,
            prescriptionFileName: rxFileName || "patient_rx_document.pdf",
            status: "confirmed_held",
            createdAt: "Just now",
            holdExpiresAt: "In 4 Hours (Reserved at Counter)",
            totalAmount: totalAmt,
            savingsVersusCorporate: savings,
            coldChainDisclaimerAccepted: coldChainAgreed
        };

        setActiveReservation(newRes);
        setIsReserveModalOpen(false);
        setIsSuccessModalOpen(true);
        toast.success(`Medicine reserved at ${selectedPharmacy.name}!`, {
            description: `Held for 4 hours. You saved ₹${savings} compared to standard market MRP.`
        });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setRxFileUploaded(true);
            setRxFileName(file.name);
            toast.success(`Attached ${file.name}`);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
            {/* Top Pilot Announcement Banner */}
            <div className="bg-[#003E7E] text-white py-2.5 px-4 text-xs font-semibold">
                <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                    <div className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span><strong>India&apos;s Biggest Diabetes Platform · Live Chemist Network:</strong> Connecting patients with verified neighbourhood chemists with cold-chain assurance.</span>
                    </div>
                    <div className="flex items-center gap-3 font-bold text-blue-200">
                        <span>Telangana DCA Verified ✓</span>
                        <span>•</span>
                        <Link href="/pharmacy-portal" className="text-white underline hover:text-[#009CDF]">Chemist Login →</Link>
                    </div>
                </div>
            </div>

            {/* Main Header / Hero Section */}
            <section className="bg-gradient-to-b from-white to-blue-50/50 border-b border-slate-200 pt-10 pb-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center space-y-4">
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 font-bold px-3 py-1 text-xs uppercase tracking-wider">
                            Empowering Local Chemists • Transparent Affordable Pricing
                        </Badge>
                        <h1 className="text-3xl sm:text-5xl font-black text-[#003E7E] tracking-tight">
                            Find My Diabetes Medicine <br />
                            <span className="text-[#009CDF]">At Verified Local Pharmacies</span>
                        </h1>
                        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Find affordable diabetes medicines, check live inventory at trusted neighborhood chemists, compare Jan Aushadhi generic alternatives, and reserve with a 100% cold-chain guarantee.
                        </p>

                        {/* Search and Locality Bar */}
                        <div className="pt-4 max-w-3xl mx-auto">
                            <div className="bg-white p-2 sm:p-3 rounded-2xl shadow-xl border border-slate-200 grid sm:grid-cols-12 gap-2 items-center">
                                <div className="sm:col-span-4 flex items-center gap-2 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-200 text-slate-700">
                                    <MapPin className="h-4 w-4 text-[#E31C79] shrink-0" />
                                    <select
                                        value={selectedLocality}
                                        onChange={(e) => setSelectedLocality(e.target.value)}
                                        className="bg-transparent w-full text-xs sm:text-sm font-semibold outline-none cursor-pointer"
                                    >
                                        {localities.map(loc => (
                                            <option key={loc} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="sm:col-span-6 flex items-center gap-2 px-3 py-2">
                                    <Search className="h-4 w-4 text-[#009CDF] shrink-0" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search Lantus, NovoRapid, Metformin, Accu-Chek..."
                                        className="bg-transparent w-full text-xs sm:text-sm placeholder:text-slate-400 outline-none font-medium"
                                    />
                                    {searchQuery && (
                                        <button onClick={() => setSearchQuery("")} className="text-xs text-slate-400 hover:text-slate-600">Clear</button>
                                    )}
                                </div>

                                <div className="sm:col-span-2">
                                    <Button
                                        onClick={() => setIsDirectRxModalOpen(true)}
                                        className="w-full bg-[#003E7E] hover:bg-[#002a5e] text-white font-bold text-xs h-10 rounded-xl"
                                    >
                                        Upload Rx
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Cost Savings Ticker */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-3xl mx-auto text-left">
                            <div className="bg-white/80 p-3 rounded-xl border border-slate-200 shadow-sm">
                                <div className="text-xs text-slate-500 font-medium">Avg. Patient Savings</div>
                                <div className="text-xl font-black text-emerald-600">20% – 85%</div>
                                <div className="text-[10px] text-slate-400">vs Standard Market MRP</div>
                            </div>
                            <div className="bg-white/80 p-3 rounded-xl border border-slate-200 shadow-sm">
                                <div className="text-xs text-slate-500 font-medium">Jan Aushadhi Insulin</div>
                                <div className="text-xl font-black text-[#003E7E]">₹140 / vial</div>
                                <div className="text-[10px] text-slate-400">PMBJP Kendras in Hyd</div>
                            </div>
                            <div className="bg-white/80 p-3 rounded-xl border border-slate-200 shadow-sm">
                                <div className="text-xs text-slate-500 font-medium">Cold-Chain Assured</div>
                                <div className="text-xl font-black text-[#009CDF]">2°C - 8°C</div>
                                <div className="text-[10px] text-slate-400">Digital logger verified</div>
                            </div>
                            <div className="bg-white/80 p-3 rounded-xl border border-slate-200 shadow-sm">
                                <div className="text-xs text-slate-500 font-medium">Local Chemists</div>
                                <div className="text-xl font-black text-[#E31C79]">8 Verified</div>
                                <div className="text-[10px] text-slate-400">Telangana DCA Reg.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Filter Pills */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                                ? "bg-[#003E7E] text-white shadow-md shadow-blue-900/20"
                                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left: Medicine Catalogue Cards (8 cols) */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-[#003E7E] flex items-center gap-2">
                                <Pill className="h-5 w-5 text-[#009CDF]" />
                                Available Medicines ({filteredMedicines.length})
                            </h2>
                            <span className="text-xs font-medium text-slate-500">
                                Showing prices for <strong className="text-slate-800">{selectedLocality}</strong>
                            </span>
                        </div>

                        {filteredMedicines.length === 0 ? (
                            <Card className="p-8 text-center bg-white border-dashed">
                                <AlertCircle className="h-10 w-10 text-amber-500 mx-auto mb-3" />
                                <h3 className="text-lg font-bold text-slate-800">No exact medicine match found</h3>
                                <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-4">
                                    We couldn&apos;t find &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;Lantus&rdquo;, &ldquo;NovoRapid&rdquo;, &ldquo;Metformin&rdquo;, or upload your doctor&apos;s prescription.
                                </p>
                                <Button onClick={() => setIsDirectRxModalOpen(true)} className="bg-[#003E7E] text-white">
                                    Upload Prescription for Chemist Search
                                </Button>
                            </Card>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-5">
                                {filteredMedicines.map((med) => {
                                    const savingsAmount = med.corporateGiantMrp - med.localPartnerPrice;
                                    const savingsPercent = Math.round((savingsAmount / med.corporateGiantMrp) * 100);

                                    return (
                                        <Card key={med.id} className="bg-white border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                                            <div>
                                                {/* Top Image & Badge Header */}
                                                <div className="relative h-40 bg-slate-100 overflow-hidden">
                                                    <img
                                                        src={med.image}
                                                        alt={med.brandName}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                                                        <Badge className="bg-[#003E7E] text-white text-[10px] font-bold">
                                                            {med.category}
                                                        </Badge>
                                                        {med.requiresColdChain && (
                                                            <Badge className="bg-cyan-600 text-white text-[10px] font-bold flex items-center gap-1">
                                                                <Snowflake className="h-3 w-3" /> 2°C-8°C
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    <div className="absolute top-3 right-3">
                                                        <Badge className="bg-emerald-500 text-white text-[10px] font-black">
                                                            Save {savingsPercent}%
                                                        </Badge>
                                                    </div>

                                                    <div className="absolute bottom-2 left-3 right-3 text-white">
                                                        <div className="text-xs text-blue-200 font-medium truncate">{med.genericName}</div>
                                                        <div className="text-base font-bold leading-tight">{med.brandName}</div>
                                                    </div>
                                                </div>

                                                <CardContent className="p-4 space-y-3">
                                                    <div className="flex items-center justify-between text-xs text-slate-500 border-b pb-2">
                                                        <span>Pack: <strong>{med.packSize}</strong></span>
                                                        <span>Mfg: <strong>{med.manufacturer}</strong></span>
                                                    </div>

                                                    {/* Price Comparison Block */}
                                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                                                        <div className="flex justify-between items-center text-xs">
                                                            <span className="text-slate-400 line-through">Standard MRP: ₹{med.corporateGiantMrp}</span>
                                                            <span className="text-emerald-700 font-bold text-[11px] bg-emerald-50 px-1.5 py-0.5 rounded">
                                                                Save ₹{savingsAmount}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between items-baseline">
                                                            <span className="text-xs font-bold text-slate-700">Local Partner Price:</span>
                                                            <span className="text-xl font-black text-[#003E7E]">₹{med.localPartnerPrice}</span>
                                                        </div>
                                                    </div>

                                                    {/* Jan Aushadhi Low Cost Alternative Pill */}
                                                    {med.janAushadhiAlt && (
                                                        <div
                                                            onClick={() => {
                                                                setSelectedProduct(med);
                                                                setIsJanAushadhiModalOpen(true);
                                                            }}
                                                            className="p-2 bg-amber-50/80 border border-amber-200 rounded-lg text-amber-900 text-xs flex items-center justify-between cursor-pointer hover:bg-amber-100 transition-colors"
                                                        >
                                                            <div className="flex items-center gap-1.5">
                                                                <Sparkles className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                                                                <span className="truncate">
                                                                    <strong>Jan Aushadhi Alt:</strong> ₹{med.janAushadhiAlt.price} ({med.janAushadhiAlt.savingsPercent}% off)
                                                                </span>
                                                            </div>
                                                            <ChevronRight className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                                                        </div>
                                                    )}

                                                    {/* Pharmacy Stock Status Tag */}
                                                    <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                                                        <span className="flex items-center gap-1 text-emerald-600 font-bold">
                                                            <CheckCircle2 className="h-3.5 w-3.5" /> In stock at {med.inStockStoresCount} Hyd Chemists
                                                        </span>
                                                        <span className="text-[11px] text-slate-400">
                                                            {med.prescriptionClass}
                                                        </span>
                                                    </div>
                                                </CardContent>
                                            </div>

                                            <CardFooter className="p-4 pt-0">
                                                <Button
                                                    onClick={() => handleOpenReservation(med)}
                                                    className="w-full bg-[#003E7E] hover:bg-[#002a5e] text-white font-bold h-10 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-900/10"
                                                >
                                                    <Store className="h-4 w-4" /> Reserve at Local Chemist
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Right: Hyderabad Verified Pharmacies Network (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card className="bg-white border-slate-200 shadow-md">
                            <CardHeader className="pb-3 border-b border-slate-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Store className="h-5 w-5 text-[#003E7E]" />
                                        <CardTitle className="text-lg font-bold text-[#003E7E]">Verified Partner Network</CardTitle>
                                    </div>
                                    <Badge className="bg-emerald-100 text-emerald-800 border-none text-[10px] font-bold">
                                        {HYDERABAD_PHARMACIES.length} Verified
                                    </Badge>
                                </div>
                                <CardDescription className="text-xs text-slate-500">
                                    Telangana DCA ODLS verified licensed retail chemists with continuous cold-chain monitoring.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="p-4 space-y-4 max-h-[700px] overflow-y-auto">
                                {HYDERABAD_PHARMACIES.map((pharma) => (
                                    <div
                                        key={pharma.id}
                                        className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50/40 hover:border-blue-200 transition-all space-y-2.5 text-xs"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm">{pharma.name}</h4>
                                                <p className="text-slate-500 flex items-center gap-1 mt-0.5">
                                                    <MapPin className="h-3 w-3 text-[#E31C79]" /> {pharma.locality} ({pharma.areaName})
                                                </p>
                                            </div>
                                            <Badge className="bg-blue-100 text-[#003E7E] text-[10px] font-bold">
                                                ★ {pharma.rating}
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-200/60">
                                            <div>DCA Lic: <strong className="text-slate-800">{pharma.dcaLicenceNo.slice(0, 14)}...</strong></div>
                                            <div className="text-emerald-700 font-bold flex items-center gap-1">
                                                <Snowflake className="h-3 w-3 text-cyan-600" /> {pharma.coldChainTempCurrent}
                                            </div>
                                            <div>Hours: <strong>{pharma.openingHours.split('(')[0]}</strong></div>
                                            <div>Delivery: <strong>{pharma.deliveryTimeEst.split('(')[0]}</strong></div>
                                        </div>

                                        <div className="text-[11px] text-emerald-800 font-medium bg-emerald-50/80 p-1.5 rounded">
                                            💡 {pharma.discountNote}
                                        </div>

                                        <div className="flex items-center justify-between pt-1">
                                            <span className="text-[11px] text-slate-500">
                                                Pharmacist: <strong>{pharma.pharmacistName.split(',')[0]}</strong>
                                            </span>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    setSelectedPharmacy(pharma);
                                                    handleOpenReservation(MASTER_MEDICINES[0], pharma.id);
                                                }}
                                                className="h-7 text-xs border-[#003E7E] text-[#003E7E] hover:bg-blue-50 font-bold"
                                            >
                                                Select Store
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Local Chemist Partner Pitch Banner */}
                        <div className="bg-gradient-to-br from-[#003E7E] to-[#00254d] text-white p-5 rounded-2xl shadow-lg space-y-3 text-xs">
                            <div className="flex items-center gap-2 font-bold text-sm text-blue-200">
                                <Store className="h-5 w-5 text-amber-400" />
                                Are you a Retail Chemist?
                            </div>
                            <p className="text-blue-100 leading-relaxed">
                                Join our network to receive direct digital reservation requests from diabetic patients in your locality and grow your independent pharmacy footfall.
                            </p>
                            <Button size="sm" className="w-full bg-[#009CDF] hover:bg-[#007bb5] text-white font-bold" asChild>
                                <Link href="/pharmacy-portal">Open Pharmacy Portal &amp; Register</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ----------------- MODAL: RESERVE AT LOCAL PHARMACY ----------------- */}
            <Dialog open={isReserveModalOpen} onOpenChange={setIsReserveModalOpen}>
                <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="flex items-center gap-2">
                            <Store className="h-5 w-5 text-[#003E7E]" />
                            <DialogTitle className="text-xl font-bold text-[#003E7E]">
                                Reserve Medicine at Local Pharmacy
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-xs text-slate-500">
                            Hold your diabetes medication at verified local partner chemist with 100% price transparency and cold-chain assurance.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedProduct && (
                        <form onSubmit={handleConfirmReservation} className="space-y-4 text-xs">
                            {/* Product Selected Card */}
                            <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200 flex justify-between items-start">
                                <div className="space-y-1">
                                    <Badge className="bg-[#003E7E] text-white text-[10px] font-bold">
                                        {selectedProduct.category}
                                    </Badge>
                                    <h4 className="text-base font-bold text-slate-900">{selectedProduct.brandName}</h4>
                                    <p className="text-slate-600 text-xs">{selectedProduct.genericName} • {selectedProduct.strength}</p>
                                    <div className="text-emerald-700 font-bold text-xs pt-1">
                                        Partner Chemist Price: ₹{selectedPharmacy.inventory[selectedProduct.id]?.price || selectedProduct.localPartnerPrice}
                                        <span className="text-slate-400 line-through ml-2">MRP ₹{selectedProduct.corporateGiantMrp}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                                    <button
                                        type="button"
                                        onClick={() => setReserveQty(Math.max(1, reserveQty - 1))}
                                        className="font-bold text-slate-700 text-sm px-1.5"
                                    >-</button>
                                    <span className="font-black text-sm px-1">{reserveQty}</span>
                                    <button
                                        type="button"
                                        onClick={() => setReserveQty(reserveQty + 1)}
                                        className="font-bold text-slate-700 text-sm px-1.5"
                                    >+</button>
                                </div>
                            </div>

                            {/* Pharmacy Selection */}
                            <div className="space-y-1.5">
                                <label className="font-bold text-slate-700 flex justify-between">
                                    <span>Select Partner Pharmacy:</span>
                                    <span className="text-emerald-600 font-semibold">Telangana DCA Licensed ✓</span>
                                </label>
                                <select
                                    value={selectedPharmacy.id}
                                    onChange={(e) => {
                                        const p = HYDERABAD_PHARMACIES.find(item => item.id === e.target.value);
                                        if (p) setSelectedPharmacy(p);
                                    }}
                                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-[#003E7E]"
                                >
                                    {HYDERABAD_PHARMACIES.map(p => (
                                        <option key={p.id} value={p.id}>
                                            {p.name} ({p.locality}) — ₹{p.inventory[selectedProduct.id]?.price || selectedProduct.localPartnerPrice}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Fulfilment Mode */}
                            <div className="grid grid-cols-2 gap-2">
                                <div
                                    onClick={() => setFulfilmentMode("pickup")}
                                    className={`p-3 rounded-xl border cursor-pointer transition-all ${fulfilmentMode === "pickup"
                                        ? "bg-blue-50 border-[#003E7E] text-[#003E7E] font-bold"
                                        : "bg-white border-slate-200 text-slate-600"
                                        }`}
                                >
                                    <div className="flex items-center gap-1.5">
                                        <Store className="h-4 w-4" />
                                        <span>Instant Store Pickup</span>
                                    </div>
                                    <p className="text-[11px] font-normal text-slate-500 mt-1">
                                        Held for 4 hours at counter. Pay at store.
                                    </p>
                                </div>

                                <div
                                    onClick={() => setFulfilmentMode("local_delivery")}
                                    className={`p-3 rounded-xl border cursor-pointer transition-all ${fulfilmentMode === "local_delivery"
                                        ? "bg-blue-50 border-[#003E7E] text-[#003E7E] font-bold"
                                        : "bg-white border-slate-200 text-slate-600"
                                        }`}
                                >
                                    <div className="flex items-center gap-1.5">
                                        <Zap className="h-4 w-4 text-amber-600" />
                                        <span>Direct Local Delivery</span>
                                    </div>
                                    <p className="text-[11px] font-normal text-slate-500 mt-1">
                                        Dispatched in 30-45m in cold-chain pouch.
                                    </p>
                                </div>
                            </div>

                            {fulfilmentMode === "local_delivery" && (
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-700">Delivery Address:</label>
                                    <Input
                                        value={deliveryAddress}
                                        onChange={(e) => setDeliveryAddress(e.target.value)}
                                        placeholder="Flat/House No, Street, Locality, City..."
                                        className="text-xs h-9"
                                        required
                                    />
                                </div>
                            )}

                            {/* Patient Contact Info */}
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-700">Patient Name:</label>
                                    <Input
                                        value={patientName}
                                        onChange={(e) => setPatientName(e.target.value)}
                                        placeholder="e.g. Sreyas K."
                                        className="text-xs h-9"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-700">Mobile Phone (WhatsApp):</label>
                                    <Input
                                        value={patientPhone}
                                        onChange={(e) => setPatientPhone(e.target.value)}
                                        placeholder="+91 98490 00000"
                                        className="text-xs h-9"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Prescription Upload (Mandatory for Schedule H) */}
                            {selectedProduct.prescriptionClass === "Schedule H" && (
                                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-amber-900 flex items-center gap-1.5">
                                            <FileText className="h-4 w-4 text-amber-700" />
                                            Prescription Required (Schedule H Drug)
                                        </span>
                                        <span className="text-[10px] text-amber-700 font-semibold">Telangana DCA Rule</span>
                                    </div>
                                    <p className="text-[11px] text-amber-800">
                                        To ensure patient safety, our registered pharmacist will verify your prescription before handoff.
                                    </p>

                                    <div className="flex items-center gap-3 pt-1">
                                        <label className="cursor-pointer bg-white border border-amber-300 hover:bg-amber-100/50 text-amber-900 px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-2 transition-all">
                                            <UploadCloud className="h-4 w-4" />
                                            <span>{rxFileUploaded ? "Change Prescription" : "Upload Doctor's Rx"}</span>
                                            <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="hidden" />
                                        </label>
                                        {rxFileUploaded ? (
                                            <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                                                <CheckCircle2 className="h-3.5 w-3.5" /> {rxFileName}
                                            </span>
                                        ) : (
                                            <span className="text-slate-400 text-[11px]">JPG, PNG or PDF (Max 5MB)</span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Cold Chain Disclaimer */}
                            {selectedProduct.requiresColdChain && (
                                <div className="p-2.5 bg-cyan-50 border border-cyan-200 rounded-xl text-cyan-950 text-[11px] flex items-center gap-2">
                                    <Snowflake className="h-4 w-4 text-cyan-700 shrink-0" />
                                    <span>
                                        <strong>Cold-Chain Assured (2°C-8°C):</strong> Store refrigerated upon pickup. Pharmacy packs with certified cold-gel insulation.
                                    </span>
                                </div>
                            )}

                            {/* Total & Savings Summary */}
                            <div className="pt-2 border-t flex justify-between items-center">
                                <div>
                                    <div className="text-xs text-slate-500">Estimated Total:</div>
                                    <div className="text-2xl font-black text-[#003E7E]">
                                        ₹{(selectedPharmacy.inventory[selectedProduct.id]?.price || selectedProduct.localPartnerPrice) * reserveQty}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-emerald-600 font-bold">
                                        You Save: ₹{Math.max(0, (selectedProduct.corporateGiantMrp - (selectedPharmacy.inventory[selectedProduct.id]?.price || selectedProduct.localPartnerPrice)) * reserveQty)}
                                    </div>
                                    <div className="text-[10px] text-slate-400">Pay directly to chemist</div>
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-[#003E7E] hover:bg-[#002a5e] text-white font-bold h-11 text-sm rounded-xl">
                                Confirm 4-Hour Reservation
                            </Button>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            {/* ----------------- MODAL: RESERVATION SUCCESS CONFIRMATION ----------------- */}
            <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
                <DialogContent className="max-w-md text-center">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-[#003E7E]">
                        Reservation Confirmed!
                    </DialogTitle>
                    <DialogDescription className="text-xs text-slate-500">
                        Your medicine has been placed on 4-hour hold at the partner pharmacy counter.
                    </DialogDescription>

                    {activeReservation && (
                        <div className="bg-slate-50 p-4 rounded-xl border text-left text-xs space-y-2 mt-2">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-slate-500">Reservation ID:</span>
                                <strong className="font-mono text-sm text-[#003E7E]">{activeReservation.id}</strong>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Medicine:</span>
                                <strong>{activeReservation.items[0]?.productName} ({activeReservation.items[0]?.quantity}x)</strong>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Chemist:</span>
                                <strong>{activeReservation.pharmacyName}</strong>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Locality:</span>
                                <strong>{activeReservation.pharmacyLocality}</strong>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Hold Expires:</span>
                                <strong className="text-amber-700">{activeReservation.holdExpiresAt}</strong>
                            </div>
                            <div className="flex justify-between border-t pt-2 text-sm font-bold">
                                <span>Amount Payable at Store:</span>
                                <span className="text-[#003E7E]">₹{activeReservation.totalAmount}</span>
                            </div>
                            <div className="text-emerald-700 font-semibold text-[11px] bg-emerald-50 p-1.5 rounded text-center">
                                🎉 You saved ₹{activeReservation.savingsVersusCorporate} compared to standard market MRP!
                            </div>
                        </div>
                    )}

                    <div className="flex gap-2 pt-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsSuccessModalOpen(false)}
                            className="flex-1 text-xs font-bold"
                        >
                            Back to Medicines
                        </Button>
                        <Button
                            onClick={() => {
                                setIsSuccessModalOpen(false);
                                toast.info("Opening Hyderabad navigation directions...");
                            }}
                            className="flex-1 bg-[#003E7E] text-white text-xs font-bold flex items-center justify-center gap-1.5"
                        >
                            <Navigation className="h-3.5 w-3.5" /> Navigate to Store
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* ----------------- MODAL: JAN AUSHADHI GENERIC ALTERNATIVE ----------------- */}
            <Dialog open={isJanAushadhiModalOpen} onOpenChange={setIsJanAushadhiModalOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <div className="flex items-center gap-2 text-amber-800">
                            <Sparkles className="h-5 w-5 text-amber-600" />
                            <DialogTitle className="text-xl font-bold text-slate-900">
                                Pradhan Mantri Jan Aushadhi Alternative
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-xs text-slate-600">
                            Government-subsidized generic bio-equivalents available at authorized PMBJP Kendras in Hyderabad.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedProduct?.janAushadhiAlt && (
                        <div className="space-y-4 text-xs">
                            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Badge className="bg-amber-600 text-white text-[10px] font-bold">
                                            Govt PMBJP Kendra Generic
                                        </Badge>
                                        <h4 className="text-base font-bold text-slate-900 mt-1">{selectedProduct.janAushadhiAlt.name}</h4>
                                        <p className="text-slate-600">{selectedProduct.janAushadhiAlt.genericName}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-slate-400 line-through">Branded MRP: ₹{selectedProduct.corporateGiantMrp}</div>
                                        <div className="text-2xl font-black text-emerald-700">₹{selectedProduct.janAushadhiAlt.price}</div>
                                        <div className="text-[10px] text-emerald-800 font-bold">Save {selectedProduct.janAushadhiAlt.savingsPercent}%</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                                <h5 className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                                    <Building2 className="h-4 w-4 text-[#003E7E]" /> Verified Jan Aushadhi Centers in Hyderabad:
                                </h5>
                                <div className="space-y-2 text-[11px] text-slate-600">
                                    <div className="p-2 bg-white rounded border">
                                        <strong>1. PMBJP Osmania Hospital Kendra (Afzal Gunj):</strong>
                                        <p>Opp Emergency Wing, Hyderabad • Ph: 040-24600121</p>
                                    </div>
                                    <div className="p-2 bg-white rounded border">
                                        <strong>2. Jan Aushadhi Kendra Gandhi Hospital:</strong>
                                        <p>Musheerabad Complex, Secunderabad • Ph: 040-27505566</p>
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={() => {
                                    setIsJanAushadhiModalOpen(false);
                                    handleOpenReservation(selectedProduct, "pharma-7");
                                }}
                                className="w-full bg-[#003E7E] text-white font-bold text-xs h-10"
                            >
                                Reserve at Osmania Jan Aushadhi Kendra
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* ----------------- MODAL: DIRECT PRESCRIPTION UPLOAD ----------------- */}
            <Dialog open={isDirectRxModalOpen} onOpenChange={setIsDirectRxModalOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <div className="flex items-center gap-2">
                            <UploadCloud className="h-5 w-5 text-[#003E7E]" />
                            <DialogTitle className="text-xl font-bold text-[#003E7E]">
                                Upload Doctor&apos;s Prescription
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-xs text-slate-500">
                            Our registered pharmacist will review your prescription, find the best prices across partner chemists, and contact you.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if (!rxFileUploaded) {
                            toast.error("Please select a prescription file to upload.");
                            return;
                        }
                        setIsDirectRxModalOpen(false);
                        toast.success("Prescription uploaded successfully!", {
                            description: "A verified partner pharmacist will review and WhatsApp you in 15 minutes."
                        });
                    }} className="space-y-4 text-xs">
                        <div className="border-2 border-dashed border-slate-300 hover:border-[#003E7E] p-6 rounded-2xl text-center bg-slate-50/50 cursor-pointer">
                            <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="hidden" id="direct-rx-upload" />
                            <label htmlFor="direct-rx-upload" className="cursor-pointer space-y-2 block">
                                <UploadCloud className="h-10 w-10 text-[#009CDF] mx-auto" />
                                <div className="font-bold text-slate-800 text-sm">
                                    {rxFileUploaded ? rxFileName : "Click or Drag & Drop Prescription"}
                                </div>
                                <p className="text-slate-400 text-[11px]">Supports PDF, JPG, PNG (Max 10MB)</p>
                            </label>
                        </div>

                        <div className="space-y-1">
                            <label className="font-bold text-slate-700">Patient Mobile Number:</label>
                            <Input placeholder="+91 98490 12345" className="h-9 text-xs" required />
                        </div>

                        <div className="space-y-1">
                            <label className="font-bold text-slate-700">Preferred Locality / Area:</label>
                            <select className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium">
                                {localities.filter(l => l !== "All Localities").map(loc => (
                                    <option key={loc} value={loc}>{loc}</option>
                                ))}
                            </select>
                        </div>

                        <Button type="submit" className="w-full bg-[#003E7E] text-white font-bold h-10 text-xs rounded-xl">
                            Submit Prescription for Chemist Verification
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
