"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
    Store, ShieldCheck, CheckCircle2, Clock, MapPin,
    Search, Snowflake, Phone, FileText,
    Pill, TrendingUp, RefreshCw,
    XCircle, Check, Eye
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
    HYDERABAD_PHARMACIES,
    MASTER_MEDICINES,
    INITIAL_RESERVATIONS,
    LOCAL_DEMAND_RADAR,
    PharmacyPartner,
    ReservationRequest,
    StockStatus
} from "@/lib/pharmacy-data";

export default function PharmacyPortalPage() {
    const [selectedPharmacy, setSelectedPharmacy] = useState<PharmacyPartner>(HYDERABAD_PHARMACIES[0]);
    const [reservations, setReservations] = useState<ReservationRequest[]>(INITIAL_RESERVATIONS);
    const [selectedRxDoc, setSelectedRxDoc] = useState<string | null>(null);
    const [searchInventory, setSearchInventory] = useState("");
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);

    // Filter pharmacy's inventory
    const inventoryList = MASTER_MEDICINES.map((med) => {
        const itemOffer = selectedPharmacy.inventory[med.id] || {
            stockStatus: "out_of_stock" as StockStatus,
            quantity: 0,
            lastConfirmed: "Needs update",
            price: med.localPartnerPrice,
        };
        return {
            ...med,
            offer: itemOffer,
        };
    }).filter((item) =>
        item.brandName.toLowerCase().includes(searchInventory.toLowerCase()) ||
        item.genericName.toLowerCase().includes(searchInventory.toLowerCase()) ||
        item.category.toLowerCase().includes(searchInventory.toLowerCase())
    );

    // Reservation status actions
    const handleUpdateStatus = (id: string, newStatus: ReservationRequest["status"]) => {
        setReservations((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
        if (newStatus === "confirmed_held") {
            toast.success(`Request ${id} Confirmed!`, {
                description: "Stock held for 4 hours. Patient notified on WhatsApp."
            });
        } else if (newStatus === "ready_for_pickup") {
            toast.success(`Request ${id} marked Ready for Pickup!`);
        } else if (newStatus === "completed") {
            toast.success(`Request ${id} marked Dispensed & Completed.`);
        } else if (newStatus === "rejected") {
            toast.info(`Request ${id} rejected.`);
        }
    };

    // Fast stock updater
    const handleToggleStock = (medId: string, currentStatus: StockStatus) => {
        const nextStatus: StockStatus =
            currentStatus === "in_stock" ? "low_stock" : currentStatus === "low_stock" ? "out_of_stock" : "in_stock";

        setSelectedPharmacy((prev) => ({
            ...prev,
            inventory: {
                ...prev.inventory,
                [medId]: {
                    ...(prev.inventory[medId] || { quantity: 10, price: 500 }),
                    stockStatus: nextStatus,
                    lastConfirmed: "Just now",
                },
            },
        }));

        toast.success("Stock status updated instantly!");
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
            {/* Header for Pharmacy Partner Portal */}
            <header className="bg-[#003E7E] text-white border-b-4 border-[#009CDF] sticky top-0 z-40 shadow-lg">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-white text-[#003E7E] rounded-xl flex items-center justify-center font-black">
                            <Store className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-black tracking-tight">InsulinInside</span>
                                <Badge className="bg-[#009CDF] text-white text-[10px] font-bold">
                                    Chemist Partner Portal
                                </Badge>
                            </div>
                            <p className="text-[11px] text-blue-200">
                                Hyderabad Local Pharmacy Network · Telangana DCA Compliant
                            </p>
                        </div>
                    </div>

                    {/* Pharmacy Switcher & Controls */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 bg-[#002b59] px-3 py-1.5 rounded-xl border border-blue-400/30 text-xs">
                            <span className="text-blue-300">Active Store:</span>
                            <select
                                value={selectedPharmacy.id}
                                onChange={(e) => {
                                    const p = HYDERABAD_PHARMACIES.find((item) => item.id === e.target.value);
                                    if (p) setSelectedPharmacy(p);
                                }}
                                className="bg-transparent font-bold text-white outline-none cursor-pointer"
                            >
                                {HYDERABAD_PHARMACIES.map((p) => (
                                    <option key={p.id} value={p.id} className="text-slate-900">
                                        {p.name} ({p.locality})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Button
                            size="sm"
                            onClick={() => setIsRegModalOpen(true)}
                            className="bg-[#E31C79] hover:bg-[#c21565] text-white font-bold text-xs rounded-xl"
                        >
                            + Register New Store
                        </Button>
                    </div>
                </div>
            </header>

            {/* Store Information & KPI Bar */}
            <div className="bg-white border-b border-slate-200 py-6">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-black text-[#003E7E]">{selectedPharmacy.name}</h1>
                                <Badge className="bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 border-none">
                                    <ShieldCheck className="h-3.5 w-3.5" /> DCA Verified: {selectedPharmacy.dcaLicenceNo}
                                </Badge>
                            </div>
                            <p className="text-xs text-slate-500 flex items-center gap-2">
                                <MapPin className="h-3.5 w-3.5 text-[#E31C79]" /> {selectedPharmacy.address}
                                <span>•</span>
                                <span>Pharmacist: <strong>{selectedPharmacy.pharmacistName}</strong></span>
                            </p>
                        </div>

                        {/* Cold-Chain & Open Status Indicator */}
                        <div className="flex items-center gap-3">
                            <div className="bg-cyan-50 border border-cyan-200 px-3.5 py-2 rounded-xl text-xs text-cyan-900 flex items-center gap-2">
                                <Snowflake className="h-4 w-4 text-cyan-700 animate-pulse" />
                                <div>
                                    <div className="text-[10px] text-cyan-700 font-semibold">Cold Storage Temp:</div>
                                    <strong className="text-cyan-900">{selectedPharmacy.coldChainTempCurrent}</strong>
                                </div>
                            </div>

                            <div className="bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                                <div>
                                    <div className="text-[10px] text-emerald-700 font-semibold">Store Status:</div>
                                    <strong className="text-emerald-900">Accepting Digital Orders</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Tabs Container */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <Tabs defaultValue="requests" className="w-full space-y-6">
                    <TabsList className="grid w-full grid-cols-4 bg-slate-200/70 p-1.5 rounded-2xl max-w-2xl mx-auto">
                        <TabsTrigger
                            value="requests"
                            className="data-[state=active]:bg-[#003E7E] data-[state=active]:text-white font-bold text-xs sm:text-sm rounded-xl py-2.5"
                        >
                            <FileText className="h-4 w-4 mr-1.5 hidden sm:inline" />
                            Incoming Requests ({reservations.filter((r) => r.status !== "completed").length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="inventory"
                            className="data-[state=active]:bg-[#003E7E] data-[state=active]:text-white font-bold text-xs sm:text-sm rounded-xl py-2.5"
                        >
                            <Pill className="h-4 w-4 mr-1.5 hidden sm:inline" />
                            Stock Manager
                        </TabsTrigger>
                        <TabsTrigger
                            value="demand"
                            className="data-[state=active]:bg-[#003E7E] data-[state=active]:text-white font-bold text-xs sm:text-sm rounded-xl py-2.5"
                        >
                            <TrendingUp className="h-4 w-4 mr-1.5 hidden sm:inline" />
                            Demand Radar
                        </TabsTrigger>
                        <TabsTrigger
                            value="compliance"
                            className="data-[state=active]:bg-[#003E7E] data-[state=active]:text-white font-bold text-xs sm:text-sm rounded-xl py-2.5"
                        >
                            <ShieldCheck className="h-4 w-4 mr-1.5 hidden sm:inline" />
                            DCA Compliance
                        </TabsTrigger>
                    </TabsList>

                    {/* ---------------- TAB 1: INCOMING REQUESTS ---------------- */}
                    <TabsContent value="requests" className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold text-[#003E7E]">Patient Reservation Queue</h3>
                                <p className="text-xs text-slate-500">
                                    Prescription medicines must be reviewed by the on-duty registered pharmacist before dispensing.
                                </p>
                            </div>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toast.info("Queue refreshed.")}
                                className="text-xs font-bold"
                            >
                                <RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh
                            </Button>
                        </div>

                        <div className="grid gap-4">
                            {reservations.map((req) => (
                                <Card
                                    key={req.id}
                                    className={`bg-white border-slate-200 shadow-md ${req.status === "pending_pharmacy_review"
                                        ? "border-l-4 border-l-amber-500"
                                        : req.status === "confirmed_held"
                                            ? "border-l-4 border-l-[#009CDF]"
                                            : "border-l-4 border-l-emerald-500"
                                        }`}
                                >
                                    <CardContent className="p-5 space-y-4">
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b pb-3">
                                            <div className="flex items-center gap-3">
                                                <span className="text-base font-mono font-black text-[#003E7E]">{req.id}</span>
                                                <Badge
                                                    className={
                                                        req.status === "pending_pharmacy_review"
                                                            ? "bg-amber-100 text-amber-800 border-none text-[10px] font-bold"
                                                            : req.status === "confirmed_held"
                                                                ? "bg-blue-100 text-[#003E7E] border-none text-[10px] font-bold"
                                                                : "bg-emerald-100 text-emerald-800 border-none text-[10px] font-bold"
                                                    }
                                                >
                                                    {req.status === "pending_pharmacy_review"
                                                        ? "⏳ Awaiting Pharmacist Review"
                                                        : req.status === "confirmed_held"
                                                            ? "🔒 Stock Held (4 Hours)"
                                                            : req.status === "ready_for_pickup"
                                                                ? "📦 Ready for Pickup"
                                                                : "✓ Completed"}
                                                </Badge>
                                            </div>
                                            <div className="text-xs text-slate-500 flex items-center gap-2">
                                                <Clock className="h-3.5 w-3.5" /> Received: {req.createdAt}
                                            </div>
                                        </div>

                                        {/* Items details */}
                                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                                            <div>
                                                <div className="text-slate-400 font-medium">Patient:</div>
                                                <strong className="text-slate-800 text-sm">{req.patientName}</strong>
                                                <div className="text-slate-500 flex items-center gap-1 mt-0.5">
                                                    <Phone className="h-3 w-3 text-emerald-600" /> {req.patientPhone}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-slate-400 font-medium">Prescribed Medicines:</div>
                                                {req.items.map((item, idx) => (
                                                    <div key={idx} className="font-bold text-slate-800">
                                                        {item.productName} ({item.quantity}x)
                                                        {item.requiresColdChain && (
                                                            <span className="ml-1 text-cyan-600 font-semibold text-[10px]">
                                                                [Cold-Chain 2-8°C]
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            <div>
                                                <div className="text-slate-400 font-medium">Fulfilment Mode:</div>
                                                <strong className="text-slate-800 uppercase">
                                                    {req.fulfilmentMode === "pickup" ? "🏪 Store Counter Pickup" : "🚚 Local Delivery"}
                                                </strong>
                                                {req.deliveryAddress && (
                                                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">{req.deliveryAddress}</p>
                                                )}
                                            </div>

                                            <div>
                                                <div className="text-slate-400 font-medium">Payable Amount:</div>
                                                <div className="text-lg font-black text-[#003E7E]">₹{req.totalAmount}</div>
                                                <div className="text-emerald-600 font-bold text-[10px]">Patient saves ₹{req.savingsVersusCorporate}</div>
                                            </div>
                                        </div>

                                        {/* Prescription File Preview */}
                                        {req.prescriptionUploaded && (
                                            <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
                                                <div className="flex items-center gap-2 text-[#003E7E] font-medium">
                                                    <FileText className="h-4 w-4 text-[#009CDF]" />
                                                    <span>Prescription attached: <strong>{req.prescriptionFileName}</strong></span>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => setSelectedRxDoc(req.prescriptionFileName || "Prescription")}
                                                    className="h-7 text-xs font-bold border-[#003E7E] text-[#003E7E]"
                                                >
                                                    <Eye className="h-3 w-3 mr-1" /> View Prescription
                                                </Button>
                                            </div>
                                        )}

                                        {/* Actions Bar */}
                                        <div className="flex flex-wrap gap-2 pt-2 border-t justify-end">
                                            {req.status === "pending_pharmacy_review" && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleUpdateStatus(req.id, "rejected")}
                                                        className="text-xs border-red-200 text-red-600 hover:bg-red-50"
                                                    >
                                                        <XCircle className="h-3.5 w-3.5 mr-1" /> Reject Request
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleUpdateStatus(req.id, "confirmed_held")}
                                                        className="text-xs bg-[#003E7E] hover:bg-[#002a5e] text-white font-bold"
                                                    >
                                                        <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-emerald-400" />
                                                        Verify Rx &amp; Hold Stock (4 Hours)
                                                    </Button>
                                                </>
                                            )}

                                            {req.status === "confirmed_held" && (
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleUpdateStatus(req.id, "ready_for_pickup")}
                                                    className="text-xs bg-[#009CDF] hover:bg-[#007bb5] text-white font-bold"
                                                >
                                                    Mark Packed &amp; Ready for Pickup
                                                </Button>
                                            )}

                                            {req.status === "ready_for_pickup" && (
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleUpdateStatus(req.id, "completed")}
                                                    className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                                                >
                                                    <Check className="h-3.5 w-3.5 mr-1" /> Dispensed &amp; Payment Received
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* ---------------- TAB 2: INVENTORY & STOCK MANAGER ---------------- */}
                    <TabsContent value="inventory" className="space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-[#003E7E]">Catalogue Stock &amp; Freshness Manager</h3>
                                <p className="text-xs text-slate-500">
                                    Click any medicine to toggle live availability status for diabetic patients in your locality.
                                </p>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-72 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                                <Search className="h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    value={searchInventory}
                                    onChange={(e) => setSearchInventory(e.target.value)}
                                    placeholder="Search catalogue..."
                                    className="bg-transparent text-xs outline-none w-full font-medium"
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md">
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left">
                                    <thead className="bg-slate-100 text-slate-600 font-bold border-b">
                                        <tr>
                                            <th className="p-3.5">Medicine Brand &amp; Strength</th>
                                            <th className="p-3.5">Category</th>
                                            <th className="p-3.5">Storage</th>
                                            <th className="p-3.5">Your Selling Price</th>
                                            <th className="p-3.5">Stock Status</th>
                                            <th className="p-3.5 text-right">Quick Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {inventoryList.map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                                                <td className="p-3.5">
                                                    <div className="font-bold text-slate-900 text-sm">{item.brandName}</div>
                                                    <div className="text-slate-500 text-[11px]">{item.genericName} • {item.packSize}</div>
                                                </td>
                                                <td className="p-3.5">
                                                    <Badge className="bg-slate-100 text-[#003E7E] border-slate-200 text-[10px]">
                                                        {item.category}
                                                    </Badge>
                                                </td>
                                                <td className="p-3.5">
                                                    {item.requiresColdChain ? (
                                                        <span className="text-cyan-700 font-bold flex items-center gap-1 text-[11px]">
                                                            <Snowflake className="h-3 w-3" /> 2°C-8°C
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-500 text-[11px]">Room Temp</span>
                                                    )}
                                                </td>
                                                <td className="p-3.5 font-bold text-slate-800 text-sm">
                                                    ₹{item.offer.price}
                                                    <span className="text-[10px] text-slate-400 line-through ml-1">MRP ₹{item.corporateGiantMrp}</span>
                                                </td>
                                                <td className="p-3.5">
                                                    <Badge
                                                        className={
                                                            item.offer.stockStatus === "in_stock"
                                                                ? "bg-emerald-100 text-emerald-800 border-none text-[10px] font-bold"
                                                                : item.offer.stockStatus === "low_stock"
                                                                    ? "bg-amber-100 text-amber-800 border-none text-[10px] font-bold"
                                                                    : "bg-red-100 text-red-800 border-none text-[10px] font-bold"
                                                        }
                                                    >
                                                        {item.offer.stockStatus === "in_stock"
                                                            ? "In Stock"
                                                            : item.offer.stockStatus === "low_stock"
                                                                ? "Low Stock"
                                                                : "Out of Stock"}
                                                    </Badge>
                                                    <div className="text-[10px] text-slate-400 mt-0.5">{item.offer.lastConfirmed}</div>
                                                </td>
                                                <td className="p-3.5 text-right">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleToggleStock(item.id, item.offer.stockStatus)}
                                                        className="text-xs font-bold h-8 border-slate-300 hover:bg-blue-50 hover:text-[#003E7E]"
                                                    >
                                                        Toggle Stock
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabsContent>

                    {/* ---------------- TAB 3: LOCAL DEMAND RADAR ---------------- */}
                    <TabsContent value="demand" className="space-y-4">
                        <div className="bg-gradient-to-r from-[#003E7E] to-[#00254d] text-white p-6 rounded-2xl shadow-lg space-y-2">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-6 w-6 text-amber-400" />
                                <h3 className="text-xl font-bold">Hyderabad Diabetes Demand Radar</h3>
                            </div>
                            <p className="text-xs text-blue-200 max-w-2xl leading-relaxed">
                                Real-time search intelligence from patients within a 5km radius of {selectedPharmacy.locality}. Stock up on these high-demand items to meet neighbourhood patient demand and grow your store footfall.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {LOCAL_DEMAND_RADAR.map((item) => (
                                <Card key={item.id} className="bg-white border-slate-200 shadow-md">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-sm font-bold text-[#003E7E]">{item.medicineName}</CardTitle>
                                            <Badge className="bg-blue-100 text-[#003E7E] text-[10px] font-black">
                                                {item.searchesCountLast24h} Searches (24h)
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-2 text-xs">
                                        <div className="flex justify-between text-slate-500">
                                            <span>Local Market Avg Price:</span>
                                            <strong className="text-slate-800">₹{item.averageLocalPrice}</strong>
                                        </div>
                                        <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px]">
                                            💡 <strong>Recommended Action:</strong> {item.suggestedStockAction}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="pt-0">
                                        <Button
                                            size="sm"
                                            onClick={() => toast.success("Added reorder alert for this medicine")}
                                            className="w-full bg-[#003E7E] text-white text-xs font-bold h-8"
                                        >
                                            Set Reorder Alert
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* ---------------- TAB 4: COMPLIANCE & COLD-CHAIN ---------------- */}
                    <TabsContent value="compliance" className="space-y-4">
                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* License Info */}
                            <Card className="bg-white border-slate-200 shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-[#003E7E] flex items-center gap-2">
                                        <ShieldCheck className="h-5 w-5 text-emerald-600" />
                                        Telangana DCA Licensing Compliance
                                    </CardTitle>
                                    <CardDescription className="text-xs">
                                        Verified through Telangana Drugs Control Administration Online Licensing System (ODLS).
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3 text-xs">
                                    <div className="flex justify-between p-2.5 bg-slate-50 rounded-lg">
                                        <span className="text-slate-500">Retail Drug License (Form 20 &amp; 21):</span>
                                        <strong className="font-mono text-slate-900">{selectedPharmacy.dcaLicenceNo}</strong>
                                    </div>
                                    <div className="flex justify-between p-2.5 bg-slate-50 rounded-lg">
                                        <span className="text-slate-500">Registered Pharmacist on Duty:</span>
                                        <strong className="text-slate-900">{selectedPharmacy.pharmacistName}</strong>
                                    </div>
                                    <div className="flex justify-between p-2.5 bg-slate-50 rounded-lg">
                                        <span className="text-slate-500">ODLS Verification Status:</span>
                                        <span className="text-emerald-700 font-bold">Active &amp; Valid ✓</span>
                                    </div>
                                    <div className="flex justify-between p-2.5 bg-slate-50 rounded-lg">
                                        <span className="text-slate-500">Last Inspection / Audit:</span>
                                        <span className="text-slate-800">{selectedPharmacy.dcaVerifiedDate}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Cold-Chain Log */}
                            <Card className="bg-white border-slate-200 shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-[#003E7E] flex items-center gap-2">
                                        <Snowflake className="h-5 w-5 text-cyan-600" />
                                        Digital Cold-Chain Temperature Log
                                    </CardTitle>
                                    <CardDescription className="text-xs">
                                        Standard operating temperature: 2°C - 8°C with dual power-backup UPS.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3 text-xs">
                                    <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-xl flex items-center justify-between">
                                        <div>
                                            <div className="text-[11px] text-cyan-700 font-medium">Main Insulin Refrigerator:</div>
                                            <div className="text-2xl font-black text-cyan-950">{selectedPharmacy.coldChainTempCurrent}</div>
                                        </div>
                                        <Badge className="bg-emerald-600 text-white font-bold">Within Safe Range</Badge>
                                    </div>

                                    <div className="space-y-1.5 text-[11px] text-slate-600">
                                        <div className="flex justify-between p-2 border-b">
                                            <span>Morning Log (08:00 AM):</span>
                                            <strong>3.9°C (Logged by Pharmacist)</strong>
                                        </div>
                                        <div className="flex justify-between p-2 border-b">
                                            <span>Afternoon Log (02:00 PM):</span>
                                            <strong>4.2°C (Logged by Pharmacist)</strong>
                                        </div>
                                        <div className="flex justify-between p-2">
                                            <span>Backup Power Test:</span>
                                            <strong className="text-emerald-700">UPS 8-Hour Battery Normal ✓</strong>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* ----------------- MODAL: VIEW PRESCRIPTION DOCUMENT ----------------- */}
            <Dialog open={!!selectedRxDoc} onOpenChange={() => setSelectedRxDoc(null)}>
                <DialogContent className="max-w-md text-center">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-[#003E7E]">
                            Prescription Verification
                        </DialogTitle>
                        <DialogDescription className="text-xs text-slate-500">
                            Secure patient clinical document for Schedule H medicine dispensing.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="bg-slate-100 border-2 border-dashed border-slate-300 p-8 rounded-2xl space-y-3">
                        <FileText className="h-14 w-14 text-[#003E7E] mx-auto" />
                        <div className="font-bold text-slate-800 text-sm">{selectedRxDoc}</div>
                        <p className="text-xs text-slate-500">
                            Dr. P. R. Reddy, MD (Endocrinology) · Regional Diabetes Specialist / Senior Consultant
                        </p>
                        <Badge className="bg-emerald-100 text-emerald-800 font-bold text-xs">
                            Prescription Valid (30-Day Refill Active)
                        </Badge>
                    </div>

                    <Button onClick={() => setSelectedRxDoc(null)} className="w-full bg-[#003E7E] text-white font-bold">
                        Approve &amp; Close Document
                    </Button>
                </DialogContent>
            </Dialog>

            {/* ----------------- MODAL: REGISTER NEW PHARMACY ----------------- */}
            <Dialog open={isRegModalOpen} onOpenChange={setIsRegModalOpen}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="flex items-center gap-2">
                            <Store className="h-5 w-5 text-[#003E7E]" />
                            <DialogTitle className="text-xl font-bold text-[#003E7E]">
                                Register Hyderabad Chemist Partner
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-xs text-slate-500">
                            Join the Insulin Inside network. Receive direct reservation requests from diabetic patients in your locality.
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setIsRegModalOpen(false);
                            toast.success("Pharmacy application submitted!", {
                                description: "Our Hyderabad onboarding team will verify your DCA license and contact you within 24 hours."
                            });
                        }}
                        className="space-y-4 text-xs"
                    >
                        <div className="space-y-1">
                            <label className="font-bold text-slate-700">Pharmacy / Medical Store Name:</label>
                            <Input placeholder="e.g. City Medico & Diabetes Store" required className="h-9 text-xs" />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-700">Proprietor / Owner Name:</label>
                                <Input placeholder="e.g. K. Ramesh" required className="h-9 text-xs" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-700">Registered Pharmacist Name:</label>
                                <Input placeholder="e.g. S. Sandhya (B.Pharm)" required className="h-9 text-xs" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-700">Telangana DCA License No:</label>
                                <Input placeholder="TS/DCA/HYD/20/21-XXXXX" required className="h-9 text-xs" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-700">Hyderabad Locality:</label>
                                <Input placeholder="e.g. Somajiguda / Begumpet" required className="h-9 text-xs" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="font-bold text-slate-700">Full Store Address &amp; Pincode:</label>
                            <Input placeholder="Shop No, Street, Landmark, Hyderabad 5000XX" required className="h-9 text-xs" />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <label className="font-bold text-slate-700">WhatsApp Contact Number:</label>
                                <Input placeholder="+91 98490 00000" required className="h-9 text-xs" />
                            </div>
                            <div className="space-y-1">
                                <label className="font-bold text-slate-700">Cold Storage (2-8°C Refrigerator):</label>
                                <select className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold">
                                    <option value="yes_ups">Yes with UPS Power Backup</option>
                                    <option value="yes_basic">Yes (Standard Refrigerator)</option>
                                    <option value="oral_only">Oral Medicines &amp; Strips Only</option>
                                </select>
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-[#003E7E] text-white font-bold h-10 text-xs rounded-xl">
                            Submit Partner Application for DCA Verification
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
