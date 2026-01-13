"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Glucose Trend"

const chartConfig = {
    glucose: {
        label: "Glucose",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

interface GlucoseData {
    timestamp: string;
    glucose: number;
    type: string;
}

export function GlucoseChart({ data }: { data: GlucoseData[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Glucose Trend</CardTitle>
                <CardDescription>Daily blood sugar levels over time</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="timestamp"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(5)} // Show MM-DD
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            domain={[0, 'auto']} // Start from 0 to max
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="glucose"
                            type="monotone"
                            stroke="var(--color-glucose)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
