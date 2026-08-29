// Master Pharmacy & Diabetes Medicine Data Layer - Hyderabad Pilot

export type MedicineCategory =
    | "Basal Insulin"
    | "Bolus Insulin"
    | "Premix Insulin"
    | "Oral - Metformin"
    | "Oral - SGLT2 / DPP4"
    | "Oral - Sulfonylurea"
    | "Test Strips & CGMs"
    | "Supplies & Cold-Chain"
    | "Hypo Emergency";

export type PrescriptionClass = "Schedule H" | "Schedule H1" | "Schedule G" | "OTC";

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface JanAushadhiAlternative {
    name: string;
    genericName: string;
    price: number;
    savingsPercent: number;
    kendraAvailable: boolean;
}

export interface MedicineProduct {
    id: string;
    brandName: string;
    genericName: string;
    strength: string;
    dosageForm: "Vial (10ml)" | "Cartridge (3ml)" | "Disposable Pen" | "Tablet" | "Strip of 10" | "Strip of 14" | "Strip of 15" | "Strip of 20" | "Box of 50" | "Sensor" | "Pack";
    packSize: string;
    manufacturer: string;
    category: MedicineCategory;
    prescriptionClass: PrescriptionClass;
    requiresColdChain: boolean;
    storageTemp: string;
    corporateGiantMrp: number; // Standard market MRP
    localPartnerPrice: number; // Discounted neighborhood chemist price
    janAushadhiAlt?: JanAushadhiAlternative;
    popularIndication: string;
    instructions: string;
    image: string;
    inStockStoresCount: number;
}

export interface PharmacyPartner {
    id: string;
    name: string;
    ownerName: string;
    pharmacistName: string;
    pharmacistRegNo: string;
    locality: string;
    areaName: string;
    address: string;
    city: "Hyderabad" | "Secunderabad";
    pincode: string;
    phone: string;
    whatsapp: string;
    dcaLicenceNo: string; // Telangana DCA ODLS verification
    dcaVerifiedDate: string;
    coldChainVerified: boolean;
    coldChainTempCurrent: string; // e.g. "4.2°C"
    openingHours: string;
    isOpenNow: boolean;
    pickupAvailable: boolean;
    localDeliveryAvailable: boolean;
    deliveryTimeEst: string;
    rating: number;
    reviewsCount: number;
    discountNote: string;
    inventory: Record<string, { stockStatus: StockStatus; quantity: number; lastConfirmed: string; price: number }>;
}

export interface ReservationRequest {
    id: string;
    patientName: string;
    patientPhone: string;
    patientEmail?: string;
    items: Array<{
        productId: string;
        productName: string;
        strength: string;
        quantity: number;
        unitPrice: number;
        requiresColdChain: boolean;
    }>;
    pharmacyId: string;
    pharmacyName: string;
    pharmacyLocality: string;
    fulfilmentMode: "pickup" | "local_delivery";
    deliveryAddress?: string;
    prescriptionUploaded: boolean;
    prescriptionFileName?: string;
    status: "pending_pharmacy_review" | "confirmed_held" | "ready_for_pickup" | "completed" | "rejected";
    createdAt: string;
    holdExpiresAt: string;
    totalAmount: number;
    savingsVersusCorporate: number;
    coldChainDisclaimerAccepted: boolean;
}

export interface DemandSearchItem {
    id: string;
    medicineName: string;
    searchesCountLast24h: number;
    localSupplyStatus: "adequate" | "high_demand_low_stock" | "frequent_shortage";
    averageLocalPrice: number;
    suggestedStockAction: string;
}

// ---------------- MASTER MEDICINES CATALOGUE (50+ High Priority Diabetes Items) ----------------

