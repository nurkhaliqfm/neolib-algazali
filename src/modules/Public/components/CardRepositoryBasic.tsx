import { typeColorMapCustom } from '@/constants/repository';
import { cn } from '@/lib/utils';
import AppRoutes from '@/router/routes';
import { Image } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

const CardCustomeStyleBasic = ({
	repos,
	url,
	pengarang,
	title,
	type,
}: {
	repos: string;
	url: string;
	pengarang: string;
	title: string;
	type: string;
}) => {
	const Icon = typeColorMapCustom[type].icon;
	const navigate = useNavigate();

	return (
		<div className="flex justify-center mb-10">
			<section
				className="relative w-48 cursor-pointer"
				onClick={() =>
					navigate(
						`${AppRoutes.KoleksiDetail.path.replace(
							':koleksi',
							type.toLowerCase()
						)}?repos=${repos}`
					)
				}>
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
				<div className="mt-[12rem] leading-6 pt-10 h-36 p-4 bg-primary-200/50 rounded-xl overflow-hidden">
					<p className="font-light text-xs line-clamp-2 text-ellipsis">
						{pengarang}
					</p>
					<p className="text-sm line-clamp-3 text-ellipsis">{title}</p>
				</div>
			</section>
		</div>
	);
};

export default CardCustomeStyleBasic;
