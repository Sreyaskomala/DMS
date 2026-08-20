export interface HealthLogRow {
    id?: string;
    timestamp: string;
    date: string;
    day: string;
    thyronormTime?: string;
    actrapidMorning?: string;
    actrapidLunch?: string;
    actrapidDinner?: string;
    basaglarDose?: string;
    basaglarTime?: string;
    fbsValue?: string;
    fbsTime?: string;
    pbsValue?: string;
    pbsTime?: string;
    preLunchValue?: string;
    preLunchTime?: string;
    postLunchValue?: string;
    postLunchTime?: string;
    preDinnerValue?: string;
    preDinnerTime?: string;
    postDinnerValue?: string;
    postDinnerTime?: string;
    randomValue?: string;
    randomTime?: string;
    breakfastTime?: string;
    breakfastFood?: string;
    lunchTime?: string;
    lunchFood?: string;
    dinnerTime?: string;
    dinnerFood?: string;
    correctionDose?: string;
    bowelMovementTime?: string;
    sleepDuration?: string;
    mood?: "1" | "2" | "3" | "4" | "5";
    remarks?: string;
}

// 14 days of realistic, clinically diverse sample data
export const INITIAL_SAMPLE_LOGS: HealthLogRow[] = [
    {
        id: "log-14",
        timestamp: "2026-08-07 22:30:00",
        date: "2026-08-07",
        day: "Friday",
        thyronormTime: "06:30",
        actrapidMorning: "6",
        actrapidLunch: "8",
        actrapidDinner: "8",
        basaglarDose: "18",
        basaglarTime: "22:00",
        fbsValue: "112",
        fbsTime: "07:30",
        pbsValue: "145",
        pbsTime: "09:30",
        preLunchValue: "108",
        preLunchTime: "13:00",
        postLunchValue: "152",
        postLunchTime: "15:15",
        preDinnerValue: "118",
        preDinnerTime: "19:45",
        postDinnerValue: "160",
        postDinnerTime: "21:45",
        breakfastTime: "08:15",
        breakfastFood: "2 Idlis with Sambar and coconut chutney",
        lunchTime: "13:30",
        lunchFood: "2 Phulkas, Dal Tadka, Bhindi Sabzi & Salad",
        dinnerTime: "20:00",
        dinnerFood: "Brown Rice with Paneer Curry & Cucumber",
        sleepDuration: "7.5",
        mood: "4",
        remarks: "Energetic throughout the day. Glucose well in range."
    },
    {
        id: "log-13",
        timestamp: "2026-08-08 22:45:00",
        date: "2026-08-08",
        day: "Saturday",
        thyronormTime: "06:45",
        actrapidMorning: "6",
        actrapidLunch: "10",
        actrapidDinner: "8",
        basaglarDose: "18",
        basaglarTime: "22:00",
        fbsValue: "118",
        fbsTime: "08:00",
        pbsValue: "158",
        pbsTime: "10:00",
        preLunchValue: "115",
        preLunchTime: "13:15",
        postLunchValue: "188",
        postLunchTime: "15:30",
        preDinnerValue: "125",
        preDinnerTime: "20:00",
        postDinnerValue: "168",
        postDinnerTime: "22:15",
        correctionDose: "1u post-lunch correction",
        breakfastTime: "08:45",
        breakfastFood: "Oats Upma with veggies & Green Tea",
        lunchTime: "13:45",
        lunchFood: "Vegetable Biryani with Raita (Higher carbs)",
        dinnerTime: "20:30",
        dinnerFood: "2 Rotis with Methi Matar & Curd",
        sleepDuration: "8.0",
        mood: "4",
        remarks: "Post-lunch spike from Biryani, gave 1u correction. Controlled by dinner."
    },
    {
        id: "log-12",
        timestamp: "2026-08-09 23:00:00",
        date: "2026-08-09",
        day: "Sunday",
        thyronormTime: "07:00",
        actrapidMorning: "6",
        actrapidLunch: "8",
        actrapidDinner: "10",
        basaglarDose: "18",
        basaglarTime: "22:15",
        fbsValue: "105",
        fbsTime: "08:15",
        pbsValue: "140",
        pbsTime: "10:15",
        preLunchValue: "110",
        preLunchTime: "13:00",
        postLunchValue: "148",
        postLunchTime: "15:15",
        preDinnerValue: "120",
        preDinnerTime: "20:00",
        postDinnerValue: "195",
        postDinnerTime: "22:30",
        correctionDose: "1.5u pre-bedtime correction",
        breakfastTime: "09:00",
        breakfastFood: "Besan Chilla with mint chutney & Almonds",
        lunchTime: "13:30",
        lunchFood: "Multigrain Rotis, Rajma & Steamed salad",
        dinnerTime: "20:30",
        dinnerFood: "Dine out: Naan, Dal Makhani & small Gulab Jamun",
        sleepDuration: "7.0",
        mood: "3",
        remarks: "Family dinner outing, post-dinner reached 195. Took 1.5u correction."
    },
    {
        id: "log-11",
        timestamp: "2026-08-10 22:30:00",
        date: "2026-08-10",
        day: "Monday",
        thyronormTime: "06:30",
        actrapidMorning: "6",
        actrapidLunch: "8",
        actrapidDinner: "8",
        basaglarDose: "18",
        basaglarTime: "22:00",
        fbsValue: "128",
        fbsTime: "07:30",
        pbsValue: "162",
        pbsTime: "09:45",
        preLunchValue: "114",
        preLunchTime: "13:00",
        postLunchValue: "150",
        postLunchTime: "15:15",
        preDinnerValue: "112",
        preDinnerTime: "19:30",
        postDinnerValue: "155",
        postDinnerTime: "21:45",
        breakfastTime: "08:15",
        breakfastFood: "Poha with peanuts & sprouts",
        lunchTime: "13:30",
        lunchFood: "2 Rotis, Lauki Sabzi, Dal & Buttermilk",
        dinnerTime: "20:00",
        dinnerFood: "Moong Dal Khichdi with ghee & Curd",
        sleepDuration: "6.0",
        mood: "3",
        remarks: "Higher fasting sugar (128) due to late dinner yesterday and short sleep (6 hrs)."
    },
    {
        id: "log-10",
        timestamp: "2026-08-11 22:15:00",
        date: "2026-08-11",
        day: "Tuesday",
        thyronormTime: "06:30",
        actrapidMorning: "6",
        actrapidLunch: "8",
        actrapidDinner: "8",
        basaglarDose: "18",
        basaglarTime: "22:00",
        fbsValue: "109",
        fbsTime: "07:15",
        pbsValue: "138",
        pbsTime: "09:30",
        preLunchValue: "102",
        preLunchTime: "13:00",
        postLunchValue: "142",
        postLunchTime: "15:15",
        preDinnerValue: "108",
        preDinnerTime: "19:30",
        postDinnerValue: "146",
        postDinnerTime: "21:30",
        breakfastTime: "08:00",
        breakfastFood: "Eggs with whole wheat toast & Black coffee",
        lunchTime: "13:15",
        lunchFood: "Quinoa salad with grilled chicken & spinach",
        dinnerTime: "19:45",
        dinnerFood: "2 Phulkas, Tofu stir fry & clear soup",
        sleepDuration: "7.8",
        mood: "5",
        remarks: "Excellent control today. 100% time in range."
    },
    {
        id: "log-9",
        timestamp: "2026-08-12 22:30:00",
        date: "2026-08-12",
        day: "Wednesday",
        thyronormTime: "06:30",
        actrapidMorning: "6",
        actrapidLunch: "8",
        actrapidDinner: "8",
        basaglarDose: "18",
        basaglarTime: "22:00",
        fbsValue: "114",
        fbsTime: "07:30",
        pbsValue: "146",
        pbsTime: "09:45",
        preLunchValue: "106",
        preLunchTime: "13:00",
        postLunchValue: "154",
        postLunchTime: "15:20",
        preDinnerValue: "110",
        preDinnerTime: "19:30",
        postDinnerValue: "150",
        postDinnerTime: "21:40",
        breakfastTime: "08:15",
        breakfastFood: "Multigrain Dosa with Tomato Chutney",
        lunchTime: "13:30",
        lunchFood: "Brown rice with Chana Dal & cabbage poriyal",
        dinnerTime: "20:00",
        dinnerFood: "Vegetable Soup, 2 Rotis & Baingan Bharta",
        sleepDuration: "7.2",
        mood: "4",
        remarks: "Did 30 min brisk walk after dinner. Smooth nighttime glucose."
    },
    {
        id: "log-8",
        timestamp: "2026-08-13 22:45:00",
        date: "2026-08-13",
        day: "Thursday",
        thyronormTime: "06:30",
        actrapidMorning: "6",
        actrapidLunch: "8",
        actrapidDinner: "8",
        basaglarDose: "18",
        basaglarTime: "22:00",
        fbsValue: "106",
        fbsTime: "07:15",
        pbsValue: "142",
        pbsTime: "09:30",
        preLunchValue: "98",
        preLunchTime: "13:00",
        postLunchValue: "144",
        postLunchTime: "15:15",
        preDinnerValue: "104",
        preDinnerTime: "19:30",
        postDinnerValue: "148",
        postDinnerTime: "21:45",
        breakfastTime: "08:00",
        breakfastFood: "Greek yogurt with flaxseeds, walnuts & berries",
        lunchTime: "13:15",
        lunchFood: "2 Jowar rotis with Palak Paneer & sprouts salad",
        dinnerTime: "20:00",
        dinnerFood: "Grilled fish with steamed broccoli & beans",
        sleepDuration: "8.0",
        mood: "5",
        remarks: "Feeling energetic. Fasting 106 mg/dL."
    },
    {
        id: "log-7",
        timestamp: "2026-08-14 22:30:00",
        date: "2026-08-14",
        day: "Friday",
        thyronormTime: "06:30",
        actrapidMorning: "6",
        actrapidLunch: "8",
        actrapidDinner: "8",
        basaglarDose: "18",
        basaglarTime: "22:00",
        fbsValue: "110",
        fbsTime: "07:30",
        pbsValue: "149",
        pbsTime: "09:40",
        preLunchValue: "105",
        preLunchTime: "13:00",
        postLunchValue: "158",
        postLunchTime: "15:20",
        preDinnerValue: "116",
        preDinnerTime: "19:45",
        postDinnerValue: "162",
        postDinnerTime: "22:00",
        breakfastTime: "08:15",
        breakfastFood: "2 Ragi Idlis with Sambar",
        lunchTime: "13:30",
        lunchFood: "2 Rotis with Mixed Veggies, Dal & Raita",
        dinnerTime: "20:15",
        dinnerFood: "Millet Khichdi with Kadhi",
        sleepDuration: "7.0",
        mood: "4",
        remarks: "Stable day. Hydration maintained (>3 liters)."
    },
    {
        id: "log-6",
        timestamp: "2026-08-15 23:00:00",
        date: "2026-08-15",
        day: "Saturday",
        thyronormTime: "07:00",
        actrapidMorning: "6",
        actrapidLunch: "10",
        actrapidDinner: "8",
        basaglarDose: "18",
        basaglarTime: "22:15",
        fbsValue: "115",
        fbsTime: "08:00",
        pbsValue: "168",
        pbsTime: "10:15",
        preLunchValue: "118",
        preLunchTime: "13:30",
        postLunchValue: "182",
        postLunchTime: "15:45",
        preDinnerValue: "122",
        preDinnerTime: "20:00",
        postDinnerValue: "165",
        postDinnerTime: "22:15",
        breakfastTime: "08:45",
        breakfastFood: "Paneer Paratha with homemade curd",
        lunchTime: "14:00",
        lunchFood: "Festive lunch: Puri Chana & small sweet piece",
        dinnerTime: "20:30",
        dinnerFood: "Light vegetable soup & 1 Roti with Dal",
        sleepDuration: "7.5",
        mood: "4",
        remarks: "Independence day sweets, took 2 extra units of Actrapid for lunch. Recovered well."
    },
    {
        id: "log-5",
        timestamp: "2026-08-16 22:30:00",
        date: "2026-08-16",
        day: "Sunday",
        thyronormTime: "06:45",
        actrapidMorning: "6",
        actrapidLunch: "8",
        actrapidDinner: "8",
        basaglarDose: "18",
        basaglarTime: "22:00",
        fbsValue: "108",
        fbsTime: "07:45",
        pbsValue: "141",
        pbsTime: "09:45",
        preLunchValue: "100",
        preLunchTime: "13:00",
        postLunchValue: "145",
        postLunchTime: "15:15",
        preDinnerValue: "108",
        preDinnerTime: "19:30",
        postDinnerValue: "152",
        postDinnerTime: "21:45",
        breakfastTime: "08:30",
        breakfastFood: "Moong Dal Chilla with Mint Chutney & Walnuts",
        lunchTime: "13:30",
        lunchFood: "Brown Rice with Sambar, Beans Poriyal & Curd",
        dinnerTime: "20:00",
        dinnerFood: "2 Multigrain Phulkas with Paneer Bhurji & Salad",
        sleepDuration: "8.2",
        mood: "5",
        remarks: "Relaxed Sunday, yoga in the morning for 40 mins."
    },
    {
        id: "log-4",
        timestamp: "2026-08-17 22:15:00",
        date: "2026-08-17",
        day: "Monday",
        thyronormTime: "06:30",
        actrapidMorning: "6",
        actrapidLunch: "8",
        actrapidDinner: "8",
        basaglarDose: "18",
        basaglarTime: "22:00",
        fbsValue: "104",
        fbsTime: "07:15",
        pbsValue: "136",
        pbsTime: "09:30",
        preLunchValue: "95",
        preLunchTime: "13:00",
        postLunchValue: "139",
        postLunchTime: "15:15",
        preDinnerValue: "102",
        preDinnerTime: "19:30",
        postDinnerValue: "142",
        postDinnerTime: "21:30",
        breakfastTime: "08:00",
        breakfastFood: "Scrambled eggs with sautéed mushrooms & toast",
        lunchTime: "13:15",
        lunchFood: "2 Rotis with Dal Fry, Salad & Grilled Paneer",
        dinnerTime: "19:45",
        dinnerFood: "Clear Veg Soup with Soya Chunk Curry & 1 Roti",
        sleepDuration: "7.6",
        mood: "5",
        remarks: "Super steady day. No highs, no hypos."
    },
    {
        id: "log-3",
        timestamp: "2026-08-18 22:30:00",
        date: "2026-08-18",
        day: "Tuesday",
        thyronormTime: "06:30",
        actrapidMorning: "6",
        actrapidLunch: "8",
        actrapidDinner: "8",
        basaglarDose: "18",
        basaglarTime: "22:00",
        fbsValue: "112",
        fbsTime: "07:30",
        pbsValue: "148",
        pbsTime: "09:45",
        preLunchValue: "104",
        preLunchTime: "13:00",
        postLunchValue: "152",
        postLunchTime: "15:15",
        preDinnerValue: "114",
        preDinnerTime: "19:30",
        postDinnerValue: "158",
        postDinnerTime: "21:45",
        breakfastTime: "08:15",
        breakfastFood: "Vegetable Upma with Roasted Almonds",
        lunchTime: "13:30",
        lunchFood: "2 Phulkas, Aloo Gobi (controlled portion), Dal & Raita",
        dinnerTime: "20:00",
        dinnerFood: "Ragi Dosa with Coconut Chutney & Vegetable Stew",
        sleepDuration: "7.0",
        mood: "4",
        remarks: "Normal work day, glucose stayed below 160 mg/dL all day."
    },
    {
        id: "log-2",
        timestamp: "2026-08-19 22:45:00",
        date: "2026-08-19",
        day: "Wednesday",
        thyronormTime: "06:30",
        actrapidMorning: "6",
        actrapidLunch: "8",
        actrapidDinner: "8",
        basaglarDose: "18",
        basaglarTime: "22:00",
        fbsValue: "116",
        fbsTime: "07:30",
        pbsValue: "154",
        pbsTime: "09:45",
        preLunchValue: "108",
        preLunchTime: "13:00",
        postLunchValue: "160",
        postLunchTime: "15:20",
        preDinnerValue: "112",
        preDinnerTime: "19:30",
        postDinnerValue: "156",
        postDinnerTime: "21:45",
        breakfastTime: "08:15",
        breakfastFood: "Sprouted Moong Salad with Lemon & Whole grain toast",
        lunchTime: "13:30",
        lunchFood: "2 Multigrain Rotis, Rajma & Cucumber Salad",
        dinnerTime: "20:00",
        dinnerFood: "Grilled Chicken Breast with steamed broccoli & Carrot soup",
        sleepDuration: "6.8",
        mood: "4",
        remarks: "Good post-dinner control. Evening walk 25 mins."
    },
    {
        id: "log-1",
        timestamp: "2026-08-20 20:30:00",
        date: "2026-08-20",
        day: "Thursday",
        thyronormTime: "06:30",
        actrapidMorning: "6",
        actrapidLunch: "8",
        actrapidDinner: "8",
        basaglarDose: "18",
        basaglarTime: "22:00",
        fbsValue: "107",
        fbsTime: "07:15",
        pbsValue: "140",
        pbsTime: "09:30",
        preLunchValue: "102",
        preLunchTime: "13:00",
        postLunchValue: "146",
        postLunchTime: "15:15",
        preDinnerValue: "110",
        preDinnerTime: "19:30",
        postDinnerValue: "150",
        postDinnerTime: "21:30",
        breakfastTime: "08:00",
        breakfastFood: "Avocado Egg Toast on sourdough & Black tea",
        lunchTime: "13:15",
        lunchFood: "2 Rotis with Palak Dal, Cucumber & Buttermilk",
        dinnerTime: "19:45",
        dinnerFood: "Vegetable Tofu stir-fry with quinoa",
        sleepDuration: "7.5",
        mood: "5",
        remarks: "Today's logs. Feeling energized and healthy."
    }
];

