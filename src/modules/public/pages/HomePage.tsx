import CarouselBanner from "../components/CarouselBanner";
import { Button, Image } from "@heroui/react";
import { repositoryTypeMap, typePublicRouteMap } from "@/constants/repository";
import { useEffect, useRef, useState } from "react";
import { getListRekomendasiRepository } from "../service/publicService";
import { RepositoryDetailResponse } from "@/modules/admin/koleksi/types/koleksi.type";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination } from "swiper/modules";

import "/node_modules/swiper/swiper-bundle.min.css";
import {
	CardCustomeStyleBasic,
	CardCustomeStyleDetail,
} from "../components/CardRepository";
import { SwiperControllButton } from "../components/SwiperButton";
import {
	HiOutlineInboxStack,
	HiOutlineRocketLaunch,
	HiOutlineSparkles,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { SectionTitleContent } from "@/shared/components/SectionTitle";

const { VITE_SERVER_BASE_URL } = import.meta.env;

const listPublication: {
	name: string;
	label: string;
	img: string;
	url: string;
}[] = [
	{
		name: "Maraja Jurnal",
		label: "maraja-jurnal",
		img: "https://merajajournal.com/public/journals/1/homepageImage_en_US.png",
		url: "https://merajajournal.com/index.php/mrj",
	},
	{
		name: "Indonesian Jurnal of Analisis Public Policy and Inonvation",
		label: "ija-ppi",
		img: "https://ojs.algazali.ac.id/public/journals/2/homepageImage_en.jpg",
		url: "https://ojs.algazali.ac.id/index.php/IJAPPI",
	},
];

function HomePage() {
	const navigate = useNavigate();
	const [rekomendasiRepository, setRekomendasiRepository] = useState<
		RepositoryDetailResponse[]
	>([]);
	const [listRepository, setListRepository] = useState<
		RepositoryDetailResponse[]
	>([]);
	const [typeRepos, setTypeRepos] =
		useState<keyof typeof repositoryTypeMap>("JURNAL");

	const swiperRef = useRef<SwiperType | null>(null);

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
				limit: "6",
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
				<div className="flex justify-between items-center">
					<SectionTitleContent
						icon={HiOutlineSparkles}
						title="Rekomendasi"
						description="Berikut beberapa rekomendasi repositori"
					/>

					<SwiperControllButton swiperRef={swiperRef} />
				</div>

				<section className="flex gap-x-4 my-6">
					<Swiper
						onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
						breakpoints={{
							320: { slidesPerView: 1, spaceBetween: 10 },
							480: { slidesPerView: 2, spaceBetween: 10 },
							768: { slidesPerView: 3, spaceBetween: 10 },
							1024: { slidesPerView: 4, spaceBetween: 10 },
						}}
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
											url={`${VITE_SERVER_BASE_URL}/public/${
												repos.type
											}/sampul/${repos.nama_sampul || "-"}`}
											title={repos.judul}
											type={repos.type}
											repos={repos.id}
											pengarang={repos.pengarang}
										/>
									</SwiperSlide>
								);
							})}
					</Swiper>
				</section>
			</section>

			<section className="leading-3 my-2 px-6 mb-6">
				<SectionTitleContent
					icon={HiOutlineInboxStack}
					title="Koleksi Perpustakaan"
				/>
				<section className="flex gap-x-2 w-full overflow-x-scroll">
					{Object.keys(repositoryTypeMap).map((item) => {
						return (
							<Button
								key={`tag-${item.toLowerCase()}`}
								className="capitalize my-2"
								color={item === typeRepos ? "primary" : "default"}
								size="sm"
								radius="lg"
								variant={item === typeRepos ? "flat" : "ghost"}
								onPress={() =>
									setTypeRepos(item as keyof typeof repositoryTypeMap)
								}>
								{item}
							</Button>
						);
					})}
				</section>

				<section className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mt-6">
					{listRepository &&
						listRepository.map((repos, index) => {
							const detailKey = repositoryTypeMap[repos.type];
							const selectedReposByType = repos[detailKey];

							return (
								<div key={`repos-${repos.judul.toLowerCase()}-${index}`}>
									<CardCustomeStyleDetail
										url={`${VITE_SERVER_BASE_URL}/public/${repos.type}/sampul/${
											repos.nama_sampul || "-"
										}`}
										title={repos.judul}
										type={repos.type}
										repos={repos.id}
										pengarang={repos.pengarang}
										tahun_terbit={
											selectedReposByType?.tahun_terbit.toString() as string
										}
										sinopsis={
											selectedReposByType
												? ("sinopsis" in selectedReposByType &&
														selectedReposByType.sinopsis) ||
												  undefined
												: undefined
										}
										abstrak={
											selectedReposByType
												? ("abstrak" in selectedReposByType &&
														selectedReposByType.abstrak) ||
												  undefined
												: undefined
										}
									/>
								</div>
							);
						})}
				</section>

				{listRepository && listRepository.length > 0 && (
					<div className="flex justify-center">
						<Button
							variant="shadow"
							color="primary"
							onPress={() =>
								navigate(typePublicRouteMap[listRepository[0].type].url)
							}>
							Lihat Repository {typePublicRouteMap[listRepository[0].type].name}{" "}
							Lainnya
						</Button>
					</div>
				)}
			</section>

			<section className="leading-3 my-2 px-6">
				<SectionTitleContent
					icon={HiOutlineRocketLaunch}
					title="Publikasi Jurnal"
					description="Berikut beberapa publikasi jurnal ITBA Al-Gazali Barru"
				/>

				<section className="flex gap-x-4 my-6">
					<Swiper
						breakpoints={{
							320: { slidesPerView: 1, spaceBetween: 10 },
							480: { slidesPerView: 2, spaceBetween: 10 },
							768: { slidesPerView: 2, spaceBetween: 10 },
							1024: { slidesPerView: 2, spaceBetween: 10 },
						}}
						pagination={{
							clickable: true,
						}}
						modules={[Autoplay, Pagination]}
						className="mySwiper">
						{listPublication.map((repos, index) => {
							return (
								<SwiperSlide
									key={`publication-${repos.label.toLowerCase()}-${index}`}>
									<div className="flex items-center flex-col gap-y-2">
										<div className="bg-white rounded-xl h-64 w-48 overflow-hidden flex items-center justify-center">
											<Image
												as="img"
												radius="none"
												alt="Cover Repository"
												className="object-fill"
												width={300}
												height={300}
												src={repos.img}
											/>
										</div>
										<p className="leading-5 w-48 text-center font-medium">
											{repos.name}
										</p>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</section>
			</section>
		</section>
	);
}

export default HomePage;