export const MASTER_MEDICINES: MedicineProduct[] = [
    // 1. Basal Insulins (Long-Acting)
    {
        id: "med-1",
        brandName: "Lantus SoloStar Pen",
        genericName: "Insulin Glargine (rDNA origin)",
        strength: "100 IU/ml",
        dosageForm: "Disposable Pen",
        packSize: "3ml Pen",
        manufacturer: "Sanofi India Ltd",
        category: "Basal Insulin",
        prescriptionClass: "Schedule H",
        requiresColdChain: true,
        storageTemp: "2°C - 8°C (Do Not Freeze)",
        corporateGiantMrp: 985,
        localPartnerPrice: 795,
        janAushadhiAlt: {
            name: "Generic Insulin Glargine Pen",
            genericName: "Insulin Glargine 100 IU/ml",
            price: 320,
            savingsPercent: 67,
            kendraAvailable: true,
        },
        popularIndication: "24-hour background basal control for Type 1 & Type 2",
        instructions: "Inject subcutaneously once daily at the same time (usually bedtime). Do not massage site.",
        image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 7,
    },
    {
        id: "med-2",
        brandName: "Basaglar KwikPen",
        genericName: "Insulin Glargine (Biosimilar)",
        strength: "100 IU/ml",
        dosageForm: "Disposable Pen",
        packSize: "3ml Pen (Pack of 1)",
        manufacturer: "Eli Lilly & Co / Boehringer",
        category: "Basal Insulin",
        prescriptionClass: "Schedule H",
        requiresColdChain: true,
        storageTemp: "2°C - 8°C (Do Not Freeze)",
        corporateGiantMrp: 745,
        localPartnerPrice: 610,
        janAushadhiAlt: {
            name: "Generic Insulin Glargine Pen",
            genericName: "Insulin Glargine 100 IU/ml",
            price: 320,
            savingsPercent: 57,
            kendraAvailable: true,
        },
        popularIndication: "Long-acting biosimilar basal insulin for flat glycemic profile",
        instructions: "Subcutaneous once daily injection at night or morning consistently.",
        image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 6,
    },
    {
        id: "med-3",
        brandName: "Tresiba FlexTouch",
        genericName: "Insulin Degludec",
        strength: "100 U/ml",
        dosageForm: "Disposable Pen",
        packSize: "3ml Pen",
        manufacturer: "Novo Nordisk India",
        category: "Basal Insulin",
        prescriptionClass: "Schedule H",
        requiresColdChain: true,
        storageTemp: "2°C - 8°C (Do Not Freeze)",
        corporateGiantMrp: 1650,
        localPartnerPrice: 1390,
        popularIndication: "Ultra-long acting basal (>42 hours) with ultra-low nocturnal hypo risk",
        instructions: "Inject once daily anytime with flexibility. Keep refrigerated before opening.",
        image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 5,
    },
    {
        id: "med-4",
        brandName: "Toujeo SoloStar",
        genericName: "Insulin Glargine U-300",
        strength: "300 U/ml",
        dosageForm: "Disposable Pen",
        packSize: "1.5ml Pen",
        manufacturer: "Sanofi India Ltd",
        category: "Basal Insulin",
        prescriptionClass: "Schedule H",
        requiresColdChain: true,
        storageTemp: "2°C - 8°C (Do Not Freeze)",
        corporateGiantMrp: 1250,
        localPartnerPrice: 1040,
        popularIndication: "High-concentration 300U/ml basal with prolonged stable absorption",
        instructions: "Once daily subcutaneous injection. Do not mix with other insulins.",
        image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 6,
    },

    // 2. Bolus / Rapid-Acting Insulins
    {
        id: "med-5",
        brandName: "NovoRapid FlexPen",
        genericName: "Insulin Aspart (rDNA origin)",
        strength: "100 U/ml",
        dosageForm: "Disposable Pen",
        packSize: "3ml Pen",
        manufacturer: "Novo Nordisk India",
        category: "Bolus Insulin",
        prescriptionClass: "Schedule H",
        requiresColdChain: true,
        storageTemp: "2°C - 8°C (Do Not Freeze)",
        corporateGiantMrp: 825,
        localPartnerPrice: 685,
        janAushadhiAlt: {
            name: "PMBJP Rapid Insulin (Human Regular)",
            genericName: "Regular Insulin 40IU/ml",
            price: 140,
            savingsPercent: 83,
            kendraAvailable: true,
        },
        popularIndication: "Rapid mealtime glucose spike prevention (onset 10-15 min)",
        instructions: "Inject 5 to 10 minutes before meals or immediately after start of eating.",
        image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 8,
    },
    {
        id: "med-6",
        brandName: "Humalog KwikPen",
        genericName: "Insulin Lispro",
        strength: "100 U/ml",
        dosageForm: "Disposable Pen",
        packSize: "3ml Pen",
        manufacturer: "Eli Lilly & Co",
        category: "Bolus Insulin",
        prescriptionClass: "Schedule H",
        requiresColdChain: true,
        storageTemp: "2°C - 8°C (Do Not Freeze)",
        corporateGiantMrp: 790,
        localPartnerPrice: 660,
        popularIndication: "Rapid-acting mealtime bolus insulin",
        instructions: "Take within 15 minutes before or right after meals.",
        image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 6,
    },
    {
        id: "med-7",
        brandName: "Actrapid HM Vial (10ml)",
        genericName: "Human Regular Insulin (rDNA)",
        strength: "40 IU/ml",
        dosageForm: "Vial (10ml)",
        packSize: "10ml Glass Vial",
        manufacturer: "Novo Nordisk India",
        category: "Bolus Insulin",
        prescriptionClass: "Schedule H",
        requiresColdChain: true,
        storageTemp: "2°C - 8°C (Do Not Freeze)",
        corporateGiantMrp: 198,
        localPartnerPrice: 165,
        janAushadhiAlt: {
            name: "Jan Aushadhi Human Insulin Regular",
            genericName: "Regular Insulin 40IU/ml",
            price: 135,
            savingsPercent: 31,
            kendraAvailable: true,
        },
        popularIndication: "Standard affordable short-acting human insulin for syringe use",
        instructions: "Inject 30 minutes before meal start using 40IU U-40 red syringe.",
        image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 8,
    },
    {
        id: "med-8",
        brandName: "Fiasp FlexTouch",
        genericName: "Faster-Acting Insulin Aspart",
        strength: "100 U/ml",
        dosageForm: "Disposable Pen",
        packSize: "3ml Pen",
        manufacturer: "Novo Nordisk India",
        category: "Bolus Insulin",
        prescriptionClass: "Schedule H",
        requiresColdChain: true,
        storageTemp: "2°C - 8°C (Do Not Freeze)",
        corporateGiantMrp: 980,
        localPartnerPrice: 820,
        popularIndication: "Ultra-fast absorption mealtime insulin for heavy carb Indian diets",
        instructions: "Inject at the start of the meal (0-2 mins before) or up to 20 mins after.",
        image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 4,
    },

    // 3. Premix / Dual Co-Formulation Insulins
    {
        id: "med-9",
        brandName: "Ryzodeg 70/30 FlexTouch",
        genericName: "Insulin Degludec + Insulin Aspart",
        strength: "100 U/ml",
        dosageForm: "Disposable Pen",
        packSize: "3ml Pen",
        manufacturer: "Novo Nordisk India",
        category: "Premix Insulin",
        prescriptionClass: "Schedule H",
        requiresColdChain: true,
        storageTemp: "2°C - 8°C (Do Not Freeze)",
        corporateGiantMrp: 1850,
        localPartnerPrice: 1540,
        popularIndication: "Co-formulation providing both 24h basal and main meal bolus in 1 shot",
        instructions: "Inject once or twice daily with the main carbohydrate meal(s).",
        image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 7,
    },
    {
        id: "med-10",
        brandName: "Mixtard 30 HM Penfill",
        genericName: "Biphasic Isophane Insulin 30/70",
        strength: "100 IU/ml",
        dosageForm: "Cartridge (3ml)",
        packSize: "Pack of 5 Cartridges (3ml)",
        manufacturer: "Novo Nordisk India",
        category: "Premix Insulin",
        prescriptionClass: "Schedule H",
        requiresColdChain: true,
        storageTemp: "2°C - 8°C (Do Not Freeze)",
        corporateGiantMrp: 1140,
        localPartnerPrice: 940,
        janAushadhiAlt: {
            name: "Jan Aushadhi Biphasic Isophane Insulin",
            genericName: "Biphasic Isophane 30/70 40IU/ml",
            price: 145,
            savingsPercent: 84,
            kendraAvailable: true,
        },
        popularIndication: "Premixed dual action (30% rapid, 70% intermediate)",
        instructions: "Resuspend gently before use. Inject 30 mins before breakfast & dinner.",
        image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 8,
    },

    // 4. Oral Medications (Metformin & Combinations)
    {
        id: "med-11",
        brandName: "Glycomet-GP 2 Forte",
        genericName: "Metformin (SR) 1000mg + Glimepiride 2mg",
        strength: "1000mg / 2mg",
        dosageForm: "Strip of 15",
        packSize: "15 Tablets",
        manufacturer: "USV Private Limited",
        category: "Oral - Metformin",
        prescriptionClass: "Schedule H",
        requiresColdChain: false,
        storageTemp: "Below 30°C",
        corporateGiantMrp: 285,
        localPartnerPrice: 220,
        janAushadhiAlt: {
            name: "Jan Aushadhi Metformin 1000 + Glimepiride 2",
            genericName: "Metformin ER 1000mg + Glimepiride 2mg",
            price: 24,
            savingsPercent: 91,
            kendraAvailable: true,
        },
        popularIndication: "Standard dual oral therapy for Type 2 insulin resistance & secretion",
        instructions: "Take with or immediately after the main meal (Breakfast/Dinner).",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 8,
    },
    {
        id: "med-12",
        brandName: "Glycomet 500mg SR",
        genericName: "Metformin Hydrochloride Sustained Release",
        strength: "500mg",
        dosageForm: "Strip of 20",
        packSize: "20 Tablets",
        manufacturer: "USV Private Limited",
        category: "Oral - Metformin",
        prescriptionClass: "Schedule H",
        requiresColdChain: false,
        storageTemp: "Below 30°C",
        corporateGiantMrp: 62,
        localPartnerPrice: 48,
        janAushadhiAlt: {
            name: "Jan Aushadhi Metformin 500mg",
            genericName: "Metformin 500mg (10 tabs)",
            price: 8,
            savingsPercent: 83,
            kendraAvailable: true,
        },
        popularIndication: "First-line baseline therapy for Type 2 Diabetes & insulin sensitivity",
        instructions: "Take after meals to minimize stomach irritation.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 8,
    },

    // 5. Oral SGLT2 & DPP4 Inhibitors
    {
        id: "med-13",
        brandName: "Forxiga 10mg",
        genericName: "Dapagliflozin",
        strength: "10mg",
        dosageForm: "Strip of 14",
        packSize: "14 Tablets",
        manufacturer: "AstraZeneca Pharma India",
        category: "Oral - SGLT2 / DPP4",
        prescriptionClass: "Schedule H",
        requiresColdChain: false,
        storageTemp: "Below 30°C",
        corporateGiantMrp: 980,
        localPartnerPrice: 780,
        janAushadhiAlt: {
            name: "Jan Aushadhi Dapagliflozin 10mg",
            genericName: "Dapagliflozin 10mg (10 tabs)",
            price: 78,
            savingsPercent: 92,
            kendraAvailable: true,
        },
        popularIndication: "SGLT2 inhibitor expelling urinary glucose; protects kidneys & heart",
        instructions: "Take once daily morning with or without food. Drink plenty of water.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 7,
    },
    {
        id: "med-14",
        brandName: "Jardiance 10mg",
        genericName: "Empagliflozin",
        strength: "10mg",
        dosageForm: "Strip of 10",
        packSize: "10 Tablets",
        manufacturer: "Boehringer Ingelheim",
        category: "Oral - SGLT2 / DPP4",
        prescriptionClass: "Schedule H",
        requiresColdChain: false,
        storageTemp: "Below 30°C",
        corporateGiantMrp: 620,
        localPartnerPrice: 510,
        janAushadhiAlt: {
            name: "Jan Aushadhi Empagliflozin 10mg",
            genericName: "Empagliflozin 10mg (10 tabs)",
            price: 65,
            savingsPercent: 89,
            kendraAvailable: true,
        },
        popularIndication: "Cardio-renal protective SGLT2 inhibitor lowering blood glucose",
        instructions: "Take once daily morning. Maintain good hydration.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 6,
    },
    {
        id: "med-15",
        brandName: "Galvus Met 50/500",
        genericName: "Vildagliptin 50mg + Metformin 500mg",
        strength: "50mg / 500mg",
        dosageForm: "Strip of 15",
        packSize: "15 Tablets",
        manufacturer: "Novartis India Ltd",
        category: "Oral - SGLT2 / DPP4",
        prescriptionClass: "Schedule H",
        requiresColdChain: false,
        storageTemp: "Below 30°C",
        corporateGiantMrp: 410,
        localPartnerPrice: 325,
        janAushadhiAlt: {
            name: "Jan Aushadhi Vildagliptin + Metformin",
            genericName: "Vildagliptin 50mg + Metformin 500mg (10 tabs)",
            price: 36,
            savingsPercent: 91,
            kendraAvailable: true,
        },
        popularIndication: "DPP-4 inhibitor combo for glucose-dependent insulin release",
        instructions: "Take twice daily with meals (morning and evening).",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 8,
    },
    {
        id: "med-16",
        brandName: "Rybelsus 7mg",
        genericName: "Oral Semaglutide (GLP-1 RA)",
        strength: "7mg",
        dosageForm: "Strip of 10",
        packSize: "10 Tablets",
        manufacturer: "Novo Nordisk India",
        category: "Oral - SGLT2 / DPP4",
        prescriptionClass: "Schedule H",
        requiresColdChain: false,
        storageTemp: "Below 30°C in Original Blister",
        corporateGiantMrp: 3850,
        localPartnerPrice: 3350,
        popularIndication: "Oral GLP-1 receptor agonist for glycemic control and weight management",
        instructions: "STRICT: Take first thing in the morning on empty stomach with max 120ml water. Wait 30 mins before eating.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 5,
    },

    // 6. Test Strips, Lancets & CGMs
    {
        id: "med-17",
        brandName: "Accu-Chek Active 50 Strips",
        genericName: "Blood Glucose Test Strips",
        strength: "50 Strips",
        dosageForm: "Box of 50",
        packSize: "50 Test Strips Vial",
        manufacturer: "Roche Diabetes Care",
        category: "Test Strips & CGMs",
        prescriptionClass: "OTC",
        requiresColdChain: false,
        storageTemp: "2°C - 30°C (Keep dry, close cap tightly)",
        corporateGiantMrp: 1075,
        localPartnerPrice: 799,
        janAushadhiAlt: {
            name: "Jan Aushadhi Generic BG Test Strips (50s)",
            genericName: "Glucose Test Strips (Compatible)",
            price: 450,
            savingsPercent: 58,
            kendraAvailable: true,
        },
        popularIndication: "Standard blood glucose test strips for Accu-Chek Active meter",
        instructions: "Store in original vial. Close cap immediately after taking a strip.",
        image: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 8,
    },
    {
        id: "med-18",
        brandName: "FreeStyle Libre Sensor",
        genericName: "Flash Continuous Glucose Monitoring Sensor",
        strength: "14-Day Wear",
        dosageForm: "Sensor",
        packSize: "1 Sensor + Applicator",
        manufacturer: "Abbott Healthcare",
        category: "Test Strips & CGMs",
        prescriptionClass: "OTC",
        requiresColdChain: false,
        storageTemp: "4°C - 25°C",
        corporateGiantMrp: 5499,
        localPartnerPrice: 4899,
        popularIndication: "14-day continuous glucose monitoring without fingerpricks",
        instructions: "Apply to back of upper arm. Scan with smartphone NFC or reader.",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 5,
    },
    {
        id: "med-19",
        brandName: "BD Ultra-Fine Pen Needles (4mm)",
        genericName: "Insulin Pen Needles 32G x 4mm",
        strength: "32G 4mm",
        dosageForm: "Pack",
        packSize: "Box of 100 Needles",
        manufacturer: "Becton Dickinson India",
        category: "Supplies & Cold-Chain",
        prescriptionClass: "OTC",
        requiresColdChain: false,
        storageTemp: "Room Temperature",
        corporateGiantMrp: 1450,
        localPartnerPrice: 1150,
        janAushadhiAlt: {
            name: "Jan Aushadhi Insulin Syringes U-40 (Pack of 10)",
            genericName: "U-40 31G Insulin Syringes",
            price: 40,
            savingsPercent: 72,
            kendraAvailable: true,
        },
        popularIndication: "Painless 4mm micro-needles compatible with all standard insulin pens",
        instructions: "Single use only. Rotate injection sites across abdomen, thighs, arms.",
        image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 8,
    },
    {
        id: "med-20",
        brandName: "Frio Insulin Cooling Travel Wallet",
        genericName: "Evaporative Cooling Pouch (No ice needed)",
        strength: "Duo Pen Size",
        dosageForm: "Pack",
        packSize: "1 Cooling Wallet",
        manufacturer: "Frio India / UK",
        category: "Supplies & Cold-Chain",
        prescriptionClass: "OTC",
        requiresColdChain: false,
        storageTemp: "Room Temperature",
        corporateGiantMrp: 2100,
        localPartnerPrice: 1650,
        popularIndication: "Activated with tap water for 45 hours cooling during Indian summer travel",
        instructions: "Immerse inner wallet in water for 5-10 mins. Towel dry and insert pens.",
        image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 6,
    },
    {
        id: "med-21",
        brandName: "Glucagon Emergency Hypo Kit",
        genericName: "Glucagon for Injection (rDNA origin)",
        strength: "1mg / ml",
        dosageForm: "Vial (10ml)",
        packSize: "1mg Vial + Pre-filled Syringe",
        manufacturer: "Eli Lilly / Novo Nordisk",
        category: "Hypo Emergency",
        prescriptionClass: "Schedule H",
        requiresColdChain: true,
        storageTemp: "2°C - 8°C (Do Not Freeze)",
        corporateGiantMrp: 1850,
        localPartnerPrice: 1520,
        popularIndication: "Life-saving emergency rescue injection for severe hypoglycemia with loss of consciousness",
        instructions: "EMERGENCY: Reconstitute vial with diluent and inject IM/SC immediately into thigh or upper arm. Call 108.",
        image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80",
        inStockStoresCount: 4,
    },
];

