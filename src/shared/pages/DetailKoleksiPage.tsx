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

import {
	HiMagnifyingGlassMinus,
	HiMagnifyingGlassPlus,
	HiOutlineEye,
} from "react-icons/hi2";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
import { cn } from "@/lib/utils";

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
				isOpen={isOpen}
				size="full"
				scrollBehavior="normal"
				onOpenChange={onOpenChange}>
				<ModalContent>
					{() => (
						<>
							{detailData &&
								repositoryDetailData.nama_file &&
								repositoryDetailData.nama_file !== "" && (
									<div>
										<ModalHeader className="flex flex-col gap-1">
											<p className="leading-3 mt-2">
												{repositoryDetailData.judul}
											</p>
											<span className="text-xs italic font-thin">
												{detailData.pengarang}
											</span>
											<Chip
												className="capitalize my-2"
												color={typeColorMap[repositoryDetailData.type]}
												size="sm"
												variant="flat">
												{repositoryDetailData.type}
											</Chip>
										</ModalHeader>
										<ModalBody>
											<div className="absolute rounded-2xl flex right-7 justify-between items-center top-50 mt-1 p-2 z-10 gap-2">
												<Button
													isIconOnly
													size="sm"
													color="primary"
													isDisabled={pageScale <= 1}
													onPress={() => setPageScale((scale) => scale - 0.2)}>
													<HiMagnifyingGlassMinus />
												</Button>

												<Button
													isIconOnly
													size="sm"
													color="primary"
													isDisabled={pageScale >= 10}
													onPress={() => setPageScale((scale) => scale + 0.2)}>
													<HiMagnifyingGlassPlus />
												</Button>
											</div>

											<div className="overflow-auto max-h-[82vh] rounded-xl">
												<Document
													file={`${VITE_SERVER_BASE_URL}/public/${koleksi}/file/${repositoryDetailData.nama_file}`}
													onLoadSuccess={onDocumentLoadSuccess}>
													<div className="flex justify-center px-4 bg-gray-200 gap-4 items-center p-14">
														<Page scale={pageScale} pageNumber={pageNumber} />
													</div>
												</Document>
											</div>

											<div className="absolute rounded-2xl flex right-1/2 translate-x-1/2  justify-between items-center bottom-0 mb-8 p-1 bg-white/70 border-2 border-primary z-10 gap-2">
												<button
													className={cn(
														"text-primary p-2",
														pageNumber <= 1 ? "text-primary/40" : ""
													)}
													disabled={pageNumber <= 1}
													onClick={() => setPageNumber((page) => page - 1)}>
													<FaChevronLeft />
												</button>
												<div className="py-1 px-2 rounded-md">
													Page {pageNumber} of {numPages}{" "}
												</div>
												<button
													className={cn(
														"text-primary p-2",
														pageNumber >= numPages ? "text-primary/40" : ""
													)}
													disabled={pageNumber >= numPages}
													onClick={() => setPageNumber((page) => page + 1)}>
													<FaChevronRight />
												</button>
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
