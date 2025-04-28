"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "Januari", peminjaman: 186, pengembalian: 80 },
    { month: "Februari", peminjaman: 305, pengembalian: 200 },
    { month: "Maret", peminjaman: 237, pengembalian: 120 },
    { month: "April", peminjaman: 73, pengembalian: 190 },
    { month: "Mei", peminjaman: 209, pengembalian: 130 },
    { month: "Juni", peminjaman: 214, pengembalian: 140 },
]

const chartConfig = {
    peminjaman: {
        label: "Peminjaman",
        color: "hsl(var(--chart-1))",
        icon: TrendingUp,
    },
    pengembalian: {
        label: "Pengembalian",
        color: "hsl(var(--chart-2))",
        icon: TrendingDown,
    },
} satisfies ChartConfig

export function ChartPeminjaman() {
    return (
        <Card className="md:col-span-2 col-span-1 h-fit">
            <CardHeader>
                <CardTitle>Data Peminjaman</CardTitle>
                <CardDescription>
                    Total peminjaman perpustakaan untuk 6 bulan terakhir
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="peminjaman"
                            type="natural"
                            fill="blue"
                            fillOpacity={0.4}
                            stroke="blue"
                            stackId="a"
                        />
                        <Area
                            dataKey="pengembalian"
                            type="natural"
                            fill="var(--color-pengembalian)"
                            fillOpacity={0.4}
                            stroke="var(--color-pengembalian)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