// ---------------- HYDERABAD PILOT PHARMACY PARTNERS ----------------

export const HYDERABAD_PHARMACIES: PharmacyPartner[] = [
    {
        id: "pharma-1",
        name: "Sri Balaji Medical & Diabetes Care",
        ownerName: "R. Venkat Reddy",
        pharmacistName: "R. Venkat Reddy, B.Pharm (Reg #38912/TS)",
        pharmacistRegNo: "TS/HYD/2021/48912",
        locality: "Banjara Hills",
        areaName: "Road No. 12, Near MLA Colony",
        address: "Shop 4, Balaji Towers, Road No. 12, Banjara Hills, Hyderabad, Telangana",
        city: "Hyderabad",
        pincode: "500034",
        phone: "+91 40 2339 4120",
        whatsapp: "+91 98490 12345",
        dcaLicenceNo: "TS/DCA/HYD/20/21-48912",
        dcaVerifiedDate: "24 Aug 2026",
        coldChainVerified: true,
        coldChainTempCurrent: "3.8°C (Monitored)",
        openingHours: "7:30 AM - 11:00 PM (7 Days)",
        isOpenNow: true,
        pickupAvailable: true,
        localDeliveryAvailable: true,
        deliveryTimeEst: "35-45 mins (2.5 km radius)",
        rating: 4.9,
        reviewsCount: 312,
        discountNote: "Up to 20% flat discount on insulins & diabetes essentials",
        inventory: {
            "med-1": { stockStatus: "in_stock", quantity: 18, lastConfirmed: "12 mins ago", price: 795 },
            "med-2": { stockStatus: "in_stock", quantity: 12, lastConfirmed: "15 mins ago", price: 610 },
            "med-5": { stockStatus: "in_stock", quantity: 24, lastConfirmed: "5 mins ago", price: 685 },
            "med-7": { stockStatus: "in_stock", quantity: 30, lastConfirmed: "20 mins ago", price: 165 },
            "med-9": { stockStatus: "in_stock", quantity: 8, lastConfirmed: "1 hour ago", price: 1540 },
            "med-11": { stockStatus: "in_stock", quantity: 45, lastConfirmed: "10 mins ago", price: 220 },
            "med-12": { stockStatus: "in_stock", quantity: 60, lastConfirmed: "10 mins ago", price: 48 },
            "med-13": { stockStatus: "in_stock", quantity: 15, lastConfirmed: "30 mins ago", price: 780 },
            "med-17": { stockStatus: "in_stock", quantity: 25, lastConfirmed: "15 mins ago", price: 799 },
            "med-18": { stockStatus: "low_stock", quantity: 3, lastConfirmed: "45 mins ago", price: 4899 },
            "med-19": { stockStatus: "in_stock", quantity: 30, lastConfirmed: "10 mins ago", price: 1150 },
            "med-21": { stockStatus: "in_stock", quantity: 2, lastConfirmed: "2 hours ago", price: 1520 },
        },
    },
    {
        id: "pharma-2",
        name: "Meenakshi Pharma & Surgical Hub",
        ownerName: "S. Anitha Rao",
        pharmacistName: "S. Anitha, M.Pharm (Reg #44210/TS)",
        pharmacistRegNo: "TS/RAN/2019/33210",
        locality: "Madhapur / Hitec City",
        areaName: "Near Image Hospital, Ayyappa Society",
        address: "Plot 88, 100 Feet Road, Ayyappa Society, Madhapur, Hyderabad, Telangana",
        city: "Hyderabad",
        pincode: "500081",
        phone: "+91 40 4852 9900",
        whatsapp: "+91 98488 56789",
        dcaLicenceNo: "TS/DCA/RAN/20/21-33210",
        dcaVerifiedDate: "18 Aug 2026",
        coldChainVerified: true,
        coldChainTempCurrent: "4.1°C (Monitored)",
        openingHours: "8:00 AM - 11:30 PM",
        isOpenNow: true,
        pickupAvailable: true,
        localDeliveryAvailable: true,
        deliveryTimeEst: "25-35 mins (Madhapur, Hitec, Kondapur)",
        rating: 4.8,
        reviewsCount: 245,
        discountNote: "18% off on all imported and domestic basal/bolus insulins",
        inventory: {
            "med-1": { stockStatus: "in_stock", quantity: 15, lastConfirmed: "8 mins ago", price: 795 },
            "med-3": { stockStatus: "in_stock", quantity: 9, lastConfirmed: "25 mins ago", price: 1390 },
            "med-4": { stockStatus: "in_stock", quantity: 7, lastConfirmed: "15 mins ago", price: 1040 },
            "med-5": { stockStatus: "in_stock", quantity: 20, lastConfirmed: "8 mins ago", price: 685 },
            "med-6": { stockStatus: "in_stock", quantity: 11, lastConfirmed: "40 mins ago", price: 660 },
            "med-8": { stockStatus: "in_stock", quantity: 6, lastConfirmed: "1 hour ago", price: 820 },
            "med-13": { stockStatus: "in_stock", quantity: 18, lastConfirmed: "20 mins ago", price: 780 },
            "med-14": { stockStatus: "in_stock", quantity: 14, lastConfirmed: "35 mins ago", price: 510 },
            "med-16": { stockStatus: "low_stock", quantity: 4, lastConfirmed: "10 mins ago", price: 3350 },
            "med-17": { stockStatus: "in_stock", quantity: 40, lastConfirmed: "10 mins ago", price: 799 },
            "med-18": { stockStatus: "in_stock", quantity: 6, lastConfirmed: "20 mins ago", price: 4899 },
            "med-20": { stockStatus: "in_stock", quantity: 10, lastConfirmed: "1 hour ago", price: 1650 },
        },
    },
    {
        id: "pharma-3",
        name: "Royal Chemist & Surgical Agencies",
        ownerName: "Mohammed Farooq",
        pharmacistName: "K. Sudheer Kumar, B.Pharm (Reg #29114/TS)",
        pharmacistRegNo: "TS/SEC/2018/19445",
        locality: "Secunderabad",
        areaName: "General Bazaar / MG Road",
        address: "Door 4-2-89, MG Road, Opp Clock Tower, Secunderabad, Telangana",
        city: "Secunderabad",
        pincode: "500003",
        phone: "+91 40 2780 4312",
        whatsapp: "+91 97000 88990",
        dcaLicenceNo: "TS/DCA/SEC/20/21-19445",
        dcaVerifiedDate: "20 Aug 2026",
        coldChainVerified: true,
        coldChainTempCurrent: "3.5°C (Monitored)",
        openingHours: "8:30 AM - 10:30 PM",
        isOpenNow: true,
        pickupAvailable: true,
        localDeliveryAvailable: true,
        deliveryTimeEst: "30-40 mins (Secunderabad, Marredpally, Begumpet)",
        rating: 4.9,
        reviewsCount: 420,
        discountNote: "Wholesale-level retail prices with dedicated cold-chain packing",
        inventory: {
            "med-1": { stockStatus: "in_stock", quantity: 22, lastConfirmed: "14 mins ago", price: 795 },
            "med-2": { stockStatus: "in_stock", quantity: 16, lastConfirmed: "30 mins ago", price: 610 },
            "med-5": { stockStatus: "in_stock", quantity: 28, lastConfirmed: "10 mins ago", price: 685 },
            "med-7": { stockStatus: "in_stock", quantity: 50, lastConfirmed: "5 mins ago", price: 165 },
            "med-10": { stockStatus: "in_stock", quantity: 25, lastConfirmed: "15 mins ago", price: 940 },
            "med-11": { stockStatus: "in_stock", quantity: 60, lastConfirmed: "15 mins ago", price: 220 },
            "med-12": { stockStatus: "in_stock", quantity: 80, lastConfirmed: "15 mins ago", price: 48 },
            "med-15": { stockStatus: "in_stock", quantity: 30, lastConfirmed: "45 mins ago", price: 325 },
            "med-17": { stockStatus: "in_stock", quantity: 35, lastConfirmed: "15 mins ago", price: 799 },
            "med-19": { stockStatus: "in_stock", quantity: 50, lastConfirmed: "20 mins ago", price: 1150 },
        },
    },
    {
        id: "pharma-4",
        name: "Srinivasa Drug House & Diabetes Clinic",
        ownerName: "T. Srinivasa Rao",
        pharmacistName: "M. Haritha, B.Pharm (Reg #51092/TS)",
        pharmacistRegNo: "TS/HYD/2020/55412",
        locality: "Ameerpet",
        areaName: "Near Metro Station Pillar 1042",
        address: "7-1-618, Dharam Karan Road, Ameerpet, Hyderabad, Telangana",
        city: "Hyderabad",
        pincode: "500016",
        phone: "+91 40 2374 8811",
        whatsapp: "+91 99899 44332",
        dcaLicenceNo: "TS/DCA/HYD/20/21-55412",
        dcaVerifiedDate: "12 Aug 2026",
        coldChainVerified: true,
        coldChainTempCurrent: "4.0°C (Monitored)",
        openingHours: "8:00 AM - 11:00 PM",
        isOpenNow: true,
        pickupAvailable: true,
        localDeliveryAvailable: true,
        deliveryTimeEst: "20-30 mins (Ameerpet, SR Nagar, Begumpet)",
        rating: 4.7,
        reviewsCount: 198,
        discountNote: "20% off on monthly recurring prescription supplies",
        inventory: {
            "med-1": { stockStatus: "in_stock", quantity: 14, lastConfirmed: "18 mins ago", price: 795 },
            "med-3": { stockStatus: "in_stock", quantity: 5, lastConfirmed: "1 hour ago", price: 1390 },
            "med-5": { stockStatus: "in_stock", quantity: 19, lastConfirmed: "20 mins ago", price: 685 },
            "med-11": { stockStatus: "in_stock", quantity: 50, lastConfirmed: "15 mins ago", price: 220 },
            "med-12": { stockStatus: "in_stock", quantity: 70, lastConfirmed: "15 mins ago", price: 48 },
            "med-13": { stockStatus: "in_stock", quantity: 12, lastConfirmed: "30 mins ago", price: 780 },
            "med-17": { stockStatus: "in_stock", quantity: 20, lastConfirmed: "10 mins ago", price: 799 },
            "med-19": { stockStatus: "in_stock", quantity: 25, lastConfirmed: "10 mins ago", price: 1150 },
        },
    },
    {
        id: "pharma-5",
        name: "Kakatiya Life Sciences & Dispensary",
        ownerName: "Ch. Narender",
        pharmacistName: "P. Rajeshwari, B.Pharm (Reg #63401/TS)",
        pharmacistRegNo: "TS/KKB/2022/71239",
        locality: "Kukatpally",
        areaName: "KPHB Phase 3, Temple Road",
        address: "Mig 142, Road No. 1, KPHB Colony, Kukatpally, Hyderabad, Telangana",
        city: "Hyderabad",
        pincode: "500072",
        phone: "+91 40 4018 7654",
        whatsapp: "+91 94400 33221",
        dcaLicenceNo: "TS/DCA/KKB/20/21-71239",
        dcaVerifiedDate: "15 Aug 2026",
        coldChainVerified: true,
        coldChainTempCurrent: "3.9°C (Monitored)",
        openingHours: "7:00 AM - Midnight",
        isOpenNow: true,
        pickupAvailable: true,
        localDeliveryAvailable: true,
        deliveryTimeEst: "25-35 mins (KPHB, Nizampet, JNTU, Miyapur)",
        rating: 4.8,
        reviewsCount: 380,
        discountNote: "Special support for elder care refills & free glucose test at counter",
        inventory: {
            "med-1": { stockStatus: "in_stock", quantity: 20, lastConfirmed: "5 mins ago", price: 795 },
            "med-2": { stockStatus: "in_stock", quantity: 14, lastConfirmed: "20 mins ago", price: 610 },
            "med-4": { stockStatus: "in_stock", quantity: 8, lastConfirmed: "45 mins ago", price: 1040 },
            "med-5": { stockStatus: "in_stock", quantity: 22, lastConfirmed: "5 mins ago", price: 685 },
            "med-7": { stockStatus: "in_stock", quantity: 40, lastConfirmed: "10 mins ago", price: 165 },
            "med-9": { stockStatus: "in_stock", quantity: 10, lastConfirmed: "30 mins ago", price: 1540 },
            "med-11": { stockStatus: "in_stock", quantity: 60, lastConfirmed: "5 mins ago", price: 220 },
            "med-12": { stockStatus: "in_stock", quantity: 90, lastConfirmed: "5 mins ago", price: 48 },
            "med-15": { stockStatus: "in_stock", quantity: 25, lastConfirmed: "15 mins ago", price: 325 },
            "med-17": { stockStatus: "in_stock", quantity: 30, lastConfirmed: "5 mins ago", price: 799 },
            "med-18": { stockStatus: "in_stock", quantity: 5, lastConfirmed: "15 mins ago", price: 4899 },
        },
    },
    {
        id: "pharma-6",
        name: "Deccan Medical & Surgical (Koti Medical Market)",
        ownerName: "P. Maheshwar Rao",
        pharmacistName: "K. Venu Gopal, D.Pharm (Reg #19882/TS)",
        pharmacistRegNo: "TS/HYD/2017/12998",
        locality: "Koti / Sultan Bazar",
        areaName: "Bank Street, Medical Hub",
        address: "Shop 12, Ground Floor, Central Medical Complex, Bank Street, Koti, Hyderabad",
        city: "Hyderabad",
        pincode: "500095",
        phone: "+91 40 2465 7711",
        whatsapp: "+91 98499 11223",
        dcaLicenceNo: "TS/DCA/HYD/20/21-12998",
        dcaVerifiedDate: "10 Aug 2026",
        coldChainVerified: true,
        coldChainTempCurrent: "3.6°C (Monitored)",
        openingHours: "9:00 AM - 9:30 PM (Sun Closed)",
        isOpenNow: true,
        pickupAvailable: true,
        localDeliveryAvailable: true,
        deliveryTimeEst: "40-50 mins (Central & Old City)",
        rating: 4.9,
        reviewsCount: 510,
        discountNote: "Koti wholesale-rate pricing passed directly to local patients",
        inventory: {
            "med-1": { stockStatus: "in_stock", quantity: 35, lastConfirmed: "3 mins ago", price: 785 },
            "med-2": { stockStatus: "in_stock", quantity: 25, lastConfirmed: "10 mins ago", price: 599 },
            "med-3": { stockStatus: "in_stock", quantity: 15, lastConfirmed: "20 mins ago", price: 1375 },
            "med-5": { stockStatus: "in_stock", quantity: 40, lastConfirmed: "3 mins ago", price: 675 },
            "med-7": { stockStatus: "in_stock", quantity: 80, lastConfirmed: "5 mins ago", price: 160 },
            "med-10": { stockStatus: "in_stock", quantity: 30, lastConfirmed: "10 mins ago", price: 925 },
            "med-11": { stockStatus: "in_stock", quantity: 100, lastConfirmed: "3 mins ago", price: 215 },
            "med-13": { stockStatus: "in_stock", quantity: 25, lastConfirmed: "15 mins ago", price: 770 },
            "med-16": { stockStatus: "in_stock", quantity: 8, lastConfirmed: "25 mins ago", price: 3300 },
            "med-17": { stockStatus: "in_stock", quantity: 60, lastConfirmed: "5 mins ago", price: 785 },
            "med-19": { stockStatus: "in_stock", quantity: 80, lastConfirmed: "10 mins ago", price: 1100 },
        },
    },
    {
        id: "pharma-7",
        name: "Pradhan Mantri Jan Aushadhi Kendra (PMBJP) - Osmania Hospital",
        ownerName: "Govt Authorized Society",
        pharmacistName: "Dr. B. Naveen Kumar, Registered Pharmacist",
        pharmacistRegNo: "TS/PMBJP/2020/004",
        locality: "Afzal Gunj / Osmania",
        areaName: "Near Emergency Gate, Osmania General Hospital",
        address: "PMBJP Kendra 441, Osmania Hospital Gate, Afzal Gunj, Hyderabad, Telangana",
        city: "Hyderabad",
        pincode: "500012",
        phone: "+91 40 2460 0121",
        whatsapp: "+91 94900 11223",
        dcaLicenceNo: "TS/DCA/PMBJP/HYD/2020-04",
        dcaVerifiedDate: "01 Aug 2026",
        coldChainVerified: true,
        coldChainTempCurrent: "4.4°C (Monitored)",
        openingHours: "8:00 AM - 8:00 PM (All Days)",
        isOpenNow: true,
        pickupAvailable: true,
        localDeliveryAvailable: false,
        deliveryTimeEst: "Counter Pickup Only (Govt Kendra)",
        rating: 4.8,
        reviewsCount: 650,
        discountNote: "Up to 80%-90% cost reduction on standard generic insulins and metformin",
        inventory: {
            "med-1": { stockStatus: "in_stock", quantity: 20, lastConfirmed: "30 mins ago", price: 320 },
            "med-5": { stockStatus: "in_stock", quantity: 30, lastConfirmed: "30 mins ago", price: 140 },
            "med-7": { stockStatus: "in_stock", quantity: 50, lastConfirmed: "15 mins ago", price: 135 },
            "med-10": { stockStatus: "in_stock", quantity: 40, lastConfirmed: "20 mins ago", price: 145 },
            "med-11": { stockStatus: "in_stock", quantity: 150, lastConfirmed: "10 mins ago", price: 24 },
            "med-12": { stockStatus: "in_stock", quantity: 200, lastConfirmed: "10 mins ago", price: 8 },
            "med-13": { stockStatus: "in_stock", quantity: 30, lastConfirmed: "40 mins ago", price: 78 },
            "med-15": { stockStatus: "in_stock", quantity: 50, lastConfirmed: "20 mins ago", price: 36 },
            "med-17": { stockStatus: "in_stock", quantity: 45, lastConfirmed: "15 mins ago", price: 450 },
        },
    },
    {
        id: "pharma-8",
        name: "Shri Sai Ram Medicals & Diabeta Corner",
        ownerName: "G. V. Krishna",
        pharmacistName: "G. V. Krishna, B.Pharm (Reg #32810/TS)",
        pharmacistRegNo: "TS/DIL/2019/66541",
        locality: "Dilsukhnagar",
        areaName: "Near Chaitanyapuri Metro Station",
        address: "Shop 2, Sai Ram Complex, Main Road, Dilsukhnagar, Hyderabad, Telangana",
        city: "Hyderabad",
        pincode: "500060",
        phone: "+91 40 2404 5566",
        whatsapp: "+91 98480 99887",
        dcaLicenceNo: "TS/DCA/DIL/20/21-66541",
        dcaVerifiedDate: "14 Aug 2026",
        coldChainVerified: true,
        coldChainTempCurrent: "3.7°C (Monitored)",
        openingHours: "7:30 AM - 11:00 PM",
        isOpenNow: true,
        pickupAvailable: true,
        localDeliveryAvailable: true,
        deliveryTimeEst: "20-30 mins (Dilsukhnagar, Chaitanyapuri, LB Nagar, Kothapet)",
        rating: 4.8,
        reviewsCount: 290,
        discountNote: "18% flat discount on insulins + free ice-pack travel bag for insulins",
        inventory: {
            "med-1": { stockStatus: "in_stock", quantity: 16, lastConfirmed: "12 mins ago", price: 795 },
            "med-2": { stockStatus: "in_stock", quantity: 10, lastConfirmed: "25 mins ago", price: 610 },
            "med-5": { stockStatus: "in_stock", quantity: 25, lastConfirmed: "10 mins ago", price: 685 },
            "med-7": { stockStatus: "in_stock", quantity: 35, lastConfirmed: "15 mins ago", price: 165 },
            "med-11": { stockStatus: "in_stock", quantity: 70, lastConfirmed: "10 mins ago", price: 220 },
            "med-12": { stockStatus: "in_stock", quantity: 85, lastConfirmed: "10 mins ago", price: 48 },
            "med-13": { stockStatus: "in_stock", quantity: 14, lastConfirmed: "30 mins ago", price: 780 },
            "med-17": { stockStatus: "in_stock", quantity: 30, lastConfirmed: "10 mins ago", price: 799 },
            "med-19": { stockStatus: "in_stock", quantity: 40, lastConfirmed: "15 mins ago", price: 1150 },
        },
    },
];

