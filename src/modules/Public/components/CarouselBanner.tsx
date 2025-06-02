import DashboardBannerA from '@/assets/dashboard/dashbord_1.svg';
import DashboardBannerB from '@/assets/dashboard/dashbord_2.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import '/node_modules/swiper/swiper-bundle.min.css';
import { Image } from '@heroui/react';

const CarouselBanner = () => {
	const bannerList = [
		{
			image: DashboardBannerA,
			alt: 'dasboard-a',
		},
		{
			image: DashboardBannerB,
			alt: 'dashboard-b',
		},
	];

	return (
		<div className="bg-primary-50 rounded-xl overflow-hidden relative">
			<div className="absolute top-0 left-0 w-full h-full z-20">
				<div className="bg-gradient-to-r from-transparent to-primary-400/80 w-full h-full absolute z-20"></div>
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
							<Image src={item.image} alt={`banner-${item.alt}`} />
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default CarouselBanner;
