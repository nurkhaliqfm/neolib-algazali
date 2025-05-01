import { DashboardCard } from '../components/DashboardCard';
import { DashboardBorrowTable } from '../components/DashboardBorrowTable';
import { DashboardChart } from '../components/DashboardChart';
import { CardDashboardItemKey } from '../types/dashboard.type';
import { RepositoryItemKey } from '@/types/repository';
import { StatistikResponse } from '@/types/statistik';
import { BorrowHistoryReponse } from '@/types/borrow';
import { useEffect, useState } from 'react';
import { getDataStatistik } from '../services/statistikService';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const dataPeminjaman: BorrowHistoryReponse[] = [
	{
		id: 1,
		name: 'Nurkhaliq Futhra',
		role: 'Mahasiswa',
		peminjaman: '04-25-2025',
		pengembalian: '04-30-2025',
		status: 'ongoing',
	},
	{
		id: 2,
		name: 'Zoey Lang',
		role: 'Dosen',
		peminjaman: '04-25-2025',
		pengembalian: '04-30-2025',
		status: 'expired',
	},
	{
		id: 3,
		name: 'Jane Fisher',
		role: 'Dosen',
		peminjaman: '04-25-2025',
		pengembalian: '04-30-2025',
		status: 'ongoing',
	},
	{
		id: 4,
		name: 'William Howard',
		role: 'Eksternal',
		peminjaman: '04-25-2025',
		pengembalian: '04-30-2025',
		status: 'expired',
	},
	{
		id: 5,
		name: 'Kristen Copper',
		role: 'Mahasiswa',
		peminjaman: '04-20-2025',
		pengembalian: '04-31-2025',
		status: 'ongoing',
	},
	{
		id: 6,
		name: 'Kristen Copper',
		role: 'Mahasiswa',
		peminjaman: '04-25-2025',
		pengembalian: '04-30-2025',
		status: 'ongoing',
	},
];

function DashboardPage() {
	const user = useTypedSelector((state) => state.oauth.oauthData);

	const [statistikData, setStatistikData] = useState<StatistikResponse | null>(
		null
	);

	useEffect(() => {
		getDataStatistik({
			token: user?.access_token,
			onDone: (data) => {
				setStatistikData(data);
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

			<section className="my-4 grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-max">
				<DashboardChart />
				<DashboardBorrowTable data={dataPeminjaman} />
			</section>
		</>
	);
}

export default DashboardPage;
