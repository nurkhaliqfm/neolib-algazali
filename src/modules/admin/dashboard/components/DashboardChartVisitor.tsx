"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
import { StatistikVisitorResponse } from "@/types/statistik";

const chartConfig = {
	visitor: {
		label: "Visitor",
		color: "hsl(var(--chart-1))",
		icon: TrendingUp,
	},
} satisfies ChartConfig;

export function DashboardChartVisitor({
	data,
	className,
}: {
	data: StatistikVisitorResponse[];
	className?: string;
}) {
	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Data Pengunjung</CardTitle>
				<CardDescription>
					Total pengunjung perpustakaan untuk 6 bulan terakhir
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className="xl:h-96 mx-auto">
					<AreaChart
						accessibilityLayer
						data={data}
						margin={{
							left: 12,
							right: 12,
						}}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<defs>
							<linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-desktop)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-desktop)"
									stopOpacity={0.1}
								/>
							</linearGradient>
							<linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-mobile)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-mobile)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<Area
							dataKey="visitor"
							type="natural"
							fill="blue"
							fillOpacity={0.4}
							stroke="blue"
							stackId="a"
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
