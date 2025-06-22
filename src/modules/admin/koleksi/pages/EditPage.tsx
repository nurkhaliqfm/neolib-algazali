import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	getDetailRepository,
	updateRepository,
} from "../services/koleksiService";
import {
	RepositoryDetailResponse,
	RepositoryRequest,
} from "../types/koleksi.type";
import { RepositoryItemKey } from "@/types/repository";
import { useEffect, useState } from "react";
import { useTypedSelector } from "@/hooks/useTypedSelector";

import {
	reposHasFile,
	repositoryBaseFieldConfig,
	repositoryFieldConfig,
	repositoryFormSelectOptios,
	repositoryTypeMap,
} from "@/constants/repository";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { generateZodSchema } from "@/shared/utils/getZodScheme";
import { Button, Image } from "@heroui/react";
import { HiChevronRight } from "react-icons/hi2";
import { toast } from "react-toastify";
import AppRoutes from "@/router/routes";
import BlockInvalidInputChar from "@/utils/blockInvalidInput";

const { VITE_SERVER_BASE_URL } = import.meta.env;

const EditKoleksiPage = () => {
	const { koleksi } = useParams<{ koleksi: RepositoryItemKey }>();
	const { search } = useLocation();
	const navigate = useNavigate();

	const params = new URLSearchParams(search);
	const repos = params.get("repos");

	const user = useTypedSelector((state) => state.oauth.oauthData);
	const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
	const [repositoryDetailData, setrepositoryDetailData] =
		useState<RepositoryDetailResponse | null>(null);

	const detailKey = repositoryDetailData
		? repositoryTypeMap[repositoryDetailData.type]
		: null;

	const formFields = [
		...repositoryBaseFieldConfig.filter((field) =>
			field.name === "nama_file"
				? repositoryDetailData &&
				  reposHasFile.includes(repositoryDetailData.type)
				: true
		),
		...(detailKey
			? repositoryFieldConfig[detailKey].map((field) => ({
					...field,
					type: field.type as "number" | "textarea" | "text" | "select",
					name: field.name as keyof z.infer<typeof formZodSchema>,
			  }))
			: []),
	];

	const formZodSchema = detailKey
		? generateZodSchema([
				...repositoryBaseFieldConfig.map((field) => ({
					...field,
					type: field.type,
					name: field.name,
				})),
				...repositoryFieldConfig[detailKey],
		  ])
		: z.object({});

	const form = useForm<z.infer<typeof formZodSchema>>({
		resolver: zodResolver(formZodSchema),
		defaultValues: {
			judul: repositoryDetailData?.judul || "",
			nama_sampul: null,
			nama_file: null,
			...(repositoryDetailData && detailKey
				? repositoryDetailData[detailKey]
				: {}),
		},
	});

	function onSubmit(values: z.infer<typeof formZodSchema>) {
		setIsLoadingUpdate(true);
		if (!repositoryDetailData) return "No repository data available.";

		const { judul, nama_sampul, nama_file, pengarang, ...reposData } =
			values as RepositoryRequest;

		updateRepository({
			token: user?.access_token,
			atr: { id: repos, slug: koleksi },
			repos: {
				judul,
				pengarang: pengarang,
				nama_sampul: nama_sampul,
				nama_file: nama_file,
				old_file: repositoryDetailData?.nama_file,
				old_sampul: repositoryDetailData?.nama_sampul,
				type: repositoryDetailData.type,
				[koleksi as string]: {
					...reposData,
				},
			},
			onDone: (data) => {
				if (data.status === 200) {
					toast.success(data.message, {
						autoClose: 1000,
						onClose: () => {
							navigate(
								AppRoutes.AdminKoleksi.path.replace(":koleksi", koleksi || "")
							);
						},
					});
				} else {
					toast.error(data.message, {
						theme: "colored",
						autoClose: 1000,
						onClose: () => {
							setIsLoadingUpdate(false);
						},
					});
				}
			},
			onError: (error) => {
				toast.error(error.error, {
					theme: "colored",
					autoClose: 1000,
					onClose: () => {
						setIsLoadingUpdate(false);
					},
				});
			},
		});
	}

	useEffect(() => {
		if (koleksi && repos) {
			getDetailRepository({
				token: user?.access_token,
				type: koleksi,
				isPublic: false,
				repos: repos,
				onDone: (data) => {
					setrepositoryDetailData(data);
					if (formZodSchema) {
						form.reset({
							...(data[repositoryTypeMap[data.type]] as unknown as z.infer<
								typeof formZodSchema
							>),
							judul: data.judul || "",
							pengarang: data.pengarang || "",
							nama_sampul: null,
							nama_file: null,
						});
					}
				},
				onError: (error) => {
					toast.error(error.error, {
						theme: "colored",
						autoClose: 1000,
					});
					setIsLoadingUpdate(false);
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [koleksi, repos]);

	if (!repositoryDetailData) return <p>No data found.</p>;

	return (
		<div className="p-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
					{formFields.map((ff) => {
						return (
							<FormField
								key={ff.name}
								control={form.control}
								name={ff.name as keyof z.infer<typeof formZodSchema>}
								render={({ field }) => (
									<FormItem>
										<FormLabel>{ff.label}</FormLabel>
										<FormControl>
											{ff.type === "select" ? (
												<>
													<Select
														onValueChange={(value) => {
															const selectedOptions =
																repositoryFormSelectOptios[
																	ff.name as keyof typeof repositoryFormSelectOptios
																].find((item) => item.id === Number(value));
															field.onChange(selectedOptions || null);
														}}
														value={
															field.value && typeof field.value === "object"
																? String((field.value as { id: number }).id)
																: undefined
														}>
														<SelectTrigger>
															<SelectValue placeholder={`Pilih ${ff.label}`} />
														</SelectTrigger>
														<SelectContent>
															{repositoryFormSelectOptios[
																ff.name as keyof typeof repositoryFormSelectOptios
															].map((item) => (
																<SelectItem
																	key={item.id}
																	value={String(item.id)}>
																	{item.nama}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</>
											) : ff.type === "textarea" ? (
												<Textarea
													placeholder={`Masukkan ${ff.label}`}
													{...field}
													rows={5}
													value={(field.value as typeof field.value) ?? ""}
												/>
											) : ff.type === "number" ? (
												<Input
													placeholder={`Masukkan ${ff.label}`}
													{...field}
													type="number"
													min={0}
													onKeyDown={BlockInvalidInputChar}
													onChange={(e) => {
														const value = e.target.value;
														if (value === "") {
															field.onChange(0);
														} else {
															field.onChange(Number(value));
														}
													}}
												/>
											) : ff.type === "year" ? (
												<Input
													placeholder={`Masukkan ${ff.label}`}
													{...field}
													type="number"
													min={0}
													onKeyDown={BlockInvalidInputChar}
													onChange={(e) => {
														const value = e.target.value;
														if (value === "") {
															field.onChange(1900);
														} else {
															field.onChange(Number(value));
														}
													}}
												/>
											) : ff.type === "file" ? (
												<div className="flex flex-col gap-2">
													{ff.name === "nama_sampul" &&
														repositoryDetailData.nama_sampul && (
															<div className="flex flex-col items-center">
																<Image
																	alt="Card background"
																	className="object-cover rounded-xl"
																	src={`${VITE_SERVER_BASE_URL}/public/${koleksi}/sampul/${repositoryDetailData.nama_sampul}`}
																	width={320}
																/>
																<p className="text-xs italic ">
																	{repositoryDetailData.nama_sampul}
																</p>
															</div>
														)}

													<Input
														{...field}
														type="file"
														value={undefined}
														onChange={(e) => {
															const file = e.target.files as FileList;
															field.onChange(file);
														}}
													/>
												</div>
											) : (
												<Input
													placeholder={`Masukkan ${ff.label}`}
													{...field}
													type={ff.type}
													value={(field.value as typeof field.value) || ""}
												/>
											)}
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						);
					})}

					<div className="flex justify-end">
						<Button
							isLoading={isLoadingUpdate}
							spinner={
								<svg
									className="animate-spin h-5 w-5 text-current"
									fill="none"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg">
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									/>
									<path
										className="opacity-75"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										fill="currentColor"
									/>
								</svg>
							}
							endContent={<HiChevronRight />}
							className="mt-4"
							color="primary"
							type="submit">
							Update Repository
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default EditKoleksiPage;
