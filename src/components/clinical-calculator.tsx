"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Calculator, Utensils, Activity, AlertTriangle, CheckCircle2,
    Info, Search, Plus, Trash2, ShieldAlert, Sparkles
} from "lucide-react";
import { INDIAN_FOOD_DATABASE, IndianFoodItem, calculateInsulinBolus } from "@/lib/clinical-tools";

export function ClinicalCalculator() {
    // Bolus calculator states
    const [currentBg, setCurrentBg] = useState<number>(165);
    const [targetBg, setTargetBg] = useState<number>(100);
    const [carbRatio, setCarbRatio] = useState<number>(10);
    const [isf, setIsf] = useState<number>(35);
    const [carbs, setCarbs] = useState<number>(45);
    const [iob, setIob] = useState<number>(0);

    // Food Database & Meal Plate state
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [mealPlate, setMealPlate] = useState<Array<{ item: IndianFoodItem; quantity: number }>>([
        { item: INDIAN_FOOD_DATABASE[0], quantity: 2 }, // 2 Rotis
        { item: INDIAN_FOOD_DATABASE[10], quantity: 1 }  // 1 Dal Tadka
    ]);

    // HbA1c Converter states
    const [inputA1c, setInputA1c] = useState<number>(6.8);
    const [inputAvgGlucose, setInputAvgGlucose] = useState<number>(148);

    // Calculation result
    const bolusResult = calculateInsulinBolus({
        targetBg,
        currentBg,
        carbRatio,
        isf,
        totalCarbs: carbs,
        activeInsulinOnBoard: iob
    });

    // Plate total carbs
    const totalPlateCarbs = mealPlate.reduce((acc, curr) => acc + (curr.item.carbsGrams * curr.quantity), 0);
    const totalPlateCalories = mealPlate.reduce((acc, curr) => acc + (curr.item.calories * curr.quantity), 0);
    const totalPlateExchanges = (totalPlateCarbs / 15).toFixed(1);

    // Filter foods
    const filteredFoods = INDIAN_FOOD_DATABASE.filter(f => {
        const matchesCategory = selectedCategory === "All" || f.category === selectedCategory;
        const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.tips.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const addItemToPlate = (item: IndianFoodItem) => {
        const existing = mealPlate.find(p => p.item.id === item.id);
        if (existing) {
            setMealPlate(mealPlate.map(p => p.item.id === item.id ? { ...p, quantity: p.quantity + 1 } : p));
        } else {
            setMealPlate([...mealPlate, { item, quantity: 1 }]);
        }
    };

    const removeItemFromPlate = (itemId: string) => {
        setMealPlate(mealPlate.filter(p => p.item.id !== itemId));
    };

    const updateQuantity = (itemId: string, delta: number) => {
        setMealPlate(mealPlate.map(p => {
            if (p.item.id === itemId) {
                const nextQty = Math.max(1, p.quantity + delta);
                return { ...p, quantity: nextQty };
            }
            return p;
        }));
    };

    const applyMealPlateCarbs = () => {
        setCarbs(totalPlateCarbs);
    };

    return (
        <Card className="w-full shadow-xl border-slate-200 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#003E7E] to-[#005bb7] text-white p-6 sm:p-8">
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                        <Badge className="bg-[#E31C79] text-white hover:bg-[#c21565] border-none mb-2 font-bold">
                            CLINICAL ASSISTANT
                        </Badge>
                        <CardTitle className="text-2xl sm:text-3xl font-black flex items-center gap-3">
                            <Calculator className="h-7 w-7 text-[#009CDF]" />
                            Diabetes Calculators & Carb Guide
                        </CardTitle>
                        <CardDescription className="text-blue-100 text-sm sm:text-base mt-1">
                            Educational tools for insulin dosing, Indian carbohydrate counting, and HbA1c conversion.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6">
                <Tabs defaultValue="bolus" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 mb-8">
                        <TabsTrigger value="bolus" className="data-[state=active]:bg-[#003E7E] data-[state=active]:text-white font-bold text-xs sm:text-sm py-2.5">
                            <Activity className="h-4 w-4 mr-2 hidden sm:inline" />
                            Bolus Calculator
                        </TabsTrigger>
                        <TabsTrigger value="carbs" className="data-[state=active]:bg-[#003E7E] data-[state=active]:text-white font-bold text-xs sm:text-sm py-2.5">
                            <Utensils className="h-4 w-4 mr-2 hidden sm:inline" />
                            Indian Carb Guide
                        </TabsTrigger>
                        <TabsTrigger value="a1c" className="data-[state=active]:bg-[#003E7E] data-[state=active]:text-white font-bold text-xs sm:text-sm py-2.5">
                            <Sparkles className="h-4 w-4 mr-2 hidden sm:inline" />
                            HbA1c / eAG Converter
                        </TabsTrigger>
                    </TabsList>

                    {/* TAB 1: BOLUS CALCULATOR */}
                    <TabsContent value="bolus" className="space-y-6">
                        <div className="grid lg:grid-cols-3 gap-6 items-start">
                            {/* Input Form */}
                            <div className="lg:col-span-2 space-y-5 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                <h3 className="font-bold text-lg text-[#003E7E] flex items-center gap-2">
                                    <span>Enter Current Parameters</span>
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                            Current Blood Sugar (mg/dL)
                                        </label>
                                        <Input
                                            type="number"
                                            value={currentBg}
                                            onChange={(e) => setCurrentBg(parseFloat(e.target.value) || 0)}
                                            className="bg-white text-base font-semibold border-slate-300"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                            Target Blood Sugar (mg/dL)
                                        </label>
                                        <Input
                                            type="number"
                                            value={targetBg}
                                            onChange={(e) => setTargetBg(parseFloat(e.target.value) || 100)}
                                            className="bg-white text-base font-semibold border-slate-300"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex justify-between">
                                            <span>Carbohydrates to Eat (g)</span>
                                            <button
                                                type="button"
                                                onClick={applyMealPlateCarbs}
                                                className="text-[#009CDF] hover:underline text-[11px] font-normal"
                                            >
                                                Use Plate ({totalPlateCarbs}g)
                                            </button>
                                        </label>
                                        <Input
                                            type="number"
                                            value={carbs}
                                            onChange={(e) => setCarbs(parseFloat(e.target.value) || 0)}
                                            className="bg-white text-base font-semibold border-slate-300"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                            Insulin-to-Carb Ratio (I:C)
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-slate-500">1 unit per</span>
                                            <Input
                                                type="number"
                                                value={carbRatio}
                                                onChange={(e) => setCarbRatio(parseFloat(e.target.value) || 10)}
                                                className="bg-white text-base font-semibold border-slate-300"
                                            />
                                            <span className="text-xs font-bold text-slate-500">g carbs</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                            Correction Factor (ISF)
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-slate-500">1 unit drops</span>
                                            <Input
                                                type="number"
                                                value={isf}
                                                onChange={(e) => setIsf(parseFloat(e.target.value) || 30)}
                                                className="bg-white text-base font-semibold border-slate-300"
                                            />
                                            <span className="text-xs font-bold text-slate-500">mg/dL</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                            Active Insulin on Board (IOB)
                                        </label>
                                        <Input
                                            type="number"
                                            step="0.5"
                                            value={iob}
                                            onChange={(e) => setIob(parseFloat(e.target.value) || 0)}
                                            className="bg-white text-base font-semibold border-slate-300"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    <span className="text-xs text-slate-500 font-bold self-center">Quick Scenarios:</span>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="text-xs rounded-full"
                                        onClick={() => { setCurrentBg(110); setCarbs(30); setIob(0); }}
                                    >
                                        Light Breakfast (30g, BG 110)
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="text-xs rounded-full"
                                        onClick={() => { setCurrentBg(210); setCarbs(60); setIob(0); }}
                                    >
                                        High BG + Lunch (60g, BG 210)
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="text-xs rounded-full"
                                        onClick={() => { setCurrentBg(65); setCarbs(15); setIob(0); }}
                                    >
                                        Hypo Event (BG 65)
                                    </Button>
                                </div>
                            </div>

                            {/* Calculation Breakdown & Output */}
                            <div className="bg-gradient-to-br from-[#003E7E] to-[#00264d] text-white p-6 rounded-2xl shadow-xl space-y-6">
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-blue-200">
                                        Suggested Dose Calculation
                                    </span>
                                    <div className="mt-2 flex items-baseline gap-2">
                                        <span className="text-5xl font-black text-white">
                                            {bolusResult.recommendedBolus}
                                        </span>
                                        <span className="text-xl font-bold text-[#009CDF]">Units (Regular / Rapid)</span>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-white/20 text-sm">
                                    <div className="flex justify-between items-center text-blue-100">
                                        <span>Carb Bolus ({carbs}g ÷ {carbRatio}):</span>
                                        <span className="font-bold text-white">+{bolusResult.carbBolus} u</span>
                                    </div>
                                    <div className="flex justify-between items-center text-blue-100">
                                        <span>Correction (({currentBg} - {targetBg}) ÷ {isf}):</span>
                                        <span className="font-bold text-white">
                                            {bolusResult.correctionBolus >= 0 ? `+${bolusResult.correctionBolus}` : `${bolusResult.correctionBolus}`} u
                                        </span>
                                    </div>
                                    {iob > 0 && (
                                        <div className="flex justify-between items-center text-red-300">
                                            <span>Active Insulin (IOB) Deducted:</span>
                                            <span className="font-bold">-{bolusResult.activeInsulinDeduction} u</span>
                                        </div>
                                    )}
                                </div>

                                {bolusResult.isHypoRisk && (
                                    <div className="p-3 bg-red-500/20 border border-red-400 rounded-xl text-xs text-red-200 flex gap-2 items-start">
                                        <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                                        <span>
                                            <strong>Hypoglycemia Alert:</strong> BG is below 70 mg/dL. Treat immediately with 15g fast-acting glucose before administering any insulin.
                                        </span>
                                    </div>
                                )}

                                <div className="p-3 bg-white/10 rounded-xl text-[11px] text-blue-200 flex gap-2">
                                    <ShieldAlert className="h-4 w-4 shrink-0 text-yellow-300 mt-0.5" />
                                    <span>
                                        <strong>Medical Disclaimer:</strong> For educational purposes only. Always verify your specific carb ratios and correction factors with your certified endocrinologist.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* TAB 2: INDIAN CARB GUIDE & MEAL PLATE BUILDER */}
                    <TabsContent value="carbs" className="space-y-6">
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Left: Food Database */}
                            <div className="lg:col-span-2 space-y-4">
                                <div className="flex flex-col sm:flex-row gap-3 justify-between">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            placeholder="Search Indian foods (e.g., Roti, Dosa, Rajma, Mango)..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-9 bg-slate-50"
                                        />
                                    </div>
                                </div>

                                {/* Category Filters */}
                                <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
                                    {["All", "Breads & Roti", "Rice & Grains", "Breakfast", "Curries & Dals", "Fruits", "Snacks & Sweets", "Beverages"].map(cat => (
                                        <Button
                                            key={cat}
                                            type="button"
                                            size="sm"
                                            variant={selectedCategory === cat ? "default" : "outline"}
                                            className={`rounded-full text-xs h-8 ${selectedCategory === cat ? "bg-[#003E7E]" : "text-slate-600"}`}
                                            onClick={() => setSelectedCategory(cat)}
                                        >
                                            {cat}
                                        </Button>
                                    ))}
                                </div>

                                {/* Food Items Grid */}
                                <div className="grid sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
                                    {filteredFoods.map(food => (
                                        <div
                                            key={food.id}
                                            className="p-4 bg-white rounded-xl border border-slate-200 hover:border-[#009CDF] hover:shadow-md transition-all flex flex-col justify-between"
                                        >
                                            <div>
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="font-bold text-slate-900 text-sm">{food.name}</h4>
                                                    <Badge
                                                        variant="secondary"
                                                        className={`text-[10px] ${food.glycemicIndex === 'Low' ? 'bg-green-100 text-green-800' : food.glycemicIndex === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}
                                                    >
                                                        {food.glycemicIndex} GI
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-slate-500 mb-2">Portion: {food.portion}</p>
                                                <div className="flex items-center gap-3 text-xs mb-3">
                                                    <span className="font-black text-[#003E7E]">{food.carbsGrams}g Carbs</span>
                                                    <span className="text-slate-400">•</span>
                                                    <span className="text-slate-600">{food.carbExchanges} Exchanges</span>
                                                    <span className="text-slate-400">•</span>
                                                    <span className="text-slate-500">{food.calories} kcal</span>
                                                </div>
                                                <p className="text-[11px] text-slate-600 italic line-clamp-2 bg-slate-50 p-2 rounded-lg mb-3">
                                                    "{food.tips}"
                                                </p>
                                            </div>

                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="outline"
                                                className="w-full border-[#003E7E] text-[#003E7E] hover:bg-blue-50 font-bold text-xs h-8"
                                                onClick={() => addItemToPlate(food)}
                                            >
                                                <Plus className="h-3.5 w-3.5 mr-1" /> Add to Meal Plate
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Meal Plate Builder */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-bold text-[#003E7E] flex items-center gap-2">
                                            <Utensils className="h-5 w-5 text-[#E31C79]" />
                                            My Current Meal Plate
                                        </h3>
                                        {mealPlate.length > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => setMealPlate([])}
                                                className="text-xs text-red-600 hover:underline"
                                            >
                                                Clear Plate
                                            </button>
                                        )}
                                    </div>

                                    {mealPlate.length === 0 ? (
                                        <div className="text-center py-12 text-slate-400 text-sm">
                                            Your plate is empty. Add Indian foods from the list on the left to tally meal carbs!
                                        </div>
                                    ) : (
                                        <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                                            {mealPlate.map(item => (
                                                <div key={item.item.id} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                                                    <div className="flex-1 pr-2">
                                                        <p className="font-bold text-slate-800">{item.item.name}</p>
                                                        <p className="text-slate-500">{item.item.carbsGrams * item.quantity}g carbs ({item.item.calories * item.quantity} kcal)</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center border rounded-lg overflow-hidden bg-slate-50">
                                                            <button
                                                                type="button"
                                                                onClick={() => updateQuantity(item.item.id, -1)}
                                                                className="px-2 py-1 hover:bg-slate-200 font-bold"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="px-2 font-bold">{item.quantity}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => updateQuantity(item.item.id, 1)}
                                                                className="px-2 py-1 hover:bg-slate-200 font-bold"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeItemFromPlate(item.item.id)}
                                                            className="text-slate-400 hover:text-red-500 p-1"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-slate-200 mt-6 space-y-4">
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        <div className="bg-white p-2 rounded-xl border">
                                            <span className="text-[10px] uppercase font-bold text-slate-400">Total Carbs</span>
                                            <p className="text-lg font-black text-[#003E7E]">{totalPlateCarbs}g</p>
                                        </div>
                                        <div className="bg-white p-2 rounded-xl border">
                                            <span className="text-[10px] uppercase font-bold text-slate-400">Exchanges</span>
                                            <p className="text-lg font-black text-[#E31C79]">{totalPlateExchanges}</p>
                                        </div>
                                        <div className="bg-white p-2 rounded-xl border">
                                            <span className="text-[10px] uppercase font-bold text-slate-400">Calories</span>
                                            <p className="text-lg font-black text-slate-700">{totalPlateCalories}</p>
                                        </div>
                                    </div>

                                    <Button
                                        type="button"
                                        className="w-full bg-[#003E7E] hover:bg-[#002a5e] font-bold text-sm h-11 rounded-xl"
                                        disabled={mealPlate.length === 0}
                                        onClick={() => {
                                            applyMealPlateCarbs();
                                            const bolusTab = document.querySelector('[value="bolus"]') as HTMLElement;
                                            if (bolusTab) bolusTab.click();
                                        }}
                                    >
                                        Calculate Insulin for this Meal ({totalPlateCarbs}g) →
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* TAB 3: HBA1C / EAG CONVERTER */}
                    <TabsContent value="a1c" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-50 p-8 rounded-2xl border border-slate-200">
                            {/* HbA1c to eAG */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                                <h3 className="font-bold text-lg text-[#003E7E]">HbA1c to Estimated Average Glucose (eAG)</h3>
                                <p className="text-xs text-slate-500">Based on ADAG clinical correlation formula: eAG = 28.7 × HbA1c - 46.7</p>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">HbA1c Percentage (%)</label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        value={inputA1c}
                                        onChange={(e) => setInputA1c(parseFloat(e.target.value) || 0)}
                                        className="text-lg font-bold"
                                    />
                                </div>

                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <span className="text-xs text-slate-600">Estimated Average Blood Glucose:</span>
                                    <div className="text-3xl font-black text-[#003E7E] mt-1">
                                        {Math.max(0, Math.round(28.7 * inputA1c - 46.7))} <span className="text-sm font-semibold">mg/dL</span>
                                    </div>
                                    <span className="text-xs text-slate-500">
                                        ({(Math.max(0, 28.7 * inputA1c - 46.7) / 18.0182).toFixed(1)} mmol/L)
                                    </span>
                                </div>
                            </div>

                            {/* Reference Clinical Ranges Table */}
                            <div className="space-y-4">
                                <h4 className="font-bold text-[#003E7E] text-base">Standard Clinical Targets (ADA 2026)</h4>
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between items-center p-2.5 bg-green-50 text-green-900 rounded-lg border border-green-200">
                                        <span><strong>Normal (Non-Diabetic):</strong> &lt; 5.7%</span>
                                        <span className="font-bold">&lt; 117 mg/dL</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2.5 bg-yellow-50 text-yellow-900 rounded-lg border border-yellow-200">
                                        <span><strong>Pre-Diabetes:</strong> 5.7% – 6.4%</span>
                                        <span className="font-bold">117 – 137 mg/dL</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2.5 bg-blue-50 text-blue-900 rounded-lg border border-blue-200">
                                        <span><strong>Target for Most Diabetics:</strong> &lt; 7.0%</span>
                                        <span className="font-bold">&lt; 154 mg/dL</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2.5 bg-red-50 text-red-900 rounded-lg border border-red-200">
                                        <span><strong>Action Required:</strong> &gt; 8.0%</span>
                                        <span className="font-bold">&gt; 183 mg/dL</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
