import { useEffect, useState } from "react";
import { getDetailRepository } from "../services/koleksiService";
import { RepositoryDetailResponse } from "../types/koleksi.type";
import { useLocation, useParams } from "react-router-dom";
import { RepositoryItemKey } from "@/types/repository";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Chip,
	Image,
} from "@heroui/react";
import { HiOutlineEye } from "react-icons/hi2";
import { typeColorMap } from "@/constants/repository";

const { VITE_SERVER_BASE_URL } = import.meta.env;

const DetailPage = () => {
	const { koleksi } = useParams<{ koleksi: RepositoryItemKey }>();
	const { search } = useLocation();

	const params = new URLSearchParams(search);
	const repos = params.get("repos");

	const user = useTypedSelector((state) => state.oauth.oauthData);
	const [repositoryDetailData, setrepositoryDetailData] =
		useState<RepositoryDetailResponse | null>(null);

	useEffect(() => {
		if (koleksi && repos) {
			getDetailRepository({
				token: user?.access_token,
				type: koleksi,
				repos: repos,
				onDone: (data) => {
					setrepositoryDetailData(data);
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{repositoryDetailData && (
				<section className="flex gap-x-4 p-4">
					<Card className="py-4 w-80 border rounded-2xl" shadow="none">
						<CardBody className="overflow-visible py-2">
							<Image
								alt="Card background"
								className="object-cover rounded-xl"
								src={`${VITE_SERVER_BASE_URL}/public/${koleksi}/sampul/${repositoryDetailData.nama_sampul}`}
								width={320}
							/>
						</CardBody>
						<CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
							<p className="text-tiny uppercase font-bold">
								{repositoryDetailData.judul}
							</p>
							<Chip
								className="capitalize my-2"
								color={typeColorMap[repositoryDetailData.type]}
								size="sm"
								variant="flat">
								{repositoryDetailData.type}
							</Chip>
							{repositoryDetailData.nama_file &&
								repositoryDetailData.nama_file !== "" && (
									<Button
										className="my-2"
										startContent={<HiOutlineEye />}
										size="sm">
										Preview
									</Button>
								)}
						</CardFooter>
					</Card>
					<Card className="py-4 flex-1 border rounded-2xl" shadow="none">
						<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
							<p className="text-tiny uppercase font-bold">Detail {koleksi}</p>
						</CardHeader>
						<CardBody className="overflow-visible py-2">
							<div className="flex flex-col">
								<p className="text-sm">Abstrak</p>
								<p>{repositoryDetailData.jurnal?.abstrak}</p>
							</div>
							<div className="flex flex-col">
								<p className="text-sm">Tahun Terbit</p>
								<p>{repositoryDetailData.jurnal?.tahun_terbit}</p>
							</div>
							<div className="flex flex-col">
								<p className="text-sm">ISBN</p>
								<p>{repositoryDetailData.jurnal?.isbn}</p>
							</div>
							<div className="flex flex-col">
								<p className="text-sm">Penerbit</p>
								<p>{repositoryDetailData.jurnal?.penerbit}</p>
							</div>
							<div className="flex flex-col">
								<p className="text-sm">Pengarang</p>
								<p>{repositoryDetailData.jurnal?.pengarang}</p>
							</div>
							<div className="flex flex-col">
								<p className="text-sm">Jurnal</p>
								<p>{repositoryDetailData.jurnal?.jurnal}</p>
							</div>
							<div className="flex flex-col">
								<p className="text-sm">Lokasi</p>
								<p>{repositoryDetailData.jurnal?.lokasi.nama}</p>
							</div>
						</CardBody>
					</Card>
					{/* <Card>
						<div className="flex flex-col">
							<p className="text-sm">Judul</p>
							<p>{repositoryDetailData.judul}</p>
						</div>
						<div className="flex flex-col">
							<p className="text-sm">Nama File</p>
							<p>{repositoryDetailData.nama_file}</p>
						</div>
						<div className="flex flex-col">
							<p className="text-sm">Nama Sampul</p>
							<p>{repositoryDetailData.nama_sampul}</p>
						</div>
					</Card>
					<Card>
						
					</Card> */}
				</section>
			)}
		</>
	);
};

export default DetailPage;
