import * as z from "zod";

export const healthLogSchema = z.object({
    date: z.date(),
    day: z.string().optional(), // Can be auto-calculated

    // Thyroid
    thyronormTime: z.string().optional(),

    // Insulin - Actrapid
    actrapidMorning: z.string().optional(),
    actrapidLunch: z.string().optional(),
    actrapidDinner: z.string().optional(),

    // Insulin - Basaglar
    basaglarDose: z.string().optional(),
    basaglarTime: z.string().optional(),

    // Glucose - Fasting
    fbsValue: z.string().optional(),
    fbsTime: z.string().optional(),

    // Glucose - Post Breakfast
    pbsValue: z.string().optional(),
    pbsTime: z.string().optional(),

    // Glucose - Pre Lunch
    preLunchValue: z.string().optional(),
    preLunchTime: z.string().optional(),

    // Glucose - Post Lunch
    postLunchValue: z.string().optional(),
    postLunchTime: z.string().optional(),

    // Glucose - Pre Dinner
    preDinnerValue: z.string().optional(),
    preDinnerTime: z.string().optional(),

    // Glucose - Post Dinner
    postDinnerValue: z.string().optional(),
    postDinnerTime: z.string().optional(),

    // Glucose - Random
    randomValue: z.string().optional(),
    randomTime: z.string().optional(),

    // Meals
    breakfastTime: z.string().optional(),
    breakfastFood: z.string().optional(),
    lunchTime: z.string().optional(),
    lunchFood: z.string().optional(),
    dinnerTime: z.string().optional(),
    dinnerFood: z.string().optional(),

    // Other
    correctionDose: z.string().optional(),
    bowelMovementTime: z.string().optional(),
    sleepDuration: z.string().optional(),
    mood: z.enum(["1", "2", "3", "4", "5"]).optional(),
    remarks: z.string().optional(),
});

export type HealthLogValues = z.infer<typeof healthLogSchema>;
