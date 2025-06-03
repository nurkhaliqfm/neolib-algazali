import { cn } from '@/lib/utils';
import CarouselBanner from '../components/CarouselBanner';
import { Button, Image } from '@heroui/react';
import { repositoryTypeMap } from '@/constants/repository';
import { useEffect, useState } from 'react';
import { getListRekomendasiRepository } from '../service/publicService';
import { RepositoryDetailResponse } from '@/modules/admin/koleksi/types/koleksi.type';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import '/node_modules/swiper/swiper-bundle.min.css';
import { IconType } from 'react-icons/lib';
import {
	HiOutlineAcademicCap,
	HiOutlineBookOpen,
	HiOutlineDocumentText,
} from 'react-icons/hi2';

const { VITE_SERVER_BASE_URL } = import.meta.env;

const typeColorMapCustom: Record<
	string,
	{ color: string; background: string; gradient: string; icon: IconType }
> = {
	EJURNAL: {
		color: 'text-red-400',
		background: 'bg-red-400',
		gradient: 'bg-gradient-to-r from-red-200 to-red-500',
		icon: HiOutlineDocumentText,
	},
	JURNAL: {
		color: 'text-yellow-400',
		background: 'bg-yellow-400',
		gradient: 'bg-gradient-to-r from-yellow-200 to-yellow-500',
		icon: HiOutlineDocumentText,
	},
	BUKU: {
		color: 'text-blue-400',
		background: 'bg-blue-400',
		gradient: 'bg-gradient-to-r from-blue-200 to-blue-500',
		icon: HiOutlineBookOpen,
	},
	EBOOK: {
		color: 'text-green-400',
		background: 'bg-green-400',
		gradient: 'bg-gradient-to-r from-green-200 to-green-500',
		icon: HiOutlineBookOpen,
	},
	SKRIPSI: {
		color: 'text-cyan-400',
		background: 'bg-cyan-400',
		gradient: 'bg-gradient-to-r from-cyan-200 to-cyan-500',
		icon: HiOutlineAcademicCap,
	},
};

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

const CardCustomeStyleBasic = ({
	url,
	pengarang,
	title,
	type,
}: {
	url: string;
	pengarang: string;
	title: string;
	type: string;
}) => {
	const Icon = typeColorMapCustom[type].icon;

	return (
		<div className="flex justify-center mb-10">
			<section className="relative w-48">
				<div
					className={cn(
						`absolute flex items-center gap-x-1 z-20 px-2 py-1 shadow-md font-light text-xs rounded-l-md rounded-br-md right-3 top-5`,
						typeColorMapCustom[type].gradient
					)}>
					<Icon />
					{type}
				</div>
				<Image
					shadow="lg"
					radius="none"
					alt="Cover Repository"
					className="object-cover absolute translate-x-1/2 right-14"
					src={url}
					width={148}
				/>
				<div className="mt-[12rem] leading-6 pt-10 h-32 p-4 bg-primary-200/50 rounded-xl overflow-hidden">
					<p className="font-light text-xs line-clamp-2 text-ellipsis">
						{pengarang}
					</p>
					<p className="text-sm line-clamp-3 text-ellipsis">{title}</p>
				</div>
			</section>
		</div>
	);
};

const CardCustomeStyleDetail = ({
	url,
	pengarang,
	title,
	type,
}: {
	url: string;
	pengarang: string;
	title: string;
	type: string;
}) => {
	const Icon = typeColorMapCustom[type].icon;

	return (
		<div className="flex w-full rounded-xl border-2 border-primary-800/50 my-6">
			<div className="relative w-40 bg-primary-200/50 rounded-l-xl">
				<div
					className={cn(
						`absolute flex items-center gap-x-1 z-20 px-2 py-1 shadow-md font-light text-xs rounded-l-md rounded-br-md right-2 -top-4`,
						typeColorMapCustom[type].gradient
					)}>
					<Icon />
					{type}
				</div>
				<Image
					shadow="lg"
					radius="none"
					alt="Cover Repository"
					className="object-cover absolute translate-x-1/2 right-10 -bottom-36"
					src={url}
					width={120}
				/>
				<div></div>
				<div className="leading-6 h-full p-3 mt-36"></div>
			</div>
			<div className="flex-1 leading-6 p-4">
				<p className="font-light text-sm">{pengarang}</p>
				<p className="text-sm line-clamp-2 text-ellipsis">{title}</p>
			</div>
		</div>
	);
};

function HomePage() {
	const [rekomendasiRepository, setRekomendasiRepository] = useState<
		RepositoryDetailResponse[]
	>([]);

	useEffect(() => {
		getListRekomendasiRepository({
			onDone: (data) => {
				console.log(data);
				setRekomendasiRepository(data);
			},
		});
	}, []);

	return (
		<section>
			<CarouselBanner />
			<section className="leading-3 my-2">
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
			<section className="leading-3 my-2">
				<TitleSection title="Koleksi Perpustakaan" />
				<section className="flex gap-x-2">
					{Object.keys(repositoryTypeMap).map((item) => {
						return (
							<Button
								key={`tag-${item.toLowerCase()}`}
								className="capitalize my-2"
								color="default"
								size="sm"
								radius="lg"
								variant="ghost">
								{item}
							</Button>
						);
					})}
				</section>

				<section className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 my-6">
					{rekomendasiRepository &&
						rekomendasiRepository.map((repos, index) => {
							return (
								<SwiperSlide
									key={`repos-${repos.judul.toLowerCase()}-${index}`}>
									<CardCustomeStyleDetail
										url={`${VITE_SERVER_BASE_URL}/public/${repos.type}/sampul/${repos.nama_sampul}`}
										title={repos.judul}
										type={repos.type}
										pengarang={
											repos[repositoryTypeMap[repos.type]]?.pengarang as string
										}
									/>
								</SwiperSlide>
							);
						})}
					{/* <CardCustomeStyleDetail
						url={`${VITE_SERVER_BASE_URL}/public/skripsi/sampul/ss.jpg`}
						title="Title"
						pengarang="Pengarang"
					/>
					<CardCustomeStyleDetail
						url={`${VITE_SERVER_BASE_URL}/public/skripsi/sampul/ss.jpg`}
						title="Title"
						pengarang="Pengarang"
					/>
					<CardCustomeStyleDetail
						url={`${VITE_SERVER_BASE_URL}/public/skripsi/sampul/ss.jpg`}
						title="Title"
						pengarang="Pengarang"
					/> */}
				</section>
			</section>
			<section className="leading-3 my-2">
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
