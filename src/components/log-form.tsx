"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"

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
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LogForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<HealthLogValues>({
        resolver: zodResolver(healthLogSchema),
        defaultValues: {
            date: new Date(),
        },
    })

    async function onSubmit(data: HealthLogValues) {
        setIsSubmitting(true);
        try {
            // Precise columns mapping based on user request (34 cols)
            // 1. Timestamp, 2. Date, 3. Day, ...
            const dayOfWeek = format(data.date, "EEEE");
            const timestamp = new Date().toLocaleString();

            const values = [
                timestamp,                              // 1. Timestamp
                format(data.date, "yyyy-MM-dd"),        // 2. Date
                dayOfWeek,                              // 3. Day
                data.thyronormTime || "",               // 4. Thyronorm Time
                data.actrapidMorning || "",             // 5. Actrapid Morning
                data.actrapidLunch || "",               // 6. Actrapid Lunch
                data.actrapidDinner || "",              // 7. Actrapid Dinner
                data.basaglarDose || "",                // 8. Basaglar Dose
                data.basaglarTime || "",                // 9. Basaglar Time
                data.fbsValue || "",                    // 10. FBS Value
                data.fbsTime || "",                     // 11. FBS Time
                data.pbsValue || "",                    // 12. PBS Value
                data.pbsTime || "",                     // 13. PBS Time
                data.preLunchValue || "",               // 14. Pre-Lunch Value
                data.preLunchTime || "",                // 15. Pre-Lunch Time
                data.postLunchValue || "",              // 16. Post-Lunch Value
                data.postLunchTime || "",               // 17. Post-Lunch Time
                data.preDinnerValue || "",              // 18. Pre-Dinner Value
                data.preDinnerTime || "",               // 19. Pre-Dinner Time
                data.postDinnerValue || "",             // 20. Post-Dinner Value
                data.postDinnerTime || "",              // 21. Post-Dinner Time
                data.randomValue || "",                 // 22. Random Value
                data.randomTime || "",                  // 23. Random Time
                data.breakfastTime || "",               // 24. Breakfast Time
                data.breakfastFood || "",               // 25. Breakfast Food
                data.lunchTime || "",                   // 26. Lunch Time
                data.lunchFood || "",                   // 27. Lunch Food
                data.dinnerTime || "",                  // 28. Dinner Time
                data.dinnerFood || "",                  // 29. Dinner Food
                data.correctionDose || "",              // 30. Correction Dose
                data.bowelMovementTime || "",           // 31. Bowel Movement
                data.sleepDuration || "",               // 32. Sleep Duration
                data.mood || "",                        // 33. Mood
                data.remarks || "",                     // 34. Remarks
            ];

            const response = await fetch("/api/sheets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    range: "Sheet1!A:AI",
                    values: [values],
                }),
            });

            if (!response.ok) throw new Error("Failed to save log");

            toast.success("Health log saved successfully");
            form.reset({ date: new Date() });
        } catch (error) {
            toast.error("Error saving log. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-lg">
            <CardHeader>
                <CardTitle>Detailed Health Log</CardTitle>
                <CardDescription>Comprehensive daily tracking.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        {/* Global Date Field */}
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Log Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
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

                        <Tabs defaultValue="glucose" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 bg-slate-100 p-1 h-12">
                                <TabsTrigger value="glucose" className="data-[state=active]:bg-[#003E7E] data-[state=active]:text-white font-bold text-slate-600">Glucose</TabsTrigger>
                                <TabsTrigger value="meds" className="data-[state=active]:bg-[#E31C79] data-[state=active]:text-white font-bold text-slate-600">Meds</TabsTrigger>
                                <TabsTrigger value="meals" className="data-[state=active]:bg-[#FDB913] data-[state=active]:text-white font-bold text-slate-600">Meals</TabsTrigger>
                                <TabsTrigger value="lifestyle" className="data-[state=active]:bg-[#009CDF] data-[state=active]:text-white font-bold text-slate-600">Lifestyle</TabsTrigger>
                            </TabsList>

                            {/* GLUCOSE TAB */}
                            <TabsContent value="glucose" className="space-y-4 border p-4 rounded-md">
                                <h3 className="font-semibold">Blood Glucose Readings</h3>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <GlucoseField form={form} label="Fasting (FBS)" valName="fbsValue" timeName="fbsTime" />
                                    <GlucoseField form={form} label="Post-Breakfast (PBS)" valName="pbsValue" timeName="pbsTime" />
                                    <GlucoseField form={form} label="Pre-Lunch" valName="preLunchValue" timeName="preLunchTime" />
                                    <GlucoseField form={form} label="Post-Lunch" valName="postLunchValue" timeName="postLunchTime" />
                                    <GlucoseField form={form} label="Pre-Dinner" valName="preDinnerValue" timeName="preDinnerTime" />
                                    <GlucoseField form={form} label="Post-Dinner" valName="postDinnerValue" timeName="postDinnerTime" />
                                    <GlucoseField form={form} label="Random" valName="randomValue" timeName="randomTime" />
                                </div>
                            </TabsContent>

                            {/* MEDS TAB */}
                            <TabsContent value="meds" className="space-y-4 border p-4 rounded-md">
                                <h3 className="font-semibold">Insulin & Thyroid</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium text-muted-foreground">Thyronorm</h4>
                                        <FormField
                                            control={form.control}
                                            name="thyronormTime"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Time Taken</FormLabel>
                                                    <FormControl><Input type="time" {...field} /></FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium text-muted-foreground">Basaglar</h4>
                                        <div className="flex gap-2">
                                            <FormField
                                                control={form.control}
                                                name="basaglarDose"
                                                render={({ field }) => (
                                                    <FormItem className="flex-1">
                                                        <FormLabel>Dose (Units)</FormLabel>
                                                        <FormControl><Input placeholder="Units" {...field} /></FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="basaglarTime"
                                                render={({ field }) => (
                                                    <FormItem className="flex-1">
                                                        <FormLabel>Time</FormLabel>
                                                        <FormControl><Input type="time" {...field} /></FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-muted-foreground">Actrapid (Regular Insulin)</h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="actrapidMorning"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Morning</FormLabel>
                                                    <FormControl><Input placeholder="Units" {...field} /></FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="actrapidLunch"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Lunch</FormLabel>
                                                    <FormControl><Input placeholder="Units" {...field} /></FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="actrapidDinner"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Dinner</FormLabel>
                                                    <FormControl><Input placeholder="Units" {...field} /></FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="correctionDose"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Correction Dose / Hyper Adjustments</FormLabel>
                                            <FormControl><Input placeholder="e.g. 2u for high sugar" {...field} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>

                            {/* MEALS TAB */}
                            <TabsContent value="meals" className="space-y-4 border p-4 rounded-md">
                                <h3 className="font-semibold">Nutrition</h3>
                                <MealSection form={form} label="Breakfast" timeName="breakfastTime" foodName="breakfastFood" />
                                <MealSection form={form} label="Lunch" timeName="lunchTime" foodName="lunchFood" />
                                <MealSection form={form} label="Dinner" timeName="dinnerTime" foodName="dinnerFood" />
                            </TabsContent>

                            {/* LIFESTYLE TAB */}
                            <TabsContent value="lifestyle" className="space-y-4 border p-4 rounded-md">
                                <h3 className="font-semibold">Lifestyle & Observations</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="sleepDuration"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Sleep (Hours)</FormLabel>
                                                <FormControl><Input type="number" step="0.5" {...field} /></FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="mood"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mood (1-5)</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select mood" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="1">1 - Very Bad</SelectItem>
                                                        <SelectItem value="2">2 - Bad</SelectItem>
                                                        <SelectItem value="3">3 - Neutral</SelectItem>
                                                        <SelectItem value="4">4 - Good</SelectItem>
                                                        <SelectItem value="5">5 - Excellent</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="bowelMovementTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bowel Movement Time</FormLabel>
                                            <FormControl><Input type="time" {...field} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="remarks"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Remarks</FormLabel>
                                            <FormControl><Textarea placeholder="Symptoms, Activity, Stress..." {...field} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>
                        </Tabs>

                        <Button type="submit" disabled={isSubmitting} className="w-full bg-[#003E7E] hover:bg-[#002a5e] h-12 text-lg font-bold shadow-lg">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving to Sheets...
                                </>
                            ) : (
                                "Save Log Entry"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

function GlucoseField({ form, label, valName, timeName }: { form: any, label: string, valName: string, timeName: string }) {
    return (
        <div className="space-y-2 border p-2 rounded bg-muted/20">
            <h4 className="text-sm font-medium">{label}</h4>
            <div className="flex flex-col gap-2">
                <FormField
                    control={form.control}
                    name={valName}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl><Input placeholder="mg/dL" {...field} /></FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={timeName}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl><Input type="time" {...field} /></FormControl>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}

function MealSection({ form, label, timeName, foodName }: { form: any, label: string, timeName: string, foodName: string }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 items-end">
            <FormField
                control={form.control}
                name={timeName}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label} Time</FormLabel>
                        <FormControl><Input type="time" {...field} /></FormControl>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={foodName}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label} Description</FormLabel>
                        <FormControl><Input placeholder="What did you eat?" {...field} /></FormControl>
                    </FormItem>
                )}
            />
        </div>
    )
}