const LOCAL_STORAGE_KEY = "insulin_inside_health_logs";

export function getStoredLogs(): HealthLogRow[] {
    if (typeof window === "undefined") return INITIAL_SAMPLE_LOGS;
    try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_LOGS));
            return INITIAL_SAMPLE_LOGS;
        }
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SAMPLE_LOGS;
    } catch (e) {
        return INITIAL_SAMPLE_LOGS;
    }
}

export function saveLogToStorage(log: HealthLogRow): HealthLogRow[] {
    if (typeof window === "undefined") return [log];
    const current = getStoredLogs();
    const existingIndex = current.findIndex(item => item.date === log.date);
    let updated: HealthLogRow[];
    if (existingIndex >= 0) {
        updated = [...current];
        updated[existingIndex] = { ...updated[existingIndex], ...log };
    } else {
        updated = [log, ...current];
    }
    // sort descending by date
    updated.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return updated;
}

export function deleteLogFromStorage(date: string): HealthLogRow[] {
    if (typeof window === "undefined") return [];
    const current = getStoredLogs();
    const updated = current.filter(item => item.date !== date);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return updated;
}

export function resetLogsToDefault(): HealthLogRow[] {
    if (typeof window === "undefined") return INITIAL_SAMPLE_LOGS;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_LOGS));
    return INITIAL_SAMPLE_LOGS;
}

