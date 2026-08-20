export interface IndianFoodItem {
    id: string;
    name: string;
    category: "Breads & Roti" | "Rice & Grains" | "Breakfast" | "Curries & Dals" | "Fruits" | "Snacks & Sweets" | "Beverages";
    portion: string;
    carbsGrams: number;
    proteinGrams: number;
    fatGrams: number;
    calories: number;
    glycemicIndex: "Low" | "Medium" | "High";
    carbExchanges: number; // 1 exchange = 15g carbs
    tips: string;
}

export const INDIAN_FOOD_DATABASE: IndianFoodItem[] = [
    {
        id: "f-1",
        name: "Phulka / Roti (Whole Wheat)",
        category: "Breads & Roti",
        portion: "1 medium (30g)",
        carbsGrams: 15,
        proteinGrams: 3,
        fatGrams: 0.5,
        calories: 75,
        glycemicIndex: "Medium",
        carbExchanges: 1.0,
        tips: "Ideal staple. 1 Roti = exactly 1 carb exchange (15g). Combine with ghee/dal to reduce glycemic spike."
    },
    {
        id: "f-2",
        name: "Jowar / Bajra Roti",
        category: "Breads & Roti",
        portion: "1 medium (40g)",
        carbsGrams: 18,
        proteinGrams: 4,
        fatGrams: 1,
        calories: 95,
        glycemicIndex: "Low",
        carbExchanges: 1.2,
        tips: "High fiber and complex grain. Slower glucose absorption than refined flour."
    },
    {
        id: "f-3",
        name: "Aloo Paratha",
        category: "Breads & Roti",
        portion: "1 medium (100g)",
        carbsGrams: 36,
        proteinGrams: 6,
        fatGrams: 10,
        calories: 260,
        glycemicIndex: "Medium",
        carbExchanges: 2.4,
        tips: "Higher carb load due to potato filling. Pair with plain curd to blunt the post-meal rise."
    },
    {
        id: "f-4",
        name: "Paneer Paratha",
        category: "Breads & Roti",
        portion: "1 medium (100g)",
        carbsGrams: 24,
        proteinGrams: 12,
        fatGrams: 12,
        calories: 250,
        glycemicIndex: "Low",
        carbExchanges: 1.6,
        tips: "Higher protein and fat content slows carbohydrate breakdown, leading to flatter glucose curves."
    },
    {
        id: "f-5",
        name: "Steamed White Rice",
        category: "Rice & Grains",
        portion: "1 katori / cup cooked (150g)",
        carbsGrams: 45,
        proteinGrams: 4,
        fatGrams: 0.5,
        calories: 205,
        glycemicIndex: "High",
        carbExchanges: 3.0,
        tips: "High GI. 1 cup equals 3 carb exchanges (45g carbs). Mix with generous vegetables and dal."
    },
    {
        id: "f-6",
        name: "Cooked Brown Rice",
        category: "Rice & Grains",
        portion: "1 katori / cup cooked (150g)",
        carbsGrams: 35,
        proteinGrams: 4.5,
        fatGrams: 1.5,
        calories: 170,
        glycemicIndex: "Medium",
        carbExchanges: 2.3,
        tips: "Higher bran content provides 3g fiber, providing steadier energy release."
    },
    {
        id: "f-7",
        name: "Steamed Idli",
        category: "Breakfast",
        portion: "2 medium idlis (80g total)",
        carbsGrams: 30,
        proteinGrams: 4,
        fatGrams: 0.5,
        calories: 140,
        glycemicIndex: "Medium",
        carbExchanges: 2.0,
        tips: "Fermented batter aids digestion. 2 Idlis = 2 carb exchanges (30g carbs). Enjoy with vegetable sambar."
    },
    {
        id: "f-8",
        name: "Plain Crispy Dosa",
        category: "Breakfast",
        portion: "1 medium plain (70g)",
        carbsGrams: 26,
        proteinGrams: 3.5,
        fatGrams: 4,
        calories: 155,
        glycemicIndex: "Medium",
        carbExchanges: 1.7,
        tips: "Limit oil and pair with coconut/tomato chutney and lentil sambar."
    },
    {
        id: "f-9",
        name: "Poha (Flattened Rice with Veggies)",
        category: "Breakfast",
        portion: "1 medium bowl (150g)",
        carbsGrams: 38,
        proteinGrams: 5,
        fatGrams: 6,
        calories: 225,
        glycemicIndex: "Medium",
        carbExchanges: 2.5,
        tips: "Add boiled sprouts and peanuts to increase protein and lower effective GI."
    },
    {
        id: "f-10",
        name: "Moong Dal Chilla / Pesarattu",
        category: "Breakfast",
        portion: "2 medium chillas (100g)",
        carbsGrams: 22,
        proteinGrams: 10,
        fatGrams: 4,
        calories: 165,
        glycemicIndex: "Low",
        carbExchanges: 1.5,
        tips: "Superb diabetic breakfast choice. High protein, high fiber, very low glycemic excursion."
    },
    {
        id: "f-11",
        name: "Yellow Dal Tadka / Toor Dal",
        category: "Curries & Dals",
        portion: "1 katori / bowl (150g)",
        carbsGrams: 18,
        proteinGrams: 7,
        fatGrams: 3.5,
        calories: 130,
        glycemicIndex: "Low",
        carbExchanges: 1.2,
        tips: "Rich in plant protein and soluble fiber which stabilizes blood glucose."
    },
    {
        id: "f-12",
        name: "Rajma Masala (Kidney Beans)",
        category: "Curries & Dals",
        portion: "1 bowl (180g)",
        carbsGrams: 24,
        proteinGrams: 9,
        fatGrams: 4,
        calories: 170,
        glycemicIndex: "Low",
        carbExchanges: 1.6,
        tips: "Low GI complex legumes. Count 24g carbs for your meal bolus."
    },
    {
        id: "f-13",
        name: "Chana Masala (Chickpeas)",
        category: "Curries & Dals",
        portion: "1 bowl (180g)",
        carbsGrams: 26,
        proteinGrams: 8.5,
        fatGrams: 5,
        calories: 185,
        glycemicIndex: "Low",
        carbExchanges: 1.7,
        tips: "Chickpeas contain resistant starch which improves insulin sensitivity over time."
    },
    {
        id: "f-14",
        name: "Palak Paneer",
        category: "Curries & Dals",
        portion: "1 bowl (180g)",
        carbsGrams: 8,
        proteinGrams: 14,
        fatGrams: 15,
        calories: 225,
        glycemicIndex: "Low",
        carbExchanges: 0.5,
        tips: "Very low carbohydrate content (<8g). Mostly protein and healthy fats."
    },
    {
        id: "f-15",
        name: "Fresh Mango Slices",
        category: "Fruits",
        portion: "1 small cup (120g)",
        carbsGrams: 20,
        proteinGrams: 1,
        fatGrams: 0.5,
        calories: 85,
        glycemicIndex: "Medium",
        carbExchanges: 1.3,
        tips: "Eat as whole fruit (never juice) and limit to 1 cup after meals or with a few almonds."
    },
    {
        id: "f-16",
        name: "Medium Red Apple",
        category: "Fruits",
        portion: "1 whole apple (150g)",
        carbsGrams: 20,
        proteinGrams: 0.5,
        fatGrams: 0.3,
        calories: 80,
        glycemicIndex: "Low",
        carbExchanges: 1.3,
        tips: "High pectin fiber slows sugar release. Eat with skin."
    },
    {
        id: "f-17",
        name: "Ripe Banana",
        category: "Fruits",
        portion: "1 medium (110g)",
        carbsGrams: 27,
        proteinGrams: 1.2,
        fatGrams: 0.3,
        calories: 105,
        glycemicIndex: "Medium",
        carbExchanges: 1.8,
        tips: "Slightly greenish bananas have more resistant starch and lower glucose spikes."
    },
    {
        id: "f-18",
        name: "Gulab Jamun (Traditional Sweet)",
        category: "Snacks & Sweets",
        portion: "1 piece (40g)",
        carbsGrams: 26,
        proteinGrams: 2,
        fatGrams: 8,
        calories: 175,
        glycemicIndex: "High",
        carbExchanges: 1.7,
        tips: "Concentrated simple sugar syrup. If consuming, bolus in advance and balance with low carb meal."
    },
    {
        id: "f-19",
        name: "Indian Masala Chai (with 1 tsp sugar)",
        category: "Beverages",
        portion: "1 cup (150ml)",
        carbsGrams: 8,
        proteinGrams: 3,
        fatGrams: 3,
        calories: 70,
        glycemicIndex: "Medium",
        carbExchanges: 0.5,
        tips: "1 tsp sugar = 4g carbs + milk lactose = 4g carbs. Use stevia or cinnamon to avoid adding sugar."
    },
    {
        id: "f-20",
        name: "Plain Unsweetened Curd / Dahi",
        category: "Beverages",
        portion: "1 katori / cup (150g)",
        carbsGrams: 6,
        proteinGrams: 6,
        fatGrams: 5,
        calories: 90,
        glycemicIndex: "Low",
        carbExchanges: 0.4,
        tips: "Probiotic rich, low carbohydrate, and helps attenuate meal glucose excursions."
    }
];

