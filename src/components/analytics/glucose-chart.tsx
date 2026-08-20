"use client"

import { useState } from "react"
import {
    AreaChart, Area, BarChart, Bar, LineChart, Line, ScatterChart, Scatter,
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
import { Badge } from "@/components/ui/badge"
import { Activity, BarChart2, Moon, TrendingUp } from "lucide-react"
import { GlucoseReadingPoint, HealthLogRow } from "@/lib/demo-data"

interface GlucoseChartProps {
    readings: GlucoseReadingPoint[];
    logs?: HealthLogRow[];
}

export function GlucoseChart({ readings, logs = [] }: GlucoseChartProps) {
    const [chartMode, setChartMode] = useState<string>("trend");

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
                <Tabs defaultValue="trend" onValueChange={setChartMode} className="w-full">
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
                            Sleep & Fasting Correlation
                        </TabsTrigger>
                    </TabsList>

                    {/* TAB 1: CONTINUOUS TREND */}
                    <TabsContent value="trend" className="space-y-4">
                        <div className="h-[360px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="glucoseGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#003E7E" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#009CDF" stopOpacity={0.05} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis
                                        dataKey="shortTime"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tick={{ fill: "#64748B", fontSize: 11 }}
                                    />
                                    <YAxis
                                        domain={[50, 240]}
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tick={{ fill: "#64748B", fontSize: 11 }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    {/* Target In-Range Band (70 - 180 mg/dL) */}
                                    <ReferenceArea y1={70} y2={180} fill="#10B981" fillOpacity={0.08} label={{ value: "Target Zone (70-180)", fill: "#059669", fontSize: 10, position: "insideTopRight" }} />
                                    <ReferenceLine y={180} stroke="#E31C79" strokeDasharray="3 3" label={{ value: "High (180)", fill: "#E31C79", fontSize: 10, position: "right" }} />
                                    <ReferenceLine y={70} stroke="#EF4444" strokeDasharray="3 3" label={{ value: "Hypo (70)", fill: "#EF4444", fontSize: 10, position: "right" }} />
                                    <Area
                                        type="monotone"
                                        dataKey="glucose"
                                        stroke="#003E7E"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#glucoseGradient)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>

                    {/* TAB 2: FASTING VS POST-MEAL */}
                    <TabsContent value="meals" className="space-y-4">
                        <div className="h-[360px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={mealComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tick={{ fill: "#64748B", fontSize: 11 }}
                                    />
                                    <YAxis
                                        domain={[60, 220]}
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tick={{ fill: "#64748B", fontSize: 11 }}
                                    />
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
                                <LineChart data={sleepCorrelationData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tick={{ fill: "#64748B", fontSize: 11 }}
                                    />
                                    <YAxis
                                        yAxisId="left"
                                        domain={[80, 150]}
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fill: "#003E7E", fontSize: 11 }}
                                        label={{ value: "Fasting BG (mg/dL)", angle: -90, position: "insideLeft", fill: "#003E7E", fontSize: 10 }}
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

function CustomTooltip({ active, payload, label }: any) {
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
