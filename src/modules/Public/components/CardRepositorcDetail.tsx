import { typeColorMapCustom } from '@/constants/repository';
import { cn } from '@/lib/utils';
import AppRoutes from '@/router/routes';
import { Button, Chip, Image } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

const CardCustomeStyleDetail = ({
	repos,
	url,
	pengarang,
	title,
	type,
	tahun_terbit,
	abstrak,
	sinopsis,
}: {
	repos: string;
	url: string;
	pengarang: string;
	title: string;
	type: string;
	tahun_terbit: string;
	abstrak?: string;
	sinopsis?: string;
}) => {
	const Icon = typeColorMapCustom[type].icon;
	const navigate = useNavigate();

	return (
		<div className="flex w-full rounded-xl border-2 border-primary-800/50 my-6">
			<div className="relative w-40 h-44 bg-primary-200/50 rounded-l-xl shadow-xl">
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
			<div className="flex flex-col justify-between flex-1 leading-6 p-4">
				<div>
					<p className="text-sm font-medium line-clamp-2">{title}</p>
					<p className="font-light text-sm italic">{pengarang}</p>
					<p className="mt-2 text-xs font-light line-clamp-4">
						{abstrak || sinopsis || '-'}
					</p>
				</div>
				<div className="flex items-center mt-4 justify-between">
					<div className="flex">
						<Chip
							className="capitalize"
							color="default"
							size="sm"
							variant="flat">
							{tahun_terbit}
						</Chip>
					</div>
					<Button
						onPress={() => {
							navigate(
								`${AppRoutes.KoleksiDetail.path.replace(
									':koleksi',
									type.toLowerCase()
								)}?repos=${repos}`
							);
						}}
						size="sm"
						radius="lg"
						variant="shadow"
						color="primary">
						Detail
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CardCustomeStyleDetail;
