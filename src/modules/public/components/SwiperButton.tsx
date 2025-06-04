import { Button } from '@heroui/react';
import { useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import SwiperInstance from 'swiper';

interface SwiperButtonProps {
	swiperRef: React.RefObject<SwiperInstance | null>;
}

const SwiperControllButton = ({ swiperRef }: SwiperButtonProps) => {
	const [activeIndexPagination, setActiveIndexPagination] = useState<number>(0);

	const handleSwiperOnClick = ({ type }: { type: string }) => {
		if (swiperRef.current) {
			console.log(swiperRef.current);
			if (type === 'next') {
				setActiveIndexPagination(swiperRef.current.activeIndex + 1);
				swiperRef.current.slideNext();
			} else if (type === 'prev') {
				setActiveIndexPagination(swiperRef.current.activeIndex - 1);
				swiperRef.current.slidePrev();
			}
		}
	};
	return (
		<div className="flex space-x-3">
			<Button
				isIconOnly
				size="sm"
				radius="full"
				variant="bordered"
				color="primary"
				isDisabled={activeIndexPagination === 0}
				onPress={() => handleSwiperOnClick({ type: 'prev' })}>
				<HiChevronLeft />
			</Button>

			<Button
				isIconOnly
				radius="full"
				size="sm"
				variant="bordered"
				isDisabled={
					activeIndexPagination ===
					(swiperRef.current?.pagination.bullets?.length ?? 0) - 2
				}
				color="primary"
				onPress={() => handleSwiperOnClick({ type: 'next' })}>
				<HiChevronRight />
			</Button>
		</div>
	);
};

export { SwiperControllButton };