// ---------------- LOCAL DEMAND RADAR (For Hyderabad Pharmacies) ----------------

export const LOCAL_DEMAND_RADAR: DemandSearchItem[] = [
    {
        id: "dem-1",
        medicineName: "Lantus SoloStar Pen (Insulin Glargine 100IU)",
        searchesCountLast24h: 184,
        localSupplyStatus: "high_demand_low_stock",
        averageLocalPrice: 795,
        suggestedStockAction: "Increase safety stock by 10 units. High demand in Banjara Hills & Madhapur.",
    },
    {
        id: "dem-2",
        medicineName: "NovoRapid FlexPen (Insulin Aspart 100U)",
        searchesCountLast24h: 142,
        localSupplyStatus: "adequate",
        averageLocalPrice: 685,
        suggestedStockAction: "Stock levels healthy. Ensure cold-chain 2-8°C temp log is updated daily.",
    },
    {
        id: "dem-3",
        medicineName: "Generic Metformin 500mg (Jan Aushadhi / Glycomet)",
        searchesCountLast24h: 310,
        localSupplyStatus: "adequate",
        averageLocalPrice: 48,
        suggestedStockAction: "Fastest moving daily refill. Maintain minimum 150 strips on shelf.",
    },
    {
        id: "dem-4",
        medicineName: "Rybelsus 7mg (Oral Semaglutide)",
        searchesCountLast24h: 89,
        localSupplyStatus: "frequent_shortage",
        averageLocalPrice: 3350,
        suggestedStockAction: "High search spikes from corporate IT corridor (Hitec City/Gachibowli).",
    },
    {
        id: "dem-5",
        medicineName: "Accu-Chek Active 50 Test Strips",
        searchesCountLast24h: 215,
        localSupplyStatus: "high_demand_low_stock",
        averageLocalPrice: 799,
        suggestedStockAction: "Patients consistently asking for 50-strip packs. Offer bundle discounts.",
    },
];