// Analytics metric extraction
export interface GlucoseReadingPoint {
    timestamp: string;
    date: string;
    glucose: number;
    type: "Fasting" | "Post-Breakfast" | "Pre-Lunch" | "Post-Lunch" | "Pre-Dinner" | "Post-Dinner" | "Random";
    mealName?: string;
    insulinDose?: string;
    sleepDuration?: number;
    mood?: number;
}

export function extractGlucoseReadings(logs: HealthLogRow[]): GlucoseReadingPoint[] {
    const points: GlucoseReadingPoint[] = [];

    logs.forEach(log => {
        const slots: Array<{
            val?: string;
            time?: string;
            type: GlucoseReadingPoint["type"];
            meal?: string;
            insulin?: string;
        }> = [
            { val: log.fbsValue, time: log.fbsTime, type: "Fasting", insulin: log.thyronormTime ? "Thyronorm taken" : undefined },
            { val: log.pbsValue, time: log.pbsTime, type: "Post-Breakfast", meal: log.breakfastFood, insulin: log.actrapidMorning ? `${log.actrapidMorning}u Actrapid` : undefined },
            { val: log.preLunchValue, time: log.preLunchTime, type: "Pre-Lunch" },
            { val: log.postLunchValue, time: log.postLunchTime, type: "Post-Lunch", meal: log.lunchFood, insulin: log.actrapidLunch ? `${log.actrapidLunch}u Actrapid` : undefined },
            { val: log.preDinnerValue, time: log.preDinnerTime, type: "Pre-Dinner" },
            { val: log.postDinnerValue, time: log.postDinnerTime, type: "Post-Dinner", meal: log.dinnerFood, insulin: log.actrapidDinner ? `${log.actrapidDinner}u Actrapid` : undefined },
            { val: log.randomValue, time: log.randomTime, type: "Random" },
        ];

        slots.forEach(slot => {
            if (slot.val) {
                const num = parseFloat(slot.val);
                if (!isNaN(num) && num > 0) {
                    const timeString = slot.time || "12:00";
                    points.push({
                        timestamp: `${log.date} ${timeString}`,
                        date: log.date,
                        glucose: num,
                        type: slot.type,
                        mealName: slot.meal,
                        insulinDose: slot.insulin,
                        sleepDuration: log.sleepDuration ? parseFloat(log.sleepDuration) : undefined,
                        mood: log.mood ? parseInt(log.mood, 10) : undefined
                    });
                }
            }
        });
    });

    return points.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
}

