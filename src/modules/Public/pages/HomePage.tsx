import { cn } from '@/lib/utils';
import CarouselBanner from '../components/CarouselBanner';
import { Button } from '@heroui/react';
import { repositoryTypeMap } from '@/constants/repository';
import { useEffect, useState } from 'react';
import { getListRekomendasiRepository } from '../service/publicService';
import { RepositoryDetailResponse } from '@/modules/admin/koleksi/types/koleksi.type';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import '/node_modules/swiper/swiper-bundle.min.css';
import AppRoutes from '@/router/routes';
import {
	CardCustomeStyleBasic,
	CardCustomeStyleDetail,
} from '../components/CardRepository';

const { VITE_SERVER_BASE_URL } = import.meta.env;

const TitleSection = ({
	title,
	description,
}: {
	title: string;
	description?: string;
}) => {
	return (
		<>
			<p className="text-primary-800 text-2xl font-medium">{title}</p>
			<span
				className={cn(
					'text-primary-800 text-sm font-light',
					!description ? 'hidden' : ''
				)}>
				{description}
			</span>
		</>
	);
};

function HomePage() {
	const [rekomendasiRepository, setRekomendasiRepository] = useState<
		RepositoryDetailResponse[]
	>([]);
	const [listRepository, setListRepository] = useState<
		RepositoryDetailResponse[]
	>([]);
	const [typeRepos, setTypeRepos] =
		useState<keyof typeof repositoryTypeMap>('JURNAL');

	useEffect(() => {
		getListRekomendasiRepository({
			onDone: (data) => {
				setRekomendasiRepository(data);
			},
		});
	}, []);

	useEffect(() => {
		if (typeRepos) {
			getListRekomendasiRepository({
				limit: '6',
				repos: typeRepos,
				onDone: (data) => {
					setListRepository(data);
				},
			});
		}
	}, [typeRepos]);

	return (
		<section>
			<CarouselBanner />
			<section className="leading-3 my-2 px-6">
				<TitleSection
					title="Rekomendasi"
					description="Berikut beberapa rekomendasi repositori"
				/>

				<section className="flex gap-x-4 my-6">
					<Swiper
						breakpoints={{
							320: { slidesPerView: 1, spaceBetween: 10 },
							480: { slidesPerView: 2, spaceBetween: 10 },
							768: { slidesPerView: 3, spaceBetween: 10 },
							1024: { slidesPerView: 4, spaceBetween: 10 },
						}}
						loop={true}
						pagination={{
							clickable: true,
						}}
						modules={[Autoplay, Pagination]}
						className="mySwiper">
						{rekomendasiRepository &&
							rekomendasiRepository.map((repos, index) => {
								return (
									<SwiperSlide
										key={`repos-${repos.judul.toLowerCase()}-${index}`}>
										<CardCustomeStyleBasic
											url={`${VITE_SERVER_BASE_URL}/public/skripsi/sampul/ss.jpg`}
											title={repos.judul}
											type={repos.type}
											repos={repos.id}
											pengarang={
												repos[repositoryTypeMap[repos.type]]
													?.pengarang as string
											}
										/>
									</SwiperSlide>
								);
							})}
					</Swiper>
				</section>
			</section>

			<section className="leading-3 my-2 px-6">
				<TitleSection title="Koleksi Perpustakaan" />
				<section className="flex gap-x-2">
					{Object.keys(repositoryTypeMap).map((item) => {
						return (
							<Button
								key={`tag-${item.toLowerCase()}`}
								className="capitalize my-2"
								color={item === typeRepos ? 'primary' : 'default'}
								size="sm"
								radius="lg"
								variant={item === typeRepos ? 'flat' : 'ghost'}
								onPress={() =>
									setTypeRepos(item as keyof typeof repositoryTypeMap)
								}>
								{item}
							</Button>
						);
					})}
				</section>

				<section className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 my-6">
					{listRepository &&
						listRepository.map((repos, index) => {
							const detailKey = repositoryTypeMap[repos.type];
							const selectedReposByType = repos[detailKey];

							return (
								<SwiperSlide
									key={`repos-${repos.judul.toLowerCase()}-${index}`}>
									<CardCustomeStyleDetail
										url={`${VITE_SERVER_BASE_URL}/public/${repos.type}/sampul/${repos.nama_sampul}`}
										title={repos.judul}
										type={repos.type}
										repos={repos.id}
										pengarang={selectedReposByType?.pengarang as string}
										tahun_terbit={
											selectedReposByType?.tahun_terbit.toString() as string
										}
										sinopsis={
											selectedReposByType
												? ('sinopsis' in selectedReposByType &&
														selectedReposByType.sinopsis) ||
												  undefined
												: undefined
										}
										abstrak={
											selectedReposByType
												? ('abstrak' in selectedReposByType &&
														selectedReposByType.abstrak) ||
												  undefined
												: undefined
										}
									/>
								</SwiperSlide>
							);
						})}
				</section>
				<div className="flex justify-center">
					<Button
						variant="shadow"
						color="primary"
						onPress={() => AppRoutes.Koleksi.path}>
						Lihat Repository Lainnya
					</Button>
				</div>
			</section>

			<section className="leading-3 my-2 px-6">
				<TitleSection
					title="Publikasi Jurnal"
					description="Berikut beberapa publikasi jurnal ITBA Al-Gazali Barru"
				/>
				<section>
					<div></div>
				</section>
			</section>
		</section>
	);
}

export default HomePage;
