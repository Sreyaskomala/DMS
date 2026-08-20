"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Activity, Search, ShoppingCart, Star, Truck, ShieldCheck,
    Phone, Stethoscope, TestTube, Repeat, HeartPulse, Clock,
    Plus, Trash2, CheckCircle2, UploadCloud, MapPin, Building2, ExternalLink
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { PRODUCTS } from "@/lib/marketplace-data"
import { toast } from "sonner"

interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

const JAN_AUSHADHI_CENTERS = [
    { city: "Delhi / NCR", address: "PMBJP Kendra, AIIMS Metro Station Complex, New Delhi", phone: "011-26593450", insulinAvailable: "Regular Human Insulin (₹140/vial), NPH (₹145/vial)" },
    { city: "Bengaluru", address: "Jan Aushadhi Store, Victoria Hospital Campus, Fort Road, Bengaluru", phone: "080-26701150", insulinAvailable: "Human Insulin 40IU/ml (₹135/vial), Syringes (₹3/pc)" },
    { city: "Mumbai", address: "PMBJP Kendra, KEM Hospital Road, Parel, Mumbai", phone: "022-24107000", insulinAvailable: "Glargine Generic (₹320/pen), Human Actrapid (₹140/vial)" },
    { city: "Chennai", address: "Jan Aushadhi Kendra, Rajiv Gandhi General Hospital, Chennai", phone: "044-25305000", insulinAvailable: "Insulin Regular, NPH, Test Strips (₹450/50 strips)" },
    { city: "Hyderabad", address: "PMBJP Center, Osmania General Hospital premises, Hyderabad", phone: "040-24600121", insulinAvailable: "Biphasic Isophane Insulin (₹145/vial)" },
    { city: "Pune", address: "Jan Aushadhi Kendra, Sassoon General Hospital, Pune", phone: "020-26128000", insulinAvailable: "Regular Insulin & Basal Glargine Analogues" }
];

