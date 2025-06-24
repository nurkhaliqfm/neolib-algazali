import { DashboardCard } from "../components/DashboardCard";
import { DashboardBorrowTable } from "../components/DashboardBorrowTable";
import { DashboardChartBorrowed } from "../components/DashboardChartBorrowed";
import { CardDashboardItemKey } from "../types/dashboard.type";
import { RepositoryItemKey } from "@/types/repository";
import {
	StatistikResponse,
	StatistikTransaksiResponse,
	StatistikVisitorResponse,
} from "@/types/statistik";
import { useEffect, useState } from "react";
import {
	getDataLatestTransaksi,
	getDataStatistik,
	getDataStatistikTransaksi,
	getDataVisitor,
} from "../services/statistikService";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { TransaksiDetailResponse } from "../../transaksi/types/transaksi.type";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { DashboardChartVisitor } from "../components/DashboardChartVisitor";

function DashboardPage() {
	const user = useTypedSelector((state) => state.oauth.oauthData);

	const [statistikData, setStatistikData] = useState<StatistikResponse | null>(
		null
	);

	const [statistikTransaksiData, setStatistikTransaksiData] = useState<
		StatistikTransaksiResponse[]
	>([]);

	const [statistikVisitorData, setStatistikVisitorData] = useState<
		StatistikVisitorResponse[]
	>([]);

	const [latestTransaksiData, setLatestTransaksiDataData] = useState<
		TransaksiDetailResponse[]
	>([]);

	useEffect(() => {
		getDataStatistik({
			token: user?.access_token,
			onDone: (data) => {
				setStatistikData(data);
			},
		});
		getDataStatistikTransaksi({
			token: user?.access_token,
			onDone: (data) => {
				setStatistikTransaksiData(data);
			},
		});
		getDataLatestTransaksi({
			token: user?.access_token,
			onDone: (data) => {
				setLatestTransaksiDataData(data);
			},
		});
		getDataVisitor({
			token: user?.access_token,
			onDone: (data) => {
				setStatistikVisitorData(data);
			},
		});
	}, [user?.access_token]);

	return (
		<>
			{statistikData && (
				<section className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 pb-0">
					{Object.keys(statistikData.repository).map((keys) => {
						return (
							<DashboardCard
								key={`card-koleksi-${keys}`}
								slug={keys as RepositoryItemKey}
								item={statistikData.repository[keys as CardDashboardItemKey]}
							/>
						);
					})}

					<DashboardCard
						key={`card-koleksi-anggota`}
						slug="anggota"
						item={statistikData.anggota}
					/>
					<DashboardCard
						key={`card-koleksi-pinjaman`}
						slug="pinjaman"
						item={statistikData.pinjaman}
					/>
				</section>
			)}

			<section className="my-4 flex flex-col xl:flex-row gap-y-4 xl:gap-x-4 auto-rows-max px-4">
				<DashboardChartVisitor
					className="flex-1 col-span-1"
					data={statistikVisitorData}
				/>
			</section>

			<section className="my-4 flex flex-col xl:flex-row gap-y-4 xl:gap-x-4 auto-rows-max px-4">
				<DashboardChartBorrowed
					className="flex-1 col-span-1"
					data={statistikTransaksiData}
				/>
				<Card className="py-4 border rounded-2xl xl:h-1/2" shadow="sm">
					<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
						<p className="text-tiny uppercase font-bold">
							Daftar Pinjaman Anggota
						</p>
					</CardHeader>
					<CardBody className="overflow-visible py-2 px-0">
						<DashboardBorrowTable data={latestTransaksiData} />
					</CardBody>
				</Card>
			</section>
		</>
	);
}

export default DashboardPage;