// Comprehensive Clinical Statistics
export function calculateClinicalStats(readings: GlucoseReadingPoint[]) {
    if (readings.length === 0) {
        return {
            avgGlucose: 0,
            estimatedA1c: 0,
            timeInRangePercent: 0,
            veryLowPercent: 0,
            lowPercent: 0,
            highPercent: 0,
            veryHighPercent: 0,
            standardDeviation: 0,
            coefficientOfVariation: 0,
            totalReadings: 0,
            minGlucose: 0,
            maxGlucose: 0,
            fastingAvg: 0,
            postMealAvg: 0,
        };
    }

    const values = readings.map(r => r.glucose);
    const sum = values.reduce((acc, v) => acc + v, 0);
    const avgGlucose = Math.round(sum / values.length);

    // ADAG standard formula: eA1c (%) = (Average Glucose + 46.7) / 28.7
    const estimatedA1c = parseFloat(((avgGlucose + 46.7) / 28.7).toFixed(1));

    // Time-In-Range (TIR) International Consensus thresholds:
    // Very Low: < 54 mg/dL
    // Low: 54 - 69 mg/dL
    // In Range (Target): 70 - 180 mg/dL
    // High: 181 - 250 mg/dL
    // Very High: > 250 mg/dL
    let veryLowCount = 0;
    let lowCount = 0;
    let inRangeCount = 0;
    let highCount = 0;
    let veryHighCount = 0;

    values.forEach(v => {
        if (v < 54) veryLowCount++;
        else if (v < 70) lowCount++;
        else if (v <= 180) inRangeCount++;
        else if (v <= 250) highCount++;
        else veryHighCount++;
    });

    const total = values.length;
    const timeInRangePercent = Math.round((inRangeCount / total) * 100);
    const veryLowPercent = Math.round((veryLowCount / total) * 100);
    const lowPercent = Math.round((lowCount / total) * 100);
    const highPercent = Math.round((highCount / total) * 100);
    const veryHighPercent = Math.round((veryHighCount / total) * 100);

    // Standard deviation
    const variance = values.reduce((acc, v) => acc + Math.pow(v - avgGlucose, 2), 0) / total;
    const standardDeviation = Math.round(Math.sqrt(variance));
    const coefficientOfVariation = Math.round((standardDeviation / avgGlucose) * 100);

    const minGlucose = Math.min(...values);
    const maxGlucose = Math.max(...values);

    // Fasting vs Post-meal
    const fastingReadings = readings.filter(r => r.type === "Fasting");
    const fastingAvg = fastingReadings.length > 0
        ? Math.round(fastingReadings.reduce((acc, r) => acc + r.glucose, 0) / fastingReadings.length)
        : 0;

    const postMealReadings = readings.filter(r => r.type.startsWith("Post-"));
    const postMealAvg = postMealReadings.length > 0
        ? Math.round(postMealReadings.reduce((acc, r) => acc + r.glucose, 0) / postMealReadings.length)
        : 0;

    return {
        avgGlucose,
        estimatedA1c,
        timeInRangePercent,
        veryLowPercent,
        lowPercent,
        highPercent,
        veryHighPercent,
        standardDeviation,
        coefficientOfVariation,
        totalReadings: total,
        minGlucose,
        maxGlucose,
        fastingAvg,
        postMealAvg,
    };
}