export default function MarketplacePage() {
    const [cart, setCart] = useState<CartItem[]>([
        { id: "p-1", name: PRODUCTS[0]?.name || "Accu-Chek Active 50 Strips", price: PRODUCTS[0]?.price || 899, image: PRODUCTS[0]?.image || "", quantity: 1 }
    ]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const totalCartItems = cart.reduce((acc, c) => acc + c.quantity, 0);
    const totalCartPrice = cart.reduce((acc, c) => acc + (c.price * c.quantity), 0);

    const addToCart = (product: typeof PRODUCTS[0]) => {
        const existing = cart.find(c => c.id === product.id);
        if (existing) {
            setCart(cart.map(c => c.id === product.id ? { ...c, quantity: c.quantity + 1 } : c));
        } else {
            setCart([...cart, { id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 }]);
        }
        toast.success(`Added ${product.name} to cart`);
    };

    const updateQuantity = (id: string, delta: number) => {
        setCart(cart.map(c => {
            if (c.id === id) {
                const nextQty = Math.max(1, c.quantity + delta);
                return { ...c, quantity: nextQty };
            }
            return c;
        }));
    };

    const removeFromCart = (id: string) => {
        setCart(cart.filter(c => c.id !== id));
        toast.info("Item removed from cart");
    };

    const handlePrescriptionUpload = (e: React.FormEvent) => {
        e.preventDefault();
        setIsPrescriptionOpen(false);
        toast.success("Prescription uploaded! Our certified pharmacist will verify within 15 minutes.");
    };

    const filteredProducts = PRODUCTS.filter(p => {
        const matchesCategory = selectedCategory === "All" || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
                <div className="bg-[#003E7E] text-white py-2 text-xs font-bold text-center tracking-wide">
                    COLD-CHAIN ASSURED DELIVERY IN 24 HOURS | USE CODE: <span className="text-[#009CDF]">INSULIN20</span> FOR 20% OFF
                </div>

                <div className="container px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-[#003E7E] rounded-xl flex items-center justify-center text-white font-black">
                                <Activity className="h-6 w-6" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-xl font-black text-[#003E7E] tracking-tight">Insulin<span className="text-[#009CDF]">Store</span></span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Supplies & Jan Aushadhi</span>
                            </div>
                        </Link>

                        <nav className="hidden lg:flex gap-6 text-sm font-bold text-slate-600">
                            <button onClick={() => setSelectedCategory("All")} className={`hover:text-[#003E7E] ${selectedCategory === 'All' ? 'text-[#003E7E] font-black' : ''}`}>All Items</button>
                            <button onClick={() => setSelectedCategory("Devices")} className={`hover:text-[#003E7E] ${selectedCategory === 'Devices' ? 'text-[#003E7E] font-black' : ''}`}>CGMs & Strips</button>
                            <button onClick={() => setSelectedCategory("Supplements")} className={`hover:text-[#003E7E] ${selectedCategory === 'Supplements' ? 'text-[#003E7E] font-black' : ''}`}>Nutrition & Care</button>
                        </nav>
                    </div>

                    <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search Accu-Chek, CGM, Syringes, Insulin..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-slate-100 border-none rounded-full h-11"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            className="rounded-full border-[#003E7E] text-[#003E7E] hover:bg-blue-50 font-bold text-xs h-10"
                            onClick={() => setIsPrescriptionOpen(true)}
                        >
                            <UploadCloud className="h-4 w-4 mr-1.5" /> Upload Prescription
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative hover:bg-blue-50 h-10 w-10"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingCart className="h-6 w-6 text-[#003E7E]" />
                            {totalCartItems > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 bg-[#E31C79] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                                    {totalCartItems}
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container px-6 py-8 space-y-12">
                {/* 1. HERO BANNER */}
                <div className="rounded-3xl bg-gradient-to-r from-[#003E7E] to-[#005bb7] text-white relative overflow-hidden shadow-2xl p-8 sm:p-12">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <Badge className="bg-[#E31C79] text-white border-none font-bold">MONTHLY SUBSCRIPTION</Badge>
                            <h1 className="text-3xl sm:text-5xl font-black leading-tight">
                                Never Run Out of Test Strips or Needles Again
                            </h1>
                            <p className="text-blue-100 text-base leading-relaxed">
                                Cold-chain temperature-controlled insulin delivery and discounted monthly testing boxes delivered straight to your doorstep across India.
                            </p>
                            <div className="flex gap-4 pt-2">
                                <Button
                                    className="bg-white text-[#003E7E] hover:bg-blue-50 rounded-full h-12 px-8 font-bold"
                                    onClick={() => addToCart(PRODUCTS[0])}
                                >
                                    Subscribe & Save 20%
                                </Button>
                            </div>
                        </div>
                        <div className="hidden lg:block relative h-64">
                            <img
                                src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=800&q=80"
                                className="w-80 h-64 object-cover rounded-3xl shadow-2xl ml-auto border-4 border-white/20"
                                alt="Subscription Box"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. JAN AUSHADHI AFFORDABLE INSULIN SECTION (PRD Requirement) */}
                <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b pb-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <Building2 className="h-6 w-6 text-[#003E7E]" />
                                <Badge className="bg-green-100 text-green-800 font-bold border-none">GOVERNMENT INITIATIVE</Badge>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-[#003E7E] mt-1">
                                Pradhan Mantri Jan Aushadhi (PMBJP) Affordable Insulin Directory
                            </h2>
                            <p className="text-slate-600 text-sm">
                                Save up to 80% on high-quality generic insulins at verified government Jan Aushadhi Kendras.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {JAN_AUSHADHI_CENTERS.map((center, i) => (
                            <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 hover:border-[#009CDF] transition-colors">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-[#003E7E] text-base">{center.city}</h4>
                                    <MapPin className="h-4 w-4 text-[#009CDF]" />
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">{center.address}</p>
                                <div className="pt-2 border-t text-[11px] text-green-700 font-bold">
                                    Insulin: {center.insulinAvailable}
                                </div>
                                <div className="text-[11px] text-slate-400">
                                    Helpline: <strong>{center.phone}</strong>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. PRODUCT CATALOG */}
                <section className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-[#003E7E]">Verified Testing & Care Essentials</h2>
                            <p className="text-slate-500 text-sm">100% Genuine with Cold-Chain Quality Guarantee</p>
                        </div>
                        <span className="text-xs font-bold text-slate-500">Showing {filteredProducts.length} items</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <Card key={product.id} className="group overflow-hidden border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl flex flex-col justify-between">
                                <div>
                                    <div className="aspect-square relative bg-white p-6 flex items-center justify-center border-b border-slate-100">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=400&q=80";
                                            }}
                                        />
                                        {product.originalPrice > product.price && (
                                            <div className="absolute top-3 left-3 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                                                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-5">
                                        <div className="text-[10px] font-bold text-[#009CDF] uppercase tracking-wide mb-1">{product.category}</div>
                                        <h3 className="font-bold text-slate-800 line-clamp-2 mb-2 group-hover:text-[#003E7E] transition-colors text-sm">{product.name}</h3>
                                        <div className="flex items-center gap-1 mb-3">
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map(s => (
                                                    <Star key={s} className={`h-3 w-3 ${s <= Math.round(product.rating) ? "fill-orange-400 text-orange-400" : "text-slate-200"}`} />
                                                ))}
                                            </div>
                                            <span className="text-xs text-slate-400">({product.reviews})</span>
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xl font-black text-[#003E7E]">₹{product.price}</span>
                                            <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
                                        </div>
                                    </CardContent>
                                </div>
                                <CardFooter className="p-5 pt-0">
                                    <Button
                                        onClick={() => addToCart(product)}
                                        className="w-full bg-white text-[#003E7E] border-2 border-[#003E7E] hover:bg-[#003E7E] hover:text-white font-bold rounded-xl transition-all h-11 text-xs"
                                    >
                                        <Plus className="h-4 w-4 mr-1" /> Add to Cart
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>

            {/* SHOPPING CART DRAWER */}
            <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
                <DialogContent className="max-w-md p-8 rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-[#003E7E] flex items-center gap-2">
                            <ShoppingCart className="h-6 w-6" /> Shopping Cart ({totalCartItems})
                        </DialogTitle>
                        <DialogDescription>Review your items before proceeding to checkout.</DialogDescription>
                    </DialogHeader>

                    {cart.length === 0 ? (
                        <div className="text-center py-12 text-slate-400 text-sm">Your cart is empty.</div>
                    ) : (
                        <div className="space-y-4 pt-2">
                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                                {cart.map((item) => (
                                    <div key={item.id} className="p-3 bg-slate-50 rounded-2xl border flex items-center justify-between text-xs">
                                        <div className="flex-1 pr-2">
                                            <h4 className="font-bold text-slate-800 line-clamp-1">{item.name}</h4>
                                            <p className="text-slate-500 font-bold">₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center border rounded-lg bg-white overflow-hidden">
                                                <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 font-bold hover:bg-slate-100">-</button>
                                                <span className="px-2 font-bold">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 font-bold hover:bg-slate-100">+</button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 p-1">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t space-y-3">
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span>Total Payable:</span>
                                    <span className="text-2xl font-black text-[#003E7E]">₹{totalCartPrice}</span>
                                </div>
                                <Button
                                    className="w-full bg-[#E31C79] hover:bg-[#c21565] h-12 font-bold rounded-xl text-base shadow-lg"
                                    onClick={() => {
                                        setIsCartOpen(false);
                                        toast.success("Order placed successfully! Delivery scheduled.");
                                    }}
                                >
                                    Proceed to Checkout →
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* PRESCRIPTION UPLOAD MODAL */}
            <Dialog open={isPrescriptionOpen} onOpenChange={setIsPrescriptionOpen}>
                <DialogContent className="max-w-md p-8 rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-[#003E7E]">Upload Doctor Prescription</DialogTitle>
                        <DialogDescription>
                            Upload a photo or PDF of your doctor's prescription for verified insulin dispensation.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handlePrescriptionUpload} className="space-y-4 pt-2">
                        <div className="p-8 border-2 border-dashed border-[#003E7E] rounded-2xl text-center space-y-2 bg-slate-50 cursor-pointer">
                            <UploadCloud className="h-10 w-10 text-[#003E7E] mx-auto" />
                            <p className="text-xs font-bold text-slate-700">Click to upload or drag & drop prescription</p>
                            <p className="text-[10px] text-slate-400">PDF, JPG, PNG up to 10MB</p>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">Patient Name</label>
                            <Input placeholder="e.g. Sreyas Komala" required />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">Contact Phone</label>
                            <Input placeholder="+91 98765 43210" required />
                        </div>

                        <Button type="submit" className="w-full bg-[#003E7E] hover:bg-[#002a5e] h-12 font-bold rounded-xl">
                            Submit Prescription for Verification
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
