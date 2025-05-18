import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { RepositoryItemKey } from '@/types/repository';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Chip,
	Image,
} from '@heroui/react';
import { HiOutlineEye } from 'react-icons/hi2';
import {
	repositoryMetaFileds,
	repositoryTypeMap,
	typeColorMap,
} from '@/constants/repository';
import {
	RepositoryDetailItem,
	RepositoryDetailResponse,
} from '@/modules/admin/koleksi/types/koleksi.type';
import { getDetailRepository } from '@/modules/admin/koleksi/services/koleksiService';
import { KoleksiDetail, KoleksiDetailItem } from '../components/KoleksiDetail';

const { VITE_SERVER_BASE_URL } = import.meta.env;

const DetailKoleksiPage = () => {
	const { koleksi } = useParams<{ koleksi: RepositoryItemKey }>();
	const { search } = useLocation();

	const params = new URLSearchParams(search);
	const repos = params.get('repos');

	const user = useTypedSelector((state) => state.oauth.oauthData);
	const [repositoryDetailData, setrepositoryDetailData] =
		useState<RepositoryDetailResponse | null>(null);

	useEffect(() => {
		if (koleksi && repos) {
			getDetailRepository({
				token: user?.access_token,
				type: koleksi,
				repos: repos,
				onDone: (data) => {
					setrepositoryDetailData(data);
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [koleksi, repos]);

	if (!repositoryDetailData) return <p>No data found.</p>;

	const detailKey = repositoryTypeMap[repositoryDetailData.type];
	const detailData = repositoryDetailData[detailKey];

	return (
		<>
			{repositoryDetailData && (
				<section className="flex gap-4 p-4 flex-col lg:flex-row">
					<Card
						className="py-4 md:max-w-80 w-full border rounded-2xl"
						shadow="none">
						<CardBody className="overflow-visible py-2 items-center">
							<Image
								alt="Card background"
								className="object-cover rounded-xl"
								src={`${VITE_SERVER_BASE_URL}/public/${koleksi}/sampul/${repositoryDetailData.nama_sampul}`}
								width={320}
							/>
						</CardBody>
						<CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
							<p className="text-tiny uppercase font-bold">
								{repositoryDetailData.judul}
							</p>
							<Chip
								className="capitalize my-2"
								color={typeColorMap[repositoryDetailData.type]}
								size="sm"
								variant="flat">
								{repositoryDetailData.type}
							</Chip>
							{repositoryDetailData.nama_file &&
								repositoryDetailData.nama_file !== '' && (
									<Button
										className="my-2"
										startContent={<HiOutlineEye />}
										size="sm">
										Preview
									</Button>
								)}
						</CardFooter>
					</Card>
					<Card className="py-4 flex-1 border rounded-2xl" shadow="none">
						<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
							<p className="text-tiny uppercase font-bold">Detail {koleksi}</p>
						</CardHeader>
						<CardBody className="overflow-visible py-2 px-4">
							<KoleksiDetail
								data={detailData as RepositoryDetailItem[typeof detailKey]}
								renderFields={({ data, keys }) => {
									const key = keys.filter((key) => (key as string) !== 'id');
									return (
										<>
											{key.map((k) => (
												<KoleksiDetailItem
													key={k}
													slug={k}
													title={repositoryMetaFileds[k].slug}
													value={
														k === 'lokasi'
															? data.lokasi
																? data.lokasi.nama
																: ''
															: (data[k] as string)
													}
												/>
											))}
										</>
									);
								}}
							/>
						</CardBody>
					</Card>
				</section>
			)}
		</>
	);
};

export default DetailKoleksiPage;
