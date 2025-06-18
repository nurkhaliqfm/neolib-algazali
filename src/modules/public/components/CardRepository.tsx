import { typeColorMapCustom } from "@/constants/repository";
import { cn } from "@/lib/utils";
import AppRoutes from "@/router/routes";
import { Button, Chip, Image } from "@heroui/react";
import { useNavigate } from "react-router-dom";

const CardCustomeStyleBasic = ({
	repos,
	url,
	pengarang,
	title,
	type,
}: {
	repos: number;
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
							":koleksi",
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
					className="object-cover absolute translate-x-1/2 right-[3.28rem]"
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
	repos: number;
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
		<div className="flex w-full h-52 rounded-xl bg-primary-200/50  border-2 border-primary-800/50 my-6 shadow-xl">
			<div className="relative flex w-40 h-full rounded-l-xl">
				<div
					className={cn(
						`absolute flex items-center gap-x-1 z-20 px-2 py-1 shadow-md font-light text-xs rounded-l-md rounded-br-md right-2 -top-4`,
						typeColorMapCustom[type].gradient
					)}>
					<Icon />
					{type}
				</div>

				<div className="bg-white absolute translate-x-1/2 right-20 xs:right-[4rem] -top-10 xs:w-28 h-48 w-32 overflow-hidden flex items-center justify-center">
					<Image
						as="img"
						radius="none"
						alt="Cover Repository"
						className="object-cover"
						width={200}
						height={200}
						src={url}
					/>
				</div>
			</div>
			<div className="flex flex-col bg-white rounded-r-xl justify-between flex-1 leading-6 p-4">
				<div>
					<p className="text-sm font-medium line-clamp-2">{title}</p>
					<p className="font-light text-sm italic line-clamp-1">{pengarang}</p>
					<p className="mt-2 text-[0.7rem] leading-4 font-light line-clamp-3">
						{abstrak || sinopsis || "-"}
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
									":koleksi",
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

export { CardCustomeStyleBasic, CardCustomeStyleDetail };
