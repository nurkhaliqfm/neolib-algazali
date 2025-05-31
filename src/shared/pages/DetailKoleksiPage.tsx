import { useEffect, useState } from "react";
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
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from "@heroui/react";

import { HiChevronLeft, HiChevronRight, HiOutlineEye } from "react-icons/hi2";
import {
	repositoryFieldConfig,
	repositoryTypeMap,
	typeColorMap,
} from "@/constants/repository";
import { RepositoryDetailResponse } from "@/modules/admin/koleksi/types/koleksi.type";
import { getDetailRepository } from "@/modules/admin/koleksi/services/koleksiService";
import { KoleksiDetailItem } from "../components/KoleksiDetail";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const { VITE_SERVER_BASE_URL } = import.meta.env;

const DetailKoleksiPage = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { koleksi } = useParams<{ koleksi: RepositoryItemKey }>();
	const { search } = useLocation();

	const params = new URLSearchParams(search);
	const repos = params.get("repos");

	const user = useTypedSelector((state) => state.oauth.oauthData);
	const [repositoryDetailData, setrepositoryDetailData] =
		useState<RepositoryDetailResponse | null>(null);

	const [numPages, setNumPages] = useState<number>(0);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [pageScale, setPageScale] = useState<number>(1);

	useEffect(() => {
		if (koleksi && repos) {
			getDetailRepository({
				token: user?.access_token,
				type: koleksi,
				repos: repos,
				onDone: (data) => {
					console.log(data);
					setrepositoryDetailData(data);
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [koleksi, repos]);

	if (!repositoryDetailData) return <p>No data found.</p>;

	const detailKey = repositoryTypeMap[repositoryDetailData.type];
	const formFields = detailKey
		? repositoryFieldConfig[detailKey].map((field) => ({
				...field,
		  }))
		: [];

	const detailData = repositoryDetailData[detailKey];

	const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
		setNumPages(numPages);
	};

	return (
		<>
			<Modal
				scrollBehavior="inside"
				isOpen={isOpen}
				size="2xl"
				onOpenChange={onOpenChange}>
				<ModalContent>
					{() => (
						<>
							{repositoryDetailData.nama_file &&
								repositoryDetailData.nama_file !== "" && (
									<div>
										<ModalHeader className="flex flex-col gap-1">
											<p>{repositoryDetailData.judul}</p>
											<Chip
												className="capitalize my-2"
												color={typeColorMap[repositoryDetailData.type]}
												size="sm"
												variant="flat">
												{repositoryDetailData.type}
											</Chip>
										</ModalHeader>
										<ModalBody>
											<div className="overflow-y-auto">
												<Document
													file={`${VITE_SERVER_BASE_URL}/public/${koleksi}/file/${repositoryDetailData.nama_file}`}
													onLoadSuccess={onDocumentLoadSuccess}>
													<div className="flex justify-center  rounded-md bg-gray-200 overflow-y-auto gap-8 items-center">
														<Button
															isIconOnly
															color="primary"
															isDisabled={pageNumber <= 1}
															onPress={() => setPageNumber((prev) => prev - 1)}>
															<HiChevronLeft />
														</Button>
														<Page
															scale={pageScale}
															canvasBackground="#f4f4f4"
															pageNumber={pageNumber}
														/>
														<Button
															isIconOnly
															color="primary"
															isDisabled={pageNumber >= numPages}
															onPress={() => setPageNumber((prev) => prev + 1)}>
															<HiChevronRight />
														</Button>
													</div>
												</Document>
												<div className="bg-white p-4 rounded-2xl border-2 border-primary">
													Page {pageNumber} of {numPages}
												</div>
											</div>
										</ModalBody>
									</div>
								)}
						</>
					)}
				</ModalContent>
			</Modal>

			{detailData && (
				<section className="flex gap-4 p-4 flex-col lg:flex-row">
					<Card
						className="py-4 md:max-w-80 w-full border rounded-2xl"
						shadow="none">
						<CardBody className="overflow-visible py-2 items-center">
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
										size="sm"
										onPress={() => onOpen()}>
										Preview
									</Button>
								)}
						</CardFooter>
					</Card>

					<Card className="py-4 flex-1 border rounded-2xl" shadow="none">
						<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
							<p className="text-tiny uppercase font-bold">Detail {koleksi}</p>
						</CardHeader>
						<CardBody className="overflow-visible py-2 px-4">
							{formFields.map((field) => {
								return (
									<KoleksiDetailItem
										key={field.name}
										slug={field.name}
										title={field.label}
										value={
											field.name === "lokasi"
												? ("lokasi" in detailData && detailData.lokasi?.nama) ||
												  ""
												: field.name === "prodi"
												? ("prodi" in detailData && detailData.prodi?.nama) ||
												  ""
												: String(
														detailData[field.name as keyof typeof detailData] ??
															""
												  )
										}
									/>
								);
							})}
						</CardBody>
					</Card>
				</section>
			)}
		</>
	);
};

export default DetailKoleksiPage;