export function calculateInsulinBolus(params: {
    targetBg: number; // e.g. 100 mg/dL
    currentBg: number; // e.g. 180 mg/dL
    carbRatio: number; // e.g. 10 (1 unit per 10g carbs)
    isf: number; // e.g. 30 (1 unit lowers 30 mg/dL)
    totalCarbs: number; // e.g. 45g
    activeInsulinOnBoard?: number; // e.g. 0.5 units
}) {
    const { targetBg, currentBg, carbRatio, isf, totalCarbs, activeInsulinOnBoard = 0 } = params;

    // Carb Bolus
    const carbBolus = carbRatio > 0 ? totalCarbs / carbRatio : 0;

    // Correction Bolus (only if current BG > target BG)
    let correctionBolus = 0;
    if (currentBg > targetBg && isf > 0) {
        correctionBolus = (currentBg - targetBg) / isf;
    } else if (currentBg < 70) {
        // Hypoglycemia caution
        correctionBolus = -1 * ((targetBg - currentBg) / isf);
    }

    const rawTotal = carbBolus + correctionBolus - activeInsulinOnBoard;
    const finalBolus = Math.max(0, Math.round(rawTotal * 10) / 10);

    return {
        carbBolus: Math.round(carbBolus * 10) / 10,
        correctionBolus: Math.round(correctionBolus * 10) / 10,
        activeInsulinDeduction: activeInsulinOnBoard,
        recommendedBolus: finalBolus,
        isHypoRisk: currentBg < 70,
        isHighSpike: currentBg > 220
    };
}
