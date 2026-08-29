"use client"

import {
    AreaChart, Area, BarChart, Bar, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea, Legend
} from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, BarChart2, Moon, TrendingUp } from "lucide-react"
import { GlucoseReadingPoint, HealthLogRow } from "@/lib/demo-data"

interface GlucoseChartProps {
    readings: GlucoseReadingPoint[];
    logs?: HealthLogRow[];
}

export function GlucoseChart({ readings, logs = [] }: GlucoseChartProps) {
    // Format trend data
    const trendData = readings.map(r => ({
        timestamp: r.timestamp,
        date: r.date,
        shortTime: r.timestamp.slice(5),
        glucose: r.glucose,
        type: r.type,
        meal: r.mealName || "",
        insulin: r.insulinDose || ""
    }));

    // Group logs for Fasting vs Post-Meal comparison
    const mealComparisonData = logs.map(l => ({
        date: l.date.slice(5), // MM-DD
        day: l.day.slice(0, 3),
        fasting: l.fbsValue ? parseFloat(l.fbsValue) : null,
        postBreakfast: l.pbsValue ? parseFloat(l.pbsValue) : null,
        postLunch: l.postLunchValue ? parseFloat(l.postLunchValue) : null,
        postDinner: l.postDinnerValue ? parseFloat(l.postDinnerValue) : null,
    })).reverse();

    // Sleep vs Fasting Correlation
    const sleepCorrelationData = logs
        .filter(l => l.sleepDuration && l.fbsValue)
        .map(l => ({
            date: l.date.slice(5),
            sleepHours: parseFloat(l.sleepDuration!),
            fastingGlucose: parseFloat(l.fbsValue!),
            mood: l.mood ? parseInt(l.mood, 10) : 3,
        }));

    return (
        <Card className="w-full shadow-lg border-slate-200">
            <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b">
                <div>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-[#003E7E]" />
                        <CardTitle className="text-xl font-bold text-[#003E7E]">Clinical Glycemic Visualizations</CardTitle>
                    </div>
                    <CardDescription>Continuous trends, pre/post-meal excursions, and lifestyle correlations.</CardDescription>
                </div>

                <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-3 text-xs font-bold mr-2">
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#009CDF]"></span> Target (70-180)</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#E31C79]"></span> High (&gt;180)</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6">
                <Tabs defaultValue="trend" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 mb-6 rounded-xl">
                        <TabsTrigger value="trend" className="data-[state=active]:bg-[#003E7E] data-[state=active]:text-white font-bold text-xs sm:text-sm">
                            <Activity className="h-4 w-4 mr-2 hidden sm:inline" />
                            Continuous Trend Line
                        </TabsTrigger>
                        <TabsTrigger value="meals" className="data-[state=active]:bg-[#003E7E] data-[state=active]:text-white font-bold text-xs sm:text-sm">
                            <BarChart2 className="h-4 w-4 mr-2 hidden sm:inline" />
                            Fasting vs Post-Meal
                        </TabsTrigger>
                        <TabsTrigger value="sleep" className="data-[state=active]:bg-[#003E7E] data-[state=active]:text-white font-bold text-xs sm:text-sm">
                            <Moon className="h-4 w-4 mr-2 hidden sm:inline" />
                            Sleep &amp; Fasting Correlation
                        </TabsTrigger>
                    </TabsList>

                    {/* TAB 1: CONTINUOUS TREND */}
                    <TabsContent value="trend" className="space-y-4">
                        <div className="h-[360px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendData.length > 0 ? trendData : [
                                    { shortTime: "07:30", glucose: 108, type: "Fasting", timestamp: "Today 07:30 AM" },
                                    { shortTime: "09:30", glucose: 142, type: "Post-Breakfast", timestamp: "Today 09:30 AM" },
                                    { shortTime: "13:00", glucose: 105, type: "Pre-Lunch", timestamp: "Today 01:00 PM" },
                                    { shortTime: "15:15", glucose: 148, type: "Post-Lunch", timestamp: "Today 03:15 PM" },
                                    { shortTime: "19:30", glucose: 112, type: "Pre-Dinner", timestamp: "Today 07:30 PM" },
                                    { shortTime: "21:30", glucose: 150, type: "Post-Dinner", timestamp: "Today 09:30 PM" },
                                ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#009CDF" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#003E7E" stopOpacity={0.0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="shortTime" tick={{ fill: "#64748B", fontSize: 11 }} tickLine={false} axisLine={false} />
                                    <YAxis domain={[50, 250]} tick={{ fill: "#64748B", fontSize: 11 }} tickLine={false} axisLine={false} />
                                    <ReferenceArea y1={70} y2={180} fill="#10B981" fillOpacity={0.08} label={{ value: "Target TIR (70-180 mg/dL)", fill: "#059669", fontSize: 10, position: "insideTopLeft" }} />
                                    <ReferenceLine y={180} stroke="#E31C79" strokeDasharray="4 4" strokeWidth={1.5} />
                                    <ReferenceLine y={70} stroke="#EF4444" strokeDasharray="4 4" strokeWidth={1.5} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="glucose" stroke="#003E7E" strokeWidth={3} fillOpacity={1} fill="url(#colorGlucose)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>

                    {/* TAB 2: MEAL EXCURSIONS */}
                    <TabsContent value="meals" className="space-y-4">
                        <div className="h-[360px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={mealComparisonData.length > 0 ? mealComparisonData : [
                                    { day: "Mon", fasting: 105, postBreakfast: 140, postLunch: 145, postDinner: 152 },
                                    { day: "Tue", fasting: 110, postBreakfast: 138, postLunch: 150, postDinner: 148 },
                                    { day: "Wed", fasting: 108, postBreakfast: 142, postLunch: 148, postDinner: 150 },
                                    { day: "Thu", fasting: 112, postBreakfast: 145, postLunch: 155, postDinner: 158 },
                                    { day: "Fri", fasting: 104, postBreakfast: 135, postLunch: 142, postDinner: 146 },
                                    { day: "Sat", fasting: 115, postBreakfast: 150, postLunch: 160, postDinner: 162 },
                                    { day: "Sun", fasting: 108, postBreakfast: 142, postLunch: 148, postDinner: 150 },
                                ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="day" tick={{ fill: "#64748B", fontSize: 11 }} tickLine={false} axisLine={false} />
                                    <YAxis domain={[60, 240]} tick={{ fill: "#64748B", fontSize: 11 }} tickLine={false} axisLine={false} />
                                    <Tooltip />
                                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                                    <Bar dataKey="fasting" name="Fasting (FBS)" fill="#003E7E" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="postBreakfast" name="Post-Breakfast" fill="#009CDF" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="postLunch" name="Post-Lunch" fill="#FDB913" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="postDinner" name="Post-Dinner" fill="#E31C79" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>

                    {/* TAB 3: SLEEP CORRELATION */}
                    <TabsContent value="sleep" className="space-y-4">
                        <div className="h-[360px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={sleepCorrelationData.length > 0 ? sleepCorrelationData : [
                                    { date: "08-23", sleepHours: 7.5, fastingGlucose: 105 },
                                    { date: "08-24", sleepHours: 8.0, fastingGlucose: 102 },
                                    { date: "08-25", sleepHours: 6.0, fastingGlucose: 120 },
                                    { date: "08-26", sleepHours: 7.5, fastingGlucose: 108 },
                                    { date: "08-27", sleepHours: 8.0, fastingGlucose: 104 },
                                    { date: "08-28", sleepHours: 5.5, fastingGlucose: 125 },
                                    { date: "08-29", sleepHours: 7.5, fastingGlucose: 108 },
                                ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="date" tick={{ fill: "#64748B", fontSize: 11 }} tickLine={false} axisLine={false} />
                                    <YAxis
                                        yAxisId="left"
                                        domain={[70, 180]}
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fill: "#003E7E", fontSize: 11 }}
                                        label={{ value: "Fasting Glucose (mg/dL)", angle: -90, position: "insideLeft", fill: "#003E7E", fontSize: 10 }}
                                    />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        domain={[4, 10]}
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fill: "#8B5CF6", fontSize: 11 }}
                                        label={{ value: "Sleep (Hrs)", angle: 90, position: "insideRight", fill: "#8B5CF6", fontSize: 10 }}
                                    />
                                    <Tooltip />
                                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                                    <Line yAxisId="left" type="monotone" dataKey="fastingGlucose" name="Fasting Glucose (mg/dL)" stroke="#003E7E" strokeWidth={3} dot={{ r: 4 }} />
                                    <Line yAxisId="right" type="monotone" dataKey="sleepHours" name="Sleep Duration (Hours)" stroke="#8B5CF6" strokeWidth={3} strokeDasharray="4 4" dot={{ r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        payload: {
            timestamp?: string;
            type?: string;
            glucose?: number;
            meal?: string;
            insulin?: string;
        };
    }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-[#003E7E] text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
                <p className="font-bold text-blue-200">{data.timestamp}</p>
                <div className="flex items-center justify-between gap-4">
                    <span className="opacity-80">{data.type}:</span>
                    <span className="text-base font-black text-white">{data.glucose} mg/dL</span>
                </div>
                {data.meal && <p className="text-[11px] text-blue-100 max-w-[200px]">Meal: {data.meal}</p>}
                {data.insulin && <p className="text-[11px] text-[#009CDF]">Insulin: {data.insulin}</p>}
            </div>
        );
    }
    return null;
}