// ---------------- INITIAL DEMO RESERVATIONS ----------------

export const INITIAL_RESERVATIONS: ReservationRequest[] = [
    {
        id: "RES-HYD-1082",
        patientName: "Srinivas Rao K.",
        patientPhone: "+91 98491 88234",
        patientEmail: "srinivas.rao@gmail.com",
        items: [
            {
                productId: "med-1",
                productName: "Lantus SoloStar Pen",
                strength: "100 IU/ml (3ml)",
                quantity: 2,
                unitPrice: 795,
                requiresColdChain: true,
            },
            {
                productId: "med-17",
                productName: "Accu-Chek Active 50 Strips",
                strength: "50 Strips",
                quantity: 1,
                unitPrice: 799,
                requiresColdChain: false,
            },
        ],
        pharmacyId: "pharma-1",
        pharmacyName: "Sri Balaji Medical & Diabetes Care",
        pharmacyLocality: "Banjara Hills, Road No. 12",
        fulfilmentMode: "pickup",
        prescriptionUploaded: true,
        prescriptionFileName: "dr_reddy_prescription_aug2026.pdf",
        status: "confirmed_held",
        createdAt: "Today, 2:15 PM",
        holdExpiresAt: "Today, 6:15 PM (4 Hour Hold)",
        totalAmount: 2389,
        savingsVersusCorporate: 656,
        coldChainDisclaimerAccepted: true,
    },
    {
        id: "RES-HYD-1083",
        patientName: "Ayesha Fatima",
        patientPhone: "+91 97002 33445",
        items: [
            {
                productId: "med-5",
                productName: "NovoRapid FlexPen",
                strength: "100 U/ml",
                quantity: 1,
                unitPrice: 685,
                requiresColdChain: true,
            },
            {
                productId: "med-11",
                productName: "Glycomet-GP 2 Forte",
                strength: "1000mg/2mg",
                quantity: 2,
                unitPrice: 220,
                requiresColdChain: false,
            },
        ],
        pharmacyId: "pharma-2",
        pharmacyName: "Meenakshi Pharma & Surgical Hub",
        pharmacyLocality: "Madhapur, 100 Feet Road",
        fulfilmentMode: "local_delivery",
        deliveryAddress: "Flat 402, Cyber Heights, Hitec City Phase 2",
        prescriptionUploaded: true,
        prescriptionFileName: "ayesha_rx_endocrine_2026.jpg",
        status: "pending_pharmacy_review",
        createdAt: "Today, 3:45 PM",
        holdExpiresAt: "Today, 7:45 PM",
        totalAmount: 1125,
        savingsVersusCorporate: 270,
        coldChainDisclaimerAccepted: true,
    },
];

// Helper to calculate total savings
export function calculateBasketSavings(items: Array<{ productId: string; quantity: number }>): {
    totalCorporateMrp: number;
    totalPartnerPrice: number;
    totalSavings: number;
    savingsPercent: number;
} {
    let totalCorporateMrp = 0;
    let totalPartnerPrice = 0;

    items.forEach((item) => {
        const product = MASTER_MEDICINES.find((m) => m.id === item.productId);
        if (product) {
            totalCorporateMrp += product.corporateGiantMrp * item.quantity;
            totalPartnerPrice += product.localPartnerPrice * item.quantity;
        }
    });

    const totalSavings = Math.max(0, totalCorporateMrp - totalPartnerPrice);
    const savingsPercent = totalCorporateMrp > 0 ? Math.round((totalSavings / totalCorporateMrp) * 100) : 0;

    return {
        totalCorporateMrp,
        totalPartnerPrice,
        totalSavings,
        savingsPercent,
    };
}
