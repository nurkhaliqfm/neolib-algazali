"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { StatistikTransaksiResponse } from "@/types/statistik";

const chartConfig = {
	peminjaman: {
		label: "Peminjaman",
		color: "hsl(var(--chart-1))",
		icon: TrendingUp,
	},
} satisfies ChartConfig;

export function DashboardChart({
	data,
}: {
	data: StatistikTransaksiResponse[];
}) {
	console.log(data);
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
					<BarChart accessibilityLayer data={data}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar
							dataKey="peminjaman"
							fill="blue"
							type="natural"
							fillOpacity={0.4}
							stroke="blue"
							radius={8}
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
