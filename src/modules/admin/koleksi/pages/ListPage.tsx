import { RepositoryItemKey } from '@/types/repository';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getListRepository } from '../services/koleksiService';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { RepositoryResponse } from '../types/koleksi.type';
import { RepositoryTable } from '../components/KoleksiTable';

const ListKoleksiPage = () => {
	const { koleksi } = useParams<{ koleksi: RepositoryItemKey }>();
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get('page') || '1';

	const user = useTypedSelector((state) => state.oauth.oauthData);
	const [repositoryData, setrepositoryData] =
		useState<RepositoryResponse | null>(null);

	useEffect(() => {
		if (koleksi) {
			getListRepository({
				token: user?.access_token,
				page: page,
				type: koleksi,
				onDone: (data) => {
					setrepositoryData(data);
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	return (
		<>
			{repositoryData ? (
				<>
					<h3 className="">Data Koleksi {koleksi}</h3>
					<RepositoryTable
						data={repositoryData}
						page={Number(page)}
						setSearchParams={setSearchParams}
					/>
				</>
			) : (
				<div className="border-1 border-slate-100 p-2 rounded-lg text-center shadow-md">
					Data koleksi tidak ditemukan
				</div>
			)}
		</>
	);
};

export default ListKoleksiPage;
