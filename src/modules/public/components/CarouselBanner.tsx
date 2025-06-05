import DashboardBannerA from "@/assets/dashboard/dahsboard_1.jpg";
import DashboardBannerB from "@/assets/dashboard/dashboard_2.jpg";
import DashboardBannerC from "@/assets/dashboard/dashboard_3.jpg";
import DashboardBannerD from "@/assets/dashboard/dashboard_4.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "/node_modules/swiper/swiper-bundle.min.css";
import { Image } from "@heroui/react";

const CarouselBanner = () => {
	const bannerList = [
		{
			image: DashboardBannerA,
			alt: "dasboard-a",
		},
		{
			image: DashboardBannerB,
			alt: "dashboard-b",
		},
		{
			image: DashboardBannerC,
			alt: "dashboard-c",
		},
		{
			image: DashboardBannerD,
			alt: "dashboard-d",
		},
	];

	return (
		<div className="sm:p-6 p-0 mb-8 sm:mb-0">
			<div className="relative mb-2 sm:rounded-xl overflow-hidden h-80 md:h-96 lg:h-1/2">
				<div className="absolute bottom-0 left-0 w-full h-20 md:h-40 z-20">
					<div className="bg-gradient-to-b from-transparent to-primary-400/80 w-full h-full absolute z-20"></div>
				</div>

				<Swiper
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					modules={[Autoplay]}
					className="mySwiper">
					{bannerList.map((item) => {
						return (
							<SwiperSlide key={`banner-${item.alt}`}>
								<Image
									loading="lazy"
									src={item.image}
									alt={`banner-${item.alt}`}
									className="rounded-none object-cover h-80 md:h-96 lg:h-1/2 w-screen"
								/>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</div>
	);
};

export default CarouselBanner;
