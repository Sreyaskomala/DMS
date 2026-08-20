"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon, Loader2, Save, Sparkles, RefreshCw, Trash2, Download, CheckCircle2, History, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { healthLogSchema, HealthLogValues } from "@/lib/schemas"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getStoredLogs, saveLogToStorage, deleteLogFromStorage, resetLogsToDefault, HealthLogRow } from "@/lib/demo-data"

export function LogForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [recentLogs, setRecentLogs] = useState<HealthLogRow[]>([]);

    useEffect(() => {
        setRecentLogs(getStoredLogs());
    }, []);

    const form = useForm<HealthLogValues>({
        resolver: zodResolver(healthLogSchema),
        defaultValues: {
            date: new Date(),
            thyronormTime: "06:30",
            actrapidMorning: "6",
            actrapidLunch: "8",
            actrapidDinner: "8",
            basaglarDose: "18",
            basaglarTime: "22:00",
            fbsValue: "108",
            fbsTime: "07:30",
            pbsValue: "142",
            pbsTime: "09:30",
            preLunchValue: "105",
            preLunchTime: "13:00",
            postLunchValue: "148",
            postLunchTime: "15:15",
            preDinnerValue: "112",
            preDinnerTime: "19:30",
            postDinnerValue: "150",
            postDinnerTime: "21:30",
            breakfastTime: "08:00",
            breakfastFood: "2 Multigrain Idlis with Sambar & Mint Chutney",
            lunchTime: "13:15",
            lunchFood: "2 Phulkas, Dal Tadka, Bhindi & Cucumber Salad",
            dinnerTime: "19:45",
            dinnerFood: "Brown Rice with Paneer Curry & Green Salad",
            sleepDuration: "7.5",
            mood: "5",
            remarks: "Feeling energetic today. Good glycemic control.",
        },
    });

    const fillPreset = (type: "ideal" | "high" | "blank") => {
        if (type === "blank") {
            form.reset({
                date: new Date(),
                fbsValue: "",
                pbsValue: "",
                preLunchValue: "",
                postLunchValue: "",
                preDinnerValue: "",
                postDinnerValue: "",
                randomValue: "",
                breakfastFood: "",
                lunchFood: "",
                dinnerFood: "",
                remarks: "",
            });
            toast.info("Form cleared for fresh manual entry.");
            return;
        }

        if (type === "high") {
            form.reset({
                date: new Date(),
                thyronormTime: "07:00",
                actrapidMorning: "6",
                actrapidLunch: "10",
                actrapidDinner: "8",
                basaglarDose: "18",
                basaglarTime: "22:00",
                fbsValue: "128",
                fbsTime: "08:00",
                pbsValue: "172",
                pbsTime: "10:15",
                preLunchValue: "122",
                preLunchTime: "13:30",
                postLunchValue: "195",
                postLunchTime: "15:45",
                preDinnerValue: "130",
                preDinnerTime: "20:00",
                postDinnerValue: "180",
                postDinnerTime: "22:15",
                correctionDose: "2u Actrapid for high post-lunch spike",
                breakfastTime: "08:45",
                breakfastFood: "Puri Bhaji with sweet lassi",
                lunchTime: "14:00",
                lunchFood: "Restaurant Biryani, Raita & Gulab Jamun",
                dinnerTime: "20:30",
                dinnerFood: "2 Rotis with Dal & Sabzi",
                sleepDuration: "6.0",
                mood: "3",
                remarks: "Spike after restaurant meal; administered correction dose.",
            });
            toast.success("Loaded 'High Carb & Spike Day' preset.");
            return;
        }

        form.reset({
            date: new Date(),
            thyronormTime: "06:30",
            actrapidMorning: "6",
            actrapidLunch: "8",
            actrapidDinner: "8",
            basaglarDose: "18",
            basaglarTime: "22:00",
            fbsValue: "105",
            fbsTime: "07:15",
            pbsValue: "138",
            pbsTime: "09:30",
            preLunchValue: "98",
            preLunchTime: "13:00",
            postLunchValue: "142",
            postLunchTime: "15:15",
            preDinnerValue: "104",
            preDinnerTime: "19:30",
            postDinnerValue: "146",
            postDinnerTime: "21:30",
            breakfastTime: "08:00",
            breakfastFood: "Moong Dal Chilla with Mint Chutney",
            lunchTime: "13:15",
            lunchFood: "2 Rotis with Palak Paneer & Salad",
            dinnerTime: "19:45",
            dinnerFood: "Grilled Paneer with steamed broccoli & Soup",
            sleepDuration: "8.0",
            mood: "5",
            remarks: "Optimal day. 100% within target range (70-140 mg/dL).",
        });
        toast.success("Loaded 'Optimal Target Day' preset.");
    };

    async function onSubmit(data: HealthLogValues) {
        setIsSubmitting(true);
        const dayOfWeek = format(data.date, "EEEE");
        const dateStr = format(data.date, "yyyy-MM-dd");
        const timestamp = new Date().toLocaleString();

        const logEntry: HealthLogRow = {
            id: `log-${Date.now()}`,
            timestamp,
            date: dateStr,
            day: dayOfWeek,
            thyronormTime: data.thyronormTime,
            actrapidMorning: data.actrapidMorning,
            actrapidLunch: data.actrapidLunch,
            actrapidDinner: data.actrapidDinner,
            basaglarDose: data.basaglarDose,
            basaglarTime: data.basaglarTime,
            fbsValue: data.fbsValue,
            fbsTime: data.fbsTime,
            pbsValue: data.pbsValue,
            pbsTime: data.pbsTime,
            preLunchValue: data.preLunchValue,
            preLunchTime: data.preLunchTime,
            postLunchValue: data.postLunchValue,
            postLunchTime: data.postLunchTime,
            preDinnerValue: data.preDinnerValue,
            preDinnerTime: data.preDinnerTime,
            postDinnerValue: data.postDinnerValue,
            postDinnerTime: data.postDinnerTime,
            randomValue: data.randomValue,
            randomTime: data.randomTime,
            breakfastTime: data.breakfastTime,
            breakfastFood: data.breakfastFood,
            lunchTime: data.lunchTime,
            lunchFood: data.lunchFood,
            dinnerTime: data.dinnerTime,
            dinnerFood: data.dinnerFood,
            correctionDose: data.correctionDose,
            bowelMovementTime: data.bowelMovementTime,
            sleepDuration: data.sleepDuration,
            mood: data.mood,
            remarks: data.remarks,
        };

        // 1. Save locally for instant persistence and analytics
        const updated = saveLogToStorage(logEntry);
        setRecentLogs(updated);

        // 2. Attempt Google Sheet sync if configured
        try {
            const values = [
                timestamp,
                dateStr,
                dayOfWeek,
                data.thyronormTime || "",
                data.actrapidMorning || "",
                data.actrapidLunch || "",
                data.actrapidDinner || "",
                data.basaglarDose || "",
                data.basaglarTime || "",
                data.fbsValue || "",
                data.fbsTime || "",
                data.pbsValue || "",
                data.pbsTime || "",
                data.preLunchValue || "",
                data.preLunchTime || "",
                data.postLunchValue || "",
                data.postLunchTime || "",
                data.preDinnerValue || "",
                data.preDinnerTime || "",
                data.postDinnerValue || "",
                data.postDinnerTime || "",
                data.randomValue || "",
                data.randomTime || "",
                data.breakfastTime || "",
                data.breakfastFood || "",
                data.lunchTime || "",
                data.lunchFood || "",
                data.dinnerTime || "",
                data.dinnerFood || "",
                data.correctionDose || "",
                data.bowelMovementTime || "",
                data.sleepDuration || "",
                data.mood || "",
                data.remarks || "",
            ];

            const response = await fetch("/api/sheets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    range: "Sheet1!A:AI",
                    values: [values],
                }),
            });

            if (response.ok) {
                toast.success("Health log saved and synced to Google Sheets!");
            } else {
                toast.success("Health log saved locally in your secure health vault.");
            }
        } catch (error) {
            toast.success("Health log saved locally in your secure health vault.");
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleDelete = (date: string) => {
        const updated = deleteLogFromStorage(date);
        setRecentLogs(updated);
        toast.info(`Deleted log for ${date}`);
    };

    const handleResetDefaults = () => {
        const defaults = resetLogsToDefault();
        setRecentLogs(defaults);
        toast.success("Reset history to 14 days of realistic sample health records.");
    };

    const exportToCSV = () => {
        if (recentLogs.length === 0) {
            toast.error("No logs to export");
            return;
        }

        const headers = ["Date", "Day", "FBS (mg/dL)", "PBS (mg/dL)", "Pre-Lunch", "Post-Lunch", "Pre-Dinner", "Post-Dinner", "Basaglar", "Actrapid (M/L/D)", "Sleep (Hrs)", "Mood", "Remarks"];
        const rows = recentLogs.map(l => [
            l.date,
            l.day,
            l.fbsValue || "",
            l.pbsValue || "",
            l.preLunchValue || "",
            l.postLunchValue || "",
            l.preDinnerValue || "",
            l.postDinnerValue || "",
            l.basaglarDose || "",
            `${l.actrapidMorning || 0}/${l.actrapidLunch || 0}/${l.actrapidDinner || 0}`,
            l.sleepDuration || "",
            l.mood || "",
            `"${(l.remarks || "").replace(/"/g, '""')}"`
        ]);

        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `insulin_inside_health_logs_${format(new Date(), "yyyy-MM-dd")}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Exported CSV log report successfully!");
    };

    return (
        <div className="space-y-8">
            <Card className="w-full shadow-xl border-slate-200 overflow-hidden">
                <CardHeader className="bg-[#003E7E] text-white p-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <Badge className="bg-[#009CDF] text-white border-none font-bold">DAILY TRACKER</Badge>
                                <span className="text-xs text-blue-200">34-Point Clinical Schema</span>
                            </div>
                            <CardTitle className="text-2xl font-black mt-2">Comprehensive Daily Health Log</CardTitle>
                            <CardDescription className="text-blue-100">
                                Record glucose, medications, nutrition, and lifestyle vitals for AI analytics.
                            </CardDescription>
                        </div>

                        {/* Quick Presets for User Demo */}
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                className="bg-white/10 text-white hover:bg-white/20 text-xs border border-white/20"
                                onClick={() => fillPreset("ideal")}
                            >
                                <Sparkles className="h-3.5 w-3.5 mr-1 text-[#009CDF]" /> Optimal Day
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                className="bg-white/10 text-white hover:bg-white/20 text-xs border border-white/20"
                                onClick={() => fillPreset("high")}
                            >
                                <Sparkles className="h-3.5 w-3.5 mr-1 text-[#E31C79]" /> Spike Day
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                className="bg-white/10 text-white hover:bg-white/20 text-xs border border-white/20"
                                onClick={() => fillPreset("blank")}
                            >
                                Clear
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            {/* Top Date & Day Selector */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel className="text-xs font-bold text-slate-600 uppercase">Log Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-bold bg-white",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="text-xs text-slate-500 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <span>Real-time local caching & Cloud Sync enabled</span>
                                </div>
                            </div>

                            {/* Multi-Tab Categorized Form */}
                            <Tabs defaultValue="glucose" className="w-full">
                                <TabsList className="grid w-full grid-cols-4 bg-slate-100 p-1 h-12 rounded-xl">
                                    <TabsTrigger value="glucose" className="data-[state=active]:bg-[#003E7E] data-[state=active]:text-white font-bold text-slate-600 rounded-lg">
                                        1. Glucose Readings
                                    </TabsTrigger>
                                    <TabsTrigger value="meds" className="data-[state=active]:bg-[#E31C79] data-[state=active]:text-white font-bold text-slate-600 rounded-lg">
                                        2. Insulin & Meds
                                    </TabsTrigger>
                                    <TabsTrigger value="meals" className="data-[state=active]:bg-[#009CDF] data-[state=active]:text-white font-bold text-slate-600 rounded-lg">
                                        3. Meals & Carbs
                                    </TabsTrigger>
                                    <TabsTrigger value="lifestyle" className="data-[state=active]:bg-[#003E7E] data-[state=active]:text-white font-bold text-slate-600 rounded-lg">
                                        4. Sleep & Vitals
                                    </TabsTrigger>
                                </TabsList>

                                {/* TAB 1: GLUCOSE */}
                                <TabsContent value="glucose" className="space-y-4 pt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-bold text-[#003E7E] text-base">Blood Glucose Profile (mg/dL)</h3>
                                        <div className="flex gap-2 text-[10px] font-bold">
                                            <span className="px-2 py-0.5 rounded bg-green-100 text-green-800">70-140 In Target</span>
                                            <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-800">141-180 Borderline</span>
                                            <span className="px-2 py-0.5 rounded bg-red-100 text-red-800">&gt;180 High</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <GlucoseField form={form} label="Fasting (FBS)" valName="fbsValue" timeName="fbsTime" defaultTime="07:30" />
                                        <GlucoseField form={form} label="Post-Breakfast (PBS)" valName="pbsValue" timeName="pbsTime" defaultTime="09:30" />
                                        <GlucoseField form={form} label="Pre-Lunch" valName="preLunchValue" timeName="preLunchTime" defaultTime="13:00" />
                                        <GlucoseField form={form} label="Post-Lunch" valName="postLunchValue" timeName="postLunchTime" defaultTime="15:15" />
                                        <GlucoseField form={form} label="Pre-Dinner" valName="preDinnerValue" timeName="preDinnerTime" defaultTime="19:30" />
                                        <GlucoseField form={form} label="Post-Dinner" valName="postDinnerValue" timeName="postDinnerTime" defaultTime="21:30" />
                                        <GlucoseField form={form} label="Random / Bedtime" valName="randomValue" timeName="randomTime" defaultTime="23:00" />
                                    </div>
                                </TabsContent>

                                {/* TAB 2: MEDS */}
                                <TabsContent value="meds" className="space-y-6 pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                        {/* Thyronorm */}
                                        <div className="space-y-3 bg-white p-4 rounded-xl border">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-bold text-slate-800">Thyronorm (Thyroid)</h4>
                                                <Badge variant="outline">Morning Empty Stomach</Badge>
                                            </div>
                                            <FormField
                                                control={form.control}
                                                name="thyronormTime"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs text-slate-500">Time Taken</FormLabel>
                                                        <FormControl><Input type="time" {...field} className="bg-slate-50 font-semibold" /></FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Basaglar */}
                                        <div className="space-y-3 bg-white p-4 rounded-xl border">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-bold text-slate-800">Basaglar (Long-Acting Basal)</h4>
                                                <Badge className="bg-[#003E7E]">Once Daily</Badge>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="basaglarDose"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-xs text-slate-500">Dose (Units)</FormLabel>
                                                            <FormControl><Input placeholder="18" {...field} className="bg-slate-50 font-bold" /></FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="basaglarTime"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-xs text-slate-500">Time</FormLabel>
                                                            <FormControl><Input type="time" {...field} className="bg-slate-50" /></FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actrapid Bolus */}
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-bold text-slate-800">Actrapid (Regular Meal Bolus Insulin)</h4>
                                            <span className="text-xs text-slate-500">Units administered prior to meals</span>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="actrapidMorning"
                                                render={({ field }) => (
                                                    <FormItem className="bg-white p-3 rounded-xl border">
                                                        <FormLabel className="text-xs font-bold text-slate-700">Breakfast Bolus</FormLabel>
                                                        <FormControl><Input placeholder="6" {...field} className="font-bold text-base text-[#003E7E]" /></FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="actrapidLunch"
                                                render={({ field }) => (
                                                    <FormItem className="bg-white p-3 rounded-xl border">
                                                        <FormLabel className="text-xs font-bold text-slate-700">Lunch Bolus</FormLabel>
                                                        <FormControl><Input placeholder="8" {...field} className="font-bold text-base text-[#003E7E]" /></FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="actrapidDinner"
                                                render={({ field }) => (
                                                    <FormItem className="bg-white p-3 rounded-xl border">
                                                        <FormLabel className="text-xs font-bold text-slate-700">Dinner Bolus</FormLabel>
                                                        <FormControl><Input placeholder="8" {...field} className="font-bold text-base text-[#003E7E]" /></FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="correctionDose"
                                            render={({ field }) => (
                                                <FormItem className="bg-white p-3 rounded-xl border">
                                                    <FormLabel className="text-xs font-bold text-slate-700">Correction Dose & Hyperglycemia Adjustments</FormLabel>
                                                    <FormControl><Input placeholder="e.g. 1.5u given at 4:00 PM for post-lunch reading of 195" {...field} /></FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </TabsContent>

                                {/* TAB 3: MEALS */}
                                <TabsContent value="meals" className="space-y-4 pt-4">
                                    <h3 className="font-bold text-[#003E7E]">Meals & Indian Nutrition Details</h3>
                                    <MealSection form={form} label="Breakfast" timeName="breakfastTime" foodName="breakfastFood" defaultTime="08:00" placeholder="e.g. 2 Idlis with Sambar & Green Tea" />
                                    <MealSection form={form} label="Lunch" timeName="lunchTime" foodName="lunchFood" defaultTime="13:15" placeholder="e.g. 2 Phulkas, Dal Tadka, Bhindi Sabzi & Curd" />
                                    <MealSection form={form} label="Dinner" timeName="dinnerTime" foodName="dinnerFood" defaultTime="19:45" placeholder="e.g. Brown Rice with Paneer Curry & Cucumber Salad" />
                                </TabsContent>

                                {/* TAB 4: LIFESTYLE */}
                                <TabsContent value="lifestyle" className="space-y-4 pt-4">
                                    <h3 className="font-bold text-[#003E7E]">Sleep, Mood & Observations</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                        <FormField
                                            control={form.control}
                                            name="sleepDuration"
                                            render={({ field }) => (
                                                <FormItem className="bg-white p-3 rounded-xl border">
                                                    <FormLabel className="text-xs font-bold text-slate-700">Sleep Duration (Hours)</FormLabel>
                                                    <FormControl><Input type="number" step="0.5" placeholder="7.5" {...field} className="font-bold text-base" /></FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="mood"
                                            render={({ field }) => (
                                                <FormItem className="bg-white p-3 rounded-xl border">
                                                    <FormLabel className="text-xs font-bold text-slate-700">Daily Mood & Energy</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="font-semibold">
                                                                <SelectValue placeholder="Select mood" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="1">1 - Very Low / Stressed</SelectItem>
                                                            <SelectItem value="2">2 - Low Energy</SelectItem>
                                                            <SelectItem value="3">3 - Normal / Neutral</SelectItem>
                                                            <SelectItem value="4">4 - Good / Active</SelectItem>
                                                            <SelectItem value="5">5 - Excellent / High Energy</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="bowelMovementTime"
                                            render={({ field }) => (
                                                <FormItem className="bg-white p-3 rounded-xl border">
                                                    <FormLabel className="text-xs font-bold text-slate-700">Bowel Movement Time</FormLabel>
                                                    <FormControl><Input type="time" {...field} /></FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="remarks"
                                        render={({ field }) => (
                                            <FormItem className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                                <FormLabel className="text-xs font-bold text-slate-700">Clinical Notes, Symptoms & Exercise Details</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="e.g. 30 min brisk walk after dinner, 3L water intake, felt slight tiredness in afternoon..."
                                                        className="bg-white min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </TabsContent>
                            </Tabs>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#003E7E] hover:bg-[#002a5e] h-14 text-base font-bold shadow-xl rounded-xl transition-all"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Saving Entry...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-5 w-5 text-[#009CDF]" />
                                        Save & Sync Daily Health Record
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* RECENT LOG ENTRIES & HISTORY TABLE */}
            <Card className="shadow-lg border-slate-200">
                <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b pb-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <History className="h-5 w-5 text-[#003E7E]" />
                            <CardTitle className="text-xl font-bold text-[#003E7E]">Recent Health Records ({recentLogs.length})</CardTitle>
                        </div>
                        <CardDescription>All recorded daily logs saved in your clinical database.</CardDescription>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-xs border-[#003E7E] text-[#003E7E] hover:bg-blue-50 font-bold"
                            onClick={exportToCSV}
                        >
                            <Download className="h-3.5 w-3.5 mr-1" /> Export CSV
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-xs text-slate-500 hover:text-slate-900"
                            onClick={handleResetDefaults}
                        >
                            <RefreshCw className="h-3.5 w-3.5 mr-1" /> Reset to 14-Day Sample Data
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-0 overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="bg-slate-100 text-slate-600 border-b uppercase font-bold text-[10px] tracking-wider">
                                <th className="p-3.5">Date & Day</th>
                                <th className="p-3.5">Fasting (FBS)</th>
                                <th className="p-3.5">Post-Breakfast</th>
                                <th className="p-3.5">Post-Lunch</th>
                                <th className="p-3.5">Post-Dinner</th>
                                <th className="p-3.5">Insulin (Basal / Bolus)</th>
                                <th className="p-3.5">Sleep</th>
                                <th className="p-3.5">Remarks</th>
                                <th className="p-3.5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {recentLogs.map((log) => (
                                <tr key={log.id || log.date} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">
                                        {log.date} <span className="text-slate-400 font-normal">({log.day})</span>
                                    </td>
                                    <td className="p-3.5">
                                        {log.fbsValue ? (
                                            <span className={`px-2 py-1 rounded font-bold ${parseFloat(log.fbsValue) <= 120 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {log.fbsValue} mg/dL
                                            </span>
                                        ) : "-"}
                                    </td>
                                    <td className="p-3.5">
                                        {log.pbsValue ? (
                                            <span className={`px-2 py-1 rounded font-bold ${parseFloat(log.pbsValue) <= 160 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {log.pbsValue} mg/dL
                                            </span>
                                        ) : "-"}
                                    </td>
                                    <td className="p-3.5">
                                        {log.postLunchValue ? (
                                            <span className={`px-2 py-1 rounded font-bold ${parseFloat(log.postLunchValue) <= 160 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {log.postLunchValue} mg/dL
                                            </span>
                                        ) : "-"}
                                    </td>
                                    <td className="p-3.5">
                                        {log.postDinnerValue ? (
                                            <span className={`px-2 py-1 rounded font-bold ${parseFloat(log.postDinnerValue) <= 160 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {log.postDinnerValue} mg/dL
                                            </span>
                                        ) : "-"}
                                    </td>
                                    <td className="p-3.5 text-slate-600 whitespace-nowrap">
                                        {log.basaglarDose ? `${log.basaglarDose}u Basaglar` : ""}
                                        {log.actrapidMorning ? ` + ${log.actrapidMorning}/${log.actrapidLunch || 0}/${log.actrapidDinner || 0}u Actrapid` : ""}
                                    </td>
                                    <td className="p-3.5 text-slate-700 font-semibold">
                                        {log.sleepDuration ? `${log.sleepDuration} hrs` : "-"}
                                    </td>
                                    <td className="p-3.5 text-slate-500 max-w-[200px] truncate" title={log.remarks}>
                                        {log.remarks || "-"}
                                    </td>
                                    <td className="p-3.5 text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 text-slate-400 hover:text-red-500"
                                            onClick={() => handleDelete(log.date)}
                                            title="Delete Log"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
}

function GlucoseField({ form, label, valName, timeName, defaultTime }: { form: any; label: string; valName: string; timeName: string; defaultTime: string }) {
    const val = form.watch(valName);
    const numVal = parseFloat(val);

    let badgeColor = "border-slate-200 bg-white";
    if (!isNaN(numVal) && numVal > 0) {
        if (numVal < 70) badgeColor = "border-red-300 bg-red-50";
        else if (numVal <= 140) badgeColor = "border-green-300 bg-green-50/50";
        else if (numVal <= 180) badgeColor = "border-yellow-300 bg-yellow-50/50";
        else badgeColor = "border-red-300 bg-red-50/50";
    }

    return (
        <div className={`p-3 rounded-xl border transition-colors ${badgeColor}`}>
            <div className="flex justify-between items-center mb-1.5">
                <h4 className="text-xs font-bold text-slate-700">{label}</h4>
            </div>
            <div className="space-y-2">
                <FormField
                    control={form.control}
                    name={valName}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="mg/dL" {...field} className="bg-white font-black text-slate-900 text-sm h-9" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={timeName}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="time" defaultValue={defaultTime} {...field} className="bg-white text-xs text-slate-500 h-8" />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}

function MealSection({ form, label, timeName, foodName, defaultTime, placeholder }: { form: any; label: string; timeName: string; foodName: string; defaultTime: string; placeholder: string }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-200">
            <FormField
                control={form.control}
                name={timeName}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-xs font-bold text-slate-700">{label} Time</FormLabel>
                        <FormControl><Input type="time" defaultValue={defaultTime} {...field} className="bg-white" /></FormControl>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={foodName}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-xs font-bold text-slate-700">{label} Description & Indian Food Items</FormLabel>
                        <FormControl><Input placeholder={placeholder} {...field} className="bg-white" /></FormControl>
                    </FormItem>
                )}
            />
        </div>
    );
}
