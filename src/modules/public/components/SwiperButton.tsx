import { Button } from "@heroui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import SwiperInstance from "swiper";

interface SwiperButtonProps {
	swiperRef: React.RefObject<SwiperInstance | null>;
}

const SwiperControllButton = ({ swiperRef }: SwiperButtonProps) => {
	const handleSwiperOnClick = ({ type }: { type: string }) => {
		if (swiperRef.current) {
			if (type === "next") {
				swiperRef.current.slideNext();
			} else if (type === "prev") {
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
				onPress={() => handleSwiperOnClick({ type: "prev" })}>
				<HiChevronLeft />
			</Button>

			<Button
				isIconOnly
				radius="full"
				size="sm"
				variant="bordered"
				color="primary"
				onPress={() => handleSwiperOnClick({ type: "next" })}>
				<HiChevronRight />
			</Button>
		</div>
	);
};

export { SwiperControllButton };
