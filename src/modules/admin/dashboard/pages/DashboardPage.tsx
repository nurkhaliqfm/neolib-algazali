import { DashboardCard } from "../components/DashboardCard";
import { DashboardBorrowTable } from "../components/DashboardBorrowTable";
import { DashboardChart } from "../components/DashboardChart";
import { CardDashboardItemKey } from "../types/dashboard.type";
import { RepositoryItemKey } from "@/types/repository";
import {
	StatistikResponse,
	StatistikTransaksiResponse,
} from "@/types/statistik";
import { useEffect, useState } from "react";
import {
	getDataLatestTransaksi,
	getDataStatistik,
	getDataStatistikTransaksi,
} from "../services/statistikService";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { TransaksiDetailResponse } from "../../transaksi/types/transaksi.type";

function DashboardPage() {
	const user = useTypedSelector((state) => state.oauth.oauthData);

	const [statistikData, setStatistikData] = useState<StatistikResponse | null>(
		null
	);

	const [statistikTransaksiData, setStatistikTransaksiData] = useState<
		StatistikTransaksiResponse[]
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{statistikData && (
				<section className="grid grid-cols-2 md:grid-cols-3 gap-4">
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

			<section className="my-4 grid grid-cols-1 xl:grid-cols-3 gap-y-4 xl:gap-x-4 auto-rows-max">
				<DashboardChart data={statistikTransaksiData} />
				<DashboardBorrowTable data={latestTransaksiData} />
			</section>
		</>
	);
}

export default DashboardPage;