// Rule-Based Smart Clinical Insights
export function generateRuleBasedInsights(logs: HealthLogRow[], readings: GlucoseReadingPoint[]) {
    const stats = calculateClinicalStats(readings);
    const insights: Array<{ title: string; desc: string; type: "success" | "warning" | "info" | "alert" }> = [];

    if (stats.timeInRangePercent >= 70) {
        insights.push({
            title: "Excellent Time in Range (TIR)",
            desc: `Your Time In Range is ${stats.timeInRangePercent}%, surpassing the clinical international target of ≥70%. This significantly reduces the risk of long-term microvascular complications.`,
            type: "success"
        });
    } else {
        insights.push({
            title: "Time in Range Below Target",
            desc: `Your Time In Range is currently ${stats.timeInRangePercent}%. Clinical guidelines recommend aiming for ≥70% between 70-180 mg/dL.`,
            type: "warning"
        });
    }

    if (stats.estimatedA1c <= 7.0 && stats.estimatedA1c > 0) {
        insights.push({
            title: "Optimal Estimated HbA1c",
            desc: `Estimated HbA1c is ${stats.estimatedA1c}%, within the ADA recommended target of < 7.0% for non-pregnant adults.`,
            type: "success"
        });
    } else if (stats.estimatedA1c > 7.0) {
        insights.push({
            title: "HbA1c Elevation Indicator",
            desc: `Estimated HbA1c is ${stats.estimatedA1c}%. Review post-prandial bolus timing and carbohydrate density with your endocrinologist.`,
            type: "info"
        });
    }

    // Check Sleep correlation
    const logsWithSleep = logs.filter(l => l.sleepDuration && l.fbsValue);
    if (logsWithSleep.length >= 3) {
        const shortSleepLogs = logsWithSleep.filter(l => parseFloat(l.sleepDuration!) < 7);
        const normalSleepLogs = logsWithSleep.filter(l => parseFloat(l.sleepDuration!) >= 7);

        if (shortSleepLogs.length > 0 && normalSleepLogs.length > 0) {
            const shortAvg = shortSleepLogs.reduce((acc, l) => acc + parseFloat(l.fbsValue!), 0) / shortSleepLogs.length;
            const normAvg = normalSleepLogs.reduce((acc, l) => acc + parseFloat(l.fbsValue!), 0) / normalSleepLogs.length;

            if (shortAvg - normAvg > 10) {
                insights.push({
                    title: "Sleep-Glucose Correlation Detected",
                    desc: `On nights with <7 hours of sleep, your morning fasting glucose averaged ${Math.round(shortAvg)} mg/dL compared to ${Math.round(normAvg)} mg/dL on well-rested nights (+${Math.round(shortAvg - normAvg)} mg/dL difference). Prioritizing 7.5+ hours of sleep improves basal insulin sensitivity.`,
                    type: "info"
                });
            }
        }
    }

    // Post-dinner excursions
    const postDinnerHighs = readings.filter(r => r.type === "Post-Dinner" && r.glucose > 160);
    if (postDinnerHighs.length >= 2) {
        insights.push({
            title: "Post-Dinner Glycemic Excursions",
            desc: `Elevated post-dinner glucose (>160 mg/dL) was observed on ${postDinnerHighs.length} occasions. Adding a 15-20 minute light walk after dinner or pre-bolusing Actrapid 20 minutes before meals can smooth post-prandial curves.`,
            type: "warning"
        });
    }

    // Hypoglycemia check
    const hypos = readings.filter(r => r.glucose < 70);
    if (hypos.length === 0) {
        insights.push({
            title: "Zero Hypoglycemia Events",
            desc: "No blood sugar readings below 70 mg/dL detected in this recording period. Basaglar basal dosing is safely calibrated without excessive nocturnal drops.",
            type: "success"
        });
    } else {
        insights.push({
            title: "Hypoglycemia Risk Alert",
            desc: `${hypos.length} readings under 70 mg/dL detected. Always carry 15g of fast-acting glucose (glucose tablets, 1/2 cup fruit juice) following the Rule of 15.`,
            type: "alert"
        });
    }

    return insights;
}
